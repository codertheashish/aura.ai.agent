'use client';
import { useEffect, useState } from 'react';
let cache = null;
export function useUser() {
  const [u, setU] = useState(undefined);
  useEffect(() => {
    let on = true;
    cache = cache || fetch('/api/auth/me', { cache: 'no-store' }).then((r) => r.json()).then((d) => d.user || null).catch(() => null);
    cache.then((v) => on && setU(v));
    return () => { on = false; };
  }, []);
  return u;
}
export const goLogin = () => { location.href = '/login?reason=download&next=' + encodeURIComponent(location.pathname); };
