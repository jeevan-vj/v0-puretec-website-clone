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
  Trophy,
  Medal,
  Flag,
  MapPin,
  GraduationCap,
  Clock,
  Sparkles,
} from "lucide-react"

const stats = [
  { icon: Trophy, value: "3x", label: "Championship Winner", color: "text-yellow-400" },
  { icon: Medal, value: "6+", label: "Gold Medals", color: "text-yellow-400" },
  { icon: Flag, value: "1st", label: "Sri Lankan Winner", color: "text-green-400" },
  { icon: Users, value: "100+", label: "Clients Transformed", color: "text-teal-400" },
]

const specialties = [
  { name: "Natural Bodybuilding", icon: Dumbbell },
  { name: "Competition Prep", icon: Trophy },
  { name: "Weight Management", icon: TrendingUp },
  { name: "Nutrition Planning", icon: Heart },
  { name: "Strength Training", icon: Target },
  { name: "Recovery Techniques", icon: CheckCircle },
]

const certifications = [
  {
    title: "NZ Certificate in Exercise Level 4",
    organization: "Manukau Institute of Technology",
    year: "2022",
    description: "Personal Trainer Program"
  },
  {
    title: "Natural Bodybuilding Competitor",
    organization: "ICN New Zealand",
    year: "2022-2025",
    description: "Elite Level Athlete"
  },
]

const trainingSkills = [
  { name: "NATURAL", color: "text-green-400" },
  { name: "BODYBUILDING", color: "text-yellow-400" },
  { name: "COMPETITION", color: "text-red-400" },
  { name: "PREP", color: "text-purple-400" },
  { name: "NUTRITION", color: "text-teal-400" },
]

const achievements = [
  {
    year: "2022",
    title: "The Great Lake Muscle & Model Classic Championship",
    location: "Taupo, New Zealand",
    awards: [
      { type: "Gold", category: "Men's Physique First Timer", position: "1st" },
      { type: "Gold", category: "Men's Fitness Novice", position: "1st" },
      { type: "Silver", category: "Men's Fitness First Timer", position: "2nd" },
      { type: "Silver", category: "Men's Fitness Open", position: "2nd" },
    ],
    highlight: "First Competition Victory"
  },
  {
    year: "2022",
    title: "New Zealand National Muscle & Model Championship",
    location: "New Zealand",
    awards: [
      { type: "Gold", category: "Men's Fitness Novice", position: "1st" },
      { type: "Gold", category: "Men's Fitness Open", position: "1st" },
      { type: "Bronze", category: "Men's Physique 30+", position: "3rd" },
    ],
    highlight: "National Championship Trophy Winner"
  },
  {
    year: "2025",
    title: "South Island Muscle & Model Classic Championship",
    location: "Christchurch, New Zealand",
    awards: [
      { type: "Gold", category: "Men's Fitness Open", position: "1st" },
      { type: "Gold", category: "Men's Fitness 40+", position: "1st" },
      { type: "Silver", category: "Men's Physique 40+", position: "2nd" },
    ],
    highlight: "First Sri Lankan to Win Men's Fitness Model Championship in Christchurch"
  }
]

