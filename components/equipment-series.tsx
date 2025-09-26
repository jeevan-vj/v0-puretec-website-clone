"use client"

import { ArrowRight, Star } from "lucide-react"

const transformationReviews = [
  {
    id: "01",
    clientName: "Marcus Johnson",
    title: "Lost 35 lbs & Built Lean Muscle",
    timeframe: "12 Weeks",
    review:
      "I never thought I could achieve this kind of transformation. Working with the team at Puretec changed everything - not just my body, but my entire mindset about fitness. The personalized training program and nutrition guidance helped me lose 35 pounds while actually building muscle. I feel stronger and more confident than ever before.",
    beforeImage: "/before-transformation-overweight-man.jpg",
    afterImage: "/after-transformation-fit-muscular-man.jpg",
    backgroundColor: "bg-teal-500",
    rating: 5,
    results: ["35 lbs weight loss", "15% body fat reduction", "Gained lean muscle mass"],
  },
  {
    id: "02",
    clientName: "Sarah Chen",
    title: "From Beginner to Fitness Enthusiast",
    timeframe: "16 Weeks",
    review:
      "Starting my fitness journey was intimidating, but the supportive environment and expert guidance made all the difference. I went from barely being able to do a push-up to deadlifting my body weight. The transformation isn't just physical - I have so much more energy and confidence in all areas of my life.",
    beforeImage: "/before-transformation-woman-beginner-fitness.jpg",
    afterImage: "/after-transformation-strong-athletic-woman.jpg",
    backgroundColor: "bg-gray-500",
    rating: 5,
    results: ["20 lbs weight loss", "Increased strength 300%", "Improved endurance"],
  },
  {
    id: "03",
    clientName: "David Rodriguez",
    title: "Regained My Athletic Performance",
    timeframe: "20 Weeks",
    review:
      "After years of desk work, I felt like I'd lost my athletic edge completely. The customized program helped me not only get back in shape but exceed my previous fitness levels. The combination of strength training, cardio, and proper nutrition brought back the athlete I used to be - and then some.",
    beforeImage: "/before-transformation-out-of-shape-man-office-work.jpg",
    afterImage: "/after-transformation-athletic-muscular-man.jpg",
    backgroundColor: "bg-red-600",
    rating: 5,
    results: ["25 lbs weight loss", "Regained athletic performance", "Improved flexibility"],
  },
  {
    id: "04",
    clientName: "Jennifer Walsh",
    title: "Post-Pregnancy Transformation",
    timeframe: "24 Weeks",
    review:
      "Getting back in shape after having my second child seemed impossible until I found this program. The trainers understood my unique challenges as a new mom and created a plan that worked around my schedule. I not only got my pre-pregnancy body back but I'm actually in the best shape of my life.",
    beforeImage: "/before-transformation-post-pregnancy-woman.jpg",
    afterImage: "/after-transformation-fit-toned-mother.jpg",
    backgroundColor: "bg-purple-600",
    rating: 5,
    results: ["30 lbs weight loss", "Regained core strength", "Increased energy levels"],
  },
  {
    id: "05",
    clientName: "Robert Kim",
    title: "Senior Fitness Success Story",
    timeframe: "18 Weeks",
    review:
      "At 55, I thought my best fitness days were behind me. This program proved me completely wrong. The age-appropriate training methods helped me build strength I haven't had in decades while being gentle on my joints. I feel 20 years younger and have inspired my whole family to prioritize their health.",
    beforeImage: "/before-transformation-older-man-out-of-shape.jpg",
    afterImage: "/after-transformation-fit-healthy-senior-man.jpg",
    backgroundColor: "bg-orange-600",
    rating: 5,
    results: ["22 lbs weight loss", "Improved mobility", "Reduced joint pain"],
  },
]

export default function EquipmentSeries() {
  return (
    <section id="equipment-series" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-8 h-0.5 bg-black"></div>
            <span className="text-sm font-medium text-black uppercase tracking-wider">CLIENT SUCCESS STORIES</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-medium text-black max-w-4xl mx-auto leading-tight">
            REAL TRANSFORMATIONS, REAL RESULTS
          </h2>
        </div>

        <div className="space-y-12">
          {transformationReviews.map((review, index) => (
            <div
              key={review.id}
              className={`sticky top-4 rounded-2xl overflow-hidden shadow-xl ${review.backgroundColor} ${
                index > 0 ? "mt-12" : ""
              }`}
              style={{ zIndex: index + 10 }}
            >
              <div className="grid lg:grid-cols-[1fr_0.75fr] gap-8 p-8 lg:p-12 items-center min-h-[500px]">
                <div className="space-y-6 text-white">
                  <div className="text-lg font-medium opacity-80">{review.id}</div>

                  <div className="space-y-2">
                    <h3 className="text-3xl lg:text-4xl font-normal uppercase tracking-tight">{review.title}</h3>
                    <p className="text-xl opacity-90">{review.clientName}</p>
                    <div className="flex items-center gap-2">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-sm opacity-80 ml-2">{review.timeframe}</span>
                    </div>
                  </div>

                  <p className="text-base opacity-90 leading-relaxed max-w-lg">{review.review}</p>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm uppercase tracking-wide opacity-80">Key Results:</h4>
                    <ul className="space-y-1">
                      {review.results.map((result, i) => (
                        <li key={i} className="text-sm opacity-90 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button className="inline-flex items-center gap-3 bg-black hover:bg-black/80 px-6 py-3 rounded-lg transition-all duration-300 group mt-6">
                    <span className="font-medium text-white">Start Your Transformation</span>
                    <div className="bg-yellow-400 text-black p-1 rounded group-hover:translate-x-1 transition-transform">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </button>
                </div>

                <div className="relative">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-radial from-white/20 via-white/5 to-transparent rounded-2xl"></div>

                    {/* Before/After label */}
                    <div className="absolute top-6 left-6 z-10">
                      <div className="text-xs text-white/90 font-medium uppercase tracking-wide">BEFORE & AFTER</div>
                    </div>

                    {/* Before/After images */}
                    <div className="relative z-10 flex items-center justify-center gap-6 h-80">
                      <div className="text-center">
                        <div className="relative mb-3">
                          <img
                            src={review.beforeImage || "/placeholder.svg"}
                            alt={`${review.clientName} before transformation`}
                            className="w-32 h-40 object-cover rounded-lg shadow-lg"
                          />
                          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white text-black text-xs px-2 py-1 rounded font-medium">
                            BEFORE
                          </div>
                        </div>
                      </div>

                      <div className="text-white/60 text-2xl font-light">→</div>

                      <div className="text-center">
                        <div className="relative mb-3">
                          <img
                            src={review.afterImage || "/placeholder.svg"}
                            alt={`${review.clientName} after transformation`}
                            className="w-32 h-40 object-cover rounded-lg shadow-lg"
                          />
                          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black text-xs px-2 py-1 rounded font-medium">
                            AFTER
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={`absolute left-0 top-0 bottom-0 w-2 ${review.backgroundColor} opacity-60`}></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
