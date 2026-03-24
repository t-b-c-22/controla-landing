import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getAllSlugs } from "@/lib/blog";

const baseUrl = "https://controla.cloud";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = routing.locales;
  const slugs = getAllSlugs();
  const now = new Date().toISOString();

  const entries: MetadataRoute.Sitemap = [];

  // Landing pages — one per locale
  for (const locale of locales) {
    entries.push({
      url: `${baseUrl}/${locale}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}`])
        ),
      },
    });
  }

  // Product pages — checkout button
  for (const locale of locales) {
    entries.push({
      url: `${baseUrl}/${locale}/checkout-button`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}/checkout-button`])
        ),
      },
    });
  }

  // Blog listing pages — one per locale
  for (const locale of locales) {
    entries.push({
      url: `${baseUrl}/${locale}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}/blog`])
        ),
      },
    });
  }

  // Blog posts — one per locale per slug
  for (const slug of slugs) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}/blog/${slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}/blog/${slug}`])
          ),
        },
      });
    }
  }

  return entries;
}
