import { readFileSync } from "node:fs";
import postgres from "postgres";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set. Put it in .env.local or export it.");
  process.exit(1);
}
const clean = url.replace("postgresql+postgres://", "postgresql://");
const sslMode = new URL(clean).searchParams.get("sslmode");
const sql = postgres(clean, { ssl: sslMode && sslMode !== "disable" ? sslMode as "prefer" | "require" | "verify-full" : false });
try {
  await sql.unsafe(readFileSync("scripts/schema.sql", "utf8"));
  console.log("Schema pushed (CREATE TABLE IF NOT EXISTS).");
} finally {
  await sql.end();
}
