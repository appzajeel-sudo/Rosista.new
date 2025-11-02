"use client"

import { useState, useEffect } from "react"
import { useTheme } from "@/lib/theme-context"
import { getTranslation } from "@/lib/i18n"
import { OptimizedImage } from "./optimized-image"

export function HeroSlider() {
  const { language } = useTheme()
  const [current, setCurrent] = useState(0)

  const slides = [
    {
      image: "/luxury-gift-elegant-gold-wrapping.jpg",
      title: getTranslation(language, "hero.title"),
      subtitle: getTranslation(language, "hero.subtitle"),
    },
    {
      image: "/luxury-gifts-premium-collection.jpg",
      title: getTranslation(language, "hero.title"),
      subtitle: getTranslation(language, "hero.subtitle"),
    },
    {
      image: "/luxury-jewelry-diamonds-pearls.jpg",
      title: getTranslation(language, "hero.title"),
      subtitle: getTranslation(language, "hero.subtitle"),
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <div className="relative w-full h-screen overflow-hidden pt-16">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ${
            index === current ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        >
          {/* CHANGE: Use OptimizedImage with lazy loading and responsive sizing */}
          <OptimizedImage
            src={slide.image || "/placeholder.svg"}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
            loading={index === current ? "eager" : "lazy"}
            decoding="async"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      ))}

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center text-center">
        <div className="max-w-3xl px-4 animate-slide-up">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 text-balance">
            {slides[current].title}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 text-balance">{slides[current].subtitle}</p>
          <button
            className="px-8 py-3 bg-black hover:bg-black/90 text-white font-semibold 
            rounded-lg transition-colors transform hover:scale-105 active:scale-95"
          >
            {getTranslation(language, "hero.explore")}
          </button>
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 rounded-full transition-all ${index === current ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/75"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
