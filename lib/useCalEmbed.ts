"use client";

import { useEffect, useState, useCallback } from "react";

declare global {
  interface Window {
    Cal?: any;
  }
}

export function useCalEmbed() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check if Cal is ready
    const checkCal = () => {
      if (typeof window !== "undefined" && window.Cal && window.Cal.loaded) {
        setIsReady(true);
        return true;
      }
      return false;
    };

    // Check immediately
    if (checkCal()) return;

    // Poll every 200ms for up to 15 seconds
    const interval = setInterval(() => {
      if (checkCal()) {
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

    // Check if Cal exists and has loaded
    if (!window.Cal) {
      console.warn("Cal.com not available, opening in new tab");
      window.open("https://cal.com/jeevan-wijerathna-oszrh3", "_blank");
      return;
    }

    try {
      // Open the modal
      window.Cal("modal", {
        calLink: "jeevan-wijerathna-oszrh3",
        config: {
          layout: "month_view",
        },
      });
    } catch (error) {
      console.error("Error opening Cal.com modal:", error);
      window.open("https://cal.com/jeevan-wijerathna-oszrh3", "_blank");
    }
  }, []);

  return { openCal, isReady };
}

