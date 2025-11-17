"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Key, CheckCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRecaptcha } from "@/hooks/useRecaptcha";
import Link from "next/link";

export function ForgotPasswordForm() {
  const { i18n, t } = useTranslation();
  const isRtl = i18n.language === "ar";
  const router = useRouter();
  const { requestPasswordReset } = useAuth();

  // Initialize reCAPTCHA
  const { executeRecaptcha, isLoaded: isRecaptchaLoaded } = useRecaptcha({
    siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "",
    action: "password_reset",
  });

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Execute reCAPTCHA
      if (!isRecaptchaLoaded) {
        setError(t("auth.errors.recaptchaNotLoaded") || "reCAPTCHA is not ready. Please wait a moment and try again.");
        setIsLoading(false);
        return;
      }

      const captchaToken = await executeRecaptcha();
      await requestPasswordReset({
        email,
        captchaToken,
      });
      setIsSuccess(true);
    } catch (err: any) {
      console.error("Password reset error:", err);
      setError(err.message || t("auth.errors.passwordResetFailed"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError(null);
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
                {t("auth.forgotPassword.successTitle")}
              </h1>
              <p className="mb-6 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                {t("auth.forgotPassword.successMessage")}
              </p>
              <p className="mb-8 font-medium text-primary-600 dark:text-primary-400">
                {email}
              </p>

              <Link
                href="/auth/login"
                className="inline-flex items-center gap-2 font-semibold text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
              >
                {isRtl ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
                <span>{t("auth.forgotPassword.backToLogin")}</span>
              </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // Form State
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 p-4 dark:bg-neutral-950">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <div className="p-8 sm:p-10">
            {/* Header */}
            <div className="mb-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mb-6"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 dark:bg-white">
                  <Key className="h-6 w-6 text-white dark:text-neutral-900" />
                </div>
              </motion.div>
              <h1 className="mb-2 text-3xl font-bold text-neutral-900 dark:text-white">
                {t("auth.forgotPassword.title")}
              </h1>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {t("auth.forgotPassword.subtitle")}
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
              {/* Email Field */}
              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  {t("auth.forgotPassword.email")}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={handleChange}
                  dir="ltr"
                  className={`w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-left text-neutral-900 transition-colors placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder:text-neutral-500 dark:focus:border-primary-400 ${
                    isRtl ? "placeholder:text-right" : "placeholder:text-left"
                  }`}
                  placeholder={t("auth.forgotPassword.emailPlaceholder")}
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                onMouseEnter={() => setIsButtonHovered(true)}
                onMouseLeave={() => setIsButtonHovered(false)}
                className="w-full cursor-pointer rounded-lg bg-neutral-900 px-4 py-3 font-semibold text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
              >
                {isLoading ? (
                  <div className="mx-auto h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white dark:border-neutral-900/30 dark:border-t-neutral-900" />
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    {t("auth.forgotPassword.submit")}
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
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {t("auth.forgotPassword.rememberPassword")}{" "}
                <Link
                  href="/auth/login"
                  className="font-semibold text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  {t("auth.forgotPassword.signIn")}
                </Link>
              </p>
            </div>
        </div>
      </motion.div>
    </div>
  );
}
