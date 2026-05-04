import { useState } from "react";
import { useI18n } from "@/lib/i18n";

const monthsData = [
  {
    short: "Jan",
    full: "January",
    type: "ideal",
    temp: "8–23°C",
    crowd: 85,
    rain: 2,
    desc: "Cool, clear skies — peak season. Perfect for temple exploration and the Dance Festival.",
    festival: "Khajuraho Dance Festival",
    tips: ["Carry light layers for evenings", "Book accommodation 2–3 months ahead", "Photography golden hour: 7–9 AM"],
  },
  {
    short: "Feb",
    full: "February",
    type: "ideal",
    temp: "11–26°C",
    crowd: 90,
    rain: 3,
    desc: "Perfect weather. The famous Dance Festival peaks this month — book well in advance.",
    festival: "Dance Festival (peak)",
    tips: ["Best month for Dance Festival", "Book tickets for evening shows early", "Ideal for all-day sightseeing"],
  },
  {
    short: "Mar",
    full: "March",
    type: "ideal",
    temp: "16–32°C",
    crowd: 70,
    rain: 4,
    desc: "Warm but still pleasant. Great time before heat builds. Fewer crowds than Jan–Feb.",
    festival: null,
    tips: ["Start early to beat afternoon heat", "Good value accommodation", "Excellent photography light"],
  },
  {
    short: "Apr",
    full: "April",
    type: "ok",
    temp: "22–38°C",
    crowd: 45,
    rain: 6,
    desc: "Getting warm. Early morning visits strongly recommended. Afternoon heat can be intense.",
    festival: null,
    tips: ["Visit temples 6–11 AM only", "Carry plenty of water", "Great hotel deals available"],
  },
  {
    short: "May",
    full: "May",
    type: "ok",
    temp: "27–43°C",
    crowd: 25,
    rain: 8,
    desc: "Hot and dry. Only for travellers who don't mind intense heat. Sunrise visits only.",
    festival: null,
    tips: ["Visit at sunrise only (6–9 AM)", "Stay hydrated — 3L+ per day", "Very budget-friendly prices"],
  },
  {
    short: "Jun",
    full: "June",
    type: "avoid",
    temp: "27–40°C",
    crowd: 15,
    rain: 55,
    desc: "Monsoon begins. Heavy rain and humidity. Many outdoor areas become muddy.",
    festival: null,
    tips: ["Not recommended for tourists", "Road conditions can deteriorate", "Rescheduling advised"],
  },
  {
    short: "Jul",
    full: "July",
    type: "avoid",
    temp: "24–33°C",
    crowd: 10,
    rain: 90,
    desc: "Peak monsoon. Significant rainfall and road disruptions. Temple access limited.",
    festival: null,
    tips: ["Peak monsoon — not recommended", "Temple surrounds can be waterlogged", "Lowest prices of the year"],
  },
  {
    short: "Aug",
    full: "August",
    type: "avoid",
    temp: "24–32°C",
    crowd: 12,
    rain: 80,
    desc: "Still monsoon. Lush greenery but very wet. Travel is difficult and sites can be slippery.",
    festival: null,
    tips: ["Monsoon still ongoing", "Slippery stone surfaces — caution", "Some closures possible"],
  },
  {
    short: "Sep",
    full: "September",
    type: "ok",
    temp: "23–31°C",
    crowd: 20,
    rain: 40,
    desc: "Monsoon receding. Lush green surroundings but some rain expected. Good off-season value.",
    festival: null,
    tips: ["Post-monsoon freshness", "Lower prices and fewer crowds", "Some rain still possible"],
  },
  {
    short: "Oct",
    full: "October",
    type: "ideal",
    temp: "18–29°C",
    crowd: 55,
    rain: 8,
    desc: "Excellent weather returns. Shoulder season — great conditions with fewer tourists.",
    festival: null,
    tips: ["Ideal shoulder season pick", "Comfortable all-day temperatures", "Good availability and pricing"],
  },
  {
    short: "Nov",
    full: "November",
    type: "ideal",
    temp: "12–26°C",
    crowd: 70,
    rain: 2,
    desc: "One of the best months. Cool, comfortable, increasingly popular with international visitors.",
    festival: null,
    tips: ["Cool evenings — carry a jacket", "Excellent for photography", "High season beginning — book ahead"],
  },
  {
    short: "Dec",
    full: "December",
    type: "ideal",
    temp: "8–22°C",
    crowd: 80,
    rain: 1,
    desc: "Peak season begins. Coolest month, crystal-clear air and beautiful golden light.",
    festival: "Pre-festival season",
    tips: ["Warmest layers needed at night", "Best light for photography", "Book everything in advance"],
  },
];

