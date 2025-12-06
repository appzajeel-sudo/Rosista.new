"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProducts } from "@/lib/api/products";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "@/types/product";

interface Props {
  occasionId: string;
}

export function FeaturedProductsRow({ occasionId }: Props) {
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
          productStatus: "الأكثر مبيعًا", // Best Sellers
          limit: 21, // 1 Hero + 20 Grid Items for a fuller list
          isActive: true,
        });
        setProducts(products);
      } catch (error) {
        console.error("Error loading featured products:", error);
      } finally {
        setLoading(false);
      }
    }

    if (occasionId) {
      fetchProducts();
    }
  }, [occasionId]);

  if (loading) return <SpotlightSkeleton />;
  if (products.length === 0) return null;

  const mainProduct = products[0];
  const gridProducts = products.slice(1); // Show all remaining products

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-white dark:bg-black relative">
      {/* Background Accent */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gray-50 dark:bg-neutral-900/20 -z-10" />

      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2
              className={`text-2xl sm:text-3xl md:text-4xl font-bold text-black dark:text-white mb-3 ${
                isRtl ? "font-sans-ar" : "font-sans-en"
              }`}
            >
              {t("occasions.productSections.bestSellers", "الأكثر مبيعاً")}
            </h2>
            <div className="h-1 w-20 bg-primary-500 rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Spotlight Product (Span 7) */}
          <div className="lg:col-span-7 h-auto relative">
            <div className="lg:sticky lg:top-32 self-start transition-all">
              <div className="group relative h-[350px] sm:h-[450px] md:h-[600px] w-full overflow-hidden rounded-3xl bg-gray-100 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800">
                <Link
                  href={`/products/${mainProduct.slug}`}
                  className="block h-full w-full"
                >
                  <Image
                    src={mainProduct.mainImage}
                    alt={isRtl ? mainProduct.nameAr : mainProduct.nameEn}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                  {/* Badge */}
                  <div className="absolute top-6 left-6 z-10 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span
                      className={`text-sm font-bold text-black ${
                        isRtl ? "font-sans-ar" : "font-sans-en"
                      }`}
                    >
                      {isRtl ? "الأعلى مبيعاً" : "Top Pick"}
                    </span>
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 pt-16 sm:pt-20 md:pt-24 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-white">
                    <h3
                      className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-3 ${
                        isRtl ? "font-sans-ar" : "font-sans-en"
                      }`}
                    >
                      {isRtl ? mainProduct.nameAr : mainProduct.nameEn}
                    </h3>
                    <div className="flex items-center justify-between">
                      <p className="text-xl sm:text-2xl font-bold text-primary-400">
                        {mainProduct.price.toLocaleString()}{" "}
                        {isRtl ? "ر.س" : "SAR"}
                      </p>
                      <Button className="rounded-full bg-white text-black hover:bg-gray-200 gap-2">
                        <ShoppingCart className="w-4 h-4" />
                        {isRtl ? "اطلبه الآن" : "Order Now"}
                      </Button>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Side Grid (Span 5) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {gridProducts.map((product) => (
              <Link
                key={product._id}
                href={`/products/${product.slug}`}
                className="group relative aspect-square overflow-hidden rounded-2xl bg-gray-100 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800"
              >
                <Image
                  src={product.mainImage}
                  alt={isRtl ? product.nameAr : product.nameEn}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                  <p
                    className={`text-white font-bold line-clamp-1 ${
                      isRtl ? "font-sans-ar" : "font-sans-en"
                    }`}
                  >
                    {isRtl ? product.nameAr : product.nameEn}
                  </p>
                  <p className="text-primary-300 text-sm font-bold">
                    {product.price.toLocaleString()} {isRtl ? "ر.س" : "SAR"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SpotlightSkeleton() {
  return (
    <div className="w-full py-20 container mx-auto px-4">
      <Skeleton className="h-10 w-64 mb-12 bg-gray-200 dark:bg-neutral-800" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[500px]">
        <div className="lg:col-span-7">
          <Skeleton className="h-full w-full rounded-3xl bg-gray-200 dark:bg-neutral-800" />
        </div>
        <div className="lg:col-span-5 grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton
              key={i}
              className="h-full w-full rounded-2xl bg-gray-200 dark:bg-neutral-800"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
