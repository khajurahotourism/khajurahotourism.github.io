import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import img1 from "@/assets/images/gallery_1.jpg";
import img2 from "@/assets/images/gallery_2.jpg";
import img3 from "@/assets/images/gallery_3.jpg";

const TEMPLES = [
  {
    id: 1,
    name: "Kandariya Mahadeva Temple",
    group: "Western Group",
    image: img1,
    description: "The largest and most ornate Hindu temple in the medieval temple group. It is dedicated to Shiva and features over 900 intricate sculptures."
  },
  {
    id: 2,
    name: "Lakshmana Temple",
    group: "Western Group",
    image: img2,
    description: "One of the best-preserved temples, dedicated to Vaikuntha Vishnu. Its outer walls are adorned with stunning rows of sculptures."
  },
  {
    id: 3,
    name: "Parshvanatha Temple",
    group: "Eastern Group",
    image: img3,
    description: "The largest Jain temple in Khajuraho, known for its exceptional non-erotic sculptures depicting daily life and beautiful maidens."
  }
];

export function Temples() {
  return (
    <section id="temples" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="mb-16 md:flex justify-between items-end">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl text-foreground mb-4">Architectural Marvels</h2>
            <p className="text-muted-foreground text-lg font-light">Explore the magnificent sandstone structures divided into Western, Eastern, and Southern groups.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEMPLES.map((temple) => (
            <Card key={temple.id} className="overflow-hidden border-none shadow-lg group bg-background" data-testid={`card-temple-${temple.id}`}>
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={temple.image} 
                  alt={temple.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <CardContent className="p-6 relative z-10 bg-background">
                <Badge variant="secondary" className="mb-4 text-xs font-normal tracking-wider bg-secondary/50 text-secondary-foreground">
                  {temple.group}
                </Badge>
                <h3 className="text-2xl font-serif mb-3 text-foreground">{temple.name}</h3>
                <p className="text-muted-foreground font-light leading-relaxed line-clamp-3">
                  {temple.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
