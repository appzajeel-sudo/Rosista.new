"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requirePhoneVerification?: boolean;
  redirectTo?: string;
}

export function ProtectedRoute({
  children,
  requireAuth = true,
  requirePhoneVerification = false,
  redirectTo,
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (requireAuth && !isAuthenticated) {
      router.push(redirectTo || "/auth/login");
      return;
    }

    if (
      requirePhoneVerification &&
      isAuthenticated &&
      user &&
      !user.isPhoneVerified
    ) {
      router.push(redirectTo || "/auth/phone-setup");
      return;
    }
  }, [isAuthenticated, isLoading, user, requireAuth, requirePhoneVerification, redirectTo, router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" />
      </div>
    );
  }

  // If authentication is required but user is not authenticated, don't render children
  if (requireAuth && !isAuthenticated) {
    return null;
  }

  // If phone verification is required but user hasn't verified, don't render children
  if (
    requirePhoneVerification &&
    isAuthenticated &&
    user &&
    !user.isPhoneVerified
  ) {
    return null;
  }

  return <>{children}</>;
}

