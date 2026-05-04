import { Link } from "wouter";
import { useI18n } from "@/lib/i18n";
import { useSectionNav } from "@/lib/section-nav";

export function Footer() {
  const { t } = useI18n();
  const { goToSection } = useSectionNav();
  const supportEmail = "khajurahocityoftemple@gmail.com, khajurahotourisminfo@gmail.com";
  const emailLink = `mailto:${supportEmail}?cc=${supportEmail}`;

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12 border-b border-background/10 pb-12">
          <div>
            <h3 className="font-serif text-3xl font-bold text-primary mb-6 tracking-wider">
              {t("brand.name")}
            </h3>
            <p className="text-background/70 font-light leading-relaxed max-w-sm">
              {t("footer.tagline")}
            </p>
          </div>

          <div>
            <h4 className="font-serif text-xl mb-6">{t("footer.quick_links")}</h4>
            <ul className="space-y-3">
              <li>
                <button
                  type="button"
                  onClick={() => goToSection("heritage")}
                  className="bg-transparent border-0 p-0 text-background/70 hover:text-primary transition-colors"
                >
                  {t("footer.history_legacy")}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => goToSection("temples")}
                  className="bg-transparent border-0 p-0 text-background/70 hover:text-primary transition-colors"
                >
                  {t("footer.temple_groups")}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => goToSection("visitor-info")}
                  className="bg-transparent border-0 p-0 text-background/70 hover:text-primary transition-colors"
                >
                  {t("footer.visitor_information")}
                </button>
              </li>
              <li>
                <Link href="/shop">
                  <a className="text-background/70 hover:text-primary transition-colors">
                    {t("footer.gallery")}
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-xl mb-6">{t("footer.contact_support")}</h4>
            <ul className="space-y-3 text-background/70 font-light">
              <li>{t("footer.mptourism")}</li>
              <li>{t("footer.khajuraho_chhatarpur")}</li>
              <li>{t("footer.madhya_pradesh_india")}</li>
              <li className="pt-4">
                <a
                  href={emailLink}
                  className="text-primary hover:underline"
                >
                  {supportEmail}
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/khajuraho_city_of_temple/?hl=en"
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:underline"
                >
                  @khajuraho_city_of_temple
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-background/50 font-light">
          <p>{t("footer.copyright", { year: new Date().getFullYear() })}</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy">
              <a className="hover:text-primary transition-colors">
                {t("footer.privacy_policy")}
              </a>
            </Link>
            <Link href="/terms">
              <a className="hover:text-primary transition-colors">
                {t("footer.terms_service")}
              </a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
