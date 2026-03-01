import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Temples } from "@/components/sections/Temples";
import { VisitorInfo } from "@/components/sections/VisitorInfo";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <Temples />
        <VisitorInfo />
      </main>
      <Footer />
    </div>
  );
}
