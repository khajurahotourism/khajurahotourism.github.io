import { translations } from "../client/src/lib/translations.ts";

const langs = Object.keys(translations);
const en = translations.en as Record<string, string>;

for (const lang of langs) {
  if (lang === "en") continue;
  const dict = translations[lang as keyof typeof translations] as Record<string, string>;
  let missing = 0;
  let sameAsEnglish = 0;
  let total = 0;

  for (const key of Object.keys(en)) {
    total += 1;
    if (!(key in dict)) {
      missing += 1;
      continue;
    }
    if (dict[key] === en[key]) {
      sameAsEnglish += 1;
    }
  }

  console.log(`${lang}\tmissing=${missing}\tsameAsEnglish=${sameAsEnglish}\ttotal=${total}`);
}

console.log("hero.hi", (translations as any).hi["hero.title_stone"], (translations as any).hi["hero.title_echoes"]);
console.log("about.groups.hi", (translations as any).hi["about.groups_title"]);
console.log("visitor.things.hi", (translations as any).hi["visitor.things_to_do_title"]);
