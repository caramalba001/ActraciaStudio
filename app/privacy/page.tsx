import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Actracia",
};

export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: April 19, 2026</p>

      <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
          <p>
            Welcome to Actracia (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We operate the website{" "}
            <a href="https://www.actracia.com" className="underline">https://www.actracia.com</a>.
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">2. Information We Collect</h2>
          <p>We may collect the following types of information:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><strong>Account Information:</strong> When you connect your social media accounts (e.g., TikTok), we receive an access token and basic profile information (such as your username and display name) as authorized by you through OAuth.</li>
            <li><strong>Usage Data:</strong> We may collect information about how you interact with our service, including pages visited and features used.</li>
            <li><strong>Content Data:</strong> Videos and content you upload through our platform for publishing to social media platforms.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Provide, operate, and maintain our service.</li>
            <li>Publish content to your connected social media accounts on your behalf.</li>
            <li>Improve and personalize your experience.</li>
            <li>Communicate with you about service-related matters.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">4. Third-Party Services</h2>
          <p>
            Our service integrates with third-party platforms including TikTok. When you connect your account, you authorize us to access certain data through their APIs. These third-party services have their own privacy policies, and we encourage you to review them:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><a href="https://www.tiktok.com/legal/page/global/privacy-policy/en" className="underline">TikTok Privacy Policy</a></li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">5. Data Retention</h2>
          <p>
            We retain your information only for as long as necessary to provide our services. Access tokens are stored securely and can be revoked at any time by disconnecting your account from our service or revoking access from the third-party platform directly.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">6. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">7. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Access the personal data we hold about you.</li>
            <li>Request deletion of your data.</li>
            <li>Revoke access to connected social media accounts at any time.</li>
            <li>Opt out of any non-essential data collection.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">8. Children&apos;s Privacy</h2>
          <p>
            Our service is not intended for individuals under the age of 13. We do not knowingly collect personal information from children under 13.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">10. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:{" "}
            <strong>contact@actracia.com</strong>
          </p>
        </section>
      </div>
    </div>
  );
}
