"use client"
import { useTheme } from "@/lib/theme-context"
import { getTranslation } from "@/lib/i18n"

export function BestSellers() {
  const { language } = useTheme()

  const products = [
    { id: 1, name: "Premium Gift 1", price: "$299.00", image: "/placeholder.svg?key=unk3v" },
    { id: 2, name: "Premium Gift 2", price: "$399.00", image: "/placeholder.svg?key=ovyiq" },
    { id: 3, name: "Premium Gift 3", price: "$499.00", image: "/placeholder.svg?key=w2hzq" },
    { id: 4, name: "Premium Gift 4", price: "$599.00", image: "/placeholder.svg?key=4w7po" },
  ]

  return (
    <section className="py-20 px-4 md:px-6 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-black dark:text-white">
            {getTranslation(language, "bestSellers.title")}
          </h2>
          <a
            href="#"
            className="text-black hover:text-black/70 dark:text-white dark:hover:text-white/70 font-semibold transition-colors"
          >
            {getTranslation(language, "bestSellers.viewAll")} →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group rounded-lg overflow-hidden bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 hover:shadow-lg transition-shadow duration-300 animate-scale-in"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div className="relative overflow-hidden h-64 bg-black/5 dark:bg-white/5">
                {/* CHANGE: Add lazy loading, responsive sizes, and async decoding */}
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-4">
                <h3 className="font-serif font-bold text-black dark:text-white mb-2">{product.name}</h3>
                <p className="text-lg font-semibold text-black dark:text-white">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
