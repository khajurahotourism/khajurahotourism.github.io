import { useI18n } from "@/lib/i18n";

export function TempleGroupsHighlights() {
  const { t } = useI18n();

  return (
    <section className="py-14 bg-secondary/30 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <h3 className="text-4xl md:text-5xl font-serif text-foreground mb-4">
          {t("about.groups_title")}
        </h3>
        <p className="text-muted-foreground text-lg font-light max-w-5xl mb-10">
          {t("about.groups_intro")}
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <article className="rounded-3xl border border-border/40 bg-card/90 p-8 shadow-xl">
            <h4 className="text-4xl font-serif mb-4">{t("about.group_western_title")}</h4>
            <p className="text-muted-foreground font-light leading-relaxed mb-6">
              {t("about.group_western_desc")}
            </p>
            <p className="text-primary font-semibold uppercase tracking-[0.12em]">
              {t("about.group_western_key")}
            </p>
          </article>

          <article className="rounded-3xl border border-border/40 bg-card/90 p-8 shadow-xl">
            <h4 className="text-4xl font-serif mb-4">{t("about.group_eastern_title")}</h4>
            <p className="text-muted-foreground font-light leading-relaxed mb-6">
              {t("about.group_eastern_desc")}
            </p>
            <p className="text-primary font-semibold uppercase tracking-[0.12em]">
              {t("about.group_eastern_key")}
            </p>
          </article>

          <article className="rounded-3xl border border-border/40 bg-card/90 p-8 shadow-xl">
            <h4 className="text-4xl font-serif mb-4">{t("about.group_southern_title")}</h4>
            <p className="text-muted-foreground font-light leading-relaxed mb-6">
              {t("about.group_southern_desc")}
            </p>
            <p className="text-primary font-semibold uppercase tracking-[0.12em]">
              {t("about.group_southern_key")}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
