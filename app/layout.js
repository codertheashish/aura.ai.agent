import './globals.css';
import Link from 'next/link';
import { Space_Grotesk, Inter } from 'next/font/google';
import { NAV, CREATOR } from '@/lib/content';
import { Social } from '@/components/Icons';
import { Stores, DownloadMenu } from '@/components/Downloads';
import AuthNav from '@/components/AuthNav';
import MobileMenu from '@/components/MobileMenu';
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
  ['Product', [['/', 'Home'], ['/#features', 'Features'], ['/#experience', 'Experience'], ['/how-it-works', 'How it works']]],
  ['Resources', [['/getting-started', 'Getting started'], ['/gemini-api-key', 'Gemini API key'], ['/tutorials', 'Tutorials'], ['/faq', 'FAQ']]],
  ['Legal', [['/privacy', 'Privacy and security']]],
  ['Company', [['/about', 'About Jini'], ['/contact', 'Contact']]],
];
export default function Root({ children }) {
  const dl = site.downloads || {};
  return (<html lang="en" className={`${head.variable} ${body.variable}`}><body>
    <a className="skip" href="#main">Skip to content</a>
    <header className="top"><div className="wrap bar">
      <Link href="/" className="logo"><img src="/jini-icon.png" alt="" width="30" height="30" />JINI AI</Link>
      <nav className="d" aria-label="Main">{NAV.map(([h, l]) => <Link key={h} href={h}>{l}</Link>)}</nav>
      <div className="hact"><AuthNav /><DownloadMenu dl={dl} /><MobileMenu nav={NAV} /></div>
    </div></header>
    <main id="main">{children}</main>
    <footer><div className="wrap">
      <div className="fcols">
        {COLS.map(([t, links]) => <div key={t}><h4>{t}</h4>{links.map(([h, l]) => <Link key={h} href={h}>{l}</Link>)}</div>)}
        <div><h4>Get Jini</h4><Stores dl={dl} /></div>
      </div>
      <div className="fbot">
        <div className="who"><img src="/jini-icon.png" alt="" width="40" height="40" /><div><b>JINI AI</b><br />© {new Date().getFullYear()} {CREATOR.name}. A desktop AI agent.</div></div>
        <Social c={CREATOR} />
      </div>
    </div></footer>
  </body></html>);
}
