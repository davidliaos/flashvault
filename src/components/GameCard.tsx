import Link from "next/link";
import type { Game } from "@/lib/games";
import FavoriteButton from "@/components/FavoriteButton";

interface GameCardProps {
  game: Game;
}

const chipColors: Record<string, string> = {
  platformer: "from-cyan-400/25 to-cyan-300/10 text-cyan-100",
  action: "from-rose-400/25 to-rose-300/10 text-rose-100",
  puzzle: "from-amber-300/25 to-amber-200/10 text-amber-50",
  strategy: "from-emerald-400/25 to-emerald-300/10 text-emerald-50",
};

export default function GameCard({ game }: GameCardProps) {
  const chip = chipColors[game.category] ?? "from-white/20 to-white/5 text-white";

  return (
    <Link
      href={`/games/${game.slug}`}
      className="fv-card-hover group relative overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-4 shadow-[0_18px_50px_rgba(0,0,0,0.28)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(124,240,255,0.14),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(255,211,107,0.10),transparent_30%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#101723]">
        <div className="aspect-[4/3] flex items-center justify-center bg-[linear-gradient(135deg,rgba(124,240,255,0.22),rgba(255,211,107,0.16))]">
          <div className="text-center">
            <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-[#0b0f14]/55 text-2xl font-black text-white shadow-lg">
              {game.title.charAt(0)}
            </div>
            <div className="text-sm font-semibold uppercase tracking-[0.28em] text-white/75">
              play now
            </div>
          </div>
        </div>
        <div className={`absolute left-3 top-3 rounded-full bg-gradient-to-r px-3 py-1 text-[11px] font-bold uppercase tracking-[0.25em] ${chip}`}>
          {game.category}
        </div>
        <div className="absolute right-3 top-3 flex items-center gap-1.5">
          <FavoriteButton slug={game.slug} />
          <div className="rounded-full border border-white/10 bg-black/35 px-2.5 py-1 text-[11px] font-medium text-white/80 backdrop-blur">
            {game.year}
          </div>
        </div>
      </div>

      <div className="relative mt-4 space-y-2">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-extrabold leading-tight text-[var(--text-primary)] group-hover:text-[var(--accent)]">
            {game.title}
          </h3>
        </div>
        <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
          {game.description}
        </p>
        <div className="flex items-center justify-between pt-2 text-xs text-[var(--text-muted)]">
          <span>{game.creator}</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] uppercase tracking-[0.22em] text-[var(--text-secondary)]">
            archive-backed
          </span>
        </div>
      </div>
    </Link>
  );
}
