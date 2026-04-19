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
        <div className="p-8 rounded-2xl border border-red-500/20 bg-red-500/5">
          <h1 className="text-2xl font-bold mb-4 text-red-400">Authorization Failed</h1>
          <p className="text-red-400 mb-2">Error: {error}</p>
          {errorDescription && (
            <p className="text-sm text-red-400/70">{errorDescription}</p>
          )}
        </div>
      </div>
    );
  }

  if (code) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <div className="p-8 rounded-2xl border border-green-500/20 bg-green-500/5">
          <h1 className="text-2xl font-bold mb-4 text-green-400">Authorization Successful!</h1>
          <p className="text-sm text-gray-400 mb-4">
            Copy the authorization code below and paste it into your application:
          </p>
          <div className="bg-black/30 p-4 rounded-xl font-mono text-sm break-all select-all cursor-pointer border border-white/10">
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
      <div className="p-8 rounded-2xl border border-white/10 bg-white/5">
        <h1 className="text-2xl font-bold mb-4">OAuth Callback</h1>
        <p className="text-gray-400">
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
