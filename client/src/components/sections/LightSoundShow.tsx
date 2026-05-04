import { useState, useEffect } from "react";
import { useI18n } from "@/lib/i18n";

interface CountdownTime {
  hours: string;
  minutes: string;
  seconds: string;
}

export function LightSoundShow() {
  const { t } = useI18n();
  const [countdown, setCountdown] = useState<CountdownTime>({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      // Simulating IST timezone for demo
      const istTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
      
      const showTimes = [[18, 30], [19, 30]]; // 6:30 PM and 7:30 PM
      let nextShow: Date | null = null;

      for (const [hours, minutes] of showTimes) {
        const showTime = new Date(istTime);
        showTime.setHours(hours, minutes, 0, 0);
        if (showTime > istTime) {
          nextShow = showTime;
          break;
        }
      }

      if (!nextShow) {
        nextShow = new Date(istTime);
        nextShow.setDate(nextShow.getDate() + 1);
        nextShow.setHours(18, 30, 0, 0);
      }

      const diff = Math.max(0, Math.floor((nextShow.getTime() - istTime.getTime()) / 1000));
      const h = Math.floor(diff / 3600);
      const m = Math.floor((diff % 3600) / 60);
      const s = diff % 60;

      setCountdown({
        hours: String(h).padStart(2, "0"),
        minutes: String(m).padStart(2, "0"),
        seconds: String(s).padStart(2, "0"),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-20 bg-gray-900 overflow-hidden">
      {/* Starfield Background */}
      <div className="absolute inset-0 opacity-40">
        {[...Array(80)].map((_, i) => {
          const size = Math.random() * 2 + 1;
          const top = Math.random() * 100;
          const left = Math.random() * 100;
          const duration = (2 + Math.random() * 4).toFixed(1);
          const delay = -(Math.random() * 4).toFixed(1);
          const op1 = (0.1 + Math.random() * 0.3).toFixed(2);
          const op2 = (0.5 + Math.random() * 0.5).toFixed(2);

          return (
            <div
              key={i}
              className="absolute rounded-full bg-white animate-pulse"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                top: `${top}%`,
                left: `${left}%`,
                animation: `twinkle ${duration}s ease-in-out infinite`,
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}
      </div>

      {/* Glow Arc */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-gradient-radial from-orange-600/20 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Top Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-12 items-start">
          <div>
            {/* Live Indicator */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
              <span className="text-xs font-semibold uppercase tracking-widest text-yellow-500">
                Every evening · Year round
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="text-5xl md:text-6xl font-serif text-white mb-4 leading-tight">
              The Stones Come
              <br />
              <em className="italic text-yellow-500">Alive After Dark</em>
            </h2>

            {/* Description */}
            <p className="text-lg text-gray-300 leading-relaxed max-w-lg">
              Watch a thousand years of history unfold as the Kandariya Mahadeva
              temple is bathed in coloured light, and its story narrated across
              time. A 50-minute experience unlike any other.
            </p>
          </div>

          {/* Countdown */}
          <div className="bg-white/10 border border-yellow-600/30 rounded-2xl p-6 text-center backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-yellow-500 mb-4">
              Next show starts in
            </p>
            <div className="flex justify-center gap-2 mb-4">
              <div className="bg-black/40 rounded-lg px-3 py-2 text-center">
                <p className="text-3xl font-serif text-white font-semibold leading-none">
                  {countdown.hours}
                </p>
                <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">hrs</p>
              </div>
              <div className="flex items-center text-gray-600 text-2xl">:</div>
              <div className="bg-black/40 rounded-lg px-3 py-2 text-center">
                <p className="text-3xl font-serif text-white font-semibold leading-none">
                  {countdown.minutes}
                </p>
                <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">min</p>
              </div>
              <div className="flex items-center text-gray-600 text-2xl">:</div>
              <div className="bg-black/40 rounded-lg px-3 py-2 text-center">
                <p className="text-3xl font-serif text-white font-semibold leading-none">
                  {countdown.seconds}
                </p>
                <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">sec</p>
              </div>
            </div>
            <p className="text-xs text-gray-400">Hindi 6:30 PM · English 7:30 PM</p>
          </div>
        </div>

        {/* Show Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/10 border border-yellow-600/30 rounded-lg p-5 hover:bg-orange-600/15 transition-all backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-yellow-500 mb-2">
              🎭 Hindi Show
            </p>
            <p className="text-3xl font-serif text-white font-semibold leading-none mb-2">
              6:30 PM
            </p>
            <p className="text-sm text-gray-400">50 minutes · Daily</p>
          </div>

          <div className="bg-white/10 border border-yellow-600/30 rounded-lg p-5 hover:bg-orange-600/15 transition-all backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-yellow-500 mb-2">
              🎭 English Show
            </p>
            <p className="text-3xl font-serif text-white font-semibold leading-none mb-2">
              7:30 PM
            </p>
            <p className="text-sm text-gray-400">50 minutes · Daily</p>
          </div>

          <div className="bg-white/10 border border-yellow-600/30 rounded-lg p-5 hover:bg-orange-600/15 transition-all backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-yellow-500 mb-2">
              🎟 Entry Fee
            </p>
            <p className="text-3xl font-serif text-white font-semibold leading-none mb-2">
              ₹250
            </p>
            <p className="text-sm text-gray-400">₹250 (Indians) · ₹600 (Foreigners)</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 items-start mb-4">
          <a
            href="#"
            className="bg-primary hover:bg-orange-700 text-white px-8 py-3 rounded-full font-semibold transition-colors"
          >
            Book Show Tickets →
          </a>
          <button className="bg-transparent hover:bg-yellow-600/20 text-yellow-500 border border-yellow-600/50 px-8 py-3 rounded-full font-semibold transition-all">
            View show details
          </button>
        </div>

        <p className="text-sm text-gray-400">
          Tickets also available at the gate. Arrive 15 minutes early for the
          best seating. Open-air venue — carry a light jacket in winter.
        </p>
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .bg-gradient-radial {
          background: radial-gradient(ellipse at center bottom, rgba(200, 96, 58, 0.18) 0%, transparent 70%);
        }
      `}</style>
    </section>
  );
}