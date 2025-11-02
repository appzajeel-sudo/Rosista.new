"use client"
import { useTheme } from "@/lib/theme-context"
import { getTranslation } from "@/lib/i18n"

export function FeaturedCollections() {
  const { language } = useTheme()

  return (
    <section className="py-20 px-4 md:px-6 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-16 text-black dark:text-white">
          {getTranslation(language, "featured.title")}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* New Arrivals */}
          <div className="lg:col-span-2 relative overflow-hidden rounded-2xl h-96 group cursor-pointer">
            {/* CHANGE: Add lazy loading and responsive sizes */}
            <img
              src="/new-luxury-arrivals-collection.jpg"
              alt="New Arrivals"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
              decoding="async"
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 p-8">
              <h3 className="text-white font-serif text-3xl font-bold mb-3">
                {getTranslation(language, "featured.new")}
              </h3>
              <p className="text-white/80">Discover our latest curated collections</p>
            </div>
          </div>

          {/* Limited Edition */}
          <div className="relative overflow-hidden rounded-2xl h-96 group cursor-pointer">
            <img
              src="/limited-edition-luxury-gifts.jpg"
              alt="Limited Edition"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
              decoding="async"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-white font-serif text-2xl font-bold">
                {getTranslation(language, "featured.limited")}
              </h3>
              <p className="text-white/80 text-sm">Exclusive pieces</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
