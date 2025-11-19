"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import type { FavoriteItem, AddToFavoritesRequest } from "@/types/favorites";
import {
  getFavoritesAction,
  addToFavoritesAction,
  removeFromFavoritesAction,
  clearFavoritesAction,
  getFavoritesCountAction,
} from "@/app/actions/favorites";
import { useAuth } from "./AuthContext";
import { useToast } from "@/hooks/use-toast";

interface FavoritesContextType {
  favorites: FavoriteItem[];
  favoritesCount: number;
  isLoading: boolean;
  isFavorite: (productId: string) => boolean;
  addToFavorites: (product: {
    id: string;
    nameEn: string;
    nameAr: string;
    price: number;
    imageUrl: string;
    categoryId?: string;
    occasionId?: string;
    isBestSeller?: boolean;
    isSpecialGift?: boolean;
  }) => Promise<void>;
  removeFromFavorites: (productId: string) => Promise<void>;
  clearFavorites: () => Promise<void>;
  refreshFavorites: () => Promise<void>;
  refreshCount: () => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const router = useRouter();

  const refreshFavorites = useCallback(async () => {
    if (!isAuthenticated) {
      setFavorites([]);
      setFavoritesCount(0);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const data = await getFavoritesAction();
      if (data) {
        setFavorites(data.favorites || []);
        setFavoritesCount(data.count || 0);
      } else {
        setFavorites([]);
        setFavoritesCount(0);
      }
    } catch (error) {
      console.error("Error refreshing favorites:", error);
      setFavorites([]);
      setFavoritesCount(0);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  const refreshCount = useCallback(async () => {
    if (!isAuthenticated) {
      setFavoritesCount(0);
      return;
    }

    try {
      const count = await getFavoritesCountAction();
      setFavoritesCount(count || 0);
    } catch (error) {
      console.error("Error refreshing favorites count:", error);
    }
  }, [isAuthenticated]);

  // Load favorites when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      refreshFavorites();
    } else {
      setFavorites([]);
      setFavoritesCount(0);
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, refreshFavorites]);

  const isFavorite = useCallback(
    (productId: string) => {
      return favorites.some((fav) => fav.id === productId);
    },
    [favorites]
  );

  const handleAddToFavorites = useCallback(
    async (product: {
      id: string;
      nameEn: string;
      nameAr: string;
      price: number;
      imageUrl: string;
      categoryId?: string;
      occasionId?: string;
      isBestSeller?: boolean;
      isSpecialGift?: boolean;
    }) => {
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

      setIsLoading(true);
      try {
        const requestData: AddToFavoritesRequest = {
          productData: {
            id: product.id,
            nameEn: product.nameEn,
            nameAr: product.nameAr,
            price: product.price,
            imageUrl: product.imageUrl,
            categoryId: product.categoryId,
            occasionId: product.occasionId,
            isBestSeller: product.isBestSeller || false,
            isSpecialGift: product.isSpecialGift || false,
          },
        };

        const response = await addToFavoritesAction(requestData);

        // Update local state
        const newFavorite: FavoriteItem = {
          ...product,
          dateAdded: response.favorite.dateAdded,
        };
        setFavorites((prev) => [newFavorite, ...prev]);
        setFavoritesCount((prev) => prev + 1);

        toast({
          title: isRtl ? "تم الإضافة" : "Added",
          description: isRtl
            ? `تم إضافة ${product.nameAr} إلى المفضلة`
            : `${product.nameEn} added to favorites`,
        });
      } catch (error: any) {
        console.error("Error adding to favorites:", error);
        toast({
          title: isRtl ? "خطأ" : "Error",
          description:
            error.message ||
            (isRtl ? "فشل إضافة المنتج" : "Failed to add product"),
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [isAuthenticated, toast, isRtl]
  );

  const handleRemoveFromFavorites = useCallback(
    async (productId: string) => {
      if (!isAuthenticated) {
        return;
      }

      setIsLoading(true);
      try {
        await removeFromFavoritesAction(productId);
        setFavorites((prev) => prev.filter((fav) => fav.id !== productId));
        setFavoritesCount((prev) => Math.max(0, prev - 1));

        toast({
          title: isRtl ? "تم الحذف" : "Removed",
          description: isRtl
            ? "تم حذف المنتج من المفضلة"
            : "Product removed from favorites",
        });
      } catch (error: any) {
        console.error("Error removing from favorites:", error);
        toast({
          title: isRtl ? "خطأ" : "Error",
          description:
            error.message ||
            (isRtl ? "فشل حذف المنتج" : "Failed to remove product"),
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [isAuthenticated, toast, isRtl]
  );

  const handleClearFavorites = useCallback(async () => {
    if (!isAuthenticated) {
      return;
    }

    setIsLoading(true);
    try {
      await clearFavoritesAction();
      setFavorites([]);
      setFavoritesCount(0);

      toast({
        title: isRtl ? "تم المسح" : "Cleared",
        description: isRtl
          ? "تم مسح جميع المفضلة"
          : "All favorites cleared",
      });
    } catch (error: any) {
      console.error("Error clearing favorites:", error);
      toast({
        title: isRtl ? "خطأ" : "Error",
        description:
          error.message ||
          (isRtl ? "فشل مسح المفضلة" : "Failed to clear favorites"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, toast, isRtl]);

  const value: FavoritesContextType = {
    favorites,
    favoritesCount,
    isLoading,
    isFavorite,
    addToFavorites: handleAddToFavorites,
    removeFromFavorites: handleRemoveFromFavorites,
    clearFavorites: handleClearFavorites,
    refreshFavorites,
    refreshCount,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}

