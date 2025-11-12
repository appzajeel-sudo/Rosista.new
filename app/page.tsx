"use cache";

import { Suspense } from "react";
import { HeroSlider } from "@/components/hero-slider";
import { ShopByOccasion } from "@/components/shop-by-occasion";
import { Categories } from "@/components/categories";
import { BestSellers } from "@/components/best-sellers";
import { FeaturedCollections } from "@/components/featured-collections";

export default async function HomePage() {
  return (
    <main>
      <Suspense fallback={<div className="h-[70vh] sm:h-screen" />}>
        <HeroSlider />
      </Suspense>
      <ShopByOccasion />
      <Suspense fallback={<div className="h-96" />}>
        <Categories />
      </Suspense>
      <Suspense fallback={<div className="h-96" />}>
        <BestSellers />
      </Suspense>
      <Suspense fallback={<div className="h-96" />}>
        <FeaturedCollections />
      </Suspense>
    </main>
  );
}
