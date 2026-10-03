import crypto from "node:crypto";
import type { NextApiRequest } from "next";

const COOKIE = "furgotham_session";
const MAX_AGE_S = 60 * 60 * 24 * 7; // 1 week

export { COOKIE, MAX_AGE_S };

function safeEq(a: string, b: string): boolean {
  const ha = crypto.createHash("sha256").update(a).digest();
  const hb = crypto.createHash("sha256").update(b).digest();
  return crypto.timingSafeEqual(ha, hb);
}

export function checkCredentials(username: unknown, password: unknown): boolean {
  if (typeof username !== "string" || typeof password !== "string") return false;
  const okUser = safeEq(username, process.env.ADMIN_USERNAME ?? "");
  const okPass = safeEq(password, process.env.ADMIN_PASSWORD ?? "");
  return okUser && okPass;
}

function sign(payload: string): string {
  return crypto.createHmac("sha256", process.env.AUTH_SECRET ?? "").update(payload).digest("hex");
}

// Format: "<exp-unix-seconds>.<hmac(exp)>" — stateless, verified without DB.
export function createSessionCookie(): string {
  const exp = Math.floor(Date.now() / 1000) + MAX_AGE_S;
  return `${exp}.${sign(String(exp))}`;
}

export function verifySessionToken(token?: string): boolean {
  if (!token) return false;
  const dot = token.indexOf(".");
  if (dot === -1) return false;
  const exp = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  if (!/^\d+$/.test(exp) || !safeEq(sig, sign(exp))) return false;
  return Number(exp) > Math.floor(Date.now() / 1000);
}

export function sessionFromReq(req: NextApiRequest): string | undefined {
  return req.cookies?.[COOKIE];
}

export function requireAuth(req: NextApiRequest): boolean {
  return verifySessionToken(sessionFromReq(req));
}

export function cookieHeader(value: string): string {
  const parts = [
    `${COOKIE}=${value}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${value ? MAX_AGE_S : 0}`,
  ];
  if (process.env.NODE_ENV === "production" && process.env.VERCEL) parts.push("Secure");
  return parts.join("; ");
}
