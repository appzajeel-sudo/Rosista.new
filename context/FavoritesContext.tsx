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
  getFavoriteIdsAction,
  addToFavoritesAction,
  removeFromFavoritesAction,
  clearFavoritesAction,
  getFavoritesCountAction,
} from "@/app/actions/favorites";
import { useAuth } from "./AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useDebug } from "@/context/DebugContext";

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
  refreshFavorites: (full?: boolean) => Promise<void>;
  refreshCount: () => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const router = useRouter();
  const { addLog } = useDebug();

  const refreshFavorites = useCallback(async (full = false) => {
    if (!isAuthenticated) {
      setFavorites([]);
      setFavoriteIds(new Set());
      setFavoritesCount(0);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      if (full) {
        // Full fetch (Heavy)
        const data = await getFavoritesAction();
        if (data) {
          setFavorites(data.favorites || []);
          setFavoritesCount(data.count || 0);
          // Also update IDs
          const ids = new Set(data.favorites.map(f => f.id));
          setFavoriteIds(ids);
          addLog("FavoritesContext", { action: "refreshFavorites (Full)", data }, "client");
        } else {
          setFavorites([]);
          setFavoriteIds(new Set());
          setFavoritesCount(0);
        }
      } else {
        // ID fetch (Lightweight)
        const data = await getFavoriteIdsAction();
        if (data) {
          setFavoriteIds(new Set(data.ids));
          setFavoritesCount(data.count || 0);
          addLog("FavoritesContext", { action: "refreshFavorites (Light)", data }, "client");
        } else {
          setFavoriteIds(new Set());
          setFavoritesCount(0);
        }
      }
    } catch (error) {
      console.error("Error refreshing favorites:", error);
      setFavorites([]);
      setFavoriteIds(new Set());
      setFavoritesCount(0);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, addLog]);

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
      refreshFavorites(false); // Lightweight fetch by default
    } else {
      setFavorites([]);
      setFavoriteIds(new Set());
      setFavoritesCount(0);
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, refreshFavorites]);

  const isFavorite = useCallback(
    (productId: string) => {
      return favoriteIds.has(productId);
    },
    [favoriteIds]
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

      // Optimistic update: تحديث الحالة فوراً
      const tempFavorite: FavoriteItem = {
        ...product,
        dateAdded: new Date().toISOString(),
      };
      
      // حفظ الحالة السابقة للتراجع في حالة الفشل
      const previousFavorites = [...favorites];
      const previousCount = favoritesCount;
      
      // تحديث الحالة فوراً
      setFavorites((prev) => {
        // تجنب الإضافة المكررة
        if (prev.some((fav) => fav.id === product.id)) {
          return prev;
        }
        return [tempFavorite, ...prev];
      });
      setFavoriteIds((prev) => {
        const next = new Set(prev);
        next.add(product.id);
        return next;
      });
      setFavoritesCount((prev) => prev + 1);

      // إرسال الطلب في الخلفية
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

        // تحديث الحالة بالبيانات الصحيحة من السيرفر
        const newFavorite: FavoriteItem = {
          ...product,
          dateAdded: response.favorite.dateAdded,
        };
        setFavorites((prev) => {
          // إزالة النسخة المؤقتة وإضافة النسخة الصحيحة
          const filtered = prev.filter((fav) => fav.id !== product.id);
          return [newFavorite, ...filtered];
        });

        // toast({
        //   title: isRtl ? "تم الإضافة" : "Added",
        //   description: isRtl
        //     ? `تم إضافة ${product.nameAr} إلى المفضلة`
        //     : `${product.nameEn} added to favorites`,
        // });
      } catch (error: any) {
        console.error("Error adding to favorites:", error);
        
        // إرجاع الحالة إلى ما كانت عليه في حالة الفشل
        setFavorites(previousFavorites);
        setFavoritesCount(previousCount);
        
        toast({
          title: isRtl ? "خطأ" : "Error",
          description:
            error.message ||
            (isRtl ? "فشل إضافة المنتج" : "Failed to add product"),
          variant: "destructive",
        });
      }
    },
    [isAuthenticated, toast, isRtl, favorites, favoritesCount]
  );

  const handleRemoveFromFavorites = useCallback(
    async (productId: string) => {
      if (!isAuthenticated) {
        return;
      }

      // Optimistic update: تحديث الحالة فوراً
      // حفظ الحالة السابقة للتراجع في حالة الفشل
      const previousFavorites = [...favorites];
      const previousCount = favoritesCount;
      
      // تحديث الحالة فوراً
      setFavorites((prev) => prev.filter((fav) => fav.id !== productId));
      setFavoriteIds((prev) => {
        const next = new Set(prev);
        next.delete(productId);
        return next;
      });
      setFavoritesCount((prev) => Math.max(0, prev - 1));

      // إرسال الطلب في الخلفية
      try {
        await removeFromFavoritesAction(productId);

        // toast({
        //   title: isRtl ? "تم الحذف" : "Removed",
        //   description: isRtl
        //     ? "تم حذف المنتج من المفضلة"
        //     : "Product removed from favorites",
        // });
      } catch (error: any) {
        console.error("Error removing from favorites:", error);
        
        // إرجاع الحالة إلى ما كانت عليه في حالة الفشل
        setFavorites(previousFavorites);
        setFavoritesCount(previousCount);
        
        toast({
          title: isRtl ? "خطأ" : "Error",
          description:
            error.message ||
            (isRtl ? "فشل حذف المنتج" : "Failed to remove product"),
          variant: "destructive",
        });
      }
    },
    [isAuthenticated, toast, isRtl, favorites, favoritesCount]
  );

  const handleClearFavorites = useCallback(async () => {
    if (!isAuthenticated) {
      return;
    }

    setIsLoading(true);
    try {
      await clearFavoritesAction();
      setFavorites([]);
      setFavoriteIds(new Set());
      setFavoritesCount(0);

      // toast({
      //   title: isRtl ? "تم المسح" : "Cleared",
      //   description: isRtl
      //     ? "تم مسح جميع المفضلة"
      //     : "All favorites cleared",
      // });
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

