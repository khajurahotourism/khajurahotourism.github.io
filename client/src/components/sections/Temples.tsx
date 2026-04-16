import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/translations";
import { useSectionNav } from "@/lib/section-nav";

const KANDARIYA_IMAGE =
  "https://www.mptourism.com/images/point-of-interest/Kandariya%20Mahadev1.webp";
const LAKSHMANA_IMAGE =
  "https://www.mptourism.com/images/point-of-interest/Laxman%20Temple.webp";
const PARSHVANATHA_IMAGE =
  "https://www.mptourism.com/images/point-of-interest/khajuraho_pop6.webp";
const KHAJURAHO_OVERVIEW_IMAGE =
  "https://www.mptourism.com/images/destination/khajuraho/profile_banner.webp";
const CHAUSATH_YOGINI_IMAGE =
  "https://www.mptourism.com/images/point-of-interest/Chaunsat%20Yogini.webp";
const CHITRAGUPTA_IMAGE =
  "https://www.mptourism.com/web/image/catalog/Blog%20Image/Chitragupta%20Temple-khajuraho_pop6-min.jpg";
const LALGUAN_MAHADEVA_IMAGE =
  "https://www.mptourism.com/web/image/catalog/2024/Matangeshwar%20Temple.jpg";
const BRAHMA_IMAGE =
  "https://www.mptourism.com/images/point-of-interest/khajuraho-poi2.webp";
const HANUMAN_IMAGE =
  "https://www.mptourism.com/images/point-of-interest/khajuraho_pop21.webp";
const GHANTAI_IMAGE =
  "https://www.mptourism.com/images/point-of-interest/khajuraho_pop5-1.webp";
const JAVARI_IMAGE =
  "https://www.mptourism.com/images/point-of-interest/khajuraho_pop6.webp";
const VAMANA_IMAGE =
  "https://www.mptourism.com/web/image/catalog/Blog-2025/Vamana-Temple-%20Khajuraho.webp";
const ADINATH_IMAGE =
  "https://www.mptourism.com/images/point-of-interest/khajuraho-poi2.webp";
const SHANTINATHA_IMAGE =
  "https://www.mptourism.com/images/point-of-interest/khajuraho_pop21.webp";
const DULADEO_IMAGE =
  "https://www.mptourism.com/web/image/catalog/Khajuraho-Story-2.jpg";
const CHATURBHUJA_IMAGE =
  "https://www.mptourism.com/images/point-of-interest/2-chaturbhuj-Temple.webp";

const TEMPLES: Array<{
  id: number;
  nameKey: TranslationKey;
  typeKey: TranslationKey;
  groupKey: TranslationKey;
  statKey: TranslationKey;
  image: string;
}> = [
  {
    id: 1,
    nameKey: "temples.temple_1_name",
    typeKey: "temples.type_1",
    groupKey: "temples.temple_1_group",
    image: KANDARIYA_IMAGE,
    statKey: "temples.stat_1",
  },
  {
    id: 2,
    nameKey: "temples.temple_2_name",
    typeKey: "temples.type_2",
    groupKey: "temples.temple_2_group",
    image: LAKSHMANA_IMAGE,
    statKey: "temples.stat_2",
  },
  {
    id: 3,
    nameKey: "temples.temple_3_name",
    typeKey: "temples.type_3",
    groupKey: "temples.temple_3_group",
    image: PARSHVANATHA_IMAGE,
    statKey: "temples.stat_3",
  },
];

