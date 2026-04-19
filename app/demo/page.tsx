"use client";

import { useState } from "react";

type Screen = "login" | "authorize" | "dashboard" | "upload" | "success" | "analytics" | "settings" | "videos";
type Platform = "tiktok" | "youtube" | "facebook" | "instagram";

const platformConfig = {
  tiktok: { name: "TikTok", color: "bg-black", hoverColor: "hover:bg-gray-900", accentColor: "bg-[#fe2c55]", accentHover: "hover:bg-[#e0264c]", textColor: "text-white" },
  youtube: { name: "YouTube", color: "bg-[#FF0000]", hoverColor: "hover:bg-[#cc0000]", accentColor: "bg-[#FF0000]", accentHover: "hover:bg-[#cc0000]", textColor: "text-white" },
  facebook: { name: "Facebook", color: "bg-[#1877F2]", hoverColor: "hover:bg-[#1565c0]", accentColor: "bg-[#1877F2]", accentHover: "hover:bg-[#1565c0]", textColor: "text-white" },
  instagram: { name: "Instagram", color: "bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#dc2743]", hoverColor: "hover:opacity-90", accentColor: "bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#dc2743]", accentHover: "hover:opacity-90", textColor: "text-white" },
};

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

  const handleSidebarNav = (label: string) => {
    if (label === "Dashboard") setScreen("dashboard");
    else if (label === "Upload Video") setScreen("upload");
    else if (label === "My Videos") setScreen("videos");
    else if (label === "Analytics") setScreen("analytics");
    else if (label === "Settings") setScreen("settings");
  };

  return (
    <div className="min-h-[calc(100vh-120px)] bg-[#0f0f0f] text-white">
      {/* App Top Bar */}
      <div className="bg-[#1a1a1a] border-b border-[#2a2a2a] px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Actracia" className="w-8 h-8 rounded-lg" />
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
      {screen === "dashboard" && <DashboardScreen platform={platform} onUpload={() => setScreen("upload")} onNav={handleSidebarNav} />}
      {screen === "upload" && (
        <UploadScreen
          platform={platform}
          onPublish={simulateUpload}
          uploading={uploading}
          progress={progress}
          onNav={handleSidebarNav}
        />
      )}
      {screen === "success" && <SuccessScreen platform={platform} onDashboard={() => setScreen("dashboard")} onUploadAnother={() => setScreen("upload")} />}
      {screen === "analytics" && <AnalyticsScreen platform={platform} onNav={handleSidebarNav} />}
      {screen === "settings" && <SettingsScreen platform={platform} onNav={handleSidebarNav} />}
      {screen === "videos" && <VideosScreen platform={platform} onNav={handleSidebarNav} />}
    </div>
  );
}

/* ============================================ */
function PlatformIcon({ platform, size = 20 }: { platform: Platform; size?: number }) {
  switch (platform) {
    case "tiktok":
      return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.88-2.88 2.89 2.89 0 012.88-2.88c.28 0 .56.04.82.12v-3.5a6.37 6.37 0 00-.82-.05A6.34 6.34 0 003.15 15.3a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.87a8.28 8.28 0 004.76 1.5v-3.4a4.85 4.85 0 01-1-.28z"/></svg>;
    case "youtube":
      return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>;
    case "facebook":
      return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
    case "instagram":
      return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>;
  }
}

