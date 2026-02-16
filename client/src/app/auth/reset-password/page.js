import { Suspense } from "react";
import ResetPasswordClient from "./ResetPasswordClient";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<ResetPasswordSkeleton />}>
      <ResetPasswordClient />
    </Suspense>
  );
}

function ResetPasswordSkeleton() {
  return (
    <div className="min-h-screen grid place-items-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 dark:border-gray-800 p-6 bg-white dark:bg-gray-900">
        <div className="h-6 w-40 bg-gray-200 dark:bg-gray-800 rounded mb-4 animate-pulse" />
        <div className="h-4 w-72 bg-gray-200 dark:bg-gray-800 rounded mb-6 animate-pulse" />
        <div className="space-y-3">
          <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />
          <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />
          <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />
        </div>
      </div>
    </div>
  );
}
