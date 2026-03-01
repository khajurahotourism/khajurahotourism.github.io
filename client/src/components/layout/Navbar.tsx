import { Link } from "wouter";
import { Menu, Globe, ShoppingBag, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
          <Link href="/#about"><a className="text-sm uppercase tracking-widest hover:text-primary transition-colors font-medium">History</a></Link>
          <Link href="/#temples"><a className="text-sm uppercase tracking-widest hover:text-primary transition-colors font-medium">Temples</a></Link>
          <Link href="/shop"><a className="text-sm uppercase tracking-widest hover:text-primary transition-colors font-medium flex items-center gap-1.5"><ShoppingBag className="w-4 h-4" /> Shop</a></Link>
          <Link href="/contact"><a className="text-sm uppercase tracking-widest hover:text-primary transition-colors font-medium flex items-center gap-1.5"><Phone className="w-4 h-4" /> Contact</a></Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2 uppercase tracking-widest text-xs font-bold">
                <Globe className="h-4 w-4 text-primary" />
                EN
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-background border-border">
              <DropdownMenuItem className="cursor-pointer">English (EN)</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">Hindi (HI)</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">French (FR)</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">German (DE)</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Button variant="ghost" size="icon" className="md:hidden" data-testid="button-mobile-menu">
          <Menu className="h-6 w-6" />
        </Button>
      </div>
    </nav>
  );
}
