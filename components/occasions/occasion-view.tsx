"use client";

import { useTranslation } from "react-i18next";
import { CinematicHero } from "@/components/occasions/cinematic-hero";
import { OccasionProductsCarousel } from "@/components/occasions/occasion-products-carousel";
import { OccasionProductsGrid } from "@/components/occasions/occasion-products-grid";
import type { Occasion } from "@/types/occasion";

interface ExtendedOccasion extends Occasion {
  id: string;
  image: string;
}

interface Props {
  occasion: ExtendedOccasion;
}

export function OccasionView({ occasion }: Props) {
  const { t } = useTranslation();

  // Ensure required props for CinematicHero match its expected type
  const heroOccasion = {
    ...occasion,
    descriptionAr: occasion.descriptionAr || "",
    descriptionEn: occasion.descriptionEn || "",
  };

  return (
    <div className="relative w-full min-h-screen bg-white dark:bg-black transition-colors duration-300">
      {/* Hero Section - Static for single occasion - Always Black */}
      <div className="relative h-[90vh] md:h-screen w-full overflow-hidden bg-black">
        <CinematicHero
          activeOccasion={heroOccasion}
          onNext={() => {}} // No navigation in specific view
          onPrev={() => {}}
          direction={0}
          hideButton={true} // Hide browse button since we're already on the page
        />
      </div>

      {/* Content Sections - Below the fold */}
      <div className="relative z-50 bg-white dark:bg-black w-full dark:shadow-[0_-50px_100px_rgba(0,0,0,1)]">
        <div className="py-12 space-y-12 pb-32">
          {/* Best Sellers Carousel */}
          <OccasionProductsCarousel
            title={t("occasions.productSections.bestSellers")}
            occasionId={occasion.id}
            productStatus="الأكثر مبيعًا"
          />

          {/* Luxury Gifts Carousel */}
          <OccasionProductsCarousel
            title={t("occasions.productSections.luxuryGifts")}
            occasionId={occasion.id}
            productStatus="هدايا فاخرة"
          />

          {/* Featured Collections Carousel */}
          <OccasionProductsCarousel
            title={t("occasions.productSections.featuredCollections")}
            occasionId={occasion.id}
            productStatus="المجموعات المميزة"
          />

          {/* Special Occasion Carousel */}
          <OccasionProductsCarousel
            title={t("occasions.productSections.specialOccasion")}
            occasionId={occasion.id}
            productStatus="مناسبة خاصة"
          />

          {/* Detailed Product Grid */}
          <OccasionProductsGrid occasionId={occasion.id} />
        </div>
      </div>
    </div>
  );
}
