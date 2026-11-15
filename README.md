# JINI AI website (website-only repo)

Next.js 15. No database, no analytics, no payments. Never put the Jini desktop app code in this repo.

## Run locally
    npm install && npm run dev

## Admin setup (Vercel > Settings > Environment Variables)
See `.env.example`. Create the password hash with `npm run hash -- "your long password"`.
GitHub token: fine-grained, this repo only, Contents read/write. Admin is at `/admin`.
Every admin change is a Git commit; Vercel redeploys automatically (about a minute).

## Edit manually
`content/site.json`: download URLs (`downloads`). Social links: `CREATOR` in `lib/content.js`.

## Accounts
Google redirect URI: `https://jini-ai-agent.vercel.app/api/auth/google/callback`. Email sign-up needs the free Upstash Redis variables; Google sign-in works without it.
Admin: open `/admin` directly (not linked on the site). Set the password with `npm run hash -- "your password"` and paste the output into `ADMIN_PASSWORD_HASH`.
