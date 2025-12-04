"use client";

import { useRef, useEffect, useCallback } from "react";
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const setItemRef = useCallback(
    (id: string, element: HTMLDivElement | null) => {
      if (element) {
        itemRefs.current.set(id, element);
      } else {
        itemRefs.current.delete(id);
      }
    },
    []
  );

  useEffect(() => {
    const container = scrollContainerRef.current;
    const activeElement = itemRefs.current.get(activeId);

    if (container && activeElement) {
      const scrollLeft =
        activeElement.offsetLeft -
        container.offsetWidth / 2 +
        activeElement.offsetWidth / 2;

      container.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
    }
  }, [activeId]);

  return (
    <div className="relative w-full px-4 md:px-8 pb-8">
      {/* Simple Horizontal List */}
      <div
        ref={scrollContainerRef}
        className="flex items-center justify-start md:justify-center gap-6 md:gap-10 overflow-x-auto scrollbar-hide px-8 md:px-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {occasions.map((occasion) => (
          <div
            key={occasion.id}
            ref={(el) => setItemRef(occasion.id, el)}
            onClick={() => onSelect(occasion)}
            className={cn(
              "relative cursor-pointer transition-all duration-300 flex-shrink-0 pointer-events-auto z-50",
              activeId === occasion.id
                ? "opacity-100"
                : "opacity-40 hover:opacity-70"
            )}
          >
            <h3
              className={cn(
                "text-base md:text-lg font-bold text-white whitespace-nowrap transition-all duration-300",
                isRtl ? "font-sans-ar" : "font-sans-en"
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

            {/* Active Indicator */}
            <div
              className={cn(
                "h-0.5 bg-amber-400 mt-2 rounded-full transition-all duration-300",
                activeId === occasion.id
                  ? "w-full opacity-100"
                  : "w-0 opacity-0"
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
