'use client';
import { useEffect } from 'react';
// Closes a <details> dropdown when clicking outside it or pressing Escape.
export function useDismiss(ref) {
  useEffect(() => {
    const out = (e) => { const d = ref.current; if (d?.open && !d.contains(e.target)) d.open = false; };
    const esc = (e) => { if (e.key === 'Escape' && ref.current) ref.current.open = false; };
    document.addEventListener('pointerdown', out); document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('pointerdown', out); document.removeEventListener('keydown', esc); };
  }, [ref]);
}
