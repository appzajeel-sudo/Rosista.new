"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SLIDES = [
  {
    id: 1,
    image: "/luxury-gift-elegant-gold-wrapping.jpg",
    titleKey: "hero.slide1.title",
    ctaKey: "hero.slide1.cta",
    link: "/occasions",
  },
  {
    id: 2,
    image: "/luxury-gifts-premium-collection.jpg",
    titleKey: "hero.slide2.title",
    ctaKey: "hero.slide2.cta",
    link: "/occasions",
  },
  {
    id: 3,
    image: "/luxury-jewelry-diamonds-pearls.jpg",
    titleKey: "hero.slide3.title",
    ctaKey: "hero.slide3.cta",
    link: "/occasions",
  },
];

export function HeroSlider() {
  const swiperRef = useRef<SwiperType | null>(null);
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

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
        {SLIDES.map((slide) => (
          <SwiperSlide key={slide.id} className="relative">
            <div className="relative h-full w-full">
              {/* Background Image */}
              <Image
                src={slide.image}
                alt={t(slide.titleKey)}
                fill
                priority
                quality={90}
                className="object-cover"
                sizes="100vw"
              />

              {/* Minimal Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* Content - Minimal & Bottom */}
              <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-8 pb-20 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  {/* Small Title */}
                  <p
                    className={`mb-6 text-sm font-light uppercase tracking-[0.3em] text-white ${
                      isRtl ? "font-sans-ar" : "font-sans-en"
                    }`}
                  >
                    {t(slide.titleKey)}
                  </p>

                  {/* CTA Button - Minimal */}
                  <Link
                    href={slide.link}
                    className={`group relative inline-flex items-center gap-3 overflow-hidden border border-white px-8 py-3 text-[11px] font-normal uppercase tracking-[0.2em] text-white transition-all duration-500 hover:bg-white hover:text-black ${
                      isRtl ? "font-sans-ar" : "font-sans-en"
                    }`}
                  >
                    <span className="relative z-10">{t(slide.ctaKey)}</span>
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
