"use client"

import type React from "react"

import { useState } from "react"
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  ArrowRight,
  Dumbbell,
  Calendar,
  Users,
  Award,
  ExternalLink,
} from "lucide-react"

const MEMBER_PORTAL_URL = "https://jnokfitplan.vercel.app/"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubscribed(true)
    setEmail("")
    setTimeout(() => setIsSubscribed(false), 3000)
  }

  return (
    <footer id="footer" className="relative bg-gradient-to-br from-[#05070f] via-[#0f111d] to-[#05070f] text-white overflow-hidden">
      {/* Radial glow at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-64 bg-[radial-gradient(ellipse_at_top,_rgba(250,204,21,0.15),_transparent_70%)]"></div>
      
      {/* Geometric accent elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-b from-yellow-400 to-transparent transform -skew-x-12"></div>
        <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-b from-yellow-400 to-transparent transform skew-x-12"></div>
        <div className="absolute bottom-0 left-1/4 w-16 h-64 bg-gradient-to-t from-yellow-400 to-transparent transform -skew-x-6"></div>
      </div>

      <div className="relative container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Brand and About Section */}
          <div className="lg:col-span-4">
            <div className="mb-8">
              <h2 className="text-3xl font-black tracking-wider mb-4">KIWILANKAN FITNESS</h2>
              <div className="w-16 h-1 bg-yellow-400 mb-6"></div>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Transform your body and mind with professional fitness training. I'm dedicated to helping you achieve
                sustainable results through personalized workout programs and nutritional guidance.
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-yellow-400" />
                  <span>Certified Trainer</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-yellow-400" />
                  <span>1000+ Clients</span>
                </div>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
              <h3 className="text-xl font-bold mb-3">Stay Updated</h3>
              <p className="text-gray-400 text-sm mb-4">
                Get fitness tips, workout plans, and exclusive content delivered to your inbox.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition-colors"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubscribed}
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold py-3 px-6 rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {isSubscribed ? (
                    <span>Subscribed! ✓</span>
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold mb-6 text-yellow-400">Quick Links</h3>
            <ul className="space-y-3">
              {["About", "Services", "Transformations", "Gallery", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 flex items-center space-x-2 group"
                  >
                    <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-yellow-400 transition-colors"></span>
                    <span>{item}</span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={MEMBER_PORTAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-400 hover:text-yellow-300 transition-colors duration-300 flex items-center space-x-2 group font-semibold"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Member Portal</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h3 className="text-lg font-bold mb-6 text-yellow-400">Services</h3>
            <div className="space-y-4">
              {[
                { icon: Dumbbell, title: "Personal Training", desc: "One-on-one coaching" },
                { icon: Users, title: "Group Classes", desc: "High-energy workouts" },
                { icon: Calendar, title: "Online Coaching", desc: "Remote guidance" },
              ].map((service, index) => (
                <div key={index} className="flex items-start space-x-3 group cursor-pointer">
                  <div className="bg-yellow-400/10 p-2 rounded-lg group-hover:bg-yellow-400/20 transition-colors">
                    <service.icon className="w-4 h-4 text-yellow-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white group-hover:text-yellow-400 transition-colors">
                      {service.title}
                    </h4>
                    <p className="text-sm text-gray-400">{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h3 className="text-lg font-bold mb-6 text-yellow-400">Get In Touch</h3>
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="bg-yellow-400/10 p-2 rounded-lg">
                  <Mail className="w-4 h-4 text-yellow-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <a href="mailto:info@kiwilankanfitness.co.nz" className="text-white hover:text-yellow-400 transition-colors">
                    info@kiwilankanfitness.co.nz
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-yellow-400/10 p-2 rounded-lg">
                  <Phone className="w-4 h-4 text-yellow-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Phone</p>
                  <a href="tel:+64210809871" className="text-white hover:text-yellow-400 transition-colors">
                    +64 210 809 8711
                  </a>
                </div>
              </div>
              {/* <div className="flex items-center space-x-3">
                <div className="bg-yellow-400/10 p-2 rounded-lg">
                  <MapPin className="w-4 h-4 text-yellow-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Location</p>
                  <p className="text-white">Downtown Fitness Center</p>
                </div>
              </div> */}
            </div>

            {/* Social Media */}
            <div>
              <h4 className="font-semibold mb-4">Follow Me</h4>
              <div className="flex space-x-3">
                {[
                  { icon: Instagram, href: "https://www.instagram.com/kiwilankanfitness_official/", label: "Instagram" },
                  { icon: Facebook, href: "https://www.facebook.com/kiwilankanfitness.co", label: "Facebook" },
                  { icon: Twitter, href: "#", label: "Twitter" },
                  { icon: Youtube, href: "#", label: "YouTube" },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="bg-gray-800 hover:bg-yellow-400 p-3 rounded-lg transition-all duration-300 group"
                  >
                    <social.icon className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <p>&copy; 2025 KIWILANKAN FITNESS. All rights reserved.</p>
              <a href="#" className="hover:text-yellow-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-yellow-400 transition-colors">
                Terms of Service
              </a>
            </div>
            <div className="text-sm text-gray-400">
              <p>Designed with ❤️ for your fitness journey</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
