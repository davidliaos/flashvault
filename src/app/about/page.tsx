import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — FlashVault",
  description: "Learn about FlashVault, the web portal preserving classic Flash games with Ruffle.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="fv-panel-strong rounded-[2rem] p-6 sm:p-8">
        <h1 className="font-['Fredoka'] text-4xl font-bold text-[var(--text-primary)]">About FlashVault</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-[var(--text-secondary)]">
          Flash died in 2020. Over 100,000 games vanished overnight. FlashVault is the answer: a clean,
          fast, mobile-friendly portal to replay the classics in-browser.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="fv-panel rounded-[1.5rem] p-5">
            <h2 className="text-xl font-bold text-[var(--text-primary)]">How it works</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
              FlashVault uses <a className="text-[var(--accent)] hover:text-[var(--accent-hover)]" href="https://ruffle.rs" target="_blank" rel="noreferrer">Ruffle</a>, an open-source Flash emulator written in Rust and compiled to WebAssembly.
            </p>
          </div>
          <div className="fv-panel rounded-[1.5rem] p-5">
            <h2 className="text-xl font-bold text-[var(--text-primary)]">Where the games come from</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
              Games are sourced from the Internet Archive’s Flash collection and preserved for historical browsing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
