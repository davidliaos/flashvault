import type { Game } from "@/lib/games";
import GameCard from "./GameCard";
import GameGridSkeleton from "./GameGridSkeleton";

interface GameGridProps {
  games: Game[];
  loading?: boolean;
  skeletonCount?: number;
}

export default function GameGrid({ games, loading = false, skeletonCount = 8 }: GameGridProps) {
  if (loading) {
    return <GameGridSkeleton count={skeletonCount} />;
  }

  if (games.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-400 text-lg">No games found.</p>
        <p className="text-gray-500 text-sm mt-2">
          Try a different search or category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {games.map((game) => (
        <GameCard key={game.slug} game={game} />
      ))}
    </div>
  );
}
