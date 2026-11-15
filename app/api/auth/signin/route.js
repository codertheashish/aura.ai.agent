import { NextResponse } from 'next/server';
import { sameOrigin } from '@/lib/auth';
import { dbReady, getUser, checkPw, limited } from '@/lib/users';
import { setUserCookie } from '@/lib/session';
const err = (m, s = 400) => NextResponse.json({ error: m }, { status: s });
export async function POST(req) {
  if (!sameOrigin(req)) return err('Bad origin', 403);
  if (!dbReady()) return err('Email accounts are not set up yet. Please use Google sign-in.', 503);
  const b = await req.json().catch(() => ({})); const email = String(b.email || '').trim().toLowerCase(), pw = String(b.password || '');
  if (limited('si' + email + (req.headers.get('x-forwarded-for') || ''))) return err('Too many attempts. Try again in 15 minutes.', 429);
  try {
    const u = await getUser(email);
    if (u && !u.hash) return err('This email uses Google sign-in. Choose Continue with Google.');
    if (!u || !checkPw(pw, u.hash)) return err('Wrong email or password.', 401);
    const res = NextResponse.json({ ok: true }); setUserCookie(res, { email, name: u.name }); return res;
  } catch { return err('Could not sign in. Try again.', 502); }
}
