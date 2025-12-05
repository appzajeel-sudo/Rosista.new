"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProducts } from "@/lib/api/products";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "@/types/product";

interface Props {
  occasionId: string;
}

export function CollectionViewGrid({ occasionId }: Props) {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const { products } = await getProducts({
          occasion: occasionId,
          productStatus: "المجموعات المميزة", // Featured Collections
          limit: 3, // 3 Editorial Features
          isActive: true,
        });
        setProducts(products);
      } catch (error) {
        console.error("Error loading collection products:", error);
      } finally {
        setLoading(false);
      }
    }

    if (occasionId) {
      fetchProducts();
    }
  }, [occasionId]);

  if (loading) return <EditorialSkeleton />;
  if (products.length === 0) return null;

  return (
    <section className="w-full py-12 bg-neutral-50 dark:bg-black overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <span className="text-sm font-medium tracking-[0.3em] text-primary-500 uppercase">
            {t("occasions.labels.curatedSeries", "سلسلة مختارة")}
          </span>
          <h2
            className={`mt-4 text-4xl md:text-5xl font-bold text-black dark:text-white ${
              isRtl ? "font-sans-ar" : "font-sans-en"
            }`}
          >
            {t(
              "occasions.productSections.featuredCollections",
              "المجموعات المميزة"
            )}
          </h2>
          <div className="w-16 h-1 bg-black dark:bg-white mx-auto mt-6" />
        </div>

        {/* Editorial Rows */}
        <div className="flex flex-col gap-8 md:gap-12">
          {products.map((product, index) => {
            const isEven = index % 2 === 0;
            // If RTL, we preserve the alternating logic but direction is handled by flex-row-reverse naturally,
            // but we want explicit alternation.
            // Let's rely on standard flex-direction for LTR, and the `dir="rtl"` will flip it automatically?
            // Actually, for "Image Left / Text Right" vs "Text Left / Image Right", we need manual order classes if we want strict alternation.

            return (
              <div
                key={product._id}
                className={`flex flex-col md:flex-row items-center gap-6 lg:gap-12 ${
                  isEven ? "" : "md:flex-row-reverse"
                }`}
              >
                {/* Image Side */}
                <div className="w-full md:w-2/5 relative group">
                  <Link
                    href={`/products/${product.slug}`}
                    className="block relative aspect-[3/4] overflow-hidden rounded-sm"
                  >
                    <Image
                      src={product.mainImage}
                      alt={isRtl ? product.nameAr : product.nameEn}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    {/* Subtle Frame Effect */}
                    <div className="absolute inset-4 border border-white/30 z-10 pointer-events-none transition-opacity opacity-0 group-hover:opacity-100" />
                  </Link>
                  {/* Decorative Element */}
                  <div
                    className={`absolute -bottom-6 -right-6 w-24 h-24 bg-primary-100 dark:bg-primary-900/20 -z-10 rounded-full blur-2xl ${
                      isEven ? "" : "right-auto -left-6"
                    }`}
                  />
                </div>

                {/* Content Side */}
                <div
                  className={`w-full md:w-3/5 text-center ${
                    isRtl ? "md:text-right" : "md:text-left"
                  } space-y-4`}
                >
                  <div className="space-y-1">
                    <span className="text-gray-400 text-xs tracking-widest uppercase">
                      {isRtl
                        ? `مجموعة 0${index + 1}`
                        : `Collection 0${index + 1}`}
                    </span>
                    <h3
                      className={`text-xl md:text-2xl font-medium text-black dark:text-white leading-tight ${
                        isRtl ? "font-sans-ar" : "font-sans-en"
                      }`}
                    >
                      {isRtl ? product.nameAr : product.nameEn}
                    </h3>
                  </div>

                  <p
                    className={`text-base text-gray-600 dark:text-gray-400 max-w-md ${
                      isRtl ? "" : ""
                    } leading-relaxed ${
                      isRtl ? "font-sans-ar" : "font-sans-en"
                    }`}
                  >
                    {isRtl ? product.descriptionAr : product.descriptionEn}
                  </p>

                  <div className="flex items-center gap-4 pt-2 justify-center md:justify-start">
                    <p className="text-xl font-medium text-primary-600 dark:text-primary-400">
                      {product.price.toLocaleString()} {isRtl ? "ر.س" : "SAR"}
                    </p>
                    <Button
                      asChild
                      variant="outline"
                      className="rounded-none border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                    >
                      <Link href={`/products/${product.slug}`}>
                        {isRtl ? "اكتشف المجموعة" : "Explore Collection"}
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function EditorialSkeleton() {
  return (
    <div className="w-full py-24 container mx-auto px-4">
      <div className="mb-20 text-center space-y-4">
        <Skeleton className="h-6 w-32 mx-auto" />
        <Skeleton className="h-12 w-64 mx-auto" />
      </div>
      <div className="space-y-32">
        {[1, 2].map((i) => (
          <div
            key={i}
            className={`flex flex-col md:flex-row gap-12 items-center ${
              i % 2 === 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            <Skeleton className="w-full md:w-1/2 aspect-[3/4]" />
            <div className="w-full md:w-1/2 space-y-6">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-16 w-3/4" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-48" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
