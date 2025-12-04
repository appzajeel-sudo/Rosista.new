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
    <div className="relative min-h-screen w-full bg-black overflow-hidden">
      {/* Background Skeleton */}
      <div className="absolute inset-0 bg-neutral-900/50" />

      {/* Content Skeleton */}
      <div className="absolute inset-0 z-30 flex flex-col justify-end md:justify-center px-6 md:px-16 lg:px-24 pb-32 md:pb-0">
        <div className="max-w-2xl space-y-6 w-full">
          {/* Title Skeleton */}
          <Skeleton className="h-10 md:h-20 w-2/3 md:w-3/4 bg-neutral-800/50 rounded-lg" />

          {/* Description Skeleton */}
          <div className="space-y-2 md:space-y-3">
            <Skeleton className="h-3 md:h-4 w-full bg-neutral-800/50 rounded" />
            <Skeleton className="h-3 md:h-4 w-5/6 bg-neutral-800/50 rounded" />
            <Skeleton className="h-3 md:h-4 w-4/6 bg-neutral-800/50 rounded" />
          </div>

          {/* Button Skeleton */}
          <Skeleton className="h-12 md:h-14 w-40 md:w-48 bg-neutral-800/50 rounded-full mt-4 md:mt-8" />
        </div>
      </div>

      {/* Thumbnail Slider Skeleton */}
      <div className="absolute bottom-0 left-0 right-0 z-40 pb-8 md:pb-12 pt-24 bg-gradient-to-t from-black via-black/80 to-transparent">
        <div className="flex items-center justify-start md:justify-center gap-6 md:gap-10 px-8 md:px-4 overflow-hidden">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-3 shrink-0"
            >
              <Skeleton className="h-4 md:h-6 w-20 md:w-32 bg-neutral-800/50 rounded" />
              <Skeleton className="h-0.5 md:h-1 w-full bg-neutral-800/30 rounded-full" />
            </div>
          ))}
        </div>
      </div>
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
