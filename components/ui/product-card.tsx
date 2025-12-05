"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  const name = isRtl ? product.nameAr : product.nameEn;
  const description = isRtl ? product.descriptionAr : product.descriptionEn;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative w-full overflow-hidden rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors"
    >
      {/* Product Image */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-800">
        <Link href={`/products/${product.slug}`}>
          <Image
            src={product.mainImage}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        </Link>

        {/* Quick Add Button - Appears on Hover */}
        <div className="absolute bottom-4 left-4 right-4 translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Button
            className={`w-full gap-2 bg-white text-black hover:bg-neutral-200 ${
              isRtl ? "font-sans-ar" : "font-sans-en"
            }`}
          >
            <ShoppingCart className="h-4 w-4" />
            {isRtl ? "إضافة للسلة" : "Add to Cart"}
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <Link href={`/products/${product.slug}`}>
            <h3
              className={`text-lg font-medium text-white transition-colors group-hover:text-amber-400 line-clamp-1 ${
                isRtl ? "font-sans-ar" : "font-sans-en"
              }`}
            >
              {name}
            </h3>
          </Link>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold text-white">
            {product.price.toLocaleString()} {isRtl ? "ر.س" : "SAR"}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
