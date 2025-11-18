"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { Skeleton } from "@/components/ui/skeleton";

type Slide = {
  id: string;
  image: string;
};

type Props = {
  slides: Slide[];
};

export function FilmStripHero({ slides }: Props) {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Duplicate slides 2 times for seamless infinite loop
  const duplicatedSlides = [...slides, ...slides];

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let slidesWidth = container.scrollWidth / 2;

    const updateWidth = () => {
      slidesWidth = container.scrollWidth / 2;
    };

    const createAnimation = () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }

      updateWidth();

      gsap.set(container, {
        x: 0,
      });

      animationRef.current = gsap.to(container, {
        x: isRtl ? slidesWidth : -slidesWidth,
        duration: 30,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: (x) => {
            const num = parseFloat(x);
            if (isRtl) {
              return num >= slidesWidth ? `${num - slidesWidth}` : x;
            } else {
              return num <= -slidesWidth ? `${num + slidesWidth}` : x;
            }
          },
        },
      });
    };

    const timeout = setTimeout(() => {
      setIsLoading(false);
      requestAnimationFrame(() => {
        createAnimation();
      });
    }, 1000);

    const handleResize = () => {
      if (animationRef.current) {
        animationRef.current.kill();
        createAnimation();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [slides, isRtl]);

  return (
    <section className="relative w-full overflow-hidden bg-background pt-20 pb-12 md:pt-16 md:pb-16 lg:py-20">
      <div className="relative w-full overflow-hidden">
        {/* Top and Bottom Borders */}
        <div className="absolute left-0 right-0 top-0 z-10 h-2 bg-background md:h-2.5 lg:h-3" />
        <div className="absolute bottom-0 left-0 right-0 z-10 h-2 bg-background md:h-2.5 lg:h-3" />

        {/* Animated Film Strip - GSAP */}
        <div className="overflow-hidden relative">
          {isLoading && (
            <div className="absolute inset-0 z-20 flex gap-0">
              {[...Array(8)].map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-[280px] w-[200px] shrink-0 sm:h-[320px] sm:w-[240px] md:h-[380px] md:w-[300px] lg:h-[420px] lg:w-[340px]"
                />
              ))}
            </div>
          )}

          <div
            ref={containerRef}
            className="flex gap-0 film-strip-scroll"
            style={{
              willChange: "transform",
            }}
          >
            {duplicatedSlides.map((slide, index) => (
              <div
                key={`${slide.id}-${index}`}
                className="relative h-[280px] w-[200px] shrink-0 overflow-hidden sm:h-[320px] sm:w-[240px] md:h-[380px] md:w-[300px] lg:h-[420px] lg:w-[340px]"
              >
                <div className="relative h-full w-full film-strip-border">
                  <Image
                    src={slide.image}
                    alt={`Occasion ${slide.id}`}
                    fill
                    className="object-cover film-strip-image"
                    sizes="(max-width: 640px) 200px, (max-width: 768px) 240px, (max-width: 1024px) 300px, 340px"
                    priority={index < 3}
                    fetchPriority={index < 3 ? "high" : "auto"}
                    quality={100}
                    loading={index < 3 ? "eager" : "lazy"}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gradient Overlays */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-background via-background/50 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-background via-background/50 to-transparent" />
      </div>
    </section>
  );
}
