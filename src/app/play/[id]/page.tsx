import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AlgorithmView from "@/components/AlgorithmView";
import { ALGORITHMS } from "@/data/algorithms";

export function generateStaticParams() {
  return ALGORITHMS.map((a) => ({ id: a.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const algo = ALGORITHMS.find((a) => a.id === id);
  if (!algo) return {};
  return {
    title: `${algo.title} — algorithm`,
    description: algo.blurb,
    openGraph: {
      title: `${algo.title} — clinical algorithm`,
      description: algo.blurb,
    },
  };
}

export default async function PlayPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const algo = ALGORITHMS.find((a) => a.id === id);
  if (!algo) notFound();
  return <AlgorithmView algo={algo} />;
}
