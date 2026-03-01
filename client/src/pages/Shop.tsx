import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowRight } from "lucide-react";
import img1 from "@/assets/images/gallery_1.jpg";
import img2 from "@/assets/images/gallery_2.jpg";
import img3 from "@/assets/images/gallery_3.jpg";

const PRODUCTS = [
  {
    id: 1,
    name: "Handcrafted Stone Replica",
    price: "₹2,499",
    image: img1,
    category: "Decor"
  },
  {
    id: 2,
    name: "Khajuraho Art Print",
    price: "₹899",
    image: img2,
    category: "Art"
  },
  {
    id: 3,
    name: "Temple Architecture Book",
    price: "₹1,250",
    image: img3,
    category: "Books"
  }
];

export default function Shop() {
  return (
    <div className="min-h-screen bg-background flex flex-col pt-24">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 pb-24">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif mb-4">Heritage Shop</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto font-light">Bring a piece of Khajuraho's timeless beauty into your home with our curated collection of replicas and art.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {PRODUCTS.map((product) => (
            <Card key={product.id} className="group overflow-hidden border-none shadow-lg bg-card" data-testid={`card-product-${product.id}`}>
              <div className="relative aspect-square overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-4 right-4">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">{product.category}</span>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-serif mb-2">{product.name}</h3>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-2xl font-light text-primary">{product.price}</span>
                  <Button size="icon" variant="outline" className="rounded-full hover:bg-primary hover:text-primary-foreground transition-all">
                    <ShoppingBag className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
