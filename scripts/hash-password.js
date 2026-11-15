const c=require('crypto');const p=process.argv[2];
if(!p||p.length<6){console.error('Usage: npm run hash -- "your-password"');process.exit(1)}
const s=c.randomBytes(16).toString('hex');console.log(s+':'+c.scryptSync(p,s,64).toString('hex'));
if(p.length<12)console.error('Warning: short passwords are easy to guess. Use 12+ characters if you can.');
