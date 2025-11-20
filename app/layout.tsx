import type React from "react";
import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme-context";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // تحديث lang و dir بناءً على اللغة المحفوظة (i18next يستخدم 'i18nextLng')
                  var lang = localStorage.getItem('i18nextLng') || localStorage.getItem('language') || 'ar';
                  // تحويل en-US, en-GB, etc إلى en
                  if (lang.startsWith('en')) lang = 'en';
                  if (lang.startsWith('ar')) lang = 'ar';
                  document.documentElement.setAttribute('lang', lang);
                  document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
                  
                  // معالجة Theme
                  var theme = localStorage.getItem('theme');
                  var systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var shouldBeDark = theme === 'dark' || (!theme && systemPrefersDark);
                  if (shouldBeDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <link rel="preconnect" href="https://res.cloudinary.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <I18nProvider>
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
