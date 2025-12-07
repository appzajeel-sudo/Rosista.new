"use client";

import { useTranslation } from "react-i18next";
import { ProductCard } from "@/components/ui/product-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { Product } from "@/types/product";

interface RelatedProductsProps {
  products: Product[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  if (!products || products.length === 0) return null;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2
          className={`text-2xl md:text-3xl font-bold ${
            isRtl ? "font-sans-ar" : "font-sans-en"
          }`}
        >
          {isRtl ? "قد يعجبك أيضا" : "You Might Also Like"}
        </h2>
      </div>

      <Carousel
        opts={{
          align: "start",
          direction: isRtl ? "rtl" : "ltr",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {products.map((product) => (
            <CarouselItem
              key={product._id}
              className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:block">
          <CarouselPrevious
            className={
              isRtl ? "right-[-3rem] left-auto" : "left-[-3rem] right-auto"
            }
          />
          <CarouselNext
            className={
              isRtl ? "left-[-3rem] right-auto" : "right-[-3rem] left-auto"
            }
          />
        </div>
      </Carousel>
    </div>
  );
}
