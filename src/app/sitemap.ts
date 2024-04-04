import { getCachedData } from "@/actions/getCachedData";
import { MetadataRoute } from "next";
import { headers } from "next/headers";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const res: Response = await getCachedData("info", true);
  let lastModifiedDate = new Date();
  if (res.ok) {
    const lastModified = res.headers.get("last-modified");
    if (lastModified) {
      lastModifiedDate = new Date(lastModified);
    }
  }
  const headerList = headers();
  const host = headerList.get("host");

  return ["", "/projects", "/links"].map((link) => ({
    url: `https://${host}${link}`,
    lastModified: lastModifiedDate,
    changeFrequency: "monthly",
    priority: 1,
  }));
}
