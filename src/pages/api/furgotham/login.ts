import type { NextApiRequest, NextApiResponse } from "next";
import { checkCredentials, createSessionCookie, cookieHeader } from "@/lib/auth";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const { username, password } = (req.body ?? {}) as Record<string, unknown>;
  if (!checkCredentials(username, password)) {
    return res.status(401).json({ error: "Username atau password salah" });
  }
  res.setHeader("Set-Cookie", cookieHeader(createSessionCookie()));
  return res.status(200).json({ ok: true });
}
