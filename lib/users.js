import crypto from 'crypto';
const url = () => process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const tok = () => process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
export const dbReady = () => !!(url() && tok());
async function cmd(args) {
  const r = await fetch(url(), { method: 'POST', headers: { Authorization: `Bearer ${tok()}` }, body: JSON.stringify(args), cache: 'no-store' });
  if (!r.ok) throw new Error('db'); return (await r.json()).result;
}
export function hashPw(pw) { const s = crypto.randomBytes(16).toString('hex'); return s + ':' + crypto.scryptSync(pw, s, 64).toString('hex'); }
export function checkPw(pw, stored) {
  const [s, h] = String(stored || '').split(':'); if (!s || !h) return false;
  const a = crypto.scryptSync(pw, s, 64), b = Buffer.from(h, 'hex'); return a.length === b.length && crypto.timingSafeEqual(a, b);
}
export async function createUser(email, name, pw) { return (await cmd(['SET', 'user:' + email, JSON.stringify({ name, hash: hashPw(pw), at: Date.now() }), 'NX'])) === 'OK'; }
export async function getUser(email) { const v = await cmd(['GET', 'user:' + email]); return v ? JSON.parse(v) : null; }
export async function upsertGoogle(email, name) { await cmd(['SET', 'user:' + email, JSON.stringify({ name, google: true, at: Date.now() }), 'NX']); }
const tries = new Map(); // best-effort limiter (per serverless instance)
export function limited(key) { const t = tries.get(key) || { n: 0, at: Date.now() }; if (Date.now() - t.at > 9e5) { t.n = 0; t.at = Date.now(); } t.n++; tries.set(key, t); return t.n > 8; }
