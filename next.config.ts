import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Static export makes the site compatible with GoDaddy's static hosting and
   * cPanel deployments. Build output will go to out/ for upload.
   */
  output: "export",
  trailingSlash: true,
  images: {
    /**
     * GoDaddy won't run Next.js image optimization. This disables the server
     * requirement so local /public assets work as-is.
     */
    unoptimized: true,
  },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
