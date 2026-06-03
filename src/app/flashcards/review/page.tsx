import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import DeckReview from "@/components/flashcards/DeckReview";

export const metadata: Metadata = {
  title: "Review — Flashcards",
  description: "Review every flashcard due today across all decks.",
};

export default function ReviewAllPage() {
  return (
    <>
      <Nav />
      <DeckReview title="All due cards" category="Mixed review" />
      <Footer />
    </>
  );
}
