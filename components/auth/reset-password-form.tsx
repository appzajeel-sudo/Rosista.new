"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Shield,
  CheckCircle,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import Image from "next/image";

export function ResetPasswordForm() {
  const { i18n, t } = useTranslation();
  const isRtl = i18n.language === "ar";
  const router = useRouter();
  const searchParams = useSearchParams();
  const { resetPassword } = useAuth();

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      router.push("/auth/login");
    }
  }, [searchParams, router]);

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

    if (formData.newPassword !== formData.confirmPassword) {
      setError(t("auth.resetPassword.passwordMismatch"));
      return;
    }

    if (passwordStrength < 50) {
      setError(t("auth.errors.resetPasswordFailed"));
      return;
    }

    if (!token) {
      setError(t("auth.errors.resetPasswordFailed"));
      return;
    }

    setIsLoading(true);

    try {
      await resetPassword(token, formData.newPassword);
      setIsSuccess(true);
    } catch (err: any) {
      console.error("Reset password error:", err);
      setError(err.message || t("auth.errors.resetPasswordFailed"));
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

    if (name === "newPassword") {
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
    if (passwordStrength < 25)
      return t("auth.resetPassword.passwordStrength.weak");
    if (passwordStrength < 50)
      return t("auth.resetPassword.passwordStrength.fair");
    if (passwordStrength < 75)
      return t("auth.resetPassword.passwordStrength.good");
    return t("auth.resetPassword.passwordStrength.strong");
  };

  // Success State
  if (isSuccess) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50 p-4 dark:bg-neutral-950">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md text-center"
        >
          <div className="p-8 sm:p-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mb-8"
            >
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
            </motion.div>

            <h1 className="mb-4 text-3xl font-bold text-neutral-900 dark:text-white">
              {t("auth.resetPassword.successTitle")}
            </h1>
            <p className="mb-6 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              {t("auth.resetPassword.successMessage")}
            </p>

            <Link
              href="/auth/login"
              className="inline-flex items-center gap-2 font-semibold text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              {isRtl ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
              <span>{t("auth.resetPassword.backToLogin")}</span>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // Form State
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
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mb-6"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 dark:bg-white">
                <Shield className="h-6 w-6 text-white dark:text-neutral-900" />
              </div>
            </motion.div>
            <h2 className="mb-2 text-3xl font-bold text-neutral-900 dark:text-white">
              {t("auth.resetPassword.title")}
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {t("auth.resetPassword.subtitle")}
            </p>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 overflow-hidden rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* New Password Field */}
            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {t("auth.resetPassword.newPassword")}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  dir="ltr"
                  className={`w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-left text-neutral-900 transition-colors placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder:text-neutral-500 dark:focus:border-primary-400 ${
                    isRtl ? "placeholder:text-right" : "placeholder:text-left"
                  }`}
                  placeholder={t("auth.signup.passwordPlaceholder")}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 transition-colors hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-300"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {formData.newPassword && (
                <div className="mt-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 rounded-full bg-neutral-200 dark:bg-neutral-700 h-1">
                      <div
                        className={`h-1 rounded-full transition-all duration-300 ${getStrengthColor()}`}
                        style={{ width: `${passwordStrength}%` }}
                      />
                    </div>
                    <span className="text-xs text-neutral-600 dark:text-neutral-400">
                      {getStrengthText()}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {t("auth.resetPassword.confirmPassword")}
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  dir="ltr"
                  className={`w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-left text-neutral-900 transition-colors placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder:text-neutral-500 dark:focus:border-primary-400 ${
                    isRtl ? "placeholder:text-right" : "placeholder:text-left"
                  }`}
                  placeholder={t("auth.signup.confirmPasswordPlaceholder")}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 transition-colors hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-300"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
              {formData.confirmPassword &&
                formData.newPassword !== formData.confirmPassword && (
                  <p className="mt-1 text-xs text-red-500">
                    {t("auth.resetPassword.passwordMismatch")}
                  </p>
                )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={
                isLoading ||
                formData.newPassword !== formData.confirmPassword ||
                passwordStrength < 50
              }
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
              className="w-full cursor-pointer rounded-lg bg-neutral-900 px-4 py-3 font-semibold text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
            >
              {isLoading ? (
                <div className="mx-auto h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white dark:border-neutral-900/30 dark:border-t-neutral-900" />
              ) : (
                <span className="flex items-center justify-center gap-2">
                  {t("auth.resetPassword.submit")}
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

          {/* Footer Link */}
          <div className="mt-6 text-center">
            <Link
              href="/auth/login"
              className="text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              {t("auth.resetPassword.backToLogin")}
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
