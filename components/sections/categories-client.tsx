"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

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

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <section className="relative bg-background">
      <div className="mx-auto max-w-[1650px] sm:px-6 md:px-8">
        {/* Header - Minimal & Elegant */}
        <div className="pt-12 pb-8 text-center px-6 sm:pt-20 sm:pb-12 sm:px-0 md:pt-24 md:pb-16">
          <h2
            className={`text-2xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl ${
              isRtl ? "font-sans-ar" : "font-sans-en"
            }`}
          >
            {t("home.categories.title")}
          </h2>
        </div>

        {/* Luxury Split Screen Design */}
        <div className="grid grid-cols-2 gap-0.5 border-2 border-white bg-white sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
                  className="object-cover transition-all duration-[2s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.02]"
                  priority={index < 4}
                  quality={100}
                />

                {/* Text Content - Centered & Minimal */}
                <div className="absolute inset-0 flex items-center justify-center px-2">
                  <div className="text-center">
                    <h3
                      className={`text-sm font-bold text-white transition-all duration-700 sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl ${
                        isRtl ? "font-sans-ar" : "font-sans-en"
                      } sm:group-hover:opacity-80`}
                    >
                      {isRtl ? category.nameAr : category.nameEn}
                    </h3>
                    <p
                      className={`mt-1 text-[10px] font-bold text-white/90 transition-all duration-700 sm:mt-2 sm:text-xs sm:opacity-0 md:text-sm lg:text-base ${
                        isRtl ? "font-sans-ar" : "font-sans-en"
                      } sm:group-hover:opacity-100 sm:group-hover:translate-y-0 sm:translate-y-4`}
                    >
                      {isRtl ? category.descriptionAr : category.descriptionEn}
                    </p>
                  </div>
                </div>

                {/* Elegant Border - Only on Hover (Desktop) */}
                <div className="absolute inset-0 border border-white/0 transition-all duration-700 sm:group-hover:border-white/20" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
