'use client';
import { useState } from 'react';
import { WindowsIcon, AppleIcon } from './Icons';
const items = (dl) => [['Windows', dl?.windows, <WindowsIcon key="w" />], ['macOS', dl?.macos, <AppleIcon key="a" />]];
export function DownloadButtons({ dl }) {
  const [msg, setMsg] = useState('');
  return (<div><div className="cta">{items(dl).map(([n, u, ic]) => u
    ? <a key={n} className="btn p dlb" href={u} rel="noopener noreferrer">{ic}<span>Download for {n}</span></a>
    : <button key={n} type="button" className="btn p dlb" onClick={() => setMsg(`Jini for ${n} is coming soon.`)}>{ic}<span>Download for {n}</span><em>Coming soon</em></button>)}</div>
    <p role="status" className="soonmsg">{msg}</p></div>);
}
export function Stores({ dl }) {
  return items(dl).map(([n, u, ic]) => u
    ? <a key={n} className="store" href={u} rel="noopener noreferrer">{ic}<span><small>Download for</small>{n}</span></a>
    : <div key={n} className="store off">{ic}<span><small>Coming soon for</small>{n}</span></div>);
}
export function DownloadMenu({ dl }) {
  return <details className="dd"><summary className="btn p sm">Download</summary><div className="ddp"><Stores dl={dl} /></div></details>;
}
