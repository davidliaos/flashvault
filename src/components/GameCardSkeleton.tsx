interface GameCardSkeletonProps {
  count?: number;
}

export default function GameCardSkeleton({ count = 1 }: GameCardSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-4"
        >
          {/* Thumbnail area — aspect 4:3 */}
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#101723]">
            <div className="aspect-[4/3] flex items-center justify-center">
              <div className="h-14 w-14 rounded-2xl bg-white/10" />
            </div>
          </div>

          {/* Title */}
          <div className="mt-4 space-y-2">
            <div className="h-5 w-3/4 rounded-lg bg-white/10" />
            {/* Description lines */}
            <div className="h-4 w-full rounded-lg bg-white/8" />
            <div className="h-4 w-5/6 rounded-lg bg-white/8" />
            {/* Bottom row — creator + chip */}
            <div className="flex items-center justify-between pt-2">
              <div className="h-3 w-24 rounded-lg bg-white/8" />
              <div className="h-5 w-20 rounded-full bg-white/8" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
