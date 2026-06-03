"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Sparkles, Loader2, Check } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { useAuth } from "@/lib/auth/AuthProvider";

function GoogleIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.4-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="m6.3 14.7 6.6 4.8C14.7 16 18.9 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.4 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29 35.4 26.6 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.5 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.3-4.1 5.6l6.2 5.2C40.9 35 44 30 44 24c0-1.2-.1-2.4-.4-3.5z"
      />
    </svg>
  );
}

export default function LoginModal() {
  const { loginOpen, closeLogin, configured } = useAuth();
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!loginOpen) {
      setEmail("");
      setSent(false);
      setSending(false);
      setErr(null);
    }
  }, [loginOpen]);

  async function handleGoogle() {
    setErr(null);
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return setErr("Login isn't configured yet.");
    const origin =
      process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${origin}/auth/callback?next=${encodeURIComponent(window.location.pathname)}` },
    });
    if (error) setErr(error.message);
  }

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return setErr("Login isn't configured yet.");
    if (!email.includes("@")) return setErr("Enter a valid email.");
    setSending(true);
    const origin =
      process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${origin}/auth/callback?next=${encodeURIComponent(window.location.pathname)}` },
    });
    setSending(false);
    if (error) setErr(error.message);
    else setSent(true);
  }

  return (
    <AnimatePresence>
      {loginOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={closeLogin}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md glass-strong rounded-3xl p-8 border border-white/10"
          >
            <button
              onClick={closeLogin}
              className="absolute top-4 right-4 p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-cyan-200 mb-3">
                <Sparkles className="h-3 w-3" />
                Save your progress
              </div>
              <h2 className="text-2xl font-bold tracking-tight mb-1">
                Sign in to 250+
              </h2>
              <p className="text-sm text-white/65 leading-relaxed">
                Track completed notes, save highlights, and review your
                flashcards from any device.
              </p>
            </div>

            {!configured ? (
              <div className="rounded-xl border border-amber-300/30 bg-amber-400/10 p-4 text-sm text-amber-100">
                Login isn&apos;t configured yet. Set{" "}
                <code className="text-xs">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
                <code className="text-xs">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>{" "}
                to enable auth.
              </div>
            ) : sent ? (
              <div className="rounded-xl border border-emerald-300/30 bg-emerald-400/10 p-5 text-sm text-emerald-100 flex items-start gap-3">
                <div className="rounded-full bg-emerald-400/20 p-1.5 mt-0.5">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </div>
                <div>
                  <div className="font-semibold mb-1">Check your inbox</div>
                  <div className="text-emerald-100/80">
                    We sent a magic sign-in link to{" "}
                    <span className="font-mono text-xs">{email}</span>.
                  </div>
                </div>
              </div>
            ) : (
              <>
                <button
                  onClick={handleGoogle}
                  className="w-full flex items-center justify-center gap-3 rounded-xl bg-white text-black font-semibold py-3 hover:bg-white/90 transition"
                >
                  <GoogleIcon className="h-5 w-5" />
                  Continue with Google
                </button>

                <div className="my-5 flex items-center gap-3">
                  <div className="h-px flex-1 bg-white/10" />
                  <span className="text-[10px] uppercase tracking-[0.22em] text-white/40">
                    or
                  </span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>

                <form onSubmit={handleMagicLink} className="space-y-3">
                  <label className="block">
                    <span className="text-xs text-white/55 uppercase tracking-[0.18em] mb-1.5 block">
                      Email magic link
                    </span>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@school.edu"
                        className="w-full rounded-xl border border-white/10 bg-white/[0.04] pl-10 pr-3 py-3 text-sm placeholder:text-white/30 focus:outline-none focus:border-cyan-300/40 focus:bg-white/[0.06] transition"
                      />
                    </div>
                  </label>
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 text-white font-semibold py-3 hover:opacity-90 transition disabled:opacity-50"
                  >
                    {sending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>Send magic link</>
                    )}
                  </button>
                </form>

                {err && (
                  <div className="mt-4 text-xs text-rose-300 bg-rose-400/10 border border-rose-400/30 rounded-lg p-3">
                    {err}
                  </div>
                )}
              </>
            )}

            <p className="mt-6 text-[10px] text-white/40 leading-relaxed">
              By signing in you agree to use 250+ for personal study.
              We store your progress, highlights, and flashcards — and
              nothing else.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
