"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAllGames } from "@/lib/games";

interface RandomGameButtonProps {
  variant?: "hero" | "nav";
}

const DICE_ICON = "🎲";
const SPIN_MS = 600;
const CYCLES = 8;

export default function RandomGameButton({ variant = "hero" }: RandomGameButtonProps) {
  const router = useRouter();
  const [spinning, setSpinning] = useState(false);
  const [displayTitle, setDisplayTitle] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const games = getAllGames();

  const cleanup = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  const handleClick = useCallback(() => {
    if (spinning) return;
    setSpinning(true);

    let count = 0;
    const cycle = () => {
      const randomIdx = Math.floor(Math.random() * games.length);
      setDisplayTitle(games[randomIdx].title);
      count++;

      if (count < CYCLES) {
        timerRef.current = setTimeout(cycle, SPIN_MS / CYCLES);
      } else {
        // Final pick
        const finalIdx = Math.floor(Math.random() * games.length);
        const chosen = games[finalIdx];
        setDisplayTitle(chosen.title);
        timerRef.current = setTimeout(() => {
          router.push(`/games/${chosen.slug}`);
        }, 300);
      }
    };

    cycle();
  }, [spinning, games, router]);

  if (variant === "nav") {
    return (
      <button
        onClick={handleClick}
        disabled={spinning}
        className="fv-button flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--text-primary)] hover:bg-white/8 disabled:opacity-60"
        aria-label="Play a random game"
        title="Random Game"
      >
        <span className={spinning ? "inline-block animate-spin" : ""}>{DICE_ICON}</span>
        <span>Random</span>
      </button>
    );
  }

  // Hero variant — big prominent button
  return (
    <button
      onClick={handleClick}
      disabled={spinning}
      className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-[var(--accent)]/40 bg-gradient-to-r from-[rgba(124,240,255,0.15)] to-[rgba(255,211,107,0.12)] px-8 py-4 text-lg font-bold text-[var(--text-primary)] shadow-[0_0_30px_rgba(124,240,255,0.15)] transition-all duration-200 hover:border-[var(--accent)] hover:shadow-[0_0_40px_rgba(124,240,255,0.3)] hover:scale-105 active:scale-100 disabled:opacity-70 disabled:hover:scale-100"
      aria-label="Play a random game"
    >
      {/* Shimmer effect */}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />

      <span className={`text-2xl ${spinning ? "animate-bounce" : "group-hover:animate-spin"}`}>
        {DICE_ICON}
      </span>

      <span className="relative">
        {spinning ? (
          <span className="inline-flex items-center gap-2">
            <span className="inline-block min-w-[120px] text-center font-mono text-[var(--accent)]">
              {displayTitle ?? "..."}
            </span>
          </span>
        ) : (
          "Random Game"
        )}
      </span>

      {spinning && (
        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-[var(--text-muted)]">
          picking...
        </span>
      )}
    </button>
  );
}
