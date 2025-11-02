"use cache"

import { HeroSlider } from "@/components/hero-slider"
import { ShopByOccasion } from "@/components/shop-by-occasion"
import { Categories } from "@/components/categories"
import { BestSellers } from "@/components/best-sellers"
import { FeaturedCollections } from "@/components/featured-collections"

export default function HomePage() {
  return (
    <main>
      <HeroSlider />
      <ShopByOccasion />
      <Categories />
      <BestSellers />
      <FeaturedCollections />
    </main>
  )
}
