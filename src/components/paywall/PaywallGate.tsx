"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Lock, ChevronRight } from "lucide-react";
import { useAccessCheck } from "@/hooks/useAccessCheck";
import { useAuth } from "@/lib/auth/AuthProvider";

/**
 * Wrap any note- or case-detail content. If the user is premium, or hasn't
 * hit the free-tier limit, renders children. Otherwise renders a paywall
 * card with a CTA to /pricing.
 */
export default function PaywallGate({
  itemType,
  itemId,
  children,
}: {
  itemType: "note" | "case";
  itemId: string;
  children: React.ReactNode;
}) {
  const access = useAccessCheck(itemType, itemId);
  const { user, openLogin } = useAuth();

  if (access.status === "loading") {
    // Skeleton: render children invisibly so layout doesn't jump.
    return <div className="opacity-30">{children}</div>;
  }
  if (access.status === "granted") return <>{children}</>;

  // Blocked.
  return (
    <div className="mx-auto max-w-2xl px-6 py-14">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="glass-strong rounded-3xl p-8 md:p-10 border border-fuchsia-400/20 bg-gradient-to-br from-violet-500/5 via-fuchsia-500/5 to-cyan-500/5 text-center"
      >
        <div className="mx-auto mb-5 inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-500">
          <Lock className="h-7 w-7 text-white" />
        </div>
        <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-cyan-200 mb-4">
          <Sparkles className="h-3 w-3" />
          Free tier used
        </div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
          You&apos;ve unlocked your {access.limit} free {itemType}s.
        </h1>
        <p className="text-white/65 leading-relaxed max-w-md mx-auto mb-6">
          Upgrade to <span className="text-white font-semibold">250+ Premium</span>{" "}
          to unlock unlimited notes, cases, flashcards, the dashboard, and the
          weak-card drill — everything you need to actually hit a 250.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {user ? (
            <Link
              href="/pricing"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-500 px-6 py-3 text-sm font-bold hover:opacity-90 transition shadow-[0_0_40px_rgba(217,70,239,0.3)]"
            >
              See pricing
              <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition" />
            </Link>
          ) : (
            <button
              onClick={openLogin}
              className="inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-3 text-sm font-semibold hover:bg-white/90 transition"
            >
              Sign in to continue
            </button>
          )}
          <Link
            href="/"
            className="text-sm text-white/55 hover:text-white/80 transition"
          >
            Back to home
          </Link>
        </div>
        <div className="mt-6 text-[11px] text-white/40">
          You&apos;ve viewed {access.viewedCount} of {access.limit} free{" "}
          {itemType}s.
        </div>
      </motion.div>
    </div>
  );
}
