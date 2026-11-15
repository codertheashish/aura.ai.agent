'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
export default function AuthNav() {
  const [u, setU] = useState(null);
  useEffect(() => { fetch('/api/auth/me').then((r) => r.json()).then((d) => setU(d.user)).catch(() => {}); }, []);
  async function out() { await fetch('/api/auth/logout', { method: 'POST' }); setU(null); }
  if (u) return <><span className="hi">Hi, {u.name.split(' ')[0]}</span><button className="login" onClick={out}>Sign out</button></>;
  return <><Link className="login" href="/login">Login</Link><Link className="btn sm signup" href="/login?mode=signup">Sign up</Link></>;
}
