"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { DesktopProductInfo } from "@/components/products/product-info";
import { RelatedProducts } from "@/components/products/related-products";
import type { Product } from "@/types/product";

// New Breadcrumb imports
import { HomeIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface ProductViewProps {
  product: Product;
  relatedProducts?: Product[];
}

export function ProductView({
  product,
  relatedProducts = [],
}: ProductViewProps) {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const [activeImage, setActiveImage] = useState(product.mainImage);

  const allImages = [
    product.mainImage,
    ...(product.additionalImages || []),
  ].filter(Boolean);

  /* 
     ===========================================
     UPDATED: Outline Breadcrumb Style
     Matches user request: Bordered, rounded, h-8
     ===========================================
  */
  const Breadcrumbs = () => (
    <div className="hidden md:flex mb-8">
      <Breadcrumb>
        <BreadcrumbList className="h-8 gap-2 rounded-md border px-3 text-sm">
          {/* Home */}
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="flex items-center gap-2">
              <HomeIcon className="size-4" />
              <span className="sr-only">Home</span>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          {/* Occasions */}
          <BreadcrumbItem>
            <BreadcrumbLink href="/occasions">
              {isRtl ? "المناسبات" : "Occasions"}
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          {/* Current Product */}
          <BreadcrumbItem>
            <BreadcrumbPage>
              {isRtl ? product.nameAr : product.nameEn}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );

  return (
    <div className="bg-white dark:bg-black min-h-screen pb-20">
      <div className="container max-w-[1440px] mx-auto px-6 md:px-12 pt-24 pb-10 md:pt-36 md:pb-20">
        <Breadcrumbs />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Gallery Section */}
          <div>
            <div className="block md:hidden -mx-6 mb-8">
              <Carousel className="w-full">
                <CarouselContent>
                  {allImages.map((img, idx) => (
                    <CarouselItem key={idx}>
                      <div className="relative aspect-[3/4] w-full bg-neutral-100 dark:bg-neutral-900">
                        <Image
                          src={img}
                          alt={`Slide ${idx}`}
                          fill
                          className="object-cover"
                          priority={idx === 0}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>

            <div className="hidden md:flex gap-6">
              <div className="flex flex-col gap-4 w-20 lg:w-24 shrink-0 h-fit sticky top-32">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={cn(
                      "relative aspect-[3/4] w-full transition-all duration-300",
                      activeImage === img
                        ? "opacity-100 ring-1 ring-black dark:ring-white p-0.5"
                        : "opacity-50 hover:opacity-100 grayscale hover:grayscale-0"
                    )}
                  >
                    <Image
                      src={img}
                      alt={`Thumb ${idx}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>

              <div className="flex-1 relative aspect-[3/4] bg-neutral-50 dark:bg-neutral-900">
                <Image
                  src={activeImage}
                  alt="Main view"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="md:sticky md:top-32 h-fit pt-2">
            <DesktopProductInfo product={product} />
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-32 pt-16 border-t border-black/5 dark:border-white/5">
          <div className="text-center mb-16 space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              You Might Also Love
            </span>
            <h3 className="text-3xl md:text-4xl font-serif text-foreground">
              {isRtl ? "مجموعة مختارة" : "Curated Selection"}
            </h3>
          </div>
          <RelatedProducts products={relatedProducts} />
        </div>
      </div>
    </div>
  );
}
