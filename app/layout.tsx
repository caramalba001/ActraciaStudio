import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Actracia - Content Management Platform",
  description: "Actracia helps creators manage and publish content across social media platforms.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <header className="border-b border-gray-200 dark:border-gray-800">
          <nav className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
            <a href="/" className="text-xl font-bold">Actracia</a>
            <div className="flex gap-6 text-sm">
              <a href="/demo" className="hover:underline font-semibold text-blue-500">Demo</a>
              <a href="/privacy" className="hover:underline">Privacy Policy</a>
              <a href="/terms" className="hover:underline">Terms of Service</a>
            </div>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-gray-200 dark:border-gray-800 py-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Actracia. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
