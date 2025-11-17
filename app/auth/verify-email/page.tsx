import type { Metadata } from "next";
import { Suspense } from "react";
import { EmailVerificationForm } from "@/components/auth/email-verification-form";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "تحقق من البريد الإلكتروني | Verify Email - ROSISTA",
  description: "تحقق من بريدك الإلكتروني لإكمال التسجيل",
};

function EmailVerificationFormWrapper() {
  return <EmailVerificationForm />;
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background p-6">
          <div className="w-full max-w-md space-y-6">
            <Skeleton className="h-8 w-3/4 mx-auto" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-10 w-1/2 mx-auto" />
          </div>
        </div>
      }
    >
      <EmailVerificationFormWrapper />
    </Suspense>
  );
}

