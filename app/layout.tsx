import type React from "react";
import type { Metadata } from "next";
import { Suspense } from "react";
import { cookies, headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { I18nProvider } from "@/lib/i18n/I18nProvider";
import { AuthProvider } from "@/context/AuthContext";
import { UserProvider } from "@/context/UserContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { CartProvider } from "@/context/CartContext";
import { Header } from "@/components/header";
import { FooterWrapper } from "@/components/footer-wrapper";
import { DebugProvider } from "@/context/DebugContext";
import { DebugPanel } from "@/components/debug/debug-panel";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ROSISTA - Luxury Gifts",
  description: "Luxury gifts for every moment",
  generator: "v0.app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const headersList = await headers();

  // Server-side language detection
  let lang = cookieStore.get("i18next")?.value;

  if (!lang) {
    // Fallback to Accept-Language header if cookie is missing
    const acceptLanguage = headersList.get("accept-language");
    if (acceptLanguage?.includes("ar")) {
      lang = "ar";
    } else if (acceptLanguage?.includes("en")) {
      lang = "en";
    } else {
      lang = "ar"; // Default fallback
    }
  }

  // Ensure valid language
  if (lang !== "ar" && lang !== "en") {
    lang = "ar";
  }

  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <html lang={lang} dir={dir} suppressHydrationWarning>
      <head>
        {/* Preconnect للخطوط - تحسين الأداء */}

        {/* Preconnect للخطوط - تحسين الأداء */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* تحميل الخطوط العربية */}
        <link
          href="https://fonts.googleapis.com/css2?family=Lalezar&family=Tajawal:wght@300;400;500;700;800&display=swap"
          rel="stylesheet"
        />

        {/* تحميل الخطوط الإنجليزية */}
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Cinzel:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* تحميل خط Amiri */}
        <link
          href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap"
          rel="stylesheet"
        />

        <link rel="preconnect" href="https://res.cloudinary.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <I18nProvider locale={lang}>
          <ThemeProvider>
            <DebugProvider>
              <AuthProvider>
                <UserProvider>
                  <FavoritesProvider>
                    <CartProvider>
                      <Header />
                      <main className="min-h-screen">{children}</main>
                      <Suspense fallback={null}>
                        <FooterWrapper />
                      </Suspense>
                      <DebugPanel />
                      <Toaster />
                    </CartProvider>
                  </FavoritesProvider>
                </UserProvider>
              </AuthProvider>
            </DebugProvider>
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
