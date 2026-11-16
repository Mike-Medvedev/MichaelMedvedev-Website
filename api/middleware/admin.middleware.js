import { createHash, timingSafeEqual } from "node:crypto";

export function isAdmin(req) {
  const configuredToken = process.env.ADMIN_TOKEN;
  const authorization = req.get("authorization") || "";
  const match = /^Bearer (\S+)$/i.exec(authorization);

  // Fail closed when no suitably long token is configured.
  if (!configuredToken || configuredToken.length < 32 || !match) return false;

  const digest = (value) => createHash("sha256").update(value).digest();
  return timingSafeEqual(digest(configuredToken), digest(match[1]));
}

export function requireAdmin(req, res, next) {
  if (!isAdmin(req)) return res.status(401).json({ ok: false });
  next();
}
