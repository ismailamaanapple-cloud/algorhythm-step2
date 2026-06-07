import { createClient, type SupabaseClient, type User } from "@supabase/supabase-js";

/**
 * Pulls the bearer token out of the Authorization header and verifies it
 * with Supabase. Returns the user + an authenticated client that operates
 * AS that user (so RLS policies still apply normally).
 *
 * We need this because our browser client uses implicit flow (session lives
 * in localStorage, not cookies), so the cookie-based getSupabaseServerClient
 * can't see the session on server-side API routes. The client attaches its
 * access_token explicitly and we verify it here.
 */
export async function getUserFromAuthHeader(
  request: Request,
): Promise<{ user: User; client: SupabaseClient } | null> {
  const auth =
    request.headers.get("authorization") ?? request.headers.get("Authorization");
  const token = auth?.replace(/^bearer\s+/i, "").trim();
  if (!token) return null;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return null;

  // Build a client that carries the user's JWT so RLS treats it as them.
  const client = createClient(url, anon, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false },
  });

  const { data, error } = await client.auth.getUser(token);
  if (error || !data?.user) return null;

  return { user: data.user, client };
}
