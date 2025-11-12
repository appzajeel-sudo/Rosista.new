"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useState } from "react";

type Occasion = {
  id: number;
  slug: string;
  nameKey: string;
  image: string;
};

type Props = {
  occasions: Occasion[];
};

function OccasionCard({
  occasion,
  index,
  isRtl,
  t,
}: {
  occasion: Occasion;
  index: number;
  isRtl: boolean;
  t: (key: string) => string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={`/occasions/${occasion.slug}`}
        className="block h-full w-full"
      >
        <div className="relative h-full w-full">
          {/* 3D Flip Card Container */}
          <div className="relative aspect-[3/3.8] sm:aspect-4/5 mb-4 perspective-1000">
            <motion.div
              className="relative h-full w-full preserve-3d"
              animate={{ rotateY: isHovered ? 180 : 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Front Face - Image */}
              <div className="absolute inset-0 backface-hidden">
                <div className="relative h-full w-full overflow-hidden bg-transparent">
                  <Image
                    src={occasion.image}
                    alt={t(occasion.nameKey)}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    priority={index < 4}
                  />
                </div>
              </div>

              {/* Back Face - Invitation Card Design */}
              <div
                className="absolute inset-0 backface-hidden"
                style={{
                  transform: "rotateY(180deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                <div
                  className="relative h-full w-full overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, rgb(135, 206, 250) 0%, rgb(155, 208, 247) 30%, rgb(185, 210, 235) 50%, rgb(155, 208, 247) 70%, rgb(135, 206, 250) 100%)",
                  }}
                >
                  {/* White Border Frame */}
                  <div className="absolute inset-0 border border-neutral-400/30" />

                  {/* Rosista Logo/Name - Top Left */}
                  <div className="absolute left-4 top-4">
                    <h4
                      className="text-xs font-bold tracking-[0.2em] uppercase text-black"
                      style={{
                        fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                        letterSpacing: "0.15em",
                      }}
                    >
                      ROSISTA
                    </h4>
                  </div>

                  {/* Decorative L Shape - Bottom Right */}
                  <div className="absolute right-0 bottom-0">
                    <div className="absolute right-4 bottom-4 w-px h-12 bg-black" />
                    <div className="absolute right-4 bottom-4 w-12 h-px bg-black" />
                  </div>

                  {/* Content - Centered */}
                  <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                    {/* Occasion Name */}
                    <h3
                      className={`mb-3 text-xl font-bold text-black ${
                        isRtl ? "font-sans-ar" : "font-sans-en"
                      }`}
                      style={
                        !isRtl
                          ? {
                              fontFamily:
                                "'Cormorant Garamond', 'Georgia', serif",
                              letterSpacing: "-0.01em",
                            }
                          : {}
                      }
                    >
                      {t(occasion.nameKey)}
                    </h3>

                    {/* Description */}
                    <p
                      className={`text-xs font-bold leading-relaxed text-black ${
                        isRtl ? "font-sans-ar" : "font-sans-en"
                      }`}
                      style={
                        !isRtl
                          ? {
                              fontFamily:
                                "'Cormorant Garamond', 'Georgia', serif",
                              letterSpacing: "0.02em",
                            }
                          : {}
                      }
                    >
                      {isRtl
                        ? "اكتشف مجموعتنا الحصرية من الهدايا المميزة"
                        : "Discover our exclusive collection of unique gifts"}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Text Below */}
          <div
            className={`text-center ${isRtl ? "font-sans-ar" : "font-sans-en"}`}
          >
            <h3 className="text-sm font-bold text-foreground">
              {t(occasion.nameKey)}
            </h3>
          </div>
        </div>
      </Link>
    </div>
  );
}

export function OccasionsGallery({ occasions }: Props) {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  return (
    <div className="relative w-full">
      {/* Simple Grid - Image and Text Only */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
        {occasions.map((occasion, index) => (
          <OccasionCard
            key={occasion.id}
            occasion={occasion}
            index={index}
            isRtl={isRtl}
            t={t}
          />
        ))}
      </div>
    </div>
  );
}
