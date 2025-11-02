"use client"
import { useTheme } from "@/lib/theme-context"
import { getTranslation } from "@/lib/i18n"

export function Categories() {
  const { language } = useTheme()

  const categories = [
    { id: 1, name: "jewelry", image: "/placeholder.svg?key=atc5i" },
    { id: 2, name: "fragrances", image: "/placeholder.svg?key=v1bs9" },
    { id: 3, name: "accessories", image: "/placeholder.svg?key=4lydm" },
    { id: 4, name: "lifestyle", image: "/placeholder.svg?key=ztm46" },
  ]

  return (
    <section className="py-20 px-4 md:px-6 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-16 text-black dark:text-white">
          {getTranslation(language, "categories.title")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="group relative overflow-hidden rounded-xl cursor-pointer h-80 animate-scale-in"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* CHANGE: Add lazy loading and responsive sizes for category images */}
              <img
                src={category.image || "/placeholder.svg"}
                alt={getTranslation(language, `categories.${category.name}`)}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
                decoding="async"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white font-serif text-2xl font-bold text-center">
                  {getTranslation(language, `categories.${category.name}`)}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
