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
        {/* Premium Gift Adventure - Luxury Brand Design */}
        <div className="group mb-8 block">
          <div className="relative h-[45vh] w-full overflow-hidden rounded-3xl shadow-2xl">
            {/* Background Image */}
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

            {/* Centered Title Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <h2
                className={`text-3xl font-bold tracking-tight text-white drop-shadow-lg sm:text-4xl md:text-5xl ${
                  isRtl ? "font-sans-ar" : "font-sans-en"
                }`}
              >
                {t("home.shopByOccasion.title")}
              </h2>
            </div>
          </div>
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
        {/* Hero Skeleton */}
        <Skeleton className="mb-8 h-[45vh] w-full rounded-3xl" />

        {/* Carousel Skeleton */}
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
