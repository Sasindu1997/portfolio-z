import { MetadataRoute } from "next";
import { db } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://zenodesoftware.com";

  let projectUrls: MetadataRoute.Sitemap = [];
  try {
    const projects = await db.project.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    });
    projectUrls = projects.map((p) => ({
      url: `${baseUrl}/projects/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly",
      priority: 0.8,
    }));
  } catch {
    // DB might not be available during build
  }

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...projectUrls,
  ];
}
