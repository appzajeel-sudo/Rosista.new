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
import type { CartItem, AddToCartRequest } from "@/types/cart";
import {
  getCartAction,
  addToCartAction,
  updateCartItemAction,
  removeFromCartAction,
  clearCartAction,
  getCartCountAction,
} from "@/app/actions/cart";
import { useAuth } from "./AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useDebug } from "@/context/DebugContext";

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  totalAmount: number;
  isLoading: boolean;
  addToCart: (
    product: {
      id: string;
      nameEn: string;
      nameAr: string;
      price: number;
      imageUrl: string;
      categoryId?: string;
      occasionId?: string;
      isBestSeller?: boolean;
      isSpecialGift?: boolean;
    },
    quantity?: number
  ) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateCartItem: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: (full?: boolean) => Promise<void>;
  refreshCount: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const router = useRouter();
  const { addLog } = useDebug();

  const refreshCart = useCallback(async (full = false) => {
    if (!isAuthenticated) {
      setCart([]);
      setCartCount(0);
      setTotalAmount(0);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      if (full) {
        // Full fetch (Heavy)
        const data = await getCartAction();
        if (data) {
          setCart(data.items || []);
          setCartCount(data.cartCount || data.totalItems || 0);
          setTotalAmount(data.totalAmount || 0);
          addLog("CartContext", { action: "refreshCart (Full)", data }, "client");
        } else {
          setCart([]);
          setCartCount(0);
          setTotalAmount(0);
        }
      } else {
        // Count fetch (Lightweight)
        const data = await getCartCountAction();
        setCartCount(data.count || 0);
        setTotalAmount(data.total || 0);
        addLog("CartContext", { action: "refreshCart (Light)", data }, "client");
      }
    } catch (error) {
      console.error("Error refreshing cart:", error);
      // Do not clear cart on error
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, addLog]);

  const refreshCount = useCallback(async () => {
    if (!isAuthenticated) {
      setCartCount(0);
      setTotalAmount(0);
      return;
    }

    try {
      const data = await getCartCountAction();
      setCartCount(data.count || 0);
      setTotalAmount(data.total || 0);
    } catch (error) {
      console.error("Error refreshing cart count:", error);
    }
  }, [isAuthenticated]);

  // Load cart when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      refreshCart(false); // Lightweight fetch by default
    } else {
      setCart([]);
      setCartCount(0);
      setTotalAmount(0);
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, refreshCart]);

  const handleAddToCart = useCallback(
    async (
      product: {
        id: string;
        nameEn: string;
        nameAr: string;
        price: number;
        imageUrl: string;
        categoryId?: string;
        occasionId?: string;
        isBestSeller?: boolean;
        isSpecialGift?: boolean;
      },
      quantity: number = 1
    ) => {
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

      setIsLoading(true);
      try {
        const requestData: AddToCartRequest = {
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
          quantity,
        };

        const response = await addToCartAction(requestData);

        // Refresh cart to get updated state
        await refreshCart();

        toast({
          title: isRtl ? "تم الإضافة" : "Added",
          description: isRtl
            ? `تم إضافة ${product.nameAr} إلى السلة`
            : `${product.nameEn} added to cart`,
        });
      } catch (error: any) {
        console.error("Error adding to cart:", error);
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
    [isAuthenticated, toast, isRtl, refreshCart]
  );

  const handleRemoveFromCart = useCallback(
    async (productId: string) => {
      if (!isAuthenticated) {
        return;
      }

      setIsLoading(true);
      try {
        await removeFromCartAction(productId);

        // Refresh cart to get updated state
        await refreshCart();

        toast({
          title: isRtl ? "تم الحذف" : "Removed",
          description: isRtl
            ? "تم حذف المنتج من السلة"
            : "Product removed from cart",
        });
      } catch (error: any) {
        console.error("Error removing from cart:", error);
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
    [isAuthenticated, toast, isRtl, refreshCart]
  );

  const handleUpdateCartItem = useCallback(
    async (productId: string, quantity: number) => {
      if (!isAuthenticated) {
        return;
      }

      if (quantity < 1) {
        return;
      }

      setIsLoading(true);
      try {
        await updateCartItemAction(productId, quantity);

        // Refresh cart to get updated state
        await refreshCart();

        toast({
          title: isRtl ? "تم التحديث" : "Updated",
          description: isRtl ? "تم تحديث الكمية" : "Quantity updated",
        });
      } catch (error: any) {
        console.error("Error updating cart item:", error);
        toast({
          title: isRtl ? "خطأ" : "Error",
          description:
            error.message ||
            (isRtl ? "فشل تحديث الكمية" : "Failed to update quantity"),
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [isAuthenticated, toast, isRtl, refreshCart]
  );

  const handleClearCart = useCallback(async () => {
    if (!isAuthenticated) {
      return;
    }

    setIsLoading(true);
    try {
      await clearCartAction();
      setCart([]);
      setCartCount(0);
      setTotalAmount(0);

      toast({
        title: isRtl ? "تم المسح" : "Cleared",
        description: isRtl ? "تم مسح السلة" : "Cart cleared",
      });
    } catch (error: any) {
      console.error("Error clearing cart:", error);
      toast({
        title: isRtl ? "خطأ" : "Error",
        description:
          error.message || (isRtl ? "فشل مسح السلة" : "Failed to clear cart"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, toast, isRtl]);

  const value: CartContextType = {
    cart,
    cartCount,
    totalAmount,
    isLoading,
    addToCart: handleAddToCart,
    removeFromCart: handleRemoveFromCart,
    updateCartItem: handleUpdateCartItem,
    clearCart: handleClearCart,
    refreshCart,
    refreshCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
