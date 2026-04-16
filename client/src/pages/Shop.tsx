import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import img1 from "@/assets/images/gallery_1.jpg";
import img2 from "@/assets/images/gallery_2.jpg";
import img3 from "@/assets/images/gallery_3.jpg";
import { useToast } from "@/hooks/use-toast";
import { useI18n } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/translations";

const PRODUCTS: Array<{
  id: number;
  nameKey: TranslationKey;
  price: string;
  image: string;
  categoryKey: TranslationKey;
}> = [
  {
    id: 1,
    nameKey: "shop.product_1_name",
    price: "\u20b92,499",
    image: img1,
    categoryKey: "shop.category_decor",
  },
  {
    id: 2,
    nameKey: "shop.product_2_name",
    price: "\u20b9899",
    image: img2,
    categoryKey: "shop.category_art",
  },
  {
    id: 3,
    nameKey: "shop.product_3_name",
    price: "\u20b91,250",
    image: img3,
    categoryKey: "shop.category_books",
  },
];

export default function Shop() {
  const { toast } = useToast();
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-background flex flex-col pt-24">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 pb-24">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif mb-4">{t("shop.title")}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto font-light">
            {t("shop.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {PRODUCTS.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden border-none shadow-lg bg-card"
              data-testid={`card-product-${product.id}`}
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={t(product.nameKey)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                    {t(product.categoryKey)}
                  </span>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-serif mb-2">{t(product.nameKey)}</h3>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-2xl font-light text-primary">
                    {product.price}
                  </span>
                  <Button
                    size="icon"
                    variant="outline"
                    className="rounded-full hover:bg-primary hover:text-primary-foreground transition-all"
                    aria-label={t("shop.add_to_interest")}
                    onClick={() =>
                      toast({
                        title: t("shop.toast_title"),
                        description: t("shop.toast_desc"),
                      })
                    }
                  >
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
