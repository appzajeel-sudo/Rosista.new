// API Service for Hero Slider Backend Integration
import type {
  HeroPromotionsApiResponse,
  HeroOccasionApiResponse,
  HeroSlide,
  HeroPromotionResponse,
  HeroOccasionResponse,
} from "@/types/hero";

// Get API base URL from environment variable
const getApiBaseUrl = (): string => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error(
      "NEXT_PUBLIC_API_URL is not set in environment variables. Please add it to your .env.local file."
    );
  }

  return apiUrl;
};

// Fetch active promotions from backend
export async function fetchHeroPromotions(
  limit: number = 10
): Promise<HeroPromotionResponse[]> {
  try {
    const baseUrl = getApiBaseUrl();
    const url = `${baseUrl}/api/promotions/active?limit=${limit}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Use Next.js fetch caching for server components
      next: { revalidate: 300 }, // Revalidate every 5 minutes (same as backend cache)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: HeroPromotionsApiResponse = await response.json();

    if (data.success && data.data && Array.isArray(data.data)) {
      return data.data;
    }

    return [];
  } catch (error) {
    return [];
  }
}

// Fetch next hero occasion from backend
export async function fetchHeroOccasion(
  language: string = "ar"
): Promise<HeroOccasionResponse | null> {
  try {
    const baseUrl = getApiBaseUrl();
    const url = `${baseUrl}/api/hero-occasions/next?language=${language}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Use Next.js fetch caching for server components
      next: { revalidate: 600 }, // Revalidate every 10 minutes (same as backend cache)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: HeroOccasionApiResponse = await response.json();

    if (data.success && data.data) {
      return data.data;
    }

    return null;
  } catch (error) {
    return null;
  }
}

// Convert promotion to hero slide - إرجاع بيانات بجميع اللغات
function promotionToSlide(
  promotion: HeroPromotionResponse,
  language: string
): HeroSlide {
  return {
    id: `promotion-${promotion._id || Date.now()}`,
    image: promotion.image,
    title: language === "en" ? promotion.titleEn : promotion.titleAr,
    titleAr: promotion.titleAr,
    titleEn: promotion.titleEn,
    subtitle: language === "en" ? promotion.subtitleEn : promotion.subtitleAr,
    subtitleAr: promotion.subtitleAr,
    subtitleEn: promotion.subtitleEn,
    cta: language === "en" ? promotion.buttonTextEn : promotion.buttonTextAr,
    ctaAr: promotion.buttonTextAr,
    ctaEn: promotion.buttonTextEn,
    link: promotion.link,
    type: "promotion",
  };
}

// Convert occasion images to hero slides - إرجاع بيانات بجميع اللغات
function occasionToSlides(
  occasion: HeroOccasionResponse,
  language: string
): HeroSlide[] {
  if (!occasion.images || occasion.images.length === 0) {
    return [];
  }

  const occasionLink = occasion.linkedOccasion
    ? `/occasions/${
        occasion.linkedOccasion.slug || occasion.linkedOccasion._id || ""
      }`
    : "/occasions";

  return occasion.images.map((image, index) => ({
    id: `occasion-${occasion._id || Date.now()}-${index}`,
    image: image,
    title: language === "en" ? occasion.nameEn : occasion.nameAr,
    titleAr: occasion.nameAr,
    titleEn: occasion.nameEn,
    celebratoryMessage:
      language === "en"
        ? occasion.celebratoryMessageEn
        : occasion.celebratoryMessageAr,
    celebratoryMessageAr: occasion.celebratoryMessageAr,
    celebratoryMessageEn: occasion.celebratoryMessageEn,
    // CTA سيتم ترجمته في Client Component باستخدام ملفات الترجمة
    cta: language === "en" ? "Shop Now" : "تسوق الآن", // سيتم استبداله في Client بـ t("hero.shopNow")
    ctaAr: "تسوق الآن", // سيتم استبداله في Client
    ctaEn: "Shop Now", // سيتم استبداله في Client
    link: occasionLink,
    type: "occasion" as const,
  }));
}

// Fetch and merge all hero slides
export async function fetchHeroSlides(
  language: string = "ar",
  limit: number = 10
): Promise<HeroSlide[]> {
  try {
    // Fetch both promotions and occasions in parallel
    const [promotions, occasion] = await Promise.all([
      fetchHeroPromotions(limit),
      fetchHeroOccasion(language),
    ]);

    const slides: HeroSlide[] = [];

    // Add occasion slides first (convert each image to a slide)
    if (occasion) {
      const occasionSlides = occasionToSlides(occasion, language);
      if (Array.isArray(occasionSlides) && occasionSlides.length > 0) {
        slides.push(...occasionSlides);
      }
    }

    // Add promotion slides after occasions - ensure promotions is an array
    if (Array.isArray(promotions) && promotions.length > 0) {
      promotions.forEach((promotion) => {
        slides.push(promotionToSlide(promotion, language));
      });
    }

    return slides;
  } catch (error) {
    return [];
  }
}

// Fallback slides (matching current static data structure)
export const fallbackSlides = [
  {
    id: 1,
    image: "/luxury-gift-elegant-gold-wrapping.jpg",
    titleKey: "hero.slide1.title",
    ctaKey: "hero.slide1.cta",
    link: "/occasions",
  },
  {
    id: 2,
    image: "/luxury-gifts-premium-collection.jpg",
    titleKey: "hero.slide2.title",
    ctaKey: "hero.slide2.cta",
    link: "/occasions",
  },
  {
    id: 3,
    image: "/luxury-jewelry-diamonds-pearls.jpg",
    titleKey: "hero.slide3.title",
    ctaKey: "hero.slide3.cta",
    link: "/occasions",
  },
];
