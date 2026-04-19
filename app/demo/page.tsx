"use client";

import { useState } from "react";

type Screen = "login" | "authorize" | "dashboard" | "upload" | "success";
type Platform = "tiktok" | "youtube";

export default function DemoPage() {
  const [screen, setScreen] = useState<Screen>("login");
  const [platform, setPlatform] = useState<Platform>("tiktok");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const simulateUpload = () => {
    setUploading(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          setTimeout(() => setScreen("success"), 400);
          return 100;
        }
        return prev + 3;
      });
    }, 80);
  };

  return (
    <div className="min-h-[calc(100vh-120px)] bg-[#0f0f0f] text-white">
      {/* App Top Bar */}
      <div className="bg-[#1a1a1a] border-b border-[#2a2a2a] px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-xs font-bold">A</div>
          <span className="font-semibold text-sm">Actracia Studio</span>
          <span className="text-[10px] px-2 py-0.5 bg-yellow-500/20 text-yellow-400 rounded-full">DEMO</span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          {screen !== "login" && screen !== "authorize" && (
            <>
              <span className="text-gray-400 text-xs">Logged in as</span>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500" />
                <span className="text-sm">@demo_creator</span>
              </div>
            </>
          )}
          <button
            onClick={() => { setScreen("login"); setProgress(0); setUploading(false); }}
            className="text-xs text-gray-500 hover:text-gray-300"
          >
            Reset
          </button>
        </div>
      </div>

      {screen === "login" && <LoginScreen onConnect={(p) => { setPlatform(p); setScreen("authorize"); }} />}
      {screen === "authorize" && <AuthorizeScreen platform={platform} onAuthorize={() => setScreen("dashboard")} onCancel={() => setScreen("login")} />}
      {screen === "dashboard" && <DashboardScreen platform={platform} onUpload={() => setScreen("upload")} />}
      {screen === "upload" && (
        <UploadScreen
          platform={platform}
          onPublish={simulateUpload}
          uploading={uploading}
          progress={progress}
          onBack={() => setScreen("dashboard")}
        />
      )}
      {screen === "success" && <SuccessScreen platform={platform} onDashboard={() => setScreen("dashboard")} onUploadAnother={() => setScreen("upload")} />}
    </div>
  );
}

