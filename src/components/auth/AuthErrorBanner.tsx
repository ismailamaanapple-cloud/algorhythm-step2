"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, X } from "lucide-react";

/**
 * Reads `?auth_error=...` from the URL (set by /auth/callback on failure)
 * and shows a dismissible banner. Strips the param from history on dismiss
 * so it doesn't reappear on reload.
 */
export default function AuthErrorBanner() {
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const err = params.get("auth_error");
    if (err) setMsg(err);
  }, []);

  function dismiss() {
    setMsg(null);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("auth_error");
      window.history.replaceState({}, "", url.toString());
    }
  }

  if (!msg) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[110] max-w-md w-[calc(100%-2rem)]">
      <div className="glass-strong rounded-2xl border border-rose-400/30 bg-rose-500/10 p-4 flex items-start gap-3 shadow-2xl">
        <div className="rounded-full bg-rose-400/20 p-1.5 mt-0.5 text-rose-300">
          <AlertTriangle className="h-3.5 w-3.5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-semibold text-rose-100 mb-0.5 uppercase tracking-[0.18em]">
            Sign-in failed
          </div>
          <div className="text-sm text-white/90 break-words">{msg}</div>
          <div className="text-[11px] text-white/55 mt-2">
            Share this exact message if you need help debugging.
          </div>
        </div>
        <button
          onClick={dismiss}
          className="p-1 rounded text-white/50 hover:text-white hover:bg-white/5 transition shrink-0"
          aria-label="Dismiss"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
