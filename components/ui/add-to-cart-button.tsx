"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

type Product = {
  id: string;
  nameAr: string;
  nameEn: string;
  price: number;
  image: string;
};

type AddToCartButtonProps = {
  product: Product;
  isRtl: boolean;
  className?: string;
};

export function AddToCartButton({
  product,
  isRtl,
  className = "",
}: AddToCartButtonProps) {
  const [isAdded, setIsAdded] = useState(false);
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

    // Set visual feedback
    setIsAdded(true);

    try {
      await addToCart({
        id: product.id,
        nameEn: product.nameEn,
        nameAr: product.nameAr,
        price: product.price,
        imageUrl: product.image,
        categoryId: undefined,
        occasionId: undefined,
        isBestSeller: false,
        isSpecialGift: false,
      });

      // Remove visual feedback after 2 seconds
      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    } catch (error) {
      // Remove visual feedback immediately on error
      setIsAdded(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      aria-label={isRtl ? "أضف إلى السلة" : "Add to cart"}
      className={`inline-flex items-center gap-1.5 sm:gap-2 rounded-full px-4 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
        isAdded
          ? "bg-green-500 text-white"
          : "text-foreground hover:opacity-90"
      } ${isRtl ? "font-sans-ar" : "font-sans-en"} ${className}`}
      style={{
        backgroundColor: isAdded ? undefined : "rgb(var(--background))",
      }}
    >
      {isAdded ? (
        <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
      ) : (
        <ShoppingCart className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
      )}
      <span>
        {isAdded
          ? isRtl
            ? "تمت الإضافة"
            : "Added"
          : isRtl
          ? "أضف إلى السلة"
          : "Add to Cart"}
      </span>
    </button>
  );
}
