import { useState, useEffect } from "react";
import { useI18n } from "@/lib/i18n";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const testimonials = [
  {
    id: 1,
    text: "Standing before Kandariya Mahadeva at sunrise was one of the most profound moments of my life. The scale and intricacy of the carvings is simply breathtaking — unlike anything I've seen in 40 countries of travel.",
    name: "Sophie M.",
    country: "🇫🇷",
    type: "Solo traveller",
    date: "Feb 2025",
    avatar: "SM",
    avatarBg: "bg-blue-100",
    avatarColor: "text-blue-700",
    rating: 5,
  },
  {
    id: 2,
    text: "The Light & Sound show in the evening was magical. We visited with the entire family and everyone — from kids to grandparents — was completely captivated by the narration and illumination.",
    name: "Rohan K.",
    country: "🇬🇧",
    type: "Family trip",
    date: "Nov 2024",
    avatar: "RK",
    avatarBg: "bg-amber-100",
    avatarColor: "text-amber-800",
    rating: 5,
  },
  {
    id: 3,
    text: "As an architecture student, Khajuraho completely changed how I think about space and sacred geometry. The guided tour booked through this site was incredibly well organised and deeply informative.",
    name: "Lena W.",
    country: "🇩🇪",
    type: "Cultural tour",
    date: "Jan 2025",
    avatar: "LW",
    avatarBg: "bg-emerald-100",
    avatarColor: "text-emerald-800",
    rating: 5,
  },
  {
    id: 4,
    text: "We came planning to stay one day and ended up staying three. The eastern group temples are less crowded and absolutely stunning. Khajuraho is one of India's most underrated treasures.",
    name: "Aiko N.",
    country: "🇯🇵",
    type: "Couple",
    date: "Dec 2024",
    avatar: "AN",
    avatarBg: "bg-rose-100",
    avatarColor: "text-rose-700",
    rating: 5,
  },
  {
    id: 5,
    text: "The photography here is extraordinary — golden hour light on the sandstone turns these temples into pure gold. I've returned three years in a row and always discover something new in the carvings.",
    name: "Marco P.",
    country: "🇮🇹",
    type: "Photographer",
    date: "Oct 2024",
    avatar: "MP",
    avatarBg: "bg-purple-100",
    avatarColor: "text-purple-700",
    rating: 5,
  },
  {
    id: 6,
    text: "Booking through this website was seamless. The guidebook they sent had the most detailed temple maps I've ever seen. Arrived fully prepared and made the most of every hour at the site.",
    name: "Tariq H.",
    country: "🇦🇪",
    type: "Heritage tour",
    date: "Mar 2025",
    avatar: "TH",
    avatarBg: "bg-teal-100",
    avatarColor: "text-teal-900",
    rating: 5,
  },
  {
    id: 7,
    text: "The intricate stone carvings depict stories from ancient Hindu mythology with such precision and artistry. Every surface tells a story. This is truly a masterpiece of engineering and art combined beautifully.",
    name: "David L.",
    country: "🇺🇸",
    type: "History enthusiast",
    date: "Jan 2025",
    avatar: "DL",
    avatarBg: "bg-indigo-100",
    avatarColor: "text-indigo-700",
    rating: 5,
  },
  {
    id: 8,
    text: "The temples showcase incredible craftsmanship from the 11th century. Walking through these hallways felt like stepping back in time. The preservation efforts are commendable and unforgettable.",
    name: "Emily R.",
    country: "🇨🇦",
    type: "Cultural explorer",
    date: "Dec 2024",
    avatar: "ER",
    avatarBg: "bg-pink-100",
    avatarColor: "text-pink-700",
    rating: 5,
  },
  {
    id: 9,
    text: "Visiting Khajuraho was a highlight of my India journey. The spiritual atmosphere combined with stunning architecture creates an experience that touches your soul deeply.",
    name: "Priya S.",
    country: "🇮🇳",
    type: "Spiritual seeker",
    date: "Nov 2024",
    avatar: "PS",
    avatarBg: "bg-yellow-100",
    avatarColor: "text-yellow-800",
    rating: 5,
  },
  {
    id: 10,
    text: "The local guides provided incredibly detailed information about temple architecture and history. Their passion for preserving this heritage is inspiring and made the visit richer.",
    name: "Hassan M.",
    country: "🇪🇬",
    type: "Education tour",
    date: "Oct 2024",
    avatar: "HM",
    avatarBg: "bg-cyan-100",
    avatarColor: "text-cyan-700",
    rating: 5,
  },
  {
    id: 11,
    text: "The symmetry and precision of these ancient structures is mind-blowing. As an architect, I was amazed at how they achieved such perfection without modern tools.",
    name: "Christina B.",
    country: "🇸🇪",
    type: "Architect",
    date: "Sep 2024",
    avatar: "CB",
    avatarBg: "bg-red-100",
    avatarColor: "text-red-700",
    rating: 5,
  },
  {
    id: 12,
    text: "The energy of this sacred place is palpable. You can feel the centuries of devotion in every stone. It was a transformative experience that changed my perspective on art, history, and spirituality.",
    name: "James W.",
    country: "🇦🇺",
    type: "Spiritual tourist",
    date: "Aug 2024",
    avatar: "JW",
    avatarBg: "bg-orange-100",
    avatarColor: "text-orange-700",
    rating: 5,
  },
  {
    id: 13,
    text: "The western group of temples is particularly spectacular. The Kandariya Mahadeva temple is an absolute marvel. I spent hours just studying the intricate details of the stone work.",
    name: "Maria G.",
    country: "🇪🇸",
    type: "Art lover",
    date: "Jul 2024",
    avatar: "MG",
    avatarBg: "bg-violet-100",
    avatarColor: "text-violet-700",
    rating: 5,
  },
  {
    id: 14,
    text: "The contrast between the three temple groups is fascinating. Each group has its own unique characteristics and artistic style. Highly recommend visiting all three groups to get the complete experience.",
    name: "Robert P.",
    country: "🇬🇧",
    type: "Heritage researcher",
    date: "Jun 2024",
    avatar: "RP",
    avatarBg: "bg-green-100",
    avatarColor: "text-green-700",
    rating: 5,
  },
  {
    id: 15,
    text: "I visited Khajuraho three times and each visit revealed new details I had missed before. The complexity and depth of the artistic work is truly remarkable and endless in discovery.",
    name: "Yuki M.",
    country: "🇯🇵",
    type: "Repeat visitor",
    date: "May 2024",
    avatar: "YM",
    avatarBg: "bg-lime-100",
    avatarColor: "text-lime-700",
    rating: 5,
  },
  {
    id: 16,
    text: "The ancient builders demonstrated remarkable knowledge of geometry, astronomy, and sacred proportions. Every measurement seems deliberate and purposeful. It's a triumph of human achievement.",
    name: "Dr. Anna F.",
    country: "🇮🇹",
    type: "Archaeologist",
    date: "Apr 2024",
    avatar: "AF",
    avatarBg: "bg-sky-100",
    avatarColor: "text-sky-700",
    rating: 5,
  },
  {
    id: 17,
    text: "The detailed erotic carvings are often discussed, but the real beauty lies in the overall sculptural excellence and narrative storytelling across all the temple walls. A complete artistic vision.",
    name: "Lisa K.",
    country: "🇩🇪",
    type: "Art historian",
    date: "Mar 2024",
    avatar: "LK",
    avatarBg: "bg-fuchsia-100",
    avatarColor: "text-fuchsia-700",
    rating: 5,
  },
  {
    id: 19,
    text: "The intricate details of the stone work are simply extraordinary. Every corner reveals something new and beautiful. The craftsmanship is unparalleled in modern times.",
    name: "Stefan K.",
    country: "🇩🇪",
    type: "Art collector",
    date: "Jan 2024",
    avatar: "SK",
    avatarBg: "bg-blue-50",
    avatarColor: "text-blue-600",
    rating: 5,
  },
  {
    id: 20,
    text: "The guided tour was exceptional. The guide's knowledge about the history and symbolism made the experience truly enriching and memorable for the whole family.",
    name: "Fatima A.",
    country: "🇸🇦",
    type: "Family visit",
    date: "Dec 2023",
    avatar: "FA",
    avatarBg: "bg-rose-50",
    avatarColor: "text-rose-600",
    rating: 5,
  },
  {
    id: 21,
    text: "Walking through these ancient halls, I felt a deep connection to centuries of history. The spiritual energy and artistic brilliance are truly palpable.",
    name: "Kenji T.",
    country: "🇯🇵",
    type: "Spiritual traveler",
    date: "Oct 2023",
    avatar: "KT",
    avatarBg: "bg-purple-50",
    avatarColor: "text-purple-600",
    rating: 5,
  },
  {
    id: 22,
    text: "The preservation work being done here is commendable. Seeing ancient structures maintained so beautifully gives hope for our cultural heritage.",
    name: "Ana S.",
    country: "🇪🇸",
    type: "Heritage advocate",
    date: "Sep 2023",
    avatar: "AS",
    avatarBg: "bg-amber-50",
    avatarColor: "text-amber-600",
    rating: 5,
  },
  {
    id: 23,
    text: "An absolute must-visit destination for anyone interested in history, art, or spirituality. The entire experience was transformative and deeply fulfilling.",
    name: "Michael J.",
    country: "🇦🇺",
    type: "Cultural enthusiast",
    date: "Aug 2023",
    avatar: "MJ",
    avatarBg: "bg-cyan-50",
    avatarColor: "text-cyan-600",
    rating: 5,
  },
  {
    id: 24,
    text: "The sculptures and carvings showcase incredible talent and dedication. Khajuraho is a living museum of medieval Indian artistry at its finest.",
    name: "Guillaume D.",
    country: "🇫🇷",
    type: "Art enthusiast",
    date: "Jul 2023",
    avatar: "GD",
    avatarBg: "bg-lime-50",
    avatarColor: "text-lime-600",
    rating: 5,
  },
];

