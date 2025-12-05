// API Service for Occasions Backend Integration
import type { Occasion } from "@/types/occasion";

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

// Fetch active occasions from backend
export async function getActiveOccasions(
  showInHomePage = false
): Promise<Occasion[]> {
  try {
    const baseUrl = getApiBaseUrl();
    const url = `${baseUrl}/api/occasions/active?showInHomePage=${showInHomePage}`;

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
    console.error("Error fetching occasions:", error);
    return [];
  }
}

// Fetch all occasions from backend with optional filters
export async function getAllOccasions(params?: {
  page?: number;
  limit?: number;
  isActive?: boolean;
  search?: string;
  sortBy?: "sortOrder" | "nameAr" | "nameEn" | "createdAt";
  sortOrder?: "asc" | "desc";
  showInHomePage?: boolean;
}): Promise<{ occasions: Occasion[]; pagination?: any }> {
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
    const url = `${baseUrl}/api/occasions${
      queryString ? `?${queryString}` : ""
    }`;

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
        occasions: data.data,
        pagination: data.pagination,
      };
    }

    return { occasions: [] };
  } catch (error) {
    console.error("Error fetching all occasions:", error);
    return { occasions: [] };
  }
}

// Fetch single occasion by slug
export async function getOccasionBySlug(
  slug: string
): Promise<Occasion | null> {
  try {
    const baseUrl = getApiBaseUrl();
    const url = `${baseUrl}/api/occasions/${slug}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 600 },
    });

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.success && data.data) {
      return data.data;
    }

    return null;
  } catch (error) {
    console.error(`Error fetching occasion with slug ${slug}:`, error);
    return null;
  }
}
