// Internationalization configuration
export type Language = "en" | "ar";

export const translations = {
  en: {
    nav: {
      home: "Home",
      occasions: "Occasions",
      shop: "Shop",
      about: "About",
      contact: "Contact",
    },
    hero: {
      title: "Luxury Gifts for Every Moment",
      subtitle:
        "Curated collections of exquisite gifts that celebrate life's precious moments",
      explore: "Explore Collection",
      slide1: {
        title: "Premium Flower Arrangements",
        cta: "Shop Flowers",
      },
      slide2: {
        title: "Luxury Gift Collections",
        cta: "Explore Collections",
      },
      slide3: {
        title: "Elegant Wedding Gifts",
        cta: "Shop Wedding",
      },
    },
    home: {
      shopByOccasion: {
        title: "Shop by Occasion",
      },
      occasions: {
        viewMore: "View All Occasions",
      },
      categories: {
        title: "Our Collections",
      },
    },
    occasions: {
      title: "Shop by Occasion",
      birthdays: "Birthdays",
      anniversaries: "Anniversaries",
      weddings: "Weddings",
      corporate: "Corporate",
      celebrations: "Celebrations",
      valentines: "Valentine's Day",
      eidAlAdha: "Eid Al-Adha",
      foundationDay: "Foundation Day",
      mothersDay: "Mother's Day",
      thankYou: "Thank You",
      newYear: "New Year",
      graduation: "Graduation",
      eidAlFitr: "Eid Al-Fitr",
      anniversary: "Anniversary",
      hajj: "Hajj",
    },
    categories: {
      title: "Our Collections",
      jewelry: "Jewelry",
      fragrances: "Fragrances",
      accessories: "Accessories",
      lifestyle: "Lifestyle",
      chocolate: "Chocolate",
      flowers: "Flowers",
      perfumes: "Perfumes",
    },
    bestSellers: {
      title: "Best Sellers",
      viewAll: "View All",
    },
    featured: {
      title: "Featured Collections",
      new: "New Arrivals",
      limited: "Limited Edition",
    },
    featuredCollections: {
      title: "Featured Collections",
      badge: "Featured",
    },
    footer: {
      about: "About",
      aboutText:
        "ROSISTA is your premier destination for luxury gifts that celebrate life's most precious moments.",
      quickLinks: "Quick Links",
      customer: "Customer Service",
      contact: "Contact",
      support: "Support",
      returns: "Returns",
      shipping: "Shipping",
      faq: "FAQ",
      company: "Company",
      careers: "Careers",
      blog: "Blog",
      press: "Press",
      legal: "Legal",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      cookies: "Cookie Settings",
      rights: "All rights reserved",
    },
  },
  ar: {
    nav: {
      home: "الرئيسية",
      occasions: "المناسبات",
      shop: "التسوق",
      about: "عن",
      contact: "اتصل",
    },
    hero: {
      title: "هدايا فاخرة لكل لحظة",
      subtitle:
        "مجموعات منتقاة من الهدايا الرقيقة التي تحتفل باللحظات الثمينة في الحياة",
      explore: "استكشف المجموعة",
      slide1: {
        title: "ترتيبات زهور فاخرة",
        cta: "تسوق الزهور",
      },
      slide2: {
        title: "مجموعات هدايا فاخرة",
        cta: "استكشف المجموعات",
      },
      slide3: {
        title: "هدايا زفاف أنيقة",
        cta: "تسوق الزفاف",
      },
    },
    home: {
      shopByOccasion: {
        title: "تسوق حسب المناسبة",
      },
      occasions: {
        viewMore: "عرض جميع المناسبات",
      },
      categories: {
        title: "فئاتنا",
      },
    },
    occasions: {
      title: "تسوق حسب المناسبة",
      birthdays: "أعياد الميلاد",
      anniversaries: "الذكريات السنوية",
      weddings: "الزفاف",
      corporate: "الشركات",
      celebrations: "الاحتفالات",
      valentines: "عيد الحب",
      eidAlAdha: "عيد الأضحى",
      foundationDay: "اليوم الوطني",
      mothersDay: "عيد الأم",
      thankYou: "شكر وتقدير",
      newYear: "رأس السنة",
      graduation: "التخرج",
      eidAlFitr: "عيد الفطر",
      anniversary: "الذكرى السنوية",
      hajj: "الحج",
    },
    categories: {
      title: "فئاتنا",
      jewelry: "المجوهرات",
      fragrances: "العطور",
      accessories: "الإكسسوارات",
      lifestyle: "نمط الحياة",
      chocolate: "الشوكولاتة",
      flowers: "الزهور",
      perfumes: "العطور",
    },
    bestSellers: {
      title: "الأكثر مبيعاً",
      viewAll: "عرض الكل",
    },
    featured: {
      title: "مجموعات مميزة",
      new: "وصل حديثاً",
      limited: "إصدار محدود",
    },
    featuredCollections: {
      title: "مجموعات مميزة",
      badge: "مميز",
    },
    footer: {
      about: "حول",
      aboutText:
        "روزيستا هي وجهتك الأولى للهدايا الفاخرة التي تحتفل باللحظات الثمينة في الحياة.",
      quickLinks: "روابط سريعة",
      customer: "خدمة العملاء",
      contact: "اتصل",
      support: "الدعم",
      returns: "المرتجعات",
      shipping: "الشحن",
      faq: "الأسئلة الشائعة",
      company: "الشركة",
      careers: "الوظائف",
      blog: "المدونة",
      press: "الأخبار",
      legal: "قانوني",
      privacy: "سياسة الخصوصية",
      terms: "شروط الخدمة",
      cookies: "إعدادات ملفات تعريف الارتباط",
      rights: "جميع الحقوق محفوظة",
    },
  },
};

export function getTranslation(lang: Language, key: string): string {
  const keys = key.split(".");
  let value: any = translations[lang];
  for (const k of keys) {
    value = value?.[k];
  }
  return value || key;
}
