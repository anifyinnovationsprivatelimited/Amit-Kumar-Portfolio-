# Amit Portfolio

Next.js 16 + Tailwind CSS portfolio for Dr. Amit Kumar.

The project is configured with `output: "export"` in `next.config.ts`, so `npm run build` generates a static site in `out/`. This works for static hosting and is also safe to deploy on Vercel because the current app routes are fully static.

## Prerequisites

- Node.js 20.x or newer
- npm 10 or newer
- A production URL for metadata, robots, and sitemap generation

Create a local environment file from the example:

```bash
cp .env.example .env.local
```

Then set:

```bash
SITE_URL=https://your-domain.com
```

## Run Locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Build

```bash
npm run build
```

The static output is generated in `out/`.

## Deploy To Vercel

This repo includes `vercel.json` with:

- `installCommand`: `npm ci`
- `buildCommand`: `npm run build`
- `framework`: `nextjs`

Recommended Vercel settings:

- Framework Preset: `Next.js`
- Install Command: `npm ci`
- Build Command: `npm run build`
- Environment Variable: `SITE_URL=https://your-production-domain.com`

If you deploy before the custom domain is connected, Vercel's deployment URL is used as a fallback for metadata, sitemap, and robots.

## Deployment Checks

Run these before deploying:

```bash
cmd /c npm run lint
cmd /c npm run build
```

Known local issue on Windows:

- Running `npm run ...` directly in PowerShell may fail if script execution is disabled. Use `cmd /c npm run build` or update the PowerShell execution policy.

Known deployment considerations:

- Keep `SITE_URL` accurate in Vercel once the final domain is connected.
- Do not commit `.env.local`; Vercel environment variables should be configured in the Vercel dashboard.
- Because the project uses static export, avoid adding server-only features unless you remove `output: "export"` first.
- Images are set to `unoptimized: true`, which is required for static export compatibility.

## Useful Scripts

- `npm run dev`: local development server
- `npm run build`: production static build
- `npm run lint`: lint the project
