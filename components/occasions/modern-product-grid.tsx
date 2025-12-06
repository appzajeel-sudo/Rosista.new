"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ProductCard } from "@/components/ui/product-card";
import { getProducts } from "@/lib/api/products";
import type { Product } from "@/types/product";
import { Skeleton } from "@/components/ui/skeleton";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import {
  SlidersHorizontal,
  ArrowUpDown,
  Star,
  DollarSign,
  Clock,
} from "lucide-react";
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
      <div className="container mx-auto px-4 md:px-8 pb-12 sm:pb-16 md:pb-20">
        {/* Luxury Floating Header */}
        <div className="sticky top-20 z-30 py-6 mb-10">
          <div className="relative group">
            {/* Elegant Border with Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 via-primary-400/10 to-primary-500/20 rounded-sm blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Main Container */}
            <div className="relative bg-white dark:bg-black border-t border-b border-gray-200 dark:border-neutral-800 py-4 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                {/* Left Side - Elegant Title */}
                <div className="flex items-center gap-6">
                  {/* Decorative Line */}
                  <div className="hidden md:block w-12 h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent" />

                  <div className="flex items-center gap-4">
                    <h2
                      className={`text-sm uppercase tracking-[0.3em] font-light text-gray-900 dark:text-white ${
                        isRtl ? "font-sans-ar" : "font-sans-en"
                      }`}
                      style={{
                        letterSpacing: isRtl ? "0.2em" : "0.3em",
                      }}
                    >
                      {t(
                        "occasions.productSections.allProducts",
                        "كل المنتجات"
                      )}
                    </h2>

                    {/* Elegant Count Badge */}
                    <div className="flex items-center gap-2">
                      <div className="w-px h-4 bg-gray-300 dark:bg-neutral-700" />
                      <span className="text-xs font-mono text-gray-500 dark:text-gray-400 tracking-wider">
                        {products.length.toString().padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Side - Minimal Dropdown */}
                <div className="flex items-center gap-4">
                  {/* Decorative Line */}
                  <div className="hidden md:block w-12 h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent" />

                  <DropdownMenu
                    trigger={
                      <>
                        <span
                          className={`text-xs uppercase tracking-widest font-light ${
                            isRtl ? "font-sans-ar" : "font-sans-en"
                          }`}
                        >
                          {isRtl ? "ترتيب" : "Sort"}
                        </span>
                        <SlidersHorizontal className="h-3.5 w-3.5 opacity-50" />
                      </>
                    }
                    items={[
                      {
                        label: t("occasions.sorting.featured", "مميز"),
                        value: "sortOrder",
                        icon: <Star className="h-4 w-4" />,
                      },
                      {
                        label: t(
                          "occasions.sorting.priceLowToHigh",
                          "السعر: من الأقل للأعلى"
                        ),
                        value: "price_asc",
                        icon: <ArrowUpDown className="h-4 w-4" />,
                      },
                      {
                        label: t(
                          "occasions.sorting.priceHighToLow",
                          "السعر: من الأعلى للأقل"
                        ),
                        value: "price_desc",
                        icon: <DollarSign className="h-4 w-4" />,
                      },
                      {
                        label: t("occasions.sorting.newest", "الأحدث"),
                        value: "createdAt",
                        icon: <Clock className="h-4 w-4" />,
                      },
                    ]}
                    selectedValue={sortBy}
                    onSelect={setSortBy}
                    align="end"
                    isRtl={isRtl}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Masonry Grid using CSS Columns */}
        <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-4 sm:gap-5 md:gap-6 space-y-4 sm:space-y-5 md:space-y-6">
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
