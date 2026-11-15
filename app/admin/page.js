'use client';
import { useState, useEffect } from 'react';
import PasswordInput from '@/components/PasswordInput';
const LIMIT = 3.5 * 1024 * 1024;
// Laptop-size screenshots (up to 2560 px wide) keep full detail; bigger files are re-encoded before upload.
async function shrink(file) {
  try {
    if (!/^image\/(png|jpeg|webp)$/.test(file.type)) return file;
    const bmp = await createImageBitmap(file), max = 2560;
    if (file.size <= LIMIT && bmp.width <= max) return file;
    const k = Math.min(1, max / bmp.width), c = document.createElement('canvas');
    c.width = Math.round(bmp.width * k); c.height = Math.round(bmp.height * k);
    c.getContext('2d').drawImage(bmp, 0, 0, c.width, c.height);
    for (const q of [0.92, 0.85, 0.75, 0.6]) { const b = await new Promise((r) => c.toBlob(r, 'image/webp', q)); if (b && b.size <= LIMIT) return new File([b], 'screenshot.webp', { type: 'image/webp' }); }
  } catch {}
  return file;
}
const CATS = ['Listening', 'Thinking', 'Speaking', 'Gallery'];
export default function Admin() {
  const [data, setData] = useState(null); const [msg, setMsg] = useState(''); const [pw, setPw] = useState(''); const [busy, setBusy] = useState(false);
  async function load() { const r = await fetch('/api/admin'); if (r.ok) setData(await r.json()); else setData(false); }
  useEffect(() => { load(); }, []);
  async function call(url, opts, ok) {
    setBusy(true); setMsg(''); const r = await fetch(url, opts); const j = await r.json().catch(() => ({}));
    setBusy(false); if (!r.ok) { setMsg(j.error || 'Something went wrong.'); return false; } if (ok) setMsg(ok); return j;
  }
  async function login(e) { e.preventDefault(); if (await call('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: pw }) })) { setPw(''); load(); } }
  async function upload(e) { e.preventDefault(); const f = e.target, fd = new FormData(f), file = fd.get('file'); if (file && file.size) fd.set('file', await shrink(file)); const j = await call('/api/admin', { method: 'POST', body: fd }, 'Uploaded as draft. Publish it below.'); if (j) { setData(j); f.reset(); } }
  async function edit(kind, item, ok = 'Saved. The live site updates after Vercel redeploys (about a minute).') { const j = await call('/api/admin', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ kind, item }) }, ok); if (j) setData(j); }
  async function remove(kind, id) { if (!confirm('Delete this permanently?')) return; const j = await call(`/api/admin?kind=${kind}&id=${id}`, { method: 'DELETE' }, 'Deleted.'); if (j) setData(j); }
  async function logout() { await fetch('/api/admin/logout', { method: 'POST' }); setData(false); }
  async function addTut(e) { e.preventDefault(); const f = new FormData(e.target); await edit('tutorials', { title: f.get('title'), url: f.get('url'), published: f.get('pub') === 'on' }, 'Tutorial saved.'); e.target.reset(); }
  const wrap = { maxWidth: 820, margin: '0 auto', padding: '48px 24px' };
  if (data === null) return <div style={wrap}>Loading…</div>;
  if (data === false) return (<form className="card" style={{ ...wrap, maxWidth: 420, margin: '64px auto' }} onSubmit={login}><h1>Admin login</h1>
    <label htmlFor="pw">Password</label><PasswordInput id="pw" autoComplete="current-password" value={pw} onChange={(e) => setPw(e.target.value)} required />
    <button className="btn p" disabled={busy}>Sign in</button><p role="alert" className="err">{msg}</p></form>);
  return (<div style={wrap}><h1>Admin</h1><button className="btn" onClick={logout}>Sign out</button>
    <p role="status" className={msg.startsWith('Uploaded') || msg.startsWith('Saved') || msg === 'Deleted.' || msg.startsWith('Tutorial') ? 'ok' : 'err'}>{msg}</p>
    <h2>Upload screenshot</h2>
    <form onSubmit={upload} className="card"><label>Title<input name="title" maxLength={80} required /></label><label>Description<textarea name="description" maxLength={300} rows={2} /></label>
      <label>Category<select name="category">{CATS.map((c) => <option key={c}>{c}</option>)}</select></label>
      <label>Image (PNG, JPG or WebP; large screenshots are optimised automatically)<input name="file" type="file" accept="image/png,image/jpeg,image/webp" required /></label>
      <button className="btn p" disabled={busy}>{busy ? 'Uploading…' : 'Upload'}</button></form>
    <h2 style={{ marginTop: 40 }}>Screenshots</h2>
    {data.screenshots.length === 0 && <div className="empty">No screenshots yet.</div>}
    {data.screenshots.map((s) => <div className="card" key={s.id} style={{ marginBottom: 14 }}><img src={s.file} alt={s.title} style={{ width: 160, borderRadius: 8 }} />
      <ShotEdit s={s} onSave={(v) => edit('screenshots', v)} onDelete={() => remove('screenshots', s.id)} /></div>)}
    <h2 style={{ marginTop: 40 }}>YouTube tutorials</h2>
    <form onSubmit={addTut} className="card"><label>Title<input name="title" maxLength={100} required /></label><label>YouTube link<input name="url" type="url" placeholder="https://www.youtube.com/watch?v=..." required /></label>
      <label><input type="checkbox" name="pub" style={{ width: 'auto' }} /> Publish</label><br /><button className="btn p" disabled={busy}>Save tutorial</button></form>
    {data.tutorials.map((t) => <div className="card" key={t.id} style={{ marginTop: 12 }}>{t.title} ({t.published ? 'published' : 'draft'}) <button className="btn" onClick={() => edit('tutorials', { ...t, url: `https://youtu.be/${t.videoId}`, published: !t.published })}>{t.published ? 'Unpublish' : 'Publish'}</button> <button className="btn" onClick={() => remove('tutorials', t.id)}>Delete</button></div>)}
    <p className="cap">Preview: drafts are visible only here. Published items appear on the public site after redeploy.</p></div>);
}
function ShotEdit({ s, onSave, onDelete }) {
  const [v, setV] = useState(s);
  return (<div><label>Title<input value={v.title} onChange={(e) => setV({ ...v, title: e.target.value })} maxLength={80} /></label>
    <label>Description<input value={v.description} onChange={(e) => setV({ ...v, description: e.target.value })} maxLength={300} /></label>
    <label>Category<select value={v.category} onChange={(e) => setV({ ...v, category: e.target.value })}>{CATS.map((c) => <option key={c}>{c}</option>)}</select></label>
    <label><input type="checkbox" checked={v.published} onChange={(e) => setV({ ...v, published: e.target.checked })} style={{ width: 'auto' }} /> Published</label><br />
    <button className="btn p" onClick={() => onSave(v)}>Save</button> <button className="btn" onClick={onDelete}>Delete</button></div>);
}
