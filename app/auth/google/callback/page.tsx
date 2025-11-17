import { Suspense } from "react";
import { GoogleCallbackPage } from "@/components/auth/google-callback-page";
import { Skeleton } from "@/components/ui/skeleton";

function GoogleCallbackPageWrapper() {
  return <GoogleCallbackPage />;
}

export default function GoogleCallbackPageRoute() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-neutral-50 p-4 dark:bg-neutral-950">
          <div className="w-full max-w-sm text-center">
            <div className="p-8 sm:p-10">
              <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-900 dark:bg-white">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-300 border-t-neutral-900 dark:border-neutral-700 dark:border-t-white"></div>
              </div>
              <Skeleton className="mb-4 h-8 w-3/4 mx-auto" />
              <Skeleton className="mb-6 h-4 w-full" />
              <div className="flex justify-center gap-2">
                <Skeleton className="h-2 w-2 rounded-full" />
                <Skeleton className="h-2 w-2 rounded-full" />
                <Skeleton className="h-2 w-2 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      }
    >
      <GoogleCallbackPageWrapper />
    </Suspense>
  );
}
