"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

export const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.8, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-600, 0]),
    springConfig
  );

  const { i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  return (
    <div
      ref={ref}
      className="h-auto min-h-screen py-20 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div
          className={cn(
            "flex mb-10 lg:mb-20 gap-4 lg:gap-8",
            isRtl ? "flex-row" : "flex-row-reverse"
          )}
        >
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div
          className={cn(
            "flex mb-10 lg:mb-20 gap-4 lg:gap-8",
            isRtl ? "flex-row-reverse" : "flex-row"
          )}
        >
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div
          className={cn(
            "flex gap-4 lg:gap-8",
            isRtl ? "flex-row" : "flex-row-reverse"
          )}
        >
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  return (
    <div
      className={cn(
        "max-w-7xl relative mx-auto py-10 md:py-40 px-4 w-full left-0 top-0 z-50 pointer-events-none",
        isRtl ? "text-right" : "text-left"
      )}
    >
      <h1
        className={cn(
          "text-2xl md:text-7xl font-bold dark:text-white",
          isRtl ? "font-sans-ar" : "font-sans-en"
        )}
      >
        {t("home.shopByOccasion.title")}
      </h1>
      <p
        className={cn(
          "max-w-2xl text-base md:text-xl mt-8 dark:text-neutral-200",
          isRtl ? "font-sans-ar ml-auto" : "font-sans-en mr-auto"
        )}
      >
        {t(
          "home.shopByOccasion.description",
          "We build beautiful products with the latest technologies and frameworks."
        )}
      </p>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
}) => {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-60 w-[18rem] lg:h-96 lg:w-[30rem] relative shrink-0"
    >
      <Link
        href={product.link}
        className="block h-full w-full rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-200 dark:border-gray-800"
      >
        <Image
          src={product.thumbnail}
          height={600}
          width={600}
          className="object-cover object-center absolute h-full w-full inset-0 brightness-95 group-hover/product:brightness-100 transition-all duration-300"
          alt={product.title}
        />
        {/* Subtle gradient overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-70 group-hover/product:opacity-90 transition-opacity duration-300 pointer-events-none"></div>
      </Link>
      <h2
        className={cn(
          "absolute bottom-6 text-white font-semibold text-lg drop-shadow-lg transition-all duration-300",
          "opacity-100 group-hover/product:opacity-100 group-hover/product:bottom-8",
          isRtl ? "right-6 font-sans-ar" : "left-6 font-sans-en"
        )}
      >
        {product.title}
      </h2>
    </motion.div>
  );
};
