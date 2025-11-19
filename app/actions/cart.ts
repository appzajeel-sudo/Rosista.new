"use server";

import { cookies } from "next/headers";
import type {
  CartResponse,
  AddToCartRequest,
  AddToCartResponse,
  UpdateCartItemResponse,
  RemoveFromCartResponse,
  ClearCartResponse,
  CartCountResponse,
} from "@/types/cart";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  getCartCount,
} from "@/lib/api/cart";
import { refreshTokenAction } from "./auth";

// Get API base URL from environment variable
const getApiBaseUrl = (): string => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not set in environment variables.");
  }

  return apiUrl;
};

// Get Cart - قراءة accessToken من cookie
export async function getCartAction(): Promise<CartResponse | null> {
  try {
    const cookieStore = await cookies();
    let accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return null;
    }

    const baseUrl = getApiBaseUrl();
    const url = `${baseUrl}/api/cart`;

    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });

    // إذا كان التوكن منتهي الصلاحية، حاول refresh
    if (response.status === 401) {
      try {
        await refreshTokenAction();
        const newCookieStore = await cookies();
        accessToken = newCookieStore.get("accessToken")?.value;

        if (!accessToken) {
          return null;
        }

        response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          credentials: "include",
        });
      } catch {
        return null;
      }
    }

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Get cart action error:", error);
    return null;
  }
}

// Get Cart Count - قراءة accessToken من cookie
export async function getCartCountAction(): Promise<number> {
  try {
    const cookieStore = await cookies();
    let accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return 0;
    }

    const baseUrl = getApiBaseUrl();
    const url = `${baseUrl}/api/cart/count`;

    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });

    // إذا كان التوكن منتهي الصلاحية، حاول refresh
    if (response.status === 401) {
      try {
        await refreshTokenAction();
        const newCookieStore = await cookies();
        accessToken = newCookieStore.get("accessToken")?.value;

        if (!accessToken) {
          return 0;
        }

        response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          credentials: "include",
        });
      } catch {
        return 0;
      }
    }

    if (!response.ok) {
      return 0;
    }

    const data = await response.json();
    return data.count || 0;
  } catch (error) {
    console.error("Get cart count action error:", error);
    return 0;
  }
}

// Add to Cart - قراءة accessToken من cookie
export async function addToCartAction(
  data: AddToCartRequest
): Promise<AddToCartResponse> {
  try {
    const cookieStore = await cookies();
    let accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      throw new Error("Not authenticated");
    }

    return await addToCart(data, accessToken);
  } catch (error) {
    console.error("Add to cart action error:", error);
    throw error;
  }
}

// Update Cart Item - قراءة accessToken من cookie
export async function updateCartItemAction(
  productId: string,
  quantity: number
): Promise<UpdateCartItemResponse> {
  try {
    const cookieStore = await cookies();
    let accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      throw new Error("Not authenticated");
    }

    return await updateCartItem(productId, quantity, accessToken);
  } catch (error) {
    console.error("Update cart item action error:", error);
    throw error;
  }
}

// Remove from Cart - قراءة accessToken من cookie
export async function removeFromCartAction(
  productId: string
): Promise<RemoveFromCartResponse> {
  try {
    const cookieStore = await cookies();
    let accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      throw new Error("Not authenticated");
    }

    return await removeFromCart(productId, accessToken);
  } catch (error) {
    console.error("Remove from cart action error:", error);
    throw error;
  }
}

// Clear Cart - قراءة accessToken من cookie
export async function clearCartAction(): Promise<ClearCartResponse> {
  try {
    const cookieStore = await cookies();
    let accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      throw new Error("Not authenticated");
    }

    return await clearCart(accessToken);
  } catch (error) {
    console.error("Clear cart action error:", error);
    throw error;
  }
}
