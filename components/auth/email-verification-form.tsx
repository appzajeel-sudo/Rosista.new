"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, CheckCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export function EmailVerificationForm() {
  const { i18n, t } = useTranslation();
  const isRtl = i18n.language === "ar";
  const router = useRouter();
  const searchParams = useSearchParams();
  const { verifyEmail, resendCode } = useAuth();

  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const emailFromQuery = searchParams.get("email");
    if (emailFromQuery) {
      setEmail(emailFromQuery);
    } else {
      router.push("/auth/signup");
    }
  }, [searchParams, router]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await verifyEmail({
        email,
        verificationCode,
      });
    } catch (err: any) {
      console.error("Verification error:", err);
      setError(err.message || t("auth.errors.verificationFailed"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (countdown > 0) return;

    setIsResending(true);
    setError(null);

    try {
      await resendCode(email);
      setCountdown(60);
    } catch (err: any) {
      console.error("Resend error:", err);
      setError(err.message || t("auth.errors.resendFailed"));
    } finally {
      setIsResending(false);
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setVerificationCode(value);
    setError(null);
  };

  if (!email) {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 p-4 dark:bg-neutral-950">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        {/* Card */}
        <div className="rounded-2xl border border-neutral-200 bg-white shadow-xl dark:border-neutral-800 dark:bg-neutral-900">
          <div className="p-8 sm:p-10">
            {/* Header */}
            <div className="mb-8 text-center">
              <h1 className="mb-2 text-3xl font-bold text-neutral-900 dark:text-white">
                {t("auth.verifyEmail.title")}
              </h1>
              <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
                {t("auth.verifyEmail.subtitle")}
              </p>
              <p className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                {email}
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
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Verification Code Field */}
              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  {t("auth.verifyEmail.code")}
                </label>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={handleCodeChange}
                  dir="ltr"
                  className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-4 text-center text-2xl font-mono tracking-[0.5em] text-neutral-900 transition-colors placeholder:text-neutral-400 placeholder:tracking-normal focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder:text-neutral-500 dark:focus:border-primary-400"
                  placeholder={t("auth.verifyEmail.codePlaceholder")}
                  maxLength={6}
                  required
                />
                <p className="mt-2 text-center text-xs text-neutral-500 dark:text-neutral-400">
                  {verificationCode.length}/6
                </p>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading || verificationCode.length !== 6}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full rounded-lg bg-neutral-900 px-4 py-3 font-semibold text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
              >
                {isLoading ? (
                  <div className="mx-auto h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white dark:border-neutral-900/30 dark:border-t-neutral-900" />
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <CheckCircle size={18} />
                    {t("auth.verifyEmail.submit")}
                  </span>
                )}
              </motion.button>
            </form>

            {/* Resend Code Section */}
            <div className="mt-6 text-center">
              <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
                {t("auth.verifyEmail.noCode")}
              </p>
              <button
                onClick={handleResendCode}
                disabled={countdown > 0 || isResending}
                className="mx-auto flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
              >
                {isResending ? (
                  <RefreshCw size={16} className="animate-spin" />
                ) : (
                  <RefreshCw size={16} />
                )}
                <span>
                  {countdown > 0
                    ? `${t("auth.verifyEmail.resendIn")} ${countdown}s`
                    : t("auth.verifyEmail.resend")}
                </span>
              </button>
            </div>

            {/* Footer Link */}
            <div className="mt-8 text-center">
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {t("auth.verifyEmail.changeEmail")}{" "}
                <Link
                  href="/auth/signup"
                  className="font-semibold text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  {t("auth.verifyEmail.backToSignup")}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
