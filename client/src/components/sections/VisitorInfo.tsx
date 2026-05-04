import { useState } from "react";
import { MapPin, Calendar, Clock, Ticket, Train, Plane, Bus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useI18n } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/translations";
import img4 from "@/assets/images/gallery_4.jpg";
import nearbyRaneh from "@/assets/images/curated/nearby-raneh.jpg";
import nearbyPandav from "@/assets/images/curated/nearby-pandav.webp";
import nearbyPanna from "@/assets/images/curated/nearby-panna.jpg";
import nearbyDhubela from "@/assets/images/curated/nearby-dhubela.jpg";
import nearbyJain from "@/assets/images/curated/nearby-jain.jpg";
import todoRanehNew from "@/assets/images/curated/todo-raneh-new.jpg";
import todoJainMuseumNew from "@/assets/images/curated/todo-jain-museum-new.webp";
import nearbyRanehNew from "@/assets/images/curated/nearby-raneh-new.jpg";
import nearbyDhubelaNew from "@/assets/images/curated/nearby-dhubela-new.webp";
import festival1 from "@/assets/images/curated/festival-1.jpeg";
import festival2 from "@/assets/images/curated/festival-2.jpeg";
import festival3 from "@/assets/images/curated/festival-3.webp";
import festival4 from "@/assets/images/curated/festival-4.jpg";
import festival5 from "@/assets/images/curated/festival-5.jpg";
import festival6 from "@/assets/images/curated/festival-6.jpg";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const THINGS_TO_DO: Array<{
  titleKey: TranslationKey;
  descKey: TranslationKey;
  href: string;
  image: string;
  sourceLabel: string;
}> = [
  {
    titleKey: "visitor.do_1_title",
    descKey: "visitor.do_1_desc",
    href: "https://www.mptourism.com/adivart-tribal-and-folk-art-museum-khajuraho.html",
    image:
      "https://www.mptourism.com/web/image/catalog/Blog%20Image/Adivart%20Tribal%20and%20Folk%20Art%20Museum.jpg",
    sourceLabel: "MP Tourism",
  },
  {
    titleKey: "visitor.do_2_title",
    descKey: "visitor.do_2_desc",
    href: "https://www.mptourism.com/destination-panna.php",
    image: "https://www.mptourism.com/images/destination/panna/profile_banner.png",
    sourceLabel: "MP Tourism",
  },
  {
    titleKey: "visitor.do_3_title",
    descKey: "visitor.do_3_desc",
    href: "https://www.mptourism.com/raneh-falls-near-khajuralo-and-panna.html",
    image: todoRanehNew,
    sourceLabel: "MP Tourism",
  },
  {
    titleKey: "visitor.do_4_title",
    descKey: "visitor.do_4_desc",
    href: "https://www.mptourism.com/destination-khajuraho.php",
    image: todoJainMuseumNew,
    sourceLabel: "MP Tourism",
  },
  {
    titleKey: "visitor.do_5_title",
    descKey: "visitor.do_5_desc",
    href: "https://www.mptourism.com/pdf/Khajuraho/Rural-Life-Experiences-Around-Khajuraho.pdf",
    image: "https://www.mptourism.com/web/image/catalog/Blog-2025/Ibaad-Homestay.webp",
    sourceLabel: "MP Tourism",
  },
];

const NEARBY_ATTRACTIONS: Array<{
  nameKey: TranslationKey;
  distanceKey: TranslationKey;
  noteKey: TranslationKey;
  href: string;
  image: string;
  sourceLabel: string;
}> = [
  {
    nameKey: "visitor.nearby_1_name",
    distanceKey: "visitor.nearby_1_distance",
    noteKey: "visitor.nearby_1_note",
    href: "https://www.mptourism.com/raneh-falls-near-khajuralo-and-panna.html",
    image: nearbyRanehNew,
    sourceLabel: "MP Tourism",
  },
  {
    nameKey: "visitor.nearby_2_name",
    distanceKey: "visitor.nearby_2_distance",
    noteKey: "visitor.nearby_2_note",
    href: "https://www.mptourism.com/destination-khajuraho.php",
    image: nearbyPandav,
    sourceLabel: "MP Tourism",
  },
  {
    nameKey: "visitor.nearby_3_name",
    distanceKey: "visitor.nearby_3_distance",
    noteKey: "visitor.nearby_3_note",
    href: "https://www.mptourism.com/destination-panna.php",
    image: nearbyPanna,
    sourceLabel: "MP Tourism",
  },
  {
    nameKey: "visitor.nearby_4_name",
    distanceKey: "visitor.nearby_4_distance",
    noteKey: "visitor.nearby_4_note",
    href: "https://www.mptourism.com/destination-khajuraho.php",
    image: nearbyDhubelaNew,
    sourceLabel: "MP Tourism",
  },
  {
    nameKey: "visitor.nearby_5_name",
    distanceKey: "visitor.nearby_5_distance",
    noteKey: "visitor.nearby_5_note",
    href: "https://www.mptourism.com/destination-khajuraho.php",
    image: nearbyJain,
    sourceLabel: "MP Tourism",
  },
];

