import { Link } from "wouter";
import { Menu, Globe, ShoppingBag, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";

const LANGUAGES = {
  international: [
    { code: "en", name: "English (US)", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "it", name: "Italiano", flag: "🇮🇹" },
    { code: "ru", name: "Pусский", flag: "🇷🇺" },
    { code: "zh", name: "中文", flag: "🇨🇳" },
    { code: "ja", name: "日本語", flag: "🇯🇵" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
  ],
  indian: [
    { code: "hi", name: "हिन्दी (Hindi)", flag: "🇮🇳" },
    { code: "ta", name: "தமிழ் (Tamil)", flag: "🇮🇳" },
    { code: "te", name: "తెలుగు (Telugu)", flag: "🇮🇳" },
    { code: "bn", name: "বাংলা (Bangla)", flag: "🇮🇳" },
    { code: "gu", name: "ગુજરાતી (Gujarati)", flag: "🇮🇳" },
    { code: "ml", name: "മലയാളം (Malayalam)", flag: "🇮🇳" },
    { code: "as", name: "অসমীয়া (Assamese)", flag: "🇮🇳" },
    { code: "ks", name: "کٲشُر (Kashmiri)", flag: "🇮🇳" },
  ]
};

export function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "circOut" }}
      className="fixed top-0 w-full z-50 px-4 py-4 pointer-events-none"
    >
      <div className="container mx-auto h-16 glass rounded-2xl flex items-center justify-between px-6 pointer-events-auto shadow-sm">
        <Link href="/">
          <a className="font-serif text-2xl font-black text-primary tracking-tighter flex items-center gap-2 group" data-testid="link-home">
            <span className="bg-primary text-white w-8 h-8 flex items-center justify-center rounded-lg group-hover:rotate-12 transition-transform">K</span>
            KHAJURAHO
          </a>
        </Link>
        
        <div className="hidden lg:flex gap-1 items-center">
          <Link href="/#about"><a className="px-4 py-2 text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors">Heritage</a></Link>
          <Link href="/#temples"><a className="px-4 py-2 text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors">Architecture</a></Link>
          <Link href="/shop"><a className="px-4 py-2 text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors">Boutique</a></Link>
          
          <div className="h-6 w-px bg-border/60 mx-2" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2 font-bold uppercase tracking-tighter text-xs h-9 hover:bg-primary/5">
                <Globe className="h-4 w-4 text-primary" />
                Language
                <ChevronDown className="h-3 w-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 glass border-none shadow-2xl p-2 animate-in zoom-in-95 duration-200">
              <DropdownMenuLabel className="text-[10px] uppercase tracking-widest opacity-50 px-2 py-1">International</DropdownMenuLabel>
              {LANGUAGES.international.map((lang) => (
                <DropdownMenuItem key={lang.code} className="rounded-md cursor-pointer flex justify-between items-center py-2">
                  <span>{lang.name}</span>
                  <span className="text-lg">{lang.flag}</span>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator className="bg-border/40 my-2" />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="rounded-md py-2">
                  <span>Indian Languages</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="w-56 glass border-none shadow-2xl p-2">
                    {LANGUAGES.indian.map((lang) => (
                      <DropdownMenuItem key={lang.code} className="rounded-md cursor-pointer flex justify-between items-center py-2">
                        <span>{lang.name}</span>
                        <span className="text-lg">{lang.flag}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button asChild className="ml-2 rounded-xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 h-10 px-6 font-bold uppercase tracking-widest text-[10px]">
            <Link href="/contact">Plan Visit</Link>
          </Button>
        </div>

        <Button variant="ghost" size="icon" className="lg:hidden rounded-xl" data-testid="button-mobile-menu">
          <Menu className="h-6 w-6" />
        </Button>
      </div>
    </motion.nav>
  );
}
