'use client';
import { useState, useEffect } from 'react';
const G = () => <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="#4285F4" d="M23 12.300c0-.8-.1-1.600-.2-2.300H12v4.400h6.200a5.300 5.300 0 0 1-2.300 3.500v2.900h3.700c2.200-2 3.400-5 3.400-8.500z" /><path fill="#34A853" d="M12 24c3.100 0 5.700-1 7.600-2.800l-3.700-2.900c-1 .7-2.300 1.100-3.900 1.100-3 0-5.500-2-6.400-4.700H1.800v3A12 12 0 0 0 12 24z" /><path fill="#FBBC05" d="M5.600 14.700a7.200 7.200 0 0 1 0-4.600v-3H1.800a12 12 0 0 0 0 10.600z" /><path fill="#EA4335" d="M12 4.800c1.700 0 3.200.6 4.400 1.700l3.300-3.300A12 12 0 0 0 1.800 7.100l3.800 3C6.500 6.800 9 4.800 12 4.800z" /></svg>;
export default function Login() {
  const [mode, setMode] = useState('signin'), [msg, setMsg] = useState(''), [busy, setBusy] = useState(false);
  useEffect(() => { const q = new URLSearchParams(location.search); if (q.get('mode') === 'signup') setMode('signup'); const e = q.get('error'); if (e) setMsg(e === 'google-not-set' ? 'Google sign-in is not set up yet.' : 'Google sign-in failed. Try again.'); }, []);
  async function submit(e) {
    e.preventDefault(); setBusy(true); setMsg('');
    const r = await fetch(`/api/auth/${mode}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(new FormData(e.target))) });
    const j = await r.json().catch(() => ({})); setBusy(false); if (r.ok) location.href = '/'; else setMsg(j.error || 'Something went wrong.');
  }
  const su = mode === 'signup';
  return (<div className="auth"><h1>{su ? 'Create your account' : 'Welcome back'}</h1>
    <a className="btn gbtn" href="/api/auth/google"><G />Continue with Google</a><p className="or">or use your email</p>
    <form onSubmit={submit}>
      {su && <><label htmlFor="n">Name</label><input id="n" name="name" autoComplete="name" maxLength={60} required /></>}
      <label htmlFor="e">Email</label><input id="e" name="email" type="email" autoComplete="email" required />
      <label htmlFor="p">Password</label><input id="p" name="password" type="password" minLength={su ? 8 : 1} autoComplete={su ? 'new-password' : 'current-password'} required />
      <button className="btn p" style={{ width: '100%' }} disabled={busy}>{busy ? 'Please wait…' : su ? 'Create account' : 'Sign in'}</button>
    </form>
    <p role="alert" className="err">{msg}</p>
    <p className="or">{su ? 'Already have an account?' : 'New to Jini?'} <button className="linkbtn" onClick={() => { setMode(su ? 'signin' : 'signup'); setMsg(''); }}>{su ? 'Sign in' : 'Create an account'}</button></p>
  </div>);
}
