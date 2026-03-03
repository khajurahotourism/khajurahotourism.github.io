import heroImg from "@/assets/images/hero.jpg";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

export function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
        <img 
          src={heroImg} 
          alt="Khajuraho Temple Detail" 
          className="w-full h-full object-cover opacity-70 scale-110"
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
            UNESCO World Heritage Site
          </div>
          
          <h1 className="font-serif text-6xl md:text-8xl lg:text-[10rem] text-white leading-none tracking-tighter reveal-text">
            Stone <br />
            <span className="italic font-light text-primary-foreground drop-shadow-2xl">Echoes</span>
          </h1>
          
          <p className="text-white/70 max-w-xl mx-auto text-lg md:text-xl font-light leading-relaxed reveal-text [animation-delay:400ms]">
            Witness the 10th-century Chandela masterpiece where spiritual devotion meets the ultimate celebration of human form.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-8 reveal-text [animation-delay:600ms]">
            <Button size="lg" className="h-14 px-10 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-bold uppercase tracking-widest group shadow-2xl shadow-primary/40">
              Begin Journey
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="ghost" className="h-14 px-10 rounded-2xl text-white hover:bg-white/10 text-sm font-bold uppercase tracking-widest border border-white/20">
              Virtual Tour
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
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Scroll to Explore</span>
        <ChevronDown className="w-5 h-5" />
      </motion.div>
    </section>
  );
}
