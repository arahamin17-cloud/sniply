# sniply

This is a [Next.js](https://nextjs.org) project bootstrapped with [v0](https://v0.app).

## Built with v0

This repository is linked to a [v0](https://v0.app) project. You can continue developing by visiting the link below -- start new chats to make changes, and v0 will push commits directly to this repo. Every merge to `main` will automatically deploy.

[Continue working on v0 →](https://v0.app/chat/projects/prj_33hfYDlg2ejDbGRcophEqILHOZd9)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Authentication configuration

Authentication uses Better Auth with Drizzle and Neon Postgres. Configure these environment variables in Vercel and in local development:

```bash
NEON_DATABASE_URL=postgresql://...
BETTER_AUTH_SECRET=replace-with-a-long-random-secret
BETTER_AUTH_URL=https://eslotmain.xyz
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
RESEND_API_KEY=...
RESEND_EMAIL_DOMAIN=...
```

In Google Cloud Console, add `https://eslotmain.xyz/api/auth/callback/google` as an authorized redirect URI. Add `http://localhost:3000/api/auth/callback/google` for local testing. The Neon database must contain the `neon_auth.user`, `neon_auth.session`, `neon_auth.account`, and `neon_auth.verification` tables used by the Drizzle adapter.

## Learn More

To learn more, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [v0 Documentation](https://v0.app/docs) - learn about v0 and how to use it.
