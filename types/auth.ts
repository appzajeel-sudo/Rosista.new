// Authentication Types

export interface User {
  id: string;
  name: string;
  email: string;
  username?: string;
  profilePicture?: string;
  isVerified: boolean;
  isPhoneVerified: boolean;
  phoneNumber?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  captchaToken: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  captchaToken: string;
}

export interface EmailVerificationRequest {
  email: string;
  verificationCode: string;
}

export interface AuthResponse {
  accessToken?: string;
  message?: string;
  requiresPhoneSetup?: boolean;
}

export interface LoginResponse {
  accessToken: string;
}

export interface SignupResponse {
  message: string;
}

export interface VerifyEmailResponse {
  accessToken: string;
  message: string;
  requiresPhoneSetup: boolean;
}

export interface ResendCodeResponse {
  message: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
}

export interface ForgotPasswordRequest {
  email: string;
  captchaToken: string;
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  message: string;
}

export interface SendPhoneVerificationRequest {
  phoneNumber: string;
}

export interface SendPhoneVerificationResponse {
  message: string;
  phoneNumber: string;
}

export interface VerifyPhoneNumberRequest {
  code: string;
}

export interface VerifyPhoneNumberResponse {
  message: string;
  phoneNumber: string;
}

export interface PhoneLoginRequest {
  phoneNumber: string;
}

export interface PhoneLoginResponse {
  message: string;
  phoneNumber: string;
}

export interface VerifyPhoneLoginRequest {
  phoneNumber: string;
  code: string;
}

export interface VerifyPhoneLoginResponse {
  accessToken: string;
  message: string;
}
