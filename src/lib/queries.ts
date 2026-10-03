import type {
  WorkRow, TechstackRow, ExperienceRow, ProjectRow, WorkProduct,
} from "@/lib/collections";
import { SEED_WORKS, SEED_TECHSTACKS, SEED_EXPERIENCES, SEED_PROJECTS } from "@/data/seed";
import { getDb } from "@/lib/db";

// --- Works ------------------------------------------------------------------
export async function getWorks(): Promise<WorkRow[]> {
  const sql = getDb();
  if (!sql) return seedWorks();
  try {
    const works = await sql`SELECT * FROM works ORDER BY sort, id`;
    const prods = await sql`SELECT * FROM work_products ORDER BY sort, id`;
    const byWork = new Map<number, WorkProduct[]>();
    for (const p of prods as unknown as (WorkProduct & { work_id: number })[]) {
      const list = byWork.get(p.work_id) ?? [];
      list.push({ name: p.name, url: p.url ?? undefined, description: p.description ?? undefined, tags: p.tags ?? [] });
      byWork.set(p.work_id, list);
    }
    const rows = (works as unknown as Omit<WorkRow, "products">[]).map(
      (w) => ({
        id: w.id, org: w.org, url: w.url ?? null,
        period: w.period, status: w.status, role: w.role, location: w.location,
        bullets: w.bullets ?? [], tags: w.tags ?? [],
        sort: w.sort,
        products: byWork.get(w.id) ?? [],
      })
    );
    return rows.length ? rows : seedWorks();
  } catch {
    return seedWorks();
  }
}

function seedWorks(): WorkRow[] {
  return SEED_WORKS.map((w, i) => ({
    id: -(i + 1),
    sort: i + 1,
    org: w.org,
    url: w.url ?? null,
    period: w.period,
    status: w.status,
    role: w.role,
    location: w.location,
    bullets: w.bullets ?? [],
    tags: w.tags ?? [],
    products: (w.products ?? []).map((p) => ({
      name: p.name,
      url: p.url ?? null,
      description: p.description ?? null,
      tags: p.tags ?? [],
    })),
  }));
}

// --- Techstacks (grouped by arcana, preserving category order via sort) -----
export async function getTechstacks(): Promise<Record<string, TechstackRow[]>> {
  const sql = getDb();
  if (!sql) return groupTechstacks(seedTechstacks());
  try {
    const rows = await sql`SELECT * FROM techstacks ORDER BY arcana, category, sort, id`;
    if (!(rows as unknown[]).length) return groupTechstacks(seedTechstacks());
    return groupTechstacks(rows as unknown as TechstackRow[]);
  } catch {
    return groupTechstacks(seedTechstacks());
  }
}

function seedTechstacks(): TechstackRow[] {
  return SEED_TECHSTACKS.map((t, i) => ({ id: -(i + 1), sort: i + 1, size: "w-7 h-7", ...t }));
}

function groupTechstacks(rows: TechstackRow[]): Record<string, TechstackRow[]> {
  const out: Record<string, TechstackRow[]> = {};
  for (const r of rows) {
    (out[r.arcana] ??= []).push(r);
  }
  return out;
}

// --- Experiences (grouped by arcana) ---------------------------------------
export async function getExperiences(): Promise<Record<string, ExperienceRow[]>> {
  const sql = getDb();
  if (!sql) return groupExperiences(seedExperiences());
  try {
    const rows = await sql`SELECT * FROM experiences ORDER BY arcana, sort, id`;
    if (!(rows as unknown[]).length) return groupExperiences(seedExperiences());
    return groupExperiences(rows as unknown as ExperienceRow[]);
  } catch {
    return groupExperiences(seedExperiences());
  }
}

function seedExperiences(): ExperienceRow[] {
  return SEED_EXPERIENCES.map((e, i) => ({ id: -(i + 1), sort: i + 1, ...e }));
}

function groupExperiences(rows: ExperienceRow[]): Record<string, ExperienceRow[]> {
  const out: Record<string, ExperienceRow[]> = {};
  for (const r of rows) {
    (out[r.arcana] ??= []).push(r);
  }
  return out;
}

// --- Projects ---------------------------------------------------------------
export async function getProjects(): Promise<ProjectRow[]> {
  const sql = getDb();
  if (!sql) return seedProjects();
  try {
    const rows = await sql`SELECT * FROM projects ORDER BY sort, id`;
    if (!(rows as unknown[]).length) return seedProjects();
    return rows as unknown as ProjectRow[];
  } catch {
    return seedProjects();
  }
}

function seedProjects(): ProjectRow[] {
  return SEED_PROJECTS.map((p, i) => ({ id: -(i + 1), sort: i + 1, ...p }));
}
