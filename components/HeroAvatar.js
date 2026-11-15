'use client';
import { useEffect, useState } from 'react';
import Avatar from './Avatar';
const S = ['idle', 'listening', 'thinking', 'speaking'], L = { idle: 'Idle', listening: 'Listening', thinking: 'Thinking', speaking: 'Speaking' };
export default function HeroAvatar() {
  const [s, setS] = useState('idle'); const [auto, setAuto] = useState(true);
  useEffect(() => { if (!auto) return; const id = setInterval(() => setS((x) => S[(S.indexOf(x) + 1) % 4]), 4200); return () => clearInterval(id); }, [auto]);
  return (<div className="stage">
    <Avatar state={s} />
    <div className="tabs sw" role="group" aria-label="Preview Jini states">{S.map((x) => <button key={x} className="tab" aria-pressed={s === x} onClick={() => { setAuto(false); setS(x); }}>{L[x]}</button>)}</div>
  </div>);
}
