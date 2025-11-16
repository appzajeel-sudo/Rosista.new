"use client";

import { useEffect, useState } from "react";
import { DataViewer } from "./data-viewer";
import type { HeroSlide } from "@/types/hero";

export function DataViewerWrapper() {
  const [fetchedData, setFetchedData] = useState<any>(null);
  const [displayedData, setDisplayedData] = useState<any>(null);

  useEffect(() => {
    // Get fetched data from window (set by Server Component via script tag)
    const checkForFetchedData = () => {
      const globalFetchedData = (window as any).__HERO_FETCHED_DATA__;
      if (globalFetchedData) {
        setFetchedData(globalFetchedData);
      }
    };

    // Check immediately
    checkForFetchedData();

    // Check again after a short delay (in case script hasn't loaded yet)
    const timeoutId = setTimeout(checkForFetchedData, 100);

    // Listen for data updates from HeroSlider
    const handleDataUpdate = (event: CustomEvent) => {
      setDisplayedData(event.detail);
    };

    window.addEventListener(
      "hero-slider-data-update",
      handleDataUpdate as EventListener
    );

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener(
        "hero-slider-data-update",
        handleDataUpdate as EventListener
      );
    };
  }, []);

  // Only render in development
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  return <DataViewer fetchedData={fetchedData} displayedData={displayedData} />;
}
