'use client';
import { useEffect, useRef } from 'react';
// Animated Jini avatar built from the app's own layered artwork (bg: rings/platform, fg: head).
export default function Avatar({ state = 'idle', small = false, follow = true }) {
  const root = useRef(null), head = useRef(null), mouth = useRef(null), lids = useRef(null), bgr = useRef(null);
  const st = useRef(state); st.current = state;
  const mouse = useRef({ x: 0, y: 0 });
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const mv = (e) => { const r = root.current.getBoundingClientRect(); mouse.current = { x: Math.max(-1, Math.min(1, (e.clientX - r.left - r.width / 2) / 500)), y: Math.max(-1, Math.min(1, (e.clientY - r.top - r.height * .4) / 400)) }; };
    if (follow) addEventListener('pointermove', mv);
    let raf, timer, last = performance.now(), t = 0, yaw = 0, pitch = 0, roll = 0, mo = 0, vis = true;
    const io = new IntersectionObserver(([e]) => (vis = e.isIntersecting)); io.observe(root.current);
    const blink = () => { lids.current?.classList.add('b'); setTimeout(() => lids.current?.classList.remove('b'), 130); timer = setTimeout(blink, 2200 + Math.random() * 3200); };
    timer = setTimeout(blink, 1800);
    const loop = (now) => {
      raf = requestAnimationFrame(loop); const dt = Math.min(.05, (now - last) / 1000); last = now; if (!vis) return; t += dt;
      const s = st.current; let ty = mouse.current.x * 14 + Math.sin(t * .6) * 4, tp = -mouse.current.y * 8 + Math.sin(t * .8 + 1) * 2, tr = Math.sin(t * .5) * 1.5, sc = 1;
      if (s === 'listening') { tp += 4; sc = 1.04; tr += 2; }
      if (s === 'thinking') { ty = -12 + Math.sin(t * .7) * 3; tp = -9; tr = -3; }
      if (s === 'speaking') { tp += Math.sin(t * 7) * 2.2; ty += Math.sin(t * 2.3) * 3; }
      const k = 1 - Math.exp(-dt / .12); yaw += (ty - yaw) * k; pitch += (tp - pitch) * k; roll += (tr - roll) * k;
      head.current.style.transform = `perspective(900px) rotateY(${yaw}deg) rotateX(${pitch}deg) rotateZ(${roll}deg) scale(${sc})`;
      bgr.current.style.transform = `translate(${-yaw * .4}px, ${pitch * .4}px)`;
      const open = s === 'speaking' ? Math.max(0, Math.sin(t * 13) * Math.sin(t * 5.3) * .5 + .5) : 0; mo += (open - mo) * (1 - Math.exp(-dt / .03));
      mouth.current.style.opacity = s === 'speaking' ? 1 : 0; mouth.current.style.transform = `translate(-50%,-50%) scale(${.6 + mo * .5},${.2 + mo})`;
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); clearTimeout(timer); io.disconnect(); removeEventListener('pointermove', mv); };
  }, [follow]);
  return (<div ref={root} className={`av${small ? ' sm' : ''}`} data-state={state} role="img" aria-label={`Jini avatar, ${state}`}>
    <div className="glow" />
    <img ref={bgr} className="l" src="/avatar/bg.webp" alt="" width="482" height="624" draggable="false" />
    <i className="orbit o1" /><i className="orbit o2" /><b className="rip" /><b className="rip r2" />
    <div ref={head} className="l head"><img src="/avatar/fg.webp" alt="" width="482" height="624" draggable="false" />
      <span ref={mouth} className="mouth" /><span ref={lids} className="lids"><u className="le" /><u className="re" /></span></div>
  </div>);
}
