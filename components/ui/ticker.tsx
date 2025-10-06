"use client";
import { cn } from "@/lib/utils";
import React, { useEffect } from "react";

export const Ticker = ({
  direction = "left",

  className,
  children,
  masked = true,
}: {
  direction?: "left" | "right";

  className?: string;
  children: React.ReactNode;
  masked?: boolean;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        `scroller relative z-20 overflow-hidden  ${
          masked
            ? "[mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]"
            : ""
        }`,
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          " flex min-w-full shrink-0 gap-20 py-4 w-max flex-nowrap animate-scroll"
        )}
      >
        {React.Children.map(children, (child) => (
          <li className="">{child}</li>
        ))}
      </ul>
    </div>
  );
};
