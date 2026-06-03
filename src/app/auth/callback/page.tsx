import { Suspense } from "react";
import AuthCallbackClient from "./AuthCallbackClient";

/**
 * Auth callback is intentionally a client page (not a route handler) so the
 * browser Supabase client — which owns the PKCE code verifier in its storage
 * — handles the code-for-session exchange.
 */
export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<Fallback msg="Signing you in…" />}>
      <AuthCallbackClient />
    </Suspense>
  );
}

function Fallback({ msg }: { msg: string }) {
  return (
    <div className="min-h-[100dvh] flex items-center justify-center">
      <div className="text-sm text-white/60">{msg}</div>
    </div>
  );
}
