"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Award,
  Users,
  Calendar,
  Star,
  CheckCircle,
  ArrowRight,
  Dumbbell,
  Heart,
  Target,
  TrendingUp,
} from "lucide-react"

const stats = [
  { icon: Calendar, value: "10+", label: "Years Experience", color: "text-yellow-400" },
  { icon: Users, value: "1,000+", label: "Clients Transformed", color: "text-teal-400" },
  { icon: Award, value: "15+", label: "Certifications", color: "text-red-400" },
  { icon: Star, value: "4.9", label: "Average Rating", color: "text-purple-400" },
]

const specialties = [
  { name: "Strength Training", icon: Dumbbell },
  { name: "Weight Management", icon: TrendingUp },
  { name: "HIIT Workouts", icon: Target },
  { name: "Nutrition Planning", icon: Heart },
  { name: "Mobility Training", icon: CheckCircle },
  { name: "Recovery Techniques", icon: CheckCircle },
]

const certifications = [
  {
    title: "Certified Personal Trainer (CPT)",
    organization: "National Academy of Sports Medicine",
    year: "2014",
  },
  {
    title: "Strength and Conditioning Specialist",
    organization: "National Strength and Conditioning Association",
    year: "2016",
  },
  {
    title: "Nutrition Coach",
    organization: "Precision Nutrition",
    year: "2018",
  },
  {
    title: "Corrective Exercise Specialist",
    organization: "NASM",
    year: "2020",
  },
]

const trainingSkills = [
  { name: "MARATHON", color: "text-teal-400" },
  { name: "HIIT", color: "text-yellow-400" },
  { name: "YOGA", color: "text-green-400" },
  { name: "INTERVALS", color: "text-red-400" },
  { name: "NUTRITION", color: "text-purple-400" },
]

const galleryImages = [
  {
    id: 1,
    src: "/professional-fitness-trainer-portrait-in-gym.jpg",
    alt: "Ruwan Palihawadana - Personal Trainer",
    badges: [
      { text: "10+ Years", position: "top-right", color: "from-yellow-400 to-yellow-500", textColor: "text-black" },
      { text: "1000+ Clients", position: "bottom-left", color: "from-teal-500 to-teal-600", textColor: "text-white" }
    ],
    animatedTexts: [
      { text: "TRANSFORMING LIVES", delay: "0ms", color: "text-yellow-400" },
      { text: "SINCE 2014", delay: "500ms", color: "text-white" }
    ]
  },
  {
    id: 2,
    src: "https://scontent.fakl1-4.fna.fbcdn.net/v/t39.30808-6/549744299_787666347341448_8296222060750083575_n.jpg?stp=c0.169.1536.1536a_cp6_dst-jpg_s552x414_tt6&_nc_cat=106&ccb=1-7&_nc_sid=50ad20&_nc_ohc=9oQ5US-_IHUQ7kNvwHdhvnK&_nc_oc=AdmQ-VLSLxs681bKpqLadsm14Ayw5Zj2GoMz7VopiU_Wtwsm6yPn4poI0O1dFtpwH6W61ky3AP_qFSCeloOCVCKP&_nc_zt=23&_nc_ht=scontent.fakl1-4.fna&_nc_gid=1Fc2sJooJqqUtfBnvDCmCg&oh=00_Afb-awQJ1nBHx6tucsNvvWYhZZJ6_TIsyzKUnyYQQmCUQw&oe=68DB9829",
    alt: "Competition Winner",
    badges: [
      { text: "Champion", position: "top-left", color: "from-red-500 to-red-600", textColor: "text-white" },
      { text: "Elite Level", position: "bottom-right", color: "from-purple-500 to-purple-600", textColor: "text-white" }
    ],
    animatedTexts: [
      { text: "CHAMPION", delay: "0ms", color: "text-red-400" },
      { text: "MINDSET", delay: "500ms", color: "text-white" }
    ]
  },
  {
    id: 3,
    src: "https://scontent.fakl1-3.fna.fbcdn.net/v/t39.30808-6/548215441_787666307341452_8148520755277527195_n.jpg?stp=c0.169.1536.1536a_cp6_dst-jpg_s552x414_tt6&_nc_cat=105&ccb=1-7&_nc_sid=50ad20&_nc_ohc=xSeKEYP2hk0Q7kNvwHMRFak&_nc_oc=Adk-QCXdek2BJQ1xlLgriwCautd7MH_P9Jki5LZBoPp87m5geZsVhJnFmis3vJQpdVuKnMWW_N1aQZmlPnKgqkI0&_nc_zt=23&_nc_ht=scontent.fakl1-3.fna&_nc_gid=1Fc2sJooJqqUtfBnvDCmCg&oh=00_Afb58Lrlb2Oy-A9n19rZoYdDP0GugGSwwWG5pi5pgl6p9A&oe=68DBAECC",
    alt: "Fitness Professional",
    badges: [
      { text: "Certified", position: "top-right", color: "from-green-500 to-green-600", textColor: "text-white" },
      { text: "Expert", position: "bottom-left", color: "from-blue-500 to-blue-600", textColor: "text-white" }
    ],
    animatedTexts: [
      { text: "PROVEN", delay: "0ms", color: "text-green-400" },
      { text: "RESULTS", delay: "500ms", color: "text-white" }
    ]
  },
  {
    id: 4,
    src: "https://scontent.fakl1-3.fna.fbcdn.net/v/t39.30808-6/547915185_787666300674786_3781282252748569396_n.jpg?stp=c0.73.1826.1826a_cp6_dst-jpg_s552x414_tt6&_nc_cat=109&ccb=1-7&_nc_sid=50ad20&_nc_ohc=5Z5Yx_aJ-A0Q7kNvwF60qNM&_nc_oc=AdkC-HeYi_DleeFQrk50kxHTPLjTKJG4jGMSATfP6xxWO2XRJNfhU_TOMp1slo8sSOUbLO9kJqrvEPrxqtGUigFh&_nc_zt=23&_nc_ht=scontent.fakl1-3.fna&_nc_gid=1Fc2sJooJqqUtfBnvDCmCg&oh=00_AfYPtM4iI1xbbY1ARLrqLM3vg5W5NLWgt9WNZEzPaWPiqA&oe=68DB9F42",
    alt: "Elite Athlete",
    badges: [
      { text: "Pro Level", position: "top-left", color: "from-orange-500 to-orange-600", textColor: "text-white" },
      { text: "Dedicated", position: "bottom-right", color: "from-pink-500 to-pink-600", textColor: "text-white" }
    ],
    animatedTexts: [
      { text: "EXCELLENCE", delay: "0ms", color: "text-orange-400" },
      { text: "DAILY", delay: "500ms", color: "text-white" }
    ]
  }
]

