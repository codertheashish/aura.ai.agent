'use client';
import Link from 'next/link';
import { useUser } from '@/lib/useUser';
export default function AuthNav() {
  const u = useUser();
  async function out() { await fetch('/api/auth/logout', { method: 'POST' }); location.reload(); }
  if (u) return <><span className="hi">Hi, {u.name.split(' ')[0]}</span><button className="login" onClick={out}>Sign out</button></>;
  return <Link className="login" href="/login">Login</Link>;
}
