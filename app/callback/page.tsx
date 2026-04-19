"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function CallbackContent() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  if (error) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <div className="p-8 rounded-lg border border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950">
          <h1 className="text-2xl font-bold mb-4 text-red-700 dark:text-red-400">Authorization Failed</h1>
          <p className="text-red-600 dark:text-red-400 mb-2">Error: {error}</p>
          {errorDescription && (
            <p className="text-sm text-red-500">{errorDescription}</p>
          )}
        </div>
      </div>
    );
  }

  if (code) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <div className="p-8 rounded-lg border border-green-300 dark:border-green-800 bg-green-50 dark:bg-green-950">
          <h1 className="text-2xl font-bold mb-4 text-green-700 dark:text-green-400">Authorization Successful!</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Copy the authorization code below and paste it into your application:
          </p>
          <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md font-mono text-sm break-all select-all cursor-pointer border">
            {code}
          </div>
          {state && (
            <p className="text-xs text-gray-400 mt-4">State: {state}</p>
          )}
          <p className="text-xs text-gray-500 mt-4">
            You can close this window after copying the code.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16 text-center">
      <div className="p-8 rounded-lg border border-gray-200 dark:border-gray-800">
        <h1 className="text-2xl font-bold mb-4">OAuth Callback</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Waiting for authorization... If you were not redirected here from a login page, please start the authorization flow from your application.
        </p>
      </div>
    </div>
  );
}

export default function CallbackPage() {
  return (
    <Suspense fallback={
      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    }>
      <CallbackContent />
    </Suspense>
  );
}