export default function AboutTrainer() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const slideIntervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (prefersReducedMotion) return

      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const scrolled = window.pageYOffset
        const rate = scrolled * -0.5
        setScrollY(rate)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Auto-slide functionality
  useEffect(() => {
    const startSlideTimer = () => {
      slideIntervalRef.current = setInterval(() => {
        setIsTransitioning(true)
        setCurrentSlide((prev) => (prev + 1) % galleryImages.length)
        
        // Reset transition after animation
        setTimeout(() => {
          setIsTransitioning(false)
        }, 500)
      }, 4000) // Change slide every 4 seconds
    }

    const stopSlideTimer = () => {
      if (slideIntervalRef.current) {
        clearInterval(slideIntervalRef.current)
        slideIntervalRef.current = null
      }
    }

    // Start auto-slide when component is visible
    if (isVisible) {
      startSlideTimer()
    }

    return () => stopSlideTimer()
  }, [isVisible])

  // Manual slide control
  const goToSlide = (slideIndex: number) => {
    if (slideIndex !== currentSlide) {
      setIsTransitioning(true)
      setCurrentSlide(slideIndex)
      
      // Reset auto-slide timer
      if (slideIntervalRef.current) {
        clearInterval(slideIntervalRef.current)
        slideIntervalRef.current = setInterval(() => {
          setIsTransitioning(true)
          setCurrentSlide((prev) => (prev + 1) % galleryImages.length)
          setTimeout(() => setIsTransitioning(false), 500)
        }, 4000)
      }
      
      setTimeout(() => setIsTransitioning(false), 500)
    }
  }

  return (
    <section id="about-trainer" ref={sectionRef} className="relative py-20 text-white overflow-hidden bg-black">
      <div
        className="absolute inset-0 bg-black min-h-full"
        style={{
          transform: `translateY(${scrollY}px)`,
          transition: "transform 0.1s ease-out",
          height: "120%",
          top: "-10%",
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: `url('/professional-fitness-trainer-portrait-in-gym.jpg')`,
            transform: `translateY(${scrollY * 0.3}px)`,
            height: "120%",
            top: "0",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-transparent to-teal-400/10 h-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60 h-full" />

        <div className="absolute top-20 left-10 w-32 h-32 border border-yellow-400/20 rotate-45 animate-pulse" />
        <div
          className="absolute bottom-40 right-20 w-24 h-24 border border-teal-400/20 rotate-12 animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/4 w-16 h-16 bg-red-400/10 rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-16">
          <div
            className={`inline-flex items-center gap-3 mb-6 transform transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="w-8 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500"></div>
            <span className="text-sm font-medium text-yellow-400 uppercase tracking-wider">Meet Your Trainer</span>
            <div className="w-8 h-0.5 bg-gradient-to-l from-yellow-400 to-yellow-500"></div>
          </div>
          <h2
            className={`text-4xl lg:text-6xl font-black text-white max-w-4xl mx-auto leading-tight tracking-tight transform transition-all duration-800 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{
              transitionDelay: isVisible ? "200ms" : "0ms",
              textShadow: "0 4px 20px rgba(0,0,0,0.5)",
            }}
          >
            HELLO, MY NAME IS
            <br />
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
              ALEX JOHNSON
            </span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-8">
            <div
              className={`transform transition-all duration-700 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
              style={{ transitionDelay: isVisible ? "400ms" : "0ms" }}
            >
              <p className="text-lg text-gray-200 leading-relaxed mb-6 drop-shadow-lg">
                Life-long athlete and certified trainer, Ruwan began coaching in 2014 at his local gym. Not only does he
                focus on physical strength, but also psychological well-being and nutritional habits.
              </p>
              <p className="text-gray-300 leading-relaxed drop-shadow-lg">
                With over a decade of experience helping clients achieve their fitness goals, Ruwan is dedicated to
                creating personalized plans for sustainable results. His holistic approach combines effective workouts
                with nutrition guidance and recovery techniques.
              </p>
            </div>

            <div
              className={`transform transition-all duration-700 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
              style={{ transitionDelay: isVisible ? "600ms" : "0ms" }}
            >
              <h3 className="text-sm font-medium text-white/80 uppercase tracking-wider mb-4 drop-shadow-lg">
                Training Skills
              </h3>
              <div className="space-y-3">
                {trainingSkills.map((skill, index) => (
                  <div
                    key={skill.name}
                    className={`text-2xl font-bold ${skill.color} transform transition-all duration-500 hover:scale-105 cursor-default drop-shadow-lg`}
                    style={{
                      transitionDelay: isVisible ? `${800 + index * 100}ms` : "0ms",
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? "translateX(0)" : "translateX(-20px)",
                      textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                    }}
                  >
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`transform transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: isVisible ? "1300ms" : "0ms" }}
            >
              <Button className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 px-8 py-3 text-sm font-medium tracking-wide uppercase hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                Start Your Journey
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <div
            className={`relative transform transition-all duration-800 ${
              isVisible ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-8 scale-95"
            }`}
            style={{ transitionDelay: isVisible ? "500ms" : "0ms" }}
          >
            <div className="relative">
              {/* Auto-sliding Gallery Container */}
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-yellow-400/30 to-teal-400/30 p-1 shadow-2xl">
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                  {/* Gallery Images */}
                  {galleryImages.map((image, index) => (
                    <div
                      key={image.id}
                      className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                        index === currentSlide
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-105"
                      }`}
                      style={{
                        transitionDelay: index === currentSlide ? "100ms" : "0ms",
                      }}
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Animated Text Overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                        <div className="absolute bottom-6 left-6 right-6">
                          {image.animatedTexts.map((textItem, textIndex) => (
                            <div
                              key={textIndex}
                              className={`font-black text-2xl md:text-3xl tracking-tight transform transition-all duration-700 ${
                                index === currentSlide && !isTransitioning
                                  ? `opacity-100 translate-y-0 ${textItem.color}`
                                  : "opacity-0 translate-y-4"
                              }`}
                              style={{
                                transitionDelay: index === currentSlide && !isTransitioning ? textItem.delay : "0ms",
                                textShadow: "0 2px 10px rgba(0,0,0,0.8)",
                              }}
                            >
                              {textItem.text}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Dynamic Badges */}
                      {image.badges.map((badge, badgeIndex) => (
                        <div
                          key={badgeIndex}
                          className={`absolute ${
                            badge.position === "top-right" ? "-top-4 -right-4" :
                            badge.position === "top-left" ? "-top-4 -left-4" :
                            badge.position === "bottom-right" ? "-bottom-4 -right-4" :
                            "-bottom-4 -left-4"
                          } bg-gradient-to-r ${badge.color} ${badge.textColor} px-4 py-2 rounded-lg font-bold text-sm shadow-lg transform transition-all duration-700 ${
                            index === currentSlide && !isTransitioning
                              ? "opacity-100 scale-100 animate-pulse"
                              : "opacity-0 scale-75"
                          }`}
                          style={{
                            transitionDelay: index === currentSlide ? `${badgeIndex * 200 + 300}ms` : "0ms",
                            animationDelay: `${badgeIndex}s`
                          }}
                        >
                          {badge.text}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress Indicators */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
                {galleryImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "bg-yellow-400 w-8"
                        : "bg-white/30 hover:bg-white/50"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Side Navigation Dots */}
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-3">
                {galleryImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                      index === currentSlide
                        ? "bg-yellow-400 border-yellow-400 scale-125"
                        : "bg-transparent border-white/50 hover:border-white hover:scale-110"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          className={`grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20 transform transition-all duration-800 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: isVisible ? "700ms" : "0ms" }}
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className={`text-center transform transition-all duration-600 hover:scale-105 cursor-default`}
                style={{
                  transitionDelay: isVisible ? `${900 + index * 100}ms` : "0ms",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(20px)",
                }}
              >
                <div className={`${stat.color} mb-3 flex justify-center drop-shadow-lg`}>
                  <Icon className="w-8 h-8" />
                </div>
                <div className="text-3xl font-black text-white mb-1 drop-shadow-lg">{stat.value}</div>
                <div className="text-sm text-gray-300 uppercase tracking-wide drop-shadow-lg">{stat.label}</div>
              </div>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <div
            className={`transform transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
            style={{ transitionDelay: isVisible ? "1000ms" : "0ms" }}
          >
            <h3 className="text-2xl font-bold text-white mb-6 drop-shadow-lg">Specialties</h3>
            <div className="grid grid-cols-2 gap-4">
              {specialties.map((specialty, index) => {
                const Icon = specialty.icon
                return (
                  <div
                    key={specialty.name}
                    className={`flex items-center gap-3 p-3 bg-gray-900/80 backdrop-blur-sm rounded-lg hover:bg-gray-800/80 transition-all duration-300 hover:scale-105 transform transition-all duration-500 shadow-lg`}
                    style={{
                      transitionDelay: isVisible ? `${1200 + index * 100}ms` : "0ms",
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? "translateY(0)" : "translateY(20px)",
                    }}
                  >
                    <Icon className="w-5 h-5 text-yellow-400 drop-shadow-lg" />
                    <span className="text-sm font-medium text-white drop-shadow-lg">{specialty.name}</span>
                  </div>
                )
              })}
            </div>
          </div>

          <div
            className={`transform transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
            style={{ transitionDelay: isVisible ? "1100ms" : "0ms" }}
          >
            <h3 className="text-2xl font-bold text-white mb-6 drop-shadow-lg">Certifications</h3>
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div
                  key={cert.title}
                  className={`p-4 bg-gray-900/80 backdrop-blur-sm rounded-lg border-l-4 border-yellow-400 hover:bg-gray-800/80 transition-all duration-300 hover:scale-105 transform transition-all duration-500 shadow-lg`}
                  style={{
                    transitionDelay: isVisible ? `${1300 + index * 100}ms` : "0ms",
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(20px)",
                  }}
                >
                  <h4 className="font-semibold text-white mb-1 drop-shadow-lg">{cert.title}</h4>
                  <p className="text-sm text-gray-300 mb-1 drop-shadow-lg">{cert.organization}</p>
                  <Badge
                    variant="secondary"
                    className="bg-yellow-400/30 text-yellow-400 text-xs border border-yellow-400/50"
                  >
                    {cert.year}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className={`bg-gradient-to-r from-yellow-400/20 via-transparent to-teal-400/20 backdrop-blur-sm rounded-2xl p-8 lg:p-12 text-center border border-white/10 shadow-2xl transform transition-all duration-800 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: isVisible ? "1500ms" : "0ms" }}
        >
          <h3 className="text-2xl font-bold text-white mb-6 drop-shadow-lg">Training Philosophy</h3>
          <blockquote className="text-xl text-gray-200 italic leading-relaxed max-w-4xl mx-auto border-l-4 border-yellow-400 pl-6 drop-shadow-lg">
            "My goal is to help you build sustainable habits that lead to lasting results. I believe fitness should
            enhance your life, not consume it, and I'll work with you to create a program that fits your unique needs
            and goals. Every transformation starts with a single step - let's take that step together."
          </blockquote>
          <div className="mt-6">
            <span className="text-yellow-400 font-semibold drop-shadow-lg">- Ruwan Palihawadana</span>
          </div>
        </div>
      </div>
    </section>
  )
}