const journeyTimeline = [
  // {
  //   year: "2018",
  //   title: "Migration to New Zealand",
  //   description: "Moved from Dubai to New Zealand for work and residency",
  //   icon: MapPin,
  //   color: "text-blue-400",
  //   details: {
  //     content: "After working in Dubai, Ruwan made the life-changing decision to migrate to New Zealand in 2018. This move would eventually lead him to discover his passion for fitness and natural bodybuilding. The cultural shift and new environment provided the perfect backdrop for his transformation journey.",
  //     images: [
  //       "/professional-fitness-trainer-portrait-in-gym.jpg",
  //       "https://scontent.fakl1-4.fna.fbcdn.net/v/t39.30808-6/549744299_787666347341448_8296222060750083575_n.jpg?stp=c0.169.1536.1536a_cp6_dst-jpg_s552x414_tt6&_nc_cat=106&ccb=1-7&_nc_sid=50ad20&_nc_ohc=9oQ5US-_IHUQ7kNvwHdhvnK&_nc_oc=AdmQ-VLSLxs681bKpqLadsm14Ayw5Zj2GoMz7VopiU_Wtwsm6yPn4poI0O1dFtpwH6W61ky3AP_qFSCeloOCVCKP&_nc_zt=23&_nc_ht=scontent.fakl1-4.fna&_nc_gid=1Fc2sJooJqqUtfBnvDCmCg&oh=00_Afb-awQJ1nBHx6tucsNvvWYhZZJ6_TIsyzKUnyYQQmCUQw&oe=68DB9829"
  //     ],
  //     highlights: ["New Zealand Residency", "Career Transition", "Cultural Adaptation"]
  //   }
  // },
  // {
  //   year: "2020",
  //   title: "Transformation Journey Begins",
  //   description: "Saw a transformation picture on social media that changed everything",
  //   icon: Sparkles,
  //   color: "text-purple-400",
  //   details: {
  //     content: "The turning point came when Ruwan stumbled upon a transformation picture on social media. This single image sparked something inside him - a determination to change his life completely. He realized that if others could transform their bodies and lives, so could he. This moment of inspiration would set him on a path that would eventually lead to championship victories.",
  //     images: [
  //       "/before-transformation-out-of-shape-man.jpg",
  //       "/before-transformation-older-man-out-of-shape.jpg"
  //     ],
  //     highlights: ["Social Media Inspiration", "Life-Changing Moment", "Mental Shift"]
  //   }
  // },
  {
    year: "2021",
    title: "12-Week Program Success",
    description: "Lost 12kg in 12 weeks following proper nutrition and training",
    icon: TrendingUp,
    color: "text-green-400",
    details: {
      content: "Ruwan committed to a proper 12-week transformation program, following scientific nutrition and training principles. Through discipline, consistency, and trusting the process, he achieved remarkable results - losing 12kg in just 12 weeks. This success proved that with the right approach and dedication, transformation was not only possible but achievable.",
      images: [
        "/transformation-before-after-collage.jpg",
        "/before-after-fitness-transformation-documentary.jpg"
      ],
      highlights: ["12kg Weight Loss", "Scientific Approach", "Discipline & Consistency"]
    }
  },
  {
    year: "2022",
    title: "First Competition Victory",
    description: "Won first Gold medal at The Great Lake Muscle & Model Classic",
    icon: Trophy,
    color: "text-yellow-400",
    details: {
      content: "After 16 weeks of intense preparation, Ruwan competed in his first bodybuilding competition - The Great Lake Muscle & Model Classic Championship in Taupo, New Zealand. Against all odds, he won his first Gold medal in Men's Physique First Timer category, proving that his transformation was not just physical but mental as well.",
      images: [
        "https://scontent.fakl1-4.fna.fbcdn.net/v/t39.30808-6/549744299_787666347341448_8296222060750083575_n.jpg?stp=c0.169.1536.1536a_cp6_dst-jpg_s552x414_tt6&_nc_cat=106&ccb=1-7&_nc_sid=50ad20&_nc_ohc=9oQ5US-_IHUQ7kNvwHdhvnK&_nc_oc=AdmQ-VLSLxs681bKpqLadsm14Ayw5Zj2GoMz7VopiU_Wtwsm6yPn4poI0O1dFtpwH6W61ky3AP_qFSCeloOCVCKP&_nc_zt=23&_nc_ht=scontent.fakl1-4.fna&_nc_gid=1Fc2sJooJqqUtfBnvDCmCg&oh=00_Afb-awQJ1nBHx6tucsNvvWYhZZJ6_TIsyzKUnyYQQmCUQw&oe=68DB9829",
        "https://scontent.fakl1-3.fna.fbcdn.net/v/t39.30808-6/548215441_787666307341452_8148520755277527195_n.jpg?stp=c0.169.1536.1536a_cp6_dst-jpg_s552x414_tt6&_nc_cat=105&ccb=1-7&_nc_sid=50ad20&_nc_ohc=xSeKEYP2hk0Q7kNvwHMRFak&_nc_oc=Adk-QCXdek2BJQ1xlLgriwCautd7MH_P9Jki5LZBoPp87m5geZsVhJnFmis3vJQpdVuKnMWW_N1aQZmlPnKgqkI0&_nc_zt=23&_nc_ht=scontent.fakl1-3.fna&_nc_gid=1Fc2sJooJqqUtfBnvDCmCg&oh=00_Afb58Lrlb2Oy-A9n19rZoYdDP0GugGSwwWG5pi5pgl6p9A&oe=68DBAECC"
      ],
      highlights: ["First Gold Medal", "16-Week Prep", "Taupo Championship"]
    }
  },
  {
    year: "2022",
    title: "NZ Qualified Trainer",
    description: "Graduated from Manukau Institute of Technology as certified trainer",
    icon: GraduationCap,
    color: "text-teal-400",
    details: {
      content: "Recognizing his passion for helping others achieve their fitness goals, Ruwan enrolled in the NZ Certificate in Exercise Level 4 program at Manukau Institute of Technology. He graduated as a qualified personal trainer, combining his practical experience with scientific knowledge to help others transform their lives.",
      images: [
        "/fitness-trainer-award-certificate-ceremony.jpg",
        "/fitness-trainer-award-certificate-close-up.jpg"
      ],
      highlights: ["NZ Certificate Level 4", "Scientific Knowledge", "Professional Qualification"]
    }
  },
  {
    year: "2025",
    title: "Historic Achievement",
    description: "First Sri Lankan to win Men's Fitness Model Championship in Christchurch",
    icon: Flag,
    color: "text-red-400",
    details: {
      content: "In a historic moment for Sri Lankan fitness, Ruwan became the first Sri Lankan to win the Men's Fitness Model Championship at the South Island Muscle & Model Classic Championship in Christchurch, New Zealand. This achievement not only marked his personal success but also inspired countless others from his homeland to pursue their fitness dreams.",
      images: [
        "https://scontent.fakl1-3.fna.fbcdn.net/v/t39.30808-6/547915185_787666300674786_3781282252748569396_n.jpg?stp=c0.73.1826.1826a_cp6_dst-jpg_s552x414_tt6&_nc_cat=109&ccb=1-7&_nc_sid=50ad20&_nc_ohc=5Z5Yx_aJ-A0Q7kNvwF60qNM&_nc_oc=AdkC-HeYi_DleeFQrk50kxHTPLjTKJG4jGMSATfP6xxWO2XRJNfhV_TOMp1slo8sSOUbLO9kJqrvEPrxqtGUigFh&_nc_zt=23&_nc_ht=scontent.fakl1-3.fna&_nc_gid=1Fc2sJooJqqUtfBnvDCmCg&oh=00_AfYPtM4iI1xbbY1ARLrqLM3vg5W5NLWgt9WNZEzPaWPiqA&oe=68DB9F42",
        "/fitness-trainer-award-trophy-display.jpg"
      ],
      highlights: ["First Sri Lankan Winner", "Historic Achievement", "Christchurch Championship"]
    }
  }
]

