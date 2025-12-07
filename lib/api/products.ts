// API Service for Products Backend Integration
import type { Product } from "@/types/product";

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

// Fetch best sellers from backend
export async function getBestSellers(limit = 10): Promise<Product[]> {
  try {
    const baseUrl = getApiBaseUrl();
    const url = `${baseUrl}/api/products/best-sellers?limit=${limit}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Use Next.js fetch caching for server components
      next: { revalidate: 300 }, // Revalidate every 5 minutes (products change more frequently)
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
    console.error("Error fetching best sellers:", error);
    return [];
  }
}

// Fetch special gifts (featured collections) from backend
export async function getSpecialGifts(limit = 10): Promise<Product[]> {
  try {
    const baseUrl = getApiBaseUrl();
    const url = `${baseUrl}/api/products/special-gifts?limit=${limit}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Use Next.js fetch caching for server components
      next: { revalidate: 300 }, // Revalidate every 5 minutes (products change more frequently)
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
    console.error("Error fetching special gifts:", error);
    return [];
  }
}

// Fetch luxury gifts from backend
export async function getLuxuryGifts(limit = 10): Promise<Product[]> {
  try {
    const baseUrl = getApiBaseUrl();
    const url = `${baseUrl}/api/products/luxury-gifts?limit=${limit}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Use Next.js fetch caching for server components
      next: { revalidate: 300 }, // Revalidate every 5 minutes (products change more frequently)
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
    console.error("Error fetching luxury gifts:", error);
    return [];
  }
}

// Fetch special occasions from backend
export async function getSpecialOccasions(limit = 10): Promise<Product[]> {
  try {
    const baseUrl = getApiBaseUrl();
    const url = `${baseUrl}/api/products/special-occasions?limit=${limit}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Use Next.js fetch caching for server components
      next: { revalidate: 300 }, // Revalidate every 5 minutes (products change more frequently)
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
    console.error("Error fetching special occasions:", error);
    return [];
  }
}

// Fetch products with filters
export async function getProducts(params: {
  page?: number;
  limit?: number;
  isActive?: boolean;
  search?: string;
  sortBy?:
    | "sortOrder"
    | "nameAr"
    | "nameEn"
    | "createdAt"
    | "price"
    | "price_asc"
    | "price_desc";
  sortOrder?: "asc" | "desc";
  category?: string;
  occasion?: string;
  brand?: string;
  productStatus?: string;
  targetAudience?: string;
  minPrice?: number;
  maxPrice?: number;
  showInHomePage?: boolean;
}): Promise<{ products: Product[]; pagination?: any }> {
  try {
    const baseUrl = getApiBaseUrl();
    const searchParams = new URLSearchParams();

    // Handle sort options
    let apiSortBy = params.sortBy;
    let apiSortOrder = params.sortOrder;

    if (params.sortBy === "price_asc") {
      apiSortBy = "price";
      apiSortOrder = "asc";
    } else if (params.sortBy === "price_desc") {
      apiSortBy = "price";
      apiSortOrder = "desc";
    }

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && key !== "sortBy" && key !== "sortOrder") {
          searchParams.append(key, value.toString());
        }
      });

      // Append processed sort params
      if (apiSortBy) searchParams.append("sortBy", apiSortBy);
      if (apiSortOrder) searchParams.append("sortOrder", apiSortOrder);
    }

    const queryString = searchParams.toString();
    const url = `${baseUrl}/api/products${
      queryString ? `?${queryString}` : ""
    }`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 }, // Revalidate every minute
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.success && data.data && Array.isArray(data.data)) {
      return {
        products: data.data,
        pagination: data.pagination,
      };
    }

    return { products: [] };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { products: [] };
  }
}

// Fetch single product by ID
export async function getProductById(id: string): Promise<Product | null> {
  try {
    const baseUrl = getApiBaseUrl();
    const url = `${baseUrl}/api/products/${id}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 }, // Revalidate every minute
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
    console.error(`Error fetching product with ID ${id}:`, error);
    return null;
  }
}

// Fetch single product by slug or ID (fallback)
export async function getProductBySlug(
  slugOrId: string
): Promise<Product | null> {
  try {
    const baseUrl = getApiBaseUrl();

    // First, try to fetch by slug
    const slugUrl = `${baseUrl}/api/products/slug/${slugOrId}`;
    const slugResponse = await fetch(slugUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 },
    });

    if (slugResponse.ok) {
      const data = await slugResponse.json();
      if (data.success && data.data) {
        return data.data;
      }
    }

    // If slug fetch fails, try by ID (for fallback compatibility)
    if (slugResponse.status === 404) {
      return await getProductById(slugOrId);
    }

    return null;
  } catch (error) {
    console.error(`Error fetching product with slug/ID ${slugOrId}:`, error);
    // Try ID as last resort
    try {
      return await getProductById(slugOrId);
    } catch (idError) {
      return null;
    }
  }
}
