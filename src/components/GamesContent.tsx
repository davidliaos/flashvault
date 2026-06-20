"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getAllGames, searchGames } from "@/lib/games";
import GameGrid from "@/components/GameGrid";
import SearchBar from "@/components/SearchBar";

export default function GamesContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const [allGames] = useState(() => getAllGames());
  const games = useMemo(() => (q ? searchGames(q) : allGames), [q, allGames]);

  return (
    <>
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-['Fredoka'] text-3xl font-bold text-[var(--text-primary)]">
            {q ? `Search: “${q}”` : "All Games"}
          </h1>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            {games.length} games in the shelf — still room to grow.
          </p>
        </div>
        <div className="w-full sm:max-w-md">
          <SearchBar initialQuery={q} />
        </div>
      </div>
      <GameGrid games={games} />
    </>
  );
}
