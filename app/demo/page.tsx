"use client";

import { useState } from "react";

type Platform = "tiktok" | "youtube" | "facebook" | "instagram";
type Tab = "dashboard" | "upload" | "videos" | "analytics" | "settings";

/* ── Platform metadata ── */
const platforms: Record<Platform, { name: string; accent: string; icon: React.ReactNode }> = {
  tiktok: {
    name: "TikTok",
    accent: "#fe2c55",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.88-2.88 2.89 2.89 0 012.88-2.88c.28 0 .56.04.82.12v-3.5a6.37 6.37 0 00-.82-.05A6.34 6.34 0 003.15 15.3a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.87a8.28 8.28 0 004.76 1.5v-3.4a4.85 4.85 0 01-1-.28z"/></svg>,
  },
  youtube: {
    name: "YouTube",
    accent: "#FF0000",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
  },
  facebook: {
    name: "Facebook",
    accent: "#1877F2",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
  },
  instagram: {
    name: "Instagram",
    accent: "#E1306C",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>,
  },
};

const allPlatforms: Platform[] = ["tiktok", "youtube", "facebook", "instagram"];

/* ════════════════════════════════════════════ */
export default function DemoPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [activePlatform, setActivePlatform] = useState<Platform>("tiktok");
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploaded, setUploaded] = useState(false);

  const simulateUpload = () => {
    setUploading(true);
    setProgress(0);
    setUploaded(false);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          setUploaded(true);
          return 100;
        }
        return prev + 3;
      });
    }, 80);
  };

  if (!loggedIn) {
    return <LoginScreen onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <div className="min-h-[calc(100vh-120px)] bg-[#0a0a0a] text-white">
      {/* Top bar */}
      <div className="border-b border-white/5 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Actracia" className="w-7 h-7 rounded-md" />
          <span className="font-semibold text-sm">Actracia Studio</span>
          <span className="text-[10px] px-2 py-0.5 bg-yellow-500/20 text-yellow-400 rounded-full">DEMO</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-gray-500">admin</span>
          <button onClick={() => { setLoggedIn(false); setActiveTab("dashboard"); setUploaded(false); setProgress(0); }} className="text-xs text-gray-500 hover:text-white transition">
            Log out
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-56 border-r border-white/5 min-h-[calc(100vh-168px)] p-4 hidden md:flex flex-col justify-between">
          <div>
            {/* Platform tabs */}
            <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-3 px-2">Platforms</p>
            <div className="space-y-0.5 mb-6">
              {allPlatforms.map((p) => (
                <button
                  key={p}
                  onClick={() => { setActivePlatform(p); setActiveTab("dashboard"); setUploaded(false); setProgress(0); setUploading(false); }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition ${
                    activePlatform === p ? "bg-white/5 text-white" : "text-gray-500 hover:text-gray-300 hover:bg-white/[0.02]"
                  }`}
                >
                  <span className="flex-shrink-0" style={{ color: activePlatform === p ? platforms[p].accent : undefined }}>{platforms[p].icon}</span>
                  {platforms[p].name}
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-green-500" />
                </button>
              ))}
            </div>

            {/* Navigation */}
            <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-3 px-2">Menu</p>
            <nav className="space-y-0.5">
              {([
                { id: "dashboard" as Tab, label: "Dashboard", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg> },
                { id: "upload" as Tab, label: "Upload", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg> },
                { id: "videos" as Tab, label: "Videos", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg> },
                { id: "analytics" as Tab, label: "Analytics", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg> },
                { id: "settings" as Tab, label: "Settings", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9c.26.604.852.997 1.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg> },
              ]).map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setUploaded(false); setProgress(0); setUploading(false); }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition ${
                    activeTab === item.id ? "bg-white/5 text-white" : "text-gray-500 hover:text-gray-300 hover:bg-white/[0.02]"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Connected user */}
          <div className="p-3 border border-white/5 rounded-lg mt-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-[10px] font-bold">A</div>
              <div>
                <p className="text-xs font-medium">admin</p>
                <p className="text-[10px] text-gray-500">4 platforms linked</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-auto">
          {/* Platform indicator */}
          <div className="flex items-center gap-2 mb-6">
            <span style={{ color: platforms[activePlatform].accent }}>{platforms[activePlatform].icon}</span>
            <span className="text-sm font-medium">{platforms[activePlatform].name}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span className="text-[10px] text-gray-500">Connected</span>
          </div>

          {activeTab === "dashboard" && <DashboardContent platform={activePlatform} onUpload={() => setActiveTab("upload")} />}
          {activeTab === "upload" && <UploadContent platform={activePlatform} onPublish={simulateUpload} uploading={uploading} progress={progress} uploaded={uploaded} />}
          {activeTab === "videos" && <VideosContent platform={activePlatform} />}
          {activeTab === "analytics" && <AnalyticsContent platform={activePlatform} />}
          {activeTab === "settings" && <SettingsContent platform={activePlatform} />}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   LOGIN
   ════════════════════════════════════════════ */
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user === "admin" && pass === "admin") {
      onLogin();
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center bg-[#0a0a0a]">
      <div className="w-full max-w-sm px-6">
        <div className="text-center mb-8">
          <img src="/logo.png" alt="Actracia" className="w-14 h-14 rounded-xl mx-auto mb-4" />
          <h1 className="text-xl font-bold">Actracia Studio</h1>
          <p className="text-sm text-gray-500 mt-1">Sign in to manage your platforms</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-gray-500 block mb-1.5">Username</label>
            <input
              type="text"
              value={user}
              onChange={(e) => { setUser(e.target.value); setError(false); }}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-white/20 transition"
              placeholder="admin"
              autoFocus
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1.5">Password</label>
            <input
              type="password"
              value={pass}
              onChange={(e) => { setPass(e.target.value); setError(false); }}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-white/20 transition"
              placeholder="admin"
            />
          </div>

          {error && <p className="text-xs text-red-400">Invalid credentials. Use admin / admin.</p>}

          <button
            type="submit"
            className="w-full py-2.5 bg-white text-black rounded-lg text-sm font-semibold hover:bg-gray-200 transition"
          >
            Sign in
          </button>
        </form>

        <p className="text-center text-[11px] text-gray-600 mt-6">
          Demo credentials: admin / admin
        </p>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   DASHBOARD
   ════════════════════════════════════════════ */
function DashboardContent({ platform, onUpload }: { platform: Platform; onUpload: () => void }) {
  const stats: Record<Platform, { videos: string; views: string; followers: string; engagement: string }> = {
    tiktok: { videos: "24", views: "128.5K", followers: "3,241", engagement: "6.8%" },
    youtube: { videos: "18", views: "45.2K", followers: "1,847", engagement: "4.2%" },
    facebook: { videos: "12", views: "32.1K", followers: "2,104", engagement: "3.5%" },
    instagram: { videos: "31", views: "89.7K", followers: "5,629", engagement: "7.1%" },
  };
  const s = stats[platform];

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-bold">Dashboard</h1>
        <button
          onClick={onUpload}
          className="px-4 py-2 text-sm font-medium rounded-lg transition text-white"
          style={{ backgroundColor: platforms[platform].accent }}
        >
          + Upload
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
          { label: "Videos", value: s.videos },
          { label: "Views", value: s.views },
          { label: "Followers", value: s.followers },
          { label: "Engagement", value: s.engagement },
        ].map((stat) => (
          <div key={stat.label} className="bg-white/[0.02] border border-white/5 rounded-xl p-4">
            <p className="text-[10px] text-gray-500 mb-1">{stat.label}</p>
            <p className="text-xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      <h2 className="text-sm font-semibold mb-3">Recent</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { title: "Day in my life", views: "12.4K", color: "from-purple-600 to-pink-500" },
          { title: "Coding tutorial", views: "8.1K", color: "from-blue-600 to-cyan-500" },
          { title: "Recipe hack", views: "15.7K", color: "from-orange-500 to-red-500" },
          { title: "Travel montage", views: "9.0K", color: "from-green-500 to-teal-500" },
        ].map((v) => (
          <div key={v.title} className="bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden">
            <div className={`aspect-[9/16] bg-gradient-to-br ${v.color} flex items-center justify-center relative`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white" className="opacity-30"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              <span className="absolute bottom-1.5 right-1.5 bg-black/60 text-[9px] px-1 py-0.5 rounded">0:30</span>
            </div>
            <div className="p-2.5">
              <p className="text-xs font-medium truncate">{v.title}</p>
              <p className="text-[10px] text-gray-500 mt-0.5">{v.views} views</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ════════════════════════════════════════════
   UPLOAD
   ════════════════════════════════════════════ */
function UploadContent({ platform, onPublish, uploading, progress, uploaded }: { platform: Platform; onPublish: () => void; uploading: boolean; progress: number; uploaded: boolean }) {
  const [file, setFile] = useState<string | null>(null);
  const label = platform === "youtube" ? "YouTube Shorts" : platform === "facebook" ? "Facebook Reels" : platform === "instagram" ? "Instagram Reels" : "TikTok";

  const apiCalls: Record<Platform, [string, string]> = {
    tiktok: ["POST /v2/post/publish/video/init/", "PUT upload_url"],
    youtube: ["POST /youtube/v3/videos?part=snippet,status", "PUT resumable upload"],
    facebook: ["POST /v25.0/{page_id}/video_reels", "POST upload binary"],
    instagram: ["POST /v25.0/{ig_user}/media", "POST /v25.0/{ig_user}/media_publish"],
  };

  if (uploaded) {
    return (
      <div className="max-w-md mx-auto py-12 text-center">
        <div className="w-14 h-14 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h2 className="text-lg font-bold mb-1">Published to {label}</h2>
        <p className="text-sm text-gray-500 mb-6">Your video is now processing.</p>
        <div className="bg-white/[0.02] border border-white/5 rounded-lg p-3 mb-6 text-left font-mono text-xs text-gray-400">
          <p className="text-green-400 mb-1">&#10003; Upload complete</p>
          {platform === "tiktok" && <><p>publish_id: pub_7x8k9m2n4p5q...</p><p>status: processing</p></>}
          {platform === "youtube" && <><p>video_id: vsX9J-pgayw</p><p>url: youtube.com/shorts/vsX9J...</p></>}
          {platform === "facebook" && <><p>reel_id: 102847392019_928...</p><p>status: published</p></>}
          {platform === "instagram" && <><p>media_id: 17895695668004550</p><p>status: published</p></>}
        </div>
        <button onClick={() => { setFile(null); }} className="text-sm text-gray-400 hover:text-white transition">Upload another</button>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-lg font-bold mb-6">Upload to {label}</h1>
      <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
        <div>
          {!file ? (
            <button onClick={() => setFile("my_video.mp4")} className="w-full aspect-[9/14] border border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center hover:border-white/20 transition">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-600 mb-2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              <p className="text-xs text-gray-500">Select video</p>
              <p className="text-[10px] text-gray-600 mt-0.5">MP4, WebM up to 500MB</p>
            </button>
          ) : (
            <div className="w-full aspect-[9/14] bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center relative overflow-hidden">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="white" className="opacity-20"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur p-2.5">
                <p className="text-xs">my_video.mp4</p>
                <p className="text-[10px] text-gray-400">15.2 MB &middot; 1080x1920</p>
              </div>
              <button onClick={() => setFile(null)} className="absolute top-2 right-2 w-5 h-5 bg-black/40 rounded-full flex items-center justify-center text-[10px] hover:bg-black/60">&#10005;</button>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs text-gray-500 block mb-1">Description</label>
            <textarea
              defaultValue={`Testing ${label} upload via Actracia Studio`}
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-white/20 resize-none"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 block mb-1">Privacy</label>
            <select className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:outline-none appearance-none">
              {platform === "tiktok" && <><option>Public</option><option>Friends</option><option>Followers</option><option>Only Me</option></>}
              {platform === "youtube" && <><option>Private</option><option>Unlisted</option><option>Public</option></>}
              {(platform === "facebook" || platform === "instagram") && <><option>Public</option><option>Only Me</option></>}
            </select>
          </div>

          <div className="space-y-2">
            <Toggle label="Allow comments" defaultOn />
            {platform === "tiktok" && <Toggle label="Allow duets" defaultOn />}
            {(platform === "facebook" || platform === "instagram") && <Toggle label="Share to Feed" defaultOn />}
          </div>

          {!uploading ? (
            <button
              onClick={onPublish}
              disabled={!file}
              className="w-full py-2.5 text-white rounded-lg text-sm font-medium transition disabled:opacity-20"
              style={{ backgroundColor: platforms[platform].accent }}
            >
              Publish
            </button>
          ) : (
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">{progress < 50 ? "Initializing..." : progress < 95 ? "Uploading..." : "Finalizing..."}</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                <div className="h-1.5 rounded-full transition-all duration-200" style={{ width: `${progress}%`, backgroundColor: platforms[platform].accent }} />
              </div>
              <div className="flex gap-3 text-[10px] text-gray-600">
                <span>{apiCalls[platform][0]} {progress >= 30 ? "&#10003;" : "..."}</span>
                <span>{apiCalls[platform][1]} {progress >= 90 ? "&#10003;" : progress >= 30 ? "..." : ""}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/* ════════════════════════════════════════════
   VIDEOS
   ════════════════════════════════════════════ */
function VideosContent({ platform }: { platform: Platform }) {
  const videos = [
    { title: "Day in my life #vlog", views: "12.4K", time: "2h ago", color: "from-purple-600 to-pink-500" },
    { title: "Coding tutorial #dev", views: "8.1K", time: "1d ago", color: "from-blue-600 to-cyan-500" },
    { title: "Recipe hack #food", views: "15.7K", time: "3d ago", color: "from-orange-500 to-red-500" },
    { title: "Travel montage #trip", views: "9.0K", time: "5d ago", color: "from-green-500 to-teal-500" },
    { title: "Fitness routine #gym", views: "3.2K", time: "1w ago", color: "from-yellow-500 to-orange-500" },
    { title: "Unboxing #tech", views: "6.5K", time: "1w ago", color: "from-indigo-500 to-purple-500" },
    { title: "Study with me", views: "4.1K", time: "2w ago", color: "from-teal-500 to-green-500" },
    { title: "Morning routine", views: "11.2K", time: "2w ago", color: "from-pink-500 to-red-500" },
  ];

  return (
    <>
      <h1 className="text-lg font-bold mb-1">Videos</h1>
      <p className="text-sm text-gray-500 mb-6">{videos.length} videos on {platforms[platform].name}</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {videos.map((v) => (
          <div key={v.title} className="bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden">
            <div className={`aspect-[9/16] bg-gradient-to-br ${v.color} flex items-center justify-center relative`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white" className="opacity-30"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              <span className="absolute bottom-1.5 right-1.5 bg-black/60 text-[9px] px-1 py-0.5 rounded">0:30</span>
            </div>
            <div className="p-2.5">
              <p className="text-xs font-medium truncate">{v.title}</p>
              <div className="flex justify-between mt-0.5">
                <p className="text-[10px] text-gray-500">{v.views} views</p>
                <p className="text-[10px] text-gray-600">{v.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ════════════════════════════════════════════
   ANALYTICS
   ════════════════════════════════════════════ */
function AnalyticsContent({ platform }: { platform: Platform }) {
  const data: Record<Platform, { views: string; likes: string; comments: string; shares: string }> = {
    tiktok: { views: "128.5K", likes: "12,842", comments: "2,104", shares: "1,847" },
    youtube: { views: "45.2K", likes: "3,421", comments: "892", shares: "421" },
    facebook: { views: "32.1K", likes: "2,847", comments: "643", shares: "312" },
    instagram: { views: "89.7K", likes: "9,241", comments: "1,587", shares: "824" },
  };
  const d = data[platform];
  const bars = [35, 42, 58, 45, 72, 65, 48, 80, 92, 78, 95, 88, 67, 105, 98, 82, 110, 125, 108, 95, 130, 118, 142, 135, 120, 155, 148, 138, 160, 152];

  return (
    <>
      <h1 className="text-lg font-bold mb-1">Analytics</h1>
      <p className="text-sm text-gray-500 mb-6">{platforms[platform].name} performance (30 days)</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
          { label: "Views", value: d.views },
          { label: "Likes", value: d.likes },
          { label: "Comments", value: d.comments },
          { label: "Shares", value: d.shares },
        ].map((s) => (
          <div key={s.label} className="bg-white/[0.02] border border-white/5 rounded-xl p-4">
            <p className="text-[10px] text-gray-500 mb-1">{s.label}</p>
            <p className="text-xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5 mb-8">
        <p className="text-sm font-medium mb-4">Views over time</p>
        <div className="h-40 flex items-end gap-[3px]">
          {bars.map((v, i) => (
            <div key={i} className="flex-1 rounded-t-sm transition-all" style={{ height: `${(v / 160) * 100}%`, backgroundColor: platforms[platform].accent, opacity: 0.7 }} />
          ))}
        </div>
        <div className="flex justify-between mt-2 text-[10px] text-gray-600">
          <span>Mar 20</span><span>Mar 27</span><span>Apr 5</span><span>Apr 12</span><span>Apr 19</span>
        </div>
      </div>

      {/* Top content */}
      <p className="text-sm font-medium mb-3">Top performing</p>
      <div className="space-y-2">
        {[
          { title: "Recipe hack #food", views: "15.7K", likes: "2.1K" },
          { title: "Day in my life #vlog", views: "12.4K", likes: "1.8K" },
          { title: "Travel montage #trip", views: "9.0K", likes: "1.2K" },
        ].map((v, i) => (
          <div key={v.title} className="bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3 flex items-center gap-3">
            <span className="text-xs text-gray-600 w-4">{i + 1}</span>
            <span className="text-sm flex-1">{v.title}</span>
            <span className="text-xs text-gray-500">{v.views} views</span>
            <span className="text-xs text-gray-600">{v.likes} likes</span>
          </div>
        ))}
      </div>
    </>
  );
}

/* ════════════════════════════════════════════
   SETTINGS
   ════════════════════════════════════════════ */
function SettingsContent({ platform }: { platform: Platform }) {
  const tokenExpiry: Record<Platform, string> = {
    tiktok: "23h 14m",
    youtube: "58m",
    facebook: "54 days",
    instagram: "54 days",
  };

  return (
    <>
      <h1 className="text-lg font-bold mb-1">Settings</h1>
      <p className="text-sm text-gray-500 mb-6">{platforms[platform].name} configuration</p>

      {/* Account */}
      <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5 mb-4">
        <p className="text-sm font-medium mb-4">Connected Account</p>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-sm font-bold">D</div>
          <div>
            <p className="text-sm font-medium">@demo_creator</p>
            <p className="text-[10px] text-green-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>
              Connected
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white/[0.03] rounded-lg p-2.5">
            <p className="text-[10px] text-gray-500">Token Status</p>
            <p className="text-xs text-green-400 font-medium">Valid</p>
          </div>
          <div className="bg-white/[0.03] rounded-lg p-2.5">
            <p className="text-[10px] text-gray-500">Expires In</p>
            <p className="text-xs font-medium">{tokenExpiry[platform]}</p>
          </div>
          <div className="bg-white/[0.03] rounded-lg p-2.5">
            <p className="text-[10px] text-gray-500">Refresh Token</p>
            <p className="text-xs text-green-400 font-medium">Available</p>
          </div>
          <div className="bg-white/[0.03] rounded-lg p-2.5">
            <p className="text-[10px] text-gray-500">Auto Refresh</p>
            <p className="text-xs text-green-400 font-medium">Enabled</p>
          </div>
        </div>
      </div>

      {/* Upload defaults */}
      <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5 mb-4">
        <p className="text-sm font-medium mb-4">Upload Defaults</p>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-500 block mb-1">Default Privacy</label>
            <select className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none appearance-none">
              {platform === "tiktok" && <><option>Only Me</option><option>Public</option></>}
              {platform === "youtube" && <><option>Private</option><option>Public</option></>}
              {(platform === "facebook" || platform === "instagram") && <><option>Public</option><option>Only Me</option></>}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1">Default Tags</label>
            <input defaultValue="#actracia #content" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none" />
          </div>
          <Toggle label="Allow comments by default" defaultOn />
          <Toggle label="Disclose AI-generated content" />
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5 mb-4">
        <p className="text-sm font-medium mb-4">Notifications</p>
        <div className="space-y-2">
          <Toggle label="Upload success" defaultOn />
          <Toggle label="Token expiry warnings" defaultOn />
          <Toggle label="Weekly analytics" />
        </div>
      </div>

      {/* Danger */}
      <div className="bg-white/[0.02] border border-red-500/10 rounded-xl p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-red-400">Disconnect {platforms[platform].name}</p>
            <p className="text-[10px] text-gray-500">Revoke access and delete tokens</p>
          </div>
          <button className="px-3 py-1.5 border border-red-500/20 text-red-400 rounded-lg text-xs hover:bg-red-500/10 transition">Disconnect</button>
        </div>
      </div>
    </>
  );
}

/* ════════════════════════════════════════════
   SHARED
   ════════════════════════════════════════════ */
function Toggle({ label, defaultOn = false }: { label: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button onClick={() => setOn(!on)} className="flex items-center gap-3 w-full text-left">
      <div className={`w-8 h-[18px] rounded-full relative transition-colors ${on ? "bg-green-500" : "bg-white/10"}`}>
        <div className={`w-3.5 h-3.5 rounded-full absolute top-[2px] transition-all ${on ? "right-[2px] bg-white" : "left-[2px] bg-gray-500"}`} />
      </div>
      <span className={`text-sm ${on ? "text-white" : "text-gray-500"}`}>{label}</span>
    </button>
  );
}
