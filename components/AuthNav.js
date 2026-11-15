'use client';
import Link from 'next/link';
import { useRef } from 'react';
import { useUser } from '@/lib/useUser';
import { useDismiss } from './Dismiss';
export default function AuthNav() {
  const u = useUser(), ref = useRef(null); useDismiss(ref);
  async function out() { await fetch('/api/auth/logout', { method: 'POST' }); location.href = '/'; }
  if (!u) return <Link className="login" href="/login">Login</Link>;
  const first = u.name.split(' ')[0];
  return (<details ref={ref} className="pm"><summary aria-label="Account menu"><span className="ini">{first[0]?.toUpperCase()}</span><span className="hi">{first}</span></summary>
    <div className="pmp" onClick={() => { if (ref.current) ref.current.open = false; }}><b>{u.name}</b><small>{u.email}</small><Link href="/profile">My profile</Link><button type="button" onClick={out}>Sign out</button></div></details>);
}