const typeConfig = {
  ideal: {
    badge: "✦ Ideal to visit",
    badgeBg: "bg-green-50",
    badgeText: "text-green-700",
    dotBg: "bg-green-600",
    dotColor: "#639922",
  },
  ok: {
    badge: "◆ Acceptable",
    badgeBg: "bg-amber-50",
    badgeText: "text-amber-700",
    dotBg: "bg-amber-600",
    dotColor: "#BA7517",
  },
  avoid: {
    badge: "✕ Not Favorable",
    badgeBg: "bg-red-50",
    badgeText: "text-red-700",
    dotBg: "bg-red-600",
    dotColor: "#E24B4A",
  },
};

export function SeasonalCalendar() {
  const { t } = useI18n();
  const [activeMonth, setActiveMonth] = useState(new Date().getMonth());

  const currentMonth = monthsData[activeMonth];
  const config = typeConfig[currentMonth.type as keyof typeof typeConfig];

  const crowdColor = (v: number) => (v > 70 ? "#639922" : v > 35 ? "#BA7517" : "#E24B4A");
  const rainColor = (v: number) => (v > 50 ? "#185FA5" : v > 15 ? "#378ADD" : "#9FD0F5");

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Plan Your Visit
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-3">
          Best time to visit <em className="italic text-primary">Khajuraho</em>
        </h2>

        <p className="text-lg text-muted-foreground max-w-2xl mb-12 font-light">
          Click any month to discover weather, crowd levels, rainfall, and what
          to expect — so you can plan the perfect trip.
        </p>

        {/* Calendar Widget */}
        <div className="bg-white border border-border rounded-3xl overflow-hidden">
          {/* Month Buttons */}
          <div className="grid grid-cols-6 md:grid-cols-12 border-b border-border">
            {monthsData.map((month, idx) => (
              <button
                key={month.short}
                onClick={() => setActiveMonth(idx)}
                className={`py-3.5 px-2 text-xs font-semibold uppercase tracking-wider text-center border-r border-border hover:bg-gray-50 transition-all relative group ${
                  idx === activeMonth ? "bg-primary text-white" : ""
                } ${month.type === "ideal" ? "text-green-700" : month.type === "ok" ? "text-amber-700" : "text-red-700"}`}
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full mx-auto mb-1 ${
                    idx === activeMonth ? "bg-white/70" : ""
                  }`}
                  style={{
                    backgroundColor:
                      idx === activeMonth ? undefined : config.dotColor,
                  }}
                ></div>
                {month.short}
              </button>
            ))}
          </div>

          {/* Month Details */}
          <div className="p-8 grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-3xl font-serif font-semibold text-foreground mb-3">
                {currentMonth.full}
              </h3>
              <div
                className={`inline-block px-3 py-1.5 rounded-full text-sm font-semibold mb-4 ${config.badgeBg} ${config.badgeText}`}
              >
                {config.badge}
              </div>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                {currentMonth.desc}
              </p>
              {currentMonth.festival && (
                <div className="bg-orange-50 border-l-4 border-primary px-3 py-2 text-sm text-primary font-medium rounded-sm">
                  🎭 <strong>Festival alert:</strong> {currentMonth.festival}
                </div>
              )}
            </div>

            {/* Metrics */}
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Temperature range
                </p>
                <p className="text-2xl font-serif font-semibold text-foreground">
                  {currentMonth.temp}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Crowd level
                </p>
                <p className="text-2xl font-serif font-semibold text-foreground mb-2">
                  {currentMonth.crowd}%
                </p>
                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${currentMonth.crowd}%`,
                      backgroundColor: crowdColor(currentMonth.crowd),
                    }}
                  ></div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Average rainfall
                </p>
                <p className="text-2xl font-serif font-semibold text-foreground mb-2">
                  {currentMonth.rain} mm
                </p>
                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${Math.min(currentMonth.rain, 100)}%`,
                      backgroundColor: rainColor(currentMonth.rain),
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="md:col-span-2 flex flex-col gap-2">
              {currentMonth.tips.map((tip, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 bg-gray-50 rounded-lg p-3 text-sm"
                >
                  <span className="text-primary mt-0.5">→</span>
                  <span className="text-muted-foreground">{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="bg-gray-50 border-t border-border p-6 flex flex-wrap gap-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2.5 h-2.5 rounded-full bg-green-600"></div>
              <span>Ideal to visit (Oct – Feb)</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-600"></div>
              <span>Acceptable (Mar – May, Sep)</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2.5 h-2.5 rounded-full bg-red-600"></div>
              <span>Avoid — monsoon (Jun – Aug)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
