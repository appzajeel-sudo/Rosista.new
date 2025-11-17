"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import {
  ChevronLeft,
  ChevronRight,
  Gift,
  ShoppingCart,
  Heart,
} from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

type Product = {
  id: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  price: number;
  image: string;
};

type Props = {
  products: Product[];
};

const RiyalSymbol = ({ className = "w-4 h-4" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1124.14 1256.39"
    className={className}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z" />
    <path d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z" />
  </svg>
);

export function LuxuryGiftsClient({ products }: Props) {
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

  if (!products || products.length === 0) {
    return null; // Don't render section if no products
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
              {t("luxuryGifts.title", "هدايا فاخرة")}
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
                slidesPerView: 5,
                spaceBetween: 20,
              },
            }}
            className="luxury-gifts-swiper"
          >
            {products.map((product, index) => (
              <SwiperSlide key={product.id}>
                <Link href={`/product/${product.slug}`} className="block">
                  <div className="group relative overflow-hidden rounded-3xl">
                    {/* Image */}
                    <div className="relative aspect-3/4 sm:aspect-270/390 overflow-hidden rounded-3xl">
                      <Image
                        src={product.image}
                        alt={isRtl ? product.nameAr : product.nameEn}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        priority={index === 0}
                        fetchPriority={index === 0 ? "high" : "auto"}
                        quality={100}
                        loading={index === 0 ? "eager" : "lazy"}
                        className="object-cover"
                      />

                      {/* Luxury Gift Badge */}
                      <div
                        className={`absolute top-3 flex h-7 w-7 items-center justify-center rounded-full ${
                          isRtl ? "right-3" : "left-3"
                        }`}
                        style={{
                          backgroundColor: "rgb(var(--background))",
                        }}
                        aria-label="Luxury Gift"
                        title="Luxury Gift"
                      >
                        <Gift className="h-3.5 w-3.5 text-purple-500" />
                      </div>

                      {/* Favorite Icon */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          // TODO: Add to favorites functionality
                        }}
                        className={`absolute top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full opacity-0 -translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 cursor-pointer ${
                          isRtl ? "left-3" : "right-3"
                        }`}
                        style={{
                          backgroundColor: "rgb(var(--background))",
                        }}
                        aria-label={
                          isRtl ? "إضافة إلى المفضلة" : "Add to favorites"
                        }
                      >
                        <Heart className="h-4 w-4 text-foreground" />
                      </button>

                      {/* Hover Overlay */}
                      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/40 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                        {(isRtl ? product.descriptionAr : product.descriptionEn) && (
                          <p
                            className={`mx-auto mb-3 max-w-[85%] text-center text-xs text-white/90 line-clamp-3 ${
                              isRtl ? "font-sans-ar" : "font-sans-en"
                            }`}
                          >
                            {isRtl ? product.descriptionAr : product.descriptionEn}
                          </p>
                        )}
                        <div className="pointer-events-auto mx-auto w-max">
                          <button
                            type="button"
                            aria-label={isRtl ? "أضف إلى السلة" : "Add to cart"}
                            className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium text-foreground transition-opacity hover:opacity-90 cursor-pointer ${
                              isRtl ? "font-sans-ar" : "font-sans-en"
                            }`}
                            style={{
                              backgroundColor: "rgb(var(--background))",
                            }}
                          >
                            <ShoppingCart className="h-4 w-4" />
                            <span>
                              {isRtl ? "أضف إلى السلة" : "Add to Cart"}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      {/* Product Name */}
                      <h3
                        className={`mb-2 text-sm font-medium text-foreground line-clamp-2 ${
                          isRtl ? "font-sans-ar" : "font-sans-en"
                        }`}
                      >
                        {isRtl ? product.nameAr : product.nameEn}
                      </h3>

                      {/* Price */}
                      <div
                        className={`flex items-center gap-1 text-base font-semibold text-foreground ${
                          isRtl ? "font-sans-ar" : "font-sans-en"
                        }`}
                      >
                        <span>{product.price}</span>
                        <RiyalSymbol className="h-4 w-4" />
                      </div>
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

