"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { User as UserIcon, LogOut, Layers, TrendingUp } from "lucide-react";
import { useAuth } from "@/lib/auth/AuthProvider";

export default function AuthButton() {
  const { user, openLogin, signOut, loading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  if (loading) {
    return (
      <div className="h-8 w-8 rounded-full bg-white/5 animate-pulse" />
    );
  }

  if (!user) {
    return (
      <button
        onClick={openLogin}
        className="inline-flex items-center gap-1.5 rounded-lg bg-white text-black px-3 py-1.5 text-xs font-semibold hover:bg-white/90 transition"
      >
        <UserIcon className="h-3.5 w-3.5" />
        Sign in
      </button>
    );
  }

  const initial =
    (user.user_metadata?.full_name || user.user_metadata?.name || user.email || "U")
      .toString()
      .charAt(0)
      .toUpperCase();
  const avatar = user.user_metadata?.avatar_url as string | undefined;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setMenuOpen((v) => !v)}
        className="relative h-8 w-8 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-white ring-2 ring-white/10 hover:ring-white/25 transition overflow-hidden"
        aria-label="Account"
      >
        {avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={avatar} alt="" className="h-full w-full object-cover" />
        ) : (
          initial
        )}
      </button>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-60 glass-strong rounded-xl border border-white/10 overflow-hidden z-50"
          >
            <div className="px-4 py-3 border-b border-white/5">
              <div className="text-xs text-white/45 uppercase tracking-[0.18em] mb-0.5">
                Signed in as
              </div>
              <div className="text-sm font-medium truncate">{user.email}</div>
            </div>
            <div className="p-1">
              <Link
                href="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/80 hover:bg-white/5 transition"
              >
                <TrendingUp className="h-4 w-4 text-violet-300" />
                Dashboard
              </Link>
              <Link
                href="/flashcards"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/80 hover:bg-white/5 transition"
              >
                <Layers className="h-4 w-4 text-cyan-300" />
                Flashcards
              </Link>
              <button
                onClick={async () => {
                  setMenuOpen(false);
                  await signOut();
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/70 hover:bg-white/5 transition"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
