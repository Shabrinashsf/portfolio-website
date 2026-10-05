// Collection registry: single source of truth shared by the API validation and
// the admin forms. Field types map to Postgres columns (jsonb arrays etc).

export type CollectionName = "works" | "techstacks" | "experiences" | "projects";

export interface WorkProduct {
  name: string;
  url?: string | null;
  description?: string | null;
  tags: string[];
}

export interface WorkRow {
  id: number;
  org: string;
  url: string | null;
  period: string;
  status: "active" | "completed";
  role: string;
  location: string;
  bullets: string[];
  tags: string[];
  sort: number;
  products: WorkProduct[];
}

export interface TechStackItem {
  name: string;
  icon: string;
  size?: string;
}

export interface TechstackRow {
  id: number;
  arcana: "frontend" | "backend" | "devops";
  category: string;
  name: string;
  icon: string;
  size: string;
  sort: number;
}

export interface ExperienceRow {
  id: number;
  arcana: "frontend" | "backend" | "devops";
  org: string;
  period: string;
  role: string;
  description: string;
  tags: string[];
  sort: number;
}

export interface ProjectRow {
  id: number;
  name: string;
  category: "API" | "Boilerplate" | "Utility" | "Frontend";
  status: "Stable" | "In Progress" | "Archived";
  description: string;
  tags: string[];
  link: string;
  sort: number;
}

export type FieldDef = {
  name: string;
  type: "text" | "stringlist" | "productlist" | "icon" | "sort";
  required: boolean;
  label: string;
  enum?: readonly string[];
  unlist?: boolean; // empty string -> stores NULL
};

export interface CollectionDef {
  table: string;
  title: string;
  fields: FieldDef[];
  summary: string[]; // fields shown as table columns in /furgotham
}

export const WORK_STATUSES = ["active", "completed"] as const;
export const ARCANA_IDS = ["frontend", "backend", "devops"] as const;
export const PROJECT_CATEGORIES = ["API", "Boilerplate", "Utility", "Frontend"] as const;
export const PROJECT_STATUSES = ["Stable", "In Progress", "Archived"] as const;

export const COLLECTIONS: Record<CollectionName, CollectionDef> = {
  works: {
    table: "works",
    title: "Work",
    fields: [
      { name: "org", type: "text", required: true, label: "Company / Org" },
      { name: "url", type: "text", required: false, label: "Org URL", unlist: true },
      { name: "period", type: "text", required: true, label: "Period" },
      { name: "status", type: "text", required: true, label: "Status", enum: WORK_STATUSES },
      { name: "role", type: "text", required: true, label: "Role" },
      { name: "location", type: "text", required: true, label: "Location" },
      { name: "bullets", type: "stringlist", required: false, label: "Bullets" },
      { name: "tags", type: "stringlist", required: false, label: "Tags" },
      { name: "products", type: "productlist", required: false, label: "Products" },
      { name: "sort", type: "sort", required: false, label: "Sort" },
    ],
    summary: ["org", "role", "period", "status"],
  },
  techstacks: {
    table: "techstacks",
    title: "Tech Stack (Arcana)",
    fields: [
      { name: "arcana", type: "text", required: true, label: "Arcana", enum: ARCANA_IDS },
      { name: "category", type: "text", required: true, label: "Category" },
      { name: "name", type: "text", required: true, label: "Name" },
      { name: "icon", type: "icon", required: false, label: "Icon" },
      { name: "size", type: "text", required: false, label: "Size class", unlist: true },
      { name: "sort", type: "sort", required: false, label: "Sort" },
    ],
    summary: ["arcana", "category", "name", "icon"],
  },
  experiences: {
    table: "experiences",
    title: "Experience (Arcana)",
    fields: [
      { name: "arcana", type: "text", required: true, label: "Arcana", enum: ARCANA_IDS },
      { name: "org", type: "text", required: true, label: "Org" },
      { name: "period", type: "text", required: true, label: "Period" },
      { name: "role", type: "text", required: true, label: "Role" },
      { name: "description", type: "text", required: false, label: "Description" },
      { name: "tags", type: "stringlist", required: false, label: "Tags" },
      { name: "sort", type: "sort", required: false, label: "Sort" },
    ],
    summary: ["arcana", "org", "role", "period"],
  },
  projects: {
    table: "projects",
    title: "Projects",
    fields: [
      { name: "name", type: "text", required: true, label: "Name" },
      { name: "category", type: "text", required: true, label: "Category", enum: PROJECT_CATEGORIES },
      { name: "status", type: "text", required: true, label: "Status", enum: PROJECT_STATUSES },
      { name: "description", type: "text", required: false, label: "Description" },
      { name: "tags", type: "stringlist", required: false, label: "Tags" },
      { name: "link", type: "text", required: false, label: "Link" },
      { name: "sort", type: "sort", required: false, label: "Sort" },
    ],
    summary: ["name", "category", "status", "link"],
  },
};

export function isCollection(name: string): name is CollectionName {
  return Object.prototype.hasOwnProperty.call(COLLECTIONS, name);
}

// --- Validation -------------------------------------------------------------

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

function strList(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return v.map(str).filter(Boolean);
}

function sortVal(v: unknown): number {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function productVal(v: unknown): WorkProduct[] {
  if (!Array.isArray(v)) return [];
  return v
    .map((raw) => {
      const p = raw as Record<string, unknown>;
      return {
        name: str(p.name),
        url: p.url ? str(p.url) : undefined,
        description: p.description ? str(p.description) : undefined,
        tags: strList(p.tags),
      };
    })
    .filter((p) => p.name);
}

// Returns { data } with normalized values, or { errors } keyed by field.
export function validateBody(
  coll: CollectionName,
  body: Record<string, unknown>,
  { partial = false }: { partial?: boolean } = {}
): { data?: Record<string, unknown>; errors?: Record<string, string> } {
  const def = COLLECTIONS[coll];
  const errors: Record<string, string> = {};
  const data: Record<string, unknown> = {};

  for (const f of def.fields) {
    const present = Object.prototype.hasOwnProperty.call(body, f.name);
    if (partial && !present) continue;

    switch (f.type) {
      case "text": {
        const value = str(body[f.name]);
        if (f.required && value === "") {
          errors[f.name] = `${f.label} is required`;
          break;
        }
        if (f.enum && !(f.enum as readonly string[]).includes(value)) {
          errors[f.name] = `${f.label} must be one of: ${(f.enum as readonly string[]).join(", ")}`;
          break;
        }
        data[f.name] = f.unlist && value === "" ? null : value;
        break;
      }
      case "icon": {
        data[f.name] = str(body[f.name]) || null;
        break;
      }
      case "sort": {
        data[f.name] = sortVal(body[f.name]);
        break;
      }
      case "stringlist": {
        data[f.name] = strList(body[f.name]);
        break;
      }
      case "productlist": {
        data[f.name] = productVal(body[f.name]);
        break;
      }
    }
  }

  return Object.keys(errors).length ? { errors } : { data };
}
