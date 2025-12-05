"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProducts } from "@/lib/api/products";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "@/types/product";

interface Props {
  occasionId: string;
}

export function LuxuryHighlightSection({ occasionId }: Props) {
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
          productStatus: "هدايا فاخرة", // Luxury Gifts
          limit: 21, // Show all premium items
          isActive: true,
        });
        setProducts(products);
      } catch (error) {
        console.error("Error loading luxury products:", error);
      } finally {
        setLoading(false);
      }
    }

    if (occasionId) {
      fetchProducts();
    }
  }, [occasionId]);

  if (loading) {
    return <LuxurySkeleton />;
  }

  if (products.length === 0) return null;

  return (
    <section className="w-full py-16 bg-[#0A0A19] text-white relative">
      {/* Golden Glow Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 space-y-3">
          <span
            className={`text-amber-500 tracking-[0.2em] uppercase text-sm font-medium ${
              isRtl ? "font-sans-ar" : "font-sans-en"
            }`}
          >
            {t("occasions.labels.premiumSelection", "تشكيلة فاخرة")}
          </span>
          <h2
            className={`text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-amber-100 to-amber-200 ${
              isRtl ? "font-sans-ar" : "font-sans-en"
            }`}
          >
            {t("occasions.productSections.luxuryGifts", "هدايا فاخرة")}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto rounded-full opacity-50" />
        </div>

        {/* Featured Luxury Item - Layout: Large Left Image + Right List */}
        {/* Changed items-center to items-start for sticky behavior */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* First Product - Hero Style - Sticky */}
          <div className="relative group perspective-1000 self-start lg:sticky lg:top-32">
            <Link
              href={`/products/${products[0].slug}`}
              className="block relative aspect-square rounded-lg overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(245,158,11,0.1)] transition-all duration-500 hover:shadow-[0_0_80px_rgba(245,158,11,0.2)]"
            >
              <Image
                src={products[0].mainImage}
                alt={isRtl ? products[0].nameAr : products[0].nameEn}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3
                  className={`text-2xl font-bold mb-2 text-white ${
                    isRtl ? "font-sans-ar" : "font-sans-en"
                  }`}
                >
                  {isRtl ? products[0].nameAr : products[0].nameEn}
                </h3>
                <p className="text-xl text-amber-400 font-medium">
                  {products[0].price.toLocaleString()} {isRtl ? "ر.س" : "SAR"}
                </p>
              </div>
            </Link>
          </div>

          {/* Other Products List */}
          <div className="flex flex-col gap-4">
            {products.slice(1).map((product) => (
              <Link
                key={product._id}
                href={`/products/${product.slug}`}
                className="group flex items-center gap-6 p-4 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-300"
              >
                <div className="relative w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-md overflow-hidden bg-neutral-900">
                  <Image
                    src={product.mainImage}
                    alt={isRtl ? product.nameAr : product.nameEn}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="space-y-2">
                  <h3
                    className={`text-xl font-medium text-gray-200 group-hover:text-amber-200 transition-colors ${
                      isRtl ? "font-sans-ar" : "font-sans-en"
                    }`}
                  >
                    {isRtl ? product.nameAr : product.nameEn}
                  </h3>
                  <p className="text-lg text-amber-500/90 font-medium">
                    {product.price.toLocaleString()} {isRtl ? "ر.س" : "SAR"}
                  </p>
                  <span
                    className={`text-sm text-gray-400 group-hover:text-white inline-flex items-center gap-2 transition-colors ${
                      isRtl ? "font-sans-ar" : "font-sans-en"
                    }`}
                  >
                    {isRtl ? "التفاصيل" : "Details"}
                    {isRtl ? (
                      <ArrowLeft className="w-4 h-4" />
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function LuxurySkeleton() {
  return (
    <div className="w-full py-24 bg-[#0A0A19] container mx-auto px-4">
      <Skeleton className="h-10 w-48 mx-auto mb-16 bg-white/10" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Skeleton className="h-[600px] w-full bg-white/10 rounded-lg" />
        <div className="space-y-6">
          <Skeleton className="h-32 w-full bg-white/10 rounded-lg" />
          <Skeleton className="h-32 w-full bg-white/10 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
