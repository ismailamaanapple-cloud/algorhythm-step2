"use client";

import { useMemo } from "react";
import CasePlayer from "@/components/CasePlayer";
import { CASES } from "@/data/cases";

export default function PlayDeckPage() {
  const shuffled = useMemo(() => {
    const a = [...CASES];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }, []);
  return <CasePlayer cases={shuffled} mode="deck" />;
}
