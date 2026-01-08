'use client';

import { Button } from "@/components/ui/button";
import Header from "./header";
import Image from "next/image";
import { Marquee } from "@devnomic/marquee";
import { useCalEmbed } from "@/lib/useCalEmbed";
import { useEffect, useState, useRef } from "react";
import { CheckCircle2, Trophy, Users, LogIn } from "lucide-react";

const MEMBER_PORTAL_URL = "https://portal.kiwilankanfitness.com/";

// Transformation image pairs for morphing background - Using trainer's actual transformation photos
const transformationPairs = [
  {
    before: "/images/transformations/4762DC3F-4E78-42CD-9BA1-40890F4A2A9D (1).PNG",
    after: "/images/transformations/4762DC3F-4E78-42CD-9BA1-40890F4A2A9D (1).PNG",
  },
  {
    before: "/images/transformations/568044454_10225701295994273_856687466947557545_n.jpg",
    after: "/images/transformations/568044454_10225701295994273_856687466947557545_n.jpg",
  },
  {
    before: "/images/transformations/79151233-B91D-45D3-8AA8-B2A1F57E54FF.PNG",
    after: "/images/transformations/79151233-B91D-45D3-8AA8-B2A1F57E54FF.PNG",
  },
  {
    before: "/images/transformations/568044454_10225701295994273_856687466947557545_n.jpg",
    after: "/images/transformations/BB382DC9-56DB-4FF1-AD0D-CE686324DA8B.PNG",
  },
];

