import { NextResponse } from 'next/server';
import { sameOrigin } from '@/lib/auth';
import { dbReady, createUser, limited } from '@/lib/users';
import { setUserCookie } from '@/lib/session';
const err = (m, s = 400) => NextResponse.json({ error: m }, { status: s });
export async function POST(req) {
  if (!sameOrigin(req)) return err('Bad origin', 403);
  if (!dbReady()) return err('Email accounts are not set up yet. Please use Google sign-in.', 503);
  if (limited('su' + (req.headers.get('x-forwarded-for') || ''))) return err('Too many attempts. Try again later.', 429);
  const b = await req.json().catch(() => ({}));
  const name = String(b.name || '').trim().slice(0, 60), email = String(b.email || '').trim().toLowerCase(), pw = String(b.password || '');
  if (!name) return err('Enter your name.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 120) return err('Enter a valid email.');
  if (pw.length < 8 || pw.length > 100) return err('Password must be 8 to 100 characters.');
  try { if (!(await createUser(email, name, pw))) return err('An account with this email already exists. Sign in instead.', 409); } catch { return err('Could not create the account. Try again.', 502); }
  const res = NextResponse.json({ ok: true }); setUserCookie(res, { email, name }); return res;
}