const COMPONENT_LOCATIONS: Array<{
  nameKey: TranslationKey;
  groupKey: TranslationKey;
  coordinates: string;
  latitude: number;
  longitude: number;
  image: string;
}> = [
  {
    nameKey: "temples.component_name_1",
    groupKey: "temples.component_group_western",
    coordinates: "24.853270, 79.920901",
    latitude: 24.85327,
    longitude: 79.920901,
    image: KHAJURAHO_OVERVIEW_IMAGE,
  },
  {
    nameKey: "temples.component_name_2",
    groupKey: "temples.component_group_western",
    coordinates: "24.849720, 79.918095",
    latitude: 24.84972,
    longitude: 79.918095,
    image: CHAUSATH_YOGINI_IMAGE,
  },
  {
    nameKey: "temples.component_name_3",
    groupKey: "temples.component_group_western",
    coordinates: "24.837611, 79.921250",
    latitude: 24.837611,
    longitude: 79.92125,
    image: CHITRAGUPTA_IMAGE,
  },
  {
    nameKey: "temples.component_name_4",
    groupKey: "temples.component_group_western",
    coordinates: "24.850802, 79.911269",
    latitude: 24.850802,
    longitude: 79.911269,
    image: LALGUAN_MAHADEVA_IMAGE,
  },
  {
    nameKey: "temples.component_name_5",
    groupKey: "temples.component_group_eastern",
    coordinates: "24.849201, 79.932763",
    latitude: 24.849201,
    longitude: 79.932763,
    image: BRAHMA_IMAGE,
  },
  {
    nameKey: "temples.component_name_6",
    groupKey: "temples.component_group_eastern",
    coordinates: "24.850889, 79.924139",
    latitude: 24.850889,
    longitude: 79.924139,
    image: HANUMAN_IMAGE,
  },
  {
    nameKey: "temples.component_name_7",
    groupKey: "temples.component_group_eastern",
    coordinates: "24.846138, 79.933401",
    latitude: 24.846138,
    longitude: 79.933401,
    image: GHANTAI_IMAGE,
  },
  {
    nameKey: "temples.component_name_8",
    groupKey: "temples.component_group_eastern",
    coordinates: "24.847056, 79.923806",
    latitude: 24.847056,
    longitude: 79.923806,
    image: JAVARI_IMAGE,
  },
  {
    nameKey: "temples.component_name_9",
    groupKey: "temples.component_group_eastern",
    coordinates: "24.848250, 79.924111",
    latitude: 24.84825,
    longitude: 79.924111,
    image: KHAJURAHO_OVERVIEW_IMAGE,
  },
  {
    nameKey: "temples.component_name_10",
    groupKey: "temples.component_group_eastern",
    coordinates: "24.851517, 79.934981",
    latitude: 24.851517,
    longitude: 79.934981,
    image: VAMANA_IMAGE,
  },
  {
    nameKey: "temples.component_name_11",
    groupKey: "temples.component_group_eastern",
    coordinates: "24.845111, 79.936607",
    latitude: 24.845111,
    longitude: 79.936607,
    image: ADINATH_IMAGE,
  },
  {
    nameKey: "temples.component_name_12",
    groupKey: "temples.component_group_eastern",
    coordinates: "24.850833, 79.926167",
    latitude: 24.850833,
    longitude: 79.926167,
    image: PARSHVANATHA_IMAGE,
  },
  {
    nameKey: "temples.component_name_13",
    groupKey: "temples.component_group_eastern",
    coordinates: "24.844635, 79.936310",
    latitude: 24.844635,
    longitude: 79.93631,
    image: SHANTINATHA_IMAGE,
  },
  {
    nameKey: "temples.component_name_14",
    groupKey: "temples.component_group_southern",
    coordinates: "24.838722, 79.933056",
    latitude: 24.838722,
    longitude: 79.933056,
    image: DULADEO_IMAGE,
  },
  {
    nameKey: "temples.component_name_15",
    groupKey: "temples.component_group_southern",
    coordinates: "24.825161, 79.931038",
    latitude: 24.825161,
    longitude: 79.931038,
    image: CHATURBHUJA_IMAGE,
  },
];

function getGoogleMapsLink(latitude: number, longitude: number) {
  return `https://www.google.com/maps?q=${latitude},${longitude}`;
}

export function Temples() {
  const { t } = useI18n();
  const { goToSection } = useSectionNav();

  return (
    <section id="temples" className="py-32 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="space-y-4">
            <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs">
              {t("temples.kicker")}
            </span>
            <h2 className="text-5xl md:text-7xl font-serif text-foreground leading-tight">
              {t("temples.title_eternal")} <br />
              <span className="italic font-light opacity-60">
                {t("temples.title_monuments")}
              </span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm text-lg font-light leading-relaxed">
            {t("temples.subtitle")}
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
                    alt={t(temple.nameKey)}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

                  <div className="absolute top-6 left-6 flex flex-col gap-2">
                    <Badge
                      variant="outline"
                      className="bg-white/10 backdrop-blur-md border-white/20 text-white text-[10px] uppercase tracking-widest font-bold py-1 px-3"
                    >
                      {t(temple.groupKey)} {t("temples.group_suffix")}
                    </Badge>
                  </div>

                  <div className="absolute bottom-10 left-10 right-10 transform transition-transform duration-500 group-hover:-translate-y-2">
                    <div className="text-white/60 text-[10px] uppercase tracking-[0.2em] font-bold mb-2">
                      {t(temple.typeKey)}
                    </div>
                    <h3 className="text-3xl font-serif text-white mb-4 leading-tight">
                      {t(temple.nameKey)}
                    </h3>
                    <div className="flex items-center justify-between pt-4 border-t border-white/20">
                      <span className="text-white/80 text-xs font-light">
                        {t(temple.statKey)}
                      </span>
                      <button
                        type="button"
                        onClick={() => goToSection("visitor-info")}
                        className="w-10 h-10 rounded-full glass flex items-center justify-center text-white group-hover:bg-primary group-hover:text-white transition-colors"
                        aria-label={t("hero.begin_journey")}
                      >
                        <ArrowUpRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 bg-card/80 backdrop-blur-sm border border-border/60 rounded-3xl p-8 md:p-10 shadow-xl">
          <div className="mb-8">
            <div>
              <h3 className="text-3xl font-serif mb-2">
                {t("temples.component_locations_title")}
              </h3>
              <p className="text-muted-foreground font-light max-w-3xl">
                {t("temples.component_locations_desc")}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {COMPONENT_LOCATIONS.map((component) => (
              <article
                key={`${component.nameKey}-${component.coordinates}`}
                className="rounded-2xl border border-border/50 p-4 bg-background/60"
              >
                <a
                  href={getGoogleMapsLink(component.latitude, component.longitude)}
                  target="_blank"
                  rel="noreferrer"
                  className="block mb-3 rounded-xl overflow-hidden aspect-[4/3]"
                >
                  <img
                    src={component.image}
                    alt={t(component.nameKey)}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                </a>
                <h4 className="font-serif text-lg mb-2">{t(component.nameKey)}</h4>
                <p className="text-xs uppercase tracking-widest font-bold text-primary/80 mb-2">
                  {t(component.groupKey)}
                </p>
                <a
                  href={getGoogleMapsLink(component.latitude, component.longitude)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-muted-foreground font-light hover:text-primary hover:underline"
                >
                  {t("temples.coordinates_label")}: {component.coordinates}
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

