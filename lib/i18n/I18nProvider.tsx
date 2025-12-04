"use client";

import { useLayoutEffect } from "react";
import { I18nextProvider } from "react-i18next";
import { useTranslation } from "react-i18next";
import i18n from "./i18n";

function LanguageSync() {
  const { i18n: i18nInstance } = useTranslation();

  useLayoutEffect(() => {
    // تحديث lang و dir قبل الرسم (paint) لمنع الخلط
    const updateDocumentAttributes = () => {
      const lang = i18nInstance.language;
      document.documentElement.setAttribute("lang", lang);
      document.documentElement.setAttribute(
        "dir",
        lang === "ar" ? "rtl" : "ltr"
      );
    };

    // تحديث فوري
    updateDocumentAttributes();

    // الاستماع لتغييرات اللغة
    i18nInstance.on("languageChanged", updateDocumentAttributes);

    return () => {
      i18nInstance.off("languageChanged", updateDocumentAttributes);
    };
  }, [i18nInstance]);

  return null;
}

export function I18nProvider({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale?: string;
}) {
  // Sync initial language from server
  if (locale && i18n.language !== locale) {
    i18n.changeLanguage(locale);
  }

  return (
    <I18nextProvider i18n={i18n}>
      <LanguageSync />
      {children}
    </I18nextProvider>
  );
}
