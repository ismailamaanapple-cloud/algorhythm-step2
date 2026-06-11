import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CasePlayer from "@/components/CasePlayer";
import { CASES } from "@/data/cases";

export function generateStaticParams() {
  return CASES.map((c) => ({ id: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const c = CASES.find((x) => x.id === id);
  if (!c) return {};
  // Use the truncated stem, never the diagnosis — link previews shouldn't
  // spoil the answer for someone being quizzed.
  const teaser =
    c.stem.length > 150 ? `${c.stem.slice(0, 147).trimEnd()}…` : c.stem;
  return {
    title: `${c.topic} — clinical case`,
    description: teaser,
    openGraph: { title: `${c.topic} — clinical case`, description: teaser },
  };
}

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const c = CASES.find((x) => x.id === id);
  if (!c) notFound();
  return <CasePlayer cases={[c]} mode="single" />;
}
