import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="py-32 relative overflow-hidden">
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
              <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs">The Origin</span>
              <h2 className="text-5xl md:text-6xl font-serif text-foreground leading-tight">
                Architectural <br />
                <span className="italic font-light opacity-60">Symphony</span>
              </h2>
            </div>
            
            <div className="prose prose-lg text-muted-foreground font-light leading-relaxed max-w-xl">
              <p className="text-xl text-foreground/80 leading-relaxed mb-6">
                Between 950 and 1050 AD, the Chandela kings breathed life into the sandstone of Khajuraho, creating a language that transcends time.
              </p>
              <p>
                This isn't just a group of temples; it's a profound exploration of the <strong>Kama</strong> (desire), <strong>Artha</strong> (prosperity), <strong>Dharma</strong> (duty), and <strong>Moksha</strong> (liberation). The intricate Nagara-style spires (Shikharas) mimic the peaks of the Himalayas, guiding the soul from the material world to the divine heights.
              </p>
            </div>

            <div className="flex gap-12 pt-4">
              <div>
                <div className="text-4xl font-serif text-primary">25</div>
                <div className="text-[10px] uppercase tracking-widest font-bold opacity-50">Temples Remain</div>
              </div>
              <div>
                <div className="text-4xl font-serif text-primary">1k+</div>
                <div className="text-[10px] uppercase tracking-widest font-bold opacity-50">Years Old</div>
              </div>
              <div>
                <div className="text-4xl font-serif text-primary">800</div>
                <div className="text-[10px] uppercase tracking-widest font-bold opacity-50">Sculptures</div>
              </div>
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
                src="https://images.unsplash.com/photo-1625505826533-5c80aca7d157?q=80&w=2069&auto=format&fit=crop" 
                alt="Ancient Carvings" 
                className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-1000"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 glass rounded-[2rem] p-8 hidden md:block shadow-2xl">
              <p className="text-sm font-serif italic text-primary leading-relaxed">
                "Here, stone is not a dead material, it is a medium for spiritual ecstasy."
              </p>
              <div className="mt-4 h-px w-12 bg-primary/30" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
