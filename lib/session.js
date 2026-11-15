import crypto from 'crypto';
export const UCOOKIE = 'jini_user';
const sec = () => process.env.SESSION_SECRET || '';
const sig = (p) => crypto.createHmac('sha256', sec()).update('u:' + p).digest('hex');
export function makeUserToken(u) { const p = Buffer.from(JSON.stringify({ e: u.email, n: u.name, x: Date.now() + 30 * 864e5 })).toString('base64url'); return p + '.' + sig(p); }
export function readUserToken(t) {
  if (!t || sec().length < 32) return null; const [p, s] = t.split('.'); if (!p || !s) return null;
  const e = sig(p); if (e.length !== s.length || !crypto.timingSafeEqual(Buffer.from(e), Buffer.from(s))) return null;
  try { const d = JSON.parse(Buffer.from(p, 'base64url').toString()); return d.x > Date.now() ? { email: d.e, name: d.n } : null; } catch { return null; }
}
export const setUserCookie = (res, u) => res.cookies.set(UCOOKIE, makeUserToken(u), { httpOnly: true, secure: true, sameSite: 'lax', path: '/', maxAge: 30 * 86400 });
