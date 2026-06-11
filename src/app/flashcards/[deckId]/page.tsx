import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import DeckReview from "@/components/flashcards/DeckReview";
import { PREBUILT_DECKS, getDeck } from "@/data/flashcards";

export function generateStaticParams() {
  return PREBUILT_DECKS.map((d) => ({ deckId: d.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ deckId: string }>;
}): Promise<Metadata> {
  const { deckId } = await params;
  const deck = getDeck(deckId);
  if (!deck) return {};
  const description = `${deck.cards.length} spaced-repetition flashcards · ${deck.category}`;
  // Mega-deck titles already end in "flashcards" — don't double the suffix.
  const title = /flashcards/i.test(deck.title)
    ? deck.title
    : `${deck.title} — flashcards`;
  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default async function DeckPage({
  params,
}: {
  params: Promise<{ deckId: string }>;
}) {
  const { deckId } = await params;
  const deck = getDeck(deckId);
  if (!deck) notFound();
  return (
    <>
      <Nav />
      <DeckReview deckId={deckId} title={deck.title} category={deck.category} />
      <Footer />
    </>
  );
}
