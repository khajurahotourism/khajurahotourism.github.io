export function About() {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-foreground mb-6" data-testid="text-about-title">The Legacy of Chandela Dynasty</h2>
          <div className="w-24 h-1 bg-primary mx-auto opacity-60"></div>
        </div>
        
        <div className="prose prose-lg mx-auto text-muted-foreground font-light leading-loose text-center">
          <p className="mb-6 first-letter:text-7xl first-letter:font-serif first-letter:text-primary first-letter:mr-3 first-letter:float-left">
            Built between 950 and 1050 AD by the Chandela dynasty, the Khajuraho Group of Monuments represents one of the finest manifestations of Indian temple architecture. Originally consisting of 85 temples spread across 20 square kilometers, today only 25 remain to tell the tale of a glorious past.
          </p>
          <p>
            Renowned globally for their intricate Nagara-style architectural symbolism and their erotic sculptures, the temples are a celebration of life, love, and divine beauty. The sandstone carvings depict various forms like meditation, spiritual teachings, kinship, wrestling, royalty, and most famously, the sensual arts, making them a profound study in human emotion and artistic expression.
          </p>
        </div>
      </div>
    </section>
  );
}
