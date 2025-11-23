"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ArrowUpRight } from "lucide-react";
import { getActiveOccasions } from "@/lib/api/occasions";
import type { Occasion } from "@/types/occasion";
import { cn } from "@/lib/utils";

// Option A: The Editorial (Grid/Masonry)
export function ShopByOccasionAlt() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const [occasions, setOccasions] = useState<Occasion[]>([]);

  useEffect(() => {
    const fetchOccasions = async () => {
      try {
        const data = await getActiveOccasions(true);
        setOccasions(data);
      } catch (error) {
        console.error("❌ Error fetching occasions:", error);
      }
    };
    fetchOccasions();
  }, []);

  if (!occasions.length) return null;

  // Take first 5 items for the grid
  const featured = occasions.slice(0, 5);

  return (
    <section className="py-20 bg-neutral-50 dark:bg-neutral-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-primary">
            {isRtl ? "مختاراتنا" : "Editor's Pick"}
          </span>
          <h2 className={cn(
            "text-4xl md:text-6xl font-medium text-foreground",
            isRtl ? "font-sans-ar" : "font-sans-en"
          )}>
            {t("home.shopByOccasion.title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 h-[1200px] md:h-[600px]">
          {/* Main Feature - Spans 6 cols */}
          {featured[0] && (
            <div className="md:col-span-6 h-full relative group overflow-hidden rounded-lg">
              <Link href={`/occasions/${featured[0].slug || featured[0]._id}`} className="block h-full">
                <Image
                  src={featured[0].imageUrl}
                  alt={isRtl ? featured[0].nameAr : featured[0].nameEn}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <h3 className={cn("text-3xl text-white mb-2", isRtl ? "font-sans-ar" : "font-sans-en")}>
                    {isRtl ? featured[0].nameAr : featured[0].nameEn}
                  </h3>
                  <div className="flex items-center gap-2 text-white/80 group-hover:text-white transition-colors">
                    <span>{isRtl ? "تسوق الآن" : "Shop Now"}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Secondary Grid - Spans 6 cols */}
          <div className="md:col-span-6 grid grid-cols-2 gap-4 md:gap-6 h-full">
            {featured.slice(1).map((occasion) => (
              <div key={occasion._id} className="relative group overflow-hidden rounded-lg h-full min-h-[200px]">
                <Link href={`/occasions/${occasion.slug || occasion._id}`} className="block h-full">
                  <Image
                    src={occasion.imageUrl}
                    alt={isRtl ? occasion.nameAr : occasion.nameEn}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                    <h3 className={cn(
                      "text-xl text-white font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300",
                      isRtl ? "font-sans-ar" : "font-sans-en"
                    )}>
                      {isRtl ? occasion.nameAr : occasion.nameEn}
                    </h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
