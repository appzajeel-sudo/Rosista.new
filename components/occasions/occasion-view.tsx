"use client";

import { useTranslation } from "react-i18next";
import { CinematicHero } from "@/components/occasions/cinematic-hero";
import { FeaturedProductsRow } from "@/components/occasions/featured-products-row";
import { LuxuryHighlightSection } from "@/components/occasions/luxury-highlight-section";
import { CollectionViewGrid } from "@/components/occasions/collection-view-grid";
import { ModernProductGrid } from "@/components/occasions/modern-product-grid";
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

      {/* Content Sections - Redesigned */}
      <div className="relative z-50 bg-white dark:bg-black w-full dark:shadow-[0_-50px_100px_rgba(0,0,0,1)] flex flex-col gap-0">
        {/* 1. Best Sellers -> Featured Products Row */}
        <FeaturedProductsRow occasionId={occasion.id} />

        {/* 2. Featured Collections -> Collection View Grid */}
        <CollectionViewGrid occasionId={occasion.id} />

        {/* 3. Luxury Gifts -> Luxury Highlight Section (Navy Dark Theme) */}
        <LuxuryHighlightSection occasionId={occasion.id} />

        {/* 4. All Products -> Modern Grid */}
        <ModernProductGrid occasionId={occasion.id} />
      </div>
    </div>
  );
}
