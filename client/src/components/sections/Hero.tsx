import heroImg from "@/assets/images/hero.jpg";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImg} 
          alt="Khajuraho Temple at sunset" 
          className="w-full h-full object-cover object-center scale-105 animate-in fade-in zoom-in duration-1000"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="container relative z-10 px-4 text-center">
        <span className="inline-block animate-in slide-in-from-bottom-4 fade-in duration-700 delay-100 mb-4 text-primary-foreground/80 tracking-[0.3em] text-sm uppercase">
          UNESCO World Heritage Site
        </span>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-6 drop-shadow-lg animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-200">
          Poetry in <span className="text-primary-foreground italic font-light">Stone</span>
        </h1>
        <p className="text-white/90 max-w-2xl mx-auto text-lg md:text-xl font-light mb-10 drop-shadow animate-in slide-in-from-bottom-4 fade-in duration-700 delay-300 leading-relaxed">
          Journey into the heart of India's ancient architectural brilliance. Discover the magnificent 10th-century temples of Khajuraho, where every carving tells a timeless story.
        </p>
        
        <div className="animate-in slide-in-from-bottom-4 fade-in duration-700 delay-500">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-lg tracking-wide uppercase transition-all hover:scale-105" data-testid="button-explore">
            Explore the Temples
          </Button>
        </div>
      </div>
    </section>
  );
}
