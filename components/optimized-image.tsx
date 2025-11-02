"use client"

import { useState } from "react"

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  fill?: boolean
  sizes?: string
  quality?: number
  fetchPriority?: "high" | "low" | "auto"
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  fill = false,
  sizes,
  quality = 75,
  fetchPriority = "auto",
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  // Determine if this is an external image or local
  const isExternal = src.startsWith("http")
  const normalizedSrc = src || "/placeholder.svg"

  // For local images and placeholders, use optimized img tag
  if (!isExternal) {
    return (
      <div className={`relative ${fill ? "w-full h-full" : ""}`}>
        <img
          src={normalizedSrc || "/placeholder.svg"}
          alt={alt}
          width={!fill ? width : undefined}
          height={!fill ? height : undefined}
          className={`${className} transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"}`}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setError(true)
            setIsLoading(false)
          }}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : fetchPriority}
          sizes={sizes}
          style={fill ? { width: "100%", height: "100%", objectFit: "cover" } : undefined}
          srcSet={
            isExternal
              ? undefined
              : `
            ${normalizedSrc}?w=640 640w,
            ${normalizedSrc}?w=1200 1200w,
            ${normalizedSrc}?w=1920 1920w
          `
          }
        />
        {isLoading && (
          <div className={`absolute inset-0 bg-black/5 dark:bg-white/5 animate-pulse ${!fill ? "rounded-lg" : ""}`} />
        )}
      </div>
    )
  }

  // Fallback for external images
  return (
    <img
      src={normalizedSrc || "/placeholder.svg"}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : fetchPriority}
    />
  )
}
