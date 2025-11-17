// API Service for User Management
import type {
  UserProfile,
  UpdateProfileRequest,
  UpdateProfileResponse,
  UpdatePasswordRequest,
  UpdatePasswordResponse,
  RequestEmailUpdateRequest,
  RequestEmailUpdateResponse,
  VerifyEmailUpdateRequest,
  VerifyEmailUpdateResponse,
  DeleteAccountRequest,
  DeleteAccountResponse,
  SignProfilePictureUploadResponse,
  UploadProfilePictureRequest,
  UploadProfilePictureResponse,
  Order,
} from "@/types/user";

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

// Get User Profile - يحتاج Bearer token
export async function getUserProfile(
  accessToken: string
): Promise<UserProfile> {
  try {
    const baseUrl = getApiBaseUrl();
    const url = `${baseUrl}/api/user/me`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to get user profile");
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
    console.error("Get user profile error:", error);
    throw error;
  }
}

// Update Profile - يحتاج Bearer token
export async function updateProfile(
  data: UpdateProfileRequest,
  accessToken: string
): Promise<UpdateProfileResponse> {
  try {
    const baseUrl = getApiBaseUrl();
    const url = `${baseUrl}/api/user/update`;

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

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
    console.error("Update profile error:", error);
    throw error;
  }
}

// Update Password - يحتاج Bearer token
export async function updatePassword(
  data: UpdatePasswordRequest,
  accessToken: string
): Promise<UpdatePasswordResponse> {
  try {
    const baseUrl = getApiBaseUrl();
    const url = `${baseUrl}/api/user/update-password`;

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || errorData.message || "Failed to update password");
    }

    return await response.json();
  } catch (error) {
    console.error("Update password error:", error);
    throw error;
  }
}

// Request Email Update - يحتاج Bearer token
export async function requestEmailUpdate(
  data: RequestEmailUpdateRequest,
  accessToken: string
): Promise<RequestEmailUpdateResponse> {
  try {
    const baseUrl = getApiBaseUrl();
    const url = `${baseUrl}/api/user/request-email-update`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to request email update");
    }

    return await response.json();
  } catch (error) {
    console.error("Request email update error:", error);
    throw error;
  }
}

// Verify Email Update - يحتاج Bearer token
export async function verifyEmailUpdate(
  data: VerifyEmailUpdateRequest,
  accessToken: string
): Promise<VerifyEmailUpdateResponse> {
  try {
    const baseUrl = getApiBaseUrl();
    const url = `${baseUrl}/api/user/verify-email-update`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to verify email update");
    }

    return await response.json();
  } catch (error) {
    console.error("Verify email update error:", error);
    throw error;
  }
}

// Delete Account - يحتاج Bearer token
export async function deleteAccount(
  data: DeleteAccountRequest,
  accessToken: string
): Promise<DeleteAccountResponse> {
  try {
    const baseUrl = getApiBaseUrl();
    const url = `${baseUrl}/api/user/delete-account`;

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to delete account");
    }

    return await response.json();
  } catch (error) {
    console.error("Delete account error:", error);
    throw error;
  }
}

// Sign Profile Picture Upload - يحتاج Bearer token
export async function signProfilePictureUpload(
  accessToken: string
): Promise<SignProfilePictureUploadResponse> {
  try {
    const baseUrl = getApiBaseUrl();
    const url = `${baseUrl}/api/user/sign-profile-picture-upload`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to sign profile picture upload");
    }

    return await response.json();
  } catch (error) {
    console.error("Sign profile picture upload error:", error);
    throw error;
  }
}

// Upload Profile Picture - يحتاج Bearer token
export async function uploadProfilePicture(
  data: UploadProfilePictureRequest,
  accessToken: string
): Promise<UploadProfilePictureResponse> {
  try {
    const baseUrl = getApiBaseUrl();
    const url = `${baseUrl}/api/user/upload-profile-picture`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to upload profile picture");
    }

    return await response.json();
  } catch (error) {
    console.error("Upload profile picture error:", error);
    throw error;
  }
}

// Get Orders - placeholder (إذا لم يكن API موجوداً)
export async function getOrders(accessToken: string): Promise<Order[]> {
  try {
    const baseUrl = getApiBaseUrl();
    const url = `${baseUrl}/api/user/orders`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });

    // إذا كان API غير موجود، إرجاع empty array
    if (response.status === 404) {
      return [];
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to get orders");
    }

    const data = await response.json();
    return Array.isArray(data) ? data : data.orders || [];
  } catch (error) {
    console.error("Get orders error:", error);
    // إرجاع empty array بدلاً من throw error
    return [];
  }
}

