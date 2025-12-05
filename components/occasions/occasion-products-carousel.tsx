"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ui/product-card";
import { getProducts } from "@/lib/api/products";
import type { Product } from "@/types/product";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  title: string;
  occasionId: string;
  productStatus: string; // "الأكثر مبيعاً" | "هدايا فاخرة" | etc.
  limit?: number;
}

export function OccasionProductsCarousel({
  title,
  occasionId,
  productStatus,
  limit = 12,
}: Props) {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const { products } = await getProducts({
          occasion: occasionId,
          productStatus: productStatus,
          limit: limit,
          isActive: true,
        });
        setProducts(products);
      } catch (error) {
        console.error("Error loading carousel products:", error);
      } finally {
        setLoading(false);
      }
    }

    if (occasionId) {
      fetchProducts();
    }
  }, [occasionId, productStatus, limit]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300; // Adjust scroll amount as needed
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const targetScroll =
        direction === "left"
          ? currentScroll - scrollAmount
          : currentScroll + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  };

  if (loading) {
    return (
      <div className="w-full py-8 px-8 md:px-16 lg:px-24">
        <Skeleton className="h-8 w-48 mb-6 bg-gray-200 dark:bg-neutral-800" />
        <div className="flex gap-4 overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <Skeleton
              key={i}
              className="h-[400px] w-[300px] shrink-0 bg-gray-200 dark:bg-neutral-800 rounded-xl"
            />
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) return null;

  return (
    <div className="w-full py-8 px-4 md:px-16 lg:px-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2
          className={`text-2xl md:text-3xl font-bold text-black dark:text-white ${
            isRtl ? "font-sans-ar" : "font-sans-en"
          }`}
        >
          {title}
        </h2>

        {/* Navigation Buttons - Only show on desktop */}
        <div className="hidden md:flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll(isRtl ? "right" : "left")}
            className="rounded-full bg-transparent border-gray-300 dark:border-neutral-700 hover:bg-gray-100 dark:hover:bg-neutral-800 text-black dark:text-white"
          >
            {isRtl ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll(isRtl ? "left" : "right")}
            className="rounded-full bg-transparent border-gray-300 dark:border-neutral-700 hover:bg-gray-100 dark:hover:bg-neutral-800 text-black dark:text-white"
          >
            {isRtl ? (
              <ChevronLeft className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 md:gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {products.map((product) => (
          <div
            key={product._id}
            className="w-[280px] md:w-[320px] shrink-0 snap-start"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
