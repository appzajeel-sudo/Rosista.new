"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import {
  Heart,
  ShoppingBag,
  X,
  Search,
  ArrowRight,
  SlidersHorizontal,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useFavorites } from "@/context/FavoritesContext";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FavoriteButton } from "@/components/ui/favorite-button";
import { cn } from "@/lib/utils";

const RiyalSymbol = ({ className = "w-3 h-3" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1124.14 1256.39"
    className={className}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z" />
    <path d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z" />
  </svg>
);

export default function FavoritesPage() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const { favorites, removeFromFavorites, clearFavorites, isLoading } =
    useFavorites();
  const { addToCart } = useCart();
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recent");

  // Filter and sort favorites
  const filteredFavorites = useMemo(
    () =>
      favorites
        .filter((item) => {
          const matchesSearch =
            searchTerm === "" ||
            (isRtl ? item.nameAr : item.nameEn)
              .toLowerCase()
              .includes(searchTerm.toLowerCase());
          return matchesSearch;
        })
        .sort((a, b) => {
          switch (sortBy) {
            case "price-low":
              return a.price - b.price;
            case "price-high":
              return b.price - a.price;
            case "name":
              return isRtl
                ? a.nameAr.localeCompare(b.nameAr)
                : a.nameEn.localeCompare(b.nameEn);
            case "recent":
            default:
              return (
                new Date(b.dateAdded).getTime() -
                new Date(a.dateAdded).getTime()
              );
          }
        }),
    [favorites, searchTerm, sortBy, isRtl]
  );

  // Loading state for auth check
  if (isAuthLoading) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center bg-white dark:bg-black px-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-200 border-t-black dark:border-neutral-800 dark:border-t-white" />
      </section>
    );
  }

  // Not authenticated state
  if (!isAuthenticated) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-white dark:bg-black px-4">
        <div className="w-full max-w-md border border-neutral-200 dark:border-neutral-800 p-8 text-center shadow-sm">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center border border-black dark:border-white">
            <Heart className="h-6 w-6" />
          </div>
          <h2 className="mb-2 text-2xl font-bold uppercase tracking-wider">
            {isRtl ? "تسجيل الدخول" : "Login Required"}
          </h2>
          <p className="mb-8 text-sm text-neutral-500">
            {isRtl
              ? "يرجى تسجيل الدخول للوصول إلى قائمة المفضلة"
              : "Please sign in to access your wishlist"}
          </p>
          <Link href="/auth/login" className="block w-full">
            <Button className="w-full rounded-none bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black">
              {isRtl ? "تسجيل الدخول" : "SIGN IN"}
            </Button>
          </Link>
        </div>
      </section>
    );
  }

  // Empty state
  if (!isLoading && favorites.length === 0) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-white dark:bg-black px-4">
        <div className="w-full max-w-md border border-neutral-200 dark:border-neutral-800 p-8 text-center shadow-sm">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center border border-neutral-200 dark:border-neutral-800">
            <ShoppingBag className="h-6 w-6 text-neutral-400" />
          </div>
          <h2 className="mb-2 text-2xl font-bold uppercase tracking-wider">
            {isRtl ? "القائمة فارغة" : "Wishlist Empty"}
          </h2>
          <p className="mb-8 text-sm text-neutral-500">
            {isRtl
              ? "لم تقم بحفظ أي منتجات بعد"
              : "You haven't saved any items yet"}
          </p>
          <Link href="/" className="block w-full">
            <Button className="w-full rounded-none bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black">
              {isRtl ? "تصفح المتجر" : "START SHOPPING"}
            </Button>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-white dark:bg-black pt-28 pb-12 sm:pt-40 sm:pb-20">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col items-center justify-center gap-6 border-b border-neutral-200 dark:border-neutral-800 pb-6 text-center sm:mb-16 sm:gap-8 sm:pb-8">
          {/* Toolbar */}
          <div className="flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder={isRtl ? "بحث..." : "SEARCH..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={cn(
                  "h-9 w-full min-w-[200px] border border-neutral-200 bg-transparent px-9 text-xs uppercase placeholder:text-neutral-400 focus:border-black focus:outline-none dark:border-neutral-800 dark:focus:border-white",
                  isRtl ? "pr-9 pl-3" : ""
                )}
              />
            </div>

            <div className="flex items-center gap-2">
              <Select
                value={sortBy}
                onValueChange={setSortBy}
                dir={isRtl ? "rtl" : "ltr"}
              >
                <SelectTrigger
                  className={cn(
                    "h-9 w-[140px] rounded-none border-neutral-200 bg-transparent text-xs uppercase focus:ring-0 dark:border-neutral-800",
                    isRtl ? "text-right" : "text-left"
                  )}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-none border-neutral-200 bg-white dark:bg-neutral-900 dark:border-neutral-800">
                  <SelectItem
                    value="recent"
                    className={cn(
                      "text-xs uppercase",
                      isRtl &&
                        "text-right pr-2 pl-8 [&>span]:left-2 [&>span]:right-auto"
                    )}
                  >
                    {isRtl ? "الأحدث" : "Newest"}
                  </SelectItem>
                  <SelectItem
                    value="price-low"
                    className={cn(
                      "text-xs uppercase",
                      isRtl &&
                        "text-right pr-2 pl-8 [&>span]:left-2 [&>span]:right-auto"
                    )}
                  >
                    {isRtl ? "الأقل سعراً" : "Price Low"}
                  </SelectItem>
                  <SelectItem
                    value="price-high"
                    className={cn(
                      "text-xs uppercase",
                      isRtl &&
                        "text-right pr-2 pl-8 [&>span]:left-2 [&>span]:right-auto"
                    )}
                  >
                    {isRtl ? "الأعلى سعراً" : "Price High"}
                  </SelectItem>
                </SelectContent>
              </Select>

              {favorites.length > 0 && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="h-9 rounded-none border-neutral-200 text-xs uppercase hover:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-900"
                    >
                      {isRtl ? "مسح" : "CLEAR"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="rounded-none border-neutral-200 bg-white dark:bg-neutral-900 dark:border-neutral-800">
                    <DialogHeader>
                      <DialogTitle className={cn(isRtl && "text-right")}>
                        {isRtl ? "هل أنت متأكد؟" : "Are you sure?"}
                      </DialogTitle>
                      <DialogDescription className={cn(isRtl && "text-right")}>
                        {isRtl
                          ? "سيتم حذف جميع المنتجات من المفضلة. هذا الإجراء لا يمكن التراجع عنه."
                          : "This action cannot be undone. This will permanently delete all items from your favorites."}
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter
                      className={cn(
                        isRtl &&
                          "flex-row-reverse sm:flex-row-reverse sm:justify-start"
                      )}
                    >
                      <DialogClose asChild>
                        <Button
                          variant="outline"
                          className="rounded-none border-neutral-200 uppercase dark:border-neutral-800"
                        >
                          {isRtl ? "إلغاء" : "Cancel"}
                        </Button>
                      </DialogClose>
                      <Button
                        onClick={() => clearFavorites()}
                        className="rounded-none bg-black uppercase text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
                      >
                        {isRtl ? "تأكيد الحذف" : "Continue"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          {!isLoading && filteredFavorites.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-12 lg:grid-cols-4"
            >
              {filteredFavorites.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  className="group relative"
                >
                  {/* Image */}
                  <Link href={`/product/${item.id}`} className="block">
                    <div className="relative mb-3 aspect-[3/4] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900 sm:mb-4">
                      <Image
                        src={item.imageUrl}
                        alt={isRtl ? item.nameAr : item.nameEn}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Overlay Button */}
                      <div className="absolute inset-x-0 bottom-0 p-2 opacity-100 transition-opacity duration-300 sm:p-4 lg:opacity-0 lg:group-hover:opacity-100">
                        <Button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            addToCart({
                              id: item.id,
                              nameEn: item.nameEn,
                              nameAr: item.nameAr,
                              price: item.price,
                              imageUrl: item.imageUrl,
                              categoryId: item.categoryId,
                              occasionId: item.occasionId,
                              isBestSeller: item.isBestSeller,
                              isSpecialGift: item.isSpecialGift,
                            });
                          }}
                          className="h-8 w-full rounded-none bg-white/90 text-[10px] text-black backdrop-blur-sm hover:bg-white dark:bg-black/90 dark:text-white dark:hover:bg-black sm:h-9 sm:text-xs"
                        >
                          {isRtl ? "إضافة للسلة" : "ADD TO CART"}
                        </Button>
                      </div>
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link href={`/product/${item.id}`}>
                        <h3 className="text-sm font-bold uppercase leading-tight tracking-wide transition-colors hover:text-neutral-600 dark:hover:text-neutral-400">
                          {isRtl ? item.nameAr : item.nameEn}
                        </h3>
                      </Link>
                      <div className="mt-1 flex items-center gap-1 text-sm font-medium text-neutral-500">
                        <span>{item.price.toLocaleString()}</span>
                        <RiyalSymbol />
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromFavorites(item.id)}
                      className="text-neutral-400 hover:text-black dark:hover:text-white"
                      aria-label="Remove"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            !isLoading &&
            searchTerm && (
              <div className="py-20 text-center">
                <p className="text-lg font-medium uppercase tracking-widest text-neutral-400">
                  {isRtl ? "لا توجد نتائج" : "NO RESULTS FOUND"}
                </p>
              </div>
            )
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
