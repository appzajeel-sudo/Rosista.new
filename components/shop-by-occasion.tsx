"use client"
import { useTheme } from "@/lib/theme-context"
import { getTranslation } from "@/lib/i18n"

export function ShopByOccasion() {
  const { language } = useTheme()

  const occasions = [
    { id: 1, name: "birthdays", image: "/birthday-celebration-gifts.jpg" },
    { id: 2, name: "anniversaries", image: "/anniversary-romantic-gifts.jpg" },
    { id: 3, name: "weddings", image: "/wedding-luxe-gifts.jpg" },
    { id: 4, name: "corporate", image: "/corporate-business-gifts.jpg" },
    { id: 5, name: "celebrations", image: "/celebration-party-gifts.jpg" },
  ]

  return (
    <section className="py-20 px-4 md:px-6 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-16 text-black dark:text-white">
          {getTranslation(language, "occasions.title")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {occasions.map((occasion) => (
            <div key={occasion.id} className="group relative overflow-hidden rounded-xl cursor-pointer h-72">
              {/* CHANGE: Add lazy loading and responsive sizes for occasion images */}
              <img
                src={occasion.image || "/placeholder.svg"}
                alt={getTranslation(language, `occasions.${occasion.name}`)}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
                decoding="async"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 20vw"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white font-serif text-2xl font-bold text-center">
                  {getTranslation(language, `occasions.${occasion.name}`)}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
