import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Actracia Studio — Multi-Platform Video Upload",
  description: "Upload short-form videos to TikTok, YouTube Shorts, and Facebook Reels from one place. Built for creators.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-[#0a0a0a] text-white">
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl">
          <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/40 transition">A</div>
              <span className="text-lg font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Actracia</span>
            </a>
            <div className="flex items-center gap-6 text-sm">
              <a href="/demo" className="px-4 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-semibold text-white text-xs hover:opacity-90 transition shadow-lg shadow-purple-500/25">Live Demo</a>
              <a href="/privacy" className="text-gray-400 hover:text-white transition">Privacy</a>
              <a href="/terms" className="text-gray-400 hover:text-white transition">Terms</a>
            </div>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-white/10 bg-[#0a0a0a]">
          <div className="max-w-6xl mx-auto px-6 py-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-md flex items-center justify-center text-[10px] font-bold text-white">A</div>
                <span className="text-sm font-semibold text-gray-400">Actracia Studio</span>
              </div>
              <div className="flex items-center gap-6 text-xs text-gray-500">
                <a href="/privacy" className="hover:text-gray-300 transition">Privacy Policy</a>
                <a href="/terms" className="hover:text-gray-300 transition">Terms of Service</a>
                <a href="/demo" className="hover:text-gray-300 transition">Demo</a>
                <a href="/callback" className="hover:text-gray-300 transition">OAuth Callback</a>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-white/5 text-center text-xs text-gray-600">
              &copy; {new Date().getFullYear()} Actracia. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
