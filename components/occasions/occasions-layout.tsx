"use client";

import { useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CinematicHero } from "@/components/occasions/cinematic-hero";
import { ThumbnailSlider } from "@/components/occasions/thumbnail-slider";

type Occasion = {
  id: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  image: string;
};

type Props = {
  occasions: Occasion[];
};

export function OccasionsLayout({ occasions }: Props) {
  // i18n support only (no theme changes)
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  // Default to the first occasion
  const [activeOccasion, setActiveOccasion] = useState<Occasion>(occasions[0]);
  const [direction, setDirection] = useState(0);

  if (!occasions || occasions.length === 0) return null;

  const handleNext = useCallback(() => {
    const currentIndex = occasions.findIndex((o) => o.id === activeOccasion.id);
    const nextIndex = (currentIndex + 1) % occasions.length;
    setDirection(1);
    setActiveOccasion(occasions[nextIndex]);
  }, [occasions, activeOccasion.id]);

  const handlePrev = useCallback(() => {
    const currentIndex = occasions.findIndex((o) => o.id === activeOccasion.id);
    const prevIndex = (currentIndex - 1 + occasions.length) % occasions.length;
    setDirection(-1);
    setActiveOccasion(occasions[prevIndex]);
  }, [occasions, activeOccasion.id]);

  const handleSelect = useCallback(
    (occasion: Occasion) => {
      const currentIndex = occasions.findIndex(
        (o) => o.id === activeOccasion.id
      );
      const newIndex = occasions.findIndex((o) => o.id === occasion.id);
      setDirection(newIndex > currentIndex ? 1 : -1);
      setActiveOccasion(occasion);
    },
    [occasions, activeOccasion.id]
  );

  return (
    <div className="relative w-full min-h-screen bg-black">
      {/* Hero Section Container - Full Screen */}
      <div className="relative h-[90vh] md:h-screen w-full overflow-hidden">
        {/* Hero Section - Controlled by state */}
        <CinematicHero
          activeOccasion={activeOccasion}
          onNext={handleNext}
          onPrev={handlePrev}
          direction={direction}
        />

        {/* Thumbnail Slider - Controlled by state */}
        <div className="absolute bottom-0 left-0 right-0 z-40 pb-8 md:pb-12 bg-gradient-to-t from-black via-black/80 to-transparent pt-24">
          <ThumbnailSlider
            occasions={occasions}
            activeId={activeOccasion.id}
            onSelect={handleSelect}
          />
        </div>
      </div>

      {/* Landing Page Content - General Sections */}
      <div className="relative z-50 bg-black w-full shadow-[0_-50px_100px_rgba(0,0,0,1)]">
        <div className="py-24 space-y-32 container mx-auto px-4 md:px-16">
          {/* Why Rosista Section */}
          <div className="text-center space-y-8">
            <h2
              className={`text-3xl md:text-5xl font-bold text-white ${
                isRtl ? "font-sans-ar" : "font-sans-en"
              }`}
            >
              {t("occasions.whyRosista.title", "لماذا روزيستا؟")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800">
                <h3
                  className={`text-xl font-bold text-amber-500 mb-4 ${
                    isRtl ? "font-sans-ar" : "font-sans-en"
                  }`}
                >
                  {t("occasions.whyRosista.freshFlowers", "زهور طازجة يومياً")}
                </h3>
                <p
                  className={`text-neutral-400 ${
                    isRtl ? "font-sans-ar" : "font-sans-en"
                  }`}
                >
                  {t(
                    "occasions.whyRosista.freshFlowersDesc",
                    "نضمن لك أجود أنواع الزهور التي ننتقيها بعناية كل صباح."
                  )}
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800">
                <h3
                  className={`text-xl font-bold text-amber-500 mb-4 ${
                    isRtl ? "font-sans-ar" : "font-sans-en"
                  }`}
                >
                  {t(
                    "occasions.whyRosista.sameDayDelivery",
                    "توصيل في نفس اليوم"
                  )}
                </h3>
                <p
                  className={`text-neutral-400 ${
                    isRtl ? "font-sans-ar" : "font-sans-en"
                  }`}
                >
                  {t(
                    "occasions.whyRosista.sameDayDeliveryDesc",
                    "خدمة توصيل سريعة وموثوقة لضمان وصول هديتك في وقتها."
                  )}
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800">
                <h3
                  className={`text-xl font-bold text-amber-500 mb-4 ${
                    isRtl ? "font-sans-ar" : "font-sans-en"
                  }`}
                >
                  {t("occasions.whyRosista.luxuryPackaging", "تغليف فاخر")}
                </h3>
                <p
                  className={`text-neutral-400 ${
                    isRtl ? "font-sans-ar" : "font-sans-en"
                  }`}
                >
                  {t(
                    "occasions.whyRosista.luxuryPackagingDesc",
                    "لمسات فنية في التغليف تضفي طابعاً من الفخامة والرقي."
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* How it Works Section */}
          <div className="text-center space-y-8">
            <h2
              className={`text-3xl md:text-5xl font-bold text-white ${
                isRtl ? "font-sans-ar" : "font-sans-en"
              }`}
            >
              {t("occasions.howItWorks.title", "كيف تعمل الخدمة")}
            </h2>
            <p
              className={`text-neutral-400 max-w-2xl mx-auto ${
                isRtl ? "font-sans-ar" : "font-sans-en"
              }`}
            >
              {t(
                "occasions.howItWorks.description",
                "خطوات بسيطة تفصلك عن إرسال أجمل الهدايا لأحبائك."
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
