// API Service for Authentication
import type {
  SignupRequest,
  SignupResponse,
  ResendCodeResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  SendPhoneVerificationRequest,
  SendPhoneVerificationResponse,
  VerifyPhoneNumberRequest,
  VerifyPhoneNumberResponse,
  PhoneLoginRequest,
  PhoneLoginResponse,
  VerifyPhoneLoginRequest,
  VerifyPhoneLoginResponse,
} from "@/types/auth";

// Get API base URL from environment variable
const getApiBaseUrl = (): string => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error(
      "NEXT_PUBLIC_API_URL is not set in environment variables. Please add it to your .env.local file."
    );
  }

  return apiUrl;
};

// Signup - لا يحتاج cookies
export async function signup(data: SignupRequest): Promise<SignupResponse> {
  try {
    const baseUrl = getApiBaseUrl();
    const url = `${baseUrl}/api/auth/signup`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Signup failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
}

// Resend verification code - لا يحتاج cookies
export async function resendCode(email: string): Promise<ResendCodeResponse> {
  try {
    const baseUrl = getApiBaseUrl();
    const url = `${baseUrl}/api/auth/resend-code`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to resend code");
    }

    return await response.json();
  } catch (error) {
    console.error("Resend code error:", error);
    throw error;
  }
}

// Request password reset - لا يحتاج cookies
export async function requestPasswordReset(
  data: ForgotPasswordRequest
): Promise<ForgotPasswordResponse> {
  try {
    const baseUrl = getApiBaseUrl();
    const url = `${baseUrl}/api/auth/password-reset`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to request password reset");
    }

    return await response.json();
  } catch (error) {
    console.error("Request password reset error:", error);
    throw error;
  }
}

// Reset password - لا يحتاج cookies
export async function resetPassword(
  data: ResetPasswordRequest
): Promise<ResetPasswordResponse> {
  try {
    const baseUrl = getApiBaseUrl();
    const url = `${baseUrl}/api/auth/reset-password`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to reset password");
    }

    return await response.json();
  } catch (error) {
    console.error("Reset password error:", error);
    throw error;
  }
}

// Send phone verification - يحتاج Bearer token
export async function sendPhoneVerification(
  data: SendPhoneVerificationRequest,
  accessToken: string
): Promise<SendPhoneVerificationResponse> {
  try {
    const baseUrl = getApiBaseUrl();
    const url = `${baseUrl}/api/auth/send-phone-verification`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to send phone verification");
    }

    return await response.json();
  } catch (error) {
    console.error("Send phone verification error:", error);
    throw error;
  }
}

// Verify phone number - يحتاج Bearer token
export async function verifyPhoneNumber(
  data: VerifyPhoneNumberRequest,
  accessToken: string
): Promise<VerifyPhoneNumberResponse> {
  try {
    const baseUrl = getApiBaseUrl();
    const url = `${baseUrl}/api/auth/verify-phone`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to verify phone number");
    }

    return await response.json();
  } catch (error) {
    console.error("Verify phone number error:", error);
    throw error;
  }
}

// Login with phone - لا يحتاج cookies
export async function loginWithPhone(
  data: PhoneLoginRequest
): Promise<PhoneLoginResponse> {
  try {
    const baseUrl = getApiBaseUrl();
    const url = `${baseUrl}/api/auth/login-phone`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to login with phone");
    }

    return await response.json();
  } catch (error) {
    console.error("Login with phone error:", error);
    throw error;
  }
}

// Verify phone login - لا يحتاج cookies، لكن يعيد accessToken
export async function verifyPhoneLogin(
  data: VerifyPhoneLoginRequest
): Promise<VerifyPhoneLoginResponse> {
  try {
    const baseUrl = getApiBaseUrl();
    const url = `${baseUrl}/api/auth/verify-phone-login`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to verify phone login");
    }

    return await response.json();
  } catch (error) {
    console.error("Verify phone login error:", error);
    throw error;
  }
}
