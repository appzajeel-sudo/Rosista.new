import { Suspense } from "react";
import type { Metadata } from "next";
import { HeroSlider } from "@/components/hero-slider";
import { ShopByOccasion } from "@/components/sections/shop-by-occasion";
import { Categories } from "@/components/sections/categories";
import { BestSellers } from "@/components/sections/best-sellers";
import { FeaturedCollections } from "@/components/sections/featured-collections";
import { LuxuryGifts } from "@/components/sections/luxury-gifts";
import { SpecialOccasion } from "@/components/sections/special-occasion";

// ISR: إعادة توليد الصفحة كل 3600 ثانية (ساعة)
export const revalidate = 3600;

// Metadata للـ SEO
export const metadata: Metadata = {
  title: "ROSISTA - Luxury Gifts & Premium Collections",
  description:
    "Discover our exclusive collection of luxury gifts, premium chocolates, elegant flowers, fine perfumes, and exquisite jewelry for every special occasion.",
  keywords: [
    "luxury gifts",
    "premium chocolates",
    "flowers",
    "perfumes",
    "jewelry",
    "gifts",
  ],
  openGraph: {
    title: "ROSISTA - Luxury Gifts",
    description: "Premium gifts for every special moment",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ROSISTA - Luxury Gifts",
    description: "Premium gifts for every special moment",
  },
};

export default async function HomePage() {
  return (
    <main>
      <Suspense fallback={<div className="h-[70vh] sm:h-screen" />}>
        <HeroSlider />
      </Suspense>
      <Suspense fallback={<div className="h-96" />}>
        <ShopByOccasion />
      </Suspense>
      <Suspense fallback={<div className="h-96" />}>
        <Categories />
      </Suspense>
      <Suspense fallback={<div className="h-96" />}>
        <BestSellers />
      </Suspense>
      <Suspense fallback={<div className="h-96" />}>
        <FeaturedCollections />
      </Suspense>
      <Suspense fallback={<div className="h-96" />}>
        <LuxuryGifts />
      </Suspense>
      <Suspense fallback={<div className="h-96" />}>
        <SpecialOccasion />
      </Suspense>
    </main>
  );
}
