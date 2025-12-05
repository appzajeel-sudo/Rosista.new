"use client";

import { useEffect } from "react";
import Image from "next/image";

type Occasion = {
  id: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  image: string;
};

type Props = {
  occasions: Occasion[];
  activeId: string;
};

/**
 * ImagePreloader Component
 *
 * Preloads all occasion images in the background to ensure instant switching
 * between occasions without any loading delay.
 *
 * Strategy:
 * 1. Uses hidden Next.js Image components with priority for active image
 * 2. Preloads other images without priority (browser will cache them)
 * 3. Optimizes Cloudinary URLs for better performance
 */
export function ImagePreloader({ occasions, activeId }: Props) {
  useEffect(() => {
    // Preload images using link tags for better browser support
    occasions.forEach((occasion) => {
      if (occasion.id !== activeId) {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "image";
        link.href = optimizeCloudinaryUrl(occasion.image);
        document.head.appendChild(link);
      }
    });

    // Cleanup function to remove preload links when component unmounts
    return () => {
      const preloadLinks = document.querySelectorAll(
        'link[rel="preload"][as="image"]'
      );
      preloadLinks.forEach((link) => {
        if (link.getAttribute("href")?.includes("cloudinary")) {
          link.remove();
        }
      });
    };
  }, [occasions, activeId]);

  return (
    <div className="hidden" aria-hidden="true">
      {occasions.map((occasion) => (
        <Image
          key={occasion.id}
          src={optimizeCloudinaryUrl(occasion.image)}
          alt=""
          width={1920}
          height={1080}
          priority={occasion.id === activeId}
          quality={100}
        />
      ))}
    </div>
  );
}

/**
 * Optimize Cloudinary URL with transformations for better performance
 *
 * Transformations:
 * - f_auto: Automatic format (WebP for supported browsers) - NO quality reduction
 */
function optimizeCloudinaryUrl(url: string): string {
  if (!url || !url.includes("cloudinary.com")) {
    return url;
  }

  // Check if URL already has transformations
  if (url.includes("/upload/")) {
    // Insert transformations after /upload/
    // Only f_auto to get WebP format without reducing quality
    return url.replace("/upload/", "/upload/f_auto/");
  }

  return url;
}
