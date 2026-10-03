import type { NextApiRequest, NextApiResponse } from "next";
import { cookieHeader } from "@/lib/auth";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  res.setHeader("Set-Cookie", cookieHeader(""));
  return res.status(200).json({ ok: true });
}