export default function AboutTrainer() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [currentImages, setCurrentImages] = useState<string[]>([])
  const [visibleTimelineItems, setVisibleTimelineItems] = useState<Set<number>>(new Set())
  const sectionRef = useRef<HTMLElement>(null)
  const timelineItemRefs = useRef<(HTMLDivElement | null)[]>([])

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

  // Timeline items intersection observer
  useEffect(() => {
    const timelineObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-timeline-index') || '0')
            setVisibleTimelineItems(prev => new Set([...prev, index]))
          }
        })
      },
      { 
        threshold: 0.3,
        rootMargin: '-50px 0px -50px 0px'
      }
    )

    timelineItemRefs.current.forEach((ref) => {
      if (ref) {
        timelineObserver.observe(ref)
      }
    })

    return () => timelineObserver.disconnect()
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
             RUWAN PALIHAWADANA
            </span>
          </h2>
        </div>

        {/* Hero Story Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <div
            className={`bg-gradient-to-r from-yellow-400/10 via-transparent to-teal-400/10 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-white/10 shadow-2xl transform transition-all duration-800 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: isVisible ? "400ms" : "0ms" }}
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <Flag className="w-6 h-6 text-green-400" />
                  <span className="text-green-400 font-semibold text-lg">First Sri Lankan Champion</span>
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                  From Ordinary to 
                  <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent"> Extraordinary</span>
                </h3>
                <p className="text-lg text-gray-200 leading-relaxed">
                  Born and raised in Sri Lanka, Ruwan's journey took him from Dubai to New Zealand in 2018. 
                  What started as a normal life with work and routine became a transformation story that would 
                  make history in New Zealand's fitness scene.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  After seeing a transformation picture on social media, Ruwan decided to change his life. 
                  Following a proper 12-week program, he lost 12kg and discovered his passion for natural bodybuilding. 
                  This led to his first competition victory and eventually becoming the first Sri Lankan to win 
                  a Men's Fitness Model Championship in Christchurch, New Zealand.
                </p>
                <div className="flex flex-wrap gap-3">
                  {trainingSkills.map((skill, index) => (
                    <Badge
                      key={skill.name}
                      className={`${skill.color} bg-black/50 border border-current/30 px-4 py-2 text-sm font-bold transform transition-all duration-500 hover:scale-105`}
                      style={{
                        transitionDelay: isVisible ? `${600 + index * 100}ms` : "0ms",
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? "translateY(0)" : "translateY(20px)",
                      }}
                    >
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-yellow-400/20 to-teal-400/20 p-1">
                  <img
                    src="/professional-fitness-trainer-portrait-in-gym.jpg"
                    alt="Ruwan Palihawadana - Champion"
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-4 py-2 rounded-lg font-bold text-sm shadow-lg">
                    CHAMPION
                  </div>
                  <div className="absolute bottom-4 left-4 bg-gradient-to-r from-green-400 to-green-500 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg">
                    🇱🇰 FIRST SRI LANKAN
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Journey Timeline */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              The <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">Journey</span>
            </h3>
            <p className="text-gray-300 text-lg">From transformation to championship</p>
          </div>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 w-0.5 bg-gradient-to-b from-yellow-400 via-teal-400 to-green-400 transition-all duration-1000 ease-out"
                 style={{
                   height: isVisible ? "100%" : "0%",
                   transitionDelay: isVisible ? "500ms" : "0ms"
                 }}></div>
            
            <div className="space-y-8">
              {journeyTimeline.map((item, index) => {
                const Icon = item.icon
                const isExpanded = expandedCard === index
                const isTimelineItemVisible = visibleTimelineItems.has(index)
                return (
                  <div
                    key={index}
                    ref={(el) => {
                      timelineItemRefs.current[index] = el
                    }}
                    data-timeline-index={index}
                    className={`relative flex items-start gap-8 transform transition-all duration-700 ${
                      isTimelineItemVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                    }`}
                    style={{ 
                      transitionDelay: isTimelineItemVisible ? `${index * 200}ms` : "0ms",
                      transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)"
                    }}
                  >
                    {/* Timeline Dot */}
                    <div 
                      className={`relative z-10 w-16 h-16 rounded-full bg-gradient-to-r from-yellow-400 to-teal-400 flex items-center justify-center shadow-lg ${item.color} cursor-pointer hover:scale-110 transition-all duration-500 transform ${
                        isTimelineItemVisible ? "scale-100 rotate-0" : "scale-0 rotate-180"
                      } ${isTimelineItemVisible ? "animate-pulse" : ""}`}
                      style={{
                        transitionDelay: isTimelineItemVisible ? `${index * 200 + 100}ms` : "0ms",
                        transitionTimingFunction: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
                        animationDelay: isTimelineItemVisible ? `${index * 200 + 1000}ms` : "0ms",
                        animationDuration: "2s",
                        animationIterationCount: "3"
                      }}
                      onClick={() => setExpandedCard(isExpanded ? null : index)}
                    >
                      <Icon className={`w-8 h-8 text-white transition-all duration-500 ${
                        isTimelineItemVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
                      }`} 
                      style={{
                        transitionDelay: isTimelineItemVisible ? `${index * 200 + 200}ms` : "0ms"
                      }}
                      />
                    </div>
                    
                    {/* Collapsible Content Card */}
                    <div className={`flex-1 bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-white/10 shadow-xl transition-all duration-700 overflow-hidden transform ${
                      isTimelineItemVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    } ${
                      isExpanded ? 'shadow-2xl scale-105' : 'hover:shadow-2xl hover:scale-105'
                    }`}
                    style={{
                      transitionDelay: isTimelineItemVisible ? `${index * 200 + 300}ms` : "0ms",
                      transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)"
                    }}>
                      {/* Card Header - Always Visible */}
                      <div 
                        className="p-6 cursor-pointer"
                        onClick={() => setExpandedCard(isExpanded ? null : index)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <span className="text-2xl font-bold text-yellow-400">{item.year}</span>
                            <h4 className="text-xl font-bold text-white">{item.title}</h4>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-400">Click to {isExpanded ? 'collapse' : 'expand'}</span>
                            <div className={`w-6 h-6 rounded-full bg-yellow-400/20 flex items-center justify-center transition-transform duration-300 ${
                              isExpanded ? 'rotate-180' : ''
                            }`}>
                              <ArrowRight className="w-4 h-4 text-yellow-400 transform rotate-90" />
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-300 leading-relaxed mt-3">{item.description}</p>
                      </div>

                      {/* Expanded Content */}
                      <div className={`transition-all duration-500 overflow-hidden ${
                        isExpanded ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                      }`}>
                        <div className="px-6 pb-6 border-t border-white/10">
                          {/* Detailed Content */}
                          <div className="mt-6">
                            <p className="text-gray-200 leading-relaxed mb-6">{item.details.content}</p>
                            
                            {/* Highlights */}
                            <div className="flex flex-wrap gap-2 mb-6">
                              {item.details.highlights.map((highlight, highlightIndex) => (
                                <Badge
                                  key={highlightIndex}
                                  className="bg-yellow-400/20 text-yellow-400 border border-yellow-400/30 px-3 py-1 text-xs font-medium"
                                >
                                  {highlight}
                                </Badge>
                              ))}
                            </div>

                            {/* Image Gallery */}
                            {item.details.images && item.details.images.length > 0 && (
                              <div className="space-y-4">
                                <h5 className="text-lg font-semibold text-white mb-3">Gallery</h5>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {item.details.images.map((image, imageIndex) => (
                                    <div
                                      key={imageIndex}
                                      className="relative group cursor-pointer"
                                      onClick={() => {
                                        setCurrentImages(item.details.images)
                                        setSelectedImageIndex(imageIndex)
                                        setIsImageModalOpen(true)
                                      }}
                                    >
                                      <div className="aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-yellow-400/20 to-teal-400/20 p-1">
                                        <img
                                          src={image}
                                          alt={`${item.title} - Image ${imageIndex + 1}`}
                                          className="w-full h-full object-cover rounded-md group-hover:scale-105 transition-transform duration-300"
                                        />
                                      </div>
                                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                                          <ArrowRight className="w-6 h-6 text-white" />
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Modern Achievements Showcase */}
        <div className="max-w-7xl mx-auto mb-20">
          <div className="text-center mb-16">
            <h3 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Championship <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">Showcase</span>
            </h3>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto">
              A visual journey through Ruwan's championship victories and historic achievements
            </p>
          </div>
          
          {/* Interactive Event Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm border border-white/10 shadow-2xl transform transition-all duration-700 hover:scale-105 hover:shadow-3xl ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: isVisible ? `${1000 + index * 200}ms` : "0ms" }}
              >
                {/* Hero Image Section */}
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-teal-400/20"></div>
                  <img
                    src={index === 0 ? "https://scontent.fakl1-4.fna.fbcdn.net/v/t39.30808-6/549744299_787666347341448_8296222060750083575_n.jpg?stp=c0.169.1536.1536a_cp6_dst-jpg_s552x414_tt6&_nc_cat=106&ccb=1-7&_nc_sid=50ad20&_nc_ohc=9oQ5US-_IHUQ7kNvwHdhvnK&_nc_oc=AdmQ-VLSLxs681bKpqLadsm14Ayw5Zj2GoMz7VopiU_Wtwsm6yPn4poI0O1dFtpwH6W61ky3AP_qFSCeloOCVCKP&_nc_zt=23&_nc_ht=scontent.fakl1-4.fna&_nc_gid=1Fc2sJooJqqUtfBnvDCmCg&oh=00_Afb-awQJ1nBHx6tucsNvvWYhZZJ6_TIsyzKUnyYQQmCUQw&oe=68DB9829" :
                         index === 1 ? "https://scontent.fakl1-3.fna.fbcdn.net/v/t39.30808-6/548215441_787666307341452_8148520755277527195_n.jpg?stp=c0.169.1536.1536a_cp6_dst-jpg_s552x414_tt6&_nc_cat=105&ccb=1-7&_nc_sid=50ad20&_nc_ohc=xSeKEYP2hk0Q7kNvwHMRFak&_nc_oc=Adk-QCXdek2BJQ1xlLgriwCautd7MH_P9Jki5LZBoPp87m5geZsVhJnFmis3vJQpdVuKnMWW_N1aQZmlPnKgqkI0&_nc_zt=23&_nc_ht=scontent.fakl1-3.fna&_nc_gid=1Fc2sJooJqqUtfBnvDCmCg&oh=00_Afb58Lrlb2Oy-A9n19rZoYdDP0GugGSwwWG5pi5pgl6p9A&oe=68DBAECC" :
                         "https://scontent.fakl1-3.fna.fbcdn.net/v/t39.30808-6/547915185_787666300674786_3781282252748569396_n.jpg?stp=c0.73.1826.1826a_cp6_dst-jpg_s552x414_tt6&_nc_cat=109&ccb=1-7&_nc_sid=50ad20&_nc_ohc=5Z5Yx_aJ-A0Q7kNvwF60qNM&_nc_oc=AdkC-HeYi_DleeFQrk50kxHTPLjTKJG4jGMSATfP6xxWO2XRJNfhV_TOMp1slo8sSOUbLO9kJqrvEPrxqtGUigFh&_nc_zt=23&_nc_ht=scontent.fakl1-3.fna&_nc_gid=1Fc2sJooJqqUtfBnvDCmCg&oh=00_AfYPtM4iI1xbbY1ARLrqLM3vg5W5NLWgt9WNZEzPaWPiqA&oe=68DB9F42"}
                    alt={achievement.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Overlay with Trophy Icon */}
                  <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                    <Trophy className="w-8 h-8 text-black" />
                  </div>
                  
                  {/* Year Badge */}
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm rounded-full px-4 py-2">
                    <span className="text-yellow-400 font-bold text-lg">{achievement.year}</span>
                  </div>
                  
                  {/* Highlight Badge */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-4 py-2 rounded-lg font-bold text-sm text-center">
                      {achievement.highlight}
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <div className="mb-4">
                    <h4 className="text-xl font-bold text-white mb-2 line-clamp-2">{achievement.title}</h4>
                    <div className="flex items-center gap-2 text-gray-300 mb-4">
                      <MapPin className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm">{achievement.location}</span>
                    </div>
                  </div>
                  
                  {/* Awards Grid */}
                  <div className="space-y-3">
                    {achievement.awards.map((award, awardIndex) => (
                      <div
                        key={awardIndex}
                        className="flex items-center gap-3 p-3 bg-black/30 rounded-lg border border-white/10 hover:bg-black/50 transition-colors duration-200"
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          award.type === 'Gold' ? 'bg-yellow-400' : 
                          award.type === 'Silver' ? 'bg-gray-300' : 'bg-orange-400'
                        }`}>
                          <Medal className={`w-4 h-4 ${
                            award.type === 'Gold' ? 'text-black' : 'text-black'
                          }`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-white font-semibold text-sm truncate">{award.category}</div>
                          <div className="text-gray-300 text-xs">{award.type} - {award.position} Place</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* View Details Button */}
                  <button 
                    className="w-full mt-4 bg-gradient-to-r from-yellow-400/20 to-teal-400/20 hover:from-yellow-400/30 hover:to-teal-400/30 border border-yellow-400/30 text-yellow-400 py-2 px-4 rounded-lg font-medium transition-all duration-200 hover:scale-105"
                    onClick={() => {
                      setCurrentImages([
                        index === 0 ? "https://scontent.fakl1-4.fna.fbcdn.net/v/t39.30808-6/549744299_787666347341448_8296222060750083575_n.jpg?stp=c0.169.1536.1536a_cp6_dst-jpg_s552x414_tt6&_nc_cat=106&ccb=1-7&_nc_sid=50ad20&_nc_ohc=9oQ5US-_IHUQ7kNvwHdhvnK&_nc_oc=AdmQ-VLSLxs681bKpqLadsm14Ayw5Zj2GoMz7VopiU_Wtwsm6yPn4poI0O1dFtpwH6W61ky3AP_qFSCeloOCVCKP&_nc_zt=23&_nc_ht=scontent.fakl1-4.fna&_nc_gid=1Fc2sJooJqqUtfBnvDCmCg&oh=00_Afb-awQJ1nBHx6tucsNvvWYhZZJ6_TIsyzKUnyYQQmCUQw&oe=68DB9829" :
                        index === 1 ? "https://scontent.fakl1-3.fna.fbcdn.net/v/t39.30808-6/548215441_787666307341452_8148520755277527195_n.jpg?stp=c0.169.1536.1536a_cp6_dst-jpg_s552x414_tt6&_nc_cat=105&ccb=1-7&_nc_sid=50ad20&_nc_ohc=xSeKEYP2hk0Q7kNvwHMRFak&_nc_oc=Adk-QCXdek2BJQ1xlLgriwCautd7MH_P9Jki5LZBoPp87m5geZsVhJnFmis3vJQpdVuKnMWW_N1aQZmlPnKgqkI0&_nc_zt=23&_nc_ht=scontent.fakl1-3.fna&_nc_gid=1Fc2sJooJqqUtfBnvDCmCg&oh=00_Afb58Lrlb2Oy-A9n19rZoYdDP0GugGSwwWG5pi5pgl6p9A&oe=68DBAECC" :
                        "https://scontent.fakl1-3.fna.fbcdn.net/v/t39.30808-6/547915185_787666300674786_3781282252748569396_n.jpg?stp=c0.73.1826.1826a_cp6_dst-jpg_s552x414_tt6&_nc_cat=109&ccb=1-7&_nc_sid=50ad20&_nc_ohc=5Z5Yx_aJ-A0Q7kNvwF60qNM&_nc_oc=AdkC-HeYi_DleeFQrk50kxHTPLjTKJG4jGMSATfP6xxWO2XRJNfhV_TOMp1slo8sSOUbLO9kJqrvEPrxqtGUigFh&_nc_zt=23&_nc_ht=scontent.fakl1-3.fna&_nc_gid=1Fc2sJooJqqUtfBnvDCmCg&oh=00_AfYPtM4iI1xbbY1ARLrqLM3vg5W5NLWgt9WNZEzPaWPiqA&oe=68DB9F42"
                      ])
                      setSelectedImageIndex(0)
                      setIsImageModalOpen(true)
                    }}
                  >
                    View Full Gallery
                    <ArrowRight className="inline-block ml-2 w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modern Image Carousel Section */}
        <div className="max-w-7xl mx-auto mb-20">
          <div className="text-center mb-12">
            {/* <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Visual <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">Journey</span>
            </h3> */}
            <p className="text-gray-300 text-lg">Moments that defined the championship path</p>
          </div>
          
          {/* Horizontal Scrolling Gallery */}
          <div className="relative">
            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
              {[
                {
                  src: "https://scontent.fakl1-4.fna.fbcdn.net/v/t39.30808-6/549744299_787666347341448_8296222060750083575_n.jpg?stp=c0.169.1536.1536a_cp6_dst-jpg_s552x414_tt6&_nc_cat=106&ccb=1-7&_nc_sid=50ad20&_nc_ohc=9oQ5US-_IHUQ7kNvwHdhvnK&_nc_oc=AdmQ-VLSLxs681bKpqLadsm14Ayw5Zj2GoMz7VopiU_Wtwsm6yPn4poI0O1dFtpwH6W61ky3AP_qFSCeloOCVCKP&_nc_zt=23&_nc_ht=scontent.fakl1-4.fna&_nc_gid=1Fc2sJooJqqUtfBnvDCmCg&oh=00_Afb-awQJ1nBHx6tucsNvvWYhZZJ6_TIsyzKUnyYQQmCUQw&oe=68DB9829",
                  title: "First Gold Victory",
                  year: "2022",
                  description: "The Great Lake Muscle & Model Classic"
                },
                {
                  src: "https://scontent.fakl1-3.fna.fbcdn.net/v/t39.30808-6/548215441_787666307341452_8148520755277527195_n.jpg?stp=c0.169.1536.1536a_cp6_dst-jpg_s552x414_tt6&_nc_cat=105&ccb=1-7&_nc_sid=50ad20&_nc_ohc=xSeKEYP2hk0Q7kNvwHMRFak&_nc_oc=Adk-QCXdek2BJQ1xlLgriwCautd7MH_P9Jki5LZBoPp87m5geZsVhJnFmis3vJQpdVuKnMWW_N1aQZmlPnKgqkI0&_nc_zt=23&_nc_ht=scontent.fakl1-3.fna&_nc_gid=1Fc2sJooJqqUtfBnvDCmCg&oh=00_Afb58Lrlb2Oy-A9n19rZoYdDP0GugGSwwWG5pi5pgl6p9A&oe=68DBAECC",
                  title: "National Championship",
                  year: "2022",
                  description: "NZ National Muscle & Model Championship"
                },
                {
                  src: "https://scontent.fakl1-3.fna.fbcdn.net/v/t39.30808-6/547915185_787666300674786_3781282252748569396_n.jpg?stp=c0.73.1826.1826a_cp6_dst-jpg_s552x414_tt6&_nc_cat=109&ccb=1-7&_nc_sid=50ad20&_nc_ohc=5Z5Yx_aJ-A0Q7kNvwF60qNM&_nc_oc=AdkC-HeYi_DleeFQrk50kxHTPLjTKJG4jGMSATfP6xxWO2XRJNfhV_TOMp1slo8sSOUbLO9kJqrvEPrxqtGUigFh&_nc_zt=23&_nc_ht=scontent.fakl1-3.fna&_nc_gid=1Fc2sJooJqqUtfBnvDCmCg&oh=00_AfYPtM4iI1xbbY1ARLrqLM3vg5W5NLWgt9WNZEzPaWPiqA&oe=68DB9F42",
                  title: "Historic Achievement",
                  year: "2025",
                  description: "First Sri Lankan Winner in Christchurch"
                },
                {
                  src: "/fitness-trainer-award-trophy-display.jpg",
                  title: "Championship Trophy",
                  year: "2025",
                  description: "Men's Fitness Model Championship"
                },
                {
                  src: "/fitness-trainer-award-certificate-ceremony.jpg",
                  title: "Professional Certification",
                  year: "2022",
                  description: "NZ Qualified Personal Trainer"
                },
                {
                  src: "/transformation-before-after-collage.jpg",
                  title: "Transformation Journey",
                  year: "2021",
                  description: "12kg Weight Loss Success"
                }
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-80 group cursor-pointer"
                  onClick={() => {
                    setCurrentImages([
                      "https://scontent.fakl1-4.fna.fbcdn.net/v/t39.30808-6/549744299_787666347341448_8296222060750083575_n.jpg?stp=c0.169.1536.1536a_cp6_dst-jpg_s552x414_tt6&_nc_cat=106&ccb=1-7&_nc_sid=50ad20&_nc_ohc=9oQ5US-_IHUQ7kNvwHdhvnK&_nc_oc=AdmQ-VLSLxs681bKpqLadsm14Ayw5Zj2GoMz7VopiU_Wtwsm6yPn4poI0O1dFtpwH6W61ky3AP_qFSCeloOCVCKP&_nc_zt=23&_nc_ht=scontent.fakl1-4.fna&_nc_gid=1Fc2sJooJqqUtfBnvDCmCg&oh=00_Afb-awQJ1nBHx6tucsNvvWYhZZJ6_TIsyzKUnyYQQmCUQw&oe=68DB9829",
                      "https://scontent.fakl1-3.fna.fbcdn.net/v/t39.30808-6/548215441_787666307341452_8148520755277527195_n.jpg?stp=c0.169.1536.1536a_cp6_dst-jpg_s552x414_tt6&_nc_cat=105&ccb=1-7&_nc_sid=50ad20&_nc_ohc=xSeKEYP2hk0Q7kNvwHMRFak&_nc_oc=Adk-QCXdek2BJQ1xlLgriwCautd7MH_P9Jki5LZBoPp87m5geZsVhJnFmis3vJQpdVuKnMWW_N1aQZmlPnKgqkI0&_nc_zt=23&_nc_ht=scontent.fakl1-3.fna&_nc_gid=1Fc2sJooJqqUtfBnvDCmCg&oh=00_Afb58Lrlb2Oy-A9n19rZoYdDP0GugGSwwWG5pi5pgl6p9A&oe=68DBAECC",
                      "https://scontent.fakl1-3.fna.fbcdn.net/v/t39.30808-6/547915185_787666300674786_3781282252748569396_n.jpg?stp=c0.73.1826.1826a_cp6_dst-jpg_s552x414_tt6&_nc_cat=109&ccb=1-7&_nc_sid=50ad20&_nc_ohc=5Z5Yx_aJ-A0Q7kNvwF60qNM&_nc_oc=AdkC-HeYi_DleeFQrk50kxHTPLjTKJG4jGMSATfP6xxWO2XRJNfhV_TOMp1slo8sSOUbLO9kJqrvEPrxqtGUigFh&_nc_zt=23&_nc_ht=scontent.fakl1-3.fna&_nc_gid=1Fc2sJooJqqUtfBnvDCmCg&oh=00_AfYPtM4iI1xbbY1ARLrqLM3vg5W5NLWgt9WNZEzPaWPiqA&oe=68DB9F42",
                      "/fitness-trainer-award-trophy-display.jpg",
                      "/fitness-trainer-award-certificate-ceremony.jpg",
                      "/transformation-before-after-collage.jpg"
                    ])
                    setSelectedImageIndex(index)
                    setIsImageModalOpen(true)
                  }}
                >
                  <div className="relative h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-yellow-400/20 to-teal-400/20 p-1 group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover rounded-xl"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <h4 className="text-white font-bold text-lg mb-1">{item.title}</h4>
                        <p className="text-gray-200 text-sm mb-2">{item.description}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-400 font-bold text-sm">{item.year}</span>
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Year Badge */}
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-yellow-400 font-bold text-sm">{item.year}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Scroll Indicator */}
            <div className="flex justify-center mt-6">
              <div className="flex gap-2">
                {[1, 2, 3].map((dot) => (
                  <div key={dot} className="w-2 h-2 bg-white/30 rounded-full"></div>
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
                  <p className="text-xs text-gray-400 mb-2 drop-shadow-lg">{cert.description}</p>
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

        {/* Call to Action */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <div
            className={`bg-gradient-to-r from-yellow-400/20 via-transparent to-teal-400/20 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-white/10 shadow-2xl transform transition-all duration-800 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: isVisible ? "1500ms" : "0ms" }}
          >
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Start Your <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">Transformation?</span>
            </h3>
            <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
              Join Ruwan's proven program and experience the same dedication, science-based approach, 
              and championship mindset that led to his historic achievements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 px-8 py-4 text-lg font-bold tracking-wide uppercase hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-8 py-4 text-lg font-bold tracking-wide uppercase hover:scale-105 transition-all duration-300">
                Free Consultation
              </Button>
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
            "I've been where you are - struggling with weight, lacking confidence, and feeling lost in the fitness world. 
            I understand the frustration of trying everything without seeing results. That's why I'm here to share the 
            scientific approach that transformed my life and made me a champion. Trust the process, stay consistent, 
            and let me guide you to unleash your full potential."
          </blockquote>
          <div className="mt-6">
            <span className="text-yellow-400 font-semibold drop-shadow-lg">- Ruwan Palihawadana</span>
            <p className="text-sm text-gray-400 mt-2">Natural Bodybuilding Champion & NZ Qualified Trainer</p>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {isImageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
          <div className="relative max-w-4xl max-h-[90vh] w-full mx-4">
            {/* Close Button */}
            <button
              onClick={() => setIsImageModalOpen(false)}
              className="absolute -top-12 right-0 z-10 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
            >
              <span className="text-white text-xl font-bold">×</span>
            </button>

            {/* Main Image */}
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-yellow-400/20 to-teal-400/20 p-1">
              <img
                src={currentImages[selectedImageIndex]}
                alt={`Gallery Image ${selectedImageIndex + 1}`}
                className="w-full h-full max-h-[70vh] object-contain rounded-xl"
              />
            </div>

            {/* Navigation */}
            {currentImages.length > 1 && (
              <>
                {/* Previous Button */}
                {selectedImageIndex > 0 && (
                  <button
                    onClick={() => setSelectedImageIndex(selectedImageIndex - 1)}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
                    title="Previous image"
                    aria-label="Previous image"
                  >
                    <ArrowRight className="w-6 h-6 text-white transform rotate-180" />
                  </button>
                )}

                {/* Next Button */}
                {selectedImageIndex < currentImages.length - 1 && (
                  <button
                    onClick={() => setSelectedImageIndex(selectedImageIndex + 1)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
                    title="Next image"
                    aria-label="Next image"
                  >
                    <ArrowRight className="w-6 h-6 text-white" />
                  </button>
                )}

                {/* Thumbnail Strip */}
                <div className="flex gap-2 mt-4 justify-center overflow-x-auto">
                  {currentImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        index === selectedImageIndex
                          ? 'border-yellow-400 scale-110'
                          : 'border-white/30 hover:border-white/60'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  )
}