"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ShoppingBag, X, Search, Plus, Minus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
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

export default function CartPage() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const {
    cart,
    totalAmount,
    removeFromCart,
    updateCartItem,
    clearCart,
    isLoading,
    refreshCart,
  } = useCart();
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();

  const [searchTerm, setSearchTerm] = useState("");

  // Filter cart items
  const filteredCart = useMemo(
    () =>
      cart.filter((item) => {
        const matchesSearch =
          searchTerm === "" ||
          (isRtl ? item.nameAr : item.nameEn)
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        return matchesSearch;
      }),
    [cart, searchTerm, isRtl]
  );

  // Load cart when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      refreshCart(true); // Force full fetch when visiting the page
    }
  }, [isAuthenticated, refreshCart]);

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
            <ShoppingBag className="h-6 w-6" />
          </div>
          <h2 className="mb-2 text-2xl font-bold uppercase tracking-wider">
            {isRtl ? "تسجيل الدخول" : "Login Required"}
          </h2>
          <p className="mb-8 text-sm text-neutral-500">
            {isRtl
              ? "يرجى تسجيل الدخول للوصول إلى السلة"
              : "Please sign in to access your cart"}
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
  if (!isLoading && cart.length === 0) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-white dark:bg-black px-4">
        <div className="w-full max-w-md border border-neutral-200 dark:border-neutral-800 p-8 text-center shadow-sm">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center border border-neutral-200 dark:border-neutral-800">
            <ShoppingBag className="h-6 w-6 text-neutral-400" />
          </div>
          <h2 className="mb-2 text-2xl font-bold uppercase tracking-wider">
            {isRtl ? "السلة فارغة" : "Cart Empty"}
          </h2>
          <p className="mb-8 text-sm text-neutral-500">
            {isRtl
              ? "لم تقم بإضافة أي منتجات إلى السلة بعد"
              : "You haven't added any items to cart yet"}
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
          <h1
            className={`text-3xl font-bold uppercase tracking-widest ${
              isRtl ? "font-sans-ar" : "font-sans-en"
            }`}
          >
            {isRtl ? "السلة" : "CART"}
          </h1>

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

            {cart.length > 0 && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-9 rounded-none border-neutral-200 text-xs uppercase hover:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-900"
                  >
                    {isRtl ? "مسح السلة" : "CLEAR CART"}
                  </Button>
                </DialogTrigger>
                <DialogContent className="rounded-none border-neutral-200 bg-white dark:bg-neutral-900 dark:border-neutral-800">
                  <DialogHeader>
                    <DialogTitle className={cn(isRtl && "text-right")}>
                      {isRtl ? "هل أنت متأكد؟" : "Are you sure?"}
                    </DialogTitle>
                    <DialogDescription className={cn(isRtl && "text-right")}>
                      {isRtl
                        ? "سيتم حذف جميع المنتجات من السلة. هذا الإجراء لا يمكن التراجع عنه."
                        : "This action cannot be undone. This will permanently delete all items from your cart."}
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
                      onClick={() => clearCart()}
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

        {/* Cart Items */}
        <AnimatePresence mode="wait">
          {!isLoading && filteredCart.length > 0 ? (
            <div className="space-y-6">
              {filteredCart.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  className="flex flex-col gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-6 sm:flex-row sm:items-center sm:gap-6"
                >
                  {/* Image */}
                  <Link href={`/product/${item.id}`} className="block shrink-0">
                    <div className="relative h-32 w-32 overflow-hidden bg-neutral-100 dark:bg-neutral-900 sm:h-40 sm:w-40">
                      <Image
                        src={item.imageUrl}
                        alt={isRtl ? item.nameAr : item.nameEn}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="flex flex-1 flex-col gap-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <Link href={`/product/${item.id}`}>
                          <h3
                            className={`mb-1 text-base font-bold uppercase leading-tight tracking-wide transition-colors hover:text-neutral-600 dark:hover:text-neutral-400 ${
                              isRtl ? "font-sans-ar" : "font-sans-en"
                            }`}
                          >
                            {isRtl ? item.nameAr : item.nameEn}
                          </h3>
                        </Link>
                        <div
                          className={`flex items-center gap-1 text-base font-medium text-neutral-500 ${
                            isRtl ? "font-sans-ar" : "font-sans-en"
                          }`}
                        >
                          <span>{item.price.toLocaleString()}</span>
                          <RiyalSymbol />
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-neutral-400 transition-colors hover:text-black dark:hover:text-white"
                        aria-label={isRtl ? "حذف" : "Remove"}
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    {/* Quantity Control */}
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 border border-neutral-200 dark:border-neutral-800">
                        <button
                          onClick={() => {
                            if (item.quantity > 1) {
                              updateCartItem(item.id, item.quantity - 1);
                            }
                          }}
                          disabled={item.quantity <= 1}
                          className="flex h-9 w-9 items-center justify-center transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
                          aria-label={isRtl ? "تقليل" : "Decrease"}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span
                          className={`min-w-[3ch] text-center text-sm font-medium ${
                            isRtl ? "font-sans-ar" : "font-sans-en"
                          }`}
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateCartItem(item.id, item.quantity + 1)
                          }
                          className="flex h-9 w-9 items-center justify-center transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
                          aria-label={isRtl ? "زيادة" : "Increase"}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Subtotal */}
                      <div
                        className={`flex items-center gap-1 text-lg font-bold ${
                          isRtl ? "font-sans-ar" : "font-sans-en"
                        }`}
                      >
                        <span>
                          {(item.price * item.quantity).toLocaleString()}
                        </span>
                        <RiyalSymbol className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Total */}
              <div className="mt-8 border-t border-neutral-200 dark:border-neutral-800 pt-6">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xl font-bold uppercase tracking-wider ${
                      isRtl ? "font-sans-ar" : "font-sans-en"
                    }`}
                  >
                    {isRtl ? "الإجمالي" : "TOTAL"}
                  </span>
                  <div
                    className={`flex items-center gap-1 text-2xl font-bold ${
                      isRtl ? "font-sans-ar" : "font-sans-en"
                    }`}
                  >
                    <span>{totalAmount.toLocaleString()}</span>
                    <RiyalSymbol className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-6">
                  <Button
                    className="w-full rounded-none bg-black text-white uppercase hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
                    disabled={cart.length === 0}
                  >
                    {isRtl ? "إتمام الطلب" : "CHECKOUT"}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            !isLoading &&
            searchTerm && (
              <div className="py-20 text-center">
                <p
                  className={`text-lg font-medium uppercase tracking-widest text-neutral-400 ${
                    isRtl ? "font-sans-ar" : "font-sans-en"
                  }`}
                >
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
