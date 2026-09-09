import type { NextConfig } from "next";

// Files under /public are served by Vercel with `Cache-Control: max-age=0,
// must-revalidate` by default, so fonts, images and videos were being
// revalidated on every single navigation. Nothing here is content-hashed, so
// when you replace an asset either rename it or bump the query string.
const ONE_YEAR = 60 * 60 * 24 * 365;
const THIRTY_DAYS = 60 * 60 * 24 * 30;

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: false,
  async headers() {
    return [
      {
        // Fonts are stable for the life of the design -- safe to pin hard.
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: `public, max-age=${ONE_YEAR}, immutable`,
          },
        ],
      },
      {
        // Media gets a shorter TTL plus SWR so a replaced asset still rolls out
        // within a day without a redeploy-and-rename dance.
        source: "/:all*(mp4|webm|png|jpg|jpeg|avif|webp|svg|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: `public, max-age=${THIRTY_DAYS}, stale-while-revalidate=86400`,
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
