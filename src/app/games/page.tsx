import { Metadata } from "next";
import { Suspense } from "react";
import GamesContent from "@/components/GamesContent";
import GameGridSkeleton from "@/components/GameGridSkeleton";

export const metadata: Metadata = {
  title: "Browse Games — FlashVault",
  description: "Browse and search the FlashVault game library.",
};

export default function GamesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <Suspense
        fallback={
          <>
            <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h1 className="font-['Fredoka'] text-3xl font-bold text-[var(--text-primary)]">All Games</h1>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">Loading the shelf…</p>
              </div>
            </div>
            <GameGridSkeleton count={8} />
          </>
        }
      >
        <GamesContent />
      </Suspense>
    </div>
  );
}
