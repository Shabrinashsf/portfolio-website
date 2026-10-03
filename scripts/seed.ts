import postgres from "postgres";
import { SEED_WORKS, SEED_TECHSTACKS, SEED_EXPERIENCES, SEED_PROJECTS } from "../src/data/seed";

// Idempotent seed: does nothing when tables already have rows.
// Run: bun run db:seed   (after DATABASE_URL is set + db:push)
const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set. Put it in .env.local or export it.");
  process.exit(1);
}
const clean = url.replace("postgresql+postgres://", "postgresql://");
const sslMode = new URL(clean).searchParams.get("sslmode");
const sql = postgres(clean, { ssl: sslMode && sslMode !== "disable" ? sslMode as "prefer" | "require" | "verify-full" : false });

try {
  const [{ count }] = await sql`SELECT count(*)::int AS count FROM works`;
  if (count > 0) {
    console.log(`Already seeded (works=${count}). Skipping.`);
  } else {
    await sql.begin(async (tx) => {
      for (const [i, w] of SEED_WORKS.entries()) {
        const [row] = await tx`
          INSERT INTO works (org, url, period, status, role, location, bullets, tags, sort)
          VALUES (${w.org}, ${w.url ?? null}, ${w.period}, ${w.status}, ${w.role}, ${w.location},
                  ${tx.json(w.bullets ?? [])}, ${tx.json(w.tags ?? [])}, ${i + 1})
          RETURNING id`;
        for (const [j, p] of (w.products ?? []).entries()) {
          await tx`
            INSERT INTO work_products (work_id, name, url, description, tags, sort)
            VALUES (${row.id}, ${p.name}, ${p.url ?? null}, ${p.description ?? null},
                    ${tx.json(p.tags ?? [])}, ${j + 1})`;
        }
      }
      for (const [i, t] of SEED_TECHSTACKS.entries()) {
        await tx`
          INSERT INTO techstacks (arcana, category, name, icon, size, sort)
          VALUES (${t.arcana}, ${t.category}, ${t.name}, ${t.icon}, ${t.size ?? "w-7 h-7"}, ${i + 1})`;
      }
      for (const [i, e] of SEED_EXPERIENCES.entries()) {
        await tx`
          INSERT INTO experiences (arcana, org, period, role, description, tags, sort)
          VALUES (${e.arcana}, ${e.org}, ${e.period}, ${e.role}, ${e.description}, ${tx.json(e.tags)}, ${i + 1})`;
      }
      for (const [i, p] of SEED_PROJECTS.entries()) {
        await tx`
          INSERT INTO projects (name, category, status, description, tags, link, sort)
          VALUES (${p.name}, ${p.category}, ${p.status}, ${p.description}, ${tx.json(p.tags)}, ${p.link}, ${i + 1})`;
      }
    });
    console.log(
      `Seeded: works=${SEED_WORKS.length}, techstacks=${SEED_TECHSTACKS.length}, experiences=${SEED_EXPERIENCES.length}, projects=${SEED_PROJECTS.length}`
    );
  }
} finally {
  await sql.end();
}
