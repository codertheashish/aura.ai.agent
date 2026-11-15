'use client';
import Link from 'next/link';
import { useUser } from '@/lib/useUser';
export default function Profile() {
  const u = useUser();
  async function out() { await fetch('/api/auth/logout', { method: 'POST' }); location.href = '/'; }
  if (u === undefined) return <div className="wrap doc"><p>Loading…</p></div>;
  if (!u) return <div className="wrap doc"><h1>My profile</h1><p>You are not signed in.</p><p style={{ marginTop: 20 }}><Link className="btn p" href="/login?next=/profile">Login</Link></p></div>;
  return (<div className="wrap doc"><h1>My profile</h1>
    <div className="card prof"><span className="ini big">{u.name[0]?.toUpperCase()}</span><div><h2 style={{ margin: 0 }}>{u.name}</h2><p>{u.email}</p></div></div>
    <p style={{ marginTop: 24 }}><button className="btn" onClick={out}>Sign out</button></p></div>);
}
