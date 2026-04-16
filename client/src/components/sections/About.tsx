import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import heritageSlide1 from "@/assets/images/curated/heritage-slide-1.jpg";
import heritageSlide2 from "@/assets/images/curated/heritage-slide-2.jpg";
import heritageSlide3 from "@/assets/images/curated/heritage-slide-3.jpg";

const HERITAGE_SLIDES = [
  heritageSlide1,
  heritageSlide2,
  heritageSlide3,
];

function CountStat({ target, label }: { target: number; label: string }) {
  const [value, setValue] = useState(0);
  const numberRef = useRef<HTMLHeadingElement | null>(null);
  const isInView = useInView(numberRef, { amount: 0.6 });

  useEffect(() => {
    if (!isInView) {
      return;
    }

    setValue(0);
    let start: number | null = null;
    const duration = 1800;
    let frame = 0;

    const tick = (timestamp: number) => {
      if (start === null) {
        start = timestamp;
      }
      const progress = Math.min((timestamp - start) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [isInView, target]);

  return (
    <div className="stat rounded-2xl border border-border/50 bg-card/80 p-5 text-center">
      <h3 ref={numberRef} className="stat__number text-4xl md:text-5xl font-serif text-primary leading-none">
        {value}
      </h3>
      <p className="stat__label text-xs uppercase tracking-[0.2em] mt-3 text-foreground/70">
        {label}
      </p>
    </div>
  );
}

export function About() {
  const { t } = useI18n();
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveImage((prev) => (prev + 1) % HERITAGE_SLIDES.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="heritage" className="py-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/3 z-0" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs">
                {t("about.kicker")}
              </span>
              <h2 className="text-5xl md:text-6xl font-serif text-foreground leading-tight">
                {t("about.title_architectural")} <br />
                <span className="italic font-light opacity-60">{t("about.title_symphony")}</span>
              </h2>
            </div>
            
            <div className="prose prose-lg text-muted-foreground font-light leading-relaxed max-w-xl">
              <p className="text-xl text-foreground/80 leading-relaxed mb-6">
                {t("about.p1")}
              </p>
              <p className="mb-4">{t("about.p2")}</p>
              <p className="mb-4">{t("about.p3")}</p>
              <p>{t("about.p4")}</p>
            </div>

            <div className="about__stats grid sm:grid-cols-3 gap-4 pt-4 max-w-3xl">
              <CountStat target={25} label={t("about.counter_surviving")} />
              <CountStat target={85} label={t("about.counter_originally_built")} />
              <CountStat target={1000} label={t("about.counter_years_old")} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-1000">
              <img 
                src={HERITAGE_SLIDES[activeImage]} 
                alt={t("about.image_alt")} 
                className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-1000"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 glass rounded-[2rem] p-8 hidden md:block shadow-2xl">
              <p className="text-sm font-serif italic text-primary leading-relaxed">
                "{t("about.quote")}"
              </p>
              <div className="mt-4 h-px w-12 bg-primary/30" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
