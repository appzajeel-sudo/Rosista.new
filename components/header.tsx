"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Search,
  ShoppingBag,
  User,
  UserCircle,
  CircleUser,
  Menu,
  X,
  Sun,
  Moon,
  Home,
  Package,
  Users,
  Settings,
  FileText,
  LogOut,
  Heart,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useAuth } from "@/context/AuthContext";
import { useFavorites } from "@/context/FavoritesContext";
import { useCart } from "@/context/CartContext";
import { Sheet, SheetContent } from "@/components/ui/sheet";

const RiyalSymbol = ({ className = "w-3 h-3" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1124.14 1256.39"
    className={className}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z" />
    <path d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z" />
  </svg>
);

export function Header() {
  // Always start with false to match SSR (prevents hydration mismatch)
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const isHomePage = pathname === "/";
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { favoritesCount } = useFavorites();
  const { cartCount, totalAmount } = useCart();

  // Transform state for scroll-linked logo (replaces ref + repeated compute)
  const [transformValues, setTransformValues] = useState<{
    translateX: number;
    translateY: number;
    scale: number;
  } | null>(null);

  // Apply background immediately after hydration (before paint) to prevent FOUC
  useLayoutEffect(() => {
    const scrolled = window.scrollY > 0;

    if (scrolled) {
      // Apply style directly to DOM before paint (prevents flash)
      const header = headerRef.current;
      if (header) {
        header.style.backgroundColor = "rgb(var(--background))";
        header.style.transition =
          "background-color 1600ms cubic-bezier(0.22,1,0.36,1)";
      }
      // Update state after DOM update
      requestAnimationFrame(() => {
        setIsScrolled(true);
      });
    }
  }, []);

  // Set mounted state after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Disable body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup: restore scroll when component unmounts
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Keyboard shortcut for Command Palette (⌘K or Ctrl+K)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsCommandOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Close user menu when clicking outside
  const userMenuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { href: "/occasions", label: t("nav.occasions") },
    { href: "#", label: t("nav.shop") },
    { href: "#", label: t("nav.about") },
    { href: "#", label: t("nav.contact") },
  ];

  // On homepage, use white text when not scrolled
  // In dark mode, always use appropriate contrast
  const textColor =
    isHomePage && !isScrolled ? "text-white" : "text-foreground";
  const hoverColor =
    isHomePage && !isScrolled
      ? "hover:text-white/70"
      : "hover:text-foreground/70";

  // Refs for scroll-linked logo
  const heroRef = useRef<HTMLDivElement | null>(null);
  const anchorRef = useRef<HTMLHeadingElement | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);

  // Transform calculation on mount + window resize (width change)
  // لا إعادة حساب عند viewport height changes (browser chrome) أثناء scroll
  useEffect(() => {
    if (!isHomePage) return;
    const hero = heroRef.current;
    const anchor = anchorRef.current;
    if (!hero || !anchor) return;

    const computeTransform = () => {
      // Save current state
      const prevTransform = hero.style.transform;
      const prevTransition = hero.style.transition;

      // Temporarily disable transition for measurement
      hero.style.transition = "none";

      // Measure hero in its base state (not scrolled)
      hero.style.transform = "translate3d(0, 0, 0) scale(1)";
      const hr = hero.getBoundingClientRect();
      const ar = anchor.getBoundingClientRect();

      // Restore previous state
      hero.style.transform = prevTransform;
      hero.style.transition = prevTransition;

      // Calculate transform values
      const dx = ar.left + ar.width / 2 - (hr.left + hr.width / 2);
      const dy = ar.top + ar.height / 2 - (hr.top + hr.height / 2);
      const scale = (ar.width || 1) / (hr.width || 1);

      setTransformValues({
        translateX: dx,
        translateY: dy,
        scale,
      });
    };

    // Compute on mount - انتظر حتى يستقر layout
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(computeTransform);
      });
    });

    // إعادة الحساب فقط عند تغيير عرض المتصفح (window resize)
    // لا إعادة حساب عند viewport height changes (browser chrome) أثناء scroll
    let lastWindowWidth = window.innerWidth;
    const onResize = () => {
      const currentWindowWidth = window.innerWidth;
      // فقط عند تغيير العرض، وليس الارتفاع
      if (currentWindowWidth !== lastWindowWidth) {
        lastWindowWidth = currentWindowWidth;
        requestAnimationFrame(() => {
          requestAnimationFrame(computeTransform);
        });
      }
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [isHomePage]);

  return (
    <>
      {/* Header */}
      <header
        ref={headerRef}
        suppressHydrationWarning
        className={`fixed top-0 z-[100] w-full transition-all duration-1600 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isScrolled ? "bg-background shadow-sm" : "bg-transparent"
        }`}
        style={{
          backgroundColor: isScrolled
            ? "rgb(var(--background))"
            : "transparent",
          transition: "background-color 1600ms cubic-bezier(0.22,1,0.36,1)",
          paddingRight: "var(--removed-body-scroll-bar-size, 0px)",
        }}
      >
        <div className="mx-auto max-w-[1400px] px-0 lg:px-8">
          <div className="relative flex h-18 items-center justify-between">
            {/* Left - Navigation (Desktop) */}
            <nav className="hidden flex-1 lg:flex">
              <ul className="flex items-center gap-10">
                {navLinks.slice(0, 2).map((link, index) => (
                  <li key={`nav-left-${link.label}-${index}`}>
                    <Link
                      href={link.href}
                      className={`text-[13px] font-bold uppercase tracking-[0.12em] transition-colors ${
                        pathname === link.href
                          ? textColor
                          : `${textColor} ${hoverColor}`
                      } ${isRtl ? "font-sans-ar" : "font-sans-en"}`}
                    >
                      <span suppressHydrationWarning>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Center - Logo (Desktop) / Left - Logo (Mobile) */}
            <Link
              href="/"
              className="absolute left-0 top-1/2 -translate-y-1/2 shrink-0 pl-2 lg:static lg:left-auto lg:translate-x-0 lg:translate-y-0 lg:pl-0"
            >
              <h1
                className={`text-[36px] font-bold tracking-[0.25em] transition-colors ${textColor} font-sans-en`}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 700,
                  visibility: isHomePage ? "hidden" : undefined,
                }}
                ref={anchorRef}
                aria-hidden={isHomePage ? "true" : "false"}
              >
                ROSISTA
              </h1>
            </Link>

            {/* Right - Navigation & Icons */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-6 pr-2 lg:static lg:right-auto lg:top-auto lg:translate-y-0 lg:flex-1 lg:justify-end lg:gap-10 lg:pr-0">
              {/* Desktop Navigation (Right) */}
              <nav className="hidden lg:flex">
                <ul className="flex items-center gap-10">
                  {navLinks.slice(2).map((link, index) => (
                    <li key={`nav-right-${link.label}-${index}`}>
                      <Link
                        href={link.href}
                        className={`text-[13px] font-bold uppercase tracking-[0.12em] transition-colors ${
                          pathname === link.href
                            ? textColor
                            : `${textColor} ${hoverColor}`
                        } ${isRtl ? "font-sans-ar" : "font-sans-en"}`}
                      >
                        <span suppressHydrationWarning>{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Icons */}
              <div
                className={`flex items-center gap-6 ${
                  isRtl ? "flex-row-reverse lg:flex-row" : ""
                }`}
              >
                {/* Dark Mode Toggle */}
                {mounted && (
                  <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    aria-label={
                      theme === "dark"
                        ? "Switch to light mode"
                        : "Switch to dark mode"
                    }
                    className={`hidden lg:block transition-opacity hover:opacity-60 ${textColor}`}
                  >
                    {theme === "dark" ? (
                      <Sun className="h-[18px] w-[18px] stroke-[1.5]" />
                    ) : (
                      <Moon className="h-[18px] w-[18px] stroke-[1.5]" />
                    )}
                  </button>
                )}

                {/* Language */}
                <div className="hidden lg:block">
                  <LanguageSwitcher
                    className={textColor}
                    hoverColor={hoverColor}
                  />
                </div>

                {/* Search */}
                <button
                  onClick={() => setIsCommandOpen(true)}
                  aria-label="Search"
                  className={`transition-opacity hover:opacity-60 ${textColor}`}
                >
                  <Search className="h-[18px] w-[18px] stroke-[1.5]" />
                </button>

                {/* Account */}
                {isAuthenticated ? (
                  <div
                    className="relative hidden sm:flex sm:items-center"
                    ref={userMenuRef}
                  >
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className={`flex items-center transition-opacity hover:opacity-60 ${textColor}`}
                      aria-label="Account"
                    >
                      <CircleUser className="h-[18px] w-[18px] stroke-[1.5]" />
                    </button>
                    <AnimatePresence>
                      {showUserMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.15 }}
                          className={`absolute top-full mt-2 w-48 bg-white dark:bg-neutral-900 shadow-lg z-[9999] border border-neutral-200 dark:border-neutral-800 rounded-md overflow-hidden ${
                            isRtl ? "left-0" : "right-0"
                          }`}
                        >
                          <Link
                            href="/profile"
                            className="flex items-center px-3 py-2 text-sm text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <User
                              size={16}
                              className={isRtl ? "ml-3" : "mr-3"}
                            />
                            {t("header.profile", "الملف الشخصي")}
                          </Link>
                          <Link
                            href="/orders"
                            className="flex items-center px-3 py-2 text-sm text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <Package
                              size={16}
                              className={isRtl ? "ml-3" : "mr-3"}
                            />
                            {t("header.orders", "الطلبات")}
                          </Link>
                          <hr className="my-1 border-neutral-200 dark:border-neutral-800" />
                          <button
                            onClick={async () => {
                              await logout();
                              setShowUserMenu(false);
                            }}
                            className="flex items-center w-full text-left px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                          >
                            <LogOut
                              size={16}
                              className={isRtl ? "ml-3" : "mr-3"}
                            />
                            {t("header.logout", "تسجيل الخروج")}
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href="/auth/login"
                    aria-label="Login"
                    className={`hidden transition-opacity hover:opacity-60 sm:block ${textColor}`}
                  >
                    <UserCircle className="h-[18px] w-[18px] stroke-[1.5]" />
                  </Link>
                )}

                {/* Favorites */}
                <Link
                  href="/favorites"
                  aria-label={isRtl ? "المفضلة" : "Favorites"}
                  className={`relative transition-opacity hover:opacity-60 ${textColor}`}
                >
                  <Heart className="h-[18px] w-[18px] stroke-[1.5]" />
                  {favoritesCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                      {favoritesCount > 9 ? "9+" : favoritesCount}
                    </span>
                  )}
                </Link>

                {/* Cart */}
                <Link
                  href="/cart"
                  aria-label="Shopping bag"
                  className={`relative flex items-center gap-2 transition-opacity hover:opacity-60 ${textColor}`}
                >
                  <div className="relative">
                    <ShoppingBag className="h-[18px] w-[18px] stroke-[1.5]" />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                        {cartCount > 9 ? "9+" : cartCount}
                      </span>
                    )}
                  </div>
                  {totalAmount > 0 && (
                    <div className="hidden flex-col items-start text-xs font-bold leading-none sm:flex">
                      <span className="flex items-center gap-1">
                        {totalAmount.toLocaleString()}
                        <RiyalSymbol className="h-3 w-3" />
                      </span>
                    </div>
                  )}
                </Link>

                {/* Mobile Menu */}
                <button
                  onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                  aria-label="Menu"
                  className={`lg:hidden ${textColor}`}
                >
                  {isMobileMenuOpen ? (
                    <X className="h-5 w-5 stroke-[1.5]" />
                  ) : (
                    <Menu className="h-5 w-5 stroke-[1.5]" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Scroll-linked big logo on homepage */}
      {isHomePage && (
        <div
          ref={heroRef}
          className={`fixed left-1/2 top-[6vh] -translate-x-1/2 select-none font-bold leading-none tracking-widest font-sans-en text-[20vw] sm:text-[12vw] ${
            isScrolled ? "z-[101]" : "z-60"
          }`}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 700,
            willChange: "transform, opacity, color",
            transformOrigin: "center center",
            color: isScrolled ? "rgb(var(--foreground))" : "rgb(var(--white))",
            pointerEvents: isScrolled ? "auto" : "none",
            transform:
              isScrolled && transformValues
                ? `translate3d(${transformValues.translateX}px, ${transformValues.translateY}px, 0) scale(${transformValues.scale})`
                : "translate3d(0, 0, 0) scale(1)",
            transition:
              "transform 1600ms cubic-bezier(0.22,1,0.36,1), color 1600ms cubic-bezier(0.22,1,0.36,1)",
            left: "calc(50% - var(--removed-body-scroll-bar-size, 0px) / 2)",
          }}
        >
          ROSISTA
        </div>
      )}

      {/* Mobile Menu */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent
          side={isRtl ? "left" : "right"}
          className="w-3/4 sm:max-w-sm p-0 border-0 bg-gradient-to-br from-background via-background to-neutral-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 shadow-2xl z-[101]"
          style={{
            background:
              "linear-gradient(135deg, rgb(var(--background)) 0%, rgb(var(--neutral-50)) 50%, rgb(var(--background)) 100%)",
          }}
        >
          <div className="flex h-full flex-col relative overflow-hidden">
            {/* Decorative gradient overlay */}
            <div
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at top right, rgb(var(--primary-500) / 0.1) 0%, transparent 50%), radial-gradient(circle at bottom left, rgb(var(--secondary-500) / 0.1) 0%, transparent 50%)",
              }}
            />

            {/* Content */}
            <div className="relative flex-1 flex flex-col px-8 pt-16 pb-8">
              {/* Header Section */}
              <div className="mb-12 pb-8 border-b border-neutral-200 dark:border-neutral-700">
                <h2
                  className={`text-3xl font-bold tracking-widest text-foreground ${
                    isRtl ? "font-sans-ar" : "font-sans-en"
                  }`}
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 700,
                  }}
                >
                  {isRtl ? "القائمة" : "MENU"}
                </h2>
                <div className="mt-2 h-0.5 w-16 bg-gradient-to-r from-primary-500 to-secondary-500" />
              </div>

              {/* Navigation Links */}
              <nav className="flex-1">
                <ul className="space-y-2">
                  <AnimatePresence>
                    {navLinks.map((link, index) => (
                      <motion.li
                        key={`nav-mobile-${link.label}-${index}`}
                        initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: isRtl ? 20 : -20 }}
                        transition={{ delay: index * 0.08, duration: 0.3 }}
                        className="relative group"
                      >
                        <Link
                          href={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`relative block px-4 py-4 text-xl font-bold tracking-wider text-foreground transition-all duration-300 rounded-lg overflow-hidden ${
                            isRtl ? "font-sans-ar" : "font-sans-en"
                          } ${
                            pathname === link.href
                              ? "text-primary-600 dark:text-primary-400"
                              : "hover:text-primary-600 dark:hover:text-primary-400"
                          }`}
                        >
                          {/* Hover background effect */}
                          <span
                            className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{
                              background:
                                pathname === link.href
                                  ? "linear-gradient(to right, rgb(var(--primary-500) / 0.15), rgb(var(--secondary-500) / 0.15))"
                                  : "linear-gradient(to right, rgb(var(--primary-500) / 0.08), rgb(var(--secondary-500) / 0.08))",
                            }}
                          />

                          {/* Active indicator */}
                          {pathname === link.href && (
                            <motion.span
                              layoutId="activeIndicator"
                              className={`absolute top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-primary-500 to-secondary-500 ${
                                isRtl
                                  ? "right-0 rounded-l-full"
                                  : "left-0 rounded-r-full"
                              }`}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                            />
                          )}

                          {/* Text content */}
                          <span
                            className="relative z-10"
                            suppressHydrationWarning
                          >
                            {link.label}
                          </span>
                        </Link>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              </nav>

              {/* Settings Section */}
              <div className="mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center gap-3">
                  {/* Theme Toggle */}
                  {mounted && (
                    <button
                      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all duration-200 bg-neutral-100/50 dark:bg-neutral-800/50 hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 active:scale-95"
                      aria-label={
                        theme === "dark"
                          ? "Switch to light mode"
                          : "Switch to dark mode"
                      }
                    >
                      {theme === "dark" ? (
                        <Sun className="h-5 w-5 text-foreground" />
                      ) : (
                        <Moon className="h-5 w-5 text-foreground" />
                      )}
                    </button>
                  )}

                  {/* Language Toggle */}
                  <button
                    onClick={() => {
                      i18n.changeLanguage(i18n.language === "ar" ? "en" : "ar");
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all duration-200 bg-neutral-100/50 dark:bg-neutral-800/50 hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 active:scale-95"
                    aria-label="Toggle language"
                  >
                    <span className="text-base font-bold tracking-wider text-foreground">
                      {i18n.language === "ar" ? "EN" : "AR"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Command Palette */}
      <CommandDialog
        open={isCommandOpen}
        onOpenChange={setIsCommandOpen}
        title={t("command.title", "Command Palette")}
        description={t(
          "command.description",
          "Search for pages and actions..."
        )}
      >
        <CommandInput placeholder={t("command.placeholder", "اكتب للبحث...")} />
        <CommandList>
          <CommandEmpty>
            {t("command.noResults", "لا توجد نتائج.")}
          </CommandEmpty>
          <CommandGroup heading={t("command.pages", "الصفحات")}>
            <CommandItem
              onSelect={() => {
                setIsCommandOpen(false);
                router.push("/");
              }}
            >
              <Home className="mr-2 h-4 w-4" />
              <span>{t("nav.home", "الرئيسية")}</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                setIsCommandOpen(false);
                router.push("/occasions");
              }}
            >
              <Package className="mr-2 h-4 w-4" />
              <span>{t("nav.occasions", "المناسبات")}</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                setIsCommandOpen(false);
                router.push("/ui-showcase");
              }}
            >
              <FileText className="mr-2 h-4 w-4" />
              <span>{t("command.uiComponents", "UI Components")}</span>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading={t("command.actions", "الإجراءات")}>
            <CommandItem
              onSelect={() => {
                setIsCommandOpen(false);
                setTheme(theme === "dark" ? "light" : "dark");
              }}
            >
              {theme === "dark" ? (
                <Sun className="mr-2 h-4 w-4" />
              ) : (
                <Moon className="mr-2 h-4 w-4" />
              )}
              <span>
                {theme === "dark"
                  ? t("command.switchToLight", "التبديل إلى الوضع الفاتح")
                  : t("command.switchToDark", "التبديل إلى الوضع الداكن")}
              </span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                setIsCommandOpen(false);
                i18n.changeLanguage(i18n.language === "ar" ? "en" : "ar");
              }}
            >
              <Users className="mr-2 h-4 w-4" />
              <span>
                {i18n.language === "ar"
                  ? t("command.switchToEnglish", "التبديل إلى الإنجليزية")
                  : t("command.switchToArabic", "التبديل إلى العربية")}
              </span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
