"use client"

import { ArrowRight, CheckCircle, Dumbbell, Heart, Target, Users, Clock, TrendingUp, Apple, Shield } from "lucide-react"
import StickyCardSection, { type Review } from "@/components/equipment-series"

const personalTrainingServices: Review[] = [
  {
    id: "01",
    clientName: "Comprehensive Fitness Assessment & Planning",
    title: "COMPLETE BODY ANALYSIS & PROGRAM DESIGN",
    timeframe: "Initial Consultation",
    review:
      "Every successful transformation begins with understanding your current state. I conduct comprehensive fitness assessments including body composition analysis, movement screening, postural evaluation, cardiovascular testing, and strength benchmarking. Based on your goals, lifestyle, and physical capabilities, I design a completely personalized training program that evolves with your progress.",
    backgroundColor: "bg-blue-600",
    rating: 5,
    results: [
      "InBody body composition analysis", 
      "Functional movement screen (FMS)", 
      "Customized periodized training plan",
      "Goal-specific exercise prescription",
      "Progress tracking metrics established"
    ],
  },
  {
    id: "02",
    clientName: "Precision Nutrition & Meal Planning",
    title: "EVIDENCE-BASED NUTRITIONAL STRATEGY",
    timeframe: "Ongoing Support",
    review:
      "Nutrition is 70% of your results. As a certified nutritionist, I create personalized meal plans based on your metabolic rate, body composition goals, food preferences, and lifestyle constraints. Whether it's weight loss, muscle gain, or performance optimization, I'll teach you sustainable eating habits that last a lifetime, not just quick fixes.",
    backgroundColor: "bg-green-600",
    rating: 5,
    results: [
      "Personalized macro & calorie calculations",
      "Custom meal plans & recipes",
      "Supplement recommendations",
      "Metabolic flexibility training",
      "Sustainable habit formation"
    ],
  },
  {
    id: "03",
    clientName: "Injury Prevention & Corrective Exercise",
    title: "BULLETPROOF YOUR BODY",
    timeframe: "Integrated Approach",
    review:
      "Having worked with physical therapists and sports medicine doctors, I specialize in corrective exercise and injury prevention. Through movement pattern analysis, muscle imbalance correction, and targeted mobility work, I'll address pain points and movement dysfunctions before they become injuries. Perfect for desk workers, athletes returning from injury, or anyone with chronic pain.",
    backgroundColor: "bg-red-600",
    rating: 5,
    results: [
      "Postural correction programs",
      "Pain reduction strategies",
      "Movement pattern optimization",
      "Joint mobility enhancement",
      "Injury prevention protocols"
    ],
  },
  {
    id: "04",
    clientName: "Elite Athletic Performance Training",
    title: "SPORT-SPECIFIC PERFORMANCE OPTIMIZATION",
    timeframe: "Seasonal Periodization",
    review:
      "Take your athletic performance to the next level with sport-specific training programs. I work with amateur and professional athletes to improve power, speed, agility, and endurance through scientifically-backed training methods including plyometrics, Olympic lifting variations, and advanced recovery protocols.",
    backgroundColor: "bg-orange-600",
    rating: 5,
    results: [
      "Sport-specific movement patterns",
      "Power & explosiveness development",
      "Advanced recovery protocols",
      "Competition preparation",
      "Performance testing & analytics"
    ],
  },
  {
    id: "05",
    clientName: "Body Transformation & Physique Development",
    title: "COMPLETE BODY RECOMPOSITION",
    timeframe: "12-24 Week Programs",
    review:
      "Whether you want to lose fat, build muscle, or completely transform your physique, I use proven bodybuilding and physique development techniques combined with cutting-edge science. This includes advanced training protocols, precise nutrition timing, and strategic supplementation for maximum results.",
    backgroundColor: "bg-purple-600",
    rating: 5,
    results: [
      "Body fat reduction strategies",
      "Lean muscle development",
      "Metabolic optimization",
      "Contest prep (if desired)",
      "Photoshoot preparation"
    ],
  },
  {
    id: "06",
    clientName: "Senior Fitness & Longevity Training",
    title: "ACTIVE AGING & FUNCTIONAL INDEPENDENCE",
    timeframe: "Lifelong Approach",
    review:
      "Specialized training for adults 50+ focusing on maintaining independence, preventing falls, preserving bone density, and improving quality of life. My programs emphasize functional movements, balance training, cognitive function maintenance, and age-appropriate strength training to help you stay active and independent for decades to come.",
    backgroundColor: "bg-teal-600",
    rating: 5,
    results: [
      "Fall prevention protocols",
      "Bone density preservation",
      "Cognitive function support",
      "Chronic disease management",
      "Independence maintenance"
    ],
  },
  {
    id: "07",
    clientName: "Mental Performance & Mindset Coaching",
    title: "PSYCHOLOGY OF PEAK PERFORMANCE",
    timeframe: "Integrated Coaching",
    review:
      "Success in fitness requires mental strength as much as physical capability. I integrate sports psychology principles, stress management techniques, habit formation science, and motivation strategies to help you overcome mental barriers, build confidence, and develop the mindset of a champion in fitness and life.",
    backgroundColor: "bg-indigo-600",
    rating: 5,
    results: [
      "Goal achievement psychology",
      "Stress management techniques",
      "Confidence building strategies",
      "Habit formation science",
      "Performance mindset development"
    ],
  },
  {
    id: "08",
    clientName: "Corporate Wellness & Executive Fitness",
    title: "HIGH-PERFORMANCE PROFESSIONAL TRAINING",
    timeframe: "Flexible Scheduling",
    review:
      "Designed for busy executives and professionals who need maximum results with minimal time investment. I create efficient, high-impact workouts that fit around demanding schedules, focusing on stress management, energy optimization, and maintaining peak physical condition for professional success.",
    backgroundColor: "bg-gray-700",
    rating: 5,
    results: [
      "Time-efficient workouts (20-45 min)",
      "Stress reduction protocols",
      "Energy optimization strategies",
      "Travel workout programs",
      "Executive health assessments"
    ],
  }
]

