"use client";

import { useState, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Trash2, AlertTriangle, Lock, Type, Shield } from "lucide-react";
import { useUser } from "@/context/UserContext";

export function DeleteAccountForm() {
  const { i18n, t } = useTranslation();
  const isRtl = i18n.language === "ar";
  const { deleteAccount, isLoading } = useUser();

  const [formData, setFormData] = useState({
    password: "",
    confirmation: "",
  });
  const [showWarning, setShowWarning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.confirmation !== "DELETE") {
      setError(
        isRtl ? 'يجب كتابة "DELETE" بالضبط' : 'Must type "DELETE" exactly'
      );
      return;
    }

    try {
      await deleteAccount(formData.password, formData.confirmation);
    } catch (err: any) {
      console.error("Account deletion error:", err);
      setError(err.message || t("deleteAccount.deleteError"));
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
          <Trash2 className="w-6 h-6 text-neutral-900 dark:text-white" />
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
            {t("deleteAccount.title")}
          </h2>
          <p
            className="text-neutral-600 dark:text-neutral-400 text-sm uppercase tracking-wider mt-2"
            style={{ letterSpacing: "0.1em" }}
          >
            {t("deleteAccount.subtitle")}
          </p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

      {!showWarning ? (
        <div className="text-center">
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-10 h-10 text-red-500 dark:text-red-400" />
          </div>
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
            {t("deleteAccount.areYouSure")}
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
            {isRtl
              ? "سيتم حذف حسابك وجميع بياناتك نهائياً. لن تتمكن من استرداد هذه البيانات أو الوصول إلى حسابك مرة أخرى."
              : "Your account and all your data will be permanently deleted. You will not be able to recover this data or access your account again."}
          </p>

          <div className="border border-neutral-200 dark:border-neutral-800 p-6 mb-8">
            <h4
              className="font-medium text-neutral-900 dark:text-white mb-2 uppercase tracking-wider text-sm"
              style={{ letterSpacing: "0.1em" }}
            >
              {t("deleteAccount.whatWillBeDeleted")}:
            </h4>
            <ul className="text-neutral-600 dark:text-neutral-400 text-sm space-y-1 text-right rtl:text-right">
              <li>• {t("deleteAccount.items.orders")}</li>
              <li>• {t("deleteAccount.items.favorites")}</li>
              <li>• {t("deleteAccount.items.cart")}</li>
              <li>• {t("deleteAccount.items.profile")}</li>
              <li>• {t("deleteAccount.items.reviews")}</li>
            </ul>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setShowWarning(false)}
              className="flex-1 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black text-neutral-700 dark:text-neutral-300 py-3 px-4 font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all uppercase tracking-wider text-sm"
              style={{ letterSpacing: "0.1em" }}
            >
              {t("profile.cancel")}
            </button>
            <motion.button
              onClick={() => setShowWarning(true)}
              className="flex-1 border border-neutral-900 dark:border-white bg-neutral-900 text-white py-3 px-4 font-medium hover:bg-neutral-800 transition-all uppercase tracking-wider text-sm dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
              style={{ letterSpacing: "0.1em" }}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              {isRtl ? "متابعة الحذف" : "Proceed to Delete"}
            </motion.button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="border border-neutral-200 dark:border-neutral-800 p-6 mb-8">
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-neutral-900 dark:text-white mr-2 rtl:ml-2 rtl:mr-0" />
              <h3
                className="text-lg font-bold text-neutral-900 dark:text-white"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 700,
                }}
              >
                {isRtl ? "تأكيد الحذف" : "Confirm Deletion"}
              </h3>
            </div>
            <p
              className="text-neutral-600 dark:text-neutral-400 text-sm mb-4 uppercase tracking-wider"
              style={{ letterSpacing: "0.1em" }}
            >
              {t("deleteAccount.confirmationNote")}
            </p>
          </div>

          <div>
            <label
              className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3 uppercase tracking-wider"
              style={{ letterSpacing: "0.1em" }}
            >
              <Lock size={16} className={`inline ${isRtl ? "ml-2" : "mr-2"}`} />
              {t("deleteAccount.password")}
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              dir="ltr"
              className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-800 focus:border-neutral-900 dark:focus:border-white focus:outline-none transition-all text-neutral-900 dark:text-white text-left dark:bg-black"
              placeholder={t("deleteAccount.passwordPlaceholder")}
              required
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3 uppercase tracking-wider"
              style={{ letterSpacing: "0.1em" }}
            >
              <Type size={16} className={`inline ${isRtl ? "ml-2" : "mr-2"}`} />
              {t("deleteAccount.confirmation")}
            </label>
            <input
              type="text"
              name="confirmation"
              value={formData.confirmation}
              onChange={handleChange}
              dir="ltr"
              className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-800 focus:border-neutral-900 dark:focus:border-white focus:outline-none transition-all font-mono text-neutral-900 dark:text-white text-left dark:bg-black"
              placeholder={t("deleteAccount.confirmationPlaceholder")}
              required
            />
            {formData.confirmation && formData.confirmation !== "DELETE" && (
              <p className="text-red-500 text-xs mt-1">
                {isRtl
                  ? 'يجب كتابة "DELETE" بالضبط'
                  : 'Must type "DELETE" exactly'}
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setShowWarning(false)}
              className="flex-1 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black text-neutral-700 dark:text-neutral-300 py-3 px-4 font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all uppercase tracking-wider text-sm"
              style={{ letterSpacing: "0.1em" }}
            >
              {isRtl ? "العودة" : "Back"}
            </button>
            <motion.button
              type="submit"
              disabled={
                isLoading ||
                !formData.password ||
                formData.confirmation !== "DELETE"
              }
              className="flex-1 flex items-center justify-center gap-2 border border-neutral-900 dark:border-white bg-neutral-900 text-white py-3 px-4 font-medium hover:bg-neutral-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider text-sm dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
              style={{ letterSpacing: "0.1em" }}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Trash2 size={18} />
                  <span>{t("deleteAccount.submit")}</span>
                </>
              )}
            </motion.button>
          </div>
        </form>
      )}
    </motion.div>
  );
}
