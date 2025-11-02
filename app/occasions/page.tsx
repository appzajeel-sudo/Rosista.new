"use cache"

import { FilmStripHero } from "@/components/film-strip-hero"
import { OccasionsGallery } from "@/components/occasions-gallery"

export default function OccasionsPage() {
  return (
    <main className="pt-16">
      <FilmStripHero />
      <OccasionsGallery />
    </main>
  )
}
