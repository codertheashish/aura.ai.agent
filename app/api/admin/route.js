import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { isAdmin, sameOrigin } from '@/lib/auth';
import { readSite, saveSite, put, del } from '@/lib/github';
const CATS = ['Listening', 'Thinking', 'Speaking', 'Gallery'];
const MAX = 3 * 1024 * 1024; // Vercel request limit is ~4.5MB
const err = (m, s = 400) => NextResponse.json({ error: m }, { status: s });
async function guard(req, write) {
  if (!(await isAdmin())) return err('Unauthorized', 401);
  if (write && !sameOrigin(req)) return err('Bad origin', 403);
  return null;
}
function sniff(b) { // magic bytes decide the real type
  if (b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47) return ['image/png', 'png'];
  if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return ['image/jpeg', 'jpg'];
  if (b.slice(0, 4).toString() === 'RIFF' && b.slice(8, 12).toString() === 'WEBP') return ['image/webp', 'webp'];
  return null;
}
const clean = (s, n) => String(s || '').replace(/[<>]/g, '').trim().slice(0, n);
export async function GET(req) {
  const g = await guard(req, false); if (g) return g;
  try { return NextResponse.json((await readSite()).data); } catch (e) { return err(e.message, 502); }
}
export async function POST(req) { // upload screenshot
  const g = await guard(req, true); if (g) return g;
  try {
    const f = await req.formData(); const file = f.get('file');
    const title = clean(f.get('title'), 80), description = clean(f.get('description'), 300), category = f.get('category');
    if (!title) return err('Title is required.');
    if (!CATS.includes(category)) return err('Invalid category.');
    if (!file || typeof file === 'string') return err('Choose an image.');
    if (file.size > MAX) return err('Image must be under 3 MB.');
    const buf = Buffer.from(await file.arrayBuffer()); const t = sniff(buf);
    if (!t || file.type !== t[0]) return err('Only real PNG, JPG or WebP images are allowed.');
    const id = crypto.randomBytes(6).toString('hex'), path = `public/uploads/${id}.${t[1]}`;
    await put(path, buf.toString('base64'), `Add screenshot ${id}`);
    const { data, sha } = await readSite();
    data.screenshots.push({ id, title, description, category, file: `/uploads/${id}.${t[1]}`, published: false });
    await saveSite(data, sha); return NextResponse.json(data);
  } catch (e) { return err(e.message, 502); }
}
export async function PUT(req) { // edit screenshot / add or edit tutorial
  const g = await guard(req, true); if (g) return g;
  try {
    const { kind, item } = await req.json(); const { data, sha } = await readSite();
    if (kind === 'screenshots') {
      const s = data.screenshots.find((x) => x.id === item?.id); if (!s) return err('Not found.', 404);
      if (!CATS.includes(item.category)) return err('Invalid category.');
      Object.assign(s, { title: clean(item.title, 80), description: clean(item.description, 300), category: item.category, published: !!item.published });
    } else if (kind === 'tutorials') {
      const m = String(item?.url || '').match(/^https:\/\/(?:www\.youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/);
      if (!m) return err('Enter a valid YouTube link.');
      const t = { id: item.id || crypto.randomBytes(6).toString('hex'), title: clean(item.title, 100), videoId: m[1], published: !!item.published };
      if (!t.title) return err('Title is required.');
      const i = data.tutorials.findIndex((x) => x.id === t.id); i >= 0 ? (data.tutorials[i] = t) : data.tutorials.push(t);
    } else return err('Invalid kind.');
    await saveSite(data, sha); return NextResponse.json(data);
  } catch (e) { return err(e.message, 502); }
}
export async function DELETE(req) {
  const g = await guard(req, true); if (g) return g;
  try {
    const u = new URL(req.url), kind = u.searchParams.get('kind'), id = u.searchParams.get('id');
    const { data, sha } = await readSite();
    if (kind === 'screenshots') {
      const s = data.screenshots.find((x) => x.id === id); if (!s) return err('Not found.', 404);
      data.screenshots = data.screenshots.filter((x) => x.id !== id);
      await saveSite(data, sha); await del('public' + s.file, `Delete screenshot ${id}`).catch(() => {});
    } else if (kind === 'tutorials') { data.tutorials = data.tutorials.filter((x) => x.id !== id); await saveSite(data, sha); }
    else return err('Invalid kind.');
    return NextResponse.json(data);
  } catch (e) { return err(e.message, 502); }
}
