"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedShinyButton } from "@/components/ui/animated-shiny-button";

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
  activeOccasion: Occasion;
  onNext?: () => void;
  onPrev?: () => void;
  direction?: number;
};

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

export function CinematicHero({
  activeOccasion,
  onNext,
  onPrev,
  direction = 0,
}: Props) {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  // Invert animation direction for RTL so "Next" comes from the left
  const animationDirection = direction * (isRtl ? -1 : 1);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AnimatePresence initial={false} custom={animationDirection}>
        <motion.div
          key={activeOccasion.id}
          custom={animationDirection}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 200, damping: 25, mass: 0.5 },
            opacity: { duration: 0.4, ease: "easeInOut" },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              if (isRtl) onPrev?.();
              else onNext?.();
            } else if (swipe > swipeConfidenceThreshold) {
              if (isRtl) onNext?.();
              else onPrev?.();
            }
          }}
          className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
        >
          {/* Background Blur Layer */}
          <div className="absolute inset-0">
            <Image
              src={activeOccasion.image}
              alt=""
              fill
              className="object-cover blur-xl scale-110 opacity-50"
              priority
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>

          {/* Main Image Layer - Contained */}
          <div className="absolute inset-0 flex items-start md:items-center justify-center md:justify-end md:pr-24 lg:pr-32 z-20 pt-4 md:pt-0">
            <div className="relative w-full h-[50vh] md:w-[60%] md:h-[80%]">
              <Image
                src={activeOccasion.image}
                alt={isRtl ? activeOccasion.nameAr : activeOccasion.nameEn}
                fill
                className="object-contain object-center md:object-right pointer-events-none"
                priority
              />
            </div>
          </div>

          {/* Cinematic Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent pointer-events-none z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none z-10" />

          {/* Content - Now inside the moving container for perfect sync */}
          <div className="absolute inset-0 z-30 flex flex-col justify-end md:justify-center px-6 md:px-16 lg:px-24 pb-44 md:pb-0 pointer-events-none">
            <div className="max-w-2xl space-y-6">
              {/* Title */}
              <h1
                className={`text-3xl md:text-7xl lg:text-8xl font-bold text-white mb-4 leading-tight ${
                  isRtl ? "font-sans-ar" : "font-sans-en"
                }`}
                style={
                  !isRtl
                    ? {
                        fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                        letterSpacing: "-0.02em",
                      }
                    : {}
                }
              >
                {isRtl ? activeOccasion.nameAr : activeOccasion.nameEn}
              </h1>

              {/* Description */}
              <p
                className={`text-sm md:text-xl text-gray-200 line-clamp-3 mb-8 leading-relaxed ${
                  isRtl ? "font-sans-ar" : "font-sans-en"
                }`}
              >
                {isRtl
                  ? activeOccasion.descriptionAr
                  : activeOccasion.descriptionEn}
              </p>

              {/* Actions */}
              <div className="flex flex-wrap gap-4 pointer-events-auto">
                <AnimatedShinyButton
                  url={`/occasions/${activeOccasion.slug}`}
                  className={`text-lg px-8 py-6 ${
                    isRtl ? "rtl font-sans-ar" : "font-sans-en"
                  }`}
                >
                  {isRtl ? "تصفح المناسبة" : "Browse Occasion"}
                </AnimatedShinyButton>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
