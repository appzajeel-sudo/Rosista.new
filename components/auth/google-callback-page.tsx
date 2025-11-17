"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { CheckCircle, AlertCircle } from "lucide-react";
import { saveGoogleAccessTokenAction } from "@/app/actions/auth";
import { useAuth } from "@/context/AuthContext";

export function GoogleCallbackPage() {
  const { i18n, t } = useTranslation();
  const isRtl = i18n.language === "ar";
  const router = useRouter();
  const searchParams = useSearchParams();
  const { checkAuthStatus } = useAuth();
  const hasProcessed = useRef(false);

  useEffect(() => {
    const handleCallback = async () => {
      // منع المعالجة المكررة
      if (hasProcessed.current) {
        return;
      }

      const accessToken = searchParams.get("accessToken");
      const error = searchParams.get("error");

      // تمييز أنه تمت المعالجة
      hasProcessed.current = true;

      if (error) {
        console.error("Google authentication error:", error);
        // إعادة التوجيه بعد 3 ثواني
        setTimeout(() => {
          router.push("/auth/login");
        }, 3000);
        return;
      }

      if (accessToken) {
        console.log("Access token received, storing and checking auth status");
        try {
          // حفظ accessToken في httpOnly cookie
          await saveGoogleAccessTokenAction(accessToken);

          // جلب بيانات المستخدم
          await checkAuthStatus();

          // إعادة التوجيه بعد 1.5 ثانية
          setTimeout(() => {
            router.push("/");
          }, 1500);
        } catch (authError) {
          console.error("Error checking auth status:", authError);
          setTimeout(() => {
            router.push("/auth/login");
          }, 2000);
        }
      } else {
        console.log("No access token received");
        setTimeout(() => {
          router.push("/auth/login");
        }, 3000);
      }
    };

    handleCallback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const hasError = searchParams.get("error");
  const hasToken = searchParams.get("accessToken");

  const getErrorMessage = () => {
    const error = searchParams.get("error");
    if (!error) return t("auth.googleCallback.errorMessages.default");

    const errorKey = error as keyof typeof errorMessages;
    const errorMessages = {
      authentication_failed: t(
        "auth.googleCallback.errorMessages.authentication_failed"
      ),
      server_error: t("auth.googleCallback.errorMessages.server_error"),
      google_auth_failed: t(
        "auth.googleCallback.errorMessages.google_auth_failed"
      ),
    };

    return (
      errorMessages[errorKey] || t("auth.googleCallback.errorMessages.default")
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 p-4 dark:bg-neutral-950">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-sm text-center"
      >
        <div className="p-8 sm:p-10">
          {/* Status Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className={`mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full ${
              hasError
                ? "bg-red-500"
                : hasToken
                ? "bg-green-500"
                : "bg-neutral-900 dark:bg-white"
            }`}
          >
            {hasError ? (
              <AlertCircle className="h-8 w-8 text-white" />
            ) : (
              <CheckCircle className="h-8 w-8 text-white dark:text-neutral-900" />
            )}
          </motion.div>

          {/* Status Messages */}
          {hasError ? (
            <>
              <h1 className="mb-4 text-3xl font-bold text-neutral-900 dark:text-white">
                {t("auth.googleCallback.error")}
              </h1>
              <p className="mb-6 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                {getErrorMessage()}
              </p>
            </>
          ) : hasToken ? (
            <>
              <h1 className="mb-4 text-3xl font-bold text-neutral-900 dark:text-white">
                {t("auth.googleCallback.success")}
              </h1>
              <p className="mb-6 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                {t("auth.googleCallback.successMessage")}
              </p>
            </>
          ) : (
            <>
              <h1 className="mb-4 text-3xl font-bold text-neutral-900 dark:text-white">
                {t("auth.googleCallback.processing")}
              </h1>
              <p className="mb-6 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                {t("auth.googleCallback.processingMessage")}
              </p>
            </>
          )}

          {/* Loading Animation */}
          <motion.div
            className="flex justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className={`h-2 w-2 rounded-full ${
                  hasError
                    ? "bg-red-500"
                    : hasToken
                    ? "bg-green-500"
                    : "bg-neutral-900 dark:bg-white"
                }`}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
