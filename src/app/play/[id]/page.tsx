import { notFound } from "next/navigation";
import AlgorithmView from "@/components/AlgorithmView";
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
  return <AlgorithmView algo={algo} />;
}
