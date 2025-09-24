"use client"

import Link from "next/link"
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
    { label: "OUR STORY", href: "#" },
    { label: "BRANDS & RETAILERS", href: "#" },
    { label: "WHY US", href: "#" },
    { label: "WARRANTY", href: "#" },
    { label: "CUSTOMER SERVICE", href: "#" },
    { label: "SOCIAL", href: "#" },
  ]

  return (
    <>
      <header className="bg-black text-white py-4 px-6 relative z-50">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden lg:flex items-center space-x-8">
            <Link href="#" className="text-sm font-medium tracking-wide hover:text-gray-300 transition-colors">
              OUR STORY
            </Link>
            <Link href="#" className="text-sm font-medium tracking-wide hover:text-gray-300 transition-colors">
              BRANDS & RETAILERS
            </Link>
            <Link href="#" className="text-sm font-medium tracking-wide hover:text-gray-300 transition-colors">
              WHY US
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
            <Link href="/" className="text-2xl font-bold italic tracking-wider">
              PURETEC
            </Link>
          </div>

          <div className="hidden lg:flex items-center space-x-8">
            <Link href="#" className="text-sm font-medium tracking-wide hover:text-gray-300 transition-colors">
              WARRANTY
            </Link>
            <Link href="#" className="text-sm font-medium tracking-wide hover:text-gray-300 transition-colors">
              CUSTOMER SERVICE
            </Link>
            <Link href="#" className="text-sm font-medium tracking-wide hover:text-gray-300 transition-colors">
              SOCIAL
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
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-2xl font-medium tracking-wide text-white hover:text-yellow-400 transition-all duration-300 transform ${
                isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{
                transitionDelay: isMobileMenuOpen ? `${index * 100 + 200}ms` : "0ms",
              }}
            >
              {item.label}
            </Link>
          ))}

          <div
            className={`mt-12 text-4xl font-bold italic tracking-wider text-white transform transition-all duration-500 ${
              isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{
              transitionDelay: isMobileMenuOpen ? "800ms" : "0ms",
            }}
          >
            PURETEC
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
