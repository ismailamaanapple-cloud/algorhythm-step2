import { notFound } from "next/navigation";
import GameEngine from "@/components/GameEngine";
import { ALGORITHMS } from "@/data/algorithms";

export function generateStaticParams() {
  return ALGORITHMS.map((a) => ({ id: a.id }));
}

export default async function PlayPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const algo = ALGORITHMS.find((a) => a.id === id);
  if (!algo) notFound();
  return <GameEngine algo={algo} />;
}