export function VisitorInfo() {
  const { toast } = useToast();
  const { t } = useI18n();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const festivalCollage = [
    "https://upload.wikimedia.org/wikipedia/commons/5/57/Stage_at_Kandariya_Mahadeva_Temple_during_Khajuraho_Dance_Festival_2026_002.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Arunima_Kumar_at_Khajuraho_Dance_Festival.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/7/74/Shinjini_kathak_dance_indian_classical_khajuraho_festival.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/d/d0/Chhau_dance_troupe_performance_Khajuraho_Dance_Festival_2026_%2844%29.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/6/65/Chhau_dance_troupe_performance_Khajuraho_Dance_Festival_2026_%288%29.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/2/22/Chhau_dance_troupe_performance_Khajuraho_Dance_Festival_2026_%2845%29.jpg"
  ];

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = String(new FormData(form).get("email") ?? "").trim();

    if (!emailPattern.test(email)) {
      toast({
        title: t("errors.invalid_email"),
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await apiRequest("POST", "/api/subscribe", { email });
      toast({
        title: t("visitor.toast_title"),
        description: t("visitor.toast_desc"),
      });
      form.reset();
    } catch {
      toast({
        title: t("errors.submit_failed"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="visitor-info"
      className="py-24 bg-secondary/30 relative overflow-hidden"
    >
      <div className="absolute right-0 top-0 w-1/3 h-full opacity-20 hidden lg:block">
        <img
          src={img4}
          alt={t("visitor.carving_alt")}
          className="w-full h-full object-cover mix-blend-multiply"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl text-foreground mb-8">
              {t("visitor.title")}
            </h2>
            <p className="text-muted-foreground text-lg font-light mb-12">
              {t("visitor.subtitle")}
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-12">
              <Card className="bg-background/80 backdrop-blur border-none shadow-sm">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-lg mb-1">
                      {t("visitor.timings_title")}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {t("visitor.timings_line_1")}
                      <br />
                      {t("visitor.timings_line_2")}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-background/80 backdrop-blur border-none shadow-sm">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-lg mb-1">
                      {t("visitor.best_time_title")}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {t("visitor.best_time_line_1_mp")}
                      <br />
                      {t("visitor.best_time_line_2")}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-background/80 backdrop-blur border-none shadow-sm">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <Ticket className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-lg mb-1">
                      {t("visitor.entry_fee_title")}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {t("visitor.entry_fee_line_1")}
                      <br />
                      {t("visitor.entry_fee_line_2")}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-background/80 backdrop-blur border-none shadow-sm">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-lg mb-1">
                      {t("visitor.light_sound_title")}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {t("visitor.light_sound_line_1")}
                      <br />
                      {t("visitor.light_sound_line_2")}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="bg-card p-8 md:p-12 rounded-2xl shadow-xl border border-border/50">
            <h3 className="text-2xl font-serif mb-4 text-foreground">
              {t("visitor.guidebook_title")}
            </h3>
            <p className="text-muted-foreground mb-8 font-light">
              {t("visitor.guidebook_desc")}
            </p>

            <form onSubmit={handleSubscribe} className="space-y-4">
              <div>
                <Input
                  name="email"
                  type="email"
                  placeholder={t("visitor.email_placeholder")}
                  required
                  className="bg-background border-border h-12 text-lg focus-visible:ring-primary"
                  data-testid="input-email-subscribe"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 text-lg bg-primary hover:bg-primary/90 text-primary-foreground"
                data-testid="button-submit-subscribe"
              >
                {t("visitor.guidebook_button")}
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-20">
          <h3 className="text-3xl font-serif mb-3">{t("visitor.how_to_reach_title")}</h3>
          <p className="text-muted-foreground font-light max-w-4xl">
            {t("visitor.how_to_reach_intro")}
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <article className="bg-card/90 rounded-3xl border border-border/40 p-6 shadow-xl">
              <div className="bg-primary/10 p-3 rounded-full text-primary inline-flex mb-4">
                <Train className="w-5 h-5" />
              </div>
              <h4 className="text-xl font-serif mb-3">{t("visitor.reach_train_title")}</h4>
              <p className="text-sm font-light text-muted-foreground leading-relaxed mb-3">
                {t("visitor.reach_train_line_1")}
              </p>
              <p className="text-sm font-light text-muted-foreground leading-relaxed">
                {t("visitor.reach_train_line_2")}
              </p>
            </article>

            <article className="bg-card/90 rounded-3xl border border-border/40 p-6 shadow-xl">
              <div className="bg-primary/10 p-3 rounded-full text-primary inline-flex mb-4">
                <Plane className="w-5 h-5" />
              </div>
              <h4 className="text-xl font-serif mb-3">{t("visitor.reach_air_title")}</h4>
              <p className="text-sm font-light text-muted-foreground leading-relaxed mb-3">
                {t("visitor.reach_air_line_1")}
              </p>
              <p className="text-sm font-light text-muted-foreground leading-relaxed">
                {t("visitor.reach_air_line_2")}
              </p>
            </article>

            <article className="bg-card/90 rounded-3xl border border-border/40 p-6 shadow-xl">
              <div className="bg-primary/10 p-3 rounded-full text-primary inline-flex mb-4">
                <Bus className="w-5 h-5" />
              </div>
              <h4 className="text-xl font-serif mb-3">{t("visitor.reach_road_title")}</h4>
              <p className="text-sm font-light text-muted-foreground leading-relaxed mb-3">
                {t("visitor.reach_road_line_1")}
              </p>
              <p className="text-sm font-light text-muted-foreground leading-relaxed">
                {t("visitor.reach_road_line_2")}
              </p>
            </article>
          </div>
        </div>

        <div className="mt-10 grid lg:grid-cols-2 gap-8">
          <article className="bg-card/90 rounded-3xl border border-border/40 p-8 shadow-xl">
            <h3 className="text-2xl font-serif mb-3">{t("visitor.things_to_do_title")}</h3>
            <p className="text-muted-foreground font-light mb-6">
              {t("visitor.things_to_do_intro")}
            </p>
            <div className="space-y-4">
              {THINGS_TO_DO.map((item) => (
                <a
                  key={item.titleKey}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group block rounded-2xl border border-border/50 bg-background/60 p-4 hover:border-primary/40 transition-colors"
                >
                  <div className="relative mb-3 overflow-hidden rounded-xl aspect-[16/9]">
                    <img
                      src={item.image}
                      alt={t(item.titleKey)}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                      <p className="text-xs text-white/95 leading-relaxed">
                        {t(item.descKey)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <h4 className="text-base font-serif">{t(item.titleKey)}</h4>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-primary bg-primary/10 rounded-full px-3 py-1">
                      {item.sourceLabel}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </article>

          <article className="bg-card/90 rounded-3xl border border-border/40 p-8 shadow-xl">
            <h3 className="text-2xl font-serif mb-3">{t("visitor.nearby_title")}</h3>
            <p className="text-muted-foreground font-light mb-6">
              {t("visitor.nearby_intro")}
            </p>
            <div className="space-y-4">
              {NEARBY_ATTRACTIONS.map((place) => (
                <a
                  key={place.nameKey}
                  href={place.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group block rounded-2xl border border-border/50 bg-background/60 p-4 hover:border-primary/40 transition-colors"
                >
                  <div className="relative mb-3 overflow-hidden rounded-xl aspect-[16/9]">
                    <img
                      src={place.image}
                      alt={t(place.nameKey)}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                      <p className="text-xs text-white/95 leading-relaxed">
                        {t(place.noteKey)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <h4 className="text-base font-serif">{t(place.nameKey)}</h4>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-primary bg-primary/10 rounded-full px-3 py-1">
                      {t(place.distanceKey)}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </article>
        </div>

        <div className="mt-10 bg-card/90 rounded-3xl border border-border/40 p-8 shadow-xl">
          <h3 className="text-2xl font-serif mb-3">{t("visitor.festival_title")}</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
            {festivalCollage.map((src, index) => (
              <div
                key={`festival-image-${index}`}
                className="relative overflow-hidden rounded-2xl aspect-[4/3] border border-border/40"
              >
                <img
                  src={src}
                  alt={`${t("visitor.festival_title")} ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          <p className="text-sm font-light text-muted-foreground leading-relaxed mb-3">
            {t("visitor.festival_desc_1")}
          </p>
          <p className="text-sm font-light text-muted-foreground leading-relaxed mb-4">
            {t("visitor.festival_desc_2")}
          </p>
          <a
            href="https://www.mptourism.com/khajuraho-dance-festival.htm"
            target="_blank"
            rel="noreferrer"
            className="text-xs uppercase tracking-widest font-bold text-primary hover:underline"
          >
            {t("visitor.festival_link_label")}
          </a>
        </div>
      </div>
    </section>
  );
}
