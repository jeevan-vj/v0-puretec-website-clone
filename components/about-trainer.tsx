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

export default function AboutTrainer() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

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

  return (
    <section ref={sectionRef} className="relative py-20 text-white overflow-hidden bg-black">
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
                Life-long athlete and certified trainer, Alex began coaching in 2014 at his local gym. Not only does he
                focus on physical strength, but also psychological well-being and nutritional habits.
              </p>
              <p className="text-gray-300 leading-relaxed drop-shadow-lg">
                With over a decade of experience helping clients achieve their fitness goals, Alex is dedicated to
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
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-yellow-400/30 to-teal-400/30 p-1 shadow-2xl">
                <img
                  src="/professional-fitness-trainer-portrait-in-gym.jpg"
                  alt="Alex Johnson - Personal Trainer"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-4 py-2 rounded-lg font-bold text-sm shadow-lg animate-pulse">
                10+ Years
              </div>
              <div
                className="absolute -bottom-4 -left-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg animate-pulse"
                style={{ animationDelay: "1s" }}
              >
                1000+ Clients
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
            <span className="text-yellow-400 font-semibold drop-shadow-lg">- Alex Johnson</span>
          </div>
        </div>
      </div>
    </section>
  )
}
