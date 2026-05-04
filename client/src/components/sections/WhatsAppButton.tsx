import { useState, useEffect } from "react";

export function WhatsAppButton() {
  const [showBubble, setShowBubble] = useState(true);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    // Check if bubble was closed in this session
    if (sessionStorage.getItem("waBubbleClosed")) {
      setShowBubble(false);
    }

    // Auto-hide bubble after 8 seconds
    const timer = setTimeout(() => {
      setShowBubble(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  const handleCloseBubble = () => {
    setShowBubble(false);
    sessionStorage.setItem("waBubbleClosed", "1");
  };

  const whatsappNumber = "919876543210"; // Replace with your WhatsApp Business number
  const whatsappMessage =
    "Hi, I'm interested in visiting Khajuraho and would like more information.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <div className="fixed bottom-7 right-7 z-50 flex flex-col items-end gap-3">
      {/* Message Bubble */}
      {showBubble && (
        <div className="bg-white rounded-3xl rounded-br-md shadow-xl p-4 max-w-xs animate-in fade-in slide-in-from-bottom-4 duration-300">
          <button
            onClick={handleCloseBubble}
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gray-500 text-white text-xs flex items-center justify-center hover:bg-gray-600 transition-colors"
            aria-label="Close"
          >
            ✕
          </button>
          <p className="text-sm text-foreground leading-relaxed">
            <strong className="text-primary">Have questions about your visit?</strong>
            <br />
            Chat with us in English, Hindi & more — we usually reply in minutes! 🙏
          </p>
        </div>
      )}

      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group"
        aria-label="Chat with us on WhatsApp"
      >
        {/* Pulse animations */}
        <div className="absolute inset-0 rounded-full border-2 border-green-500 animate-pulse opacity-75"></div>
        <div className="absolute inset-0 rounded-full border-2 border-green-500 animate-pulse opacity-50" style={{ animationDelay: "0.8s" }}></div>

        {/* Button */}
        <button
          className="relative w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-2xl transition-all duration-200 flex items-center justify-center group-hover:scale-110"
        >
          {/* WhatsApp SVG Icon */}
          <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8"
          >
            <circle cx="24" cy="24" r="24" fill="#25D366" />
            <path
              d="M34.5 13.5A14.4 14.4 0 0024 9C16.27 9 10 15.27 10 23a13.9 13.9 0 001.9 7L10 38l8.3-2.17A14 14 0 0024 37c7.73 0 14-6.27 14-14a13.9 13.9 0 00-3.5-9.5z"
              fill="#fff"
            />
            <path
              d="M32 27.9c-.44-.22-2.6-1.28-3-1.43-.4-.15-.7-.22-1 .22-.3.44-1.15 1.43-1.4 1.72-.26.3-.52.33-.97.11a12.2 12.2 0 01-3.56-2.2 13.4 13.4 0 01-2.46-3.07c-.26-.44-.03-.68.19-.9.2-.2.44-.52.66-.78.22-.26.3-.44.44-.74.15-.3.07-.56-.04-.78-.1-.22-1-2.37-1.36-3.25-.36-.85-.73-.74-1-.74h-.85a1.64 1.64 0 00-1.18.55 5 5 0 00-1.55 3.7 8.67 8.67 0 001.81 4.6c.22.3 3.12 4.76 7.55 6.67 1.06.46 1.89.74 2.53.94 1.07.34 2.04.3 2.8.18.86-.14 2.6-1.07 2.97-2.1.37-1.04.37-1.93.26-2.12-.1-.2-.4-.3-.84-.52z"
              fill="#25D366"
            />
          </svg>

          {/* Notification Badge */}
          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-600 border-2 border-white flex items-center justify-center">
            <span className="text-xs font-bold text-white">1</span>
          </div>
        </button>
      </a>

      <style>{`
        @keyframes slideInFromBottom {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-in {
          animation: slideInFromBottom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>
    </div>
  );
}