/* ============================================ */
function LoginScreen({ onConnect }: { onConnect: (p: Platform) => void }) {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="w-full max-w-md">
        <div className="bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a] p-8 text-center">
          <img src="/logo.png" alt="Actracia" className="w-16 h-16 rounded-2xl mx-auto mb-6" />
          <h1 className="text-2xl font-bold mb-2">Welcome to Actracia Studio</h1>
          <p className="text-gray-400 text-sm mb-8">Connect your account to start publishing short-form content.</p>

          <button
            onClick={() => onConnect("tiktok")}
            className="w-full flex items-center justify-center gap-3 bg-white text-black font-semibold py-3 rounded-xl hover:bg-gray-100 transition mb-3"
          >
            <PlatformIcon platform="tiktok" />
            Continue with TikTok
          </button>

          <button
            onClick={() => onConnect("youtube")}
            className="w-full flex items-center justify-center gap-3 bg-[#FF0000] text-white font-semibold py-3 rounded-xl hover:bg-[#cc0000] transition mb-3"
          >
            <PlatformIcon platform="youtube" size={22} />
            Continue with YouTube
          </button>

          <button
            onClick={() => onConnect("facebook")}
            className="w-full flex items-center justify-center gap-3 bg-[#1877F2] text-white font-semibold py-3 rounded-xl hover:bg-[#1565c0] transition mb-3"
          >
            <PlatformIcon platform="facebook" />
            Continue with Facebook
          </button>

          <button
            onClick={() => onConnect("instagram")}
            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#f09433] via-[#e6683c] to-[#dc2743] text-white font-semibold py-3 rounded-xl hover:opacity-90 transition mb-4"
          >
            <PlatformIcon platform="instagram" />
            Continue with Instagram
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

  const authDomains: Record<Platform, string> = {
    tiktok: "tiktok.com",
    youtube: "accounts.google.com",
    facebook: "facebook.com",
    instagram: "instagram.com",
  };

  const scopes: Record<Platform, string[]> = {
    tiktok: ["View your profile information", "Upload videos to your account", "Publish content on your behalf"],
    youtube: ["Manage your YouTube videos", "View your YouTube account", "Upload videos to your channel"],
    facebook: ["Manage your Pages", "Publish Reels to your Page", "View Page insights"],
    instagram: ["Access your Instagram account", "Publish Reels to your profile", "View media insights"],
  };

  const userInfo: Record<Platform, { name: string; detail: string }> = {
    tiktok: { name: "demo_creator", detail: "TikTok ID: 7384929102847" },
    youtube: { name: "demo_creator", detail: "noppavit.kann@gmail.com" },
    facebook: { name: "Demo Creator Page", detail: "Page ID: 102847392019" },
    instagram: { name: "@demo_creator", detail: "Instagram Business Account" },
  };

  const authColors: Record<Platform, string> = {
    tiktok: "bg-[#fe2c55] hover:bg-[#e0264c]",
    youtube: "bg-[#4285F4] hover:bg-[#3367d6]",
    facebook: "bg-[#1877F2] hover:bg-[#1565c0]",
    instagram: "bg-gradient-to-r from-[#f09433] via-[#e6683c] to-[#dc2743] hover:opacity-90",
  };

  const authLogos: Record<Platform, React.ReactNode> = {
    tiktok: <svg width="40" height="40" viewBox="0 0 24 24" fill="black" className="mx-auto mb-4"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.88-2.88 2.89 2.89 0 012.88-2.88c.28 0 .56.04.82.12v-3.5a6.37 6.37 0 00-.82-.05A6.34 6.34 0 003.15 15.3a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.87a8.28 8.28 0 004.76 1.5v-3.4a4.85 4.85 0 01-1-.28z"/></svg>,
    youtube: (
      <svg width="40" height="40" viewBox="0 0 24 24" className="mx-auto mb-4">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
    ),
    facebook: <svg width="40" height="40" viewBox="0 0 24 24" fill="#1877F2" className="mx-auto mb-4"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
    instagram: <svg width="40" height="40" viewBox="0 0 24 24" className="mx-auto mb-4"><defs><linearGradient id="ig" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#f09433"/><stop offset="50%" stopColor="#e6683c"/><stop offset="100%" stopColor="#dc2743"/></linearGradient></defs><path fill="url(#ig)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>,
  };

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
            {authDomains[platform]}
          </div>
        </div>

        <div className="bg-white rounded-b-xl p-8 text-black text-center">
          {authLogos[platform]}
          <h2 className="font-bold text-lg mb-1">Authorize Actracia Studio</h2>
          <p className="text-gray-500 text-xs mb-6">
            actracia.com wants to access your {platformConfig[platform].name} account
          </p>

          <div className="text-left bg-gray-50 rounded-xl p-4 mb-6 space-y-3">
            <p className="text-xs font-semibold text-gray-700 mb-2">This app will be able to:</p>
            {scopes[platform].map((s) => <ScopeItem key={s} text={s} />)}
          </div>

          <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex-shrink-0" />
            <div className="text-left">
              <p className="text-sm font-semibold">{userInfo[platform].name}</p>
              <p className="text-xs text-gray-400">{userInfo[platform].detail}</p>
            </div>
          </div>

          <button
            onClick={handleAuth}
            disabled={loading}
            className={`w-full py-3 text-white rounded-xl font-semibold transition disabled:opacity-70 ${authColors[platform]}`}
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
function DashboardScreen({ platform, onUpload, onNav }: { platform: Platform; onUpload: () => void; onNav: (label: string) => void }) {
  const cfg = platformConfig[platform];
  return (
    <div className="flex">
      <Sidebar active="Dashboard" platform={platform} onNav={onNav} />

      <div className="flex-1 p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-xl font-bold">Dashboard</h1>
            <p className="text-sm text-gray-400">Welcome back, demo_creator</p>
          </div>
          <button
            onClick={onUpload}
            className={`flex items-center gap-2 px-5 py-2.5 text-white rounded-xl font-semibold text-sm transition ${cfg.accentColor} ${cfg.accentHover}`}
          >
            + Upload {platform === "youtube" ? "Short" : platform === "facebook" ? "Reel" : platform === "instagram" ? "Reel" : "Video"}
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
  onNav,
}: {
  platform: Platform;
  onPublish: () => void;
  uploading: boolean;
  progress: number;
  onNav: (label: string) => void;
}) {
  const [file, setFile] = useState<string | null>(null);
  const defaultTitles: Record<Platform, string> = {
    tiktok: "Testing the TikTok API! #coding @tiktok",
    youtube: "Actracia Studio Demo #Shorts #coding #tech",
    facebook: "Check out my new Reel! #content #creator",
    instagram: "New Reel up! #reels #content #creator",
  };
  const [title, setTitle] = useState(defaultTitles[platform]);
  const defaultPrivacy: Record<Platform, string> = {
    tiktok: "PUBLIC_TO_EVERYONE",
    youtube: "private",
    facebook: "EVERYONE",
    instagram: "EVERYONE",
  };
  const [privacy, setPrivacy] = useState(defaultPrivacy[platform]);
  const cfg = platformConfig[platform];

  const uploadLabel = platform === "youtube" ? "YouTube Shorts" : platform === "facebook" ? "Facebook Reels" : platform === "instagram" ? "Instagram Reels" : "TikTok";

  return (
    <div className="flex">
      <Sidebar active="Upload Video" platform={platform} onNav={onNav} />

      <div className="flex-1 p-6 max-w-3xl">
        <button onClick={() => onNav("Dashboard")} className="text-sm text-gray-400 hover:text-white mb-4 flex items-center gap-1">
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
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-500 mb-3"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>
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
                {platform === "tiktok" && (
                  <>
                    <option value="PUBLIC_TO_EVERYONE">Public</option>
                    <option value="MUTUAL_FOLLOW_FRIENDS">Friends Only</option>
                    <option value="FOLLOWER_OF_CREATOR">Followers Only</option>
                    <option value="SELF_ONLY">Only Me</option>
                  </>
                )}
                {platform === "youtube" && (
                  <>
                    <option value="public">Public</option>
                    <option value="unlisted">Unlisted</option>
                    <option value="private">Private</option>
                  </>
                )}
                {(platform === "facebook" || platform === "instagram") && (
                  <>
                    <option value="EVERYONE">Public</option>
                    <option value="SELF">Only Me</option>
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
                    className={`w-16 h-24 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 ${i === 1 ? "ring-2 ring-purple-500" : "opacity-50"} cursor-pointer`}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs text-gray-400 block">Options</label>
              <Toggle label="Allow comments" defaultOn />
              {platform === "tiktok" && <Toggle label="Allow duets" defaultOn />}
              {platform === "tiktok" && <Toggle label="Allow stitch" defaultOn />}
              {(platform === "facebook" || platform === "instagram") && <Toggle label="Share to Feed" defaultOn />}
              <Toggle label="AI-generated content" />
            </div>

            {!uploading ? (
              <button
                onClick={onPublish}
                disabled={!file}
                className={`w-full py-3 text-white rounded-xl font-semibold transition disabled:opacity-30 disabled:cursor-not-allowed ${cfg.accentColor} ${cfg.accentHover}`}
              >
                Publish to {uploadLabel}
              </button>
            ) : (
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">
                    {progress < 50 ? "Initializing upload..." : progress < 95 ? `Uploading to ${platformConfig[platform].name}...` : "Finalizing..."}
                  </span>
                  <span className="text-white font-medium">{progress}%</span>
                </div>
                <div className="w-full bg-[#2a2a2a] rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-2 rounded-full transition-all duration-200 ${platform === "tiktok" ? "bg-[#fe2c55]" : platform === "youtube" ? "bg-[#FF0000]" : platform === "facebook" ? "bg-[#1877F2]" : "bg-gradient-to-r from-[#f09433] to-[#dc2743]"}`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex gap-4 text-[10px] text-gray-500 mt-1">
                  {platform === "tiktok" && (
                    <>
                      <span>POST /v2/post/publish/video/init/ {progress >= 30 ? "&#10003;" : "..."}</span>
                      <span>PUT upload_url {progress >= 90 ? "&#10003;" : progress >= 30 ? "..." : ""}</span>
                    </>
                  )}
                  {platform === "youtube" && (
                    <>
                      <span>POST /youtube/v3/videos?part=snippet,status {progress >= 30 ? "&#10003;" : "..."}</span>
                      <span>PUT resumable upload {progress >= 90 ? "&#10003;" : progress >= 30 ? "..." : ""}</span>
                    </>
                  )}
                  {platform === "facebook" && (
                    <>
                      <span>POST /v25.0/page_id/video_reels {progress >= 30 ? "&#10003;" : "..."}</span>
                      <span>POST upload binary {progress >= 90 ? "&#10003;" : progress >= 30 ? "..." : ""}</span>
                    </>
                  )}
                  {platform === "instagram" && (
                    <>
                      <span>POST /v25.0/ig_user/media {progress >= 30 ? "&#10003;" : "..."}</span>
                      <span>POST /v25.0/ig_user/media_publish {progress >= 90 ? "&#10003;" : progress >= 30 ? "..." : ""}</span>
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
  const cfg = platformConfig[platform];

  const successInfo: Record<Platform, { heading: string; body: string; apiOutput: React.ReactNode }> = {
    tiktok: {
      heading: "Video Published!",
      body: "Your video has been uploaded to TikTok and is now processing. It will appear on your profile shortly.",
      apiOutput: (
        <>
          <p className="text-green-400 mb-2">&#10003; Publish complete</p>
          <p>publish_id: pub_7x8k9m2n4p5q...</p>
          <p>status: processing</p>
          <p>webhook: delivered to /api/webhook</p>
        </>
      ),
    },
    youtube: {
      heading: "Short Uploaded!",
      body: "Your Short has been uploaded to YouTube and is now processing. It will appear on your channel shortly.",
      apiOutput: (
        <>
          <p className="text-green-400 mb-2">&#10003; Upload complete</p>
          <p>video_id: vsX9J-pgayw</p>
          <p>status: uploaded</p>
          <p>url: youtube.com/shorts/vsX9J-pgayw</p>
        </>
      ),
    },
    facebook: {
      heading: "Reel Published!",
      body: "Your Reel has been published to your Facebook Page and is now processing.",
      apiOutput: (
        <>
          <p className="text-green-400 mb-2">&#10003; Publish complete</p>
          <p>reel_id: 102847392019_928374...</p>
          <p>status: published</p>
          <p>url: facebook.com/reel/928374...</p>
        </>
      ),
    },
    instagram: {
      heading: "Reel Published!",
      body: "Your Reel has been published to your Instagram profile and is now processing.",
      apiOutput: (
        <>
          <p className="text-green-400 mb-2">&#10003; Publish complete</p>
          <p>media_id: 17895695668004550</p>
          <p>status: published</p>
          <p>url: instagram.com/reel/C8xK2...</p>
        </>
      ),
    },
  };

  const info = successInfo[platform];
  const defaultTitle: Record<Platform, string> = {
    tiktok: "Testing the TikTok API! #coding @tiktok",
    youtube: "Actracia Studio Demo #Shorts #coding #tech",
    facebook: "Check out my new Reel! #content #creator",
    instagram: "New Reel up! #reels #content #creator",
  };

  return (
    <div className="flex items-center justify-center py-16">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-2">{info.heading}</h1>
        <p className="text-gray-400 text-sm mb-8">{info.body}</p>

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
          <p className="text-sm">{defaultTitle[platform]}</p>
          <div className="flex gap-6 mt-3 text-xs text-gray-500">
            <span>&#9825; 0</span>
            <span>&#128172; 0</span>
            <span>&#8599; 0</span>
          </div>
        </div>

        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4 mb-8 text-left text-xs font-mono text-gray-400">
          {info.apiOutput}
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
            className={`flex-1 py-3 text-white rounded-xl text-sm font-semibold transition ${cfg.accentColor} ${cfg.accentHover}`}
          >
            Upload Another
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================ */
function AnalyticsScreen({ platform, onNav }: { platform: Platform; onNav: (label: string) => void }) {
  return (
    <div className="flex">
      <Sidebar active="Analytics" platform={platform} onNav={onNav} />
      <div className="flex-1 p-6">
        <h1 className="text-xl font-bold mb-2">Analytics</h1>
        <p className="text-sm text-gray-400 mb-8">Performance overview for your {platformConfig[platform].name} content</p>

        {/* Period selector */}
        <div className="flex gap-2 mb-6">
          {["7 days", "30 days", "90 days"].map((p, i) => (
            <button key={p} className={`px-4 py-1.5 rounded-lg text-xs font-medium transition ${i === 1 ? "bg-white/10 text-white" : "text-gray-400 hover:text-white hover:bg-white/5"}`}>{p}</button>
          ))}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Views", value: "127.4K", change: "+18.2%", up: true },
            { label: "Likes", value: "8,421", change: "+12.5%", up: true },
            { label: "Comments", value: "1,203", change: "+5.8%", up: true },
            { label: "Shares", value: "642", change: "-2.1%", up: false },
          ].map((s) => (
            <div key={s.label} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4">
              <p className="text-xs text-gray-400 mb-1">{s.label}</p>
              <p className="text-2xl font-bold">{s.value}</p>
              <p className={`text-[10px] mt-1 ${s.up ? "text-green-400" : "text-red-400"}`}>{s.change} vs last period</p>
            </div>
          ))}
        </div>

        {/* Chart placeholder */}
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-sm">Views Over Time</h2>
            <div className="flex gap-4 text-[10px] text-gray-400">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-500"></span> Views</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-pink-500"></span> Likes</span>
            </div>
          </div>
          <div className="h-48 flex items-end gap-1.5">
            {[35, 42, 58, 45, 72, 65, 48, 80, 92, 78, 95, 88, 67, 105, 98, 82, 110, 125, 108, 95, 130, 118, 142, 135, 120, 155, 148, 138, 160, 152].map((v, i) => (
              <div key={i} className="flex-1 flex flex-col gap-0.5 justify-end">
                <div className="bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-sm opacity-80" style={{ height: `${(v / 160) * 100}%` }} />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-[10px] text-gray-500">
            <span>Apr 1</span><span>Apr 8</span><span>Apr 15</span><span>Apr 19</span>
          </div>
        </div>

        {/* Top performing */}
        <h2 className="font-semibold text-sm mb-4">Top Performing Content</h2>
        <div className="space-y-3">
          {[
            { title: "Recipe hack #food", views: "15.7K", likes: "2.1K", comments: "342", color: "from-orange-500 to-red-500" },
            { title: "Day in my life #vlog", views: "12.4K", likes: "1.8K", comments: "256", color: "from-purple-600 to-pink-500" },
            { title: "Travel montage #trip", views: "9.0K", likes: "1.2K", comments: "189", color: "from-green-500 to-teal-500" },
            { title: "Coding tutorial #dev", views: "8.1K", likes: "980", comments: "145", color: "from-blue-600 to-cyan-500" },
          ].map((v, i) => (
            <div key={v.title} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4 flex items-center gap-4">
              <span className="text-xs text-gray-500 w-6">#{i + 1}</span>
              <div className={`w-12 h-16 rounded-lg bg-gradient-to-br ${v.color} flex items-center justify-center flex-shrink-0`}>
                <span className="text-sm opacity-50">&#9654;</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{v.title}</p>
                <div className="flex gap-4 mt-1 text-[10px] text-gray-400">
                  <span>{v.views} views</span>
                  <span>{v.likes} likes</span>
                  <span>{v.comments} comments</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Audience */}
        <h2 className="font-semibold text-sm mt-8 mb-4">Audience Demographics</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4">
            <p className="text-xs text-gray-400 mb-3">Age Distribution</p>
            {[
              { label: "13-17", pct: 8 },
              { label: "18-24", pct: 42 },
              { label: "25-34", pct: 31 },
              { label: "35-44", pct: 12 },
              { label: "45+", pct: 7 },
            ].map((a) => (
              <div key={a.label} className="flex items-center gap-3 mb-2">
                <span className="text-[10px] text-gray-400 w-8">{a.label}</span>
                <div className="flex-1 bg-[#2a2a2a] rounded-full h-2 overflow-hidden">
                  <div className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" style={{ width: `${a.pct}%` }} />
                </div>
                <span className="text-[10px] text-gray-400 w-8 text-right">{a.pct}%</span>
              </div>
            ))}
          </div>
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4">
            <p className="text-xs text-gray-400 mb-3">Top Countries</p>
            {[
              { country: "United States", pct: 35, flag: "US" },
              { country: "Thailand", pct: 22, flag: "TH" },
              { country: "United Kingdom", pct: 14, flag: "UK" },
              { country: "Japan", pct: 10, flag: "JP" },
              { country: "Others", pct: 19, flag: "--" },
            ].map((c) => (
              <div key={c.country} className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-gray-500 w-5">{c.flag}</span>
                  <span className="text-xs text-gray-300">{c.country}</span>
                </div>
                <span className="text-xs text-gray-400">{c.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================ */
function SettingsScreen({ platform, onNav }: { platform: Platform; onNav: (label: string) => void }) {
  const cfg = platformConfig[platform];
  return (
    <div className="flex">
      <Sidebar active="Settings" platform={platform} onNav={onNav} />
      <div className="flex-1 p-6 max-w-2xl">
        <h1 className="text-xl font-bold mb-2">Settings</h1>
        <p className="text-sm text-gray-400 mb-8">Manage your Actracia Studio preferences</p>

        {/* Account section */}
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 mb-6">
          <h2 className="font-semibold text-sm mb-4">Connected Account</h2>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-xl font-bold">D</div>
            <div>
              <p className="font-semibold">@demo_creator</p>
              <p className="text-xs text-gray-400">{platformConfig[platform].name} account</p>
              <p className="text-[10px] text-green-400 mt-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block"></span>
                Connected
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-[#222] rounded-lg p-3">
              <p className="text-gray-400 mb-1">Token Status</p>
              <p className="text-green-400 font-medium">Valid</p>
            </div>
            <div className="bg-[#222] rounded-lg p-3">
              <p className="text-gray-400 mb-1">Expires In</p>
              <p className="text-white font-medium">{platform === "tiktok" ? "23h 14m" : platform === "youtube" ? "58m" : "54 days"}</p>
            </div>
            <div className="bg-[#222] rounded-lg p-3">
              <p className="text-gray-400 mb-1">Refresh Token</p>
              <p className="text-green-400 font-medium">Available</p>
            </div>
            <div className="bg-[#222] rounded-lg p-3">
              <p className="text-gray-400 mb-1">Auto Refresh</p>
              <p className="text-green-400 font-medium">Enabled</p>
            </div>
          </div>
        </div>

        {/* Upload defaults */}
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 mb-6">
          <h2 className="font-semibold text-sm mb-4">Upload Defaults</h2>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-400 block mb-1.5">Default Privacy</label>
              <select className="w-full bg-[#222] border border-[#333] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#444] appearance-none">
                {platform === "tiktok" && (
                  <>
                    <option>Public</option>
                    <option>Friends Only</option>
                    <option>Followers Only</option>
                    <option selected>Only Me</option>
                  </>
                )}
                {platform === "youtube" && (
                  <>
                    <option>Public</option>
                    <option>Unlisted</option>
                    <option selected>Private</option>
                  </>
                )}
                {(platform === "facebook" || platform === "instagram") && (
                  <>
                    <option selected>Public</option>
                    <option>Only Me</option>
                  </>
                )}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1.5">Default Tags</label>
              <input
                type="text"
                defaultValue="#actracia #content #creator"
                className="w-full bg-[#222] border border-[#333] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#444]"
              />
            </div>
            <div className="space-y-3">
              <Toggle label="Allow comments by default" defaultOn />
              {platform === "tiktok" && <Toggle label="Allow duets by default" defaultOn />}
              <Toggle label="Disclose AI-generated content" />
              <Toggle label="Auto-post to all platforms" />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 mb-6">
          <h2 className="font-semibold text-sm mb-4">Notifications</h2>
          <div className="space-y-3">
            <Toggle label="Upload success notifications" defaultOn />
            <Toggle label="Token expiry warnings" defaultOn />
            <Toggle label="Weekly analytics summary" />
            <Toggle label="Webhook notifications" defaultOn />
          </div>
        </div>

        {/* API Config */}
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 mb-6">
          <h2 className="font-semibold text-sm mb-4">API Configuration</h2>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-400 block mb-1.5">Webhook URL</label>
              <input
                type="text"
                defaultValue="https://www.actracia.com/api/webhook"
                className="w-full bg-[#222] border border-[#333] rounded-lg px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-[#444]"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1.5">.env File Location</label>
              <input
                type="text"
                defaultValue="~/Desktop/API Upload/.env"
                readOnly
                className="w-full bg-[#222] border border-[#333] rounded-lg px-4 py-2.5 text-sm font-mono text-gray-400 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Danger zone */}
        <div className="bg-[#1a1a1a] border border-red-500/20 rounded-xl p-6">
          <h2 className="font-semibold text-sm mb-4 text-red-400">Danger Zone</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm">Disconnect {platformConfig[platform].name}</p>
              <p className="text-xs text-gray-500">Revoke access and delete stored tokens</p>
            </div>
            <button className="px-4 py-2 border border-red-500/30 text-red-400 rounded-lg text-xs hover:bg-red-500/10 transition">
              Disconnect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================ */
function VideosScreen({ platform, onNav }: { platform: Platform; onNav: (label: string) => void }) {
  return (
    <div className="flex">
      <Sidebar active="My Videos" platform={platform} onNav={onNav} />
      <div className="flex-1 p-6">
        <h1 className="text-xl font-bold mb-2">My Videos</h1>
        <p className="text-sm text-gray-400 mb-6">All your uploaded content on {platformConfig[platform].name}</p>

        <div className="flex gap-2 mb-6">
          {["All", "Published", "Processing", "Draft"].map((f, i) => (
            <button key={f} className={`px-4 py-1.5 rounded-lg text-xs font-medium transition ${i === 0 ? "bg-white/10 text-white" : "text-gray-400 hover:text-white hover:bg-white/5"}`}>{f}</button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: "Day in my life #vlog", views: "12.4K", time: "2h ago", color: "from-purple-600 to-pink-500", status: "Published" },
            { title: "Coding tutorial #dev", views: "8.1K", time: "1d ago", color: "from-blue-600 to-cyan-500", status: "Published" },
            { title: "Recipe hack #food", views: "15.7K", time: "3d ago", color: "from-orange-500 to-red-500", status: "Published" },
            { title: "Travel montage #trip", views: "9.0K", time: "5d ago", color: "from-green-500 to-teal-500", status: "Published" },
            { title: "Fitness routine #gym", views: "3.2K", time: "1w ago", color: "from-yellow-500 to-orange-500", status: "Published" },
            { title: "Unboxing #tech", views: "6.5K", time: "1w ago", color: "from-indigo-500 to-purple-500", status: "Published" },
            { title: "Study with me #study", views: "4.1K", time: "2w ago", color: "from-teal-500 to-green-500", status: "Published" },
            { title: "Morning routine #life", views: "11.2K", time: "2w ago", color: "from-pink-500 to-red-500", status: "Published" },
          ].map((video) => (
            <div key={video.title} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl overflow-hidden">
              <div className={`aspect-[9/16] bg-gradient-to-br ${video.color} flex items-center justify-center relative`}>
                <span className="text-3xl opacity-50">&#9654;</span>
                <span className="absolute bottom-2 right-2 bg-black/70 text-[10px] px-1.5 py-0.5 rounded">0:30</span>
                <span className="absolute top-2 left-2 bg-green-500/20 text-green-400 text-[9px] px-1.5 py-0.5 rounded">{video.status}</span>
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

/* ============================================
   SHARED COMPONENTS
   ============================================ */
function Sidebar({ active, platform, onNav }: { active: string; platform: Platform; onNav: (label: string) => void }) {
  const items = [
    {
      label: "Dashboard",
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
    },
    {
      label: "Upload Video",
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
    },
    {
      label: "My Videos",
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>,
    },
    {
      label: "Analytics",
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    },
    {
      label: "Settings",
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
    },
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
            <span className="flex-shrink-0">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-8 p-3 bg-[#222] rounded-lg">
        <p className="text-xs text-gray-400 mb-2">Connected to {platformConfig[platform].name}</p>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500" />
          <div>
            <p className="text-xs font-semibold">@demo_creator</p>
            <p className="text-[10px] text-green-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block"></span>
              Connected
            </p>
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