export default function Hero() {
  const { openCal } = useCalEmbed();
  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  const [showAfter, setShowAfter] = useState(false);
  const [counter, setCounter] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  // Scroll-driven animation states
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isReady, setIsReady] = useState(false);
  
  // Scroll animation config
  const SCROLL_DISTANCE = 350; // px to scroll before releasing
  const MIN_SCALE = 1;
  const MAX_SCALE = 3.5; // Scale up to fill screen

  // Initialize on client side only
  useEffect(() => {
    const checkMobile = () => window.innerWidth < 768;
    setIsMobile(checkMobile());
    
    // Reset scroll position to 0 for clean animation start
    if (checkMobile() && window.scrollY !== 0) {
      window.scrollTo(0, 0);
    }
    
    // Small delay before enabling scroll effect
    const timer = setTimeout(() => setIsReady(true), 150);
    
    const handleResize = () => setIsMobile(checkMobile());
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Scroll-driven animation for mobile - optimized with RAF
  useEffect(() => {
    if (!isReady || !isMobile) {
      setScrollProgress(0);
      return;
    }

    let rafId: number;
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      // Cancel previous RAF to prevent stacking
      if (rafId) cancelAnimationFrame(rafId);
      
      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        // Only update if scroll changed significantly (reduces jank)
        if (Math.abs(scrollY - lastScrollY) > 1) {
          const progress = Math.max(0, Math.min(scrollY / SCROLL_DISTANCE, 1));
          setScrollProgress(progress);
          lastScrollY = scrollY;
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isReady, isMobile]);

  // Calculate transforms - only apply on mobile when ready
  const shouldAnimate = isReady && isMobile;
  const trainerScale = shouldAnimate ? MIN_SCALE + (scrollProgress * (MAX_SCALE - MIN_SCALE)) : 1;
  // Content fades out quickly
  const contentOpacity = shouldAnimate ? Math.max(0, 1 - (scrollProgress * 1.5)) : 1;
  const contentTranslate = shouldAnimate ? scrollProgress * -80 : 0;
  // Move trainer card up toward center as it scales
  const trainerTranslateY = shouldAnimate ? scrollProgress * -120 : 0;

  // Animated counter for "16"
  useEffect(() => {
    if (!hasAnimated) {
      const duration = 1500; // 1.5 seconds
      const steps = 16;
      const increment = duration / steps;

      let current = 0;
      const timer = setInterval(() => {
        current++;
        setCounter(current);
        if (current >= 16) {
          clearInterval(timer);
          setHasAnimated(true);
        }
      }, increment);

      return () => clearInterval(timer);
    }
  }, [hasAnimated]);

  // Morphing background effect
  useEffect(() => {
    const morphInterval = setInterval(() => {
      setShowAfter((prev) => !prev);
    }, 4000); // Toggle every 4 seconds (4s show, then switch)

    const pairInterval = setInterval(() => {
      setCurrentPairIndex(
        (prev) => (prev + 1) % transformationPairs.length
      );
    }, 16000); // Change pair every 16 seconds

    return () => {
      clearInterval(morphInterval);
      clearInterval(pairInterval);
    };
  }, []);

  const currentPair = transformationPairs[currentPairIndex];

  return (
    <>
      {/* Scroll buffer for mobile scroll-lock animation */}
      <div 
        ref={heroRef}
        className="relative"
        style={{ 
          height: shouldAnimate ? `calc(100dvh + ${SCROLL_DISTANCE}px)` : 'auto' 
        }}
      >
      <section 
        className={`relative hero-mobile-fix bg-black min-h-dvh px-4 lg:px-5 ${
          shouldAnimate ? 'sticky top-0' : ''
        }`}
        style={{
          overflow: shouldAnimate && scrollProgress > 0.1 ? 'visible' : 'hidden'
        }}
      >
        {/* Morphing Background Images */}
        <div className="absolute inset-0 z-0">
          {/* Before Image */}
          <Image
            src={currentPair.before}
            alt="Before Transformation"
            fill
            className={`object-cover object-center transition-opacity duration-1000 hero-ken-burns ${
              showAfter ? "opacity-0" : "opacity-100"
            }`}
            priority
          />
          {/* After Image */}
          <Image
            src={currentPair.after}
            alt="After Transformation"
            fill
            className={`object-cover object-center transition-opacity duration-1000 hero-ken-burns ${
              showAfter ? "opacity-100" : "opacity-0"
            }`}
            priority
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/80"></div>
        </div>

        {/* Yellow radial glow effect */}
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top,_rgba(250,204,21,0.25),_transparent_65%)] z-0"></div>

        {/* Noise texture */}
        <div className="absolute inset-0 showcase-noise opacity-40 z-0"></div>

        <Header />
        
        <Marquee
          fade={true}
          direction="left"
          reverse={false}
          pauseOnHover={false}
          className="absolute top-3/4 left-0 transform -translate-y-[30%] z-0 h-auto w-full opacity-10 hidden md:flex"
          innerClassName="gap-[4rem] md:gap-[6rem] lg:gap-[10rem] font-display uppercase text-[3rem] md:text-[6rem] lg:text-[10rem] xl:text-[14rem]"
        >
          <span className="inline-block text-white">Personal Trainer</span>
          <span className="inline-block text-white">Certified Coach</span>
          <span className="inline-block text-white">NZ Champion</span>
        </Marquee>

        <div className="container mx-auto relative z-10 h-full flex flex-col lg:flex-row justify-center items-center lg:items-center text-center lg:text-left gap-4 md:gap-6 lg:gap-10 pt-28 sm:pt-24 md:pt-28 lg:pt-32 pb-16 md:pb-20 lg:py-20">
          {/* Left Side - Main Content */}
          <div 
            className="flex-1 flex flex-col items-center lg:items-start gap-4 md:gap-6 lg:gap-10"
            style={{
              opacity: contentOpacity,
              transform: `translate3d(0, ${contentTranslate}px, 0)`,
              transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
              willChange: shouldAnimate ? 'opacity, transform' : 'auto'
            }}
          >
            {/* Tag Line */}
            <div className="inline-flex items-center gap-2 lg:gap-3 opacity-0 animate-slideUp" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
              <div className="w-6 lg:w-8 h-0.5 bg-yellow-400"></div>
              <span className="text-xs lg:text-sm font-medium text-yellow-400 uppercase tracking-wider">
                PROVEN TRANSFORMATION PROGRAM
              </span>
              <div className="w-6 lg:w-8 h-0.5 bg-yellow-400"></div>
            </div>

            {/* Main Headline with animated counter */}
            <div className="space-y-3 md:space-y-4 max-w-3xl opacity-0 animate-slideUp" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-display text-white leading-tight">
                YOUR{" "}
                <span className="inline-block text-yellow-400 animate-count-up" style={{ animationDelay: '0.5s' }}>
                  {counter}
                </span>
                -WEEK
                <span className="hidden sm:inline"><br /></span>
                <span className="sm:hidden"> </span>
                TRANSFORMATION
                <span className="hidden sm:inline"><br /></span>
                <span className="sm:hidden"> </span>
                STARTS TODAY
              </h1>
              <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-gray-300 leading-relaxed font-light italic">
                "From where you are to where you deserve to be — with a certified
                NZ Champion by your side."
              </p>
            </div>

            {/* Social Proof Stats Bar */}
            <div className="flex flex-nowrap md:flex-wrap justify-start md:justify-center lg:justify-start items-center gap-2 md:gap-3 lg:gap-6 opacity-0 animate-slideUp overflow-x-auto pb-2 md:pb-0 max-w-full scrollbar-hide" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
              <div className="flex items-center gap-1.5 md:gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-3 md:px-4 py-1.5 md:py-2 hover:border-yellow-400/30 transition-all duration-300 flex-shrink-0">
                <Users className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 flex-shrink-0" />
                <span className="text-white font-semibold text-[10px] md:text-xs whitespace-nowrap">500+ Clients</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-3 md:px-4 py-1.5 md:py-2 hover:border-yellow-400/30 transition-all duration-300 flex-shrink-0">
                <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 flex-shrink-0" />
                <span className="text-white font-semibold text-[10px] md:text-xs whitespace-nowrap">16 Week Program</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-3 md:px-4 py-1.5 md:py-2 hover:border-yellow-400/30 transition-all duration-300 flex-shrink-0">
                <Trophy className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 flex-shrink-0" />
                <span className="text-white font-semibold text-[10px] md:text-xs whitespace-nowrap">NZ Champion</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 items-center lg:items-start w-full sm:w-auto opacity-0 animate-slideUp" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
              <Button
                onClick={openCal}
                className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 px-6 py-5 text-sm lg:text-lg font-bold tracking-wide uppercase hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(250,204,21,0.5)] animate-pulse-glow rounded-full"
              >
                Start Your Transformation
              </Button>
              {/* <Button
                variant="outline"
                className="w-full sm:w-auto border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-6 py-5 text-sm lg:text-lg font-bold tracking-wide uppercase transition-all duration-300 rounded-full"
                onClick={() => {
                  document.getElementById('transformations')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Watch Success Stories
              </Button> */}
            </div>

            {/* Urgency Text + Member Login */}
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 opacity-0 animate-slideUp" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
              <p className="text-xs sm:text-sm text-gray-400 flex items-center gap-1.5 sm:gap-2">
                <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                Limited spots available
              </p>
              <span className="hidden sm:inline text-gray-600">|</span>
              <a 
                href={MEMBER_PORTAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm text-gray-400 hover:text-yellow-400 transition-colors flex items-center gap-1 sm:gap-1.5 group"
              >
                <LogIn className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:scale-110 transition-transform" />
                Member? <span className="text-yellow-400 font-medium">Login</span>
              </a>
            </div>
          </div>

          {/* Right Side - Trainer Trophy Image - Scroll-driven scale on mobile */}
          {/* Outer wrapper for entry animation */}
          <div 
            className="relative flex-shrink-0 w-full max-w-[200px] sm:max-w-[280px] md:max-w-sm lg:max-w-xl opacity-0 animate-slideUp"
            style={{ 
              animationDelay: '0.6s', 
              animationFillMode: 'forwards',
              zIndex: shouldAnimate ? 40 : 10,
            }}
          >
          {/* Inner wrapper for scroll-driven scale transform */}
          <div 
            className="origin-center"
            style={{ 
              transform: shouldAnimate 
                ? `scale3d(${trainerScale}, ${trainerScale}, 1) translate3d(0, ${trainerTranslateY}px, 0)` 
                : 'scale3d(1, 1, 1)',
              transition: 'transform 0.25s cubic-bezier(0.33, 1, 0.68, 1)',
              willChange: shouldAnimate ? 'transform' : 'auto',
              overflow: shouldAnimate && scrollProgress > 0.1 ? 'visible' : undefined
            }}
          >
            {/* Champion Badge - Fades out as image scales */}
            <div 
              className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 lg:-top-4 lg:-right-4 z-20 bg-gradient-to-br from-yellow-400 to-yellow-500 text-black px-2 py-1 sm:px-4 sm:py-2 lg:px-6 lg:py-3 rounded-full font-bold text-[10px] sm:text-xs lg:text-sm uppercase tracking-wider shadow-lg animate-pulse-glow border-2 border-yellow-300 transition-all duration-300"
              style={{
                opacity: shouldAnimate ? Math.max(0, 1 - scrollProgress * 1.5) : 1,
                boxShadow: shouldAnimate && scrollProgress > 0.2 
                  ? `0 0 ${30 + scrollProgress * 80}px rgba(250, 204, 21, ${0.6 + scrollProgress * 0.4})` 
                  : undefined
              }}
            >
              <div className="flex items-center gap-1 sm:gap-2">
                <Trophy className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4" />
                <span className="hidden sm:inline">NZ Champion</span>
                <span className="sm:hidden">Champ</span>
              </div>
            </div>

            {/* Image Container with Glow */}
            <div className="relative group">
              {/* Glow effect - Intense during scroll for cinematic effect */}
              <div 
                className="absolute inset-0 bg-gradient-to-br from-yellow-400/40 to-yellow-600/40 rounded-2xl"
                style={{
                  opacity: shouldAnimate ? 0.5 + scrollProgress * 0.5 : 0.5,
                  filter: `blur(${shouldAnimate ? 20 + scrollProgress * 60 : 20}px)`,
                  transform: `scale3d(${shouldAnimate ? 1 + scrollProgress * 0.3 : 1}, ${shouldAnimate ? 1 + scrollProgress * 0.3 : 1}, 1)`,
                  transition: 'opacity 0.3s ease-out, filter 0.3s ease-out, transform 0.3s ease-out'
                }}
              ></div>
              
              {/* Image */}
              <div 
                className="relative rounded-2xl overflow-hidden border-2 bg-gradient-to-br from-black/40 to-black/60 backdrop-blur-sm"
                style={{
                  borderColor: shouldAnimate 
                    ? `rgba(250, 204, 21, ${0.4 + scrollProgress * 0.6})` 
                    : 'rgba(250, 204, 21, 0.3)',
                  boxShadow: shouldAnimate 
                    ? `0 0 ${30 + scrollProgress * 150}px rgba(250, 204, 21, ${0.2 + scrollProgress * 0.6}), 
                       inset 0 0 ${scrollProgress * 30}px rgba(250, 204, 21, ${scrollProgress * 0.2})` 
                    : undefined,
                  borderRadius: shouldAnimate ? `${16 - scrollProgress * 8}px` : '16px',
                  transition: 'border-color 0.3s ease-out, box-shadow 0.3s ease-out, border-radius 0.3s ease-out'
                }}
              >
                <Image
                  src="/images/hero-portrait-1.png"
                  alt="NZ Champion Personal Trainer"
                  width={500}
                  height={600}
                  className="object-cover object-center w-full h-auto group-hover:scale-105 transition-transform duration-500"
                  priority
                />
                
                {/* Bottom gradient overlay - Fades as image scales */}
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 sm:p-4 md:p-6 transition-opacity duration-200"
                  style={{
                    opacity: shouldAnimate ? Math.max(0, 1 - scrollProgress * 2) : 1
                  }}
                >
                  <p className="text-white font-bold text-sm sm:text-base md:text-lg">Your Trainer</p>
                  <p className="text-yellow-400 text-xs sm:text-sm font-semibold">Ruwan Palihawadana</p>
                </div>
              </div>
            </div>
            
            {/* Full screen vignette overlay when scaled */}
            {shouldAnimate && scrollProgress > 0.5 && (
              <div 
                className="fixed inset-0 pointer-events-none z-50 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at center, transparent 30%, rgba(0,0,0,${scrollProgress * 0.7}) 100%)`,
                  opacity: (scrollProgress - 0.5) * 2
                }}
              />
            )}
          </div>
          </div>
        </div>

        {/* Transformation Indicator - Hidden on mobile during scroll animation */}
        <div 
          className="hidden md:flex absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 items-center gap-2 md:gap-4 text-white/60 text-xs md:text-sm z-20"
        >
          <span className={`transition-all duration-500 ${!showAfter ? 'text-white font-semibold' : ''}`}>
            BEFORE
          </span>
          <div className="flex gap-1 md:gap-2">
            {transformationPairs.map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-300 ${
                  index === currentPairIndex
                    ? 'bg-yellow-400 w-6 md:w-8'
                    : 'bg-white/30'
                }`}
              ></div>
            ))}
          </div>
          <span className={`transition-all duration-500 ${showAfter ? 'text-white font-semibold' : ''}`}>
            AFTER
          </span>
        </div>

        {/* Scroll Progress Indicator - Mobile only, shows when not scrolled */}
        {shouldAnimate && scrollProgress < 0.9 && (
          <div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center gap-2 transition-opacity duration-300"
            style={{ opacity: Math.max(0, 1 - scrollProgress * 1.5) }}
          >
            <div className="w-6 h-10 border-2 border-yellow-400/60 rounded-full flex items-start justify-center p-1.5">
              <div className="w-1.5 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
            </div>
            <span className="text-[10px] text-yellow-400/80 uppercase tracking-wider font-medium">
              Scroll
            </span>
          </div>
        )}
      </section>
      </div>
    </>
  );
}
