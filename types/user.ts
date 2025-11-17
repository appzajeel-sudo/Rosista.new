// User Types

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  username?: string;
  profilePicture?: string;
  phoneNumber?: string;
  isPhoneVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileRequest {
  name?: string;
  username?: string;
  phoneNumber?: string;
}

export interface UpdateProfileResponse {
  message: string;
  user: UserProfile;
  requiresVerification?: boolean;
}

export interface UpdatePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface UpdatePasswordResponse {
  message: string;
}

export interface RequestEmailUpdateRequest {
  newEmail: string;
}

export interface RequestEmailUpdateResponse {
  message: string;
}

export interface VerifyEmailUpdateRequest {
  verificationCode: string;
  password: string;
}

export interface VerifyEmailUpdateResponse {
  message: string;
}

export interface DeleteAccountRequest {
  password: string;
  confirmation: string;
}

export interface DeleteAccountResponse {
  message: string;
}

export interface SignProfilePictureUploadResponse {
  signature: string;
  timestamp: number;
}

export interface UploadProfilePictureRequest {
  profilePictureUrl: string;
}

export interface UploadProfilePictureResponse {
  message: string;
  profilePicture: string;
}

export interface OrderItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface ShippingAddress {
  name: string;
  phone: string;
  address: string;
  city: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  trackingNumber?: string;
}

