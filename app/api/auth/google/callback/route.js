import { NextResponse } from 'next/server';
import { dbReady, upsertGoogle } from '@/lib/users';
import { setUserCookie } from '@/lib/session';
export async function GET(req) {
  const u = new URL(req.url), o = u.origin, fail = () => NextResponse.redirect(o + '/login?error=google');
  const code = u.searchParams.get('code'), st = u.searchParams.get('state'), ck = req.cookies.get('g_state')?.value;
  if (!code || !st || st !== ck) return fail();
  try {
    const t = await fetch('https://oauth2.googleapis.com/token', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ code, client_id: process.env.GOOGLE_CLIENT_ID, client_secret: process.env.GOOGLE_CLIENT_SECRET, redirect_uri: o + '/api/auth/google/callback', grant_type: 'authorization_code' }) }).then((r) => r.json());
    if (!t.access_token) return fail();
    const p = await fetch('https://openidconnect.googleapis.com/v1/userinfo', { headers: { Authorization: 'Bearer ' + t.access_token } }).then((r) => r.json());
    if (!p.email || !p.email_verified) return fail();
    const email = p.email.toLowerCase(), name = String(p.name || email.split('@')[0]).slice(0, 60);
    if (dbReady()) await upsertGoogle(email, name).catch(() => {});
    const nx = req.cookies.get('g_next')?.value || '/'; const res = NextResponse.redirect(o + (/^\/(?!\/)/.test(nx) ? nx : '/')); res.cookies.set('g_next', '', { path: '/', maxAge: 0 }); setUserCookie(res, { email, name }); res.cookies.set('g_state', '', { path: '/', maxAge: 0 }); return res;
  } catch { return fail(); }
}
