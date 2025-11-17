"use server";

import { cookies } from "next/headers";
import type {
  UserProfile,
  UpdateProfileRequest,
  UpdateProfileResponse,
  UpdatePasswordRequest,
  UpdatePasswordResponse,
  RequestEmailUpdateResponse,
  VerifyEmailUpdateResponse,
  DeleteAccountResponse,
  SignProfilePictureUploadResponse,
  UploadProfilePictureResponse,
  Order,
} from "@/types/user";
import {
  getUserProfile,
  updateProfile,
  updatePassword,
  requestEmailUpdate,
  verifyEmailUpdate,
  deleteAccount,
  signProfilePictureUpload,
  uploadProfilePicture,
  getOrders,
} from "@/lib/api/user";
import { refreshTokenAction } from "./auth";

// Get API base URL from environment variable
const getApiBaseUrl = (): string => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not set in environment variables.");
  }

  return apiUrl;
};

// Get User Profile - قراءة accessToken من cookie
export async function getUserProfileAction(): Promise<UserProfile | null> {
  try {
    const cookieStore = await cookies();
    let accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return null;
    }

    const baseUrl = getApiBaseUrl();
    const url = `${baseUrl}/api/user/me`;

    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });

    // إذا كان التوكن منتهي الصلاحية، حاول refresh
    if (response.status === 401) {
      try {
        await refreshTokenAction();
        const newCookieStore = await cookies();
        accessToken = newCookieStore.get("accessToken")?.value;

        if (!accessToken) {
          return null;
        }

        response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          credentials: "include",
        });
      } catch {
        return null;
      }
    }

    if (!response.ok) {
      return null;
    }

    const userData = await response.json();
    return {
      id: userData._id || userData.id,
      name: userData.name,
      email: userData.email,
      username: userData.username,
      profilePicture: userData.profilePicture,
      phoneNumber: userData.phoneNumber,
      isPhoneVerified: userData.isPhoneVerified,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt,
    };
  } catch (error) {
    console.error("Get user profile action error:", error);
    return null;
  }
}

// Update Profile - قراءة accessToken من cookie
export async function updateProfileAction(
  data: UpdateProfileRequest
): Promise<UpdateProfileResponse> {
  try {
    const cookieStore = await cookies();
    let accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      throw new Error("Not authenticated");
    }

    const baseUrl = getApiBaseUrl();
    const url = `${baseUrl}/api/user/update`;

    let response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    // إذا كان التوكن منتهي الصلاحية، حاول refresh
    if (response.status === 401) {
      try {
        await refreshTokenAction();
        const newCookieStore = await cookies();
        accessToken = newCookieStore.get("accessToken")?.value;

        if (!accessToken) {
          throw new Error("Not authenticated");
        }

        response = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(data),
          credentials: "include",
        });
      } catch {
        throw new Error("Not authenticated");
      }
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to update profile");
    }

    const result = await response.json();
    return {
      message: result.message,
      user: {
        id: result.user._id || result.user.id,
        name: result.user.name,
        email: result.user.email,
        username: result.user.username,
        profilePicture: result.user.profilePicture,
        phoneNumber: result.user.phoneNumber,
        isPhoneVerified: result.user.isPhoneVerified,
        createdAt: result.user.createdAt,
        updatedAt: result.user.updatedAt,
      },
      requiresVerification: result.requiresVerification,
    };
  } catch (error) {
    console.error("Update profile action error:", error);
    throw error;
  }
}

// Update Password - قراءة accessToken من cookie
export async function updatePasswordAction(
  data: UpdatePasswordRequest
): Promise<UpdatePasswordResponse> {
  try {
    const cookieStore = await cookies();
    let accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      throw new Error("Not authenticated");
    }

    return await updatePassword(data, accessToken);
  } catch (error) {
    console.error("Update password action error:", error);
    throw error;
  }
}

// Request Email Update - قراءة accessToken من cookie
export async function requestEmailUpdateAction(
  email: string
): Promise<RequestEmailUpdateResponse> {
  try {
    const cookieStore = await cookies();
    let accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      throw new Error("Not authenticated");
    }

    return await requestEmailUpdate({ newEmail: email }, accessToken);
  } catch (error) {
    console.error("Request email update action error:", error);
    throw error;
  }
}

// Verify Email Update - قراءة accessToken من cookie
export async function verifyEmailUpdateAction(
  code: string,
  password: string
): Promise<VerifyEmailUpdateResponse> {
  try {
    const cookieStore = await cookies();
    let accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      throw new Error("Not authenticated");
    }

    return await verifyEmailUpdate({ verificationCode: code, password }, accessToken);
  } catch (error) {
    console.error("Verify email update action error:", error);
    throw error;
  }
}

// Delete Account - قراءة accessToken من cookie وحذف cookies بعد الحذف
export async function deleteAccountAction(
  password: string,
  confirmation: string
): Promise<DeleteAccountResponse> {
  try {
    const cookieStore = await cookies();
    let accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      throw new Error("Not authenticated");
    }

    const result = await deleteAccount({ password, confirmation }, accessToken);

    // حذف cookies بعد الحذف الناجح
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");

    return result;
  } catch (error) {
    console.error("Delete account action error:", error);
    throw error;
  }
}

// Sign Profile Picture Upload - قراءة accessToken من cookie
export async function signProfilePictureUploadAction(): Promise<SignProfilePictureUploadResponse> {
  try {
    const cookieStore = await cookies();
    let accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      throw new Error("Not authenticated");
    }

    return await signProfilePictureUpload(accessToken);
  } catch (error) {
    console.error("Sign profile picture upload action error:", error);
    throw error;
  }
}

// Upload Profile Picture - قراءة accessToken من cookie
export async function uploadProfilePictureAction(
  profilePictureUrl: string
): Promise<UploadProfilePictureResponse> {
  try {
    const cookieStore = await cookies();
    let accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      throw new Error("Not authenticated");
    }

    return await uploadProfilePicture({ profilePictureUrl }, accessToken);
  } catch (error) {
    console.error("Upload profile picture action error:", error);
    throw error;
  }
}

// Get Orders - قراءة accessToken من cookie
export async function getOrdersAction(): Promise<Order[]> {
  try {
    const cookieStore = await cookies();
    let accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return [];
    }

    return await getOrders(accessToken);
  } catch (error) {
    console.error("Get orders action error:", error);
    return [];
  }
}

