import Link from 'next/link';
import Wave from '@/components/Wave';
import Experience from '@/components/Experience';
import { FEATURES } from '@/lib/content';
import site from '@/content/site.json';
export default function Home() {
  const shots = site.screenshots.filter((s) => s.published);
  return (<>
    <section className="hero"><div className="wrap">
      <div>
        <span className="badge">Installers coming soon</span>
        <h1>Your AI. Your Voice. Your Digital Companion.</h1>
        <p>Meet Babu — an intelligent desktop AI assistant designed to understand, communicate, and help you interact with your digital world.</p>
        <div className="cta"><Link className="btn p" href="/getting-started">Get Started</Link><Link className="btn" href="#features">Explore Features</Link></div>
      </div>
      <div className="win" aria-label="Babu assistant interface illustration"><div className="tb"><b /><b /><b /><span>Babu AI</span></div>
        <div className="body"><div className="orb" /><Wave /><p className="cap">Illustration of the assistant interface</p></div></div>
    </div></section>
    <section className="section" id="experience"><div className="wrap">
      <h2 className="t">Listening. Thinking. Speaking.</h2>
      <p className="lead">The three states you see every time you talk to Babu.</p>
      <Experience shots={shots} />
    </div></section>
    <section className="section" id="features"><div className="wrap">
      <h2 className="t">What Babu can do</h2>
      <p className="lead">Features of the Babu desktop app. Availability may vary by operating system.</p>
      <div className="grid">{FEATURES.map(([t, d], i) => <div key={t} className={`card${i === 0 ? ' wide' : ''}`}><h3>{t}</h3><p>{d}</p></div>)}</div>
    </div></section>
  </>);
}
