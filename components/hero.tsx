"use client"

import { Button } from "@/components/ui/button"
import { Play, ArrowRight, X, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"

const slides = [
  {
    id: 1,
    type: "image",
    background: "https://www.puretecfitness.com/resources/images/backgrounds/hero_home-overlay.png",
    eyebrow: "Our Story",
    title: "KEEPING\nEUROPE FIT FOR\nOVER 25 YEARS",
    description: "Leading the fitness industry with innovative equipment and unwavering commitment to quality.",
    primaryButton: { text: "Discover", icon: ArrowRight },
    secondaryButton: { text: "Watch the Video", icon: Play, action: "video" },
    hasVideoThumbnail: true,
  },
  {
    id: 2,
    type: "video",
    background: "https://www.puretecfitness.com/wp-content/uploads/2021/10/pt-thumbnail.mp4",
    eyebrow: "Innovation",
    title: "CUTTING-EDGE\nFITNESS\nTECHNOLOGY",
    description: "Experience the future of fitness with our state-of-the-art equipment designed for performance.",
    primaryButton: { text: "Explore Equipment", icon: ArrowRight },
    secondaryButton: null,
    hasVideoThumbnail: false,
  },
  {
    id: 3,
    type: "image",
    background:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    eyebrow: "Community",
    title: "JOIN THE\nFITNESS\nREVOLUTION",
    description: "Connect with thousands of fitness enthusiasts across Europe who trust Puretec equipment.",
    primaryButton: { text: "Find Retailers", icon: ArrowRight },
    secondaryButton: { text: "Success Stories", icon: ArrowRight },
    hasVideoThumbnail: false,
  },
  {
    id: 4,
    type: "image",
    background:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    eyebrow: "Support",
    title: "LIFETIME\nWARRANTY &\nSUPPORT",
    description: "Backed by comprehensive warranty and world-class customer service for complete peace of mind.",
    primaryButton: { text: "Learn More", icon: ArrowRight },
    secondaryButton: { text: "Contact Support", icon: ArrowRight },
    hasVideoThumbnail: false,
  },
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showContent, setShowContent] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)

    return () => clearInterval(timer)
  }, [])

  const changeSlide = (newSlide: number) => {
    if (newSlide === currentSlide || isTransitioning) return

    setIsTransitioning(true)
    setShowContent(false)
    setTimeout(() => {
      setCurrentSlide(newSlide)
      setTimeout(() => {
        setIsTransitioning(false)
        setShowContent(true)
      }, 100)
    }, 300)
  }

  const nextSlide = () => {
    changeSlide((currentSlide + 1) % slides.length)
  }

  const prevSlide = () => {
    changeSlide((currentSlide - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    changeSlide(index)
  }

  const handleSecondaryAction = (action?: string) => {
    if (action === "video") {
      setIsVideoModalOpen(true)
    }
  }

  const currentSlideData = slides[currentSlide]

  return (
    <>
      <section className="relative h-screen bg-black overflow-hidden">
        <div className="absolute inset-0">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
              }`}
              style={{
                zIndex: index === currentSlide ? 1 : 0,
              }}
            >
              {slide.type === "video" ? (
                <video className="w-full h-full object-cover object-center" autoPlay muted loop playsInline>
                  <source src={slide.background} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={slide.background || "/placeholder.svg"}
                  alt="Fitness background"
                  className="w-full h-full object-cover object-center"
                />
              )}
            </div>
          ))}
          <div className="absolute inset-0 bg-black/40 z-10" />
        </div>

        <button
          onClick={prevSlide}
          disabled={isTransitioning}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 text-white/70 hover:text-white transition-all duration-300 p-2 hover:scale-110 disabled:opacity-50"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>
        <button
          onClick={nextSlide}
          disabled={isTransitioning}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 text-white/70 hover:text-white transition-all duration-300 p-2 hover:scale-110 disabled:opacity-50"
        >
          <ChevronRight className="h-8 w-8" />
        </button>

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="max-w-2xl">
                <p
                  className={`text-white/80 text-sm font-medium tracking-widest mb-6 uppercase transform transition-all duration-700 ease-out ${
                    showContent && !isTransitioning ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: showContent ? "100ms" : "0ms" }}
                >
                  {currentSlideData.eyebrow}
                </p>

                <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-black leading-none mb-6 tracking-tight">
                  {currentSlideData.title.split("\n").map((line, index) => (
                    <span
                      key={index}
                      className={`block transform transition-all duration-800 ease-out ${
                        showContent && !isTransitioning ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                      }`}
                      style={{ transitionDelay: showContent ? `${200 + index * 150}ms` : "0ms" }}
                    >
                      {line}
                    </span>
                  ))}
                </h1>

                <p
                  className={`text-white/90 text-lg mb-8 leading-relaxed transform transition-all duration-700 ease-out ${
                    showContent && !isTransitioning ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                  style={{ transitionDelay: showContent ? "500ms" : "0ms" }}
                >
                  {currentSlideData.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="outline"
                    className={`bg-transparent border-white text-white hover:bg-white hover:text-black transition-all duration-500 px-8 py-3 text-sm font-medium tracking-wide uppercase hover:scale-105 transform ${
                      showContent && !isTransitioning
                        ? "opacity-100 translate-y-0 scale-100"
                        : "opacity-0 translate-y-4 scale-95"
                    }`}
                    style={{ transitionDelay: showContent ? "600ms" : "0ms" }}
                  >
                    {currentSlideData.primaryButton.text}
                    <currentSlideData.primaryButton.icon className="ml-2 h-4 w-4" />
                  </Button>

                  {currentSlideData.secondaryButton && (
                    <Button
                      variant="secondary"
                      className={`bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-500 px-8 py-3 text-sm font-medium tracking-wide uppercase hover:scale-105 transform ${
                        showContent && !isTransitioning
                          ? "opacity-100 translate-y-0 scale-100"
                          : "opacity-0 translate-y-4 scale-95"
                      }`}
                      style={{ transitionDelay: showContent ? "700ms" : "0ms" }}
                      onClick={() => handleSecondaryAction(currentSlideData.secondaryButton?.action)}
                    >
                      <currentSlideData.secondaryButton.icon className="mr-2 h-4 w-4 fill-current" />
                      {currentSlideData.secondaryButton.text}
                    </Button>
                  )}
                </div>
              </div>

              {currentSlideData.hasVideoThumbnail && (
                <div
                  className={`hidden lg:flex justify-end transform transition-all duration-700 ease-out ${
                    showContent && !isTransitioning
                      ? "opacity-100 translate-x-0 scale-100"
                      : "opacity-0 translate-x-8 scale-95"
                  }`}
                  style={{ transitionDelay: showContent ? "400ms" : "0ms" }}
                >
                  <div className="relative w-80 h-48 rounded-lg overflow-hidden shadow-2xl transform transition-all duration-300 hover:scale-105">
                    <video className="w-full h-full object-cover" muted autoPlay loop playsInline>
                      <source
                        src="https://www.puretecfitness.com/wp-content/uploads/2021/10/pt-thumbnail.mp4"
                        type="video/mp4"
                      />
                    </video>

                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <Button
                        variant="secondary"
                        className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300 px-6 py-3 text-sm font-medium tracking-wide uppercase hover:scale-105"
                        onClick={() => setIsVideoModalOpen(true)}
                      >
                        <Play className="mr-2 h-4 w-4 fill-current" />
                        Watch the Video
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              className={`w-3 h-3 rounded-full transition-all duration-500 hover:scale-125 disabled:opacity-50 ${
                index === currentSlide ? "bg-white scale-125 shadow-lg" : "bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </section>

      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 bg-yellow-400 flex items-center justify-center p-4">
          <button
            onClick={() => setIsVideoModalOpen(false)}
            className="absolute top-6 right-6 z-60 text-black hover:text-gray-700 transition-colors"
          >
            <X className="h-8 w-8" />
          </button>

          <div className="w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
            <video className="w-full h-full" controls autoPlay playsInline>
              <source
                src="https://www.puretecfitness.com/wp-content/uploads/2021/10/lb-puretecvideo-comp.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </>
  )
}
