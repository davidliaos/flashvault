"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#080b10] text-white flex flex-col items-center justify-center gap-4 px-6">
        <h2 className="text-xl font-bold">Something went wrong</h2>
        <p className="text-sm text-white/60 max-w-md text-center">
          {error.message || "An unexpected error occurred."}
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-full bg-cyan-400 px-5 py-2.5 text-sm font-bold text-[#151515]"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
