// API Service for Categories Backend Integration
import type { Category } from "@/types/category";

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

// Fetch active categories from backend
export async function getActiveCategories(
  showInHomePage = false
): Promise<Category[]> {
  try {
    const baseUrl = getApiBaseUrl();
    const url = `${baseUrl}/api/categories/active?showInHomePage=${showInHomePage}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Use Next.js fetch caching for server components
      next: { revalidate: 600 }, // Revalidate every 10 minutes (same as backend cache)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.success && data.data && Array.isArray(data.data)) {
      return data.data;
    }

    return [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

// Fetch all categories from backend with optional filters
export async function getAllCategories(params?: {
  page?: number;
  limit?: number;
  isActive?: boolean;
  search?: string;
  sortBy?: "sortOrder" | "nameAr" | "nameEn" | "createdAt";
  sortOrder?: "asc" | "desc";
  showInHomePage?: boolean;
}): Promise<{ categories: Category[]; pagination?: any }> {
  try {
    const baseUrl = getApiBaseUrl();
    const searchParams = new URLSearchParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }

    const queryString = searchParams.toString();
    const url = `${baseUrl}/api/categories${queryString ? `?${queryString}` : ""}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Use Next.js fetch caching for server components
      next: { revalidate: 600 }, // Revalidate every 10 minutes (same as backend cache)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.success && data.data && Array.isArray(data.data)) {
      return {
        categories: data.data,
        pagination: data.pagination,
      };
    }

    return { categories: [] };
  } catch (error) {
    console.error("Error fetching all categories:", error);
    return { categories: [] };
  }
}

