"use client";

import { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import { useCalEmbed } from "@/lib/useCalEmbed";

export default function FloatingFAB() {
  const [isVisible, setIsVisible] = useState(false);
  const { openCal } = useCalEmbed();

  useEffect(() => {
    const handleScroll = () => {
      // Show FAB after scrolling down 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      onClick={openCal}
      className={`fixed z-40 lg:hidden bg-gradient-to-r from-yellow-400 to-yellow-500 text-black p-4 rounded-full shadow-2xl transition-all duration-300 active:scale-90 hover:shadow-[0_0_30px_rgba(250,204,21,0.5)] ${
        isVisible
          ? "translate-y-0 opacity-100 scale-100"
          : "translate-y-16 opacity-0 scale-75 pointer-events-none"
      }`}
      style={{
        bottom: 'max(1.5rem, calc(1.5rem + env(safe-area-inset-bottom)))',
        right: '1.5rem'
      }}
      aria-label="Book Now"
      title="Book a Free Consultation"
    >
      <Calendar className="w-6 h-6" />
      <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
    </button>
  );
}

