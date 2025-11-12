"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";

const CATEGORIES = [
  {
    id: 1,
    slug: "chocolate",
    nameKey: "categories.chocolate",
    descriptionAr: "شوكولاتة فاخرة مصنوعة يدوياً",
    descriptionEn: "Handcrafted luxury chocolates",
    image:
      "https://images.unsplash.com/photo-1511381939415-e44015466834?w=1200&h=800&fit=crop&q=80",
    gradient: "from-amber-600 via-orange-500 to-amber-600",
  },
  {
    id: 2,
    slug: "flowers",
    nameKey: "categories.flowers",
    descriptionAr: "باقات ورد طبيعية رائعة",
    descriptionEn: "Stunning natural flower bouquets",
    image:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1200&h=800&fit=crop&q=80",
    gradient: "from-rose-600 via-pink-500 to-rose-600",
  },
  {
    id: 3,
    slug: "perfumes",
    nameKey: "categories.perfumes",
    descriptionAr: "عطور فاخرة من أجود الأنواع",
    descriptionEn: "Premium fragrances collection",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=1200&h=800&fit=crop&q=80",
    gradient: "from-purple-600 via-violet-500 to-purple-600",
  },
  {
    id: 4,
    slug: "jewelry",
    nameKey: "categories.jewelry",
    descriptionAr: "مجوهرات راقية وأنيقة",
    descriptionEn: "Elegant fine jewelry pieces",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&h=800&fit=crop&q=80",
    gradient: "from-cyan-600 via-blue-500 to-cyan-600",
  },
];

export function Categories() {
  const swiperRef = useRef<SwiperType | null>(null);
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const [isDark, setIsDark] = useState(false);

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

  return (
    <section className="relative overflow-hidden bg-background py-3 sm:py-5">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0 0 0 / 0.15) 1px, transparent 0)`,
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1650px] px-4 sm:px-8">
        {/* Header */}
        <div className="mb-8 text-center sm:mb-12">
          <div className="relative inline-block">
            <h2
              className={`pb-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl ${
                isRtl ? "font-sans-ar" : "font-sans-en"
              }`}
            >
              {t("home.categories.title")}
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

        {/* Swiper - Coverflow Effect */}
        <div className="categories-swiper">
          <Swiper
            key={i18n.language}
            modules={[Autoplay, EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            loop={true}
            speed={800}
            observer={true}
            observeParents={true}
            watchSlidesProgress={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
            }}
            dir={isRtl ? "rtl" : "ltr"}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 150,
              modifier: 1.5,
              slideShadows: false,
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            className="pb-0"
          >
            {[...CATEGORIES, ...CATEGORIES].map((category, index) => (
              <SwiperSlide
                key={`${category.id}-${index}`}
                className="!w-[260px] sm:!w-[360px] lg:!w-[440px]"
              >
                <Link
                  href={`/category/${category.slug}`}
                  className="group block"
                >
                  <div className="relative rounded-3xl transition-all duration-500 overflow-hidden">
                    {/* Image */}
                    <div className="relative aspect-4/3 overflow-hidden rounded-3xl">
                      <Image
                        src={category.image}
                        alt={t(category.nameKey)}
                        fill
                        sizes="(max-width: 640px) 260px, (max-width: 1024px) 360px, 440px"
                        priority={index === 0}
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      {/* Gradient Overlay */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-30 mix-blend-multiply`}
                      />
                    </div>

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6">
                      <div className="translate-y-2 transform transition-all duration-500 group-hover:translate-y-0">
                        <h3
                          className={`mb-1.5 text-xl font-bold text-white sm:text-2xl ${
                            isRtl ? "font-sans-ar" : "font-sans-en"
                          }`}
                        >
                          {t(category.nameKey)}
                        </h3>

                        <p
                          className={`mb-3 text-xs text-white/90 opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:text-sm ${
                            isRtl ? "font-sans-ar" : "font-sans-en"
                          }`}
                        >
                          {isRtl
                            ? category.descriptionAr
                            : category.descriptionEn}
                        </p>

                        <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm transition-all duration-500 group-hover:bg-white group-hover:text-neutral-900 sm:px-4 sm:py-2 sm:text-sm">
                          <span
                            className={isRtl ? "font-sans-ar" : "font-sans-en"}
                          >
                            {isRtl ? "استكشف الآن" : "Explore Now"}
                          </span>
                          <svg
                            className={`h-4 w-4 transition-transform ${
                              isRtl ? "rotate-180" : ""
                            } group-hover:translate-x-1`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Shine Effect */}
                    <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                      <div
                        className={`absolute top-0 h-full w-1/2 ${
                          isRtl ? "-right-full" : "-left-full"
                        } rotate-12 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-all duration-700 ${
                          isRtl
                            ? "group-hover:right-full"
                            : "group-hover:left-full"
                        }`}
                      />
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
