"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const CATEGORIES = [
  {
    id: 1,
    slug: "chocolate",
    nameKey: "categories.chocolate",
    descriptionAr: "شوكولاتة فاخرة مصنوعة يدوياً",
    descriptionEn: "Handcrafted luxury chocolates",
    image:
      "https://images.unsplash.com/photo-1511381939415-e44015466834?w=1200&h=1600&fit=crop&q=90",
  },
  {
    id: 2,
    slug: "flowers",
    nameKey: "categories.flowers",
    descriptionAr: "باقات ورد طبيعية رائعة",
    descriptionEn: "Stunning natural flower bouquets",
    image:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1200&h=1600&fit=crop&q=90",
  },
  {
    id: 3,
    slug: "perfumes",
    nameKey: "categories.perfumes",
    descriptionAr: "عطور فاخرة من أجود الأنواع",
    descriptionEn: "Premium fragrances collection",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=1200&h=1600&fit=crop&q=90",
  },
  {
    id: 4,
    slug: "jewelry",
    nameKey: "categories.jewelry",
    descriptionAr: "مجوهرات راقية وأنيقة",
    descriptionEn: "Elegant fine jewelry pieces",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&h=1600&fit=crop&q=90",
  },
  {
    id: 5,
    slug: "fragrances",
    nameKey: "categories.fragrances",
    descriptionAr: "عطور فاخرة من أرقى الماركات",
    descriptionEn: "Luxury fragrances from finest brands",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=1200&h=1600&fit=crop&q=90",
  },
  {
    id: 6,
    slug: "accessories",
    nameKey: "categories.accessories",
    descriptionAr: "إكسسوارات أنيقة ومميزة",
    descriptionEn: "Elegant and unique accessories",
    image:
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=1200&h=1600&fit=crop&q=90",
  },
  {
    id: 7,
    slug: "lifestyle",
    nameKey: "categories.lifestyle",
    descriptionAr: "منتجات نمط الحياة الفاخرة",
    descriptionEn: "Luxury lifestyle products",
    image:
      "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=1200&h=1600&fit=crop&q=90",
  },
  {
    id: 8,
    slug: "watches",
    nameKey: "categories.watches",
    descriptionAr: "ساعات فاخرة من أرقى الماركات",
    descriptionEn: "Luxury watches from finest brands",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&h=1600&fit=crop&q=90",
  },
  {
    id: 9,
    slug: "bags",
    nameKey: "categories.bags",
    descriptionAr: "حقائب فاخرة وأنيقة",
    descriptionEn: "Elegant luxury bags",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1200&h=1600&fit=crop&q=90",
  },
  {
    id: 10,
    slug: "candles",
    nameKey: "categories.candles",
    descriptionAr: "شموع فاخرة بروائح مميزة",
    descriptionEn: "Luxury candles with unique scents",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=1200&h=1600&fit=crop&q=90",
  },
  {
    id: 11,
    slug: "cosmetics",
    nameKey: "categories.cosmetics",
    descriptionAr: "مستحضرات تجميل فاخرة",
    descriptionEn: "Luxury cosmetics collection",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&h=1600&fit=crop&q=90",
  },
  {
    id: 12,
    slug: "gifts",
    nameKey: "categories.gifts",
    descriptionAr: "هدايا فاخرة لكل مناسبة",
    descriptionEn: "Luxury gifts for every occasion",
    image:
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1200&h=1600&fit=crop&q=90",
  },
];

export function Categories() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  return (
    <section className="relative bg-background">
      <div className="mx-auto max-w-[1650px] px-6 sm:px-8">
        {/* Header - Minimal & Elegant */}
        <div className="pt-12 pb-8 text-center sm:pt-20 sm:pb-12 md:pt-24 md:pb-16">
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
          {CATEGORIES.map((category, index) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="group relative block overflow-hidden bg-background"
            >
              {/* Large Image Container */}
              <div className="relative aspect-square overflow-hidden sm:aspect-square md:aspect-4/5">
                <Image
                  src={category.image}
                  alt={t(category.nameKey)}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-all duration-[2s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.02]"
                  priority={index < 4}
                  quality={90}
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI4MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojZjBmMGYwO3N0b3Atb3BhY2l0eToxIiAvPjxzdG9wIG9mZnNldD0iNTAlIiBzdHlsZT0ic3RvcC1jb2xvcjojZTBlMGUwO3N0b3Atb3BhY2l0eToxIiAvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6I2YwZjBmMDtzdG9wLW9wYWNpdHk6MSIgLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyYWQpIiAvPjwvc3ZnPg=="
                />

                {/* Text Content - Centered & Minimal */}
                <div className="absolute inset-0 flex items-center justify-center px-2">
                  <div className="text-center">
                    <h3
                      className={`text-sm font-bold text-white transition-all duration-700 sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl ${
                        isRtl ? "font-sans-ar" : "font-sans-en"
                      } sm:group-hover:opacity-80`}
                    >
                      {t(category.nameKey)}
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
