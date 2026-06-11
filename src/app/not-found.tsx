import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const SECTIONS = [
  { href: "/#library", label: "Algorithms", desc: "Decision trees for every workup" },
  { href: "/notes", label: "Notes", desc: "High-yield topic reviews" },
  { href: "/cases", label: "Cases", desc: "Vignette practice" },
  { href: "/flashcards", label: "Flashcards", desc: "Spaced repetition decks" },
];

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="max-w-lg w-full text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/40 mb-3">
            404 — not found
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-shimmer">
            This page didn&apos;t match.
          </h1>
          <p className="mt-3 text-sm text-white/60 leading-relaxed">
            The link may be outdated or the content may have moved. Jump back
            into studying:
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
            {SECTIONS.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="glass rounded-2xl px-4 py-3.5 hover:bg-white/[0.06] transition group"
              >
                <div className="text-sm font-semibold text-white group-hover:text-cyan-200 transition">
                  {s.label}
                </div>
                <div className="text-xs text-white/50 mt-0.5">{s.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
