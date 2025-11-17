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
import type { User, LoginRequest, SignupRequest, EmailVerificationRequest, ForgotPasswordRequest } from "@/types/auth";
import { loginAction, verifyEmailAction, logoutAction, getUserAction, refreshTokenAction, resetPasswordAction, sendPhoneVerificationAction, verifyPhoneNumberAction, loginWithPhoneAction, verifyPhoneLoginAction, saveGoogleAccessTokenAction } from "@/app/actions/auth";
import { signup, resendCode, requestPasswordReset } from "@/lib/api/auth";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginRequest) => Promise<void>;
  signup: (data: SignupRequest) => Promise<void>;
  logout: () => Promise<void>;
  verifyEmail: (data: EmailVerificationRequest) => Promise<void>;
  resendCode: (email: string) => Promise<void>;
  requestPasswordReset: (data: ForgotPasswordRequest) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  sendPhoneVerification: (phoneNumber: string) => Promise<void>;
  verifyPhoneNumber: (code: string) => Promise<void>;
  loginWithPhone: (phoneNumber: string) => Promise<void>;
  verifyPhoneLogin: (phoneNumber: string, code: string) => Promise<void>;
  refreshToken: () => Promise<void>;
  checkAuthStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { t } = useTranslation();

  const isAuthenticated = !!user;

  // Check if user is authenticated on app load
  useEffect(() => {
    checkAuthStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkAuthStatus = async () => {
    try {
      const userData = await getUserAction();
      if (userData) {
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (data: LoginRequest) => {
    try {
      await loginAction(data);
      // بعد تسجيل الدخول الناجح، جلب بيانات المستخدم
      const userData = await getUserAction();
      if (userData) {
        setUser(userData);
        router.push("/");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      throw new Error(error.message || t("auth.errors.loginFailed"));
    }
  };

  const handleSignup = async (data: SignupRequest) => {
    try {
      await signup(data);
      // بعد التسجيل الناجح، الانتقال إلى صفحة التحقق من البريد
      router.push(`/auth/verify-email?email=${encodeURIComponent(data.email)}`);
    } catch (error: any) {
      console.error("Signup error:", error);
      throw new Error(error.message || t("auth.errors.signupFailed"));
    }
  };

  const handleVerifyEmail = async (data: EmailVerificationRequest) => {
    try {
      const result = await verifyEmailAction(data);
      // بعد التحقق الناجح، جلب بيانات المستخدم
      const userData = await getUserAction();
      if (userData) {
        setUser(userData);
        // إذا كان يحتاج إلى إعداد الهاتف، الانتقال إلى صفحة إعداد الهاتف
        if (result.requiresPhoneSetup) {
          router.push("/auth/phone-setup");
        } else {
          router.push("/");
        }
      }
    } catch (error: any) {
      console.error("Verify email error:", error);
      throw new Error(error.message || t("auth.errors.verificationFailed"));
    }
  };

  const handleResendCode = async (email: string) => {
    try {
      await resendCode(email);
    } catch (error: any) {
      console.error("Resend code error:", error);
      throw new Error(error.message || t("auth.errors.resendFailed"));
    }
  };

  const handleRequestPasswordReset = async (data: ForgotPasswordRequest) => {
    try {
      await requestPasswordReset(data);
    } catch (error: any) {
      console.error("Request password reset error:", error);
      throw new Error(error.message || t("auth.errors.passwordResetFailed"));
    }
  };

  const handleResetPassword = async (token: string, newPassword: string) => {
    try {
      await resetPasswordAction(token, newPassword);
      router.push("/auth/login");
    } catch (error: any) {
      console.error("Reset password error:", error);
      throw new Error(error.message || t("auth.errors.resetPasswordFailed"));
    }
  };

  const handleSendPhoneVerification = async (phoneNumber: string) => {
    try {
      await sendPhoneVerificationAction(phoneNumber);
    } catch (error: any) {
      console.error("Send phone verification error:", error);
      throw new Error(error.message || t("auth.errors.sendPhoneVerificationFailed"));
    }
  };

  const handleVerifyPhoneNumber = async (code: string) => {
    try {
      await verifyPhoneNumberAction(code);
      // بعد التحقق الناجح، جلب بيانات المستخدم مرة أخرى
      const userData = await getUserAction();
      if (userData) {
        setUser(userData);
      }
      router.push("/");
    } catch (error: any) {
      console.error("Verify phone number error:", error);
      throw new Error(error.message || t("auth.errors.phoneVerificationFailed"));
    }
  };

  const handleLoginWithPhone = async (phoneNumber: string) => {
    try {
      await loginWithPhoneAction(phoneNumber);
    } catch (error: any) {
      console.error("Login with phone error:", error);
      throw new Error(error.message || t("auth.errors.phoneLoginFailed"));
    }
  };

  const handleVerifyPhoneLogin = async (phoneNumber: string, code: string) => {
    try {
      await verifyPhoneLoginAction(phoneNumber, code);
      // بعد التحقق الناجح، جلب بيانات المستخدم
      const userData = await getUserAction();
      if (userData) {
        setUser(userData);
      }
      router.push("/");
    } catch (error: any) {
      console.error("Verify phone login error:", error);
      throw new Error(error.message || t("auth.errors.verifyPhoneLoginFailed"));
    }
  };

  const handleLogout = async () => {
    try {
      await logoutAction();
      setUser(null);
      router.push("/auth/login");
    } catch (error: any) {
      console.error("Logout error:", error);
      throw new Error(error.message || "Logout failed");
    }
  };

  const handleRefreshToken = async () => {
    try {
      await refreshTokenAction();
      // بعد refresh، جلب بيانات المستخدم مرة أخرى
      const userData = await getUserAction();
      if (userData) {
        setUser(userData);
      }
    } catch (error) {
      console.error("Refresh token error:", error);
      // إذا فشل refresh، تسجيل الخروج
      setUser(null);
      router.push("/auth/login");
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    signup: handleSignup,
    logout: handleLogout,
    verifyEmail: handleVerifyEmail,
    resendCode: handleResendCode,
    requestPasswordReset: handleRequestPasswordReset,
    resetPassword: handleResetPassword,
    sendPhoneVerification: handleSendPhoneVerification,
    verifyPhoneNumber: handleVerifyPhoneNumber,
    loginWithPhone: handleLoginWithPhone,
    verifyPhoneLogin: handleVerifyPhoneLogin,
    refreshToken: handleRefreshToken,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

