"use client"

import { useEffect, useRef } from "react"

export function FilmStripHero() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let animationId: number
    let position = 0

    const animate = () => {
      position += 1
      if (position > 100) position = 0
      container.style.transform = `translateX(-${position}%)`
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [])

  const images = Array.from({ length: 8 }, (_, i) => `/placeholder.svg?height=300&width=300&query=occasion-${i + 1}`)

  return (
    <div className="w-full bg-white dark:bg-black overflow-hidden py-12">
      <div
        ref={containerRef}
        className="flex gap-4 will-change-transform"
        style={{
          width: "200%",
        }}
      >
        {[...images, ...images].map((image, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-72 h-64 rounded-lg overflow-hidden border border-black/10 dark:border-white/10"
          >
            {/* CHANGE: Add lazy loading and decoding async for film strip */}
            <img
              src={image || "/placeholder.svg"}
              alt={`Occasion ${index + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
              sizes="288px"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
