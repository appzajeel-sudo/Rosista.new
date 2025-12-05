"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ProductCard } from "@/components/ui/product-card";
import { getProducts } from "@/lib/api/products";
import type { Product } from "@/types/product";
import { Skeleton } from "@/components/ui/skeleton";
import { SlidersHorizontal } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  occasionId: string;
}

export function ModernProductGrid({ occasionId }: Props) {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [sortBy, setSortBy] = useState<string>("sortOrder");

  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
    fetchProducts(1, true);
  }, [occasionId, sortBy]);

  useEffect(() => {
    if (!observerTarget.current || !hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          fetchProducts(page + 1, false);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(observerTarget.current);

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [hasMore, loading, page]);

  async function fetchProducts(pageNum: number, isNew: boolean) {
    setLoading(true);
    try {
      const { products: newProducts, pagination } = await getProducts({
        occasion: occasionId,
        page: pageNum,
        limit: 12,
        isActive: true,
        sortBy: sortBy as any,
        sortOrder: "asc",
      });

      if (isNew) {
        setProducts(newProducts);
      } else {
        setProducts((prev) => [...prev, ...newProducts]);
      }

      setHasMore(pagination.hasNextPage);
      setPage(pagination.currentPage);
    } catch (error) {
      console.error("Error loading modern product grid:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="w-full bg-neutral-50 dark:bg-black min-h-screen relative">
      <div className="container mx-auto px-4 md:px-8 pb-20">
        {/* Floating Glass Header */}
        <div className="sticky top-20 z-30 py-6 mb-8 -mx-4 px-4 md:mx-0 md:px-0">
          <div className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-gray-200 dark:border-neutral-800 rounded-full px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
              <h2
                className={`text-lg font-bold text-black dark:text-white ${
                  isRtl ? "font-sans-ar" : "font-sans-en"
                }`}
              >
                {t("occasions.productSections.allProducts", "كل المنتجات")}
              </h2>
              <span className="bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-md text-xs font-mono">
                {products.length}
              </span>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="hidden md:flex items-center text-sm text-gray-500 gap-2">
                <SlidersHorizontal className="w-4 h-4" />
                <span className={isRtl ? "font-sans-ar" : "font-sans-en"}>
                  {isRtl ? "تصفية وترتيب" : "Filter & Sort"}
                </span>
              </div>

              <div className="w-full md:w-48">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full h-9 bg-transparent border-0 focus:ring-0 text-right md:text-end font-medium">
                    <SelectValue placeholder={t("occasions.sorting.sortBy")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sortOrder">
                      {t("occasions.sorting.featured")}
                    </SelectItem>
                    <SelectItem value="price_asc">
                      {t("occasions.sorting.priceLowToHigh")}
                    </SelectItem>
                    <SelectItem value="price_desc">
                      {t("occasions.sorting.priceHighToLow")}
                    </SelectItem>
                    <SelectItem value="createdAt">
                      {t("occasions.sorting.newest")}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Masonry Grid using CSS Columns */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {products.map((product) => (
            <div key={product._id} className="break-inside-avoid mb-6">
              <div>
                <ProductCard product={product} />
              </div>
            </div>
          ))}

          {/* Skeletons (Inline to match columns) */}
          {loading &&
            [...Array(4)].map((_, i) => (
              <div
                key={`skeleton-${i}`}
                className="break-inside-avoid mb-6 space-y-3"
              >
                <Skeleton className="aspect-[3/4] w-full bg-gray-200 dark:bg-neutral-800 rounded-xl" />
                <Skeleton className="h-4 w-2/3 bg-gray-200 dark:bg-neutral-800" />
              </div>
            ))}
        </div>

        {/* Infinite Scroll Trigger */}
        {hasMore && (
          <div
            ref={observerTarget}
            className="h-32 flex items-center justify-center mt-12"
          >
            {/* Simple Dot Loader */}
            {loading && (
              <div className="flex space-x-1">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
