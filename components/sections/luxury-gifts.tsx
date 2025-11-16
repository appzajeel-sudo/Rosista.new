import { Suspense } from "react";
import { LuxuryGiftsClient } from "./luxury-gifts-client";
import { getLuxuryGifts } from "@/lib/api/products";
import type { Product } from "@/types/product";

// Server Component to fetch luxury gifts
async function LuxuryGiftsContent() {
  try {
    // Fetch luxury gifts from backend (limit 10)
    const products = await getLuxuryGifts(10);

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

    return <LuxuryGiftsClient products={displayProducts} />;
  } catch (error) {
    console.error("Error loading luxury gifts:", error);
    return null; // Don't render section if error
  }
}

// Loading fallback
function LuxuryGiftsLoading() {
  return (
    <section className="relative overflow-hidden bg-background py-3 sm:py-5">
      <div className="mx-auto max-w-[1650px] px-6 sm:px-8">
        <div className="mb-12">
          <div className="h-8 bg-foreground/10 animate-pulse rounded w-48" />
        </div>
        <div className="relative">
          <div className="flex gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="shrink-0 w-[calc(50%-8px)] sm:w-[calc(33.333%-14px)] lg:w-[calc(20%-16px)]"
              >
                <div className="aspect-3/4 bg-foreground/5 animate-pulse rounded-3xl" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function LuxuryGifts() {
  return (
    <Suspense fallback={<LuxuryGiftsLoading />}>
      <LuxuryGiftsContent />
    </Suspense>
  );
}
