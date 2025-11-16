// Types for Hero Slider Backend Integration

// Backend API Response Types
export interface HeroPromotionResponse {
  _id?: string;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  buttonTextAr: string;
  buttonTextEn: string;
  link: string;
  image: string;
  isActive?: boolean;
  priority?: number;
  startDate?: string;
  endDate?: string;
}

export interface LinkedOccasion {
  _id?: string;
  nameAr: string;
  nameEn: string;
  imageUrl?: string;
  slug?: string;
}

export interface HeroOccasionResponse {
  _id?: string;
  nameAr: string;
  nameEn: string;
  startDate: string;
  endDate: string;
  images: string[]; // Array of image URLs
  celebratoryMessageAr: string;
  celebratoryMessageEn: string;
  linkedOccasion?: LinkedOccasion;
}

export interface HeroPromotionsApiResponse {
  success: boolean;
  data: HeroPromotionResponse[];
  cached?: boolean;
  preloaded?: boolean;
  timestamp?: string;
}

export interface HeroOccasionApiResponse {
  success: boolean;
  data: HeroOccasionResponse | null;
  message?: string;
  cached?: boolean;
  preloaded?: boolean;
  timestamp?: string;
}

// Unified Frontend Slide Type
export interface HeroSlide {
  id: string;
  image: string;
  title: string; // النهائي (يُستخدم للعرض)
  titleAr?: string; // للترجمة في Client
  titleEn?: string; // للترجمة في Client
  subtitle?: string; // العنوان الفرعي (للعروض)
  subtitleAr?: string; // للترجمة في Client
  subtitleEn?: string; // للترجمة في Client
  celebratoryMessage?: string; // رسالة التهنئة (للمناسبات)
  celebratoryMessageAr?: string; // للترجمة في Client
  celebratoryMessageEn?: string; // للترجمة في Client
  cta: string; // النهائي
  ctaAr?: string; // للترجمة في Client
  ctaEn?: string; // للترجمة في Client
  link: string;
  type: "promotion" | "occasion";
}

// Fallback slides type (matching current static data)
export interface FallbackSlide {
  id: number;
  image: string;
  titleKey: string;
  ctaKey: string;
  link: string;
}
