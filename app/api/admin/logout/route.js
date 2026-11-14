import { NextResponse } from 'next/server';
import { COOKIE, sameOrigin } from '@/lib/auth';
export async function POST(req) {
  if (!sameOrigin(req)) return NextResponse.json({ error: 'Bad origin' }, { status: 403 });
  const res = NextResponse.json({ ok: true }); res.cookies.set(COOKIE, '', { path: '/', maxAge: 0 }); return res;
}
