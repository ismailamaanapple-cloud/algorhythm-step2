import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

/**
 * OAuth / magic-link callback. Supabase redirects here with ?code=... and we
 * exchange it for a session cookie. The `?next=` query param lets us bounce
 * the user back to where they started.
 *
 * Errors are surfaced to the home page as `?auth_error=...` so we can see them
 * in the URL bar (silent failures are the worst).
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const errorParam = url.searchParams.get("error");
  const errorDesc =
    url.searchParams.get("error_description") ??
    url.searchParams.get("error_code");
  const next = url.searchParams.get("next") ?? "/";

  // Supabase passes ?error=...&error_description=... if its own verify step failed.
  if (errorParam) {
    return NextResponse.redirect(
      new URL(
        `/?auth_error=${encodeURIComponent(errorDesc ?? errorParam)}`,
        url.origin,
      ),
    );
  }

  if (!code) {
    return NextResponse.redirect(
      new URL("/?auth_error=missing_code", url.origin),
    );
  }

  const supabase = await getSupabaseServerClient();
  if (!supabase) {
    return NextResponse.redirect(
      new URL("/?auth_error=supabase_not_configured", url.origin),
    );
  }

  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    console.error("[auth/callback] exchangeCodeForSession failed:", error);
    return NextResponse.redirect(
      new URL(
        `/?auth_error=${encodeURIComponent(error.message)}`,
        url.origin,
      ),
    );
  }

  return NextResponse.redirect(new URL(next, url.origin));
}
