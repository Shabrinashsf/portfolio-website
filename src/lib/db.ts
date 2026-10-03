import postgres from "postgres";

declare global {
  var __pg: postgres.Sql | undefined;
}

let client: postgres.Sql | null = null;

function normalizeUrl(url: string): string {
  return url.replace("postgresql+postgres://", "postgresql://");
}

// Respect the sslmode param of the connection string (Neon ships ?sslmode=require;
// local/postgres without sslmode connects plain).
function sslOption(url: string): boolean | "prefer" | "require" | "verify-full" | undefined {
  let mode: string | null = null;
  try {
    mode = new URL(url).searchParams.get("sslmode");
  } catch {
    mode = null;
  }
  if (!mode || mode === "disable") return false;
  return mode as "prefer" | "require" | "verify-full";
}

export function getDb(): postgres.Sql | null {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  if (!client) {
    const clean = normalizeUrl(url);
    client =
      globalThis.__pg ??
      postgres(clean, { max: 5, idle_timeout: 20, connect_timeout: 10, ssl: sslOption(clean) });
    if (process.env.NODE_ENV !== "production") globalThis.__pg = client;
  }
  return client;
}
