import { Suspense } from "react";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { Skeleton } from "@/components/ui/skeleton";

function ResetPasswordFormWrapper() {
  return <ResetPasswordForm />;
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen">
          {/* Left Side - Brand Section */}
          <div className="relative hidden lg:flex lg:w-2/5 flex-col justify-center p-12 bg-neutral-900"></div>

          {/* Right Side - Form Section */}
          <div className="flex w-full items-center justify-center bg-white p-6 dark:bg-neutral-950 lg:w-3/5">
            <div className="w-full max-w-md">
              <div className="mb-8 text-center lg:hidden">
                <Skeleton className="mb-2 h-10 w-32 mx-auto" />
              </div>
              <div className="mb-8">
                <Skeleton className="mb-6 h-12 w-12 rounded-full" />
                <Skeleton className="mb-2 h-8 w-3/4" />
                <Skeleton className="h-4 w-full" />
              </div>
              <div className="space-y-5">
                <div>
                  <Skeleton className="mb-2 h-4 w-1/4" />
                  <Skeleton className="h-12 w-full" />
                </div>
                <div>
                  <Skeleton className="mb-2 h-4 w-1/4" />
                  <Skeleton className="h-12 w-full" />
                </div>
                <Skeleton className="h-12 w-full" />
              </div>
              <div className="mt-6 text-center">
                <Skeleton className="h-4 w-1/2 mx-auto" />
              </div>
            </div>
          </div>
        </div>
      }
    >
      <ResetPasswordFormWrapper />
    </Suspense>
  );
}

