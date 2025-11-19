// API Service for Cart
import type {
  CartResponse,
  AddToCartRequest,
  AddToCartResponse,
  UpdateCartItemRequest,
  UpdateCartItemResponse,
  RemoveFromCartResponse,
  ClearCartResponse,
  CartCountResponse,
} from "@/types/cart";

// Get API base URL from environment variable
const getApiBaseUrl = (): string => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error(
      "NEXT_PUBLIC_API_URL is not set in environment variables. Please add it to your .env.local file."
    );
  }

  return apiUrl;
};

// Get user's cart
export async function getCart(accessToken: string): Promise<CartResponse> {
  try {
    const baseUrl = getApiBaseUrl();
    const url = `${baseUrl}/api/cart`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to get cart");
    }

    return await response.json();
  } catch (error) {
    console.error("Get cart error:", error);
    throw error;
  }
}

// Add item to cart
export async function addToCart(
  data: AddToCartRequest,
  accessToken: string
): Promise<AddToCartResponse> {
  try {
    const baseUrl = getApiBaseUrl();
    const url = `${baseUrl}/api/cart/add`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to add to cart");
    }

    return await response.json();
  } catch (error) {
    console.error("Add to cart error:", error);
    throw error;
  }
}

// Update item quantity in cart
export async function updateCartItem(
  productId: string,
  quantity: number,
  accessToken: string
): Promise<UpdateCartItemResponse> {
  try {
    const baseUrl = getApiBaseUrl();
    const url = `${baseUrl}/api/cart/update/${productId}`;

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ quantity }),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to update cart item");
    }

    return await response.json();
  } catch (error) {
    console.error("Update cart item error:", error);
    throw error;
  }
}

// Remove item from cart
export async function removeFromCart(
  productId: string,
  accessToken: string
): Promise<RemoveFromCartResponse> {
  try {
    const baseUrl = getApiBaseUrl();
    const url = `${baseUrl}/api/cart/remove/${productId}`;

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to remove from cart");
    }

    return await response.json();
  } catch (error) {
    console.error("Remove from cart error:", error);
    throw error;
  }
}

// Clear entire cart
export async function clearCart(
  accessToken: string
): Promise<ClearCartResponse> {
  try {
    const baseUrl = getApiBaseUrl();
    const url = `${baseUrl}/api/cart/clear`;

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to clear cart");
    }

    return await response.json();
  } catch (error) {
    console.error("Clear cart error:", error);
    throw error;
  }
}

// Get cart count
export async function getCartCount(
  accessToken: string
): Promise<CartCountResponse> {
  try {
    const baseUrl = getApiBaseUrl();
    const url = `${baseUrl}/api/cart/count`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to get cart count");
    }

    return await response.json();
  } catch (error) {
    console.error("Get cart count error:", error);
    throw error;
  }
}
