"use client";

import { useState, useEffect, useCallback } from "react";
import { getFavorites, toggleFavorite, isFavorite } from "@/lib/favorites";

interface FavoriteButtonProps {
  slug: string;
  className?: string;
}

export default function FavoriteButton({ slug, className = "" }: FavoriteButtonProps) {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    setFavorite(isFavorite(slug));
  }, [slug]);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const nowFavorite = toggleFavorite(slug);
      setFavorite(nowFavorite);
    },
    [slug]
  );

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      className={`group/fav relative z-10 flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-200 ${
        favorite
          ? "border-rose-400/40 bg-rose-500/20 text-rose-400 shadow-[0_0_14px_rgba(244,63,94,0.25)]"
          : "border-white/15 bg-black/30 text-white/50 backdrop-blur hover:border-white/30 hover:text-white/80"
      } ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={favorite ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={favorite ? 0 : 1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4.5 w-4.5 transition-transform duration-200 group-active/fav:scale-125"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
}
