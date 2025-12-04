"use client";

import { useState, useCallback } from "react";
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
  const [direction, setDirection] = useState(0);

  if (!occasions || occasions.length === 0) return null;

  const handleNext = useCallback(() => {
    const currentIndex = occasions.findIndex((o) => o.id === activeOccasion.id);
    const nextIndex = (currentIndex + 1) % occasions.length;
    setDirection(1);
    setActiveOccasion(occasions[nextIndex]);
  }, [occasions, activeOccasion.id]);

  const handlePrev = useCallback(() => {
    const currentIndex = occasions.findIndex((o) => o.id === activeOccasion.id);
    const prevIndex = (currentIndex - 1 + occasions.length) % occasions.length;
    setDirection(-1);
    setActiveOccasion(occasions[prevIndex]);
  }, [occasions, activeOccasion.id]);

  const handleSelect = useCallback(
    (occasion: Occasion) => {
      const currentIndex = occasions.findIndex(
        (o) => o.id === activeOccasion.id
      );
      const newIndex = occasions.findIndex((o) => o.id === occasion.id);
      setDirection(newIndex > currentIndex ? 1 : -1);
      setActiveOccasion(occasion);
    },
    [occasions, activeOccasion.id]
  );

  return (
    <div className="relative w-full h-[90vh] md:h-screen bg-black overflow-hidden">
      {/* Hero Section - Controlled by state */}
      <CinematicHero
        activeOccasion={activeOccasion}
        onNext={handleNext}
        onPrev={handlePrev}
        direction={direction}
      />

      {/* Thumbnail Slider - Controls state */}
      <div className="absolute bottom-0 left-0 right-0 z-40 pb-8 md:pb-12 bg-gradient-to-t from-black via-black/80 to-transparent pt-24">
        <ThumbnailSlider
          occasions={occasions}
          activeId={activeOccasion.id}
          onSelect={handleSelect}
        />
      </div>
    </div>
  );
}
