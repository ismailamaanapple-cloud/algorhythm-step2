import Nav from "@/components/Nav";
import NotesLibrary from "@/components/NotesLibrary";
import Footer from "@/components/Footer";

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
