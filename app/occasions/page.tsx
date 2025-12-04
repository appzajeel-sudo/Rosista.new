import { Suspense } from "react";
import { OccasionsLayout } from "@/components/occasions/occasions-layout";
import { getAllOccasions } from "@/lib/api/occasions";
import type { Occasion } from "@/types/occasion";
import { Skeleton } from "@/components/ui/skeleton";

// Server Component to fetch occasions
async function OccasionsContent() {
  try {
    // Fetch all active occasions from backend
    const { occasions } = await getAllOccasions({
      isActive: true,
      sortBy: "sortOrder",
      sortOrder: "asc",
    });

    // Convert occasions to slides format for Film Strip
    const filmStripSlides = occasions.map((occasion) => ({
      id: occasion._id,
      image: occasion.imageUrl,
    }));

    // Convert occasions to gallery format
    const galleryOccasions = occasions.map((occasion) => ({
      id: occasion._id,
      slug: occasion.slug || occasion._id,
      nameAr: occasion.nameAr,
      nameEn: occasion.nameEn,
      descriptionAr: occasion.descriptionAr || "",
      descriptionEn: occasion.descriptionEn || "",
      image: occasion.imageUrl,
    }));

    return <OccasionsLayout occasions={galleryOccasions} />;
  } catch (error) {
    console.error("Error loading occasions:", error);
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-foreground/60">حدث خطأ في تحميل المناسبات</p>
        </div>
      </div>
    );
  }
}

// Loading fallback
function OccasionsLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Film Strip Hero Skeleton */}
      <section className="relative overflow-hidden py-8 sm:py-12">
        <div className="mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4 overflow-hidden">
            {[...Array(8)].map((_, index) => (
              <Skeleton
                key={index}
                className="h-[280px] w-[200px] shrink-0 sm:h-[320px] sm:w-[240px] md:h-[380px] md:w-[300px] lg:h-[420px] lg:w-[340px]"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Skeleton */}
      <section className="relative w-full bg-background pt-4 pb-16 md:pt-8 md:pb-20 lg:pt-0 lg:pb-24">
        <div className="mx-auto w-[95%] max-w-[1650px] px-0 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <Skeleton className="h-9 w-64 mx-auto sm:h-10 sm:w-80" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="space-y-3">
                <Skeleton className="aspect-[3/3.8] sm:aspect-4/5 rounded-none" />
                <div className="space-y-2 flex flex-col items-center mt-4">
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function OccasionsPage() {
  return (
    <Suspense fallback={<OccasionsLoading />}>
      <OccasionsContent />
    </Suspense>
  );
}
