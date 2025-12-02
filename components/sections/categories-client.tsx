"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

type Category = {
  id: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  image: string;
};

type Props = {
  categories: Category[];
};

export function CategoriesClient({ categories }: Props) {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const [isDark, setIsDark] = useState(false);

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

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-background py-3 sm:py-5">
      <div className="mx-auto w-full sm:max-w-[1650px] sm:px-8">
        {/* Header - Elegant & Professional */}
        <div className="mb-12 px-6 sm:px-0">
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
                    : "rgb(0, 0, 0)",
                }}
              />
              <div
                className="h-0.5 w-16"
                style={{
                  backgroundColor: isDark
                    ? "rgb(250, 204, 21)"
                    : "rgb(250, 204, 21)",
                  clipPath:
                    "polygon(0 0, calc(100% - 4px) 0, 100% 100%, 4px 100%)",
                }}
              />
              <div
                className="h-0.5 w-6 rounded-full"
                style={{
                  backgroundColor: isDark
                    ? "rgb(255, 255, 255)"
                    : "rgb(0, 0, 0)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Luxury Split Screen Design */}
        <div className="grid grid-cols-2 gap-0.5 border-y-2 border-x-0 border-white dark:border-0 bg-white dark:bg-background sm:border-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="group relative block overflow-hidden bg-background"
            >
              {/* Large Image Container */}
              <div className="relative aspect-square overflow-hidden sm:aspect-square md:aspect-4/5">
                <Image
                  src={category.image}
                  alt={isRtl ? category.nameAr : category.nameEn}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.02] will-change-transform"
                  priority={index < 4}
                  quality={100}
                />

                {/* Text Content - Centered & Minimal */}
                <div className="absolute inset-0 flex items-center justify-center px-2">
                  <div className="text-center">
                    <h3
                      className={`text-xl font-bold text-white transition-opacity duration-700 sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl ${
                        isRtl ? "font-sans-ar" : "font-sans-en"
                      } sm:group-hover:opacity-80`}
                    >
                      {isRtl ? category.nameAr : category.nameEn}
                    </h3>
                    <p
                      className={`hidden mt-1 text-[10px] font-bold text-white/90 transition-all duration-700 sm:block sm:mt-2 sm:text-xs sm:opacity-0 md:text-sm lg:text-base ${
                        isRtl ? "font-sans-ar" : "font-sans-en"
                      } sm:group-hover:opacity-100 sm:group-hover:translate-y-0 sm:translate-y-4`}
                    >
                      {isRtl ? category.descriptionAr : category.descriptionEn}
                    </p>
                  </div>
                </div>

                {/* Elegant Border - Only on Hover (Desktop) */}
                <div className="absolute inset-0 border border-white/0 transition-opacity duration-700 sm:group-hover:border-white/20 dark:hidden" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
