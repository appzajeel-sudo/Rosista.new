// API Service for Favorites
import type {
  FavoriteItem,
  FavoritesResponse,
  AddToFavoritesRequest,
  AddToFavoritesResponse,
  RemoveFromFavoritesResponse,
  ClearFavoritesResponse,
  CheckFavoriteResponse,
  FavoritesCountResponse,
} from "@/types/favorites";

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

// Get all favorites
export async function getFavorites(
  accessToken: string
): Promise<FavoritesResponse> {
  try {
    const baseUrl = getApiBaseUrl();
    const url = `${baseUrl}/api/favorites`;

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
      throw new Error(errorData.message || "Failed to get favorites");
    }

    return await response.json();
  } catch (error) {
    console.error("Get favorites error:", error);
    throw error;
  }
}

// Get favorites count
export async function getFavoritesCount(
  accessToken: string
): Promise<FavoritesCountResponse> {
  try {
    const baseUrl = getApiBaseUrl();
    const url = `${baseUrl}/api/favorites/count`;

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
      throw new Error(errorData.message || "Failed to get favorites count");
    }

    return await response.json();
  } catch (error) {
    console.error("Get favorites count error:", error);
    throw error;
  }
}

// Check if product is favorite
export async function checkFavorite(
  productId: string,
  accessToken: string
): Promise<CheckFavoriteResponse> {
  try {
    const baseUrl = getApiBaseUrl();
    const url = `${baseUrl}/api/favorites/check/${productId}`;

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
      throw new Error(errorData.message || "Failed to check favorite");
    }

    return await response.json();
  } catch (error) {
    console.error("Check favorite error:", error);
    throw error;
  }
}

// Add to favorites
export async function addToFavorites(
  data: AddToFavoritesRequest,
  accessToken: string
): Promise<AddToFavoritesResponse> {
  try {
    const baseUrl = getApiBaseUrl();
    const url = `${baseUrl}/api/favorites/add`;

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
      throw new Error(errorData.message || "Failed to add to favorites");
    }

    return await response.json();
  } catch (error) {
    console.error("Add to favorites error:", error);
    throw error;
  }
}

// Remove from favorites
export async function removeFromFavorites(
  productId: string,
  accessToken: string
): Promise<RemoveFromFavoritesResponse> {
  try {
    const baseUrl = getApiBaseUrl();
    const url = `${baseUrl}/api/favorites/remove/${productId}`;

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
      throw new Error(errorData.message || "Failed to remove from favorites");
    }

    return await response.json();
  } catch (error) {
    console.error("Remove from favorites error:", error);
    throw error;
  }
}

// Clear all favorites
export async function clearFavorites(
  accessToken: string
): Promise<ClearFavoritesResponse> {
  try {
    const baseUrl = getApiBaseUrl();
    const url = `${baseUrl}/api/favorites/clear`;

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
      throw new Error(errorData.message || "Failed to clear favorites");
    }

    return await response.json();
  } catch (error) {
    console.error("Clear favorites error:", error);
    throw error;
  }
}

