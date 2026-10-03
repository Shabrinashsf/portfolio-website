import type { NextApiRequest, NextApiResponse } from "next";
import { isCollection, COLLECTIONS, validateBody } from "@/lib/collections";
import { getDb } from "@/lib/db";
import { requireAuth } from "@/lib/auth";
import postgres from "postgres";

// Item API for the CMS.
// PUT    /api/content/<collection>/<id> -> update (works also replaces products)
// DELETE /api/content/<collection>/<id> -> delete (work_products cascade)
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
  const { collection, id } = req.query;
  const name = String(collection ?? "");
  const rowId = Number(id);
  if (!isCollection(name)) return res.status(404).json({ error: "Unknown collection" });
  if (!Number.isInteger(rowId) || rowId <= 0) return res.status(400).json({ error: "Invalid id" });

  const sql = getDb();
  if (!sql) return res.status(500).json({ error: "DATABASE_URL not configured" });
  const def = COLLECTIONS[name];
  const fields = def.fields.filter((f) => f.type !== "productlist");
  const body = parseBody(req);

  try {
    if (req.method === "PUT") {
      if (!requireAuth(req)) return res.status(401).json({ error: "Unauthorized" });
      const { data, errors } = validateBody(name, body, { partial: true });
      if (errors || !data) return res.status(400).json({ errors: errors ?? { body: "Empty update" } });
      const d = data as Record<string, unknown>;

      const present = fields.filter((f) => Object.prototype.hasOwnProperty.call(d, f.name));
      if (present.length) {
        const setClause = present.map((f, i) => `${f.name} = $${i + 1}`).join(", ");
        const values = present.map((f) => paramFor(f, d[f.name], sql)) as postgres.ParameterOrJSON<never>[];
        values.push(rowId);
        await sql.unsafe(`UPDATE ${def.table} SET ${setClause} WHERE id = $${present.length + 1}`, values);
      }
      if (name === "works" && Array.isArray(body.products)) {
        const products = (body.products as { name: string; url?: string; description?: string; tags: string[] }[]).filter((p) => p?.name);
        await sql.unsafe(`DELETE FROM work_products WHERE work_id = $1`, [rowId]);
        for (const [i, p] of products.entries()) {
          await sql.unsafe(
            `INSERT INTO work_products (work_id, name, url, description, tags, sort) VALUES ($1, $2, $3, $4, $5, $6)`,
            [rowId, p.name, p.url ?? null, p.description ?? null, sql.json(p.tags ?? []), i]
          );
        }
      }
      await revalidatePublic(res);
      const rows = await sql.unsafe(`SELECT * FROM ${def.table} WHERE id = $1`, [rowId]);
      return res.status(200).json({ data: rows[0] ?? null });
    }

    if (req.method === "DELETE") {
      if (!requireAuth(req)) return res.status(401).json({ error: "Unauthorized" });
      if (name === "works") await sql.unsafe(`DELETE FROM work_products WHERE work_id = $1`, [rowId]);
      const rows = await sql.unsafe(`DELETE FROM ${def.table} WHERE id = $1 RETURNING id`, [rowId]);
      if (!rows.length) return res.status(404).json({ error: "Not found" });
      await revalidatePublic(res);
      return res.status(200).json({ data: rows[0] });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error(`[api/content/${name}/${id}]`, err);
    const msg = err instanceof Error ? err.message : "Internal error";
    return res.status(500).json({ error: msg });
  }
}
