"use client";

import { useState, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Eye, EyeOff, Shield } from "lucide-react";
import { useUser } from "@/context/UserContext";

export function PasswordUpdateForm() {
  const { i18n, t } = useTranslation();
  const isRtl = i18n.language === "ar";
  const { updatePassword, isLoading } = useUser();

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false,
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

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
    setSuccess(false);

    if (formData.newPassword !== formData.confirmPassword) {
      setError(t("passwordUpdate.passwordMismatch"));
      return;
    }

    if (passwordStrength < 50) {
      setError(t("passwordUpdate.updateError"));
      return;
    }

    try {
      await updatePassword(formData.oldPassword, formData.newPassword);
      setFormData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setPasswordStrength(0);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      console.error("Password update error:", err);
      setError(err.message || t("passwordUpdate.updateError"));
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

  const togglePasswordVisibility = (field: "old" | "new" | "confirm") => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const getStrengthColor = () => {
    if (passwordStrength < 25) return "bg-red-500";
    if (passwordStrength < 50) return "bg-yellow-500";
    if (passwordStrength < 75) return "bg-blue-500";
    return "bg-green-500";
  };

  const getStrengthText = () => {
    if (passwordStrength < 25) return t("passwordUpdate.passwordStrength.weak");
    if (passwordStrength < 50) return t("passwordUpdate.passwordStrength.fair");
    if (passwordStrength < 75) return t("passwordUpdate.passwordStrength.good");
    return t("passwordUpdate.passwordStrength.strong");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 p-10"
    >
      <div className="flex items-center mb-10 pb-6 border-b border-neutral-200 dark:border-neutral-800">
        <div className="w-12 h-12 border border-neutral-900 dark:border-white rounded-full flex items-center justify-center mr-4 rtl:ml-4 rtl:mr-0">
          <Shield className="w-6 h-6 text-neutral-900 dark:text-white" />
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
            {t("passwordUpdate.title")}
          </h2>
          <p
            className="text-neutral-600 dark:text-neutral-400 text-sm uppercase tracking-wider mt-2"
            style={{ letterSpacing: "0.1em" }}
          >
            {t("passwordUpdate.subtitle")}
          </p>
        </div>
      </div>

      {/* Success Message */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 overflow-hidden rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700 dark:border-green-900/50 dark:bg-green-900/20 dark:text-green-400"
          >
            {t("passwordUpdate.updateSuccess")}
          </motion.div>
        )}
      </AnimatePresence>

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

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Current Password */}
        <div>
          <label
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3 uppercase tracking-wider"
            style={{ letterSpacing: "0.1em" }}
          >
            {t("passwordUpdate.oldPassword")}
          </label>
          <div className="relative">
            <input
              type={showPasswords.old ? "text" : "password"}
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              dir="ltr"
              className="w-full px-4 py-3 pr-12 rtl:pl-12 rtl:pr-4 border border-neutral-200 dark:border-neutral-800 focus:border-neutral-900 dark:focus:border-white focus:outline-none transition-all text-neutral-900 dark:text-white text-left dark:bg-black"
              placeholder={t("passwordUpdate.oldPasswordPlaceholder")}
              required
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("old")}
              className="absolute right-3 rtl:left-3 rtl:right-auto top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-300"
            >
              {showPasswords.old ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div>
          <label
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3 uppercase tracking-wider"
            style={{ letterSpacing: "0.1em" }}
          >
            {t("passwordUpdate.newPassword")}
          </label>
          <div className="relative">
            <input
              type={showPasswords.new ? "text" : "password"}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              dir="ltr"
              className="w-full px-4 py-3 pr-12 rtl:pl-12 rtl:pr-4 border border-neutral-200 dark:border-neutral-800 focus:border-neutral-900 dark:focus:border-white focus:outline-none transition-all text-neutral-900 dark:text-white text-left dark:bg-black"
              placeholder={t("passwordUpdate.newPasswordPlaceholder")}
              required
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("new")}
              className="absolute right-3 rtl:left-3 rtl:right-auto top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-300"
            >
              {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {formData.newPassword && (
            <div className="mt-2">
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-neutral-200 dark:bg-neutral-800 rounded-full h-1">
                  <div
                    className={`h-1 rounded-full transition-all duration-300 ${getStrengthColor()}`}
                    style={{ width: `${passwordStrength}%` }}
                  />
                </div>
                <span
                  className="text-xs text-neutral-600 dark:text-neutral-400 uppercase tracking-wider"
                  style={{ letterSpacing: "0.1em" }}
                >
                  {getStrengthText()}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3 uppercase tracking-wider"
            style={{ letterSpacing: "0.1em" }}
          >
            {t("passwordUpdate.confirmPassword")}
          </label>
          <div className="relative">
            <input
              type={showPasswords.confirm ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              dir="ltr"
              className="w-full px-4 py-3 pr-12 rtl:pl-12 rtl:pr-4 border border-neutral-200 dark:border-neutral-800 focus:border-neutral-900 dark:focus:border-white focus:outline-none transition-all text-neutral-900 dark:text-white text-left dark:bg-black"
              placeholder={t("passwordUpdate.confirmPasswordPlaceholder")}
              required
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("confirm")}
              className="absolute right-3 rtl:left-3 rtl:right-auto top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-300"
            >
              {showPasswords.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {formData.confirmPassword &&
            formData.newPassword !== formData.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {t("passwordUpdate.passwordMismatch")}
              </p>
            )}
        </div>

        <motion.button
          type="submit"
          disabled={
            isLoading ||
            !formData.oldPassword ||
            !formData.newPassword ||
            formData.newPassword !== formData.confirmPassword ||
            passwordStrength < 50
          }
          className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-neutral-900 dark:border-white bg-neutral-900 text-white hover:bg-neutral-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 uppercase tracking-wider text-sm"
          style={{ letterSpacing: "0.1em" }}
          whileHover={{ y: -2 }}
          whileTap={{ y: 0 }}
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin dark:border-neutral-900" />
          ) : (
            <>
              <Shield size={18} />
              <span>{t("passwordUpdate.submit")}</span>
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
}
