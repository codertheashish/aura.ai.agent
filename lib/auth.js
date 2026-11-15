import crypto from 'crypto';
import { cookies } from 'next/headers';
export const COOKIE = 'jini_admin';
const secret = () => process.env.SESSION_SECRET || '';
const sign = (v) => crypto.createHmac('sha256', secret()).update(v).digest('hex');
const hashEnv = () => (process.env.ADMIN_PASSWORD_HASH || '').replace(/\s+/g, '').replace(/^["']|["']$/g, '');
export function adminConfigError() {
  const e = hashEnv(), [s, h] = e.split(':');
  if (!e) return 'Server setup: ADMIN_PASSWORD_HASH is not set (or the site was not redeployed after adding it).';
  if (!s || !h || !/^[0-9a-f]+$/i.test(s + h) || h.length !== 128) return 'Server setup: ADMIN_PASSWORD_HASH looks incomplete. It must be a 32-character salt, a colon, then 128 characters (161 in total).';
  if ((process.env.SESSION_SECRET || '').length < 32) return 'Server setup: SESSION_SECRET is missing or shorter than 32 characters.';
  return null;
}
export function verifyPassword(pw) {
  const [salt, hash] = hashEnv().split(':');
  if (!salt || !hash) return false;
  const a = crypto.scryptSync(pw, salt, 64), b = Buffer.from(hash, 'hex');
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
export function makeToken() { const v = String(Date.now() + 8 * 3600e3); return v + '.' + sign(v); }
export function validToken(t) {
  if (!t || secret().length < 32) return false;
  const [v, s] = t.split('.'); if (!v || !s) return false;
  const e = sign(v); if (e.length !== s.length) return false;
  return crypto.timingSafeEqual(Buffer.from(e), Buffer.from(s)) && Number(v) > Date.now();
}
export async function isAdmin() { return validToken((await cookies()).get(COOKIE)?.value); }
export function sameOrigin(req) {
  const o = req.headers.get('origin'); if (!o) return false;
  try { return new URL(o).host === req.headers.get('host'); } catch { return false; }
}
