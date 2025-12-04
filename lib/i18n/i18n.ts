import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import ar from "./locales/ar.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en,
      },
      ar: {
        translation: ar,
      },
    },
    fallbackLng: "ar",
    debug: false,

    interpolation: {
      escapeValue: false,
    },

    detection: {
      // Cookie first for SSR support, then localStorage, then browser language
      order: ["cookie", "localStorage", "navigator"],
      caches: ["cookie", "localStorage"],
      cookieMinutes: 525600, // 1 year
      // تحويل اللغة إلى صيغة موحدة
      convertDetectedLanguage: (lng: string) => {
        // تحويل en-US, en-GB, etc إلى en
        if (lng.startsWith("en")) return "en";
        if (lng.startsWith("ar")) return "ar";
        return lng;
      },
    },
  });

export default i18n;
