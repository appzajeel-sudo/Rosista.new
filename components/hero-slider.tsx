"use client";

import { useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import type { HeroSlide, FallbackSlide } from "@/types/hero";
import { fallbackSlides } from "@/lib/api/hero";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface HeroSliderProps {
  slides?: HeroSlide[];
  fallbackSlides?: FallbackSlide[];
}

export function HeroSlider({
  slides,
  fallbackSlides: fallback,
}: HeroSliderProps = {}) {
  const swiperRef = useRef<SwiperType | null>(null);
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const currentLanguage = i18n.language;

  // ترجمة الـ slides بناءً على اللغة الحالية في Client
  const displaySlides = useMemo(() => {
    // الصورة الثابتة الأولى
    const staticHeroSlide: HeroSlide = {
      id: "static-hero-rosista",
      image:
        "https://res.cloudinary.com/djpl34pm6/image/upload/v1763408263/categories/tjzswp5hbygwdi8v77mh.png",
      title:
        currentLanguage === "en"
          ? "Luxury Gifts for Every Moment"
          : "هدايا فاخرة لكل لحظة",
      cta: currentLanguage === "en" ? "Shop Now" : "تسوق الآن",
      link: "/",
      type: "promotion",
    };

    let result: HeroSlide[];

    if (slides && slides.length > 0) {
      // ترجمة slides من Back-End بناءً على اللغة الحالية
      result = slides.map((slide) => {
        // إذا كانت البيانات تحتوي على حقول الترجمة، استخدمها
        if (slide.titleAr && slide.titleEn) {
          const translatedSlide = {
            ...slide,
            title: currentLanguage === "en" ? slide.titleEn : slide.titleAr,
          };

          // ترجمة subtitle (للعروض)
          if (slide.subtitleAr && slide.subtitleEn) {
            translatedSlide.subtitle =
              currentLanguage === "en" ? slide.subtitleEn : slide.subtitleAr;
          }

          // ترجمة celebratoryMessage (للمناسبات)
          if (slide.celebratoryMessageAr && slide.celebratoryMessageEn) {
            translatedSlide.celebratoryMessage =
              currentLanguage === "en"
                ? slide.celebratoryMessageEn
                : slide.celebratoryMessageAr;
          }

          // ترجمة CTA
          if (slide.ctaAr && slide.ctaEn) {
            // إذا كان CTA من Back-End، استخدمه
            translatedSlide.cta =
              currentLanguage === "en" ? slide.ctaEn : slide.ctaAr;
          } else if (slide.type === "occasion") {
            // إذا كان مناسبة، استخدم ترجمة من ملفات الترجمة
            translatedSlide.cta = t("hero.shopNow", "تسوق الآن");
          }

          return translatedSlide;
        }
        // إذا لم تكن موجودة، استخدم البيانات الحالية (من Server)
        return slide;
      });
    } else {
      // Fallback slides - تُترجم باستخدام ملفات الترجمة
      result = (fallback || fallbackSlides).map(
        (slide): HeroSlide => ({
          id: String(slide.id),
          image: slide.image,
          title: t(slide.titleKey),
          cta: t(slide.ctaKey),
          link: slide.link,
          type: "promotion" as const,
        })
      );
    }

    // إضافة الصورة الثابتة في البداية
    return [staticHeroSlide, ...result];
  }, [slides, fallback, t, currentLanguage]);

  return (
    <section className="hero-slider relative h-[70vh] sm:h-screen w-full overflow-hidden">
      <Swiper
        key={i18n.language}
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        speed={600}
        effect="slide"
        dir={isRtl ? "rtl" : "ltr"}
        grabCursor={true}
        touchRatio={1}
        resistance={true}
        resistanceRatio={0.85}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        pagination={{
          el: ".hero-pagination",
          clickable: true,
          bulletClass: "hero-bullet",
          bulletActiveClass: "hero-bullet-active",
        }}
        className="h-full w-full"
      >
        {displaySlides.map((slide, index) => (
          <SwiperSlide key={slide.id} className="relative">
            <div className="relative h-full w-full">
              {/* Background Image */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                fetchPriority={index === 0 ? "high" : "auto"}
                quality={100}
                className="object-cover"
                sizes="100vw"
              />

              {/* Content - Minimal & Bottom */}
              <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-8 pb-20 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  {/* Title */}
                  <p
                    className={`mb-3 text-sm font-light uppercase tracking-[0.3em] text-white ${
                      isRtl ? "font-sans-ar" : "font-sans-en"
                    }`}
                  >
                    {slide.title}
                  </p>

                  {/* Subtitle (للعروض) أو Celebratory Message (للمناسبات) */}
                  {(slide.subtitle || slide.celebratoryMessage) && (
                    <p
                      className={`mb-6 text-xs font-light tracking-wide text-white/90 ${
                        isRtl ? "font-sans-ar" : "font-sans-en"
                      }`}
                    >
                      {slide.subtitle || slide.celebratoryMessage}
                    </p>
                  )}

                  {/* CTA Button - Minimal */}
                  <Link
                    href={slide.link}
                    className={`group relative inline-flex items-center gap-3 overflow-hidden border border-white px-8 py-3 text-[11px] font-normal uppercase tracking-[0.2em] text-white transition-all duration-500 hover:bg-white hover:text-black ${
                      isRtl ? "font-sans-ar" : "font-sans-en"
                    }`}
                  >
                    <span className="relative z-10">{slide.cta}</span>
                    {isRtl ? (
                      <ChevronLeft className="relative z-10 h-3 w-3 transition-transform duration-300 group-hover:-translate-x-1" />
                    ) : (
                      <ChevronRight className="relative z-10 h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                    )}
                  </Link>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Arrows */}
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        aria-label="Previous slide"
        className={`absolute top-1/2 z-10 -translate-y-1/2 bg-white/10 p-3 text-white backdrop-blur-sm transition-all hover:bg-white/20 ${
          isRtl ? "right-8" : "left-8"
        }`}
      >
        {isRtl ? (
          <ChevronRight className="h-5 w-5 stroke-[1.5]" />
        ) : (
          <ChevronLeft className="h-5 w-5 stroke-[1.5]" />
        )}
      </button>

      <button
        onClick={() => swiperRef.current?.slideNext()}
        aria-label="Next slide"
        className={`absolute top-1/2 z-10 -translate-y-1/2 bg-white/10 p-3 text-white backdrop-blur-sm transition-all hover:bg-white/20 ${
          isRtl ? "left-8" : "right-8"
        }`}
      >
        {isRtl ? (
          <ChevronLeft className="h-5 w-5 stroke-[1.5]" />
        ) : (
          <ChevronRight className="h-5 w-5 stroke-[1.5]" />
        )}
      </button>

      {/* Custom Pagination */}
      <div className="hero-pagination-wrapper absolute inset-x-0 bottom-8 z-10 flex justify-center">
        <div className="hero-pagination" />
      </div>
    </section>
  );
}
