"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import type { UserProfile, UpdateProfileRequest } from "@/types/user";
import {
  getUserProfileAction,
  updateProfileAction,
  updatePasswordAction,
  requestEmailUpdateAction,
  verifyEmailUpdateAction,
  deleteAccountAction,
  signProfilePictureUploadAction,
  uploadProfilePictureAction,
} from "@/app/actions/user";
import { useAuth } from "./AuthContext";

interface UserContextType {
  profile: UserProfile | null;
  isLoading: boolean;
  updateProfile: (data: UpdateProfileRequest) => Promise<void>;
  updatePassword: (oldPassword: string, newPassword: string) => Promise<void>;
  uploadProfilePicture: (file: File) => Promise<void>;
  requestEmailUpdate: (newEmail: string) => Promise<void>;
  verifyEmailUpdate: (
    verificationCode: string,
    password: string
  ) => Promise<void>;
  deleteAccount: (password: string, confirmation: string) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, user, checkAuthStatus } = useAuth();
  const router = useRouter();
  const { t } = useTranslation();

  // Load profile when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user && !profile) {
      refreshProfile();
    } else if (!isAuthenticated) {
      setProfile(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user]);

  const refreshProfile = async () => {
    if (!isAuthenticated) return;

    setIsLoading(true);
    try {
      const profileData = await getUserProfileAction();
      if (profileData) {
        setProfile(profileData);
      }
    } catch (error) {
      console.error("Error refreshing profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: UpdateProfileRequest) => {
    setIsLoading(true);
    try {
      const result = await updateProfileAction(data);
      setProfile(result.user);

      // تحديث AuthContext user state
      await checkAuthStatus();

      // إذا كان يتطلب التحقق من الهاتف
      if (result.requiresVerification) {
        router.push("/auth/verify-phone");
      }
    } catch (error: any) {
      console.error("Update profile error:", error);
      throw new Error(error.message || t("profile.updateError"));
    } finally {
      setIsLoading(false);
    }
  };

  const updatePassword = async (oldPassword: string, newPassword: string) => {
    setIsLoading(true);
    try {
      await updatePasswordAction({ oldPassword, newPassword });
    } catch (error: any) {
      console.error("Update password error:", error);
      throw new Error(error.message || t("profile.passwordUpdate.updateError"));
    } finally {
      setIsLoading(false);
    }
  };

  const uploadProfilePicture = async (file: File) => {
    setIsLoading(true);
    try {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error("File size too large (max 5MB)");
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        throw new Error("Please select a valid image file");
      }

      // Get signature for Cloudinary upload
      const { signature, timestamp } = await signProfilePictureUploadAction();

      // Upload to Cloudinary
      const cloudinaryCloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const cloudinaryApiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;

      if (!cloudinaryCloudName || !cloudinaryApiKey) {
        throw new Error("Cloudinary configuration is missing");
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("signature", signature);
      formData.append("timestamp", timestamp.toString());
      formData.append("api_key", cloudinaryApiKey);
      formData.append("folder", "profile_pictures");

      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload image to Cloudinary");
      }

      const uploadResult = await uploadResponse.json();

      // Update profile with new image URL
      const result = await uploadProfilePictureAction(uploadResult.secure_url);
      setProfile((prev) =>
        prev ? { ...prev, profilePicture: result.profilePicture } : null
      );

      // تحديث AuthContext user state
      await checkAuthStatus();
    } catch (error: any) {
      console.error("Upload profile picture error:", error);
      throw new Error(error.message || "Failed to upload profile picture");
    } finally {
      setIsLoading(false);
    }
  };

  const requestEmailUpdate = async (newEmail: string) => {
    setIsLoading(true);
    try {
      await requestEmailUpdateAction(newEmail);
    } catch (error: any) {
      console.error("Request email update error:", error);
      throw new Error(error.message || t("profile.emailUpdate.updateError"));
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmailUpdate = async (
    verificationCode: string,
    password: string
  ) => {
    setIsLoading(true);
    try {
      await verifyEmailUpdateAction(verificationCode, password);
      await refreshProfile();
      await checkAuthStatus();
    } catch (error: any) {
      console.error("Verify email update error:", error);
      throw new Error(error.message || t("profile.emailUpdate.updateError"));
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAccount = async (password: string, confirmation: string) => {
    setIsLoading(true);
    try {
      await deleteAccountAction(password, confirmation);
      setProfile(null);
      router.push("/auth/login");
    } catch (error: any) {
      console.error("Delete account error:", error);
      throw new Error(error.message || t("profile.deleteAccount.deleteError"));
    } finally {
      setIsLoading(false);
    }
  };

  const value: UserContextType = {
    profile,
    isLoading,
    updateProfile,
    updatePassword,
    uploadProfilePicture,
    requestEmailUpdate,
    verifyEmailUpdate,
    deleteAccount,
    refreshProfile,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
