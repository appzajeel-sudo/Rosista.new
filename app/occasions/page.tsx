import { Suspense } from "react";
import { FilmStripHero } from "@/components/film-strip-hero";
import { OccasionsGallery } from "@/components/occasions-gallery";
import { getAllOccasions } from "@/lib/api/occasions";
import type { Occasion } from "@/types/occasion";

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

    return (
      <div className="min-h-screen bg-background">
        {/* Film Strip Hero */}
        {filmStripSlides.length > 0 && (
          <FilmStripHero slides={filmStripSlides} />
        )}

        {/* Occasions Gallery */}
        <section className="relative w-full bg-background pt-4 pb-16 md:pt-8 md:pb-20 lg:pt-0 lg:pb-24">
          <div className="mx-auto w-[95%] max-w-[1650px] px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-2xl font-medium text-foreground md:text-3xl font-sans-ar">
                المناسبات - اكتشف مجموعتنا الحصرية
              </h2>
            </div>

            {galleryOccasions.length > 0 ? (
              <OccasionsGallery occasions={galleryOccasions} />
            ) : (
              <div className="text-center py-12">
                <p className="text-foreground/60">
                  لا توجد مناسبات متاحة حالياً
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    );
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
      <div className="h-[400px] flex items-center justify-center">
        <div className="text-foreground/60">جاري التحميل...</div>
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
