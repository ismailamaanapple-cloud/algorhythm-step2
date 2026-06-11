import type { Metadata } from "next";
import Nav from "@/components/Nav";
import CasesLibrary from "@/components/CasesLibrary";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Cases — Step 2 CK clinical vignettes",
  description:
    "Practice clinical vignettes the way they appear on Step 2 CK — pick the next best step, then get the diagnosis, rationale, and key points.",
};

export default function CasesPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 pt-10">
        <CasesLibrary />
      </main>
      <Footer />
    </>
  );
}
