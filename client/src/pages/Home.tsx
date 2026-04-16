import { useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Temples } from "@/components/sections/Temples";
import { TempleGroupsHighlights } from "@/components/sections/TempleGroupsHighlights";
import { VisitorInfo } from "@/components/sections/VisitorInfo";
import { Footer } from "@/components/layout/Footer";
import { scrollToHashSection } from "@/lib/section-nav";

export default function Home() {
  useEffect(() => {
    scrollToHashSection();
    window.addEventListener("hashchange", scrollToHashSection);
    return () => window.removeEventListener("hashchange", scrollToHashSection);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <Temples />
        <TempleGroupsHighlights />
        <VisitorInfo />
      </main>
      <Footer />
    </div>
  );
}
