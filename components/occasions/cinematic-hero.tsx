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
  hideButton?: boolean; // Hide the browse button on detail pages
};

// Animation variants - defined outside component to prevent re-creation on every render
const slideVariants = {
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
} as const;

export function CinematicHero({
  activeOccasion,
  onNext,
  onPrev,
  direction = 0,
  hideButton = false,
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
    <div className="relative w-full h-[90vh] md:h-screen overflow-hidden">
      <AnimatePresence initial={false} custom={animationDirection}>
        <motion.div
          key={activeOccasion.id}
          custom={animationDirection}
          variants={slideVariants}
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
              {!hideButton && (
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
              )}
            </div>
          </div>

          {hideButton && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-4 pointer-events-none">
              <style jsx>{`
                @property --gradient-angle {
                  syntax: "<angle>";
                  initial-value: 0deg;
                  inherits: false;
                }

                @property --gradient-angle-offset {
                  syntax: "<angle>";
                  initial-value: 0deg;
                  inherits: false;
                }

                @property --gradient-percent {
                  syntax: "<percentage>";
                  initial-value: 5%;
                  inherits: false;
                }

                @property --gradient-shine {
                  syntax: "<color>";
                  initial-value: white;
                  inherits: false;
                }

                .shiny-mouse {
                  --shiny-cta-bg: #000000;
                  --shiny-cta-bg-subtle: #1a1818;
                  --shiny-cta-fg: #ffffff;
                  --shiny-cta-highlight: #67e8f9;
                  --shiny-cta-highlight-subtle: #06b6d4;
                  --animation: gradient-angle linear infinite;
                  --duration: 3s;
                  --shadow-size: 2px;
                  --transition: 800ms cubic-bezier(0.25, 1, 0.5, 1);

                  position: relative;
                  display: block;
                  width: 30px;
                  height: 50px;
                  border-radius: 15px;
                  border: 1px solid transparent;
                  background: linear-gradient(
                        var(--shiny-cta-bg),
                        var(--shiny-cta-bg)
                      )
                      padding-box,
                    conic-gradient(
                        from
                          calc(
                            var(--gradient-angle) - var(--gradient-angle-offset)
                          ),
                        transparent,
                        var(--shiny-cta-highlight) var(--gradient-percent),
                        var(--gradient-shine) calc(var(--gradient-percent) * 2),
                        var(--shiny-cta-highlight)
                          calc(var(--gradient-percent) * 3),
                        transparent calc(var(--gradient-percent) * 4)
                      )
                      border-box;
                  box-shadow: inset 0 0 0 1px var(--shiny-cta-bg-subtle);
                  animation: var(--animation) var(--duration);
                }

                .shiny-mouse::before {
                  content: "";
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  width: 100%;
                  height: 100%;
                  border-radius: 15px;
                  box-shadow: 0 0 20px var(--shiny-cta-highlight-subtle);
                  opacity: 0.3;
                  z-index: -1;
                }

                .shiny-mouse::after {
                  content: "";
                  position: absolute;
                  top: 8px;
                  left: 50%;
                  transform: translateX(-50%);
                  width: 4px;
                  height: 6px;
                  background: var(--shiny-cta-highlight);
                  border-radius: 2px;
                  animation: scroll-wheel 2s ease-in-out infinite;
                  box-shadow: 0 0 5px var(--shiny-cta-highlight);
                  z-index: 2;
                }

                .shiny-mouse-dots {
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  --size: calc(100% - var(--shadow-size) * 3);
                  --position: 2px;
                  --space: calc(var(--position) * 1.5);
                  width: var(--size);
                  height: var(--size);
                  background: radial-gradient(
                      circle at var(--position) var(--position),
                      white calc(var(--position) / 3),
                      transparent 0
                    )
                    padding-box;
                  background-size: var(--space) var(--space);
                  background-repeat: space;
                  mask-image: conic-gradient(
                    from calc(var(--gradient-angle) + 45deg),
                    black,
                    transparent 10% 90%,
                    black
                  );
                  border-radius: 12px;
                  opacity: 0.8;
                  z-index: 1;
                  animation: var(--animation) var(--duration);
                }

                @keyframes gradient-angle {
                  to {
                    --gradient-angle: 360deg;
                  }
                }

                @keyframes scroll-wheel {
                  0% {
                    top: 8px;
                    opacity: 1;
                    height: 6px;
                  }
                  50% {
                    height: 12px;
                    opacity: 0.5;
                  }
                  100% {
                    top: 30px;
                    opacity: 0;
                    height: 4px;
                  }
                }
              `}</style>

              <p
                className={`text-sm tracking-[0.2em] uppercase text-cyan-300 font-medium ${
                  isRtl ? "font-sans-ar" : "font-sans-en"
                }`}
                style={{
                  textShadow: "0 0 10px rgba(103, 232, 249, 0.5)",
                }}
              >
                {isRtl ? "اكتشف" : "Discover"}
              </p>

              <div className="shiny-mouse">
                <div className="shiny-mouse-dots" />
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
