"use client";

import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

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
  activeId: string;
  onSelect: (occasion: Occasion) => void;
};

export function ThumbnailSlider({ occasions, activeId, onSelect }: Props) {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  return (
    <div className="relative w-full px-4 md:px-12 pb-8">
      {/* Grid / Flex Wrap Container */}
      <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6 md:gap-x-12 md:gap-y-8 px-4">
        {occasions.map((occasion) => (
          <div
            key={occasion.id}
            onClick={() => onSelect(occasion)}
            className={cn(
              "relative cursor-pointer transition-all duration-500 group/item",
              activeId === occasion.id
                ? "opacity-100 scale-110"
                : "opacity-40 hover:opacity-80 scale-100"
            )}
          >
            <div className="flex flex-col items-center justify-center min-w-[100px] md:min-w-[140px]">
              <h3
                className={cn(
                  "text-lg md:text-2xl font-black text-white whitespace-nowrap transition-all duration-300",
                  isRtl ? "font-sans-ar" : "font-sans-en",
                  activeId === occasion.id ? "text-shadow-glow" : ""
                )}
                style={
                  !isRtl
                    ? {
                        fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                        letterSpacing: "0.05em",
                      }
                    : {}
                }
              >
                {isRtl ? occasion.nameAr : occasion.nameEn}
              </h3>

              {/* Active Indicator Line */}
              <div
                className={cn(
                  "h-0.5 md:h-1 bg-amber-500 mt-2 rounded-full transition-all duration-500",
                  activeId === occasion.id
                    ? "w-full opacity-100"
                    : "w-0 opacity-0 group-hover/item:w-1/2 group-hover/item:opacity-50"
                )}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
