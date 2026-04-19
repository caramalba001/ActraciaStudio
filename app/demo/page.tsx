"use client";

import { useState } from "react";

type Step = 1 | 2 | 3 | 4 | 5 | 6;

export default function DemoPage() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [isAnimating, setIsAnimating] = useState(false);

  const steps = [
    { num: 1, title: "Connect TikTok Account", icon: "🔗" },
    { num: 2, title: "Authorize via TikTok OAuth", icon: "🔐" },
    { num: 3, title: "Receive Authorization Code", icon: "✅" },
    { num: 4, title: "Exchange Code for Access Token", icon: "🔑" },
    { num: 5, title: "Upload Video Content", icon: "📤" },
    { num: 6, title: "Video Published on TikTok", icon: "🎉" },
  ];

  const goToStep = (step: Step) => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep(step);
      setIsAnimating(false);
    }, 300);
  };

  const nextStep = () => {
    if (currentStep < 6) goToStep((currentStep + 1) as Step);
  };

  const prevStep = () => {
    if (currentStep > 1) goToStep((currentStep - 1) as Step);
  };

  const resetDemo = () => goToStep(1);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">Actracia Studio — App Demo</h1>
        <p className="text-gray-500">
          This demo shows the complete end-to-end flow of how Actracia Studio works with the TikTok API.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-2">
          {steps.map((step) => (
            <button
              key={step.num}
              onClick={() => goToStep(step.num as Step)}
              className={`flex flex-col items-center gap-1 transition-all duration-300 ${
                step.num === currentStep
                  ? "scale-110"
                  : step.num < currentStep
                  ? "opacity-60"
                  : "opacity-40"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg border-2 transition-colors duration-300 ${
                  step.num === currentStep
                    ? "border-blue-500 bg-blue-500 text-white"
                    : step.num < currentStep
                    ? "border-green-500 bg-green-500 text-white"
                    : "border-gray-300 dark:border-gray-600 text-gray-400"
                }`}
              >
                {step.num < currentStep ? "✓" : step.num}
              </div>
              <span className="text-[10px] text-center max-w-[80px] leading-tight hidden sm:block">
                {step.title}
              </span>
            </button>
          ))}
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentStep - 1) / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div
        className={`transition-opacity duration-300 ${
          isAnimating ? "opacity-0" : "opacity-100"
        }`}
      >
        {currentStep === 1 && <Step1Connect />}
        {currentStep === 2 && <Step2Authorize />}
        {currentStep === 3 && <Step3Callback />}
        {currentStep === 4 && <Step4Token />}
        {currentStep === 5 && <Step5Upload />}
        {currentStep === 6 && <Step6Published />}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-10">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className="px-6 py-2 rounded-lg border border-gray-300 dark:border-gray-700 disabled:opacity-30 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          ← Previous
        </button>
        <button
          onClick={resetDemo}
          className="px-6 py-2 rounded-lg text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition"
        >
          Restart Demo
        </button>
        {currentStep < 6 ? (
          <button
            onClick={nextStep}
            className="px-6 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
          >
            Next Step →
          </button>
        ) : (
          <button
            onClick={resetDemo}
            className="px-6 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
          >
            ↺ Start Over
          </button>
        )}
      </div>
    </div>
  );
}

/* ============================================
   STEP 1: Connect TikTok Account
   ============================================ */
