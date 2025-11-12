"use client";

import { FilmStripHero } from "@/components/film-strip-hero";
import { OccasionsGallery } from "@/components/occasions-gallery";
import { useTranslation } from "react-i18next";

const OCCASIONS = [
  {
    id: 1,
    slug: "valentines",
    nameKey: "occasions.valentines",
    image:
      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=1200&h=1200&fit=crop&q=90",
  },
  {
    id: 2,
    slug: "eidAlAdha",
    nameKey: "occasions.eidAlAdha",
    image:
      "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=1200&h=1200&fit=crop&q=90",
  },
  {
    id: 3,
    slug: "foundationDay",
    nameKey: "occasions.foundationDay",
    image:
      "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=1200&h=1200&fit=crop&q=90",
  },
  {
    id: 4,
    slug: "mothersDay",
    nameKey: "occasions.mothersDay",
    image:
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&h=1600&fit=crop&q=90",
  },
  {
    id: 5,
    slug: "birthday",
    nameKey: "occasions.birthdays",
    image:
      "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=1200&h=1200&fit=crop&q=90",
  },
  {
    id: 6,
    slug: "thankYou",
    nameKey: "occasions.thankYou",
    image:
      "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=1200&h=1200&fit=crop&q=90",
  },
  {
    id: 7,
    slug: "newYear",
    nameKey: "occasions.newYear",
    image:
      "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=1200&h=1600&fit=crop&q=90",
  },
  {
    id: 8,
    slug: "wedding",
    nameKey: "occasions.weddings",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&h=2000&fit=crop&q=90",
  },
  {
    id: 9,
    slug: "graduation",
    nameKey: "occasions.graduation",
    image:
      "https://images.unsplash.com/photo-1576267423048-15c0040fec78?w=1200&h=1200&fit=crop&q=90",
  },
  {
    id: 10,
    slug: "eidAlFitr",
    nameKey: "occasions.eidAlFitr",
    image:
      "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=1200&h=1200&fit=crop&q=90",
  },
  {
    id: 11,
    slug: "anniversary",
    nameKey: "occasions.anniversary",
    image:
      "https://images.unsplash.com/photo-1464047736614-af63643285bf?w=1200&h=1200&fit=crop&q=90",
  },
  {
    id: 12,
    slug: "hajj",
    nameKey: "occasions.hajj",
    image:
      "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=1200&h=1200&fit=crop&q=90",
  },
];

export default function OccasionsPage() {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  // Convert occasions to slides format for Film Strip
  const filmStripSlides = OCCASIONS.map((occasion) => ({
    id: occasion.id,
    image: occasion.image,
  }));

  return (
    <div className="min-h-screen bg-background">
      {/* Film Strip Hero */}
      <FilmStripHero slides={filmStripSlides} />

      {/* Occasions Gallery */}
      <section className="relative w-full bg-background pt-4 pb-16 md:pt-8 md:pb-20 lg:pt-0 lg:pb-24">
        <div className="mx-auto w-[95%] max-w-[1650px] px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2
              className={`text-2xl font-medium text-foreground md:text-3xl ${
                isRtl ? "font-sans-ar" : "font-sans-en"
              }`}
            >
              {isRtl
                ? "المناسبات - اكتشف مجموعتنا الحصرية"
                : "Occasions - Discover Our Exclusive Collection"}
            </h2>
          </div>

          <OccasionsGallery occasions={OCCASIONS} />
        </div>
      </section>
    </div>
  );
}
