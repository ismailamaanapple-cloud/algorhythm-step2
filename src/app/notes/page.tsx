import type { Metadata } from "next";
import Nav from "@/components/Nav";
import NotesLibrary from "@/components/NotesLibrary";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Notes — high-yield Step 2 CK topic reviews",
  description:
    "Concise, high-yield study notes for every Step 2 CK specialty — medicine, surgery, peds, OB/GYN, psych, EKG, pharm, and OMM — with pearls, tables, and quick quizzes.",
};

export default function NotesPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 pt-10 pb-10">
        <NotesLibrary />
      </main>
      <Footer />
    </>
  );
}
