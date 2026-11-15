'use client';
import { useEffect, useState } from 'react';
import Avatar from './Avatar';
const S = ['idle', 'listening', 'thinking', 'speaking'], L = { idle: 'Idle', listening: 'Listening', thinking: 'Thinking', speaking: 'Speaking' };
export default function HeroAvatar() {
  const [s, setS] = useState('idle'); const [auto, setAuto] = useState(true);
  useEffect(() => { if (!auto) return; const id = setInterval(() => setS((x) => S[(S.indexOf(x) + 1) % 4]), 4200); return () => clearInterval(id); }, [auto]);
  return (<div className="stage">
    <span className="chip a">Hindi</span><span className="chip b">Hinglish</span><span className="chip c">English</span><span className="chip d">Wake word</span>
    <Avatar state={s} />
    <div className="tabs sw" role="group" aria-label="Preview Jini states">{S.map((x) => <button key={x} className="tab" aria-pressed={s === x} onClick={() => { setAuto(false); setS(x); }}>{L[x]}</button>)}</div>
  </div>);
}
