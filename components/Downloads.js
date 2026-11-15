'use client';
import { useState, useRef } from 'react';
import { WindowsIcon, AppleIcon } from './Icons';
import { useUser, goLogin } from '@/lib/useUser';
import { useDismiss } from './Dismiss';
const items = (dl) => [['Windows', dl?.windows, <WindowsIcon key="w" />], ['macOS', dl?.macos, <AppleIcon key="a" />]];
// Not signed in -> login page. Signed in -> real download if a URL exists, otherwise "coming soon".
function useDownload(onSoon) {
  const user = useUser();
  return (n, url) => () => { if (!user) return goLogin(); if (url) window.open(url, '_blank', 'noopener'); else onSoon(n); };
}
export function DownloadButtons({ dl }) {
  const [msg, setMsg] = useState('');
  const act = useDownload((n) => { setMsg(`Jini for ${n} is coming soon.`); setTimeout(() => setMsg(''), 4000); });
  return (<div><div className="cta">{items(dl).map(([n, u, ic]) => <button key={n} type="button" className="btn p dlb" onClick={act(n, u)}>{ic}<span>Download for {n}</span>{!u && <em>Coming soon</em>}</button>)}</div>
    <p role="status" className="soonmsg">{msg}</p></div>);
}
export function Stores({ dl, onDone }) {
  const [msg, setMsg] = useState('');
  const act = useDownload((n) => { setMsg(`Jini for ${n} is coming soon.`); setTimeout(() => setMsg(''), 4000); });
  return (<>{items(dl).map(([n, u, ic]) => <button key={n} type="button" className="store" onClick={() => { act(n, u)(); onDone?.(); }}>{ic}<span><small>{u ? 'Download for' : 'Coming soon for'}</small>{n}</span></button>)}
    <p role="status" className="soonmsg">{msg}</p></>);
}
export function DownloadMenu({ dl }) {
  const ref = useRef(null); useDismiss(ref);
  return <details ref={ref} className="dd"><summary className="btn p sm">Download</summary><div className="ddp"><Stores dl={dl} onDone={() => { if (ref.current) ref.current.open = false; }} /></div></details>;
}
