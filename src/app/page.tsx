import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import AlgorithmLibrary from "@/components/AlgorithmLibrary";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <AlgorithmLibrary />
        <HowItWorks />
      </main>
      <Footer />
    </>
  );
}
