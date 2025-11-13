import { Suspense } from "react";
import type { Metadata } from "next";
import { HeroSlider } from "@/components/hero-slider";
import { ShopByOccasion } from "@/components/shop-by-occasion";
import { Categories } from "@/components/categories";
import { BestSellers } from "@/components/best-sellers";
import { FeaturedCollections } from "@/components/featured-collections";

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
