import { notFound } from "next/navigation";
import CasePlayer from "@/components/CasePlayer";
import { CASES } from "@/data/cases";

export function generateStaticParams() {
  return CASES.map((c) => ({ id: c.id }));
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
