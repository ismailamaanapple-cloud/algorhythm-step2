"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Sparkles, Loader2, Crown } from "lucide-react";
import { useAuth } from "@/lib/auth/AuthProvider";
import { usePremium } from "@/hooks/usePremium";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

const FEATURES = [
  "Unlimited notes (158+ topics across every specialty)",
  "Unlimited case vignettes (280+, board-style)",
  "All 92 algorithm decision trees",
  "Pre-built spaced-repetition flashcards (thousands of cards)",
  "Highlight text + auto-create flashcards from your highlights",
  "Performance dashboard: per-specialty mastery heatmap",
  "Drill your weakest 30 cards instantly",
  "EKG rhythm strips embedded in every EKG note",
  "Cancel anytime",
];

export default function PricingClient() {
  const { user, openLogin } = useAuth();
  const premium = usePremium();
  const [busy, setBusy] = useState<"monthly" | "yearly" | "portal" | null>(null);
  const [err, setErr] = useState<string | null>(null);

  /**
   * Read the response body as JSON, but tolerate empty/non-JSON bodies (which
   * happen when a serverless function crashes before sending a response).
   */
  async function readJson(res: Response): Promise<{ url?: string; error?: string } | null> {
    const text = await res.text();
    if (!text) return null;
    try {
      return JSON.parse(text);
    } catch {
      return { error: text.slice(0, 200) };
    }
  }

  /**
   * Browser session lives in localStorage (implicit flow) so server API
   * routes can't see it via cookies. We pull the access token from the
   * Supabase client and attach it as a Bearer header instead.
   */
  async function getAuthHeader(): Promise<HeadersInit> {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return {};
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  async function subscribe(plan: "monthly" | "yearly") {
    setErr(null);
    if (!user) {
      openLogin();
      return;
    }
    setBusy(plan);
    try {
      const authHeader = await getAuthHeader();
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeader },
        body: JSON.stringify({ plan }),
      });
      const json = await readJson(res);
      if (!res.ok || !json?.url) {
        throw new Error(json?.error || `Server returned ${res.status} ${res.statusText}.`);
      }
      window.location.href = json.url as string;
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Something went wrong.");
      setBusy(null);
    }
  }

  async function openPortal() {
    setErr(null);
    if (!user) {
      openLogin();
      return;
    }
    setBusy("portal");
    try {
      const authHeader = await getAuthHeader();
      const res = await fetch("/api/stripe/portal", {
        method: "POST",
        headers: authHeader,
      });
      const json = await res.json();
      if (!res.ok || !json.url) throw new Error(json.error || "Could not open portal.");
      window.location.href = json.url;
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Something went wrong.");
      setBusy(null);
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-6 pb-20 pt-12 md:pt-16">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-14"
      >
        <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-cyan-200 mb-4">
          <Sparkles className="h-3 w-3" />
          Pricing
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-3">
          Pay <span className="bg-gradient-to-br from-cyan-300 to-fuchsia-300 bg-clip-text text-transparent">once.</span>{" "}
          Study unlimited.
        </h1>
        <p className="text-white/65 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Built by med students, for med students. One subscription, every
          feature, all 530+ items in the library, every future update — until
          you take your exam.
        </p>
      </motion.div>

      {premium.isPremium && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong rounded-3xl border border-emerald-400/30 bg-emerald-500/5 p-6 mb-10 flex flex-wrap items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-emerald-400/20 text-emerald-300 flex items-center justify-center">
              <Crown className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">
                You&apos;re a 250+ Premium member
              </div>
              <div className="text-xs text-white/65">
                {premium.plan === "yearly" ? "Yearly plan" : "Monthly plan"}
                {premium.periodEnd
                  ? ` · renews ${new Date(premium.periodEnd).toLocaleDateString()}`
                  : ""}
              </div>
            </div>
          </div>
          <button
            onClick={openPortal}
            disabled={busy !== null}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold hover:bg-white/[0.08] transition disabled:opacity-50"
          >
            {busy === "portal" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Opening…
              </>
            ) : (
              "Manage subscription"
            )}
          </button>
        </motion.div>
      )}

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
        <PlanCard
          title="Monthly"
          price="$39.99"
          per="per month"
          sub="Try it for a month."
          highlight={false}
          ctaLabel={
            premium.isPremium && premium.plan === "monthly"
              ? "Current plan"
              : "Subscribe monthly"
          }
          ctaDisabled={busy !== null || (premium.isPremium && premium.plan === "monthly")}
          ctaLoading={busy === "monthly"}
          onClick={() => subscribe("monthly")}
        />
        <PlanCard
          title="Yearly"
          price="$249.99"
          per="per year"
          sub={
            <>
              <span className="font-semibold text-white">Save $230</span> (~48% off) vs monthly · billed annually
            </>
          }
          highlight
          ctaLabel={
            premium.isPremium && premium.plan === "yearly"
              ? "Current plan"
              : "Subscribe yearly"
          }
          ctaDisabled={busy !== null || (premium.isPremium && premium.plan === "yearly")}
          ctaLoading={busy === "yearly"}
          onClick={() => subscribe("yearly")}
        />
      </div>

      {err && (
        <div className="rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-100 mb-8">
          {err}
        </div>
      )}

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        className="glass rounded-3xl p-6 md:p-8"
      >
        <div className="text-[10px] uppercase tracking-[0.22em] text-cyan-300/80 mb-4">
          Every plan includes
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-sm text-white/85">
          {FEATURES.map((f, i) => (
            <li key={i} className="flex gap-2.5">
              <div className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-emerald-400/15 text-emerald-300 flex items-center justify-center">
                <Check className="h-3 w-3" strokeWidth={3} />
              </div>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      <div className="mt-10 text-center text-xs text-white/45">
        Free tier: full access to 3 notes + 3 cases + every algorithm. No card
        required to try. <Link href="/terms" className="underline underline-offset-4 hover:text-white/65 ml-2">Terms</Link> ·{" "}
        <Link href="/privacy" className="underline underline-offset-4 hover:text-white/65">Privacy</Link>
      </div>
    </div>
  );
}

function PlanCard({
  title,
  price,
  per,
  sub,
  highlight,
  ctaLabel,
  ctaDisabled,
  ctaLoading,
  onClick,
}: {
  title: string;
  price: string;
  per: string;
  sub: React.ReactNode;
  highlight: boolean;
  ctaLabel: string;
  ctaDisabled: boolean;
  ctaLoading: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 280, damping: 20 }}
      className={`relative glass-strong rounded-3xl p-7 ${
        highlight
          ? "border-2 border-fuchsia-400/30 bg-gradient-to-br from-violet-500/10 via-fuchsia-500/10 to-cyan-500/10"
          : "border border-white/10"
      }`}
    >
      {highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-500 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-white font-bold">
          <Crown className="h-3 w-3" />
          Best value
        </div>
      )}
      <div className="text-[10px] uppercase tracking-[0.22em] text-cyan-300/80 mb-2">
        {title}
      </div>
      <div className="flex items-baseline gap-1.5 mb-1">
        <div className="text-5xl font-bold tracking-tight">{price}</div>
        <div className="text-sm text-white/55">{per}</div>
      </div>
      <div className="text-xs text-white/55 mb-5">{sub}</div>
      <button
        onClick={onClick}
        disabled={ctaDisabled}
        className={`w-full inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition disabled:opacity-50 disabled:cursor-not-allowed ${
          highlight
            ? "bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-500 text-white hover:opacity-90 shadow-[0_0_40px_rgba(217,70,239,0.25)]"
            : "bg-white text-black hover:bg-white/90"
        }`}
      >
        {ctaLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading…
          </>
        ) : (
          ctaLabel
        )}
      </button>
    </motion.div>
  );
}
