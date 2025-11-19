"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { useFavorites } from "@/context/FavoritesContext";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
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

  // State for animation triggers
  const [justAdded, setJustAdded] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const [prevFavoriteState, setPrevFavoriteState] = useState(isProductFavorite);

  // Track favorite status changes to trigger animations
  useEffect(() => {
    if (isProductFavorite && !prevFavoriteState) {
      // Just added to favorites
      setJustAdded(true);
      setShowSparkles(true);
      
      // Reset animation states after animation completes
      const timer = setTimeout(() => {
        setJustAdded(false);
      }, 600);

      const sparkleTimer = setTimeout(() => {
        setShowSparkles(false);
      }, 1200);

      return () => {
        clearTimeout(timer);
        clearTimeout(sparkleTimer);
      };
    }
    
    setPrevFavoriteState(isProductFavorite);
  }, [isProductFavorite, prevFavoriteState]);

  const handleToggle = (e: React.MouseEvent) => {
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

    // استدعاء الدالة بدون انتظار (fire and forget)
    if (isProductFavorite) {
      removeFromFavorites(productId).catch((error) => {
        console.error("Error removing from favorites:", error);
      });
    } else {
      // Convert Product to Favorite format
      // Support multiple image field names
      const imageUrl = 
        (product as any).imageUrl || 
        (product as any).mainImage || 
        (product as any).image || 
        "";

      addToFavorites({
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
      }).catch((error) => {
        console.error("Error adding to favorites:", error);
      });
    }
  };

  // Sparkle particles configuration
  const sparkles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    angle: (i * 360) / 12,
  }));

  return (
    <motion.button
      onClick={handleToggle}
      className={`relative flex items-center justify-center w-full h-full ${className}`}
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
      {/* Ripple effect */}
      <AnimatePresence>
        {justAdded && isProductFavorite && (
          <motion.div
            className="absolute inset-0 rounded-full bg-red-500/30"
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ 
              scale: 2.5, 
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
            style={{
              left: "50%",
              top: "50%",
              marginLeft: "-50%",
              marginTop: "-50%",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
            }}
          />
        )}
      </AnimatePresence>

      {/* Sparkles animation */}
      <AnimatePresence>
        {showSparkles && isProductFavorite && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            {sparkles.map((sparkle) => {
              const radians = (sparkle.angle * Math.PI) / 180;
              // Use a larger multiplier for distance relative to size
              const distance = size * 2;
              const x = Math.cos(radians) * distance;
              const y = Math.sin(radians) * distance;

              return (
                <motion.div
                  key={sparkle.id}
                  className="absolute w-1.5 h-1.5 bg-red-500 rounded-full"
                  initial={{ 
                    opacity: 0, 
                    scale: 0,
                    x: 0,
                    y: 0,
                  }}
                  animate={{ 
                    opacity: [0, 1, 0.8, 0],
                    scale: [0, 1.2, 0.8, 0],
                    x: x,
                    y: y,
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: sparkle.id * 0.04,
                    ease: "easeOut",
                  }}
                  style={{
                    left: "50%",
                    top: "50%",
                    marginLeft: "-3px",
                    marginTop: "-3px",
                  }}
                />
              );
            })}
          </div>
        )}
      </AnimatePresence>

      {/* Heart icon with bounce animation */}
      <motion.div
        animate={
          justAdded && isProductFavorite
            ? {
                scale: [1, 1.4, 1.1, 1],
                rotate: [0, -10, 10, 0],
              }
            : {}
        }
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
      >
        <Heart
          size={size}
          className={`transition-colors duration-300 ${
            isProductFavorite
              ? "fill-red-500 text-red-500"
              : "text-foreground"
          }`}
        />
      </motion.div>
    </motion.button>
  );
}

