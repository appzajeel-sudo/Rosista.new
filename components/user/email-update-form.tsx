"use client";

import { useState, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Send, CheckCircle } from "lucide-react";
import { useUser } from "@/context/UserContext";

export function EmailUpdateForm() {
  const { i18n, t } = useTranslation();
  const isRtl = i18n.language === "ar";
  const { profile, requestEmailUpdate, verifyEmailUpdate, isLoading } =
    useUser();

  const [step, setStep] = useState<"request" | "verify">("request");
  const [formData, setFormData] = useState({
    newEmail: "",
    verificationCode: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleRequestSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await requestEmailUpdate(formData.newEmail);
      setStep("verify");
    } catch (err: any) {
      console.error("Email update request error:", err);
      setError(err.message || t("emailUpdate.updateError"));
    }
  };

  const handleVerifySubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await verifyEmailUpdate(formData.verificationCode, formData.password);
      setStep("request");
      setFormData({
        newEmail: "",
        verificationCode: "",
        password: "",
      });
    } catch (err: any) {
      console.error("Email verification error:", err);
      setError(err.message || t("emailUpdate.updateError"));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 p-10"
    >
      <div className="flex items-center mb-10 pb-6 border-b border-neutral-200 dark:border-neutral-800">
        <div className="w-12 h-12 border border-neutral-900 dark:border-white rounded-full flex items-center justify-center mr-4 rtl:ml-4 rtl:mr-0">
          <Mail className="w-6 h-6 text-neutral-900 dark:text-white" />
        </div>
        <div>
          <h2
            className="text-3xl font-bold text-neutral-900 dark:text-white"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 700,
              letterSpacing: "0.05em",
            }}
          >
            {t("emailUpdate.title")}
          </h2>
          <p
            className="text-neutral-600 dark:text-neutral-400 text-sm uppercase tracking-wider mt-2"
            style={{ letterSpacing: "0.1em" }}
          >
            {t("emailUpdate.currentEmail")}:{" "}
            <span className="font-medium">{profile?.email}</span>
          </p>
        </div>
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 overflow-hidden border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/20 p-4 text-sm text-red-700 dark:text-red-400"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {step === "request" ? (
          <motion.form
            key="request"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onSubmit={handleRequestSubmit}
            className="space-y-6"
          >
            <div>
              <label
                className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3 uppercase tracking-wider"
                style={{ letterSpacing: "0.1em" }}
              >
                {t("emailUpdate.newEmail")}
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="newEmail"
                  value={formData.newEmail}
                  onChange={handleChange}
                  dir="ltr"
                  className="w-full px-4 py-3 pl-10 rtl:pr-10 rtl:pl-4 border border-neutral-200 dark:border-neutral-800 focus:border-neutral-900 dark:focus:border-white focus:outline-none transition-all text-neutral-900 dark:text-white text-left dark:bg-black"
                  placeholder={t("emailUpdate.newEmailPlaceholder")}
                  required
                />
                <Mail
                  size={18}
                  className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 text-neutral-400"
                />
              </div>
            </div>

            <div className="border border-neutral-200 dark:border-neutral-800 p-4">
              <h4
                className="font-medium text-neutral-900 dark:text-white mb-2 uppercase tracking-wider text-sm"
                style={{ letterSpacing: "0.1em" }}
              >
                {isRtl ? "ملاحظة مهمة" : "Important Note"}
              </h4>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                {isRtl
                  ? "سيتم إرسال رمز التحقق إلى البريد الإلكتروني الجديد. ستحتاج أيضاً إلى إدخال كلمة المرور الحالية للتأكيد."
                  : "A verification code will be sent to the new email address. You will also need to enter your current password for confirmation."}
              </p>
            </div>

            <motion.button
              type="submit"
              disabled={isLoading || !formData.newEmail}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-neutral-900 dark:border-white bg-neutral-900 text-white hover:bg-neutral-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 uppercase tracking-wider text-sm"
              style={{ letterSpacing: "0.1em" }}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin dark:border-neutral-900" />
              ) : (
                <>
                  <Send size={18} />
                  <span>{t("emailUpdate.submit")}</span>
                </>
              )}
            </motion.button>
          </motion.form>
        ) : (
          <motion.form
            key="verify"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onSubmit={handleVerifySubmit}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
                {t("emailUpdate.step2Title")}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                {isRtl
                  ? "تم إرسال رمز التحقق إلى:"
                  : "Verification code sent to:"}
              </p>
              <p className="text-primary-600 dark:text-primary-400 font-medium">
                {formData.newEmail}
              </p>
            </div>

            <div>
              <label
                className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3 uppercase tracking-wider"
                style={{ letterSpacing: "0.1em" }}
              >
                {t("emailUpdate.verificationCode")}
              </label>
              <input
                type="text"
                name="verificationCode"
                value={formData.verificationCode}
                onChange={handleChange}
                dir="ltr"
                className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-800 focus:border-neutral-900 dark:focus:border-white focus:outline-none transition-all text-center text-lg font-mono tracking-widest text-neutral-900 dark:text-white dark:bg-black"
                placeholder={t("emailUpdate.codePlaceholder")}
                maxLength={6}
                required
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3 uppercase tracking-wider"
                style={{ letterSpacing: "0.1em" }}
              >
                {t("emailUpdate.password")}
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  dir="ltr"
                  className="w-full px-4 py-3 pl-10 rtl:pr-10 rtl:pl-4 border border-neutral-200 dark:border-neutral-800 focus:border-neutral-900 dark:focus:border-white focus:outline-none transition-all text-neutral-900 dark:text-white text-left dark:bg-black"
                  placeholder={t("emailUpdate.passwordPlaceholder")}
                  required
                />
                <Lock
                  size={18}
                  className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 text-neutral-400"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setStep("request");
                  setError(null);
                }}
                className="flex-1 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black text-neutral-700 dark:text-neutral-300 py-3 px-4 font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all uppercase tracking-wider text-sm"
                style={{ letterSpacing: "0.1em" }}
              >
                {isRtl ? "العودة" : "Back"}
              </button>
              <motion.button
                type="submit"
                disabled={
                  isLoading || !formData.verificationCode || !formData.password
                }
                className="flex-1 flex items-center justify-center gap-2 border border-neutral-900 dark:border-white bg-neutral-900 text-white py-3 px-4 font-medium hover:bg-neutral-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 uppercase tracking-wider text-sm"
                style={{ letterSpacing: "0.1em" }}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin dark:border-neutral-900" />
                ) : (
                  <>
                    <CheckCircle size={18} />
                    <span>{t("emailUpdate.verify")}</span>
                  </>
                )}
              </motion.button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
