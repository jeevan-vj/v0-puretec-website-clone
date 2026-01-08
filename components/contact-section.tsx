"use client"

import { Mail, Phone, MapPin, Clock } from "lucide-react"

export default function ContactSection() {
  const contactCards = [
    {
      icon: Mail,
      label: "Email Us",
      value: "ruwan@kiwilankanfitness.com",
      href: "mailto:ruwan@kiwilankanfitness.com",
      description: "Send us a message anytime"
    },
    {
      icon: Phone,
      label: "Call Us",
      value: "+64 21 080 98711",
      href: "tel:+64210809871",
      description: "We're here to help"
    },
    {
      icon: MapPin,
      label: "Visit Us",
      value: "Kiwi Lankan Fitness",
      href: null,
      description: "kiwilankanfitness.com"
    },
    {
      icon: Clock,
      label: "Opening Hours",
      value: "Mon-Fri: 6AM-9PM",
      href: null,
      description: "Sat-Sun: 8AM-6PM"
    }
  ]

  return (
    <section id="contact" className="relative py-20 bg-gradient-to-br from-[#05070f] via-[#0f111d] to-[#05070f] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top,_rgba(250,204,21,0.2),_transparent_65%)]"></div>
      <div className="absolute inset-0 showcase-noise opacity-50"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-8 h-0.5 bg-yellow-400"></div>
            <span className="text-sm font-medium text-yellow-400 uppercase tracking-wider">GET IN TOUCH</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Contact Us</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Have questions or ready to start your fitness journey? Reach out to us through any of these channels.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {contactCards.map((card, index) => {
            const CardContent = (
              <div className="group cursor-pointer relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-white/10 hover:border-yellow-400/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(250,204,21,0.15)]">
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(250,204,21,0.1),_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                <div className="relative z-10 p-8 text-center">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center mb-4">
                    <div className="bg-yellow-400 text-black p-4 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <card.icon className="w-6 h-6" />
                    </div>
                  </div>
                  
                  {/* Label */}
                  <h3 className="text-xl font-bold text-white mb-2">{card.label}</h3>
                  
                  {/* Value */}
                  <p className={`text-lg font-medium mb-2 ${card.href ? 'text-yellow-400 group-hover:text-yellow-300' : 'text-gray-200'}`}>
                    {card.value}
                  </p>
                  
                  {/* Description */}
                  <p className="text-sm text-gray-400">{card.description}</p>
                </div>
              </div>
            )

            return card.href ? (
              <a
                key={index}
                href={card.href}
                className="block opacity-0 animate-slideUp"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: 'forwards'
                }}
              >
                {CardContent}
              </a>
            ) : (
              <div
                key={index}
                className="opacity-0 animate-slideUp"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: 'forwards'
                }}
              >
                {CardContent}
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-400 mb-6">Prefer to book a session directly?</p>
          <a
            href="#booking"
            className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 px-8 py-4 text-lg font-bold tracking-wide uppercase hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(250,204,21,0.5)] rounded-lg"
          >
            Book Your Session
          </a>
        </div>
      </div>
    </section>
  )
}