function Step1Connect() {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-8">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">🔗</span>
        <h2 className="text-2xl font-bold">Step 1: Connect TikTok Account</h2>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        The user starts by clicking the &quot;Connect TikTok&quot; button on the Actracia dashboard.
        This initiates the OAuth 2.0 authorization flow with TikTok.
      </p>

      {/* Simulated Dashboard UI */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
          <div className="font-bold text-lg">Actracia Studio Dashboard</div>
        </div>
        <div className="text-center py-8">
          <div className="text-6xl mb-4">📱</div>
          <h3 className="text-lg font-semibold mb-2">Connect Your TikTok Account</h3>
          <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
            Link your TikTok account to start uploading and managing your video content directly from Actracia.
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg font-medium cursor-default">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.88-2.88 2.89 2.89 0 012.88-2.88c.28 0 .56.04.82.12v-3.5a6.37 6.37 0 00-.82-.05A6.34 6.34 0 003.15 15.3a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.87a8.28 8.28 0 004.76 1.5v-3.4a4.85 4.85 0 01-1-.28z"/>
            </svg>
            Connect with TikTok
          </div>
        </div>
      </div>

      <div className="mt-6 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p className="text-sm text-blue-700 dark:text-blue-300">
          <strong>How it works:</strong> When the user clicks &quot;Connect with TikTok&quot;, we generate an authorization URL with the required scopes
          (<code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">user.info.basic</code>,
          <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">video.publish</code>,
          <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">video.upload</code>)
          and redirect the user to TikTok&apos;s authorization page.
        </p>
      </div>
    </div>
  );
}

/* ============================================
   STEP 2: TikTok OAuth Authorization
   ============================================ */
function Step2Authorize() {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-8">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">🔐</span>
        <h2 className="text-2xl font-bold">Step 2: Authorize via TikTok OAuth</h2>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        The user is redirected to TikTok&apos;s official authorization page where they log in and grant permissions to Actracia Studio.
      </p>

      {/* Simulated TikTok Auth Page */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border-2 border-gray-300 dark:border-gray-700 overflow-hidden">
        <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 flex items-center gap-2 text-xs text-gray-500">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <div className="flex-1 bg-white dark:bg-gray-700 rounded px-3 py-1 text-center">
            🔒 https://www.tiktok.com/v2/auth/authorize/?client_key=...&scope=user.info.basic,video.publish,video.upload
          </div>
        </div>
        <div className="p-8 text-center">
          <div className="text-4xl mb-4">🎵</div>
          <h3 className="text-xl font-bold mb-2">Log in to TikTok</h3>
          <p className="text-sm text-gray-500 mb-6">to continue to Actracia Studio</p>
          
          <div className="max-w-xs mx-auto text-left mb-6 space-y-3">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 border">
              <p className="text-xs font-semibold text-gray-500 mb-1">Actracia Studio is requesting access to:</p>
              <ul className="text-sm space-y-1">
                <li className="flex items-center gap-2">✅ Read your basic profile info</li>
                <li className="flex items-center gap-2">✅ Upload videos on your behalf</li>
                <li className="flex items-center gap-2">✅ Publish videos to your account</li>
              </ul>
            </div>
          </div>

          <div className="space-y-2 max-w-xs mx-auto">
            <div className="w-full py-3 bg-[#fe2c55] text-white rounded-lg font-semibold cursor-default">
              Authorize App
            </div>
            <div className="w-full py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-sm cursor-default">
              Cancel
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p className="text-sm text-blue-700 dark:text-blue-300">
          <strong>Security:</strong> The user&apos;s credentials are entered directly on TikTok&apos;s domain — Actracia never sees or stores the user&apos;s TikTok password. This follows the standard OAuth 2.0 security model.
        </p>
      </div>
    </div>
  );
}

/* ============================================
   STEP 3: Callback with Auth Code
   ============================================ */
function Step3Callback() {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-8">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">✅</span>
        <h2 className="text-2xl font-bold">Step 3: Receive Authorization Code</h2>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        After the user authorizes the app, TikTok redirects them back to our callback URL with an authorization code.
      </p>

      {/* Simulated Browser */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border-2 border-gray-300 dark:border-gray-700 overflow-hidden">
        <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 flex items-center gap-2 text-xs text-gray-500">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <div className="flex-1 bg-white dark:bg-gray-700 rounded px-3 py-1 text-center font-mono text-[10px]">
            https://www.actracia.com/callback?code=act.example1234567890abcdef&state=random123
          </div>
        </div>
        <div className="p-8 text-center">
          <div className="p-6 rounded-lg border-2 border-green-300 dark:border-green-800 bg-green-50 dark:bg-green-950 inline-block">
            <div className="text-4xl mb-3">✅</div>
            <h3 className="text-xl font-bold text-green-700 dark:text-green-400 mb-3">Authorization Successful!</h3>
            <p className="text-sm text-gray-500 mb-4">Copy the authorization code below:</p>
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md font-mono text-sm break-all border select-all">
              act.example1234567890abcdef
            </div>
            <p className="text-xs text-gray-400 mt-3">State: random123</p>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p className="text-sm text-blue-700 dark:text-blue-300">
          <strong>Redirect URI:</strong> TikTok redirects to <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">https://www.actracia.com/callback</code> with the authorization code as a query parameter. The <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">state</code> parameter is verified to prevent CSRF attacks.
        </p>
      </div>
    </div>
  );
}

/* ============================================
   STEP 4: Exchange Code for Token
   ============================================ */
function Step4Token() {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-8">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">🔑</span>
        <h2 className="text-2xl font-bold">Step 4: Exchange Code for Access Token</h2>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        The authorization code is exchanged for an access token using the TikTok OAuth token endpoint. This happens server-side to keep the client secret secure.
      </p>

      {/* Code Exchange Visualization */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-gray-900 rounded-lg p-5 text-sm font-mono">
          <p className="text-green-400 mb-2"># Request to TikTok Token API</p>
          <p className="text-blue-300">POST</p>
          <p className="text-gray-300 text-xs mb-3">https://open.tiktokapis.com/v2/oauth/token/</p>
          <p className="text-yellow-300 mt-2 mb-1">Body:</p>
          <div className="text-gray-300 text-xs space-y-1">
            <p>client_key: <span className="text-green-300">cxxx...xxx</span></p>
            <p>client_secret: <span className="text-green-300">sxxx...xxx</span></p>
            <p>code: <span className="text-green-300">act.example123...</span></p>
            <p>grant_type: <span className="text-green-300">authorization_code</span></p>
            <p>redirect_uri: <span className="text-green-300">https://www.actracia.com/callback</span></p>
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-5 text-sm font-mono">
          <p className="text-green-400 mb-2"># Response from TikTok</p>
          <p className="text-blue-300">200 OK</p>
          <pre className="text-gray-300 text-xs mt-3">{`{
  "access_token": "act.xxxx...",
  "expires_in": 86400,
  "open_id": "user_12345...",
  "refresh_token": "rft.xxxx...",
  "refresh_expires_in": 31536000,
  "scope": "user.info.basic,
    video.publish,video.upload",
  "token_type": "Bearer"
}`}</pre>
        </div>
      </div>

      <div className="mt-6 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p className="text-sm text-blue-700 dark:text-blue-300">
          <strong>Security:</strong> The <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">client_secret</code> is never exposed to the browser. The access token is stored securely and used for subsequent API calls. Refresh tokens allow re-authentication without user interaction.
        </p>
      </div>
    </div>
  );
}

/* ============================================
   STEP 5: Upload Video
   ============================================ */
function Step5Upload() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const simulateUpload = () => {
    setUploading(true);
    setUploadProgress(0);
    setUploaded(false);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          setUploaded(true);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-8">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">📤</span>
        <h2 className="text-2xl font-bold">Step 5: Upload Video Content</h2>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        With the access token, the user can now upload videos through Actracia Studio. The upload uses TikTok&apos;s Content Posting API with a two-step process: initialize, then upload the file.
      </p>

      {/* Simulated Upload UI */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
          <div className="font-bold">📹 Upload Video to TikTok</div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center mb-4">
              <div className="text-4xl mb-2">🎬</div>
              <p className="text-sm text-gray-500">my_video.mp4</p>
              <p className="text-xs text-gray-400">15.2 MB • 1080x1920 • 30s</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium block mb-1">Video Title / Description</label>
              <div className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 text-sm">
                Testing the TikTok API! #coding @tiktok
              </div>
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Privacy Level</label>
              <div className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 text-sm">
                PUBLIC_TO_EVERYONE
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-4 h-4 border rounded bg-blue-500"></div>
              <span>Mark as AI-generated content</span>
            </div>
          </div>
        </div>

        {/* Upload Progress */}
        <div className="mt-6">
          {!uploading && !uploaded && (
            <button
              onClick={simulateUpload}
              className="w-full py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition"
            >
              Upload & Publish
            </button>
          )}
          {uploading && (
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Uploading to TikTok...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div
                  className="bg-blue-500 h-3 rounded-full transition-all duration-200"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}
          {uploaded && (
            <div className="text-center py-3 bg-green-100 dark:bg-green-900 rounded-lg text-green-700 dark:text-green-300 font-semibold">
              ✅ Video uploaded successfully! Processing by TikTok...
            </div>
          )}
        </div>
      </div>

      {/* API Flow */}
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <div className="bg-gray-900 rounded-lg p-4 text-xs font-mono">
          <p className="text-green-400 mb-2"># Step 5a: Initialize Upload</p>
          <p className="text-blue-300">POST /v2/post/publish/video/init/</p>
          <p className="text-gray-400 mt-1">→ Returns upload_url & publish_id</p>
        </div>
        <div className="bg-gray-900 rounded-lg p-4 text-xs font-mono">
          <p className="text-green-400 mb-2"># Step 5b: Upload Video File</p>
          <p className="text-blue-300">PUT {"{upload_url}"}</p>
          <p className="text-gray-400 mt-1">→ Sends video binary data</p>
        </div>
      </div>
    </div>
  );
}

/* ============================================
   STEP 6: Video Published
   ============================================ */
function Step6Published() {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-8">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">🎉</span>
        <h2 className="text-2xl font-bold">Step 6: Video Published on TikTok!</h2>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        The video has been successfully uploaded and is now processing on TikTok&apos;s servers. Once processed, it will be published on the user&apos;s TikTok profile.
      </p>

      {/* Success State */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 rounded-xl p-8 text-center border border-green-200 dark:border-green-800">
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold mb-2">Success!</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Your video has been published to TikTok.</p>

        {/* Simulated TikTok Post */}
        <div className="inline-block bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 text-left max-w-xs">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
            <div>
              <p className="text-sm font-semibold">@your_username</p>
              <p className="text-xs text-gray-400">Just now</p>
            </div>
          </div>
          <div className="bg-gray-200 dark:bg-gray-800 rounded-lg aspect-[9/16] w-48 mx-auto flex items-center justify-center mb-3">
            <span className="text-4xl">▶️</span>
          </div>
          <p className="text-sm">Testing the TikTok API! #coding @tiktok</p>
          <div className="flex gap-4 mt-3 text-xs text-gray-400">
            <span>❤️ 0</span>
            <span>💬 0</span>
            <span>↗️ 0</span>
          </div>
        </div>
      </div>

      {/* Webhook notification */}
      <div className="mt-6 bg-gray-900 rounded-lg p-4 text-xs font-mono">
        <p className="text-green-400 mb-2"># Webhook Notification Received</p>
        <p className="text-blue-300">POST https://www.actracia.com/api/webhook</p>
        <pre className="text-gray-300 mt-2">{`{
  "event": "video.publish.complete",
  "publish_id": "pub_xxxx...",
  "status": "published"
}`}</pre>
      </div>

      <div className="mt-6 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4">
        <p className="text-sm text-green-700 dark:text-green-300">
          <strong>Complete!</strong> This is the full end-to-end flow of Actracia Studio. The user connected their TikTok account via OAuth, uploaded a video through our platform, and it was published to their TikTok profile — all securely and in compliance with TikTok&apos;s API guidelines.
        </p>
      </div>
    </div>
  );
}
