const STORAGE_KEY = "flashvault-favorites";

export function getFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function toggleFavorite(slug: string): boolean {
  const favorites = getFavorites();
  const index = favorites.indexOf(slug);
  let isFavorite: boolean;

  if (index === -1) {
    favorites.push(slug);
    isFavorite = true;
  } else {
    favorites.splice(index, 1);
    isFavorite = false;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  return isFavorite;
}

export function isFavorite(slug: string): boolean {
  return getFavorites().includes(slug);
}
