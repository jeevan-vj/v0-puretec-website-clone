"use client";

import { useEffect, useState, useCallback } from "react";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

// Dark theme colors: background, text, and primary (yellow accent)
const CALENDLY_URL = "https://calendly.com/kiwilankanfitness/30min?background_color=1a1a2e&text_color=ffffff&primary_color=facc15";

export function useCalEmbed() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check if Calendly is ready
    const checkCalendly = () => {
      if (typeof window !== "undefined" && window.Calendly) {
        setIsReady(true);
        return true;
      }
      return false;
    };

    // Check immediately
    if (checkCalendly()) return;

    // Poll every 200ms for up to 15 seconds
    const interval = setInterval(() => {
      if (checkCalendly()) {
        clearInterval(interval);
      }
    }, 200);

    const timeout = setTimeout(() => {
      clearInterval(interval);
    }, 15000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  const openCal = useCallback(() => {
    if (typeof window === "undefined") return;

    // Check if Calendly exists
    if (!window.Calendly) {
      console.warn("Calendly not available, opening in new tab");
      window.open(CALENDLY_URL, "_blank");
      return;
    }

    try {
      // Open the Calendly popup widget
      window.Calendly.initPopupWidget({ url: CALENDLY_URL });
    } catch (error) {
      console.error("Error opening Calendly popup:", error);
      window.open(CALENDLY_URL, "_blank");
    }
  }, []);

  return { openCal, isReady };
}

