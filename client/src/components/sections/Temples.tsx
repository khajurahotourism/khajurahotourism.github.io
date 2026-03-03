import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import img1 from "@/assets/images/gallery_1.jpg";
import img2 from "@/assets/images/gallery_2.jpg";
import img3 from "@/assets/images/gallery_3.jpg";

const TEMPLES = [
  {
    id: 1,
    name: "Kandariya Mahadeva",
    type: "Shivite",
    group: "Western",
    image: img1,
    stat: "31 Meters High"
  },
  {
    id: 2,
    name: "Lakshmana Temple",
    type: "Vaishnavite",
    group: "Western",
    image: img2,
    stat: "Nagara Style"
  },
  {
    id: 3,
    name: "Parshvanatha",
    type: "Jainism",
    group: "Eastern",
    image: img3,
    stat: "Intricate Spires"
  }
];

export function Temples() {
  return (
    <section id="temples" className="py-32 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="space-y-4">
            <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs">The Collection</span>
            <h2 className="text-5xl md:text-7xl font-serif text-foreground leading-tight">
              Eternal <br />
              <span className="italic font-light opacity-60">Monuments</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm text-lg font-light leading-relaxed">
            From the massive Shikharas to the delicate decorative motifs, discover the masterpieces of Indian heritage.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {TEMPLES.map((temple, idx) => (
            <motion.div
              key={temple.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.8 }}
            >
              <Card className="group relative bg-transparent border-none shadow-none overflow-visible">
                <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl">
                  <img 
                    src={temple.image} 
                    alt={temple.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
                  
                  <div className="absolute top-6 left-6 flex flex-col gap-2">
                    <Badge variant="outline" className="bg-white/10 backdrop-blur-md border-white/20 text-white text-[10px] uppercase tracking-widest font-bold py-1 px-3">
                      {temple.group} Group
                    </Badge>
                  </div>

                  <div className="absolute bottom-10 left-10 right-10 transform transition-transform duration-500 group-hover:-translate-y-2">
                    <div className="text-white/60 text-[10px] uppercase tracking-[0.2em] font-bold mb-2">{temple.type}</div>
                    <h3 className="text-3xl font-serif text-white mb-4 leading-tight">{temple.name}</h3>
                    <div className="flex items-center justify-between pt-4 border-t border-white/20">
                      <span className="text-white/80 text-xs font-light">{temple.stat}</span>
                      <div className="w-10 h-10 rounded-full glass flex items-center justify-center text-white group-hover:bg-primary group-hover:text-white transition-colors">
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
