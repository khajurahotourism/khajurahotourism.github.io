import { Link } from "wouter";
import { Menu, Globe, ChevronDown, Check } from "lucide-react";
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { motion } from "framer-motion";
import { languageOptions, useI18n } from "@/lib/i18n";
import { useSectionNav } from "@/lib/section-nav";

const internationalLanguages = languageOptions.filter(
  (language) => language.group === "international",
);
const indianLanguages = languageOptions.filter(
  (language) => language.group === "indian",
);

export function Navbar() {
  const { language, setLanguage, t } = useI18n();
  const { goToSection } = useSectionNav();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "circOut" }}
      className="fixed top-0 w-full z-50 px-4 py-4 pointer-events-none"
    >
      <div className="container mx-auto h-16 glass rounded-2xl flex items-center justify-between px-6 pointer-events-auto shadow-sm">
        <Link href="/">
          <a
            className="font-serif text-2xl font-black text-primary tracking-tighter flex items-center gap-2 group"
            data-testid="link-home"
          >
            <span className="bg-primary text-white w-8 h-8 flex items-center justify-center rounded-lg group-hover:rotate-12 transition-transform">
              K
            </span>
            {t("brand.name")}
          </a>
        </Link>

        <div className="hidden lg:flex gap-1 items-center">
          <button
            type="button"
            onClick={() => goToSection("heritage")}
            className="bg-transparent border-0 px-4 py-2 text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors"
          >
            {t("nav.heritage")}
          </button>
          <button
            type="button"
            onClick={() => goToSection("temples")}
            className="bg-transparent border-0 px-4 py-2 text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors"
          >
            {t("nav.architecture")}
          </button>
          <Link href="/shop">
            <a className="px-4 py-2 text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors">
              {t("nav.boutique")}
            </a>
          </Link>

          <div className="h-6 w-px bg-border/60 mx-2" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 font-bold uppercase tracking-tighter text-xs h-9 hover:bg-primary/5"
              >
                <Globe className="h-4 w-4 text-primary" />
                {t("nav.language")}
                <ChevronDown className="h-3 w-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 glass border-none shadow-2xl p-2 animate-in zoom-in-95 duration-200"
            >
              <DropdownMenuLabel className="text-[10px] uppercase tracking-widest opacity-50 px-2 py-1">
                {t("nav.international")}
              </DropdownMenuLabel>
              {internationalLanguages.map((option) => (
                <DropdownMenuItem
                  key={option.code}
                  className="rounded-md cursor-pointer flex justify-between items-center py-2"
                  onSelect={(event) => {
                    event.preventDefault();
                    setLanguage(option.code);
                  }}
                >
                  <span>{option.nativeName}</span>
                  <span className="flex items-center gap-2">
                    <span className="text-lg">{option.flag}</span>
                    {language === option.code ? (
                      <Check className="h-3 w-3 text-primary" />
                    ) : null}
                  </span>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator className="bg-border/40 my-2" />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="rounded-md py-2">
                  <span>{t("nav.indian_languages")}</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="w-56 glass border-none shadow-2xl p-2">
                    {indianLanguages.map((option) => (
                      <DropdownMenuItem
                        key={option.code}
                        className="rounded-md cursor-pointer flex justify-between items-center py-2"
                        onSelect={(event) => {
                          event.preventDefault();
                          setLanguage(option.code);
                        }}
                      >
                        <span>{option.nativeName}</span>
                        <span className="flex items-center gap-2">
                          <span className="text-lg">{option.flag}</span>
                          {language === option.code ? (
                            <Check className="h-3 w-3 text-primary" />
                          ) : null}
                        </span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            asChild
            className="ml-2 rounded-xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 h-10 px-6 font-bold uppercase tracking-widest text-[10px]"
          >
            <Link href="/contact">{t("nav.plan_visit")}</Link>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden rounded-xl"
              data-testid="button-mobile-menu"
              aria-label={t("nav.menu")}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[320px] sm:max-w-sm">
            <SheetHeader className="pr-8">
              <SheetTitle className="font-serif">{t("nav.mobile_title")}</SheetTitle>
              <SheetDescription>{t("nav.mobile_description")}</SheetDescription>
            </SheetHeader>

            <div className="mt-8 flex flex-col gap-3">
              <SheetClose asChild>
                <Link href="/">
                  <a className="px-4 py-3 rounded-xl border border-border text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors">
                    {t("nav.home")}
                  </a>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <button
                  type="button"
                  onClick={() => goToSection("heritage")}
                  className="bg-transparent px-4 py-3 rounded-xl border border-border text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors"
                >
                  {t("nav.heritage")}
                </button>
              </SheetClose>
              <SheetClose asChild>
                <button
                  type="button"
                  onClick={() => goToSection("temples")}
                  className="bg-transparent px-4 py-3 rounded-xl border border-border text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors"
                >
                  {t("nav.architecture")}
                </button>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/shop">
                  <a className="px-4 py-3 rounded-xl border border-border text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors">
                    {t("nav.boutique")}
                  </a>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/contact">
                  <a className="px-4 py-3 rounded-xl border border-border text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors">
                    {t("nav.contact")}
                  </a>
                </Link>
              </SheetClose>
            </div>

            <div className="mt-8">
              <p className="text-[10px] uppercase tracking-widest opacity-50 mb-3">
                {t("nav.language")}
              </p>
              <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
                {languageOptions.map((option) => (
                  <button
                    key={option.code}
                    type="button"
                    onClick={() => setLanguage(option.code)}
                    className="px-3 py-2 rounded-lg border border-border text-xs font-medium flex items-center justify-between gap-2 hover:border-primary/40 hover:text-primary transition-colors"
                  >
                    <span className="truncate">{option.flag}</span>
                    <span className="truncate uppercase">{option.code}</span>
                    {language === option.code ? (
                      <Check className="h-3 w-3 text-primary" />
                    ) : null}
                  </button>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.nav>
  );
}
