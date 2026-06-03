"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let _client: SupabaseClient | null = null;

/**
 * Browser-side Supabase client (singleton).
 *
 * We deliberately use plain `@supabase/supabase-js` rather than
 * `@supabase/ssr`'s createBrowserClient — the latter hardcodes
 * `flowType: "pkce"` and ignores any override, which breaks magic-link
 * sign-ins whenever the email is opened in a different browser than the
 * one that requested it (the PKCE verifier cookie isn't there).
 *
 * Implicit flow puts the access token in the URL hash on redirect, so the
 * link works from any browser. Session persists in localStorage; that's
 * fine because all our data access is client-side and gated by RLS.
 */
export function getSupabaseBrowserClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return null;
  if (_client) return _client;
  _client = createClient(url, anon, {
    auth: {
      flowType: "implicit",
      detectSessionInUrl: true,
      persistSession: true,
      autoRefreshToken: true,
    },
  });
  return _client;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}
