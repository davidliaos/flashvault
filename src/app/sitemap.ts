import type { MetadataRoute } from "next";
import gamesData from "@/data/games.json";

export const dynamic = "force-static";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://flashvault.app";

const staticPages = [
  { url: "/", changeFrequency: "monthly", priority: 1 },
  { url: "/games", changeFrequency: "monthly", priority: 0.8 },
  { url: "/about", changeFrequency: "monthly", priority: 0.5 },
] as const;

type Game = {
  slug: string;
  category: string;
};

export default function sitemap(): MetadataRoute.Sitemap {
  const games = gamesData as Game[];
  const categories = [...new Set(games.map((game) => game.category))].sort();
  const lastModified = new Date("2026-06-13T00:00:00.000Z");

  return [
    ...staticPages.map((page) => ({
      url: new URL(page.url, siteUrl).toString(),
      lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...categories.map((category) => ({
      url: new URL(`/categories/${category}`, siteUrl).toString(),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    ...games.map((game) => ({
      url: new URL(`/games/${game.slug}`, siteUrl).toString(),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
