"use client"
import { useTheme } from "@/lib/theme-context"
import { getTranslation } from "@/lib/i18n"

export function OccasionsGallery() {
  const { language } = useTheme()

  const occasionDetails = [
    {
      title: getTranslation(language, "occasions.birthdays"),
      image: "/birthday-luxury-gifts.jpg",
      description: "Celebrate special birthdays with our exclusive collections",
    },
    {
      title: getTranslation(language, "occasions.anniversaries"),
      image: "/placeholder.svg?height=500&width=500",
      description: "Mark milestone moments with timeless luxury pieces",
    },
    {
      title: getTranslation(language, "occasions.weddings"),
      image: "/placeholder.svg?height=500&width=500",
      description: "Perfect gifts for the perfect day",
    },
    {
      title: getTranslation(language, "occasions.corporate"),
      image: "/placeholder.svg?height=500&width=500",
      description: "Professional and elegant corporate gifting solutions",
    },
    {
      title: getTranslation(language, "occasions.celebrations"),
      image: "/placeholder.svg?height=500&width=500",
      description: "Every celebration deserves something special",
    },
  ]

  return (
    <section className="py-20 px-4 md:px-6 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          {occasionDetails.slice(0, 2).map((occasion, index) => (
            <div key={index} className="group">
              <div className="relative overflow-hidden rounded-2xl mb-6 h-96">
                {/* CHANGE: Add lazy loading and responsive sizes */}
                <img
                  src={occasion.image || "/placeholder.svg"}
                  alt={occasion.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-2 text-black dark:text-white">{occasion.title}</h3>
              <p className="text-black/70 dark:text-white/70">{occasion.description}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {occasionDetails.slice(2).map((occasion, index) => (
            <div key={index} className="group">
              <div className="relative overflow-hidden rounded-xl mb-4 h-64">
                <img
                  src={occasion.image || "/placeholder.svg"}
                  alt={occasion.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <h3 className="text-lg font-serif font-bold mb-1 text-black dark:text-white">{occasion.title}</h3>
              <p className="text-sm text-black/70 dark:text-white/70">{occasion.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
