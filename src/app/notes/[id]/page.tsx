import { notFound } from "next/navigation";
import NoteDetail from "@/components/NoteDetail";
import { NOTES } from "@/data/notes";

export function generateStaticParams() {
  return NOTES.map((n) => ({ id: n.id }));
}

export default async function NoteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const note = NOTES.find((n) => n.id === id);
  if (!note) notFound();
  return <NoteDetail note={note} />;
}
