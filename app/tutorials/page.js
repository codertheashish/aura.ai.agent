import site from '@/content/site.json';
export const metadata = { title: 'Tutorials', description: 'Video tutorials for Jini AI.' };
export default function Tutorials() {
  const t = site.tutorials.filter((x) => x.published);
  return (<div className="wrap doc" style={{ maxWidth: 900 }}><h1>Tutorials</h1><p>Video guides for using Jini.</p>
    <div style={{ marginTop: 32 }}>{t.length === 0 ? <div className="empty">No tutorials yet. Check back soon.</div> :
      <div className="dl">{t.map((v) => <div key={v.id}><iframe className="vid" loading="lazy" title={v.title} src={`https://www.youtube-nocookie.com/embed/${v.videoId}`} allowFullScreen /><h3 style={{ marginTop: 10, fontSize: '1.05rem' }}>{v.title}</h3></div>)}</div>}</div></div>);
}
