"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const OCCASIONS = [
  {
    id: 1,
    slug: "valentines",
    nameKey: "occasions.valentines",
    image:
      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&h=600&fit=crop&q=80",
    featured: true,
  },
  {
    id: 2,
    slug: "eidAlAdha",
    nameKey: "occasions.eidAlAdha",
    image:
      "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&h=600&fit=crop&q=80",
  },
  {
    id: 3,
    slug: "foundationDay",
    nameKey: "occasions.foundationDay",
    image:
      "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=600&h=600&fit=crop&q=80",
  },
  {
    id: 4,
    slug: "mothersDay",
    nameKey: "occasions.mothersDay",
    image:
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&h=800&fit=crop&q=80",
    tall: true,
  },
  {
    id: 5,
    slug: "birthday",
    nameKey: "occasions.birthdays",
    image:
      "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=600&h=600&fit=crop&q=80",
  },
  {
    id: 6,
    slug: "thankYou",
    nameKey: "occasions.thankYou",
    image:
      "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=600&h=600&fit=crop&q=80",
  },
  {
    id: 7,
    slug: "newYear",
    nameKey: "occasions.newYear",
    image:
      "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=600&h=800&fit=crop&q=80",
    tall: true,
  },
  {
    id: 8,
    slug: "wedding",
    nameKey: "occasions.weddings",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1000&fit=crop&q=80",
  },
  {
    id: 9,
    slug: "graduation",
    nameKey: "occasions.graduation",
    image:
      "https://images.unsplash.com/photo-1576267423048-15c0040fec78?w=600&h=600&fit=crop&q=80",
  },
  {
    id: 10,
    slug: "eidAlFitr",
    nameKey: "occasions.eidAlFitr",
    image:
      "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=600&h=600&fit=crop&q=80",
  },
  {
    id: 11,
    slug: "anniversary",
    nameKey: "occasions.anniversary",
    image:
      "https://images.unsplash.com/photo-1464047736614-af63643285bf?w=600&h=600&fit=crop&q=80",
  },
  {
    id: 12,
    slug: "hajj",
    nameKey: "occasions.hajj",
    image:
      "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=600&h=600&fit=crop&q=80",
  },
];

export function ShopByOccasion() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden bg-background py-3 sm:py-5">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0 0 0 / 0.15) 1px, transparent 0)`,
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1650px] px-6 sm:px-8">
        {/* Header */}
        <div className="mb-12 flex items-end justify-between">
          <div className="relative">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`pb-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl ${
                isRtl ? "font-sans-ar" : "font-sans-en"
              }`}
            >
              {t("home.shopByOccasion.title")}
            </motion.h2>
            {/* Decorative Line */}
            <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center gap-2">
              <div
                className="h-0.5 w-6 rounded-full"
                style={{
                  backgroundColor: isDark
                    ? "rgb(255, 255, 255)"
                    : "rgb(107, 114, 128)",
                }}
              ></div>
              <div
                className="h-0.5 w-16"
                style={{
                  backgroundColor: isDark
                    ? "rgb(250, 204, 21)"
                    : "rgb(0, 0, 0)",
                  clipPath:
                    "polygon(0 0, calc(100% - 4px) 0, 100% 100%, 4px 100%)",
                }}
              ></div>
              <div
                className="h-0.5 w-6 rounded-full"
                style={{
                  backgroundColor: isDark
                    ? "rgb(255, 255, 255)"
                    : "rgb(107, 114, 128)",
                }}
              ></div>
            </div>
          </div>

          <Link
            href="/occasions"
            className={`group hidden items-center gap-2 text-sm font-medium text-text-secondary transition-colors hover:text-foreground sm:flex ${
              isRtl ? "font-sans-ar" : "font-sans-en"
            }`}
          >
            {t("home.occasions.viewMore")}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Bento Grid */}
        <div className="grid auto-rows-fr grid-cols-2 gap-3 sm:gap-4 md:grid-cols-5 lg:grid-cols-6">
          {OCCASIONS.map((occasion, index) => (
            <motion.div
              key={occasion.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              className={`group relative overflow-hidden rounded-2xl transform-gpu transition-transform duration-1200 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform hover:scale-[0.975] ${
                occasion.featured
                  ? "md:col-span-2 md:row-span-2"
                  : occasion.tall
                  ? "md:row-span-2"
                  : "aspect-square"
              }`}
            >
              <Link
                href={`/occasions/${occasion.slug}`}
                className="block h-full"
              >
                {/* Image */}
                <div className="absolute inset-0">
                  <Image
                    src={occasion.image}
                    alt={t(occasion.nameKey)}
                    fill
                    className="object-cover"
                    sizes={
                      occasion.featured
                        ? "(max-width: 768px) 100vw, 50vw"
                        : "(max-width: 768px) 50vw, 25vw"
                    }
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5 md:p-6">
                  <div className="translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
                    <h3
                      className={`mb-1.5 text-base font-semibold text-white sm:text-lg md:text-xl ${
                        isRtl ? "font-sans-ar" : "font-sans-en"
                      }`}
                    >
                      {t(occasion.nameKey)}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-white/80">
                      <span className={isRtl ? "font-sans-ar" : "font-sans-en"}>
                        {isRtl ? "استكشف" : "Explore"}
                      </span>
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </div>
                </div>

                {/* Hover Shine Effect */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-8 flex justify-center sm:hidden">
          <Link
            href="/occasions"
            className={`inline-flex items-center gap-2 text-sm font-medium text-text-secondary ${
              isRtl ? "font-sans-ar" : "font-sans-en"
            }`}
          >
            {t("home.occasions.viewMore")}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
