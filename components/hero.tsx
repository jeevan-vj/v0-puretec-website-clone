"use client";

import { Button } from "@/components/ui/button";
import Header from "./header";
import Image from "next/image";
import { Marquee } from "@devnomic/marquee";

export default function Hero() {
  return (
    <>
      <section
        className="relative hero-mobile-fix bg-black overflow-hidden min-h-dvh px-4 lg:px-5"
        style={{
          backgroundImage: `url("/images/hero-bg.jpg")`,
          backgroundPosition: "center center",
          backgroundSize: "cover",
        }}
      >
        <Header />
        <Marquee
          fade={true}
          direction="left"
          reverse={false}
          pauseOnHover={false}
          className="absolute top-3/4 left-0 transform -translate-y-[30%] -z-0 h-auto w-full" // pass class to change gap or speed
          innerClassName="gap-[10rem] font-display uppercase text-[16rem]" // pass class to change gap or speed
        >
          <span className="inline-block text-white">Personal Trainer</span>
          <span className="inline-block text-white">Certified Coach</span>
          <span className="inline-block text-white">NZ Champion</span>
        </Marquee>
        <div className="container mx-auto relative h-full flex flex-col lg:flex-row w-full lg:justify-center gap-10 lg:gap-0 items-center justify-end">
          <div className="w-full  lg:w-1/2 flex flex-col text-white gap-8">
            <div className="space-y-5">
              <h1 className="text-4xl lg:text-6xl font-bold font-display">
                Ready to get real results?
              </h1>
              <p className="text-lg lg:text-xl leading-relaxed">
                Ready to get real results? I specialize in personalized
                training, custom nutrition plans, and a complete lifestyle
                overhaul. Let's build the body you've always wanted, just like
                I've done for myself and countless others.
              </p>
            </div>
            <Button
              variant="gradient"
              className="px-6 py-6 lg:px-8 lg:py-8 text-lg w-full lg:w-fit tracking-wide rounded-full"
            >
              Book a Free Consultation
            </Button>
          </div>
          <div className="w-full lg:w-1/2 relative h-5/12 lg:h-full flex items-end">
            <Image
              src="/images/hero-portrait-1.png"
              alt="Hero Background"
              fill
              className="object-contain object-bottom"
            />
          </div>
        </div>
      </section>
    </>
  );
}
