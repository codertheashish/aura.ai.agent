'use client';
import Link from 'next/link';
import { useRef } from 'react';
import { useDismiss } from './Dismiss';
export default function MobileMenu({ nav }) {
  const ref = useRef(null); useDismiss(ref);
  return <details ref={ref} className="m"><summary>Menu</summary><div onClick={() => { if (ref.current) ref.current.open = false; }}>{nav.map(([h, l]) => <Link key={h} href={h}>{l}</Link>)}<Link href="/login">Login</Link></div></details>;
}
