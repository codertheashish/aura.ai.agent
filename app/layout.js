import './globals.css';
import Link from 'next/link';
import { Space_Grotesk, Inter } from 'next/font/google';
import { NAV, CREATOR } from '@/lib/content';
import { Social } from '@/components/Icons';
import site from '@/content/site.json';
const head = Space_Grotesk({ subsets: ['latin'], variable: '--font-head' });
const body = Inter({ subsets: ['latin'], variable: '--font-body' });
export const metadata = {
  metadataBase: new URL('https://jini-ai-agent.vercel.app'),
  title: { default: 'JINI AI — Your desktop AI assistant', template: '%s | JINI AI' },
  description: 'Jini is an intelligent desktop AI assistant that understands Hindi, Hinglish and English voice and helps you interact with your digital world.',
  openGraph: { title: 'JINI AI', description: 'Your AI. Your Voice. Your Digital Companion.', type: 'website' },
};
export const viewport = { themeColor: '#07070b' };
export default function Root({ children }) {
  return (<html lang="en" className={`${head.variable} ${body.variable}`}><body>
    <a className="skip" href="#main">Skip to content</a>
    <header className="top"><div className="wrap bar">
      <Link href="/" className="logo"><i />JINI AI</Link>
      <nav className="d" aria-label="Main">{NAV.map(([h, l]) => <Link key={h} href={h}>{l}</Link>)}</nav>
      <details className="m"><summary>Menu</summary><div>{NAV.map(([h, l]) => <Link key={h} href={h}>{l}</Link>)}</div></details>
    </div></header>
    <main id="main">{children}</main>
    <footer><div className="wrap">
      <div><b style={{ color: 'var(--text)' }}>JINI AI</b><br />A desktop AI assistant by {CREATOR.name}.<br /><br /><Social c={CREATOR} /></div>
      <div><b style={{ color: 'var(--text)' }}>Learn</b><Link href="/about">About</Link><Link href="/gemini-api-key">Gemini API key</Link><Link href="/privacy">Privacy and security</Link><Link href="/contact">Contact</Link></div>
    </div></footer>
  </body></html>);
}
