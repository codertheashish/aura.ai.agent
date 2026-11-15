import Link from 'next/link';
import Experience from '@/components/Experience';
import HeroAvatar from '@/components/HeroAvatar';
import { Icon, FEATURE_ICONS, Social } from '@/components/Icons';
import { FEATURES, CREATOR } from '@/lib/content';
import site from '@/content/site.json';
const STEPS = [['Listens', 'Say the wake word or hold push-to-talk.'], ['Thinks', 'Your request goes to Gemini with your own API key, plus tools like web search when needed.'], ['Speaks', 'Jini answers out loud. Your chat history stays on your computer.']];
export default function Home() {
  const shots = site.screenshots.filter((s) => s.published);
  return (<>
    <section className="hero"><div className="wrap">
      <div>
        <span className="badge">Desktop AI agent · Installers coming soon</span>
        <h1>Your AI. Your Voice. Your Digital Companion.</h1>
        <p>Meet Jini — an intelligent desktop AI agent designed to understand, communicate, and help you interact with your digital world.</p>
        <div className="cta"><Link className="btn p" href="/getting-started">Get Started</Link><Link className="btn" href="#features">Explore Features</Link></div>
        <p className="hint">Move your mouse — Jini follows you.</p>
      </div>
      <HeroAvatar />
    </div></section>
    <div className="strip"><div className="wrap">{['Voice conversation', 'Wake word', 'Push-to-talk', 'Local history', 'Web search', 'App control'].map((x) => <span key={x}>{x}</span>)}</div></div>
    <section className="section" id="experience"><div className="wrap">
      <h2 className="t">Listening. Thinking. Speaking.</h2>
      <p className="lead">The three states you see every time you talk to Jini.</p>
      <Experience shots={shots} />
    </div></section>
    <section className="section alt" id="features"><div className="wrap">
      <h2 className="t">What Jini can do</h2>
      <p className="lead">Features of the Jini desktop app. Availability may vary by operating system.</p>
      <div className="grid">{FEATURES.map(([t, d], i) => <div key={t} className={`card${i === 0 ? ' wide' : ''}`}><div className="ic"><Icon n={FEATURE_ICONS[i]} /></div><h3>{t}</h3><p>{d}</p></div>)}</div>
    </div></section>
    <section className="section"><div className="wrap">
      <h2 className="t">How it works</h2><p className="lead">From your voice to a spoken answer in three steps.</p>
      <div className="steps">{STEPS.map(([t, d], i) => <div className="card" key={t}><span className="n">{i + 1}</span><h3>{t}</h3><p>{d}</p></div>)}</div>
    </div></section>
    <section className="section alt"><div className="wrap creator">
      <div className="who"><img src="/jini-icon.png" alt="" width="56" height="56" /><div><h2>Built by {CREATOR.name}</h2><p>One developer, one agent.</p></div></div>
      <Social c={CREATOR} labels />
    </div></section>
  </>);
}
