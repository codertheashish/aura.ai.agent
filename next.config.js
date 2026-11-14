/** @type {import("next").NextConfig} */
module.exports={poweredByHeader:false,typescript:{ignoreBuildErrors:true},headers:async()=>[{source:"/(.*)",headers:[{key:"X-Content-Type-Options",value:"nosniff"},{key:"X-Frame-Options",value:"DENY"},{key:"Referrer-Policy",value:"strict-origin-when-cross-origin"}]}]};
