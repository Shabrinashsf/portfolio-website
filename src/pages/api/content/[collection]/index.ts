import type { NextApiRequest, NextApiResponse } from "next";
import { isCollection, COLLECTIONS, validateBody } from "@/lib/collections";
import { getDb } from "@/lib/db";
import { requireAuth } from "@/lib/auth";
import postgres from "postgres";

// Generic collection API for the CMS.
// GET  /api/content/works  -> list rows (works includes nested products)
// POST /api/content/works  -> create (works also inserts products)
// Table/column names come from the whitelisted registry in lib/collections,
// user values are always bound as numbered parameters ($1..$n).

async function revalidatePublic(res: NextApiResponse) {
  try {
    await Promise.all([res.revalidate("/"), res.revalidate("/project")]);
  } catch {
    // revalidate can throw locally (nothing prerendered yet); safe to ignore
  }
}

function parseBody(req: NextApiRequest): Record<string, unknown> {
  const b = req.body;
  if (typeof b === "string") {
    try { return JSON.parse(b); } catch { return {}; }
  }
  return (b ?? {}) as Record<string, unknown>;
}

type FieldLike = { type: string };

// jsonb columns must go through sql.json (plain string params get double-encoded)
function paramFor(field: FieldLike, value: unknown, sql: postgres.Sql): unknown {
  if (field.type === "stringlist") return sql.json(Array.isArray(value) ? value : []);
  const v = value as string | number | null;
  return v === undefined ? null : v;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { collection } = req.query;
  const name = String(collection ?? "");
  if (!isCollection(name)) return res.status(404).json({ error: "Unknown collection" });

  const sql = getDb();
  if (!sql) return res.status(500).json({ error: "DATABASE_URL not configured" });
  const def = COLLECTIONS[name];
  const fields = def.fields.filter((f) => f.type !== "productlist");
  const cols = fields.map((f) => f.name);
  const productsField = def.fields.find((f) => f.type === "productlist");
  const products = productsField ? (((parseBody(req)[productsField.name] ?? []) as { name: string; url?: string; description?: string; tags: string[] }[]).filter((p) => p?.name)) : [];

  try {
    if (req.method === "GET") {
      const rows = await sql.unsafe(`SELECT * FROM ${def.table} ORDER BY sort, id`);
      if (name === "works") {
        const prods = await sql.unsafe(`SELECT * FROM work_products ORDER BY sort, id`);
        const byWork = new Map<number, unknown[]>();
        for (const p of prods as unknown as { work_id: number }[]) {
          const list = byWork.get(p.work_id) ?? [];
          list.push(p);
          byWork.set(p.work_id, list);
        }
        for (const w of rows as unknown as { id: number; products?: unknown[] }[]) {
          w.products = byWork.get(w.id) ?? [];
        }
      }
      return res.status(200).json({ data: rows });
    }

    if (req.method === "POST") {
      if (!requireAuth(req)) return res.status(401).json({ error: "Unauthorized" });
      const { data, errors } = validateBody(name, parseBody(req));
      if (errors) return res.status(400).json({ errors });
      const d = data!;
      // auto-assign sort (1-based) when not provided
      if (!d.sort) {
        const [maxRow] = await sql.unsafe(`SELECT COALESCE(MAX(sort), 0) + 1 AS next FROM ${def.table}`);
        d.sort = maxRow.next;
      }
      const values = fields.map((f) => paramFor(f, d[f.name], sql)) as postgres.ParameterOrJSON<never>[];
      const placeholders = cols.map((_, i) => `$${i + 1}`).join(", ");
      const [row] = await sql.unsafe(
        `INSERT INTO ${def.table} (${cols.join(", ")}) VALUES (${placeholders}) RETURNING *`,
        values
      );
      if (name === "works") {
        for (const [i, p] of products.entries()) {
          await sql.unsafe(
            `INSERT INTO work_products (work_id, name, url, description, tags, sort) VALUES ($1, $2, $3, $4, $5, $6)`,
            [row.id, p.name, p.url ?? null, p.description ?? null, sql.json(p.tags ?? []), i]
          );
        }
      }
      await revalidatePublic(res);
      return res.status(201).json({ data: row });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error(`[api/content/${name}]`, err);
    const msg = err instanceof Error ? err.message : "Internal error";
    return res.status(500).json({ error: msg });
  }
}
