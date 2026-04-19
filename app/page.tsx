export default function Home() {
  return (
    <div className="bg-[#0a0a0a]">
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400 mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Now supporting TikTok, YouTube Shorts, Facebook Reels &amp; Instagram
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">One upload.</span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">Every platform.</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Actracia Studio helps creators publish short-form videos to TikTok, YouTube Shorts, Facebook Reels, and Instagram — all from the command line.
          </p>

          <div className="flex items-center justify-center gap-4 mb-16">
            <a
              href="/demo"
              className="px-8 py-3.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold text-white hover:opacity-90 transition shadow-lg shadow-purple-500/25 text-sm"
            >
              Try Live Demo
            </a>
            <a
              href="https://github.com/caramalba001/ActraciaStudio"
              target="_blank"
              className="px-8 py-3.5 bg-white/5 border border-white/10 rounded-xl font-semibold text-gray-300 hover:bg-white/10 transition text-sm"
            >
              View on GitHub
            </a>
          </div>

          {/* Terminal preview */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-[#1a1a1a] rounded-xl border border-white/10 overflow-hidden shadow-2xl">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                <span className="text-[11px] text-gray-500 ml-2 font-mono">~/API Upload</span>
              </div>
              <div className="px-5 py-4 font-mono text-sm text-left space-y-1.5">
                <p><span className="text-green-400">$</span> <span className="text-gray-300">python3 tiktok/upload.py --path video.mov --title &quot;Demo #fyp&quot;</span></p>
                <p className="text-gray-500">✅ TikTok token valid</p>
                <p className="text-gray-500">📹 Video: video.mov (15.2 MB)</p>
                <p className="text-gray-500">⏳ Uploading...</p>
                <p className="text-green-400">✅ Upload complete! Published to TikTok</p>
                <p className="text-gray-600 mt-2">─────────────────────────────────────</p>
                <p><span className="text-green-400">$</span> <span className="text-gray-300">python3 youtube/upload.py --path video.mov --title &quot;Demo #Shorts&quot;</span></p>
                <p className="text-gray-500">✅ YouTube token valid</p>
                <p className="text-green-400">✅ Upload complete! youtube.com/shorts/vsX9J...</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Platforms ─── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Supported Platforms</h2>
          <p className="text-gray-400 max-w-xl mx-auto">Publish to all major short-form video platforms with a single command.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* TikTok */}
          <div className="group relative bg-[#1a1a1a] rounded-2xl border border-white/5 p-8 hover:border-white/15 transition overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-pink-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition" />
            <div className="relative">
              <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center mb-5 border border-white/10">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.88-2.88 2.89 2.89 0 012.88-2.88c.28 0 .56.04.82.12v-3.5a6.37 6.37 0 00-.82-.05A6.34 6.34 0 003.15 15.3a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.87a8.28 8.28 0 004.76 1.5v-3.4a4.85 4.85 0 01-1-.28z"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-2">TikTok</h3>
              <p className="text-sm text-gray-400 mb-4">Upload videos via Content Posting API. Supports privacy levels, captions, and hashtags.</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-[10px] px-2 py-1 bg-white/5 rounded-full text-gray-400">OAuth 2.0</span>
                <span className="text-[10px] px-2 py-1 bg-white/5 rounded-full text-gray-400">Video Upload</span>
                <span className="text-[10px] px-2 py-1 bg-white/5 rounded-full text-gray-400">Auto Refresh</span>
              </div>
            </div>
          </div>

          {/* YouTube */}
          <div className="group relative bg-[#1a1a1a] rounded-2xl border border-white/5 p-8 hover:border-white/15 transition overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition" />
            <div className="relative">
              <div className="w-14 h-14 bg-[#FF0000] rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-red-500/20">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-2">YouTube Shorts</h3>
              <p className="text-sm text-gray-400 mb-4">Resumable uploads via Data API v3. Vertical videos auto-detected as Shorts.</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-[10px] px-2 py-1 bg-white/5 rounded-full text-gray-400">Google OAuth</span>
                <span className="text-[10px] px-2 py-1 bg-white/5 rounded-full text-gray-400">Resumable Upload</span>
                <span className="text-[10px] px-2 py-1 bg-white/5 rounded-full text-gray-400">Auto Refresh</span>
              </div>
            </div>
          </div>

          {/* Facebook */}
          <div className="group relative bg-[#1a1a1a] rounded-2xl border border-white/5 p-8 hover:border-white/15 transition overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition" />
            <div className="relative">
              <div className="w-14 h-14 bg-[#1877F2] rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-blue-500/20">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Facebook Reels</h3>
              <p className="text-sm text-gray-400 mb-4">Publish Reels to your Facebook Page via Graph API. Supports descriptions and tags.</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-[10px] px-2 py-1 bg-white/5 rounded-full text-gray-400">Graph API v25</span>
                <span className="text-[10px] px-2 py-1 bg-white/5 rounded-full text-gray-400">Page Reels</span>
                <span className="text-[10px] px-2 py-1 bg-white/5 rounded-full text-gray-400">Long-lived Token</span>
              </div>
            </div>
          </div>

          {/* Instagram */}
          <div className="group relative bg-[#1a1a1a] rounded-2xl border border-white/5 p-8 hover:border-white/15 transition overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-500/10 to-pink-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition" />
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#bc1888] rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-pink-500/20">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Instagram Reels</h3>
              <p className="text-sm text-gray-400 mb-4">Publish Reels to your Instagram profile via Graph API. Auto-share to Feed.</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-[10px] px-2 py-1 bg-white/5 rounded-full text-gray-400">Graph API</span>
                <span className="text-[10px] px-2 py-1 bg-white/5 rounded-full text-gray-400">Reels</span>
                <span className="text-[10px] px-2 py-1 bg-white/5 rounded-full text-gray-400">Business Account</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-400 max-w-xl mx-auto">Three steps to publish your content everywhere.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Authenticate",
              desc: "Run authen.py once per platform. OAuth tokens are saved securely to .env.",
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
              ),
            },
            {
              step: "02",
              title: "Upload",
              desc: "Run upload.py with your video path, title, and privacy. Tokens auto-refresh.",
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              ),
            },
            {
              step: "03",
              title: "Published",
              desc: "Your video goes live on TikTok, YouTube, or Facebook. Check status anytime.",
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              ),
            },
          ].map((item) => (
            <div key={item.step} className="relative bg-[#1a1a1a] rounded-2xl border border-white/5 p-8">
              <div className="text-5xl font-black text-white/5 absolute top-4 right-6">{item.step}</div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center text-purple-400 mb-5">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Features ─── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for Developers</h2>
          <p className="text-gray-400 max-w-xl mx-auto">Clean Python scripts. No bloated SDKs. Just works.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { title: "CLI First", desc: "Upload from terminal with full parameter control", icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>) },
            { title: "Token Manager", desc: "Auto-refresh expired tokens, save to .env", icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>) },
            { title: "Multi-Platform", desc: "TikTok, YouTube, Facebook from one codebase", icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>) },
            { title: "Secure OAuth", desc: "Industry-standard OAuth 2.0 flows", icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>) },
            { title: "Auto Refresh", desc: "Tokens refresh automatically before uploads", icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg>) },
            { title: "Organized", desc: "Clean folder structure per platform", icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>) },
            { title: "Pure Python", desc: "No complex dependencies, just requests", icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>) },
            { title: "Open Source", desc: "Full source code on GitHub", icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>) },
          ].map((f) => (
            <div key={f.title} className="bg-[#1a1a1a] rounded-xl border border-white/5 p-5 hover:border-white/10 transition">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center text-purple-400 mb-3">{f.icon}</div>
              <h3 className="font-semibold text-sm mb-1">{f.title}</h3>
              <p className="text-xs text-gray-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="relative bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl border border-white/10 p-12 md:p-16 text-center overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to publish?</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">Try the interactive demo or clone the repo to get started in minutes.</p>
            <div className="flex items-center justify-center gap-4">
              <a
                href="/demo"
                className="px-8 py-3.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold text-white hover:opacity-90 transition shadow-lg shadow-purple-500/25 text-sm"
              >
                Try Live Demo
              </a>
              <a
                href="https://github.com/caramalba001/ActraciaStudio"
                target="_blank"
                className="px-8 py-3.5 bg-white/5 border border-white/10 rounded-xl font-semibold text-gray-300 hover:bg-white/10 transition text-sm"
              >
                GitHub Repo
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
