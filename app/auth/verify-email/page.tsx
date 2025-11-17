import type { Metadata } from "next";
import { Suspense } from "react";
import { EmailVerificationForm } from "@/components/auth/email-verification-form";

export const metadata: Metadata = {
  title: "تحقق من البريد الإلكتروني | Verify Email - ROSISTA",
  description: "تحقق من بريدك الإلكتروني لإكمال التسجيل",
};

function EmailVerificationFormWrapper() {
  return <EmailVerificationForm />;
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <EmailVerificationFormWrapper />
    </Suspense>
  );
}

