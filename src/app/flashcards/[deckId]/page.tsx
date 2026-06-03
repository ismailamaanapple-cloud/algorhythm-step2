import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import DeckReview from "@/components/flashcards/DeckReview";
import { PREBUILT_DECKS, getDeck } from "@/data/flashcards";

export function generateStaticParams() {
  return PREBUILT_DECKS.map((d) => ({ deckId: d.id }));
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
