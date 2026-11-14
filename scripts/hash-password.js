const c=require('crypto');const p=process.argv[2];
if(!p||p.length<12){console.error('Usage: npm run hash -- "password-of-12+-chars"');process.exit(1)}
const s=c.randomBytes(16).toString('hex');console.log(s+':'+c.scryptSync(p,s,64).toString('hex'));
