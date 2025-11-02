"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "@/lib/theme-context"
import { getTranslation } from "@/lib/i18n"

export function Header() {
  const { language, setLanguage, isDark, setIsDark } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en")
  }

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md border-b border-black" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        {/* Logo with animation */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-10 h-10">
            <div
              className="absolute inset-0 bg-black rounded-lg 
              transform group-hover:scale-110 transition-transform duration-300"
              style={{
                animation: "logoFloat 3s ease-in-out infinite",
              }}
            />
            <div className="absolute inset-1 bg-white rounded-md flex items-center justify-center">
              <span className="text-sm font-bold text-black">R</span>
            </div>
          </div>
          <span className="text-xl font-serif font-bold text-black hidden sm:inline dark:text-white">ROSISTA</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-sm text-black/80 hover:text-black transition-colors dark:text-white/80 dark:hover:text-white"
          >
            {getTranslation(language, "nav.home")}
          </Link>
          <Link
            href="/occasions"
            className="text-sm text-black/80 hover:text-black transition-colors dark:text-white/80 dark:hover:text-white"
          >
            {getTranslation(language, "nav.occasions")}
          </Link>
          <Link
            href="#"
            className="text-sm text-black/80 hover:text-black transition-colors dark:text-white/80 dark:hover:text-white"
          >
            {getTranslation(language, "nav.shop")}
          </Link>
          <Link
            href="#"
            className="text-sm text-black/80 hover:text-black transition-colors dark:text-white/80 dark:hover:text-white"
          >
            {getTranslation(language, "nav.about")}
          </Link>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.5 1.5a1 1 0 11-2 0 1 1 0 012 0z M10.5 18.5a1 1 0 11-2 0 1 1 0 012 0z M1.5 10.5a1 1 0 110-2 1 1 0 010 2z M18.5 10.5a1 1 0 110-2 1 1 0 010 2z M3.6 3.6a1 1 0 111.414-1.414 1 1 0 01-1.414 1.414z M15.78 15.78a1 1 0 111.414-1.414 1 1 0 01-1.414 1.414z M3.6 16.4a1 1 0 11-1.414-1.414 1 1 0 011.414 1.414z M15.78 4.22a1 1 0 11-1.414-1.414 1 1 0 011.414 1.414z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>

          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="px-3 py-1.5 text-sm font-medium rounded-lg bg-white hover:bg-black/10 
            transition-colors text-black border border-black dark:bg-black dark:hover:bg-white/10 dark:text-white dark:border-white"
          >
            {language === "en" ? "ع" : "EN"}
          </button>
        </div>
      </nav>

      <style>{`
        @keyframes logoFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-4px);
          }
        }
      `}</style>
    </header>
  )
}
