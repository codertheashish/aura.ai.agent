const API = 'https://api.github.com';
const cfg = () => ({ repo: process.env.GITHUB_REPO, branch: process.env.GITHUB_BRANCH || 'main', token: process.env.GITHUB_TOKEN });
async function gh(path, opts = {}) {
  const r = await fetch(API + path, { ...opts, cache: 'no-store', headers: { Authorization: `Bearer ${cfg().token}`, Accept: 'application/vnd.github+json', 'Content-Type': 'application/json' } });
  if (!r.ok) throw new Error('GitHub error ' + r.status);
  return r.json();
}
export async function readSite() {
  const { repo, branch } = cfg();
  const f = await gh(`/repos/${repo}/contents/content/site.json?ref=${branch}`);
  return { data: JSON.parse(Buffer.from(f.content, 'base64').toString()), sha: f.sha };
}
export function put(path, b64, message, sha) {
  const { repo, branch } = cfg();
  return gh(`/repos/${repo}/contents/${path}`, { method: 'PUT', body: JSON.stringify({ message, content: b64, branch, ...(sha ? { sha } : {}) }) });
}
export async function del(path, message) {
  const { repo, branch } = cfg();
  const f = await gh(`/repos/${repo}/contents/${path}?ref=${branch}`);
  return gh(`/repos/${repo}/contents/${path}`, { method: 'DELETE', body: JSON.stringify({ message, sha: f.sha, branch }) });
}
export const saveSite = (data, sha) => put('content/site.json', Buffer.from(JSON.stringify(data, null, 2)).toString('base64'), 'Update site content', sha);
