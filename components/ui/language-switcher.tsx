"use client";

import React from "react";
import { useTranslation } from "react-i18next";

interface LanguageSwitcherProps {
  className?: string;
  hoverColor?: string;
}

export function LanguageSwitcher({
  className = "",
  hoverColor = "",
}: LanguageSwitcherProps) {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLanguage = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLanguage);
  };

  return (
    <button
      onClick={toggleLanguage}
      className={`hidden text-[12px] font-semibold uppercase tracking-wider transition-colors sm:block ${className} ${hoverColor}`}
    >
      {i18n.language === "ar" ? "EN" : "AR"}
    </button>
  );
}
