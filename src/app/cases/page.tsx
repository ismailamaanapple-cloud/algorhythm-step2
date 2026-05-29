import Nav from "@/components/Nav";
import CasesLibrary from "@/components/CasesLibrary";
import Footer from "@/components/Footer";

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
