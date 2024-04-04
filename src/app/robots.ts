import type { MetadataRoute } from "next";
import { headers } from "next/headers";

export default function robots(): MetadataRoute.Robots {
  const headerList = headers();
  const host = headerList.get("host");

  return {
    rules: {
      userAgent: "*",
      allow: ["/"],
      disallow: "/private/",
    },
    sitemap: `https://${host}/sitemap.xml`,
    ...(host
      ? {
          host,
        }
      : {}),
  };
}
