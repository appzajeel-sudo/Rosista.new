"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Shield,
  Mail,
  Trash2,
  CheckCircle,
  Calendar,
  Settings,
  Award,
  Heart,
  Package,
  ChevronRight,
} from "lucide-react";
import { useUser } from "@/context/UserContext";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import Image from "next/image";
import { ProfileForm } from "./profile-form";
import { PasswordUpdateForm } from "./password-update-form";
import { EmailUpdateForm } from "./email-update-form";
import { DeleteAccountForm } from "./delete-account-form";

export function ProfilePage() {
  const { i18n, t } = useTranslation();
  const isRtl = i18n.language === "ar";
  const { profile } = useUser();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");

  // Stats data
  const stats = [
    {
      icon: Package,
      label: t("profile.stats.totalOrders"),
      value: "12",
      color: "text-neutral-900 dark:text-white",
    },
    {
      icon: Heart,
      label: t("profile.stats.favorites"),
      value: "8",
      color: "text-neutral-900 dark:text-white",
    },
    {
      icon: Award,
      label: t("profile.stats.loyaltyPoints"),
      value: "1,250",
      color: "text-neutral-900 dark:text-white",
    },
    {
      icon: Package,
      label: t("profile.stats.cartItems"),
      value: "3",
      color: "text-neutral-900 dark:text-white",
    },
  ];

  const tabs = [
    {
      id: "profile",
      label: t("profile.tabs.profile"),
      icon: User,
    },
    {
      id: "password",
      label: t("profile.tabs.password"),
      icon: Shield,
    },
    {
      id: "email",
      label: t("profile.tabs.email"),
      icon: Mail,
    },
    {
      id: "delete",
      label: t("profile.tabs.delete"),
      icon: Trash2,
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24 pb-8 lg:pb-12">
        {/* Decorative Line - Top */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center mb-12"
        >
          <div className="h-px w-12 bg-neutral-300 dark:bg-neutral-700"></div>
          <div className="mx-4 w-2 h-2 rounded-full bg-neutral-900 dark:bg-white"></div>
          <div className="h-px flex-1 max-w-xs bg-neutral-300 dark:bg-neutral-700"></div>
          <div className="mx-2 w-1 h-4 bg-neutral-900 dark:bg-white"></div>
          <div className="h-px flex-1 max-w-xs bg-neutral-300 dark:bg-neutral-700"></div>
          <div className="mx-4 w-2 h-2 rounded-full bg-neutral-900 dark:bg-white"></div>
          <div className="h-px w-12 bg-neutral-300 dark:bg-neutral-700"></div>
        </motion.div>

        {/* Profile Header - Compact */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 lg:mb-12"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-8 border-b border-neutral-200 dark:border-neutral-800">
            {/* Profile Picture */}
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-neutral-900 dark:border-white">
                {profile?.profilePicture ? (
                  <Image
                    src={profile.profilePicture}
                    alt={profile.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
                    <User size={40} className="text-neutral-400 dark:text-neutral-600" />
                  </div>
                )}
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1">
              <h1
                className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white mb-2"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                }}
              >
                {profile?.name || user?.name}
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm uppercase tracking-wider mb-3" style={{ letterSpacing: "0.1em" }}>
                @{profile?.username || "username"}
              </p>
              
              {/* Status Badges */}
              <div className="flex flex-wrap items-center gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-neutral-900 dark:bg-white rounded-full"></div>
                  <span className="text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                    {t("profile.accountStatus.verified")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${
                      profile?.isPhoneVerified
                        ? "bg-neutral-900 dark:bg-white"
                        : "bg-neutral-400 dark:text-neutral-600"
                    }`}
                  ></div>
                  <span className="text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                    {profile?.isPhoneVerified
                      ? t("profile.accountStatus.phoneVerified")
                      : t("profile.accountStatus.notVerified")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={12} className="text-neutral-400 dark:text-neutral-600" />
                  <span className="text-neutral-600 dark:text-neutral-400">
                    {isRtl ? "عضو منذ" : "Member since"}{" "}
                    {profile?.createdAt
                      ? new Date(profile.createdAt).getUTCFullYear()
                      : "2025"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 lg:mb-12"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                whileHover={{ y: -2 }}
                className="border border-neutral-200 dark:border-neutral-800 p-4 lg:p-6 bg-white dark:bg-black group cursor-pointer transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 border border-neutral-200 dark:border-neutral-800 rounded-full flex items-center justify-center group-hover:border-neutral-900 dark:group-hover:border-white transition-colors duration-300">
                    <Icon size={18} className={stat.color} />
                  </div>
                </div>
                <p
                  className="text-2xl lg:text-3xl font-bold text-neutral-900 dark:text-white mb-1"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 700,
                  }}
                >
                  {stat.value}
                </p>
                <p className="text-neutral-600 dark:text-neutral-400 text-xs uppercase tracking-wider">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Horizontal Tabs Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-8"
        >
          <div className="border-b border-neutral-200 dark:border-neutral-800">
            <nav className="flex overflow-x-auto scrollbar-hide -mb-px">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 text-sm font-medium uppercase tracking-wider transition-all duration-300 whitespace-nowrap border-b-2 ${
                      activeTab === tab.id
                        ? "border-neutral-900 dark:border-white text-neutral-900 dark:text-white"
                        : "border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:border-neutral-300 dark:hover:border-neutral-700"
                    }`}
                    style={{ letterSpacing: "0.1em" }}
                  >
                    <Icon size={18} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {activeTab === "profile" && <ProfileForm />}
              {activeTab === "password" && <PasswordUpdateForm />}
              {activeTab === "email" && <EmailUpdateForm />}
              {activeTab === "delete" && <DeleteAccountForm />}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Quick Actions Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-neutral-600 dark:text-neutral-400 text-xs uppercase tracking-wider" style={{ letterSpacing: "0.1em" }}>
              {isRtl
                ? "نحن نحترم خصوصيتك ونحافظ على أمان بياناتك"
                : "We respect your privacy and keep your data secure"}
            </p>
            <Link
              href="/orders"
              className="flex items-center gap-2 text-neutral-900 dark:text-white hover:opacity-70 transition-opacity text-sm uppercase tracking-wider"
              style={{ letterSpacing: "0.1em" }}
            >
              <span>{t("orders.title")}</span>
              <ChevronRight size={16} className={isRtl ? "rotate-180" : ""} />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
