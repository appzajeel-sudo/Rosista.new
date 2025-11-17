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
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useDarkMode } from "@/hooks/use-dark-mode";
import { useAuth } from "@/context/AuthContext";

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
  const { theme, toggleTheme, mounted } = useDarkMode();
  const { user, isAuthenticated, logout } = useAuth();

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

  // Transform calculation on mount + resize (optimized - no repeated calls during scroll)
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

    // Compute on mount
    computeTransform();

    // Re-compute on resize (double RAF to ensure stable layout after resize)
    const onResize = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(computeTransform);
      });
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
        className={`fixed top-0 z-50 w-full transition-all duration-1600 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isScrolled ? "bg-background shadow-sm" : "bg-transparent"
        }`}
        style={{
          backgroundColor: isScrolled
            ? "rgb(var(--background))"
            : "transparent",
          transition: "background-color 1600ms cubic-bezier(0.22,1,0.36,1)",
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
                      {link.label}
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
                        {link.label}
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
                    onClick={toggleTheme}
                    aria-label={
                      theme === "dark"
                        ? "Switch to light mode"
                        : "Switch to dark mode"
                    }
                    className={`transition-opacity hover:opacity-60 ${textColor}`}
                  >
                    {theme === "dark" ? (
                      <Sun className="h-[18px] w-[18px] stroke-[1.5]" />
                    ) : (
                      <Moon className="h-[18px] w-[18px] stroke-[1.5]" />
                    )}
                  </button>
                )}

                {/* Language */}
                <LanguageSwitcher
                  className={textColor}
                  hoverColor={hoverColor}
                />

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
                    className="relative hidden sm:block"
                    ref={userMenuRef}
                  >
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className={`transition-opacity hover:opacity-60 ${textColor}`}
                      aria-label="Account"
                    >
                      <User className="h-[18px] w-[18px] stroke-[1.5]" />
                    </button>
                    <AnimatePresence>
                      {showUserMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.15 }}
                          className={`absolute mt-1 w-48 bg-white dark:bg-neutral-900 shadow-lg z-[60] border border-neutral-200 dark:border-neutral-800 rounded-md overflow-hidden ${
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
                    aria-label="Account"
                    className={`hidden transition-opacity hover:opacity-60 sm:block ${textColor}`}
                  >
                    <User className="h-[18px] w-[18px] stroke-[1.5]" />
                  </Link>
                )}

                {/* Cart */}
                <Link
                  href="#"
                  aria-label="Shopping bag"
                  className={`relative transition-opacity hover:opacity-60 ${textColor}`}
                >
                  <ShoppingBag className="h-[18px] w-[18px] stroke-[1.5]" />
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
          className="fixed left-1/2 top-[6vh] z-60 -translate-x-1/2 select-none font-bold leading-none tracking-widest font-sans-en text-[20vw] sm:text-[12vw]"
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
          }}
        >
          ROSISTA
        </div>
      )}

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background lg:hidden"
          >
            <div className="flex h-full flex-col px-8 pt-28">
              <nav className="flex-1">
                <ul className="space-y-8">
                  {navLinks.map((link, index) => (
                    <motion.li
                      key={`nav-mobile-${link.label}-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block text-2xl font-bold tracking-wider text-foreground ${
                          isRtl ? "font-sans-ar" : "font-sans-en"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
                toggleTheme();
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
