function normalizeSiteUrl(url: string) {
  return url.replace(/\/+$/, "");
}

const configuredSiteUrl = process.env.SITE_URL ?? process.env.NEXT_PUBLIC_SITE_URL;
const vercelSiteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;

export const siteUrl = normalizeSiteUrl(
  configuredSiteUrl ?? (vercelSiteUrl ? `https://${vercelSiteUrl}` : "https://example.com"),
);
