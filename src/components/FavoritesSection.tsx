"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getFavorites } from "@/lib/favorites";
import { getAllGames } from "@/lib/games";
import FavoriteButton from "@/components/FavoriteButton";

export default function FavoritesSection() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  if (favorites.length === 0) return null;

  const allGames = getAllGames();
  const favoriteGames = favorites
    .map((slug) => allGames.find((g) => g.slug === slug))
    .filter(Boolean) as ReturnType<typeof getAllGames>;

  if (favoriteGames.length === 0) return null;

  return (
    <section className="mt-10">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h2 className="font-['Fredoka'] text-3xl font-bold text-[var(--text-primary)]">
            Your favorites
          </h2>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Games you&apos;ve hearted — your personal arcade shelf.
          </p>
        </div>
        <div className="hidden rounded-full border border-rose-400/20 bg-rose-500/10 px-4 py-2 text-sm text-rose-300 md:block">
          {favoriteGames.length} favorite{favoriteGames.length !== 1 ? "s" : ""}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {favoriteGames.map((game) => (
          <div
            key={game.slug}
            className="group relative rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-rose-400/30 hover:bg-white/[0.07]"
          >
            <div className="flex items-start justify-between gap-3">
              <Link href={`/games/${game.slug}`} className="flex-1 min-w-0">
                <div className="text-xs uppercase tracking-[0.25em] text-[var(--text-muted)]">
                  {game.category}
                </div>
                <div className="mt-1 font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] truncate">
                  {game.title}
                </div>
                <div className="mt-1 text-sm text-[var(--text-secondary)]">
                  {game.year} · {game.creator}
                </div>
              </Link>
              <FavoriteButton slug={game.slug} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
