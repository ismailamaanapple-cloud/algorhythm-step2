"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * A "back" affordance that actually goes back in the browser's history when
 * possible — so the previous page's scroll position is preserved. Falls back
 * to a regular Link navigation if the user landed on this page directly
 * (refresh, opened in a new tab, came from another site) and there's no
 * meaningful history to pop.
 *
 * Use anywhere you'd otherwise put a "<- Notes" / "<- Cases" link on a
 * detail page.
 */
export default function BackLink({
  fallbackHref,
  className,
  children,
}: {
  fallbackHref: string;
  className?: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [canPop, setCanPop] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // history.length includes the current entry, so >1 means there's at
    // least one prior page we can pop back to. We additionally require
    // a same-origin referrer so we don't pop the user away to e.g. google.
    const sameOriginReferrer =
      !!document.referrer && new URL(document.referrer).origin === window.location.origin;
    setCanPop(window.history.length > 1 && sameOriginReferrer);
  }, []);

  if (canPop) {
    return (
      <button
        type="button"
        onClick={() => router.back()}
        className={className}
        aria-label="Back"
      >
        {children}
      </button>
    );
  }

  return (
    <Link href={fallbackHref} className={className} aria-label="Back">
      {children}
    </Link>
  );
}
