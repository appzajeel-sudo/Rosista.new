"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ShoppingBag, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FavoriteButton } from "@/components/ui/favorite-button";
import type { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

const RiyalSymbol = ({ className = "w-4 h-4" }) => (
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

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const name = isRtl ? product.nameAr : product.nameEn;

  // Cart Logic
  const [isAdded, setIsAdded] = useState(false);
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      toast({
        title: isRtl ? "تسجيل الدخول مطلوب" : "Login Required",
        description: isRtl
          ? "يجب تسجيل الدخول لإضافة المنتجات إلى السلة"
          : "Please login to add products to cart",
        variant: "destructive",
      });
      return;
    }

    // Oimtistic UI: Update button state immediately
    setIsAdded(true);

    try {
      // Fire request in background but await to catch errors if needed
      // (Using await here to ensure we catch network errors,
      // but the UI updated first so user perceives it as instant)
      // Note: If you want true fire-and-forget without waiting, remove 'await'.
      // But keeping await with the state already set gives the best balance.
      // Actually, to make it TRULY fast like the favorite button, we should not await inside the UI block,
      // or effectively fire-and-forget.
      addToCart({
        id: product._id,
        nameEn: product.nameEn,
        nameAr: product.nameAr,
        price: product.price,
        imageUrl: product.mainImage,
        categoryId: undefined,
        occasionId: undefined,
        isBestSeller: false,
        isSpecialGift: false,
      }).catch((err) => {
        console.error("Failed to add to cart", err);
        setIsAdded(false); // Revert on error
        toast({
          title: isRtl ? "خطأ" : "Error",
          description: isRtl ? "فشل إضافة المنتج" : "Failed to add product",
          variant: "destructive",
        });
      });

      // Reset state after 2 seconds automatically to let user add again
      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    } catch (error) {
      // This catch block might not be reached if we don't await addToCart,
      // but using .catch on the promise handles it.
      setIsAdded(false);
    }
  };

  return (
    <div className="group w-full flex flex-col gap-3">
      {/* Image Container - Borderless, Rounded */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[20px] bg-gray-100 dark:bg-neutral-900 shadow-sm transition-shadow duration-300 hover:shadow-md">
        <Link
          href={`/products/${product.slug}`}
          className="block h-full w-full"
        >
          <Image
            src={product.mainImage}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>

        {/* Favorite Button */}
        <div className="absolute top-3 right-3 z-10">
          <FavoriteButton product={product} size={20} className="p-1.5" />
        </div>
      </div>

      {/* Info & Action */}
      <div className="flex flex-col gap-2 px-1">
        {/* Title */}
        <Link
          href={`/products/${product.slug}`}
          className="group-hover:text-primary-600 transition-colors"
        >
          <h3
            className={`text-base font-semibold text-black dark:text-white line-clamp-1 leading-normal ${
              isRtl ? "font-sans-ar" : "font-sans-en"
            }`}
          >
            {name}
          </h3>
        </Link>

        {/* Action Row: Price + Button */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1 text-black dark:text-white">
            <span className="text-lg font-bold">
              {product.price.toLocaleString()}
            </span>
            <RiyalSymbol className="w-3.5 h-3.5 mt-0.5" />
          </div>

          <Button
            onClick={handleAddToCart}
            disabled={loading} // Only disable if strictly loading (though we rely on isAdded now)
            variant="default"
            size="sm"
            className={`h-9 px-4 rounded-full min-w-[90px] transition-all duration-300 cursor-pointer ${
              isAdded
                ? "bg-green-600 hover:bg-green-700 text-white border-transparent"
                : "bg-black text-white hover:bg-rose-600 hover:text-white dark:bg-white dark:text-black dark:hover:bg-rose-600 dark:hover:text-white"
            } ${isRtl ? "font-sans-ar" : "font-sans-en"}`}
          >
            {loading ? (
              // We might not use loading state visibly if optimisitic,
              // but keeping fallback logic just in case
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : isAdded ? (
              <>
                {isRtl ? "تم" : "Added"}
                <Check className="w-3.5 h-3.5 ml-1.5" />
              </>
            ) : (
              <>
                {isRtl ? "أضف" : "Add"}
                <ShoppingBag className="w-3.5 h-3.5 ml-1.5" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
