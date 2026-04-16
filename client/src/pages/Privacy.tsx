import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useI18n } from "@/lib/i18n";

export default function Privacy() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-background flex flex-col pt-24">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 pb-24">
        <div className="max-w-4xl mx-auto bg-card/80 border border-border/60 rounded-3xl p-8 md:p-12 shadow-xl">
          <h1 className="text-4xl font-serif mb-6">{t("privacy.title")}</h1>
          <p className="text-muted-foreground font-light leading-relaxed mb-6">
            {t("privacy.p1")}
          </p>
          <p className="text-muted-foreground font-light leading-relaxed mb-6">
            {t("privacy.p2")}
          </p>
          <p className="text-muted-foreground font-light leading-relaxed">
            {t("privacy.p3")}
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
