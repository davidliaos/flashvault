import Link from "next/link";
import RandomGameButton from "@/components/RandomGameButton";

const nav = [
  { href: "/games", label: "Browse" },
  { href: "/categories/platformer", label: "Platformers" },
  { href: "/about", label: "About" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0f14]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <div className="fv-accent-glow flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(145deg,rgba(124,240,255,0.24),rgba(255,211,107,0.18))] text-xl shadow-lg shadow-cyan-400/10">
            ⚡
          </div>
          <div>
            <div className="font-['Fredoka'] text-2xl font-bold tracking-wide text-[var(--text-primary)]">
              Flash<span className="text-[var(--accent)]">Vault</span>
            </div>
            <div className="text-xs uppercase tracking-[0.35em] text-[var(--text-muted)]">
              dead games, alive again
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="fv-button rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:border-[color:var(--accent)] hover:text-[var(--text-primary)] hover:bg-white/8"
            >
              {item.label}
            </Link>
          ))}
          <RandomGameButton variant="nav" />
        </nav>
      </div>
    </header>
  );
}
