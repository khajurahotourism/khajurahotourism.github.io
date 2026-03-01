import { Link } from "wouter";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <a className="font-serif text-2xl font-bold text-primary tracking-wider" data-testid="link-home">
            KHAJURAHO
          </a>
        </Link>
        
        <div className="hidden md:flex gap-8 items-center">
          <Link href="#about"><a className="text-sm uppercase tracking-widest hover:text-primary transition-colors">History</a></Link>
          <Link href="#temples"><a className="text-sm uppercase tracking-widest hover:text-primary transition-colors">The Temples</a></Link>
          <Link href="#visitor-info"><a className="text-sm uppercase tracking-widest hover:text-primary transition-colors">Plan Your Visit</a></Link>
        </div>

        <Button variant="ghost" size="icon" className="md:hidden" data-testid="button-mobile-menu">
          <Menu className="h-6 w-6" />
        </Button>
      </div>
    </nav>
  );
}
