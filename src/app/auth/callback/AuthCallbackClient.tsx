"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, AlertTriangle } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

/**
 * With implicit flow, the Supabase magic-link redirect lands here with the
 * access + refresh tokens in the URL hash (e.g. `#access_token=...`). The
 * browser client auto-detects them on init (detectSessionInUrl: true). We
 * confirm by calling getSession() and then bounce to `?next=`.
 */
export default function AuthCallbackClient() {
  const router = useRouter();
  const search = useSearchParams();
  const [status, setStatus] = useState<"working" | "error">("working");
  const [errMsg, setErrMsg] = useState<string>("");

  useEffect(() => {
    let cancelled = false;

    async function run() {
      const supabase = getSupabaseBrowserClient();
      if (!supabase) {
        setErrMsg("supabase_not_configured");
        setStatus("error");
        return;
      }

      const next = search.get("next") || "/";
      const errorParam = search.get("error");
      const errorDesc =
        search.get("error_description") || search.get("error_code");

      // Supabase verify-step failure surfaces as ?error=...
      if (errorParam) {
        if (cancelled) return;
        setErrMsg(errorDesc || errorParam);
        setStatus("error");
        return;
      }

      // Legacy PKCE path — only used if for some reason a code is in the URL.
      const code = search.get("code");
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (cancelled) return;
        if (error) {
          setErrMsg(error.message);
          setStatus("error");
          return;
        }
        router.replace(next);
        return;
      }

      // Implicit flow: token is in the URL hash. supabase-js auto-detects it
      // on client creation. Poll briefly because detection is async.
      for (let i = 0; i < 20; i++) {
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          if (cancelled) return;
          router.replace(next);
          return;
        }
        await new Promise((r) => setTimeout(r, 100));
      }

      if (cancelled) return;
      setErrMsg(
        "No session was created. The link may have expired, or your browser blocked the redirect.",
      );
      setStatus("error");
    }

    void run();
    return () => {
      cancelled = true;
    };
  }, [router, search]);

  if (status === "working") {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center">
        <div className="flex items-center gap-2.5 text-sm text-white/70">
          <Loader2 className="h-4 w-4 animate-spin text-cyan-300" />
          Signing you in…
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] flex items-center justify-center px-6">
      <div className="glass-strong rounded-3xl border border-rose-400/30 bg-rose-500/5 p-8 max-w-md w-full text-center">
        <div className="mx-auto h-10 w-10 rounded-full bg-rose-400/20 flex items-center justify-center text-rose-300 mb-4">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <h1 className="text-xl font-bold tracking-tight mb-2">
          Sign-in didn&apos;t finish
        </h1>
        <p className="text-sm text-white/65 mb-6 break-words">{errMsg}</p>
        <button
          onClick={() => router.replace("/")}
          className="inline-flex items-center gap-2 rounded-full bg-white text-black px-5 py-2.5 text-sm font-semibold hover:bg-white/90 transition"
        >
          Back to home
        </button>
      </div>
    </div>
  );
}
