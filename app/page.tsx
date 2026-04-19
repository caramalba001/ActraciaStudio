export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Actracia</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          A content management platform that helps creators publish and manage their videos across social media platforms.
        </p>
      </section>

      <section className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800">
          <h3 className="font-semibold mb-2">Upload Videos</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Easily upload and publish your video content to platforms like TikTok.
          </p>
        </div>
        <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800">
          <h3 className="font-semibold mb-2">Manage Content</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Organize and schedule your content from a single dashboard.
          </p>
        </div>
        <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800">
          <h3 className="font-semibold mb-2">Secure Authentication</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Connect your social media accounts securely via OAuth.
          </p>
        </div>
      </section>

      <section className="text-center text-sm text-gray-500">
        <p>
          <a href="/privacy" className="underline">Privacy Policy</a>
          {" · "}
          <a href="/terms" className="underline">Terms of Service</a>
        </p>
      </section>
    </div>
  );
}
