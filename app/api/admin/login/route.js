import { NextResponse } from 'next/server';
import { verifyPassword, makeToken, COOKIE, sameOrigin, adminConfigError } from '@/lib/auth';
const tries = new Map(); // best-effort limiter (per serverless instance)
export async function POST(req) {
  if (!sameOrigin(req)) return NextResponse.json({ error: 'Bad origin' }, { status: 403 });
  const ce = adminConfigError(); if (ce) return NextResponse.json({ error: ce }, { status: 500 });
  const ip = (req.headers.get('x-forwarded-for') || 'x').split(',')[0].trim();
  const t = tries.get(ip) || { n: 0, at: Date.now() };
  if (Date.now() - t.at > 900000) { t.n = 0; t.at = Date.now(); }
  if (t.n >= 5) return NextResponse.json({ error: 'Too many attempts. Try again in 15 minutes.' }, { status: 429 });
  const { password } = await req.json().catch(() => ({}));
  if (typeof password !== 'string' || !verifyPassword(password)) { t.n++; tries.set(ip, t); return NextResponse.json({ error: 'Wrong password.' }, { status: 401 }); }
  tries.delete(ip);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE, makeToken(), { httpOnly: true, secure: true, sameSite: 'strict', path: '/', maxAge: 28800 });
  return res;
}
