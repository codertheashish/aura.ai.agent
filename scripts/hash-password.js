const c = require('crypto'), cp = require('child_process'); const p = process.argv[2];
if (!p || p.length < 6) { console.error('Usage: npm run hash -- "your-password"'); process.exit(1); }
const s = c.randomBytes(16).toString('hex'), h = s + ':' + c.scryptSync(p, s, 64).toString('hex');
console.log(h); console.log('\nLength: ' + h.length + ' (must be 161). Paste it as ONE line.');
try { const b = process.platform === 'win32' ? 'clip' : process.platform === 'darwin' ? 'pbcopy' : null; if (b) { cp.spawnSync(b, { input: h }); console.log('Copied to your clipboard.'); } } catch {}
if (p.length < 12) console.error('Warning: short passwords are easy to guess.');
