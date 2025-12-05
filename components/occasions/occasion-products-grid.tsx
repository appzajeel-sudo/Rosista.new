"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ProductCard } from "@/components/ui/product-card";
import { getProducts } from "@/lib/api/products";
import type { Product } from "@/types/product";
import { Skeleton } from "@/components/ui/skeleton";
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

export function OccasionProductsGrid({ occasionId }: Props) {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [sortBy, setSortBy] = useState<string>("sortOrder");

  // Ref for infinite scroll observer
  const observerTarget = useRef<HTMLDivElement>(null);

  // Fetch products on mount and when occasion/sort changes
  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
    fetchProducts(1, true);
  }, [occasionId, sortBy]);

  // Infinite scroll observer
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
      console.error("Error loading products grid:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full py-12 px-4 md:px-16 lg:px-24">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h2
          className={`text-2xl md:text-3xl font-bold text-black dark:text-white ${
            isRtl ? "font-sans-ar" : "font-sans-en"
          }`}
        >
          {t("occasions.productSections.allProducts")}
        </h2>

        {/* Sort Dropdown */}
        <div className="w-full md:w-48">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full bg-white dark:bg-neutral-900 border-gray-300 dark:border-neutral-800 text-black dark:text-white">
              <SelectValue placeholder={t("occasions.sorting.sortBy")} />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-neutral-900 border-gray-300 dark:border-neutral-800 text-black dark:text-white">
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

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}

        {/* Loading Skeletons */}
        {loading &&
          [...Array(4)].map((_, i) => (
            <div key={`skeleton-${i}`} className="space-y-3">
              <Skeleton className="h-[400px] w-full bg-gray-200 dark:bg-neutral-800 rounded-xl" />
              <Skeleton className="h-4 w-2/3 bg-gray-200 dark:bg-neutral-800" />
              <Skeleton className="h-4 w-1/3 bg-gray-200 dark:bg-neutral-800" />
            </div>
          ))}
      </div>

      {/* Infinite Scroll Trigger */}
      {hasMore && (
        <div
          ref={observerTarget}
          className="h-20 flex items-center justify-center mt-8"
        >
          {loading && (
            <div className="text-gray-500 dark:text-neutral-400 text-sm">
              {isRtl ? "جاري التحميل..." : "Loading..."}
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {!loading && products.length === 0 && (
        <div className="text-center py-24 text-gray-500 dark:text-neutral-400">
          <p>{t("occasions.actions.noProducts")}</p>
        </div>
      )}
    </div>
  );
}
