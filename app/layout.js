import './globals.css';
import Link from 'next/link';
import { Space_Grotesk, Inter } from 'next/font/google';
import { NAV, CREATOR } from '@/lib/content';
import { Social, WindowsIcon, AppleIcon } from '@/components/Icons';
import site from '@/content/site.json';
const head = Space_Grotesk({ subsets: ['latin'], variable: '--font-head' });
const body = Inter({ subsets: ['latin'], variable: '--font-body' });
export const metadata = {
  metadataBase: new URL('https://jini-ai-agent.vercel.app'),
  title: { default: 'JINI AI — Your desktop AI agent', template: '%s | JINI AI' },
  description: 'Jini is an intelligent desktop AI agent that understands Hindi, Hinglish and English voice and helps you interact with your digital world.',
  openGraph: { title: 'JINI AI', description: 'Your AI. Your Voice. Your Digital Companion.', type: 'website' },
};
export const viewport = { themeColor: '#08060b' };
const COLS = [
  ['Product', [['/', 'Home'], ['/#features', 'Features'], ['/#experience', 'Experience'], ['/how-it-works', 'How it works'], ['/downloads', 'Downloads']]],
  ['Resources', [['/getting-started', 'Getting started'], ['/gemini-api-key', 'Gemini API key'], ['/tutorials', 'Tutorials'], ['/faq', 'FAQ']]],
  ['Legal', [['/privacy', 'Privacy and security']]],
  ['Company', [['/about', 'About Jini'], ['/contact', 'Contact'], ['/admin', 'Admin login']]],
];
export default function Root({ children }) {
  const dl = site.downloads || {};
  const stores = [['Windows', dl.windows, <WindowsIcon key="w" />], ['macOS', dl.macos, <AppleIcon key="a" />]];
  return (<html lang="en" className={`${head.variable} ${body.variable}`}><body>
    <a className="skip" href="#main">Skip to content</a>
    <header className="top"><div className="wrap bar">
      <Link href="/" className="logo"><img src="/jini-icon.png" alt="" width="30" height="30" />JINI AI</Link>
      <nav className="d" aria-label="Main">{NAV.map(([h, l]) => <Link key={h} href={h}>{l}</Link>)}</nav>
      <div className="hact"><Link className="login" href="/admin">Login</Link><Link className="btn p sm" href="/downloads">Download</Link>
        <details className="m"><summary>Menu</summary><div>{NAV.map(([h, l]) => <Link key={h} href={h}>{l}</Link>)}<Link href="/admin">Login</Link></div></details></div>
    </div></header>
    <main id="main">{children}</main>
    <footer><div className="wrap">
      <div className="fcols">
        {COLS.map(([t, links]) => <div key={t}><h4>{t}</h4>{links.map(([h, l]) => <Link key={h} href={h}>{l}</Link>)}</div>)}
        <div><h4>Get Jini</h4>{stores.map(([n, u, ic]) => <Link key={n} className="store" href={u || '/downloads'}>{ic}<span><small>{u ? 'Download for' : 'Coming soon for'}</small>{n}</span></Link>)}</div>
      </div>
      <div className="fbot">
        <div className="who"><img src="/jini-icon.png" alt="" width="40" height="40" /><div><b>JINI AI</b><br />© {new Date().getFullYear()} {CREATOR.name}. A desktop AI agent.</div></div>
        <Social c={CREATOR} />
      </div>
    </div></footer>
  </body></html>);
}
