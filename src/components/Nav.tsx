"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, Menu, X } from "lucide-react";
import AuthButton from "./auth/AuthButton";
import { BrandMark, BrandWordmark } from "./Brand";
import { SearchTrigger } from "./search/GlobalSearch";

type NavItem = {
  href: string;
  label: string;
  /** Optional accent class — kept consistent across desktop + mobile. */
  accent?: string;
  icon?: React.ReactNode;
};

const NAV_ITEMS: NavItem[] = [
  { href: "/#library", label: "Algorithms" },
  { href: "/cases", label: "Cases" },
  { href: "/notes", label: "Notes" },
  {
    href: "/flashcards",
    label: "Flashcards",
    icon: <Layers className="h-3.5 w-3.5 text-cyan-300" />,
  },
  {
    href: "/ekg",
    label: "EKG",
    accent: "text-rose-200/85 hover:text-rose-100 hover:bg-rose-300/10",
  },
  {
    href: "/pharmacology",
    label: "Pharm",
    accent: "text-emerald-200/85 hover:text-emerald-100 hover:bg-emerald-300/10",
  },
  { href: "/dashboard", label: "Dashboard" },
  {
    href: "/pricing",
    label: "Pricing",
    accent: "text-fuchsia-200/85 hover:text-fuchsia-100 hover:bg-fuchsia-300/10",
  },
  {
    href: "/omm",
    label: "OMM",
    accent: "text-amber-200/85 hover:text-amber-100 hover:bg-amber-300/10",
  },
];

const DEFAULT_ACCENT =
  "text-white/70 hover:text-white hover:bg-white/5";

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Close the mobile sheet whenever the user navigates.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll while the sheet is open.
  useEffect(() => {
    if (typeof document === "undefined") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = mobileOpen ? "hidden" : prev;
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  // Esc closes the sheet.
  useEffect(() => {
    if (!mobileOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-40 w-full"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 md:py-5">
        <div className="glass-strong flex items-center justify-between rounded-2xl px-3 sm:px-5 py-2.5 md:py-3 gap-2">
          <Link href="/" className="flex items-center gap-3 group min-w-0">
            <BrandMark />
            <BrandWordmark withTagline />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1 text-sm">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 rounded-lg transition inline-flex items-center gap-1.5 ${
                  item.accent ?? DEFAULT_ACCENT
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right cluster — search, auth, mobile menu */}
          <div className="flex items-center gap-2 shrink-0">
            <SearchTrigger />
            <AuthButton />
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden inline-flex items-center justify-center rounded-lg p-2 text-white/70 hover:text-white hover:bg-white/5 transition"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-sheet"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer — covers viewport with all nav items + auth state. */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav-sheet"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="lg:hidden fixed inset-0 top-0 z-50 bg-black/70 backdrop-blur-md"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="mx-auto max-w-7xl px-4 sm:px-6 pt-4 pb-8"
            >
              {/* Header row (matches the regular nav so the close button
                  lands in the same spot the user just tapped). */}
              <div className="glass-strong flex items-center justify-between rounded-2xl px-3 sm:px-5 py-2.5 mb-3">
                <Link
                  href="/"
                  className="flex items-center gap-3"
                  onClick={() => setMobileOpen(false)}
                >
                  <BrandMark />
                  <BrandWordmark withTagline />
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center justify-center rounded-lg p-2 text-white/70 hover:text-white hover:bg-white/5 transition"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Link list */}
              <nav className="glass-strong rounded-2xl p-2 grid grid-cols-1 sm:grid-cols-2 gap-1">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition ${
                      item.accent ?? DEFAULT_ACCENT
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
