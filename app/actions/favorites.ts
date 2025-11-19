"use server";

import { cookies } from "next/headers";
import type {
  FavoriteItem,
  FavoritesResponse,
  AddToFavoritesRequest,
  AddToFavoritesResponse,
  RemoveFromFavoritesResponse,
  ClearFavoritesResponse,
  CheckFavoriteResponse,
  FavoritesCountResponse,
  FavoriteIdsResponse,
} from "@/types/favorites";
import {
  getFavorites,
  addToFavorites,
  removeFromFavorites,
  clearFavorites,
  checkFavorite,
  getFavoritesCount,
} from "@/lib/api/favorites";
import { refreshTokenAction } from "./auth";

// Get API base URL from environment variable
const getApiBaseUrl = (): string => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not set in environment variables.");
  }

  return apiUrl;
};

// Get Favorites - قراءة accessToken من cookie
export async function getFavoritesAction(): Promise<FavoritesResponse | null> {
  try {
    const cookieStore = await cookies();
    let accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return null;
    }

    const baseUrl = getApiBaseUrl();
    const url = `${baseUrl}/api/favorites`;

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
    console.error("Get favorites action error:", error);
    return null;
  }
}
// Get Favorite IDs - قراءة accessToken من cookie
export async function getFavoriteIdsAction(): Promise<FavoriteIdsResponse | null> {
  try {
    const cookieStore = await cookies();
    let accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return null;
    }

    const baseUrl = getApiBaseUrl();
    const url = `${baseUrl}/api/favorites/ids`;

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
    console.error("Get favorite IDs action error:", error);
    return null;
  }
}

// Get Favorites Count - قراءة accessToken من cookie
export async function getFavoritesCountAction(): Promise<number> {
  try {
    const cookieStore = await cookies();
    let accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return 0;
    }

    const baseUrl = getApiBaseUrl();
    const url = `${baseUrl}/api/favorites/count`;

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
    console.error("Get favorites count action error:", error);
    return 0;
  }
}

// Check Favorite - قراءة accessToken من cookie
export async function checkFavoriteAction(
  productId: string
): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    let accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return false;
    }

    const baseUrl = getApiBaseUrl();
    const url = `${baseUrl}/api/favorites/check/${productId}`;

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
          return false;
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
        return false;
      }
    }

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return data.isFavorite || false;
  } catch (error) {
    console.error("Check favorite action error:", error);
    return false;
  }
}

// Add to Favorites - قراءة accessToken من cookie
export async function addToFavoritesAction(
  data: AddToFavoritesRequest
): Promise<AddToFavoritesResponse> {
  try {
    const cookieStore = await cookies();
    let accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      throw new Error("Not authenticated");
    }

    return await addToFavorites(data, accessToken);
  } catch (error) {
    console.error("Add to favorites action error:", error);
    throw error;
  }
}

// Remove from Favorites - قراءة accessToken من cookie
export async function removeFromFavoritesAction(
  productId: string
): Promise<RemoveFromFavoritesResponse> {
  try {
    const cookieStore = await cookies();
    let accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      throw new Error("Not authenticated");
    }

    return await removeFromFavorites(productId, accessToken);
  } catch (error) {
    console.error("Remove from favorites action error:", error);
    throw error;
  }
}

// Clear Favorites - قراءة accessToken من cookie
export async function clearFavoritesAction(): Promise<ClearFavoritesResponse> {
  try {
    const cookieStore = await cookies();
    let accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      throw new Error("Not authenticated");
    }

    return await clearFavorites(accessToken);
  } catch (error) {
    console.error("Clear favorites action error:", error);
    throw error;
  }
}

