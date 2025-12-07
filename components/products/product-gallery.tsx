"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { ZoomIn } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  if (!images || images.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image Stage */}
      <Dialog open={isZoomOpen} onOpenChange={setIsZoomOpen}>
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-neutral-50 dark:bg-neutral-900 group">
          <Image
            src={images[selectedImage]}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 will-change-transform"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />

          {/* Zoom Trigger Button - Subtle overlay */}
          <DialogTrigger asChild>
            <button
              className="absolute bottom-4 right-4 p-3 bg-white/80 backdrop-blur-md text-neutral-900 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105 shadow-sm"
              aria-label="Zoom image"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
          </DialogTrigger>
        </div>

        <DialogContent className="max-w-screen-xl w-full h-[95vh] p-0 bg-transparent border-none shadow-none flex items-center justify-center pointer-events-none">
          <DialogTitle className="sr-only">{name} Zoom</DialogTitle>
          <div className="relative w-full h-full max-h-[90vh] pointer-events-auto">
            <Image
              src={images[selectedImage]}
              alt={name}
              fill
              className="object-contain"
              quality={100}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Thumbnails - Grid */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 md:grid-cols-5 gap-3 mt-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={cn(
                "relative aspect-square w-full overflow-hidden rounded-xl transition-all duration-300",
                selectedImage === index
                  ? "ring-2 ring-neutral-900 dark:ring-neutral-100 ring-offset-2 ring-offset-white dark:ring-offset-neutral-950 opacity-100"
                  : "opacity-70 hover:opacity-100 hover:scale-105"
              )}
            >
              <Image
                src={image}
                alt={`${name} thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="10vw"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