export function Testimonials() {
  const { t } = useI18n();
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [activeSlide, setActiveSlide] = useState(0);
  const totalItems = testimonials.length;

  useEffect(() => {
    if (!carouselApi) return;

    const onSelect = () => {
      const scrollSnap = carouselApi.selectedScrollSnap();
      setActiveSlide(scrollSnap);
    };

    onSelect();
    carouselApi.on("select", onSelect);

    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi]);

  // Auto-advance carousel every 6 seconds
  useEffect(() => {
    if (!carouselApi) return;

    const timer = setInterval(() => {
      const nextSlide = (activeSlide + 1) % totalItems;
      carouselApi.scrollTo(nextSlide);
    }, 6000);

    return () => clearInterval(timer);
  }, [carouselApi, activeSlide, totalItems]);


  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Visitor Experiences
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-3">
          Voices from <em className="italic text-primary">Around the World</em>
        </h2>

        <p className="text-lg text-muted-foreground max-w-2xl mb-12 font-light">
          Real stories from travellers who walked these ancient stones and felt
          the timeless magic of Khajuraho.
        </p>

        {/* Rating Summary */}
        <div className="bg-white border border-border rounded-2xl p-6 md:p-8 mb-12 flex flex-col md:flex-row gap-8 flex-wrap">
          <div>
            <div className="text-6xl font-serif font-semibold text-primary">
              4.9
            </div>
          </div>
          <div>
            <div className="flex gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-3 h-3 fill-yellow-500"
                  viewBox="0 0 24 24"
                >
                  <polygon points="12 2 15.09 10.26 24 10.35 17.77 16.01 20.16 24.02 12 18.35 3.84 24.02 6.23 16.01 0 10.35 8.91 10.26" />
                </svg>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Based on 2,847 verified reviews
            </p>
          </div>
          <div className="flex-1 min-w-xs">
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-10">5★</span>
                <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-500"
                    style={{ width: "88%" }}
                  ></div>
                </div>
                <span>88%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-10">4★</span>
                <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-500"
                    style={{ width: "9%" }}
                  ></div>
                </div>
                <span>9%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-10">3★</span>
                <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-500"
                    style={{ width: "3%" }}
                  ></div>
                </div>
                <span>3%</span>
              </div>
            </div>
          </div>
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">Travellers from</p>
            <p className="text-2xl font-serif font-semibold text-foreground">
              68 countries
            </p>
          </div>
        </div>

        {/* Testimonial Cards Carousel - 5 Card Layout with Overlap */}
        <div className="mb-8 overflow-visible px-8 md:px-12 lg:px-16 py-8">
          <Carousel
            setApi={setCarouselApi}
            opts={{
              align: "center",
              loop: true,
              startIndex: 0,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2">
              {testimonials.map((card, index) => {
                const distance = Math.abs(index - activeSlide);
                const isInFocus = distance <= 1 || (activeSlide === 0 && index === totalItems - 1) || (activeSlide === totalItems - 1 && index === 0);
                const isSideCard = distance === 2 || (activeSlide === 0 && index === totalItems - 2) || (activeSlide === totalItems - 1 && index === 1);

                return (
                <CarouselItem
                  key={card.id}
                  className="pl-2 basis-full md:basis-1/5 lg:basis-1/5"
                >
                  <div className={`transition-all duration-500 ${
                    isInFocus
                      ? "scale-100 opacity-100 z-20"
                      : isSideCard
                      ? "scale-75 opacity-50 z-10 -mx-16"
                      : "scale-60 opacity-30 z-0"
                  }`}>
                    <div
                      className={`bg-white border rounded-2xl p-7 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group relative h-full flex flex-col ${
                        isInFocus ? "border-border shadow-2xl" : "border-border/30 shadow-sm"
                      }`}
                    >
                      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl"></div>

                      <div className="text-5xl font-serif text-pink-200 leading-none mb-2">
                        "
                      </div>

                      <div className="flex gap-0.5 mb-3">
                        {[...Array(card.rating)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-3.5 h-3.5 fill-yellow-500"
                            viewBox="0 0 24 24"
                          >
                            <polygon points="12 2 15.09 10.26 24 10.35 17.77 16.01 20.16 24.02 12 18.35 3.84 24.02 6.23 16.01 0 10.35 8.91 10.26" />
                          </svg>
                        ))}
                      </div>

                      <p className="text-sm text-gray-700 leading-relaxed mb-4 flex-grow">
                        {card.text}
                      </p>

                      <div className="inline-block bg-green-50 text-green-700 text-xs font-semibold px-2 py-1 rounded-full mb-4">
                        ✓ Verified visitor
                      </div>

                      <hr className="border-border mb-4" />

                      <div className="flex items-center gap-3 mt-auto">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 ${card.avatarBg} ${card.avatarColor}`}
                        >
                          {card.avatar}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-foreground truncate">
                            {card.name}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {card.type} · {card.date}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Navigation Dots - 5 pointer dots with infinite rotation */}
        <div className="flex items-center justify-center gap-4">
          {/* Dot 0: 3 cards from left (-3 offset, with wrapping) */}
          <button
            key="dot-0"
            type="button"
            aria-label="Previous 3 cards"
            onClick={() => {
              const newSlide = (activeSlide - 3 + totalItems * 10) % totalItems;
              carouselApi?.scrollTo(newSlide);
            }}
            className="rounded-full transition-all duration-300 cursor-pointer w-2 h-2 bg-primary/30 hover:bg-primary/60"
          />
          
          {/* Dot 1: 1 card from left (-1 offset, with wrapping) */}
          <button
            key="dot-1"
            type="button"
            aria-label="Previous 1 card"
            onClick={() => {
              const newSlide = (activeSlide - 1 + totalItems) % totalItems;
              carouselApi?.scrollTo(newSlide);
            }}
            className="rounded-full transition-all duration-300 cursor-pointer w-2 h-2 bg-primary/30 hover:bg-primary/60"
          />
          
          {/* Dot 2: Center pointer (0 offset) - ALWAYS MIDDLE */}
          <button
            key="dot-2"
            type="button"
            aria-label="Center"
            onClick={() => carouselApi?.scrollTo(activeSlide)}
            className="rounded-full transition-all duration-300 cursor-pointer w-3 h-3 bg-primary"
          />
          
          {/* Dot 3: 1 card from right (+1 offset, with wrapping) */}
          <button
            key="dot-3"
            type="button"
            aria-label="Next 1 card"
            onClick={() => {
              const newSlide = (activeSlide + 1) % totalItems;
              carouselApi?.scrollTo(newSlide);
            }}
            className="rounded-full transition-all duration-300 cursor-pointer w-2 h-2 bg-primary/30 hover:bg-primary/60"
          />
          
          {/* Dot 4: 3 cards from right (+3 offset, with wrapping) */}
          <button
            key="dot-4"
            type="button"
            aria-label="Next 3 cards"
            onClick={() => {
              const newSlide = (activeSlide + 3) % totalItems;
              carouselApi?.scrollTo(newSlide);
            }}
            className="rounded-full transition-all duration-300 cursor-pointer w-2 h-2 bg-primary/30 hover:bg-primary/60"
          />
        </div>
      </div>
    </section>
  );
}
