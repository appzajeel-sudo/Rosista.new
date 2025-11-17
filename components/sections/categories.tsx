import { Suspense } from "react";
import { CategoriesClient } from "./categories-client";
import { getActiveCategories } from "@/lib/api/categories";
import type { Category } from "@/types/category";
import { Skeleton } from "@/components/ui/skeleton";

// Server Component to fetch categories
async function CategoriesContent() {
  try {
    // Fetch active categories with showInHomePage = true
    const categories = await getActiveCategories(true);

    // Convert categories to display format
    const displayCategories = categories.map((category) => ({
      id: category._id,
      slug: category.slug || category._id,
      nameAr: category.nameAr,
      nameEn: category.nameEn,
      descriptionAr: category.descriptionAr || "",
      descriptionEn: category.descriptionEn || "",
      image: category.imageUrl,
    }));

    return <CategoriesClient categories={displayCategories} />;
  } catch (error) {
    console.error("Error loading categories:", error);
    return null; // Don't render section if error
  }
}

// Loading fallback
function CategoriesLoading() {
  return (
    <section className="relative bg-background">
      <div className="mx-auto max-w-[1650px] sm:px-6 md:px-8">
        <div className="pt-12 pb-8 text-center px-6 sm:pt-20 sm:pb-12 sm:px-0 md:pt-24 md:pb-16">
          <Skeleton className="h-12 w-64 mx-auto sm:w-80" />
        </div>
        <div className="grid grid-cols-2 gap-0.5 border-2 border-white bg-white sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square" />
          ))}
        </div>
      </div>
    </section>
  );
}

export function Categories() {
  return (
    <Suspense fallback={<CategoriesLoading />}>
      <CategoriesContent />
    </Suspense>
  );
}

