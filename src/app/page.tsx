import Link from "next/link";
import { getAllGames, getAllCategories } from "@/lib/games";
import GameGrid from "@/components/GameGrid";
import SearchBar from "@/components/SearchBar";

import RandomGameButton from "@/components/RandomGameButton";
import FavoritesSection from "@/components/FavoritesSection";

export default function HomePage() {
  const games = getAllGames();
  const categories = getAllCategories();
  const featured = games.slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <section className="fv-panel-strong relative overflow-hidden rounded-[2rem] px-6 py-8 sm:px-10 sm:py-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,240,255,0.18),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,211,107,0.15),transparent_24%)]" />
        <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-[var(--text-secondary)]">
              <span className="h-2 w-2 rounded-full bg-[var(--accent)] shadow-[0_0_12px_rgba(124,240,255,0.9)]" />
              nostalgic browser arcade
            </div>
            <div>
              <h1 className="max-w-3xl font-['Fredoka'] text-5xl font-bold leading-none tracking-tight text-[var(--text-primary)] sm:text-6xl lg:text-7xl">
                Remember this <span className="text-[var(--accent)]">game</span>?
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg">
                FlashVault is the clean, fast way to replay dead Flash classics in your browser. No plugins.
                No downloads. Just nostalgia, reloaded.
              </p>
            </div>

            <div className="max-w-2xl">
              <SearchBar />
            </div>

            <div>
              <RandomGameButton variant="hero" />
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--text-secondary)]">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">Ruffle-powered</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">Mobile friendly</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">AdSense-ready</span>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {featured.map((game, index) => (
              <Link
                key={game.slug}
                href={`/games/${game.slug}`}
                className="fv-card-hover rounded-[1.5rem] border border-white/10 bg-white/5 p-4 backdrop-blur"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(145deg,rgba(124,240,255,0.2),rgba(255,211,107,0.16))] text-xl font-black text-white">
                    {game.title.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm uppercase tracking-[0.28em] text-[var(--accent-2)]">
                      featured
                    </div>
                    <h3 className="mt-1 text-lg font-extrabold text-[var(--text-primary)]">
                      {game.title}
                    </h3>
                    <p className="mt-1 text-sm text-[var(--text-secondary)]">{game.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FavoritesSection />

      <section className="mt-10 grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="fv-panel rounded-[1.75rem] p-6">
          <h2 className="font-['Fredoka'] text-2xl font-bold text-[var(--text-primary)]">Arcade directories</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
            Pick a lane: platformers, puzzles, strategy, action. The old school computer lab formula still works.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/categories/${cat}`}
                className="fv-button rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold capitalize text-[var(--text-primary)] hover:border-[var(--accent)] hover:bg-white/8"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>

        <div className="fv-panel rounded-[1.75rem] p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="font-['Fredoka'] text-2xl font-bold text-[var(--text-primary)]">Today’s picks</h2>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                A small starting shelf. We’ll keep adding more, but this is enough to feel real.
              </p>
            </div>
            <Link href="/games" className="text-sm font-semibold text-[var(--accent)] hover:text-[var(--accent-hover)]">
              Browse all →
            </Link>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {games.slice(0, 6).map((game) => (
              <Link
                key={game.slug}
                href={`/games/${game.slug}`}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-[var(--accent)] hover:bg-white/[0.07]"
              >
                <div className="text-xs uppercase tracking-[0.25em] text-[var(--text-muted)]">{game.category}</div>
                <div className="mt-2 font-semibold text-[var(--text-primary)]">{game.title}</div>
                <div className="mt-1 text-sm text-[var(--text-secondary)]">{game.year} · {game.creator}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-12">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-['Fredoka'] text-3xl font-bold text-[var(--text-primary)]">The shelf</h2>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">A first pass at the catalogue — polished enough to browse, nostalgic enough to grin at.</p>
          </div>
          <div className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[var(--text-secondary)] md:block">
            10 starter games · archive-sourced
          </div>
        </div>
        <GameGrid games={games} />
      </section>
    </div>
  );
}
