import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NoteDetail from "@/components/NoteDetail";
import { NOTES } from "@/data/notes";

export function generateStaticParams() {
  return NOTES.map((n) => ({ id: n.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const note = NOTES.find((n) => n.id === id);
  if (!note) return {};
  return {
    title: `${note.title} — ${note.category}`,
    description: note.summary,
    openGraph: { title: note.title, description: note.summary },
  };
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
