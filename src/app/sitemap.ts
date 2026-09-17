import type { MetadataRoute } from "next";
import { company } from "@/data/company";
import { services } from "@/data/services";
import { newsArticles } from "@/data/news";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/ratgeber", "/karriere", "/kontakt"];
  const serviceRoutes = services.map((s) => `/leistungen/${s.slug}`);
  const articleRoutes = newsArticles.map((a) => `/ratgeber/${a.slug}`);

  return [...staticRoutes, ...serviceRoutes, ...articleRoutes].map((path) => ({
    url: `${company.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.6,
  }));
}
