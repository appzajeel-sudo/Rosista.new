import { Suspense, cache } from "react";
import type { Metadata } from "next";
import { headers, cookies } from "next/headers";
import { HeroSlider } from "@/components/hero-slider";
import { ShopByOccasion } from "@/components/sections/shop-by-occasion";
import { Categories } from "@/components/sections/categories";
import { BestSellers } from "@/components/sections/best-sellers";
import { FeaturedCollections } from "@/components/sections/featured-collections";
import { LuxuryGifts } from "@/components/sections/luxury-gifts";
import { SpecialOccasion } from "@/components/sections/special-occasion";
import { fetchHeroSlides } from "@/lib/api/hero";
import type { HeroSlide } from "@/types/hero";
import { DataViewerWrapper } from "@/components/debug/data-viewer-wrapper";

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

// Cached function to detect language from headers/cookies
const getLanguage = cache(async (): Promise<string> => {
  const headersList = await headers();
  const cookieStore = await cookies();

  // Try to get language from cookie first (i18nextLng from i18next-browser-languagedetector)
  const languageCookie =
    cookieStore.get("i18nextLng")?.value || cookieStore.get("language")?.value;

  if (languageCookie) {
    // Convert en-US, en-GB, etc to en
    if (languageCookie.startsWith("en")) return "en";
    if (languageCookie.startsWith("ar")) return "ar";
  }

  // Fallback to Accept-Language header
  const acceptLanguage = headersList.get("accept-language") || "ar";
  if (acceptLanguage.toLowerCase().startsWith("en")) {
    return "en";
  }

  // Default to Arabic
  return "ar";
});

// Fetch hero slides server component
async function HeroSliderServer() {
  try {
    const language = await getLanguage();
    const slides: HeroSlide[] = await fetchHeroSlides(language, 10);

    // Pass fetched data to DataViewer via script tag (only in development)
    const fetchedDataForViewer =
      process.env.NODE_ENV === "development"
        ? {
            slides,
            language,
            timestamp: new Date().toISOString(),
          }
        : null;

    // If no slides from API, HeroSlider will use fallback
    return (
      <>
        {fetchedDataForViewer && (
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__HERO_FETCHED_DATA__ = ${JSON.stringify(
                fetchedDataForViewer
              )};`,
            }}
          />
        )}
        <HeroSlider slides={slides.length > 0 ? slides : undefined} />
      </>
    );
  } catch (error) {
    // Return HeroSlider without slides (will use fallback)
    return <HeroSlider />;
  }
}

export default async function HomePage() {
  return (
    <main>
      <Suspense fallback={<div className="h-[70vh] sm:h-screen" />}>
        <HeroSliderServer />
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
      {/* Debug Data Viewer - فقط في Development Mode */}
      <DataViewerWrapper />
    </main>
  );
}
