import { Suspense } from "react";
import { SpecialOccasionClient } from "./special-occasion-client";
import { getSpecialOccasions } from "@/lib/api/products";
import type { Product } from "@/types/product";
import { Skeleton } from "@/components/ui/skeleton";
import { ServerLogger } from "@/components/debug/server-logger";

// Server Component to fetch special occasions
async function SpecialOccasionContent() {
  try {
    // Fetch special occasions from backend (limit 10)
    const products = await getSpecialOccasions(10);

    // Convert products to display format
    const displayProducts = products.map((product) => ({
      id: product._id,
      slug: product.slug || product._id,
      nameAr: product.nameAr,
      nameEn: product.nameEn,
      descriptionAr: product.descriptionAr || "",
      descriptionEn: product.descriptionEn || "",
      price: product.price,
      image: product.mainImage,
    }));

    return (
      <>
        <ServerLogger source="SpecialOccasion" data={products} />
        <SpecialOccasionClient products={displayProducts} />
      </>
    );
  } catch (error) {
    console.error("Error loading special occasions:", error);
    return null; // Don't render section if error
  }
}

// Loading fallback
function SpecialOccasionLoading() {
  return (
    <section className="relative overflow-hidden bg-background py-3 sm:py-5">
      <div className="mx-auto max-w-[1650px] px-6 sm:px-8">
        <div className="mb-12">
          <Skeleton className="h-8 w-48 sm:h-10 sm:w-64" />
        </div>
        <div className="relative">
          <div className="flex gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="shrink-0 w-[calc(50%-8px)] sm:w-[calc(33.333%-14px)] lg:w-[calc(20%-16px)]"
              >
                <Skeleton className="aspect-3/4 rounded-3xl" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function SpecialOccasion() {
  return (
    <Suspense fallback={<SpecialOccasionLoading />}>
      <SpecialOccasionContent />
    </Suspense>
  );
}
