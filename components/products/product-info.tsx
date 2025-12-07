"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Heart, Check, Loader2, Minus, Plus, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useFavorites } from "@/context/FavoritesContext";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

export function DesktopProductInfo({ product }: { product: Product }) {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const isFav = isFavorite(product._id);

  const name = isRtl ? product.nameAr : product.nameEn;
  const description = isRtl ? product.descriptionAr : product.descriptionEn;

  const handleAddToCart = async () => {
    if (!isAuthenticated)
      return toast({ title: "Login Required", variant: "destructive" });
    setIsAdding(true);
    try {
      await addToCart({
        id: product._id,
        nameEn: product.nameEn,
        nameAr: product.nameAr,
        price: product.price,
        imageUrl: product.mainImage,
      });
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAdding(false);
    }
  };

  const handleFavorite = async () => {
    if (!isAuthenticated) return toast({ title: "Login Required" });
    if (isFav) await removeFromFavorites(product._id);
    else
      await addToFavorites({
        id: product._id,
        nameEn: product.nameEn,
        nameAr: product.nameAr,
        price: product.price,
        imageUrl: product.mainImage,
      });
  };

  // Luxury Style Classes
  const serifFont = "font-serif";

  return (
    <div className="space-y-8 md:pr-12 lg:pr-20">
      {/* Added right padding to push content slightly left if desired, or left alone. 
            "floating" usually means lots of space. */}

      {/* 1. Brand / Category Header (Micro) */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
          <span>
            {product.category && typeof product.category === "object"
              ? isRtl
                ? product.category.nameAr
                : product.category.nameEn
              : "COLLECTION"}
          </span>
          <span>Ref: {product._id.slice(-6)}</span>
        </div>

        {/* 2. Main Title (Serif, Elegant) */}
        <h1
          className={cn(
            "text-4xl md:text-5xl font-light leading-tight text-foreground",
            serifFont
          )}
        >
          {name}
        </h1>

        {/* 3. Price (Minimalist) */}
        <div className="text-2xl font-light text-foreground flex items-baseline gap-2 pt-2">
          <span>SAR</span>
          <span>{product.price.toLocaleString()}</span>
        </div>
      </div>

      {/* 4. Description (Clean, Readable) */}
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <p
          className={cn(
            "text-muted-foreground text-sm md:text-base leading-relaxed font-light",
            isRtl ? "font-sans-ar" : ""
          )}
        >
          {description}
        </p>
      </div>

      {/* 5. Actions (High-End: Sharp Buttons) */}
      <div className="pt-8 space-y-4 border-t border-black/5 dark:border-white/5">
        <Button
          onClick={handleAddToCart}
          disabled={isAdding}
          className={cn(
            "w-full h-14 rounded-none uppercase tracking-[0.15em] text-xs font-medium transition-all duration-300",
            isAdded
              ? "bg-green-700 hover:bg-green-800 text-white"
              : "bg-black text-white hover:bg-black/80 dark:bg-white dark:text-black hover:dark:bg-white/90"
          )}
        >
          {isAdding ? (
            <Loader2 className="animate-spin w-4 h-4" />
          ) : isAdded ? (
            <div className="flex items-center gap-2">
              <span>{isRtl ? "تمت الإضافة" : "ADDED TO BAG"}</span>
              <Check className="w-4 h-4" />
            </div>
          ) : (
            <span>{isRtl ? "إضافة للسلة" : "ADD TO BASKET"}</span>
          )}
        </Button>

        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            onClick={handleFavorite}
            className={cn(
              "h-12 rounded-none border-black/10 dark:border-white/10 uppercase text-[10px] tracking-[0.15em] hover:bg-neutral-50 dark:hover:bg-neutral-900",
              isFav && "text-rose-500 border-rose-200"
            )}
          >
            <Heart
              className={cn("w-3.5 h-3.5 mr-2", isFav && "fill-current")}
            />
            {isRtl ? "المفضلة" : "WISHLIST"}
          </Button>
          <Button
            variant="outline"
            className="h-12 rounded-none border-black/10 dark:border-white/10 uppercase text-[10px] tracking-[0.15em] hover:bg-neutral-50 dark:hover:bg-neutral-900"
          >
            <Share2 className="w-3.5 h-3.5 mr-2" />
            {isRtl ? "مشاركة" : "SHARE"}
          </Button>
        </div>
      </div>

      {/* 6. Details Accordions (Minimalist Lines) */}
      <div className="pt-8">
        <Accordion type="single" collapsible className="w-full">
          {product.careInstructionsEn && (
            <AccordionItem value="care" className="border-b-0">
              <AccordionTrigger
                className={cn(
                  "py-4 text-xs uppercase tracking-widest font-normal hover:no-underline text-foreground/80",
                  isRtl ? "font-sans-ar" : ""
                )}
              >
                {isRtl ? "العناية" : "Care Guide"}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground font-light text-sm pb-6">
                {isRtl
                  ? product.careInstructionsAr
                  : product.careInstructionsEn}
              </AccordionContent>
            </AccordionItem>
          )}
          {product.arrangementContentsEn && (
            <AccordionItem value="contents" className="border-b-0">
              <AccordionTrigger
                className={cn(
                  "py-4 text-xs uppercase tracking-widest font-normal hover:no-underline text-foreground/80",
                  isRtl ? "font-sans-ar" : ""
                )}
              >
                {isRtl ? "المحتويات" : "Composition"}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground font-light text-sm pb-6">
                {isRtl
                  ? product.arrangementContentsAr
                  : product.arrangementContentsEn}
              </AccordionContent>
            </AccordionItem>
          )}
          {product.dimensions && (
            <AccordionItem value="dimensions" className="border-b-0">
              <AccordionTrigger
                className={cn(
                  "py-4 text-xs uppercase tracking-widest font-normal hover:no-underline text-foreground/80",
                  isRtl ? "font-sans-ar" : ""
                )}
              >
                {isRtl ? "الأبعاد" : "Dimensions"}
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="flex gap-12 text-sm text-muted-foreground font-light">
                  {product.dimensions.height && (
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] uppercase tracking-wider opacity-70">
                        Height
                      </span>
                      <span>{product.dimensions.height}</span>
                    </div>
                  )}
                  {product.dimensions.width && (
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] uppercase tracking-wider opacity-70">
                        Width
                      </span>
                      <span>{product.dimensions.width}</span>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
      </div>
    </div>
  );
}
