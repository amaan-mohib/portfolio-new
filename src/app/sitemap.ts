import { getCachedData } from "@/actions/getCachedData";
import { MetadataRoute } from "next";
import { headers } from "next/headers";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const res: Response = await getCachedData("info", true);
  const { projects } = await getCachedData("projects");

  let lastModifiedDate = new Date();
  if (res.ok) {
    const lastModified = res.headers.get("last-modified");
    if (lastModified) {
      lastModifiedDate = new Date(lastModified);
    }
  }
  const headerList = headers();
  const host = headerList.get("host");

  const links: MetadataRoute.Sitemap = ["", "/projects", "/links"].map(
    (link) => ({
      url: `https://${host}${link}`,
      lastModified: lastModifiedDate,
      changeFrequency: "monthly",
      priority: 1,
    }),
  );

  projects.forEach((item: any) => {
    links.push({
      url: `https://${host}/projects/${item.slug || item.name}`,
      lastModified: lastModifiedDate,
      changeFrequency: "monthly",
      priority: 0.75,
    });
  });

  return links;
}
