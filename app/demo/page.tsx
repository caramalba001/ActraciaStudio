"use client";

import { useState } from "react";

type Screen = "login" | "authorize" | "dashboard" | "upload" | "success";

export default function DemoPage() {
  const [screen, setScreen] = useState<Screen>("login");
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

      {screen === "login" && <LoginScreen onConnect={() => setScreen("authorize")} />}
      {screen === "authorize" && <AuthorizeScreen onAuthorize={() => setScreen("dashboard")} onCancel={() => setScreen("login")} />}
      {screen === "dashboard" && <DashboardScreen onUpload={() => setScreen("upload")} />}
      {screen === "upload" && (
        <UploadScreen
          onPublish={simulateUpload}
          uploading={uploading}
          progress={progress}
          onBack={() => setScreen("dashboard")}
        />
      )}
      {screen === "success" && <SuccessScreen onDashboard={() => setScreen("dashboard")} onUploadAnother={() => setScreen("upload")} />}
    </div>
  );
}

/* ============================================ */
function LoginScreen({ onConnect }: { onConnect: () => void }) {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="w-full max-w-md">
        <div className="bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a] p-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6">A</div>
          <h1 className="text-2xl font-bold mb-2">Welcome to Actracia Studio</h1>
          <p className="text-gray-400 text-sm mb-8">Connect your TikTok account to start publishing content.</p>

          <button
            onClick={onConnect}
            className="w-full flex items-center justify-center gap-3 bg-white text-black font-semibold py-3 rounded-xl hover:bg-gray-100 transition mb-4"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.88-2.88 2.89 2.89 0 012.88-2.88c.28 0 .56.04.82.12v-3.5a6.37 6.37 0 00-.82-.05A6.34 6.34 0 003.15 15.3a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.87a8.28 8.28 0 004.76 1.5v-3.4a4.85 4.85 0 01-1-.28z"/>
            </svg>
            Continue with TikTok
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
function AuthorizeScreen({ onAuthorize, onCancel }: { onAuthorize: () => void; onCancel: () => void }) {
  const [loading, setLoading] = useState(false);

  const handleAuth = () => {
    setLoading(true);
    setTimeout(() => onAuthorize(), 1500);
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
            tiktok.com
          </div>
        </div>

        <div className="bg-white rounded-b-xl p-8 text-black text-center">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="black" className="mx-auto mb-4">
            <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.88-2.88 2.89 2.89 0 012.88-2.88c.28 0 .56.04.82.12v-3.5a6.37 6.37 0 00-.82-.05A6.34 6.34 0 003.15 15.3a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.87a8.28 8.28 0 004.76 1.5v-3.4a4.85 4.85 0 01-1-.28z"/>
          </svg>
          <h2 className="font-bold text-lg mb-1">Authorize Actracia Studio</h2>
          <p className="text-gray-500 text-xs mb-6">actracia.com wants to access your TikTok account</p>

          <div className="text-left bg-gray-50 rounded-xl p-4 mb-6 space-y-3">
            <p className="text-xs font-semibold text-gray-700 mb-2">This app will be able to:</p>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xs flex-shrink-0">&#10003;</div>
              <span>View your profile information</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xs flex-shrink-0">&#10003;</div>
              <span>Upload videos to your account</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xs flex-shrink-0">&#10003;</div>
              <span>Publish content on your behalf</span>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex-shrink-0" />
            <div className="text-left">
              <p className="text-sm font-semibold">demo_creator</p>
              <p className="text-xs text-gray-400">TikTok ID: 7384929102847</p>
            </div>
          </div>

          <button
            onClick={handleAuth}
            disabled={loading}
            className="w-full py-3 bg-[#fe2c55] text-white rounded-xl font-semibold hover:bg-[#e0264c] transition disabled:opacity-70"
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
function DashboardScreen({ onUpload }: { onUpload: () => void }) {
  return (
    <div className="flex">
      <Sidebar active="Dashboard" onNav={(label) => { if (label === "Upload Video") onUpload(); }} />

      <div className="flex-1 p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-xl font-bold">Dashboard</h1>
            <p className="text-sm text-gray-400">Welcome back, demo_creator</p>
          </div>
          <button
            onClick={onUpload}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#fe2c55] text-white rounded-xl font-semibold text-sm hover:bg-[#e0264c] transition"
          >
            + Upload Video
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
  onPublish,
  uploading,
  progress,
  onBack,
}: {
  onPublish: () => void;
  uploading: boolean;
  progress: number;
  onBack: () => void;
}) {
  const [file, setFile] = useState<string | null>(null);
  const [title, setTitle] = useState("Testing the TikTok API! #coding @tiktok");
  const [privacy, setPrivacy] = useState("PUBLIC_TO_EVERYONE");

  return (
    <div className="flex">
      <Sidebar active="Upload Video" onNav={(label) => { if (label === "Dashboard") onBack(); }} />

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
                <option value="PUBLIC_TO_EVERYONE">Public</option>
                <option value="MUTUAL_FOLLOW_FRIENDS">Friends Only</option>
                <option value="FOLLOWER_OF_CREATOR">Followers Only</option>
                <option value="SELF_ONLY">Only Me</option>
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
                className="w-full py-3 bg-[#fe2c55] text-white rounded-xl font-semibold hover:bg-[#e0264c] transition disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Publish to TikTok
              </button>
            ) : (
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">
                    {progress < 50 ? "Initializing upload..." : progress < 95 ? "Uploading to TikTok..." : "Finalizing..."}
                  </span>
                  <span className="text-white font-medium">{progress}%</span>
                </div>
                <div className="w-full bg-[#2a2a2a] rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-[#fe2c55] h-2 rounded-full transition-all duration-200"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex gap-4 text-[10px] text-gray-500 mt-1">
                  <span>POST /v2/post/publish/video/init/ {progress >= 30 ? "&#10003;" : "..."}</span>
                  <span>PUT upload_url {progress >= 90 ? "&#10003;" : progress >= 30 ? "..." : ""}</span>
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
function SuccessScreen({ onDashboard, onUploadAnother }: { onDashboard: () => void; onUploadAnother: () => void }) {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-2">Video Published!</h1>
        <p className="text-gray-400 text-sm mb-8">Your video has been uploaded to TikTok and is now processing. It will appear on your profile shortly.</p>

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
          <p className="text-sm">Testing the TikTok API! #coding @tiktok</p>
          <div className="flex gap-6 mt-3 text-xs text-gray-500">
            <span>&#9825; 0</span>
            <span>&#128172; 0</span>
            <span>&#8599; 0</span>
          </div>
        </div>

        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4 mb-8 text-left text-xs font-mono text-gray-400">
          <p className="text-green-400 mb-2">&#10003; Publish complete</p>
          <p>publish_id: pub_7x8k9m2n4p5q...</p>
          <p>status: processing</p>
          <p>webhook: delivered to /api/webhook</p>
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
function Sidebar({ active, onNav }: { active: string; onNav: (label: string) => void }) {
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
        <p className="text-xs text-gray-400 mb-2">Connected Account</p>
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
