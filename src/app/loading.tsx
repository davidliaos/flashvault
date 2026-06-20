import GameGridSkeleton from "@/components/GameGridSkeleton";

export default function HomeLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      {/* Hero skeleton */}
      <section className="animate-pulse rounded-[2rem] border border-white/10 bg-white/5 px-6 py-8 sm:px-10 sm:py-12">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <div className="h-8 w-48 rounded-full bg-white/10" />
            <div className="h-12 w-3/4 rounded-xl bg-white/10" />
            <div className="h-12 w-1/2 rounded-xl bg-white/10" />
            <div className="h-5 w-full max-w-2xl rounded-lg bg-white/8" />
            <div className="h-5 w-2/3 max-w-2xl rounded-lg bg-white/8" />
            <div className="h-10 w-44 rounded-full bg-white/10" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                <div className="flex items-start gap-4">
                  <div className="h-14 w-14 shrink-0 rounded-2xl bg-white/10" />
                  <div className="space-y-2 flex-1">
                    <div className="h-3 w-16 rounded bg-white/10" />
                    <div className="h-5 w-3/4 rounded bg-white/10" />
                    <div className="h-4 w-full rounded bg-white/8" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section header + grid */}
      <section className="mt-12">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div className="animate-pulse space-y-2">
            <div className="h-8 w-32 rounded-lg bg-white/10" />
            <div className="h-4 w-64 rounded-lg bg-white/8" />
          </div>
        </div>
        <GameGridSkeleton count={8} />
      </section>
    </div>
  );
}
