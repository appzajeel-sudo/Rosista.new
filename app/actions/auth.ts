"use server";

import { cookies } from "next/headers";
import type {
  LoginRequest,
  LoginResponse,
  EmailVerificationRequest,
  VerifyEmailResponse,
  User,
  RefreshTokenResponse,
  ResetPasswordResponse,
  SendPhoneVerificationResponse,
  VerifyPhoneNumberResponse,
  PhoneLoginResponse,
  VerifyPhoneLoginResponse,
} from "@/types/auth";
import {
  resetPassword,
  sendPhoneVerification,
  verifyPhoneNumber,
  loginWithPhone,
  verifyPhoneLogin,
} from "@/lib/api/auth";

// Get API base URL from environment variable
const getApiBaseUrl = (): string => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not set in environment variables.");
  }

  return apiUrl;
};

// Login - حفظ accessToken في httpOnly cookie
export async function loginAction(data: LoginRequest): Promise<LoginResponse> {
  try {
    const baseUrl = getApiBaseUrl();
    const url = `${baseUrl}/api/auth/login`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include", // مهم لإرسال واستقبال cookies
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Login failed");
    }

    const result: LoginResponse = await response.json();

    // حفظ accessToken في httpOnly cookie
    if (result.accessToken) {
      const cookieStore = await cookies();
      cookieStore.set("accessToken", result.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 10, // 10 days (مطابق للـ backend)
        path: "/",
      });
    }

    return result;
  } catch (error) {
    console.error("Login action error:", error);
    throw error;
  }
}

// Verify Email - حفظ accessToken في httpOnly cookie
export async function verifyEmailAction(
  data: EmailVerificationRequest
): Promise<VerifyEmailResponse> {
  try {
    const baseUrl = getApiBaseUrl();
    const url = `${baseUrl}/api/auth/verify-email`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Email verification failed");
    }

    const result: VerifyEmailResponse = await response.json();

    // حفظ accessToken في httpOnly cookie
    if (result.accessToken) {
      const cookieStore = await cookies();
      cookieStore.set("accessToken", result.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 10, // 10 days
        path: "/",
      });
    }

    return result;
  } catch (error) {
    console.error("Verify email action error:", error);
    throw error;
  }
}

// Get User - قراءة accessToken من cookie
export async function getUserAction(): Promise<User | null> {
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
        // قراءة التوكن الجديد
        const newCookieStore = await cookies();
        accessToken = newCookieStore.get("accessToken")?.value;

        if (!accessToken) {
          return null;
        }

        // إعادة المحاولة بعد refresh
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

    // تحويل البيانات إلى User interface
    return {
      id: userData._id || userData.id,
      name: userData.name,
      email: userData.email,
      username: userData.username,
      profilePicture: userData.profilePicture,
      isVerified: userData.isVerified,
      isPhoneVerified: userData.isPhoneVerified,
      phoneNumber: userData.phoneNumber,
    };
  } catch (error) {
    console.error("Get user action error:", error);
    return null;
  }
}

// Refresh Token - استخدام refreshToken من cookie
export async function refreshTokenAction(): Promise<RefreshTokenResponse> {
  try {
    const baseUrl = getApiBaseUrl();
    const url = `${baseUrl}/api/auth/refresh-token`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // مهم لإرسال refreshToken cookie
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Token refresh failed");
    }

    const result: RefreshTokenResponse = await response.json();

    // حفظ accessToken الجديد في httpOnly cookie
    if (result.accessToken) {
      const cookieStore = await cookies();
      cookieStore.set("accessToken", result.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 10, // 10 days
        path: "/",
      });
    }

    return result;
  } catch (error) {
    console.error("Refresh token action error:", error);
    throw error;
  }
}

// Logout - حذف جميع cookies
export async function logoutAction(): Promise<void> {
  try {
    const cookieStore = await cookies();

    // حذف accessToken
    cookieStore.delete("accessToken");

    // حذف refreshToken (إذا كان موجوداً)
    cookieStore.delete("refreshToken");

    // استدعاء backend logout (اختياري)
    try {
      const baseUrl = getApiBaseUrl();
      const url = `${baseUrl}/api/auth/logout`;

      await fetch(url, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      // تجاهل الأخطاء في logout من backend
      console.warn("Backend logout failed:", error);
    }
  } catch (error) {
    console.error("Logout action error:", error);
    throw error;
  }
}

// Reset Password - لا يحتاج cookies
export async function resetPasswordAction(
  token: string,
  newPassword: string
): Promise<ResetPasswordResponse> {
  try {
    return await resetPassword({ token, newPassword });
  } catch (error) {
    console.error("Reset password action error:", error);
    throw error;
  }
}

// Send Phone Verification - قراءة accessToken من cookie
export async function sendPhoneVerificationAction(
  phoneNumber: string
): Promise<SendPhoneVerificationResponse> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      throw new Error("Not authenticated");
    }

    return await sendPhoneVerification({ phoneNumber }, accessToken);
  } catch (error) {
    console.error("Send phone verification action error:", error);
    throw error;
  }
}

// Verify Phone Number - قراءة accessToken من cookie
export async function verifyPhoneNumberAction(
  code: string
): Promise<VerifyPhoneNumberResponse> {
  try {
    const cookieStore = await cookies();
    let accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      throw new Error("Not authenticated");
    }

    const baseUrl = getApiBaseUrl();
    const url = `${baseUrl}/api/auth/verify-phone`;

    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ code }),
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
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ code }),
          credentials: "include",
        });
      } catch {
        throw new Error("Not authenticated");
      }
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to verify phone number");
    }

    return await response.json();
  } catch (error) {
    console.error("Verify phone number action error:", error);
    throw error;
  }
}

// Login with Phone - لا يحتاج cookies
export async function loginWithPhoneAction(
  phoneNumber: string
): Promise<PhoneLoginResponse> {
  try {
    return await loginWithPhone({ phoneNumber });
  } catch (error) {
    console.error("Login with phone action error:", error);
    throw error;
  }
}

// Verify Phone Login - حفظ accessToken في httpOnly cookie
export async function verifyPhoneLoginAction(
  phoneNumber: string,
  code: string
): Promise<VerifyPhoneLoginResponse> {
  try {
    const baseUrl = getApiBaseUrl();
    const url = `${baseUrl}/api/auth/verify-phone-login`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phoneNumber, code }),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to verify phone login");
    }

    const result: VerifyPhoneLoginResponse = await response.json();

    // حفظ accessToken في httpOnly cookie
    if (result.accessToken) {
      const cookieStore = await cookies();
      cookieStore.set("accessToken", result.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 10, // 10 days
        path: "/",
      });
    }

    return result;
  } catch (error) {
    console.error("Verify phone login action error:", error);
    throw error;
  }
}

// Save Google Access Token - حفظ accessToken في httpOnly cookie
export async function saveGoogleAccessTokenAction(
  accessToken: string
): Promise<void> {
  try {
    const cookieStore = await cookies();
    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 10, // 10 days
      path: "/",
    });
  } catch (error) {
    console.error("Save Google access token action error:", error);
    throw error;
  }
}
