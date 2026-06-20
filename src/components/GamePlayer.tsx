"use client";

import { useEffect, useRef, useState } from "react";
import { getPlayableSwfUrl } from "@/lib/swf-proxy";

interface GamePlayerProps {
  swfUrl: string;
  title: string;
  width?: number;
  height?: number;
}

export default function GamePlayer({
  swfUrl,
  title,
  width = 960,
  height = 540,
}: GamePlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;

    async function waitForRuffle(timeoutMs = 8000) {
      const deadline = Date.now() + timeoutMs;
      while (Date.now() < deadline) {
        const ruffle = (window as Window & {
          RufflePlayer?: { newest: () => { createPlayer: () => HTMLElement } };
        }).RufflePlayer;
        if (ruffle?.newest) return ruffle;
        await new Promise((resolve) => window.setTimeout(resolve, 50));
      }
      throw new Error("Ruffle player unavailable");
    }

    async function mountPlayer() {
      if (!containerRef.current) return;

      try {
        const existing = document.querySelector('script[data-ruffle="true"]');
        if (!existing) {
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement("script");
            script.src = "/ruffle/ruffle.js";
            script.async = true;
            script.dataset.ruffle = "true";
            script.onload = () => resolve();
            script.onerror = () => reject(new Error("Failed to load Ruffle script"));
            document.head.appendChild(script);
          });
        }

        if (cancelled || !containerRef.current) return;

        const ruffle = await waitForRuffle();
        const player = ruffle.newest().createPlayer();
        if (!player) throw new Error("Ruffle player unavailable");

        containerRef.current.replaceChildren(player);
        (player as HTMLObjectElement & { ruffle?: () => { load: (url: string) => void } })
          .ruffle?.()
          .load(getPlayableSwfUrl(swfUrl));
        setStatus("ready");
      } catch (error) {
        console.error("Ruffle failed; showing fallback.", error);
        if (!cancelled) setStatus("error");
      }
    }

    mountPlayer();

    return () => {
      cancelled = true;
      containerRef.current?.replaceChildren();
    };
  }, [swfUrl]);

  return (
    <section className="fv-panel-strong overflow-hidden rounded-[2rem] border border-white/10">
      <div className="border-b border-white/10 px-4 py-3 sm:px-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded-full bg-[var(--accent)]/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.24em] text-[var(--accent)]">
            Arcade Cabinet
          </div>
          <div className="text-sm text-[var(--text-secondary)]">
            Click inside the game, then use your keyboard like it’s 2007 again.
          </div>
        </div>
      </div>

      <div className="p-3 sm:p-6">
        <div className="relative mx-auto overflow-hidden rounded-[1.5rem] border border-white/10 bg-black shadow-2xl" style={{ maxWidth: width }}>
          <div
            className="relative flex items-center justify-center bg-[radial-gradient(circle_at_center,rgba(124,240,255,0.10),transparent_40%),linear-gradient(180deg,#080b10,#111723)]"
            style={{ width: "100%", aspectRatio: `${width} / ${height}` }}
            role="application"
            aria-label={`Flash game: ${title}`}
          >
            <div ref={containerRef} className="absolute inset-0" />
            {status !== "ready" ? (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
                {status === "loading" ? (
                  <>
                    <div className="mb-4 h-12 w-12 animate-pulse rounded-full border-4 border-[var(--accent)]/30 border-t-[var(--accent)]" />
                    <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[var(--text-secondary)]">
                      Loading Ruffle
                    </p>
                  </>
                ) : (
                  <>
                    <div className="mb-4 rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-amber-200">
                      Emulator hiccup
                    </div>
                    <p className="max-w-md text-sm leading-relaxed text-[var(--text-secondary)]">
                      The Flash game player failed to load. The page is still live; the fallback mode keeps the site from looking broken.
                    </p>
                    <a
                      href={swfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="fv-button mt-5 rounded-full bg-[var(--accent-2)] px-5 py-2.5 text-sm font-extrabold text-[#151515]"
                    >
                      Open Archive File
                    </a>
                  </>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
