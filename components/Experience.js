'use client';
import { useState } from 'react';
import Wave from './Wave';
const STATES = [['Listening', 'listening', 'Jini hears your wake word or push-to-talk and starts capturing your voice.'], ['Thinking', 'thinking', 'Your request is processed with Gemini and any tools Jini needs.'], ['Speaking', 'speaking', 'Jini answers out loud while the interface shows the reply.']];
export default function Experience({ shots }) {
  const [s, setS] = useState(0); const [all, setAll] = useState(false);
  const [name, mode, desc] = STATES[s];
  const shot = shots.find((x) => x.category === name);
  const gallery = shots.filter((x) => x.category === 'Gallery'); const list = all ? gallery : gallery.slice(0, 6);
  return (<>
    <div className="tabs" role="tablist" aria-label="Jini states">
      {STATES.map(([n], i) => <button key={n} role="tab" aria-selected={i === s} className="tab" onClick={() => setS(i)}>{n}</button>)}
    </div>
    <div className="state" role="tabpanel">
      <div className="win"><div className="tb"><b /><b /><b /><span>Jini AI — {name}</span></div>
        {shot ? <img className="shot" src={shot.file} alt={`${shot.title}: Jini ${name.toLowerCase()}`} loading="lazy" />
          : <div className="shot"><div><Wave mode={mode} /><p className="cap">Screenshot coming soon</p></div></div>}
      </div>
      <div><h3>{name}</h3><p className="lead" style={{ margin: '12px 0 0' }}>{shot?.description || desc}</p></div>
    </div>
    <h3 style={{ margin: '64px 0 20px' }}>Gallery</h3>
    {gallery.length === 0 ? <div className="empty">No gallery screenshots yet.</div> : <>
      <div className="gal">{list.map((g) => <figure key={g.id}><img src={g.file} alt={g.title} loading="lazy" /><figcaption><b>{g.title}</b><br />{g.description}</figcaption></figure>)}</div>
      {gallery.length > 6 && <p><button className="btn" onClick={() => setAll(!all)}>{all ? 'Show fewer' : `Show all ${gallery.length}`}</button></p>}
    </>}
  </>);
}
