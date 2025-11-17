"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Camera,
  Save,
  Edit3,
  X,
  UserCheck,
  CheckCircle,
} from "lucide-react";
import { useUser } from "@/context/UserContext";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

export function ProfileForm() {
  const { i18n, t } = useTranslation();
  const isRtl = i18n.language === "ar";
  const { profile, updateProfile, uploadProfilePicture, isLoading } = useUser();
  const { sendPhoneVerification } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: profile?.name || "",
    username: profile?.username || "",
    phoneNumber: profile?.phoneNumber || "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Update form data when profile changes
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        username: profile.username || "",
        phoneNumber: profile.phoneNumber || "",
      });
    }
  }, [profile]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (err: any) {
      console.error("Profile update error:", err);
      setError(err.message || t("profile.updateError"));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(null);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError(
        isRtl
          ? "حجم الملف كبير جداً (الحد الأقصى 5 ميجابايت)"
          : "File size too large (max 5MB)"
      );
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError(
        isRtl ? "يرجى اختيار ملف صورة صالح" : "Please select a valid image file"
      );
      return;
    }

    setUploadingImage(true);
    setError(null);
    try {
      await uploadProfilePicture(file);
    } catch (err: any) {
      console.error("Image upload error:", err);
      setError(err.message || "Failed to upload image");
    } finally {
      setUploadingImage(false);
    }
  };

  const handlePhoneVerification = async () => {
    if (!formData.phoneNumber) return;

    try {
      await sendPhoneVerification(formData.phoneNumber);
    } catch (err: any) {
      console.error("Phone verification error:", err);
      setError(err.message || "Failed to send verification code");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 p-10"
    >
      <div className="flex items-center justify-between mb-10 pb-6 border-b border-neutral-200 dark:border-neutral-800">
        <h2
          className="text-3xl font-bold text-neutral-900 dark:text-white"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 700,
            letterSpacing: "0.05em",
          }}
        >
          {t("profile.personalInfo")}
        </h2>
        <button
          onClick={() => {
            setIsEditing(!isEditing);
            setError(null);
            if (isEditing && profile) {
              setFormData({
                name: profile.name || "",
                username: profile.username || "",
                phoneNumber: profile.phoneNumber || "",
              });
            }
          }}
          className={`flex items-center gap-2 px-4 py-2 border border-neutral-200 dark:border-neutral-800 transition-all uppercase tracking-wider text-sm ${
            isEditing
              ? "bg-white dark:bg-black text-neutral-900 dark:text-white hover:bg-neutral-50 dark:hover:bg-neutral-900"
              : "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
          }`}
          style={{ letterSpacing: "0.1em" }}
        >
          {isEditing ? <X size={18} /> : <Edit3 size={18} />}
          <span>{isEditing ? t("profile.cancel") : t("profile.edit")}</span>
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-8 border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/20 p-4 text-sm text-red-700 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Profile Picture */}
      <div className="flex flex-col items-center mb-10">
        <div className="relative">
          <div className="w-32 h-32 rounded-full overflow-hidden border border-neutral-900 dark:border-white">
            <div className="w-full h-full rounded-full overflow-hidden bg-white dark:bg-black">
              {profile?.profilePicture ? (
                <Image
                  src={profile.profilePicture}
                  alt={profile.name}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center">
                  <User size={48} className="text-neutral-400" />
                </div>
              )}
            </div>
          </div>

          {isEditing && (
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadingImage}
              className="absolute bottom-0 right-0 w-10 h-10 bg-neutral-900 text-white rounded-full flex items-center justify-center hover:bg-neutral-800 transition-all border border-neutral-900 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 dark:border-white"
            >
              {uploadingImage ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin dark:border-neutral-900" />
              ) : (
                <Camera size={18} />
              )}
            </button>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />

        <h3
          className="text-2xl font-bold text-neutral-900 dark:text-white mt-4"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 700,
            letterSpacing: "0.05em",
          }}
        >
          {profile?.name}
        </h3>
        <p
          className="text-neutral-600 dark:text-neutral-400 uppercase tracking-wider text-sm"
          style={{ letterSpacing: "0.15em" }}
        >
          @{profile?.username || "username"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Name */}
        <div>
          <label
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3 uppercase tracking-wider"
            style={{ letterSpacing: "0.1em" }}
          >
            <User size={16} className={`inline ${isRtl ? "ml-2" : "mr-2"}`} />
            {t("profile.fullName")}
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full px-4 py-3 border border-neutral-200 dark:border-neutral-800 transition-all text-neutral-900 dark:text-white ${
              isEditing
                ? "focus:border-neutral-900 dark:focus:border-white focus:outline-none dark:bg-black"
                : "bg-neutral-50 cursor-not-allowed dark:bg-neutral-900"
            }`}
            placeholder={t("profile.namePlaceholder")}
            style={{
              direction: formData.name.match(/[\u0600-\u06FF]/) ? "rtl" : "ltr",
              textAlign: formData.name.match(/[\u0600-\u06FF]/)
                ? "right"
                : "left",
            }}
          />
        </div>

        {/* Username */}
        <div>
          <label
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3 uppercase tracking-wider"
            style={{ letterSpacing: "0.1em" }}
          >
            <UserCheck
              size={16}
              className={`inline ${isRtl ? "ml-2" : "mr-2"}`}
            />
            {t("profile.username")}
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            disabled={!isEditing}
            dir="ltr"
            className={`w-full px-4 py-3 border border-neutral-200 dark:border-neutral-800 transition-all text-neutral-900 dark:text-white text-left ${
              isEditing
                ? "focus:border-neutral-900 dark:focus:border-white focus:outline-none dark:bg-black"
                : "bg-neutral-50 cursor-not-allowed dark:bg-neutral-900"
            }`}
            placeholder={t("profile.usernamePlaceholder")}
          />
        </div>

        {/* Email (Read-only) */}
        <div>
          <label
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3 uppercase tracking-wider"
            style={{ letterSpacing: "0.1em" }}
          >
            <Mail size={16} className={`inline ${isRtl ? "ml-2" : "mr-2"}`} />
            {t("profile.emailAddress")}
          </label>
          <input
            type="email"
            value={profile?.email || ""}
            disabled
            dir="ltr"
            className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 cursor-not-allowed text-neutral-900 dark:text-white text-left dark:bg-neutral-900"
          />
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            {t("profile.changeEmailNote")}
          </p>
        </div>

        {/* Phone Number */}
        <div>
          <label
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3 uppercase tracking-wider"
            style={{ letterSpacing: "0.1em" }}
          >
            <Phone size={16} className={`inline ${isRtl ? "ml-2" : "mr-2"}`} />
            {t("profile.phoneNumber")}
          </label>
          <div className="flex gap-2">
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              disabled={!isEditing}
              dir="ltr"
              className={`flex-1 px-4 py-3 border border-neutral-200 dark:border-neutral-800 transition-all text-neutral-900 dark:text-white text-left ${
                isEditing
                  ? "focus:border-neutral-900 dark:focus:border-white focus:outline-none dark:bg-black"
                  : "bg-neutral-50 cursor-not-allowed dark:bg-neutral-900"
              }`}
              placeholder={t("profile.phonePlaceholder")}
            />
            {isEditing && formData.phoneNumber && !profile?.isPhoneVerified && (
              <button
                type="button"
                onClick={handlePhoneVerification}
                className="px-4 py-3 border border-neutral-900 dark:border-white bg-neutral-900 text-white hover:bg-neutral-800 transition-all flex items-center gap-2 uppercase tracking-wider text-sm dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
                style={{ letterSpacing: "0.1em" }}
              >
                <CheckCircle size={18} />
                <span>{t("profile.verifyPhone")}</span>
              </button>
            )}
          </div>
          {profile?.isPhoneVerified && (
            <p className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center gap-1">
              <CheckCircle size={14} />
              {t("profile.accountStatus.phoneVerified")}
            </p>
          )}
        </div>

        {/* Save Button */}
        {isEditing && (
          <button
            type="submit"
            disabled={isLoading || uploadingImage}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-neutral-900 dark:border-white bg-neutral-900 text-white hover:bg-neutral-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 uppercase tracking-wider text-sm"
            style={{ letterSpacing: "0.1em" }}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin dark:border-neutral-900" />
            ) : (
              <>
                <Save size={18} />
                <span>{t("profile.save")}</span>
              </>
            )}
          </button>
        )}
      </form>
    </motion.div>
  );
}
