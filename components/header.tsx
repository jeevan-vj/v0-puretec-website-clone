"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])

  const menuItems = [
    { label: "ABOUT", href: "#about-trainer" },
    { label: "TRAINING", href: "#equipment-series" },
    { label: "GALLERY", href: "#media-gallery" },
    { label: "WORKOUTS", href: "#workout-gallery" },
    { label: "BOOK NOW", href: "#booking" },
    { label: "CONTACT", href: "#footer" },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="bg-black text-white py-4 px-6 relative z-50">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden lg:flex items-center space-x-8">
            <Link 
              href="#about-trainer" 
              onClick={(e) => handleNavClick(e, "#about-trainer")}
              className="text-sm font-medium tracking-wide hover:text-yellow-400 transition-colors"
            >
              ABOUT
            </Link>
            <Link 
              href="#equipment-series" 
              onClick={(e) => handleNavClick(e, "#equipment-series")}
              className="text-sm font-medium tracking-wide hover:text-yellow-400 transition-colors"
            >
              TRAINING
            </Link>
            <Link 
              href="#media-gallery" 
              onClick={(e) => handleNavClick(e, "#media-gallery")}
              className="text-sm font-medium tracking-wide hover:text-yellow-400 transition-colors"
            >
              GALLERY
            </Link>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 z-50 relative"
            aria-label="Toggle mobile menu"
          >
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>

          <div className="flex-1 flex justify-center">
            <Link href="/" className="flex items-center">
              <Image 
                src="/logo.png"
                alt="Kiwi Lankan Fitness Coaching Logo"
                width={60}
                height={60}
                className="object-contain rounded-full"
                priority
              />
            </Link>
          </div>

          <div className="hidden lg:flex items-center space-x-8">
            <Link 
              href="#workout-gallery" 
              onClick={(e) => handleNavClick(e, "#workout-gallery")}
              className="text-sm font-medium tracking-wide hover:text-yellow-400 transition-colors"
            >
              WORKOUTS
            </Link>
            <Link 
              href="#booking" 
              onClick={(e) => handleNavClick(e, "#booking")}
              className="text-sm font-medium tracking-wide hover:text-yellow-400 transition-colors bg-gradient-to-r from-yellow-400 to-teal-400 text-black px-4 py-2 rounded-full hover:from-yellow-300 hover:to-teal-300 transform hover:scale-105 transition-all duration-300"
            >
              BOOK NOW
            </Link>
            <Link 
              href="#footer" 
              onClick={(e) => handleNavClick(e, "#footer")}
              className="text-sm font-medium tracking-wide hover:text-yellow-400 transition-colors"
            >
              CONTACT
            </Link>
          </div>

          <div className="lg:hidden w-8 h-8" />
        </nav>
      </header>

      <div
        className={`fixed inset-0 bg-black z-40 transition-all duration-700 ease-in-out lg:hidden ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        style={{
          transform: isMobileMenuOpen ? "scale(1)" : "scale(0.95)",
        }}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8 px-6">
          {menuItems.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`text-2xl font-medium tracking-wide text-white hover:text-yellow-400 transition-all duration-300 transform ${
                isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              } ${item.label === "BOOK NOW" ? "bg-gradient-to-r from-yellow-400 to-teal-400 text-black px-6 py-3 rounded-full hover:from-yellow-300 hover:to-teal-300" : ""}`}
              style={{
                transitionDelay: isMobileMenuOpen ? `${index * 100 + 200}ms` : "0ms",
              }}
            >
              {item.label}
            </Link>
          ))}

          <div
            className={`mt-12 transform transition-all duration-500 ${
              isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{
              transitionDelay: isMobileMenuOpen ? "800ms" : "0ms",
            }}
          >
            <Image 
              src="/logo.png"
              alt="Kiwi Lankan Fitness Coaching Logo"
              width={80}
              height={80}
              className="object-contain rounded-full"
            />
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}
