"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { getActiveOccasions } from "@/lib/api/occasions";
import type { Occasion } from "@/types/occasion";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

export function ShopByOccasion() {
  const swiperRef = useRef<SwiperType | null>(null);
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const [isDark, setIsDark] = useState(false);
  const [occasions, setOccasions] = useState<Occasion[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch occasions from API
  useEffect(() => {
    const fetchOccasions = async () => {
      try {
        // ✅ جلب المناسبات المعروضة في Home Page فقط (showInHomePage = true)
        const data = await getActiveOccasions(true);

        // ✅ عرض البيانات في Console فقط
        console.log("🛍️ Shop by Occasion - Data:", data);

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

  // Don't render if loading or no occasions
  if (loading) {
    return (
      <section className="relative overflow-hidden bg-background py-3 sm:py-5">
        <div className="mx-auto max-w-[1650px] px-6 sm:px-8">
          <div className="mb-12">
            <div className="relative inline-block">
              <h2
                className={`pb-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl ${
                  isRtl ? "font-sans-ar" : "font-sans-en"
                }`}
              >
                {t("home.shopByOccasion.title")}
              </h2>
            </div>
          </div>
          <div className="h-96 flex items-center justify-center">
            <div className="text-foreground/60">
              {t("common.loading") || "Loading..."}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!occasions || occasions.length === 0) {
    return null; // Don't render section if no occasions
  }

  return (
    <section className="relative overflow-hidden bg-background py-3 sm:py-5">
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
            className={`absolute top-[40%] z-10 hidden -translate-y-1/2 rounded-full p-1.5 cursor-pointer sm:block ${
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
            className={`absolute top-[40%] z-10 hidden -translate-y-1/2 rounded-full p-1.5 cursor-pointer sm:block ${
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

          {/* Swiper */}
          <Swiper
            key={i18n.language}
            modules={[Navigation, Autoplay]}
            spaceBetween={16}
            slidesPerView={2}
            loop={false}
            speed={600}
            dir={isRtl ? "rtl" : "ltr"}
            grabCursor={true}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            breakpoints={{
              640: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1280: {
                slidesPerView: 5,
                spaceBetween: 24,
              },
            }}
            className="shop-by-occasion-swiper"
          >
            {occasions.map((occasion, index) => {
              const occasionName = isRtl ? occasion.nameAr : occasion.nameEn;
              const occasionSlug = occasion.slug || occasion._id;

              return (
                <SwiperSlide key={occasion._id}>
                  <Link
                    href={`/occasions/${occasionSlug}`}
                    className="group block"
                  >
                    <div className="relative overflow-hidden rounded-3xl">
                      {/* Image */}
                      <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden rounded-3xl">
                        <Image
                          src={occasion.imageUrl}
                          alt={occasionName}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                          priority={index === 0}
                          fetchPriority={index === 0 ? "high" : "auto"}
                          quality={85}
                          loading={index === 0 ? "eager" : "lazy"}
                          className="object-cover transition-all duration-[2s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.05]"
                          placeholder="blur"
                          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjgwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmMGYwZjA7c3RvcC1vcGFjaXR5OjEiIC8+PHN0b3Agb2Zmc2V0PSI1MCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNlMGUwZTA7c3RvcC1vcGFjaXR5OjEiIC8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojZjBmMGYwO3N0b3Atb3BhY2l0eToxIiAvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JhZCkiIC8+PC9zdmc+"
                        />

                        {/* Hover Overlay */}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                        {/* Content - Appears on Hover */}
                        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                          <h3
                            className={`mb-2 text-center text-base font-bold text-white sm:text-lg md:text-xl ${
                              isRtl ? "font-sans-ar" : "font-sans-en"
                            }`}
                          >
                            {occasionName}
                          </h3>
                          <div className="flex items-center justify-center gap-2 text-sm text-white/90">
                            <span
                              className={
                                isRtl ? "font-sans-ar" : "font-sans-en"
                              }
                            >
                              {isRtl ? "استكشف" : "Explore"}
                            </span>
                            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                          </div>
                        </div>
                      </div>

                      {/* Content Below Image */}
                      <div className="p-4">
                        <h3
                          className={`mb-1 text-sm font-medium text-foreground line-clamp-2 transition-colors group-hover:text-foreground/80 ${
                            isRtl ? "font-sans-ar" : "font-sans-en"
                          }`}
                        >
                          {occasionName}
                        </h3>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