/* ============================================ */
function LoginScreen({ onConnect }: { onConnect: (p: Platform) => void }) {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="w-full max-w-md">
        <div className="bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a] p-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6">A</div>
          <h1 className="text-2xl font-bold mb-2">Welcome to Actracia Studio</h1>
          <p className="text-gray-400 text-sm mb-8">Connect your account to start publishing short-form content.</p>

          <button
            onClick={() => onConnect("tiktok")}
            className="w-full flex items-center justify-center gap-3 bg-white text-black font-semibold py-3 rounded-xl hover:bg-gray-100 transition mb-3"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.88-2.88 2.89 2.89 0 012.88-2.88c.28 0 .56.04.82.12v-3.5a6.37 6.37 0 00-.82-.05A6.34 6.34 0 003.15 15.3a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.87a8.28 8.28 0 004.76 1.5v-3.4a4.85 4.85 0 01-1-.28z"/>
            </svg>
            Continue with TikTok
          </button>

          <button
            onClick={() => onConnect("youtube")}
            className="w-full flex items-center justify-center gap-3 bg-[#FF0000] text-white font-semibold py-3 rounded-xl hover:bg-[#cc0000] transition mb-4"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            Continue with YouTube
          </button>

          <p className="text-[11px] text-gray-500 mt-6">
            By connecting, you agree to our <a href="/terms" className="underline">Terms</a> and <a href="/privacy" className="underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ============================================ */
function AuthorizeScreen({ platform, onAuthorize, onCancel }: { platform: Platform; onAuthorize: () => void; onCancel: () => void }) {
  const [loading, setLoading] = useState(false);

  const handleAuth = () => {
    setLoading(true);
    setTimeout(() => onAuthorize(), 1500);
  };

  const isTikTok = platform === "tiktok";

  return (
    <div className="flex items-center justify-center py-12">
      <div className="w-full max-w-sm">
        <div className="bg-[#2a2a2a] rounded-t-xl px-4 py-2 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]"></div>
          </div>
          <div className="flex-1 bg-[#1a1a1a] rounded-md px-3 py-1 text-[10px] text-gray-400 text-center flex items-center justify-center gap-1">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
            {isTikTok ? "tiktok.com" : "accounts.google.com"}
          </div>
        </div>

        <div className="bg-white rounded-b-xl p-8 text-black text-center">
          {isTikTok ? (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="black" className="mx-auto mb-4">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.88-2.88 2.89 2.89 0 012.88-2.88c.28 0 .56.04.82.12v-3.5a6.37 6.37 0 00-.82-.05A6.34 6.34 0 003.15 15.3a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.87a8.28 8.28 0 004.76 1.5v-3.4a4.85 4.85 0 01-1-.28z"/>
            </svg>
          ) : (
            <svg width="40" height="40" viewBox="0 0 24 24" className="mx-auto mb-4">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          )}
          <h2 className="font-bold text-lg mb-1">Authorize Actracia Studio</h2>
          <p className="text-gray-500 text-xs mb-6">
            actracia.com wants to access your {isTikTok ? "TikTok" : "YouTube"} account
          </p>

          <div className="text-left bg-gray-50 rounded-xl p-4 mb-6 space-y-3">
            <p className="text-xs font-semibold text-gray-700 mb-2">This app will be able to:</p>
            {isTikTok ? (
              <>
                <ScopeItem text="View your profile information" />
                <ScopeItem text="Upload videos to your account" />
                <ScopeItem text="Publish content on your behalf" />
              </>
            ) : (
              <>
                <ScopeItem text="Manage your YouTube videos" />
                <ScopeItem text="View your YouTube account" />
                <ScopeItem text="Upload videos to your channel" />
              </>
            )}
          </div>

          <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex-shrink-0" />
            <div className="text-left">
              <p className="text-sm font-semibold">demo_creator</p>
              <p className="text-xs text-gray-400">{isTikTok ? "TikTok ID: 7384929102847" : "noppavit.kann@gmail.com"}</p>
            </div>
          </div>

          <button
            onClick={handleAuth}
            disabled={loading}
            className={`w-full py-3 text-white rounded-xl font-semibold transition disabled:opacity-70 ${
              isTikTok ? "bg-[#fe2c55] hover:bg-[#e0264c]" : "bg-[#4285F4] hover:bg-[#3367d6]"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                Authorizing...
              </span>
            ) : "Authorize"}
          </button>
          <button onClick={onCancel} className="w-full py-3 mt-2 text-gray-500 text-sm hover:text-gray-700 transition">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================ */
function DashboardScreen({ platform, onUpload }: { platform: Platform; onUpload: () => void }) {
  const isTikTok = platform === "tiktok";
  return (
    <div className="flex">
      <Sidebar active="Dashboard" platform={platform} onNav={(label) => { if (label === "Upload Video") onUpload(); }} />

      <div className="flex-1 p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-xl font-bold">Dashboard</h1>
            <p className="text-sm text-gray-400">Welcome back, demo_creator</p>
          </div>
          <button
            onClick={onUpload}
            className={`flex items-center gap-2 px-5 py-2.5 text-white rounded-xl font-semibold text-sm transition ${
              isTikTok ? "bg-[#fe2c55] hover:bg-[#e0264c]" : "bg-[#FF0000] hover:bg-[#cc0000]"
            }`}
          >
            + Upload {isTikTok ? "Video" : "Short"}
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Videos", value: "12", change: "+2 this week" },
            { label: "Total Views", value: "45.2K", change: "+8.3K this week" },
            { label: "Followers", value: "1,847", change: "+124 this week" },
            { label: "Engagement", value: "4.2%", change: "+0.3% this week" },
          ].map((stat) => (
            <div key={stat.label} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4">
              <p className="text-xs text-gray-400 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-[10px] text-green-400 mt-1">{stat.change}</p>
            </div>
          ))}
        </div>

        <h2 className="font-semibold mb-4">Recent Videos</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: "Day in my life #vlog", views: "12.4K", time: "2h ago", color: "from-purple-600 to-pink-500" },
            { title: "Coding tutorial #dev", views: "8.1K", time: "1d ago", color: "from-blue-600 to-cyan-500" },
            { title: "Recipe hack #food", views: "15.7K", time: "3d ago", color: "from-orange-500 to-red-500" },
            { title: "Travel montage #trip", views: "9.0K", time: "5d ago", color: "from-green-500 to-teal-500" },
          ].map((video) => (
            <div key={video.title} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl overflow-hidden">
              <div className={`aspect-[9/16] bg-gradient-to-br ${video.color} flex items-center justify-center relative`}>
                <span className="text-3xl opacity-50">&#9654;</span>
                <span className="absolute bottom-2 right-2 bg-black/70 text-[10px] px-1.5 py-0.5 rounded">0:30</span>
              </div>
              <div className="p-3">
                <p className="text-xs font-medium truncate">{video.title}</p>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-[10px] text-gray-400">{video.views} views</p>
                  <p className="text-[10px] text-gray-500">{video.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================ */
function UploadScreen({
  platform,
  onPublish,
  uploading,
  progress,
  onBack,
}: {
  platform: Platform;
  onPublish: () => void;
  uploading: boolean;
  progress: number;
  onBack: () => void;
}) {
  const [file, setFile] = useState<string | null>(null);
  const [title, setTitle] = useState(
    platform === "tiktok"
      ? "Testing the TikTok API! #coding @tiktok"
      : "Actracia Studio Demo #Shorts #coding #tech"
  );
  const [privacy, setPrivacy] = useState(platform === "tiktok" ? "PUBLIC_TO_EVERYONE" : "private");
  const isTikTok = platform === "tiktok";

  return (
    <div className="flex">
      <Sidebar active="Upload Video" platform={platform} onNav={(label) => { if (label === "Dashboard") onBack(); }} />

      <div className="flex-1 p-6 max-w-3xl">
        <button onClick={onBack} className="text-sm text-gray-400 hover:text-white mb-4 flex items-center gap-1">
          &#8592; Back to Dashboard
        </button>
        <h1 className="text-xl font-bold mb-6">Upload Video</h1>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            {!file ? (
              <button
                onClick={() => setFile("my_awesome_video.mp4")}
                className="w-full aspect-[9/14] border-2 border-dashed border-[#333] rounded-2xl flex flex-col items-center justify-center hover:border-[#555] transition cursor-pointer"
              >
                <div className="text-4xl mb-3 opacity-50">&#128193;</div>
                <p className="text-sm text-gray-400">Click to select video</p>
                <p className="text-[10px] text-gray-500 mt-1">MP4, WebM up to 500MB</p>
              </button>
            ) : (
              <div className="w-full aspect-[9/14] bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden">
                <span className="text-5xl opacity-30">&#9654;</span>
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur p-3">
                  <p className="text-xs font-medium">my_awesome_video.mp4</p>
                  <p className="text-[10px] text-gray-300">15.2 MB &middot; 1080&times;1920 &middot; 00:30</p>
                </div>
                <button
                  onClick={() => setFile(null)}
                  className="absolute top-3 right-3 w-6 h-6 bg-black/50 rounded-full flex items-center justify-center text-xs hover:bg-black/80"
                >
                  &#10005;
                </button>
              </div>
            )}
          </div>

          <div className="space-y-5">
            <div>
              <label className="text-xs text-gray-400 block mb-1.5">Description</label>
              <textarea
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                rows={3}
                className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#444] resize-none"
              />
              <p className="text-[10px] text-gray-500 text-right mt-1">{title.length}/2200</p>
            </div>

            <div>
              <label className="text-xs text-gray-400 block mb-1.5">Privacy</label>
              <select
                value={privacy}
                onChange={(e) => setPrivacy(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#444] appearance-none"
              >
                {isTikTok ? (
                  <>
                    <option value="PUBLIC_TO_EVERYONE">Public</option>
                    <option value="MUTUAL_FOLLOW_FRIENDS">Friends Only</option>
                    <option value="FOLLOWER_OF_CREATOR">Followers Only</option>
                    <option value="SELF_ONLY">Only Me</option>
                  </>
                ) : (
                  <>
                    <option value="public">Public</option>
                    <option value="unlisted">Unlisted</option>
                    <option value="private">Private</option>
                  </>
                )}
              </select>
            </div>

            <div>
              <label className="text-xs text-gray-400 block mb-1.5">Cover Thumbnail</label>
              <div className="flex gap-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`w-16 h-24 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 ${i === 1 ? "ring-2 ring-[#fe2c55]" : "opacity-50"} cursor-pointer`}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs text-gray-400 block">Options</label>
              <Toggle label="Allow comments" defaultOn />
              <Toggle label="Allow duets" defaultOn />
              <Toggle label="AI-generated content" />
            </div>

            {!uploading ? (
              <button
                onClick={onPublish}
                disabled={!file}
                className={`w-full py-3 text-white rounded-xl font-semibold transition disabled:opacity-30 disabled:cursor-not-allowed ${
                  isTikTok ? "bg-[#fe2c55] hover:bg-[#e0264c]" : "bg-[#FF0000] hover:bg-[#cc0000]"
                }`}
              >
                Publish to {isTikTok ? "TikTok" : "YouTube Shorts"}
              </button>
            ) : (
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">
                    {progress < 50 ? "Initializing upload..." : progress < 95 ? `Uploading to ${isTikTok ? "TikTok" : "YouTube"}...` : "Finalizing..."}
                  </span>
                  <span className="text-white font-medium">{progress}%</span>
                </div>
                <div className="w-full bg-[#2a2a2a] rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-2 rounded-full transition-all duration-200 ${isTikTok ? "bg-[#fe2c55]" : "bg-[#FF0000]"}`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex gap-4 text-[10px] text-gray-500 mt-1">
                  {isTikTok ? (
                    <>
                      <span>POST /v2/post/publish/video/init/ {progress >= 30 ? "&#10003;" : "..."}</span>
                      <span>PUT upload_url {progress >= 90 ? "&#10003;" : progress >= 30 ? "..." : ""}</span>
                    </>
                  ) : (
                    <>
                      <span>POST /youtube/v3/videos?part=snippet,status {progress >= 30 ? "&#10003;" : "..."}</span>
                      <span>PUT resumable upload {progress >= 90 ? "&#10003;" : progress >= 30 ? "..." : ""}</span>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================ */
function SuccessScreen({ platform, onDashboard, onUploadAnother }: { platform: Platform; onDashboard: () => void; onUploadAnother: () => void }) {
  const isTikTok = platform === "tiktok";
  return (
    <div className="flex items-center justify-center py-16">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-2">{isTikTok ? "Video Published!" : "Short Uploaded!"}</h1>
        <p className="text-gray-400 text-sm mb-8">
          {isTikTok
            ? "Your video has been uploaded to TikTok and is now processing. It will appear on your profile shortly."
            : "Your Short has been uploaded to YouTube and is now processing. It will appear on your channel shortly."}
        </p>

        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-4 mb-8 text-left">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold">@demo_creator</p>
              <p className="text-[10px] text-gray-400">Just now</p>
            </div>
            <div className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-[10px] rounded-full">Processing</div>
          </div>
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl aspect-video flex items-center justify-center mb-3">
            <span className="text-3xl opacity-30">&#9654;</span>
          </div>
          <p className="text-sm">
            {isTikTok ? "Testing the TikTok API! #coding @tiktok" : "Actracia Studio Demo #Shorts #coding #tech"}
          </p>
          <div className="flex gap-6 mt-3 text-xs text-gray-500">
            <span>&#9825; 0</span>
            <span>&#128172; 0</span>
            <span>&#8599; 0</span>
          </div>
        </div>

        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4 mb-8 text-left text-xs font-mono text-gray-400">
          {isTikTok ? (
            <>
              <p className="text-green-400 mb-2">&#10003; Publish complete</p>
              <p>publish_id: pub_7x8k9m2n4p5q...</p>
              <p>status: processing</p>
              <p>webhook: delivered to /api/webhook</p>
            </>
          ) : (
            <>
              <p className="text-green-400 mb-2">&#10003; Upload complete</p>
              <p>video_id: vsX9J-pgayw</p>
              <p>status: uploaded</p>
              <p>url: youtube.com/shorts/vsX9J-pgayw</p>
            </>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onDashboard}
            className="flex-1 py-3 border border-[#333] rounded-xl text-sm hover:bg-[#1a1a1a] transition"
          >
            Go to Dashboard
          </button>
          <button
            onClick={onUploadAnother}
            className="flex-1 py-3 bg-[#fe2c55] text-white rounded-xl text-sm font-semibold hover:bg-[#e0264c] transition"
          >
            Upload Another
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================
   SHARED COMPONENTS
   ============================================ */
function Sidebar({ active, platform, onNav }: { active: string; platform: Platform; onNav: (label: string) => void }) {
  const isTikTok = platform === "tiktok";
  const items = [
    { icon: "\u{1F4CA}", label: "Dashboard" },
    { icon: "\u{1F4E4}", label: "Upload Video" },
    { icon: "\u{1F4C1}", label: "My Videos" },
    { icon: "\u{1F4C8}", label: "Analytics" },
    { icon: "\u{2699}\uFE0F", label: "Settings" },
  ];

  return (
    <div className="w-56 bg-[#1a1a1a] border-r border-[#2a2a2a] min-h-[calc(100vh-168px)] p-4 hidden md:block">
      <nav className="space-y-1">
        {items.map((item) => (
          <button
            key={item.label}
            onClick={() => onNav(item.label)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
              item.label === active ? "bg-[#2a2a2a] text-white" : "text-gray-400 hover:text-white hover:bg-[#222]"
            }`}
          >
            <span>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-8 p-3 bg-[#222] rounded-lg">
        <p className="text-xs text-gray-400 mb-2">Connected to {isTikTok ? "TikTok" : "YouTube"}</p>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500" />
          <div>
            <p className="text-xs font-semibold">@demo_creator</p>
            <p className="text-[10px] text-green-400">&#9679; Connected</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Toggle({ label, defaultOn = false }: { label: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button onClick={() => setOn(!on)} className="flex items-center gap-3 w-full text-left">
      <div className={`w-9 h-5 rounded-full relative transition-colors ${on ? "bg-blue-500" : "bg-[#333]"}`}>
        <div className={`w-4 h-4 rounded-full absolute top-0.5 transition-all ${on ? "right-0.5 bg-white" : "left-0.5 bg-gray-500"}`} />
      </div>
      <span className={`text-sm ${on ? "text-white" : "text-gray-400"}`}>{label}</span>
    </button>
  );
}

function ScopeItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xs flex-shrink-0">&#10003;</div>
      <span>{text}</span>
    </div>
  );
}
