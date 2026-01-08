'use client';

import { Button } from "@/components/ui/button";
import Header from "./header";
import Image from "next/image";
import { Marquee } from "@devnomic/marquee";
import { useCalEmbed } from "@/lib/useCalEmbed";
import { useEffect, useState } from "react";
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
      <section className="relative hero-mobile-fix bg-black overflow-hidden min-h-dvh px-4 lg:px-5">
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
          className="absolute top-3/4 left-0 transform -translate-y-[30%] z-0 h-auto w-full opacity-10"
          innerClassName="gap-[10rem] font-display uppercase text-[16rem]"
        >
          <span className="inline-block text-white">Personal Trainer</span>
          <span className="inline-block text-white">Certified Coach</span>
          <span className="inline-block text-white">NZ Champion</span>
        </Marquee>

        <div className="container mx-auto relative z-10 h-full flex flex-col lg:flex-row justify-center items-center lg:items-center text-center lg:text-left gap-6 lg:gap-10 pt-28 pb-20 lg:py-20">
          {/* Left Side - Main Content */}
          <div className="flex-1 flex flex-col items-center lg:items-start gap-6 lg:gap-10">
            {/* Tag Line */}
            <div className="inline-flex items-center gap-2 lg:gap-3 opacity-0 animate-slideUp" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
              <div className="w-6 lg:w-8 h-0.5 bg-yellow-400"></div>
              <span className="text-xs lg:text-sm font-medium text-yellow-400 uppercase tracking-wider">
                PROVEN TRANSFORMATION PROGRAM
              </span>
              <div className="w-6 lg:w-8 h-0.5 bg-yellow-400"></div>
            </div>

            {/* Main Headline with animated counter */}
            <div className="space-y-4 max-w-3xl opacity-0 animate-slideUp" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-display text-white leading-tight">
                YOUR{" "}
                <span className="inline-block text-yellow-400 animate-count-up" style={{ animationDelay: '0.5s' }}>
                  {counter}
                </span>
                -WEEK
                <br />
                TRANSFORMATION
                <br />
                STARTS TODAY
              </h1>
              <p className="text-base md:text-xl lg:text-2xl text-gray-300 leading-relaxed font-light italic">
                "From where you are to where you deserve to be — with a certified
                NZ Champion by your side."
              </p>
            </div>

            {/* Social Proof Stats Bar */}
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3 lg:gap-6 opacity-0 animate-slideUp" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 hover:border-yellow-400/30 transition-all duration-300">
                <Users className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <span className="text-white font-semibold text-xs">500+ Transformations</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 hover:border-yellow-400/30 transition-all duration-300">
                <CheckCircle2 className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <span className="text-white font-semibold text-xs">16 Week Programs</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 hover:border-yellow-400/30 transition-all duration-300">
                <Trophy className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <span className="text-white font-semibold text-xs">NZ Champion</span>
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
            <div className="flex flex-col sm:flex-row items-center gap-4 opacity-0 animate-slideUp" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
              <p className="text-sm text-gray-400 flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                Limited spots available this month
              </p>
              <span className="hidden sm:inline text-gray-600">|</span>
              <a 
                href={MEMBER_PORTAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 hover:text-yellow-400 transition-colors flex items-center gap-1.5 group"
              >
                <LogIn className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                Already a member? <span className="text-yellow-400 font-medium">Login here</span>
              </a>
            </div>
          </div>

          {/* Right Side - Trainer Trophy Image */}
          <div className="relative flex-shrink-0 w-full max-w-sm lg:max-w-xl opacity-0 animate-slideUp" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            {/* Champion Badge */}
            <div className="absolute -top-2 -right-2 lg:-top-4 lg:-right-4 z-20 bg-gradient-to-br from-yellow-400 to-yellow-500 text-black px-4 py-2 lg:px-6 lg:py-3 rounded-full font-bold text-xs lg:text-sm uppercase tracking-wider shadow-lg animate-pulse-glow border-2 border-yellow-300">
              <div className="flex items-center gap-2">
                <Trophy className="w-3 h-3 lg:w-4 lg:h-4" />
                <span>NZ Champion</span>
              </div>
            </div>

            {/* Image Container with Glow */}
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/30 to-yellow-500/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 animate-pulse-glow"></div>
              
              {/* Image */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-yellow-400/30 group-hover:border-yellow-400/60 transition-all duration-300 bg-gradient-to-br from-black/40 to-black/60 backdrop-blur-sm">
                <Image
                  src="/images/hero-portrait-1.png"
                  alt="NZ Champion Personal Trainer"
                  width={500}
                  height={600}
                  className="object-cover object-center w-full h-auto group-hover:scale-105 transition-transform duration-500"
                  priority
                />
                
                {/* Bottom gradient overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                  <p className="text-white font-bold text-lg">Your Trainer</p>
                  <p className="text-yellow-400 text-sm font-semibold">Ruwan Palihawadana</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transformation Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4 text-white/60 text-sm z-20">
          <span className={`transition-all duration-500 ${!showAfter ? 'text-white font-semibold' : ''}`}>
            BEFORE
          </span>
          <div className="flex gap-2">
            {transformationPairs.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentPairIndex
                    ? 'bg-yellow-400 w-8'
                    : 'bg-white/30'
                }`}
              ></div>
            ))}
          </div>
          <span className={`transition-all duration-500 ${showAfter ? 'text-white font-semibold' : ''}`}>
            AFTER
          </span>
        </div>
      </section>
    </>
  );
}
