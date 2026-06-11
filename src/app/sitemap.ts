import type { MetadataRoute } from "next";
import { ALGORITHMS } from "@/data/algorithms";
import { NOTES } from "@/data/notes";
import { CASES } from "@/data/cases";
import { PREBUILT_DECKS } from "@/data/flashcards";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://250plus.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const sections: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, priority: 1 },
    { url: `${BASE}/notes`, priority: 0.9 },
    { url: `${BASE}/cases`, priority: 0.9 },
    { url: `${BASE}/flashcards`, priority: 0.9 },
    { url: `${BASE}/ekg`, priority: 0.8 },
    { url: `${BASE}/pharmacology`, priority: 0.8 },
    { url: `${BASE}/omm`, priority: 0.8 },
    { url: `${BASE}/pricing`, priority: 0.5 },
    { url: `${BASE}/privacy`, priority: 0.1 },
    { url: `${BASE}/terms`, priority: 0.1 },
  ];

  return [
    ...sections,
    ...ALGORITHMS.map((a) => ({
      url: `${BASE}/play/${a.id}`,
      priority: 0.7,
    })),
    ...NOTES.map((n) => ({
      url: `${BASE}/notes/${n.id}`,
      priority: 0.7,
    })),
    ...CASES.map((c) => ({
      url: `${BASE}/cases/${c.id}`,
      priority: 0.6,
    })),
    ...PREBUILT_DECKS.map((d) => ({
      url: `${BASE}/flashcards/${d.id}`,
      priority: 0.5,
    })),
  ];
}
