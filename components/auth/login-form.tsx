"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, ArrowRight, ArrowLeft, Mail, Phone } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRecaptcha } from "@/hooks/useRecaptcha";
import Link from "next/link";
import Image from "next/image";

interface LoginFormProps {
  redirectTo?: string;
}

export function LoginForm({ redirectTo = "/" }: LoginFormProps) {
  const { i18n, t } = useTranslation();
  const isRtl = i18n.language === "ar";
  const router = useRouter();
  const { login, loginWithPhone } = useAuth();

  // Initialize reCAPTCHA
  const { executeRecaptcha, isLoaded: isRecaptchaLoaded } = useRecaptcha({
    siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "",
    action: "login",
  });

  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (loginMethod === "email") {
        // Execute reCAPTCHA
        if (!isRecaptchaLoaded) {
          setError(
            t("auth.errors.recaptchaNotLoaded") ||
              "reCAPTCHA is not ready. Please wait a moment and try again."
          );
          setIsLoading(false);
          return;
        }

        const captchaToken = await executeRecaptcha();
        await login(
          {
            email: formData.email,
            password: formData.password,
            captchaToken,
          },
          redirectTo
        );
      } else {
        await loginWithPhone(formData.phoneNumber);
        router.push(
          `/auth/phone-login-verification?phoneNumber=${encodeURIComponent(
            formData.phoneNumber
          )}`
        );
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || t("auth.errors.loginFailed"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      setError("API URL is not configured");
      return;
    }
    window.location.href = `${apiUrl}/api/auth/google`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(null);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Brand Section with Image */}
      <div className="relative hidden lg:flex lg:w-2/5 flex-col justify-center p-12 text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://res.cloudinary.com/djpl34pm6/image/upload/v1763323246/occasions/yhhcp4jtjce8twzkwxgr.png"
            alt="Luxury Gifts"
            fill
            className="object-cover"
            priority
            quality={90}
          />
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-md"
        >
          <h1
            className="mb-6 text-5xl font-bold tracking-[0.15em]"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            ROSISTA
          </h1>
          <p className="mb-8 text-lg leading-relaxed text-neutral-200">
            {isRtl
              ? "انضم إلى عالم الهدايا الفاخرة. ابدأ رحلتك معنا اليوم واكتشف مجموعاتنا الحصرية من الهدايا الراقية."
              : "Join the world of luxury gifts. Start your journey with us today and discover our exclusive collections of elegant gifts."}
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-1 w-12 bg-white" />
              <span className="text-sm text-neutral-200">
                {isRtl ? "هدايا فاخرة" : "Luxury Gifts"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-1 w-12 bg-white" />
              <span className="text-sm text-neutral-200">
                {isRtl ? "تجربة استثنائية" : "Exceptional Experience"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-1 w-12 bg-white" />
              <span className="text-sm text-neutral-200">
                {isRtl ? "خدمة متميزة" : "Premium Service"}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Side - Form Section */}
      <div className="flex w-full items-center justify-center bg-white p-6 dark:bg-neutral-950 lg:w-3/5">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="mb-8 text-center lg:hidden">
            <h1
              className="mb-2 text-4xl font-bold tracking-[0.15em] text-neutral-900 dark:text-white"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              ROSISTA
            </h1>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h2 className="mb-2 text-3xl font-bold text-neutral-900 dark:text-white">
              {t("auth.login.title")}
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {t("auth.login.subtitle")}
            </p>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 overflow-hidden rounded-lg border-l-4 border-red-500 bg-red-50 p-4 text-sm text-red-800 dark:border-red-400 dark:bg-red-900/20 dark:text-red-300"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Login Method Toggle */}
          <div className="mb-6">
            <div className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg p-1">
              <button
                type="button"
                onClick={() => {
                  setLoginMethod("email");
                  setError(null);
                }}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-md transition-all ${
                  loginMethod === "email"
                    ? "bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
                }`}
              >
                <Mail size={18} />
                <span className="font-medium">
                  {t("auth.login.methodEmail")}
                </span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setLoginMethod("phone");
                  setError(null);
                }}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-md transition-all ${
                  loginMethod === "phone"
                    ? "bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
                }`}
              >
                <Phone size={18} />
                <span className="font-medium">
                  {t("auth.login.methodPhone")}
                </span>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="wait">
              {loginMethod === "email" ? (
                <motion.div
                  key="email"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  {/* Email Field */}
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                      {t("auth.login.email")}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      dir="ltr"
                      className={`w-full border-b-2 border-neutral-300 bg-transparent px-0 py-2.5 text-left text-neutral-900 transition-colors placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none dark:border-neutral-700 dark:text-white dark:placeholder:text-neutral-500 dark:focus:border-primary-400 ${
                        isRtl
                          ? "placeholder:text-right"
                          : "placeholder:text-left"
                      }`}
                      placeholder={t("auth.login.emailPlaceholder")}
                      required
                    />
                  </div>

                  {/* Password Field */}
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                      {t("auth.login.password")}
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        dir="ltr"
                        className={`w-full border-b-2 border-neutral-300 bg-transparent px-0 py-2.5 pr-10 text-left text-neutral-900 transition-colors placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none dark:border-neutral-700 dark:text-white dark:placeholder:text-neutral-500 dark:focus:border-primary-400 rtl:pl-10 rtl:pr-0 ${
                          isRtl
                            ? "placeholder:text-right"
                            : "placeholder:text-left"
                        }`}
                        placeholder={t("auth.login.passwordPlaceholder")}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-0 top-1/2 -translate-y-1/2 text-neutral-400 transition-colors hover:text-neutral-600 dark:hover:text-neutral-300 rtl:left-0 rtl:right-auto"
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Forgot Password Link */}
                  <div className="text-right rtl:text-left">
                    <Link
                      href="/auth/forgot-password"
                      className="text-sm font-medium text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                    >
                      {t("auth.login.forgotPassword")}
                    </Link>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="phone"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Phone Number Field */}
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                      {t("auth.login.methodPhone")}
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      dir="ltr"
                      className="w-full border-b-2 border-neutral-300 bg-transparent px-0 py-2.5 text-left text-neutral-900 transition-colors placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none dark:border-neutral-700 dark:text-white dark:placeholder:text-neutral-500 dark:focus:border-primary-400"
                      placeholder={t("auth.login.phonePlaceholder")}
                      required
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
              className="mt-8 w-full cursor-pointer border-2 border-neutral-900 bg-neutral-900 px-6 py-3.5 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50 dark:border-white dark:bg-white dark:text-neutral-900"
            >
              {isLoading ? (
                <div className="mx-auto h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white dark:border-neutral-900/30 dark:border-t-neutral-900" />
              ) : (
                <span className="flex items-center justify-center gap-2">
                  {loginMethod === "email"
                    ? t("auth.login.submit")
                    : t("auth.login.sendCode")}
                  <motion.span
                    className="inline-block"
                    animate={{ x: isButtonHovered ? (isRtl ? -4 : 4) : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isRtl ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
                  </motion.span>
                </span>
              )}
            </button>
          </form>

          {/* Google Login Button - Only show for Email method */}
          {loginMethod === "email" && (
            <div className="mt-6">
              <div className="relative mb-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-neutral-300 dark:border-neutral-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-neutral-500 dark:bg-neutral-950 dark:text-neutral-400">
                    {t("auth.login.continueWith")}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-6 py-3.5 font-medium text-neutral-700 dark:text-neutral-300 rounded-lg transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                <span>{t("auth.login.googleButton")}</span>
              </button>
            </div>
          )}

          {/* Signup Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {t("auth.login.noAccount")}{" "}
              <Link
                href="/auth/signup"
                className="font-semibold text-neutral-900 underline underline-offset-4 transition-colors hover:text-neutral-700 dark:text-white dark:hover:text-neutral-300"
              >
                {t("auth.login.signup")}
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
