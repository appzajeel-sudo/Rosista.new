"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { getActiveOccasions } from "@/lib/api/occasions";
import type { Occasion } from "@/types/occasion";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function ShopByOccasion() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const [occasions, setOccasions] = useState<Occasion[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const floatingWordsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchOccasions = async () => {
      try {
        const data = await getActiveOccasions(true);
        setOccasions(data);
      } catch (error) {
        console.error("❌ Error fetching occasions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOccasions();
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // GSAP Animation - Sequential Fade with Responsive Radius
  useEffect(() => {
    if (!floatingWordsRef.current || occasions.length === 0) return;

    const words = floatingWordsRef.current.querySelectorAll(".floating-word");
    if (words.length === 0) return;

    const totalWords = words.length;
    const fadeInDuration = 1.5;
    const fadeOutDuration = 1.5;
    const staggerDelay = 0.8;
    const holdTime = 5;

    const totalFadeInTime = totalWords * staggerDelay + fadeInDuration;
    const totalFadeOutTime = totalWords * staggerDelay + fadeOutDuration;
    const cycleDuration = totalFadeInTime + holdTime + totalFadeOutTime;

    const getRadius = () => {
      const width = window.innerWidth;
      if (width < 640) {
        return { x: 140, y: 120 };
      } else if (width < 1024) {
        return { x: 250, y: 100 };
      } else {
        return { x: 400, y: 150 };
      }
    };

    const animateWords = () => {
      const radius = getRadius();

      words.forEach((word, index) => {
        // Start from top (-90 degrees)
        const angle = (index / words.length) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(angle) * radius.x;
        const y = Math.sin(angle) * radius.y;

        gsap.set(word, {
          x: x,
          y: y,
          opacity: 0,
        });

        const tl = gsap.timeline({
          repeat: -1,
          repeatDelay: 0,
        });

        tl.to(
          word,
          {
            opacity: 0.85,
            duration: fadeInDuration,
            ease: "power2.out",
          },
          index * staggerDelay
        );

        tl.to(
          word,
          {
            opacity: 0.85,
            duration: holdTime,
          },
          totalFadeInTime
        );

        tl.to(
          word,
          {
            opacity: 0,
            duration: fadeOutDuration,
            ease: "power2.in",
          },
          totalFadeInTime + holdTime + index * staggerDelay
        );

        tl.to(
          word,
          {
            opacity: 0,
            duration: 0.5,
          },
          cycleDuration - 0.5
        );
      });
    };

    animateWords();

    const handleResize = () => {
      const radius = getRadius();
      words.forEach((word, index) => {
        const angle = (index / words.length) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(angle) * radius.x;
        const y = Math.sin(angle) * radius.y;
        gsap.set(word, { x, y });
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      gsap.killTweensOf(words);
      window.removeEventListener("resize", handleResize);
    };
  }, [occasions, isMobile]);

  // GSAP Animation for infinite carousel loop
  useEffect(() => {
    if (!containerRef.current || occasions.length === 0) return;

    const container = containerRef.current;
    let slidesWidth = container.scrollWidth / 2;
    let lastWidth = window.innerWidth;

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
        duration: 60,
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

    requestAnimationFrame(() => {
      createAnimation();
    });

    const handleResize = () => {
      const currentWidth = window.innerWidth;

      if (currentWidth !== lastWidth) {
        lastWidth = currentWidth;
        if (animationRef.current) {
          animationRef.current.kill();
          createAnimation();
        }
      }
    };

    window.addEventListener("resize", handleResize);

    const handleMouseEnter = () => {
      animationRef.current?.pause();
    };

    const handleMouseLeave = () => {
      animationRef.current?.resume();
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [occasions, isRtl]);

  if (loading) {
    return <ShopByOccasionSkeleton />;
  }

  if (!occasions || occasions.length === 0) {
    return null;
  }

  const duplicatedOccasions = [...occasions, ...occasions];
  const displayedOccasions = isMobile ? occasions.slice(0, 5) : occasions;

  return (
    <section className="bg-background py-8 sm:py-12">
      <div className="mx-auto max-w-[1650px] px-6 sm:px-8">
        <div className="group mb-8 block">
          <div className="relative h-[45vh] w-full overflow-hidden rounded-3xl shadow-2xl">
            <div className="absolute inset-0">
              <Image
                src="/images/1.png"
                alt="Luxury Gift Adventure"
                fill
                className="object-cover"
                quality={100}
                unoptimized
                priority
              />
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 sm:gap-4 sm:px-6">
              <div
                ref={floatingWordsRef}
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
              >
                {displayedOccasions.map((occasion, index) => {
                  const occasionName = isRtl
                    ? occasion.nameAr
                    : occasion.nameEn;

                  const luxuryColors = [
                    "from-amber-300 via-yellow-400 to-amber-500",
                    "from-slate-200 via-gray-100 to-slate-300",
                    "from-yellow-100 via-amber-200 to-yellow-300",
                    "from-rose-300 via-pink-200 to-rose-400",
                    "from-orange-300 via-amber-400 to-yellow-500",
                  ];
                  const gradientClass =
                    luxuryColors[index % luxuryColors.length];

                  return (
                    <span
                      key={`floating-${occasion._id}-${index}`}
                      className={cn(
                        "floating-word absolute whitespace-nowrap bg-gradient-to-r bg-clip-text font-bold text-transparent",
                        "text-sm sm:text-base md:text-lg lg:text-xl",
                        gradientClass,
                        isRtl ? "font-sans-ar" : "font-sans-en"
                      )}
                      style={{
                        textShadow:
                          "0 0 20px rgba(218, 165, 32, 0.7), 0 0 40px rgba(218, 165, 32, 0.3)",
                        filter:
                          "drop-shadow(0 0 10px rgba(255, 215, 0, 0.5)) brightness(1.1)",
                      }}
                    >
                      {occasionName}
                    </span>
                  );
                })}
              </div>

              <h2
                className={cn(
                  "relative z-10 bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 bg-clip-text text-center font-black leading-tight tracking-tight text-transparent drop-shadow-2xl",
                  "text-xl sm:text-2xl md:text-3xl lg:text-4xl",
                  isRtl ? "font-sans-ar" : "font-sans-en"
                )}
                style={{
                  textShadow:
                    "0 0 30px rgba(218, 165, 32, 0.8), 0 0 60px rgba(218, 165, 32, 0.4)",
                  filter: "drop-shadow(0 2px 15px rgba(255, 215, 0, 0.6))",
                }}
              >
                {t("home.shopByOccasion.title")}
              </h2>

              <Link
                href="/occasions"
                className={cn(
                  "group relative z-10 inline-flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/20",
                  "px-4 py-1.5 text-xs sm:px-5 sm:py-2 sm:text-sm",
                  isRtl ? "font-sans-ar" : "font-sans-en"
                )}
              >
                <span className="font-medium text-white/90 transition-colors group-hover:text-white">
                  {t("home.occasions.viewMore")}
                </span>
              </Link>
            </div>
          </div>
        </div>

        {occasions.length > 0 && (
          <div className="relative overflow-hidden">
            <div
              ref={containerRef}
              className="flex gap-4"
              style={{ willChange: "transform" }}
            >
              {duplicatedOccasions.map((occasion, index) => {
                const occasionName = isRtl ? occasion.nameAr : occasion.nameEn;
                const occasionSlug = occasion.slug || occasion._id;

                return (
                  <Link
                    key={`${occasion._id}-${index}`}
                    href={`/occasions/${occasionSlug}`}
                    className="block shrink-0"
                  >
                    <div className="relative h-40 w-48 overflow-hidden rounded-lg sm:h-48 sm:w-64">
                      <Image
                        src={occasion.imageUrl}
                        alt={occasionName}
                        fill
                        sizes="256px"
                        className="object-cover"
                        quality={85}
                      />
                      <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                        <h4
                          className={cn(
                            "text-sm font-semibold text-white sm:text-base",
                            isRtl ? "font-sans-ar" : "font-sans-en"
                          )}
                        >
                          {occasionName}
                        </h4>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function ShopByOccasionSkeleton() {
  return (
    <section className="bg-background py-8 sm:py-12">
      <div className="mx-auto max-w-[1650px] px-6 sm:px-8">
        <Skeleton className="mb-8 h-[45vh] w-full rounded-3xl" />
        <div className="flex gap-4 overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <Skeleton
              key={i}
              className="h-40 w-48 shrink-0 rounded-lg sm:h-48 sm:w-64"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
