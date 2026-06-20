"use client";

import { useState, useCallback } from "react";

interface ShareButtonsProps {
  title: string;
  slug: string;
}

const TWITTER_SHARE_URL = "https://twitter.com/intent/tweet";
const FACEBOOK_SHARE_URL = "https://www.facebook.com/sharer/sharer.php";

export default function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}/games/${slug}`
    : `https://flashvault.com/games/${slug}`;

  const shareText = `Playing ${title} on FlashVault — classic Flash games in your browser!`;

  const handleWebShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${title} — FlashVault`,
          text: shareText,
          url: shareUrl,
        });
      } catch {
        // User cancelled or share failed — no-op
      }
    }
  }, [title, shareText, shareUrl]);

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = shareUrl;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [shareUrl]);

  const twitterUrl = `${TWITTER_SHARE_URL}?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
  const facebookUrl = `${FACEBOOK_SHARE_URL}?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;

  const hasNativeShare = typeof navigator !== "undefined" && !!navigator.share;

  return (
    <div className="fv-panel rounded-[1.5rem] p-5">
      <h2 className="text-lg font-bold text-[var(--text-primary)]">Share this game</h2>
      <p className="mt-1 text-sm text-[var(--text-muted)]">
        Share with friends and help preserve Flash history.
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        {/* Native Web Share button — primary on supported browsers */}
        {hasNativeShare && (
          <button
            onClick={handleWebShare}
            className="fv-button inline-flex items-center gap-2 rounded-full bg-[var(--accent)]/15 px-5 py-2.5 text-sm font-bold text-[var(--accent)] transition-all hover:bg-[var(--accent)]/25 hover:shadow-[0_0_20px_rgba(124,240,255,0.15)] active:scale-95"
            aria-label="Share game"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share
          </button>
        )}

        {/* Twitter/X */}
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-[var(--text-secondary)] transition-all hover:border-[#1d9bf0]/40 hover:bg-[#1d9bf0]/10 hover:text-[#1d9bf0] active:scale-95"
          aria-label="Share on Twitter/X"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          Twitter/X
        </a>

        {/* Facebook */}
        <a
          href={facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-[var(--text-secondary)] transition-all hover:border-[#1877f2]/40 hover:bg-[#1877f2]/10 hover:text-[#1877f2] active:scale-95"
          aria-label="Share on Facebook"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          Facebook
        </a>

        {/* Copy link */}
        <button
          onClick={handleCopyLink}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-[var(--text-secondary)] transition-all hover:border-[var(--accent-2)]/40 hover:bg-[var(--accent-2)]/10 hover:text-[var(--accent-2)] active:scale-95"
          aria-label="Copy link to clipboard"
        >
          {copied ? (
            <>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              Copy link
            </>
          )}
        </button>
      </div>
    </div>
  );
}
