"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";

type Slide = {
  id: string;
  image: string;
};

type Props = {
  slides: Slide[];
};

export function FilmStripHero({ slides }: Props) {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const [isReady, setIsReady] = useState(false);

  // Duplicate slides 2 times for seamless infinite loop
  const duplicatedSlides = [...slides, ...slides];

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let slidesWidth = container.scrollWidth / 2;

    // Function to update slides width
    const updateWidth = () => {
      slidesWidth = container.scrollWidth / 2;
    };

    // Create infinite scroll animation
    const createAnimation = () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }

      updateWidth();

      // بدء من الموضع الصحيح بدون قفزة
      gsap.set(container, {
        x: 0,
        opacity: 0, // إخفاء في البداية
      });

      // Fade in سلس قبل بدء الحركة
      gsap.to(container, {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => {
          // بدء الحركة بعد fade in
          animationRef.current = gsap.to(container, {
            x: isRtl ? slidesWidth : -slidesWidth,
            duration: 30,
            ease: "none",
            repeat: -1,
            modifiers: {
              x: (x) => {
                const num = parseFloat(x);
                // Seamlessly loop position
                if (isRtl) {
                  return num >= slidesWidth ? `${num - slidesWidth}` : x;
                } else {
                  return num <= -slidesWidth ? `${num + slidesWidth}` : x;
                }
              },
            },
          });
          setIsReady(true);
        },
      });
    };

    // انتظار تحميل الصور أولاً
    const images = container.querySelectorAll("img");
    let loadedImages = 0;
    const totalImages = images.length;

    if (totalImages === 0) {
      // إذا لم تكن هناك صور، ابدأ بعد تأخير قصير
      const timeoutId = setTimeout(() => {
        requestAnimationFrame(() => {
          createAnimation();
        });
      }, 150);
      return () => clearTimeout(timeoutId);
    }

    const checkAllLoaded = () => {
      loadedImages++;
      if (loadedImages === totalImages) {
        // جميع الصور تم تحميلها، ابدأ الحركة
        requestAnimationFrame(() => {
          createAnimation();
        });
      }
    };

    // التحقق من الصور المحملة مسبقاً أو انتظار تحميلها
    images.forEach((img) => {
      if (img.complete && img.naturalHeight !== 0) {
        checkAllLoaded();
      } else {
        img.addEventListener("load", checkAllLoaded, { once: true });
        img.addEventListener("error", checkAllLoaded, { once: true }); // حتى لو فشل التحميل
      }
    });

    // Handle window resize
    const handleResize = () => {
      if (animationRef.current) {
        animationRef.current.kill();
        createAnimation();
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        animationRef.current.kill();
      }
      images.forEach((img) => {
        img.removeEventListener("load", checkAllLoaded);
        img.removeEventListener("error", checkAllLoaded);
      });
    };
  }, [slides, isRtl]);

  return (
    <section className="relative w-full overflow-hidden bg-background pt-20 pb-12 md:pt-16 md:pb-16 lg:py-20">
      <div className="relative w-full overflow-hidden">
        {/* Top and Bottom Borders */}
        <div className="absolute left-0 right-0 top-0 z-10 h-2 bg-background md:h-2.5 lg:h-3" />
        <div className="absolute bottom-0 left-0 right-0 z-10 h-2 bg-background md:h-2.5 lg:h-3" />

        {/* Animated Film Strip - GSAP */}
        <div className="overflow-hidden">
          <div
            ref={containerRef}
            className="flex gap-0 film-strip-scroll"
            style={{
              willChange: "transform",
              opacity: isReady ? 1 : 0, // إخفاء حتى جاهز
            }}
          >
            {duplicatedSlides.map((slide, index) => (
              <div
                key={`${slide.id}-${index}`}
                className="relative h-[280px] w-[200px] shrink-0 overflow-hidden sm:h-[320px] sm:w-[240px] md:h-[380px] md:w-[300px] lg:h-[420px] lg:w-[340px]"
              >
                <div className="relative h-full w-full film-strip-border">
                  <Image
                    src={slide.image}
                    alt={`Occasion ${slide.id}`}
                    fill
                    className="object-cover film-strip-image"
                    sizes="(max-width: 640px) 200px, (max-width: 768px) 240px, (max-width: 1024px) 300px, 340px"
                    priority={index < 3}
                    fetchPriority={index < 3 ? "high" : "auto"}
                    quality={85}
                    loading={index < 3 ? "eager" : "lazy"}
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzQwIiBoZWlnaHQ9IjQyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmMGYwZjA7c3RvcC1vcGFjaXR5OjEiIC8+PHN0b3Agb2Zmc2V0PSI1MCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNlMGUwZTA7c3RvcC1vcGFjaXR5OjEiIC8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojZjBmMGYwO3N0b3Atb3BhY2l0eToxIiAvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JhZCkiIC8+PC9zdmc+"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gradient Overlays */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-background via-background/50 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-background via-background/50 to-transparent" />
      </div>
    </section>
  );
}
