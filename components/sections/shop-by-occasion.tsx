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
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

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

  // GSAP Animation for infinite loop
  useEffect(() => {
    if (!containerRef.current || occasions.length === 0) return;

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
      if (animationRef.current) {
        animationRef.current.kill();
        createAnimation();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
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

  // Duplicate occasions for seamless loop
  const duplicatedOccasions = [...occasions, ...occasions];

  return (
    <section className="bg-background py-8 sm:py-12">
      <div className="mx-auto max-w-[1650px] px-6 sm:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col items-center justify-center text-center">
          <h2
            className={`text-2xl font-bold tracking-tight text-foreground sm:text-3xl ${
              isRtl ? "font-sans-ar" : "font-sans-en"
            }`}
          >
            {t("home.shopByOccasion.title")}
          </h2>
          <div className="mt-3 h-px w-20 bg-border" />
        </div>

        {/* Liquid Gold - Fluid Luxury Design */}
        <div className="group mb-8 block">
          <div className="relative h-[40vh] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-neutral-900 to-stone-950">
            
            {/* Flowing Liquid Gold Shapes */}
            <div className="absolute inset-0 overflow-hidden">
              
              {/* 1. Large Liquid Blob (Left) */}
              <div className="absolute -left-20 top-1/4 animate-blob">
                <div className="h-64 w-64 rounded-full bg-gradient-to-br from-amber-400/30 via-yellow-500/20 to-orange-400/10 blur-3xl" />
              </div>

              {/* 2. Medium Liquid Blob (Right) */}
              <div className="absolute -right-16 bottom-1/4 animate-blob-slow">
                <div className="h-56 w-56 rounded-full bg-gradient-to-tl from-amber-300/25 via-yellow-400/15 to-amber-500/10 blur-2xl" />
              </div>

              {/* 3. Small Accent Blobs */}
              <div className="absolute top-1/3 left-1/3 animate-blob-reverse">
                <div className="h-32 w-32 rounded-full bg-gradient-to-br from-yellow-400/20 to-transparent blur-xl" />
              </div>
              <div className="absolute bottom-1/3 right-1/3 animate-blob">
                <div className="h-40 w-40 rounded-full bg-gradient-to-tl from-amber-500/15 to-transparent blur-xl" />
              </div>
            </div>

            {/* Metallic Mesh Overlay */}
            <div className="absolute inset-0 opacity-[0.03]">
              <div className="h-full w-full bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.1),transparent_50%)]" />
            </div>

            {/* Floating Metallic Particles */}
            <div className="absolute inset-0">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="absolute h-1 w-1 rounded-full bg-amber-400/40"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animation: `float-particle ${8 + Math.random() * 8}s ease-in-out infinite`,
                    animationDelay: `${Math.random() * 5}s`,
                    boxShadow: '0 0 10px rgba(251, 191, 36, 0.3)',
                  }}
                />
              ))}
            </div>

            {/* Elegant Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
              
              {/* Top Accent */}
              <div className="mb-8">
                <div className="h-16 w-px bg-gradient-to-b from-transparent via-amber-400/60 to-transparent" />
              </div>

              {/* Main Title */}
              <h3
                className={cn(
                  "text-6xl font-extralight tracking-[0.25em] text-white sm:text-7xl md:text-8xl uppercase mb-3",
                  isRtl ? "font-sans-ar tracking-normal font-light" : "font-sans-en"
                )}
              >
                <span className="bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 bg-clip-text text-transparent">
                  {isRtl ? "روزيستا" : "Rosista"}
                </span>
              </h3>

              {/* Subtitle with Metallic Effect */}
              <p className="text-xs font-light tracking-[0.5em] text-amber-300/70 uppercase mb-8">
                {isRtl ? "تجربة فاخرة" : "Luxury Experience"}
              </p>

              {/* Bottom Accent */}
              <div className="flex items-center gap-4">
                <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
                <div className="h-2 w-2 rounded-full bg-amber-400/60 shadow-[0_0_15px_rgba(251,191,36,0.5)]" />
                <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
              </div>
            </div>

            {/* Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/50 pointer-events-none" />
          </div>

          <style jsx>{`
            @keyframes blob {
              0%, 100% { 
                transform: translate(0, 0) scale(1);
                opacity: 0.3;
              }
              33% { 
                transform: translate(30px, -30px) scale(1.1);
                opacity: 0.5;
              }
              66% { 
                transform: translate(-20px, 20px) scale(0.9);
                opacity: 0.4;
              }
            }
            @keyframes blob-slow {
              0%, 100% { 
                transform: translate(0, 0) scale(1) rotate(0deg);
                opacity: 0.25;
              }
              50% { 
                transform: translate(-40px, 40px) scale(1.15) rotate(180deg);
                opacity: 0.45;
              }
            }
            @keyframes blob-reverse {
              0%, 100% { 
                transform: translate(0, 0) scale(1);
                opacity: 0.2;
              }
              50% { 
                transform: translate(25px, 25px) scale(1.2);
                opacity: 0.4;
              }
            }
            @keyframes float-particle {
              0%, 100% { 
                transform: translateY(0) translateX(0);
                opacity: 0.2;
              }
              25% {
                transform: translateY(-20px) translateX(10px);
                opacity: 0.6;
              }
              50% {
                transform: translateY(-10px) translateX(-15px);
                opacity: 0.8;
              }
              75% {
                transform: translateY(-30px) translateX(5px);
                opacity: 0.4;
              }
            }
            .animate-blob { animation: blob 20s ease-in-out infinite; }
            .animate-blob-slow { animation: blob-slow 25s ease-in-out infinite; }
            .animate-blob-reverse { animation: blob-reverse 18s ease-in-out infinite; }
          `}</style>
        </div>

        {/* GSAP Animated Carousel - All Occasions */}
        {occasions.length > 0 && (
          <div className="relative overflow-hidden">
            <div
              ref={containerRef}
              className="flex gap-4"
              style={{
                willChange: "transform",
              }}
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
                      
                      {/* Text */}
                      <div className="absolute inset-x-0 bottom-0 bg-background/90 p-3 sm:p-4">
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
        <div className="mb-8 flex flex-col items-center justify-center gap-3">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-px w-20" />
        </div>

        {/* Hero Skeleton */}
        <Skeleton className="mb-8 h-[30vh] w-full rounded-xl" />

        {/* Carousel Skeleton */}
        <div className="flex gap-4 overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-40 w-48 shrink-0 rounded-lg sm:h-48 sm:w-64" />
          ))}
        </div>
      </div>
    </section>
  );
}
