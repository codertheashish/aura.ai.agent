import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { readUserToken, UCOOKIE } from '@/lib/session';
export async function GET() { return NextResponse.json({ user: readUserToken((await cookies()).get(UCOOKIE)?.value) }, { headers: { 'Cache-Control': 'no-store' } }); }
