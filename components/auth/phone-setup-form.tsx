"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Send, CheckCircle, RefreshCw, Shield } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export function PhoneSetupForm() {
  const { i18n, t } = useTranslation();
  const isRtl = i18n.language === "ar";
  const router = useRouter();
  const { sendPhoneVerification, verifyPhoneNumber } = useAuth();

  const [step, setStep] = useState<"input" | "verify">("input");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handlePhoneSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await sendPhoneVerification(phoneNumber);
      setStep("verify");
      setCountdown(60);
    } catch (err: any) {
      console.error("Phone verification error:", err);
      setError(err.message || t("auth.errors.sendPhoneVerificationFailed"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerificationSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await verifyPhoneNumber(verificationCode);
    } catch (err: any) {
      console.error("Phone verification error:", err);
      setError(err.message || t("auth.errors.phoneVerificationFailed"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (countdown > 0) return;

    setIsResending(true);
    setError(null);

    try {
      await sendPhoneVerification(phoneNumber);
      setCountdown(60);
    } catch (err: any) {
      console.error("Resend error:", err);
      setError(err.message || t("auth.errors.sendPhoneVerificationFailed"));
    } finally {
      setIsResending(false);
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setVerificationCode(value);
    setError(null);
  };

  // Mask phone number
  const maskedPhone = phoneNumber.replace(/(\+\d{1,3})\d+(\d{4})/, "$1****$2");

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
                {step === "input" ? (
                  <Phone className="h-6 w-6 text-white dark:text-neutral-900" />
                ) : (
                  <Shield className="h-6 w-6 text-white dark:text-neutral-900" />
                )}
              </div>
            </motion.div>
            <h1 className="mb-2 text-3xl font-bold text-neutral-900 dark:text-white">
              {step === "input"
                ? t("auth.phoneSetup.step1Title")
                : t("auth.phoneSetup.step2Title")}
            </h1>
            <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              {step === "input"
                ? t("auth.phoneSetup.step1Subtitle")
                : t("auth.phoneSetup.step2Subtitle")}
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

          {step === "input" ? (
            /* Phone Input Step */
            <form onSubmit={handlePhoneSubmit} className="space-y-6">
              {/* Phone Number Field */}
              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  {t("auth.phoneSetup.phoneNumber")}
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    setError(null);
                  }}
                  dir="ltr"
                  className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-left text-neutral-900 transition-colors placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder:text-neutral-500 dark:focus:border-primary-400"
                  placeholder={t("auth.phoneSetup.phonePlaceholder")}
                  required
                />
                <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                  {t("auth.phoneSetup.phoneHint")}
                </p>
              </div>

              {/* Info Card */}
              <div className="rounded-lg border border-primary-200 bg-primary-50 p-4 dark:border-primary-800/50 dark:bg-primary-900/20">
                <h4 className="mb-2 flex items-center gap-2 text-sm font-medium text-primary-800 dark:text-primary-200">
                  <Shield size={16} />
                  {t("auth.phoneSetup.whyNeedPhone")}
                </h4>
                <ul className="space-y-1 text-xs text-primary-700 dark:text-primary-300">
                  <li>• {t("auth.phoneSetup.reasons.security")}</li>
                  <li>• {t("auth.phoneSetup.reasons.notifications")}</li>
                  <li>• {t("auth.phoneSetup.reasons.quickLogin")}</li>
                  <li>• {t("auth.phoneSetup.reasons.delivery")}</li>
                </ul>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !phoneNumber}
                onMouseEnter={() => setIsButtonHovered(true)}
                onMouseLeave={() => setIsButtonHovered(false)}
                className="w-full cursor-pointer rounded-lg bg-neutral-900 px-4 py-3 font-semibold text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
              >
                {isLoading ? (
                  <div className="mx-auto h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white dark:border-neutral-900/30 dark:border-t-neutral-900" />
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Send size={18} />
                    {t("auth.phoneSetup.sendCode")}
                  </span>
                )}
              </button>
            </form>
          ) : (
            /* Verification Step */
            <form onSubmit={handleVerificationSubmit} className="space-y-6">
              {/* Phone Number Display */}
              <div className="mb-6 text-center">
                <p className="mb-2 text-sm text-neutral-600 dark:text-neutral-400">
                  {t("auth.phoneVerification.subtitle")}
                </p>
                <p className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                  {maskedPhone}
                </p>
              </div>

              {/* Verification Code Field */}
              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  {t("auth.phoneSetup.verifyCode")}
                </label>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={handleCodeChange}
                  dir="ltr"
                  className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-4 text-center text-2xl font-mono tracking-[0.5em] text-neutral-900 transition-colors placeholder:text-neutral-400 placeholder:tracking-normal focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder:text-neutral-500 dark:focus:border-primary-400"
                  placeholder={t("auth.phoneVerification.codePlaceholder")}
                  maxLength={6}
                  required
                />
                <p className="mt-2 text-center text-xs text-neutral-500 dark:text-neutral-400">
                  {verificationCode.length}/6
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || verificationCode.length !== 6}
                onMouseEnter={() => setIsButtonHovered(true)}
                onMouseLeave={() => setIsButtonHovered(false)}
                className="w-full cursor-pointer rounded-lg bg-neutral-900 px-4 py-3 font-semibold text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
              >
                {isLoading ? (
                  <div className="mx-auto h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white dark:border-neutral-900/30 dark:border-t-neutral-900" />
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <CheckCircle size={18} />
                    {t("auth.phoneSetup.verifyAndComplete")}
                  </span>
                )}
              </button>

              {/* Resend Code Section */}
              <div className="text-center">
                <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
                  {t("auth.phoneVerification.noCode")}
                </p>
                <button
                  type="button"
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
                      ? `${t("auth.phoneVerification.resendIn")} ${countdown}s`
                      : t("auth.phoneVerification.resend")}
                  </span>
                </button>
              </div>

              {/* Change Phone Number Link */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setStep("input");
                    setVerificationCode("");
                    setError(null);
                  }}
                  className="text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  {t("auth.phoneSetup.changePhone")}
                </button>
              </div>
            </form>
          )}

          {/* Footer Note */}
          <div className="mt-8 text-center">
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              {t("auth.phoneSetup.footerNote")}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

