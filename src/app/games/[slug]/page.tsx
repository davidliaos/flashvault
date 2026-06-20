import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getGameBySlug, getAllGames } from "@/lib/games";
import GamePlayer from "@/components/GamePlayer";
import ShareButtons from "@/components/ShareButtons";
import FavoriteButton from "@/components/FavoriteButton";
import AdSenseSlot from "@/components/AdSenseSlot";

interface GamePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const games = getAllGames();
  return games.map((game) => ({ slug: game.slug }));
}

export async function generateMetadata({
  params,
}: GamePageProps): Promise<Metadata> {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) return { title: "Game Not Found — FlashVault" };
  return {
    title: `${game.title} — FlashVault`,
    description: game.description,
    openGraph: {
      title: `Play ${game.title} on FlashVault`,
      description: game.description,
      type: "website",
      siteName: "FlashVault",
      images: [
        {
          url: "/flashvault-og.png",
          width: 1200,
          height: 630,
          alt: `Play ${game.title} on FlashVault`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Play ${game.title} on FlashVault`,
      description: game.description,
      images: ["/flashvault-og.png"],
    },
  };
}

export default async function GamePage({ params }: GamePageProps) {
  const { slug } = await params;
  const game = getGameBySlug(slug);

  if (!game) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-[var(--text-muted)]">
        <Link href="/" className="hover:text-[var(--accent)]">Home</Link>
        <span>/</span>
        <Link href="/games" className="hover:text-[var(--accent)]">Games</Link>
        <span>/</span>
        <span className="text-[var(--text-secondary)]">{game.title}</span>
      </nav>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <div className="fv-panel-strong rounded-[2rem] p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <FavoriteButton slug={slug} />
              <span className="rounded-full bg-white/8 px-3 py-1 text-xs font-bold uppercase tracking-[0.24em] text-[var(--accent)]">
                {game.category}
              </span>
              <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-xs font-semibold text-[var(--text-secondary)]">
                {game.year}
              </span>
              <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-xs font-semibold text-[var(--text-secondary)]">
                by {game.creator}
              </span>
            </div>
            <h1 className="mt-4 font-['Fredoka'] text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl">
              {game.title}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg">
              {game.description}
            </p>
          </div>

          <GamePlayer
            swfUrl={game.swfUrl}
            title={game.title}
            width={960}
            height={540}
          />

          <ShareButtons title={game.title} slug={slug} />

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="fv-panel rounded-[1.5rem] p-5">
              <h2 className="text-lg font-bold text-[var(--text-primary)]">Why it matters</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                This is the kind of thing people used to discover on coolmathgames and then waste a school afternoon on.
              </p>
            </div>
            <div className="fv-panel rounded-[1.5rem] p-5">
              <h2 className="text-lg font-bold text-[var(--text-primary)]">Controls</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                Click the game, then use your keyboard or mouse as the original Flash author intended.
              </p>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="fv-panel rounded-[1.75rem] p-5">
            <h2 className="text-lg font-bold text-[var(--text-primary)]">Archive details</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-4 border-b border-white/8 pb-2">
                <dt className="text-[var(--text-muted)]">Creator</dt>
                <dd className="text-right text-[var(--text-primary)]">{game.creator}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-white/8 pb-2">
                <dt className="text-[var(--text-muted)]">Year</dt>
                <dd className="text-right text-[var(--text-primary)]">{game.year}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-white/8 pb-2">
                <dt className="text-[var(--text-muted)]">Category</dt>
                <dd className="text-right text-[var(--text-primary)] capitalize">{game.category}</dd>
              </div>
            </dl>
            <a
              href={game.archiveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="fv-button mt-5 inline-flex items-center gap-2 rounded-full bg-[var(--accent-2)] px-4 py-2.5 text-sm font-extrabold text-[#1b1b1b]"
            >
              Open source archive
            </a>
          </div>

          <div className="fv-panel rounded-[1.75rem] p-5">
            <h2 className="text-lg font-bold text-[var(--text-primary)]">What you’re getting</h2>
            <ul className="mt-3 space-y-2 text-sm text-[var(--text-secondary)]">
              <li>• A clean launcher that should not look broken when emulation fails.</li>
              <li>• A nostalgic, cabinet-style game page instead of a blank utility screen.</li>
              <li>• Straightforward archive sourcing so you can scale the library quickly.</li>
            </ul>
          </div>

          <div className="fv-panel rounded-[1.75rem] p-5">
            <AdSenseSlot slotId="game-sidebar-rectangle" width={300} height={250} />
          </div>
        </aside>
      </section>
    </div>
  );
}
