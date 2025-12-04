"use client";

import { useState } from "react";
import { CinematicHero } from "@/components/occasions/cinematic-hero";
import { ThumbnailSlider } from "@/components/occasions/thumbnail-slider";

type Occasion = {
  id: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  image: string;
};

type Props = {
  occasions: Occasion[];
};

export function OccasionsLayout({ occasions }: Props) {
  // Default to the first occasion
  const [activeOccasion, setActiveOccasion] = useState<Occasion>(occasions[0]);

  if (!occasions || occasions.length === 0) return null;

  return (
    <div className="relative min-h-screen w-full bg-black overflow-x-hidden">
      {/* Hero Section - Controlled by state */}
      <CinematicHero activeOccasion={activeOccasion} />

      {/* Thumbnail Slider - Controls state */}
      <div className="absolute bottom-0 left-0 right-0 z-40 pb-8 md:pb-12 bg-gradient-to-t from-black via-black/80 to-transparent pt-24">
        <ThumbnailSlider
          occasions={occasions}
          activeId={activeOccasion.id}
          onSelect={setActiveOccasion}
        />
      </div>
    </div>
  );
}
