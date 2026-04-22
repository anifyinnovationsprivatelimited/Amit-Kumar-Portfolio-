# Amit Portfolio

Next.js 16 + Tailwind CSS portfolio for Dr. Amit Kumar.

The project deploys on Vercel using the standard Next.js build output in `.next`. It does not use static export, `next export`, a custom `distDir`, or an `out` output directory.

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

The Next.js production output is generated in `.next/`.

## Deploy To Vercel

This repo includes `vercel.json` with:

- `framework`: `nextjs`
- `installCommand`: `npm ci`
- `buildCommand`: `npm run build`

Recommended Vercel settings:

- Framework Preset: `Next.js`
- Install Command: `npm ci`
- Build Command: `npm run build`
- Output Directory: leave empty / default, or `.next` if the dashboard requires a value
- Environment Variable: `SITE_URL=https://your-production-domain.com`

Do not set Vercel's Output Directory to `out`. Vercel's Next.js builder needs `.next/routes-manifest.json`.

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
- This project uses App Router from `src/app`.
- This project does not use Turborepo, so no `turbo.json` output config is needed.

## Useful Scripts

- `npm run dev`: local development server
- `npm run build`: production Next.js build
- `npm run lint`: lint the project
