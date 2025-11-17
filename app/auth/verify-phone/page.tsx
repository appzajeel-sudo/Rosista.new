import { Suspense } from "react";
import { PhoneVerificationForm } from "@/components/auth/phone-verification-form";
import { Skeleton } from "@/components/ui/skeleton";

function PhoneVerificationFormWrapper() {
  return <PhoneVerificationForm />;
}

export default function PhoneVerificationPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-neutral-50 p-4 dark:bg-neutral-950">
          <div className="w-full max-w-md">
            <div className="p-8 sm:p-10">
              <div className="mb-8 text-center">
                <Skeleton className="mx-auto mb-6 h-12 w-12 rounded-full" />
                <Skeleton className="mb-2 h-8 w-3/4 mx-auto" />
                <Skeleton className="mb-4 h-4 w-full" />
                <Skeleton className="h-5 w-2/3 mx-auto" />
              </div>
              <div className="space-y-6">
                <div>
                  <Skeleton className="mb-2 h-4 w-1/4" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="mt-2 h-3 w-1/4 mx-auto" />
                </div>
                <Skeleton className="h-12 w-full" />
                <div className="mt-6 text-center">
                  <Skeleton className="mb-4 h-4 w-3/4 mx-auto" />
                  <Skeleton className="h-10 w-32 mx-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <PhoneVerificationFormWrapper />
    </Suspense>
  );
}

