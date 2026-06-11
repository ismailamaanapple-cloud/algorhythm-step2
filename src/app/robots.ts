import type { MetadataRoute } from "next";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://250plus.org";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Personal / transactional pages — no value in the index.
      disallow: ["/api/", "/auth/", "/dashboard"],
    },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