interface ServiceFeature {
  icon: React.ElementType
  title: string
  description: string
}

const coreFeatures: ServiceFeature[] = [
  {
    icon: Target,
    title: "Goal-Specific Programming",
    description: "Every program is tailored to your specific goals, timeline, and current fitness level"
  },
  {
    icon: Heart,
    title: "Health-First Approach",
    description: "Prioritizing long-term health and sustainability over quick fixes"
  },
  {
    icon: TrendingUp,
    title: "Data-Driven Results",
    description: "Regular assessments and progress tracking to optimize your program"
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    description: "Training sessions that fit your lifestyle and schedule"
  },
  {
    icon: Users,
    title: "Ongoing Support",
    description: "24/7 access to coaching support and program adjustments"
  },
  {
    icon: Shield,
    title: "Injury Prevention",
    description: "Focus on safe, proper form and movement patterns"
  }
]

export default function PersonalTrainingServices() {
  return (
    <>
      {/* Core Features Section */}
      <section className="py-16 bg-slate-900 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-400/5 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-8 h-0.5 bg-yellow-400"></div>
              <span className="text-sm font-medium text-yellow-400 uppercase tracking-wider">EXPERT TRAINING APPROACH</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-medium text-white max-w-4xl mx-auto leading-tight mb-6">
              COMPREHENSIVE FITNESS SOLUTIONS
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              With over a decade of experience and multiple certifications, I provide evidence-based training 
              methods that deliver sustainable results for clients at every fitness level.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreFeatures.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div key={index} className="bg-gray-800/60 rounded-xl p-6 shadow-lg hover:shadow-xl hover:bg-gray-800/80 transition-all duration-300 border border-gray-700/50">
                  <div className="bg-yellow-400 text-black p-3 rounded-lg w-fit mb-4">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Services Cards Section */}
      {/* <StickyCardSection
        id="personal-training-services"
        sectionTag="COMPREHENSIVE SERVICES"
        sectionTitle="EXPERT PERSONAL TRAINING SPECIALIZATIONS"
        reviews={personalTrainingServices}
        buttonText="Book Consultation"
        className="bg-gradient-to-br from-gray-900 via-gray-800 to-black"
      /> */}

      {/* Certification & Credibility Section */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-medium mb-8">
              CERTIFIED • EXPERIENCED • RESULTS-DRIVEN
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="space-y-2">
                <div className="text-4xl font-bold text-yellow-400">500+</div>
                <div className="text-sm uppercase tracking-wide text-gray-300">Clients Transformed</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-yellow-400">10+</div>
                <div className="text-sm uppercase tracking-wide text-gray-300">Years Experience</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-yellow-400">15+</div>
                <div className="text-sm uppercase tracking-wide text-gray-300">Certifications</div>
              </div>
            </div>
            <p className="text-lg text-gray-300 leading-relaxed">
              Certified Personal Trainer (NASM-CPT), Corrective Exercise Specialist (NASM-CES), 
              Precision Nutrition Coach, Functional Movement Screen Specialist, and continuing education 
              in sports psychology, injury prevention, and advanced training methodologies.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
