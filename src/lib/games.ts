import gamesData from "@/data/games.json";

export interface Game {
  slug: string;
  title: string;
  description: string;
  category: string;
  year: number;
  creator: string;
  archiveUrl: string;
  swfUrl: string;
  thumbnail: string;
  tags: string[];
}

export function getAllGames(): Game[] {
  return gamesData as Game[];
}

export function getGameBySlug(slug: string): Game | undefined {
  return (gamesData as Game[]).find((g) => g.slug === slug);
}

export function getGamesByCategory(category: string): Game[] {
  return (gamesData as Game[]).filter((g) => g.category === category);
}

export function getAllCategories(): string[] {
  return [...new Set((gamesData as Game[]).map((g) => g.category))];
}

export function searchGames(query: string): Game[] {
  const q = query.toLowerCase();
  return (gamesData as Game[]).filter(
    (g) =>
      g.title.toLowerCase().includes(q) ||
      g.description.toLowerCase().includes(q) ||
      g.tags.some((t) => t.toLowerCase().includes(q)) ||
      g.creator.toLowerCase().includes(q)
  );
}

export function getRandomGame(): Game {
  const all = gamesData as Game[];
  return all[Math.floor(Math.random() * all.length)];
}
