// Auth state lives client-side (localStorage) with implicit-flow Supabase,
// so we no longer need a proxy to refresh server-side cookies. Keeping the
// file as a no-op pass-through; remove it later if Next 16 stops requiring
// the convention.
import { NextResponse, type NextRequest } from "next/server";

export function proxy(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
