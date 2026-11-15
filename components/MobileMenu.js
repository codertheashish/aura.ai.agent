'use client';
import Link from 'next/link';
import { useRef } from 'react';
import { useDismiss } from './Dismiss';
import { useUser } from '@/lib/useUser';
export default function MobileMenu({ nav }) {
  const ref = useRef(null), u = useUser(); useDismiss(ref);
  return <details ref={ref} className="m"><summary>Menu</summary><div onClick={() => { if (ref.current) ref.current.open = false; }}>{nav.map(([h, l]) => <Link key={h} href={h}>{l}</Link>)}{u ? <Link href="/profile">My profile</Link> : <Link href="/login">Login</Link>}</div></details>;
}
