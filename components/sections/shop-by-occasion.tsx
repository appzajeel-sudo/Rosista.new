"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getActiveOccasions } from "@/lib/api/occasions";
import type { Occasion } from "@/types/occasion";
import { Skeleton } from "@/components/ui/skeleton";
import { HeroParallax } from "@/components/ui/hero-parallax";

export function ShopByOccasion() {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const [occasions, setOccasions] = useState<Occasion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOccasions = async () => {
      try {
        const data = await getActiveOccasions(true);
        setOccasions(data);
      } catch (error) {
        console.error("❌ Error fetching occasions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOccasions();
  }, []);

  if (loading) {
    return <ShopByOccasionSkeleton />;
  }

  if (!occasions || occasions.length === 0) {
    return null;
  }

  // Ensure we have enough items for the parallax effect (at least 15)
  // We repeat the occasions until we have enough
  let mappedProducts: { title: string; link: string; thumbnail: string }[] = [];

  if (occasions.length > 0) {
    const itemsNeeded = 15;
    const repeats = Math.ceil(itemsNeeded / occasions.length);

    for (let i = 0; i < repeats; i++) {
      occasions.forEach((occasion) => {
        mappedProducts.push({
          title: isRtl ? occasion.nameAr : occasion.nameEn,
          link: `/occasions/${occasion.slug || occasion._id}`,
          thumbnail: occasion.imageUrl,
        });
      });
    }

    // Cap at a reasonable number if we have too many
    if (mappedProducts.length > 30) {
      mappedProducts = mappedProducts.slice(0, 30);
    }
  }

  return <HeroParallax products={mappedProducts} />;
}

function ShopByOccasionSkeleton() {
  return (
    <section className="bg-background py-8 sm:py-12">
      <div className="mx-auto max-w-[1650px] px-6 sm:px-8">
        <Skeleton className="mb-8 h-[45vh] w-full rounded-3xl" />
        <div className="flex gap-4 overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <Skeleton
              key={i}
              className="h-40 w-48 shrink-0 rounded-lg sm:h-48 sm:w-64"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
