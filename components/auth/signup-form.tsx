"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, ArrowRight, ArrowLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRecaptcha } from "@/hooks/useRecaptcha";
import Link from "next/link";
import Image from "next/image";

export function SignupForm() {
  const { i18n, t } = useTranslation();
  const isRtl = i18n.language === "ar";
  const router = useRouter();
  const { signup } = useAuth();

  // Initialize reCAPTCHA
  const { executeRecaptcha, isLoaded: isRecaptchaLoaded } = useRecaptcha({
    siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "",
    action: "signup",
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return strength;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError(t("auth.signup.passwordMismatch"));
      return;
    }

    setIsLoading(true);

    try {
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

      await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        captchaToken,
      });
    } catch (err: any) {
      console.error("Signup error:", err);
      setError(err.message || t("auth.errors.signupFailed"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "password") {
      setPasswordStrength(calculatePasswordStrength(value));
    }
    setError(null);
  };

  const getStrengthColor = () => {
    if (passwordStrength < 25) return "bg-red-500";
    if (passwordStrength < 50) return "bg-yellow-500";
    if (passwordStrength < 75) return "bg-blue-500";
    return "bg-green-500";
  };

  const getStrengthText = () => {
    if (passwordStrength < 25) return t("auth.signup.passwordStrength.weak");
    if (passwordStrength < 50) return t("auth.signup.passwordStrength.fair");
    if (passwordStrength < 75) return t("auth.signup.passwordStrength.good");
    return t("auth.signup.passwordStrength.strong");
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Brand Section with Image */}
      <div className="relative hidden lg:flex lg:w-2/5 flex-col justify-center p-12 text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://image.cdn2.seaart.me/2025-11-17/d4d4db5e878c7398mcb0-2/a0ab58959ea1d28d8358bc4d913f4489_high.webp"
            alt="Luxury Gifts"
            fill
            className="object-cover"
            priority
            quality={100}
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
          <div className="mb-8 lg:hidden">
            <h1
              className="text-3xl font-bold tracking-[0.15em] text-neutral-900 dark:text-white"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              ROSISTA
            </h1>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h2 className="mb-2 text-2xl font-bold text-neutral-900 dark:text-white">
              {t("auth.signup.title")}
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {t("auth.signup.subtitle")}
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

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                {t("auth.signup.name")}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full border-b-2 border-neutral-300 bg-transparent px-0 py-2.5 text-neutral-900 transition-colors placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none dark:border-neutral-700 dark:text-white dark:placeholder:text-neutral-500 dark:focus:border-primary-400 ${
                  isRtl ? "placeholder:text-right" : "placeholder:text-left"
                }`}
                placeholder={t("auth.signup.namePlaceholder")}
                style={{
                  direction: formData.name.match(/[\u0600-\u06FF]/)
                    ? "rtl"
                    : "ltr",
                  textAlign: formData.name.match(/[\u0600-\u06FF]/)
                    ? "right"
                    : "left",
                }}
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                {t("auth.signup.email")}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                dir="ltr"
                className={`w-full border-b-2 border-neutral-300 bg-transparent px-0 py-2.5 text-left text-neutral-900 transition-colors placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none dark:border-neutral-700 dark:text-white dark:placeholder:text-neutral-500 dark:focus:border-primary-400 ${
                  isRtl ? "placeholder:text-right" : "placeholder:text-left"
                }`}
                placeholder={t("auth.signup.emailPlaceholder")}
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                {t("auth.signup.password")}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  dir="ltr"
                  className={`w-full border-b-2 border-neutral-300 bg-transparent px-0 py-2.5 pr-10 text-left text-neutral-900 transition-colors placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none dark:border-neutral-700 dark:text-white dark:placeholder:text-neutral-500 dark:focus:border-primary-400 rtl:pl-10 rtl:pr-0 ${
                    isRtl ? "placeholder:text-right" : "placeholder:text-left"
                  }`}
                  placeholder={t("auth.signup.passwordPlaceholder")}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-neutral-400 transition-colors hover:text-neutral-600 dark:hover:text-neutral-300 rtl:left-0 rtl:right-auto"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {/* Password Strength Indicator */}
              <AnimatePresence>
                {formData.password && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 overflow-hidden"
                  >
                    <div className="mb-1 flex h-1 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${passwordStrength}%` }}
                        transition={{ duration: 0.3 }}
                        className={`h-full transition-colors duration-300 ${getStrengthColor()}`}
                      />
                    </div>
                    <p className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
                      {getStrengthText()}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                {t("auth.signup.confirmPassword")}
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  dir="ltr"
                  className={`w-full border-b-2 border-neutral-300 bg-transparent px-0 py-2.5 pr-10 text-left text-neutral-900 transition-colors placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none dark:border-neutral-700 dark:text-white dark:placeholder:text-neutral-500 dark:focus:border-primary-400 rtl:pl-10 rtl:pr-0 ${
                    isRtl ? "placeholder:text-right" : "placeholder:text-left"
                  }`}
                  placeholder={t("auth.signup.confirmPasswordPlaceholder")}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-neutral-400 transition-colors hover:text-neutral-600 dark:hover:text-neutral-300 rtl:left-0 rtl:right-auto"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
              {formData.confirmPassword &&
                formData.password !== formData.confirmPassword && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                    {t("auth.signup.passwordMismatch")}
                  </p>
                )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={
                isLoading || formData.password !== formData.confirmPassword
              }
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
              className="mt-8 w-full cursor-pointer border-2 border-neutral-900 bg-neutral-900 px-6 py-3.5 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50 dark:border-white dark:bg-white dark:text-neutral-900"
            >
              {isLoading ? (
                <div className="mx-auto h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white dark:border-neutral-900/30 dark:border-t-neutral-900" />
              ) : (
                <span className="flex items-center justify-center gap-2">
                  {t("auth.signup.submit")}
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

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {t("auth.signup.hasAccount")}{" "}
              <Link
                href="/auth/login"
                className="font-semibold text-neutral-900 underline underline-offset-4 transition-colors hover:text-neutral-700 dark:text-white dark:hover:text-neutral-300"
              >
                {t("auth.signup.login")}
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
