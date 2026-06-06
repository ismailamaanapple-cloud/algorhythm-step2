"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Layers } from "lucide-react";
import AuthButton from "./auth/AuthButton";
import { BrandMark, BrandWordmark } from "./Brand";
import { SearchTrigger } from "./search/GlobalSearch";

export default function Nav() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-40 w-full"
    >
      <div className="mx-auto max-w-7xl px-6 py-5">
        <div className="glass-strong flex items-center justify-between rounded-2xl px-5 py-3">
          <Link href="/" className="flex items-center gap-3 group">
            <BrandMark />
            <BrandWordmark withTagline />
          </Link>
          <div className="hidden md:flex items-center gap-1 text-sm">
            <Link href="/" className="px-3 py-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition">Algorithms</Link>
            <Link href="/cases" className="px-3 py-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition">Cases</Link>
            <Link href="/notes" className="px-3 py-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition">Notes</Link>
            <Link href="/flashcards" className="px-3 py-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition inline-flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-cyan-300" />
              Flashcards
            </Link>
            <Link href="/ekg" className="px-3 py-1.5 rounded-lg text-rose-200/85 hover:text-rose-100 hover:bg-rose-300/10 transition">EKG</Link>
            <Link href="/pharmacology" className="px-3 py-1.5 rounded-lg text-emerald-200/85 hover:text-emerald-100 hover:bg-emerald-300/10 transition">Pharm</Link>
            <Link href="/dashboard" className="px-3 py-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition">Dashboard</Link>
            <Link href="/pricing" className="px-3 py-1.5 rounded-lg text-fuchsia-200/85 hover:text-fuchsia-100 hover:bg-fuchsia-300/10 transition">Pricing</Link>
            <Link href="/omm" className="px-3 py-1.5 rounded-lg text-amber-200/85 hover:text-amber-100 hover:bg-amber-300/10 transition">OMM</Link>
          </div>
          <div className="flex items-center gap-2">
            <SearchTrigger />
            <AuthButton />
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
