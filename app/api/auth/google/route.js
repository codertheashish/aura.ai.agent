import { NextResponse } from 'next/server';
import crypto from 'crypto';
export async function GET(req) {
  const o = new URL(req.url).origin, id = process.env.GOOGLE_CLIENT_ID;
  if (!id || !process.env.GOOGLE_CLIENT_SECRET) return NextResponse.redirect(o + '/login?error=google-not-set');
  const state = crypto.randomBytes(16).toString('hex'), u = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  u.search = new URLSearchParams({ client_id: id, redirect_uri: o + '/api/auth/google/callback', response_type: 'code', scope: 'openid email profile', state, prompt: 'select_account' }).toString();
  const res = NextResponse.redirect(u); res.cookies.set('g_state', state, { httpOnly: true, secure: true, sameSite: 'lax', path: '/', maxAge: 600 }); return res;
}
