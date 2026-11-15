import site from '@/content/site.json';
export const metadata = { title: 'Downloads', description: 'Download status for Jini on Windows and macOS.' };
export default function Downloads() {
  return (<div className="wrap doc" style={{ maxWidth: 900 }}><h1>Downloads</h1><p>Installers are not released yet. Each button turns on when a real download link is added.</p>
    <div className="dl" style={{ marginTop: 32 }}>{[['Windows', site.downloads.windows], ['macOS', site.downloads.macos]].map(([n, u]) => (
      <div className="card" key={n}><h3>Jini for {n}</h3>{u ? <p style={{ margin: '12px 0' }}>Available now.</p> : <p className="soon" style={{ margin: '12px 0' }}>Coming soon</p>}
        {u ? <a className="btn p" href={u} rel="noopener noreferrer">Download for {n}</a> : <button className="btn" disabled>Not available yet</button>}</div>))}</div></div>);
}
