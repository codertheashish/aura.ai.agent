# BABU AI website (website-only repo)

Next.js 15. No database, no analytics, no payments. Never put the Babu desktop app code in this repo.

## Run locally
    npm install && npm run dev

## Admin setup (Vercel > Settings > Environment Variables)
See `.env.example`. Create the password hash with `npm run hash -- "your long password"`.
GitHub token: fine-grained, this repo only, Contents read/write. Admin is at `/admin`.
Every admin change is a Git commit; Vercel redeploys automatically (about a minute).

## Edit manually
`content/site.json`: download URLs (`downloads`), LinkedIn/YouTube (`creator`).
