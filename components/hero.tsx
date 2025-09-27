"use client"

import { Button } from "@/components/ui/button"
import { Play, ArrowRight, X, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect, useRef } from "react"

const slides = [
  {
    id: 1,
    type: "image",
    background: "/images/background.jpg",
    eyebrow: "Our Story",
    title: "KEEPING\nNEW ZEALAND FIT\nWITH PASSION",
    description: "Leading New Zealand's fitness revolution with personalized training and unwavering commitment to results.",
    primaryButton: { text: "Discover", icon: ArrowRight },
    secondaryButton: { text: "Watch the Video", icon: Play, action: "video" },
    hasVideoThumbnail: true,
  },
  {
    id: 2,
    type: "video",
    background: "https://videos.pexels.com/video-files/3131142/3131142-hd_1920_1080_30fps.mp4",
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
    description: "Connect with thousands of fitness enthusiasts across New Zealand who trust Kiwilankan Fitness equipment.",
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

// Text reveal hook for character animation
function useTextReveal(text: string, isVisible: boolean, delay: number = 0) {
  const [visibleChars, setVisibleChars] = useState(0)
  
  useEffect(() => {
    if (!isVisible) {
      setVisibleChars(0)
      return
    }
    
    const timeout = setTimeout(() => {
      let currentChar = 0
      const interval = setInterval(() => {
        setVisibleChars((prev) => {
          currentChar++
          if (currentChar >= text.length) {
            clearInterval(interval)
            return text.length
          }
          return prev + 1
        })
      }, 30) // Speed of character reveal
      
      return () => clearInterval(interval)
    }, delay)
    
    return () => clearTimeout(timeout)
  }, [isVisible, text, delay])
  
  return visibleChars
}

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showContent, setShowContent] = useState(true)
  const [imageLoaded, setImageLoaded] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 8000) // Longer duration for better UX

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const changeSlide = (newSlide: number) => {
    if (newSlide === currentSlide || isTransitioning) return

    setIsTransitioning(true)
    setShowContent(false)
    setImageLoaded(false)
    
    // Clear existing interval and restart
    if (intervalRef.current) clearInterval(intervalRef.current)
    
    setTimeout(() => {
      setCurrentSlide(newSlide)
      setTimeout(() => {
        setIsTransitioning(false)
        setShowContent(true)
        setImageLoaded(true)
        
        // Restart interval
        intervalRef.current = setInterval(() => {
          setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, 8000)
      }, 150)
    }, 400)
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
  
  // Text reveal animations
  const eyebrowChars = useTextReveal(currentSlideData.eyebrow, showContent && !isTransitioning, 100)
  const descriptionChars = useTextReveal(currentSlideData.description, showContent && !isTransitioning, 800)

  return (
    <>
      <section className="relative h-screen bg-black overflow-hidden">
        {/* Enhanced Background with Ken Burns Effect */}
        <div className="absolute inset-0">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-1000 ease-out ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
              style={{
                zIndex: index === currentSlide ? 1 : 0,
              }}
            >
              {slide.type === "video" ? (
                <div className="relative w-full h-full overflow-hidden">
                  <video 
                    className={`w-full h-full object-cover object-center transition-transform duration-[20000ms] ease-linear ${
                      index === currentSlide && !isTransitioning 
                        ? 'scale-110' 
                        : 'scale-100'
                    }`}
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                  >
                    <source src={slide.background} type="video/mp4" />
                  </video>
                </div>
              ) : (
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src={slide.background || "/placeholder.svg"}
                    alt="Fitness background"
                    className={`w-full h-full object-cover object-center transition-all duration-[20000ms] ease-out ${
                      index === currentSlide && !isTransitioning
                        ? 'scale-110 transform' 
                        : 'scale-100'
                    }`}
                    onLoad={() => setImageLoaded(true)}
                    style={{
                      filter: index === currentSlide ? 'brightness(1.1) contrast(1.05)' : 'brightness(1)',
                    }}
                  />
                </div>
              )}
            </div>
          ))}
          
          {/* Dynamic Overlay with Gradient */}
          <div className="absolute inset-0 z-10">
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
          </div>
        </div>

        <button
          onClick={prevSlide}
          disabled={isTransitioning}
          aria-label="Previous slide"
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 text-white/70 hover:text-white transition-all duration-300 p-2 hover:scale-110 disabled:opacity-50 bg-black/20 backdrop-blur-sm rounded-full hover:bg-black/40"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>
        <button
          onClick={nextSlide}
          disabled={isTransitioning}
          aria-label="Next slide"
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 text-white/70 hover:text-white transition-all duration-300 p-2 hover:scale-110 disabled:opacity-50 bg-black/20 backdrop-blur-sm rounded-full hover:bg-black/40"
        >
          <ChevronRight className="h-8 w-8" />
        </button>

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="max-w-2xl">
                {/* Enhanced Eyebrow with Character Reveal */}
                <div
                  className={`text-white/80 text-sm font-medium tracking-widest mb-6 uppercase transform transition-all duration-700 ease-out ${
                    showContent && !isTransitioning ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: showContent ? "100ms" : "0ms" }}
                >
                  <span className="inline-block">
                    {currentSlideData.eyebrow.split('').map((char, index) => (
                      <span
                        key={index}
                        className={`inline-block transition-all duration-300 ease-out ${
                          index < eyebrowChars ? 'opacity-100 transform translate-y-0' : 'opacity-0 translate-y-2'
                        }`}
                        style={{ 
                          transitionDelay: `${index * 30}ms`,
                          color: index < eyebrowChars ? '#f39c12' : 'transparent'
                        }}
                      >
                        {char === ' ' ? '\u00A0' : char}
                      </span>
                    ))}
                  </span>
                </div>

                {/* Enhanced Title with Staggered Line Animation */}
                <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-black leading-none mb-6 tracking-tight">
                  {currentSlideData.title.split("\n").map((line, lineIndex) => (
                    <div key={lineIndex} className="block overflow-hidden">
                      <span
                        className={`block transform transition-all duration-1000 ease-out ${
                          showContent && !isTransitioning ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
                        }`}
                        style={{ 
                          transitionDelay: showContent ? `${300 + lineIndex * 200}ms` : "0ms",
                          textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                        }}
                      >
                        {line.split('').map((char, charIndex) => (
                          <span
                            key={charIndex}
                            className={`inline-block transition-all duration-300 ease-out ${
                              showContent && !isTransitioning 
                                ? 'transform scale-100 opacity-100' 
                                : 'transform scale-95 opacity-80'
                            }`}
                            style={{
                              transitionDelay: `${500 + lineIndex * 200 + charIndex * 50}ms`,
                              textShadow: '0 0 20px rgba(243, 156, 18, 0.3)'
                            }}
                          >
                            {char === ' ' ? '\u00A0' : char}
                          </span>
                        ))}
                      </span>
                    </div>
                  ))}
                </h1>

                {/* Enhanced Description with Character Reveal */}
                <div
                  className={`text-white/90 text-lg mb-8 leading-relaxed transform transition-all duration-700 ease-out ${
                    showContent && !isTransitioning ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                  style={{ transitionDelay: showContent ? "700ms" : "0ms" }}
                >
                  <span>
                    {currentSlideData.description.split('').map((char, index) => (
                      <span
                        key={index}
                        className={`inline transition-all duration-200 ease-out ${
                          index < descriptionChars ? 'opacity-100' : 'opacity-0'
                        }`}
                      >
                        {char === ' ' ? '\u00A0' : char}
                      </span>
                    ))}
                  </span>
                </div>

                {/* Enhanced Buttons with Modern Animations */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div 
                    className={`transform transition-all duration-700 ease-out ${
                      showContent && !isTransitioning
                        ? "opacity-100 translate-y-0 scale-100"
                        : "opacity-0 translate-y-6 scale-95"
                    }`}
                    style={{ transitionDelay: showContent ? "900ms" : "0ms" }}
                  >
                    <Button
                      variant="outline"
                      className="group bg-gradient-to-r from-transparent to-transparent border-2 border-white text-white hover:border-[#f39c12] hover:bg-gradient-to-r hover:from-[#f39c12] hover:to-[#e67e22] transition-all duration-500 px-8 py-4 text-sm font-bold tracking-wider uppercase hover:scale-105 hover:shadow-2xl hover:shadow-[#f39c12]/25 transform relative overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center">
                        {currentSlideData.primaryButton.text}
                        <currentSlideData.primaryButton.icon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#f39c12] to-[#e67e22] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    </Button>
                  </div>

                  {currentSlideData.secondaryButton && (
                    <div 
                      className={`transform transition-all duration-700 ease-out ${
                        showContent && !isTransitioning
                          ? "opacity-100 translate-y-0 scale-100"
                          : "opacity-0 translate-y-6 scale-95"
                      }`}
                      style={{ transitionDelay: showContent ? "1000ms" : "0ms" }}
                    >
                      <Button
                        variant="secondary"
                        className="group bg-white/5 backdrop-blur-md border border-white/30 text-white hover:bg-white/15 hover:border-white/50 transition-all duration-500 px-8 py-4 text-sm font-medium tracking-wide uppercase hover:scale-105 hover:shadow-xl relative overflow-hidden"
                        onClick={() => handleSecondaryAction(currentSlideData.secondaryButton?.action)}
                      >
                        <span className="relative z-10 flex items-center">
                          <currentSlideData.secondaryButton.icon className="mr-2 h-4 w-4 fill-current group-hover:scale-110 transition-transform duration-300" />
                          {currentSlideData.secondaryButton.text}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {currentSlideData.hasVideoThumbnail && (
                <div
                  className={`hidden lg:flex justify-end transform transition-all duration-1000 ease-out ${
                    showContent && !isTransitioning
                      ? "opacity-100 translate-x-0 scale-100"
                      : "opacity-0 translate-x-12 scale-90"
                  }`}
                  style={{ transitionDelay: showContent ? "600ms" : "0ms" }}
                >
                  <div className="relative w-80 h-48 rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-[#f39c12]/20 group">
                    <video className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" muted autoPlay loop playsInline>
                      <source
                        src="https://videos.pexels.com/video-files/3131142/3131142-hd_1920_1080_30fps.mp4"
                        type="video/mp4"
                      />
                    </video>

                    {/* Enhanced Overlay with Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 flex items-center justify-center group-hover:from-black/60 transition-all duration-500">
                      <Button
                        variant="secondary"
                        className="group/btn bg-white/10 backdrop-blur-lg border border-white/30 text-white hover:bg-[#f39c12] hover:border-[#f39c12] transition-all duration-500 px-8 py-4 text-sm font-bold tracking-wider uppercase hover:scale-110 hover:shadow-xl relative overflow-hidden"
                        onClick={() => setIsVideoModalOpen(true)}
                      >
                        <span className="relative z-10 flex items-center">
                          <Play className="mr-2 h-5 w-5 fill-current group-hover/btn:scale-110 group-hover/btn:animate-pulse transition-all duration-300" />
                          Watch the Video
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#f39c12] to-[#e67e22] transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 origin-left" />
                      </Button>
                    </div>
                    
                    {/* Animated Border */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-[#f39c12] to-[#e67e22] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'exclude' }} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              className={`group relative transition-all duration-500 hover:scale-125 disabled:opacity-50 ${
                index === currentSlide ? "scale-125" : ""
              }`}
            >
              <div className={`w-4 h-4 rounded-full transition-all duration-500 ${
                index === currentSlide 
                  ? "bg-gradient-to-r from-[#f39c12] to-[#e67e22] shadow-lg shadow-[#f39c12]/50" 
                  : "bg-white/30 hover:bg-white/60 group-hover:shadow-md group-hover:shadow-white/25"
              }`} />
              
              {index === currentSlide && (
                <div className="absolute inset-0 rounded-full border-2 border-white/40 animate-ping" />
              )}
              
              {/* Progress indicator for active slide */}
              {index === currentSlide && (
                <div className="absolute inset-0 rounded-full border-2 border-white/20">
                  <div 
                    className="absolute inset-0 rounded-full border-2 border-[#f39c12] opacity-80"
                    style={{
                      clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                      animation: 'spin 8s linear infinite'
                    }}
                  />
                </div>
              )}
            </button>
          ))}
        </div>
      </section>

      {isVideoModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-500"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <button
            onClick={() => setIsVideoModalOpen(false)}
            aria-label="Close video modal"
            className="absolute top-6 right-6 z-60 text-white hover:text-[#f39c12] transition-all duration-300 p-2 rounded-full bg-black/20 backdrop-blur-sm hover:bg-[#f39c12]/20 hover:scale-110"
          >
            <X className="h-6 w-6" />
          </button>

          <div 
            className="w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-105 animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            <video className="w-full h-full rounded-2xl" controls autoPlay playsInline>
              <source
                src="https://videos.pexels.com/video-files/3131142/3131142-hd_1920_1080_30fps.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
            
            {/* Enhanced Border */}
            <div className="absolute inset-0 rounded-2xl border-2 border-gradient-to-r from-[#f39c12]/50 to-[#e67e22]/50 pointer-events-none" />
          </div>
        </div>
      )}
    </>
  )
}
