import { useEffect, useState } from "react";
import heroImg from "@/assets/images/hero.jpg";
import heroSlide1 from "@/assets/images/curated/hero-slide-1.jpg";
import heroSlide2 from "@/assets/images/curated/hero-slide-2.jpg";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useSectionNav } from "@/lib/section-nav";

const HERO_SLIDES = [
  heroImg,
  heroSlide1,
  heroSlide2,
];

export function Hero() {
  const { t } = useI18n();
  const { goToSection } = useSectionNav();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
        {HERO_SLIDES.map((slide, index) => (
          <motion.img
            key={slide}
            src={slide}
            alt={t("hero.hero_image_alt")}
            className="absolute inset-0 w-full h-full object-cover"
            initial={false}
            animate={{
              opacity: index === currentSlide ? 0.7 : 0,
              scale: index === currentSlide ? 1.08 : 1.1,
            }}
            transition={{ duration: 1.4, ease: "linear" }}
          />
        ))}
        <motion.div
          className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-primary/20 blur-3xl"
          animate={{ x: [0, 36, 0], y: [0, 18, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-amber-300/20 blur-3xl"
          animate={{ x: [0, -24, 0], y: [0, -14, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-background" />
      </motion.div>

      <div className="container relative z-10 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-white/10 text-white/80 text-[10px] uppercase tracking-[0.4em] font-bold mx-auto mb-4">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            {t("hero.badge_unesco")}
          </div>

          <h1 className="font-serif text-6xl md:text-8xl lg:text-[10rem] text-white leading-none tracking-tighter reveal-text">
            {t("hero.title_stone")} <br />
            <span className="italic font-light text-primary-foreground drop-shadow-2xl">
              {t("hero.title_echoes")}
            </span>
          </h1>

          <p className="text-white/70 max-w-xl mx-auto text-lg md:text-xl font-light leading-relaxed reveal-text [animation-delay:400ms]">
            {t("hero.subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-8 reveal-text [animation-delay:600ms]">
            <Button
              size="lg"
              type="button"
              onClick={() => goToSection("visitor-info")}
              className="h-14 px-10 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-bold uppercase tracking-widest group shadow-2xl shadow-primary/40"
            >
              <>
                Book Your Bespoke Getaway
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </>
            </Button>
            <Button
              size="lg"
              type="button"
              onClick={() => goToSection("temples")}
              variant="ghost"
              className="h-14 px-10 rounded-2xl text-white hover:bg-white/10 text-sm font-bold uppercase tracking-widest border border-white/20"
            >
              {t("hero.virtual_tour")}
            </Button>
          </div>
        </motion.div>
      </div>

      <motion.div
        style={{ opacity }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white/40 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold">
          {t("hero.scroll_explore")}
        </span>
        <ChevronDown className="w-5 h-5" />
      </motion.div>

      <div className="absolute bottom-8 right-8 z-10 hidden md:flex items-center gap-2">
        {HERO_SLIDES.map((_, index) => (
          <button
            key={`hero-slide-dot-${index}`}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              index === currentSlide ? "w-10 bg-white" : "w-4 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
