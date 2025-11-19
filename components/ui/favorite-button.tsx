"use client";

import { Heart } from "lucide-react";
import { useFavorites } from "@/context/FavoritesContext";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import type { Product } from "@/types/product";

// Support both Product types (from types/product.ts and local types in sections)
type ProductLike = 
  | Product
  | {
      id?: string;
      _id?: string;
      nameEn: string;
      nameAr: string;
      price: number;
      mainImage?: string;
      image?: string;
      imageUrl?: string;
      categoryId?: string;
      occasionId?: string;
      productStatus?: string[];
      isBestSeller?: boolean;
      isSpecialGift?: boolean;
    };

interface FavoriteButtonProps {
  product: ProductLike;
  className?: string;
  size?: number;
}

export function FavoriteButton({
  product,
  className = "",
  size = 18,
}: FavoriteButtonProps) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  // Get product ID (support both id and _id)
  const productId = (product as any).id || (product as any)._id || "";
  const isProductFavorite = isFavorite(productId);

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      toast({
        title: isRtl ? "تسجيل الدخول مطلوب" : "Login Required",
        description: isRtl
          ? "يجب تسجيل الدخول لإضافة المنتجات إلى المفضلة"
          : "Please login to add products to favorites",
        variant: "destructive",
      });
      return;
    }

    try {
      if (isProductFavorite) {
        await removeFromFavorites(productId);
      } else {
        // Convert Product to Favorite format
        // Support multiple image field names
        const imageUrl = 
          (product as any).imageUrl || 
          (product as any).mainImage || 
          (product as any).image || 
          "";

        await addToFavorites({
          id: productId,
          nameEn: product.nameEn,
          nameAr: product.nameAr,
          price: product.price,
          imageUrl: imageUrl,
          categoryId: (product as any).categoryId,
          occasionId: (product as any).occasionId,
          isBestSeller: 
            (product as any).isBestSeller || 
            (product as any).productStatus?.includes("best-seller") || 
            false,
          isSpecialGift: 
            (product as any).isSpecialGift || 
            (product as any).productStatus?.includes("special-gift") || 
            false,
        });
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <motion.button
      onClick={handleToggle}
      className={className}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={
        isProductFavorite
          ? isRtl
            ? "حذف من المفضلة"
            : "Remove from favorites"
          : isRtl
          ? "إضافة للمفضلة"
          : "Add to favorites"
      }
    >
      <Heart
        size={size}
        className={`transition-colors ${
          isProductFavorite
            ? "fill-red-500 text-red-500"
            : "text-foreground"
        }`}
      />
    </motion.button>
  );
}

