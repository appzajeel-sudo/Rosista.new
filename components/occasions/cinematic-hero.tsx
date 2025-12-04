"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

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
};

export function CinematicHero({ activeOccasion }: Props) {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeOccasion.id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          {/* Blurred Background Layer */}
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
                className="object-contain object-center md:object-right"
                priority
              />
            </div>
          </div>

          {/* Cinematic Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent pointer-events-none z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none z-10" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="absolute inset-0 z-30 flex flex-col justify-end md:justify-center px-6 md:px-16 lg:px-24 pb-32 md:pb-0">
        <div className="max-w-2xl space-y-6">
          <motion.div
            key={`text-${activeOccasion.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Title */}
            <h1
              className={`text-3xl md:text-7xl lg:text-8xl font-bold text-white mb-4 leading-tight ${
                isRtl ? "font-sans-ar" : "font-sans-en"
              }`}
              style={
                !isRtl
                  ? { fontFamily: "'Cormorant Garamond', 'Georgia', serif" }
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
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="bg-amber-500 hover:bg-amber-600 text-black font-bold text-lg px-8 py-6 rounded-full transition-all cursor-pointer"
              >
                <Link href={`/occasions/${activeOccasion.slug}`}>
                  {isRtl ? (
                    <ArrowLeft className="w-5 h-5 ml-2" />
                  ) : (
                    <ArrowRight className="w-5 h-5 mr-2" />
                  )}
                  {isRtl ? "تصفح المناسبة" : "Browse Occasion"}
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
