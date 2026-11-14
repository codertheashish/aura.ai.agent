import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PAGES } from '@/lib/content';
export const dynamicParams = false;
export const generateStaticParams = () => Object.keys(PAGES).map((slug) => ({ slug }));
export async function generateMetadata({ params }) { const p = PAGES[(await params).slug]; return p ? { title: p.title, description: p.desc } : {}; }
export default async function Page({ params }) {
  const slug = (await params).slug, p = PAGES[slug]; if (!p) notFound();
  return (<div className="wrap doc"><h1>{p.title}</h1><p>{p.desc}</p>
    {slug === 'faq' ? p.body.map(([q, a]) => <details className="q" key={q}><summary>{q}</summary><p>{a}</p></details>)
      : p.body.map(([h, t]) => <section key={h}><h2>{h}</h2><p>{t.startsWith('http') ? <a href={t} rel="noopener noreferrer">{t}</a> : t.includes('@') ? <a href={`mailto:${t}`}>{t}</a> : t}</p></section>)}
    {slug === 'getting-started' && <p style={{ marginTop: 28 }}><Link className="btn" href="/gemini-api-key">Gemini API key guide</Link></p>}
  </div>);
}
