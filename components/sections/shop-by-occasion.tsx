"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Parallax } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ArrowRight, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { getActiveOccasions } from "@/lib/api/occasions";
import type { Occasion } from "@/types/occasion";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

export function ShopByOccasion() {
  const swiperRef = useRef<SwiperType | null>(null);
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const [occasions, setOccasions] = useState<Occasion[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);

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

  // Dark mode detection
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  if (loading) {
    return <ShopByOccasionSkeleton />;
  }

  if (!occasions || occasions.length === 0) {
    return null;
  }

  return (
    <section className="relative bg-background py-8 sm:py-12 overflow-hidden">
      {/* Background Decorative Elements - Very subtle */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50" />
      
      <div className="mx-auto max-w-[1650px] px-6 sm:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="relative inline-block">
            <h2
              className={`pb-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl ${
                isRtl ? "font-sans-ar" : "font-sans-en"
              }`}
            >
              {t("home.shopByOccasion.title")}
            </h2>
            {/* Decorative Line */}
            <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center gap-2">
              <div
                className="h-0.5 w-6 rounded-full"
                style={{
                  backgroundColor: isDark
                    ? "rgb(255, 255, 255)"
                    : "rgb(107, 114, 128)",
                }}
              ></div>
              <div
                className="h-0.5 w-16"
                style={{
                  backgroundColor: isDark
                    ? "rgb(250, 204, 21)"
                    : "rgb(0, 0, 0)",
                  clipPath:
                    "polygon(0 0, calc(100% - 4px) 0, 100% 100%, 4px 100%)",
                }}
              ></div>
              <div
                className="h-0.5 w-6 rounded-full"
                style={{
                  backgroundColor: isDark
                    ? "rgb(255, 255, 255)"
                    : "rgb(107, 114, 128)",
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Swiper Container with Navigation */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Previous"
            className={`absolute top-1/2 z-10 hidden -translate-y-1/2 rounded-full p-1.5 cursor-pointer sm:block ${
              isRtl ? "-right-5" : "-left-5"
            }`}
            style={{ backgroundColor: "rgb(var(--background))" }}
          >
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full"
              style={{
                backgroundColor: "rgb(var(--inner-circle-bg))",
              }}
            >
              {isRtl ? (
                <ChevronRight className="h-5 w-5 text-foreground" />
              ) : (
                <ChevronLeft className="h-5 w-5 text-foreground" />
              )}
            </div>
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="Next"
            className={`absolute top-1/2 z-10 hidden -translate-y-1/2 rounded-full p-1.5 cursor-pointer sm:block ${
              isRtl ? "-left-5" : "-right-5"
            }`}
            style={{ backgroundColor: "rgb(var(--background))" }}
          >
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full"
              style={{
                backgroundColor: "rgb(var(--inner-circle-bg))",
              }}
            >
              {isRtl ? (
                <ChevronLeft className="h-5 w-5 text-foreground" />
              ) : (
                <ChevronRight className="h-5 w-5 text-foreground" />
              )}
            </div>
          </button>

          {/* Slider Section */}
          <div className="overflow-hidden rounded-3xl">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={2}
            slidesPerView={1.2}
            speed={1500}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            centeredSlides={false}
            dir={isRtl ? "rtl" : "ltr"}
            grabCursor={true}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            breakpoints={{
              640: { slidesPerView: 2.2, spaceBetween: 4 },
              1024: { slidesPerView: 3.5, spaceBetween: 6 },
              1400: { slidesPerView: 4.5, spaceBetween: 6 },
            }}
            className="shop-occasion-swiper"
          >
            {occasions.map((occasion, index) => {
              const occasionName = isRtl ? occasion.nameAr : occasion.nameEn;
              const occasionSlug = occasion.slug || occasion._id;

              return (
                <SwiperSlide key={occasion._id}>
                  <Link href={`/occasions/${occasionSlug}`} className="group block">
                    <div className="relative overflow-hidden">
                      {/* Image Container */}
                      <div className="relative aspect-[3/4] overflow-hidden">
                        <Image
                          src={occasion.imageUrl}
                          alt={occasionName}
                          fill
                          sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 25vw"
                          className="object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.02] will-change-transform"
                          style={{ backfaceVisibility: "hidden", transform: "translateZ(0)" }}
                          priority={index < 2}
                          quality={100}
                        />

                        {/* Text Content - Centered & Over Image */}
                        <div className="absolute inset-0 z-10 flex items-center justify-center px-4">
                          <div className="text-center">
                            <h3 className={cn(
                              "text-2xl font-bold text-white transition-opacity duration-700 sm:group-hover:opacity-80",
                              isRtl ? "font-sans-ar" : "font-sans-en"
                            )}>
                              {occasionName}
                            </h3>
                          </div>
                        </div>


                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        </div>
      </div>
    </section>
  );
}

function ShopByOccasionSkeleton() {
  return (
    <section className="relative bg-background py-8 sm:py-12 overflow-hidden">
      <div className="mx-auto max-w-[1650px] px-6 sm:px-8">
        {/* Header */}
        <div className="mb-8 sm:mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-10 w-64 sm:h-12 sm:w-80" />
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <Skeleton className="h-12 w-12 rounded-full" />
          </div>
        </div>

        {/* Slider Skeleton */}
        <div className="relative overflow-hidden rounded-3xl">
          <div className="flex gap-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex-shrink-0 w-[calc(50%-4px)] sm:w-[calc(33.333%-5px)] lg:w-[calc(20%-5px)]">
                <Skeleton className="aspect-[3/4] w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
