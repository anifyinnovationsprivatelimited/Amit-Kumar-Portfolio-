# Amit Portfolio

Next.js 16 + Tailwind CSS portfolio for Dr. Amit Kumar. The project is configured for a static export so it can be hosted on GoDaddy (cPanel or plain static hosting) without running a Node.js server.

## Prerequisites
- Node.js 20.x (LTS) and npm 10+
- Set the public site URL in .env.local using the provided template:
  `ash
  cp .env.example .env.local
  # edit and set your GoDaddy domain
  SITE_URL=https://your-domain.com
  `

## Run locally
`ash
npm install
npm run dev
`
Visit http://localhost:3000

## Build (static export)
The site is configured with output: "export" and unoptimized images so it renders to plain HTML/CSS/JS in out/.
`ash
npm run build
`
The out/ folder is ready to upload to GoDaddy.

## Deploy to GoDaddy (cPanel/static hosting)
1) Build locally: 
pm run build (ensures out/ is freshly generated).
2) Zip the contents *inside* out/ (not the folder itself), or upload via FTP/SFTP.
3) In GoDaddy File Manager, upload the files into public_html (or your chosen subdomain folder). Ensure index.html sits at the root of that directory.
4) If a previous site exists, back it up first; then replace its files with the new out/ contents.
5) Clear any GoDaddy caching/CDN if enabled.

## Useful scripts
- 
pm run dev – local dev server
- 
pm run build – production static build to out/
- 
pm run lint – lint the project

## Notes
- Because GoDaddy cannot run Next.js image optimization, images are marked unoptimized and are loaded directly from /public.
- Robots and sitemap are generated at build time and use SITE_URL; keep that value accurate before each production build.
