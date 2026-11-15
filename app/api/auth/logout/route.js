import { NextResponse } from 'next/server';
import { sameOrigin } from '@/lib/auth';
import { UCOOKIE } from '@/lib/session';
export async function POST(req) {
  if (!sameOrigin(req)) return NextResponse.json({ error: 'Bad origin' }, { status: 403 });
  const res = NextResponse.json({ ok: true }); res.cookies.set(UCOOKIE, '', { path: '/', maxAge: 0 }); return res;
}
