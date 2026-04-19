import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - Actracia",
};

export default function TermsOfService() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400 mb-4">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          Legal
        </div>
        <h1 className="text-3xl font-bold mb-3">Terms of Service</h1>
        <p className="text-sm text-gray-500">Last updated: April 19, 2026</p>
      </div>

      <div className="space-y-8 text-gray-300 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
          <p>
            By accessing or using Actracia (&quot;the Service&quot;), available at{" "}
            <a href="https://www.actracia.com" className="underline">https://www.actracia.com</a>,
            you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">2. Description of Service</h2>
          <p>
            Actracia is a content management platform that allows users to upload, manage, and publish video content to social media platforms including TikTok, YouTube, and Facebook. The Service uses third-party APIs to facilitate content publishing on your behalf.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">3. User Accounts</h2>
          <p>
            To use certain features of the Service, you may need to connect your social media accounts through OAuth authorization. You are responsible for maintaining the security of your connected accounts and for all activities that occur through your use of the Service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">4. User Content</h2>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>You retain ownership of all content you upload through our Service.</li>
            <li>You are solely responsible for the content you publish and must ensure it complies with the terms of the destination platform (e.g., TikTok Community Guidelines).</li>
            <li>You must not upload content that is illegal, harmful, threatening, abusive, harassing, defamatory, or otherwise objectionable.</li>
            <li>You must not upload content that infringes on the intellectual property rights of others.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">5. Third-Party Platforms</h2>
          <p>
            Our Service integrates with third-party platforms. Your use of those platforms is governed by their respective terms of service and policies. We are not responsible for the actions or policies of third-party platforms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">6. Prohibited Uses</h2>
          <p>You agree not to:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Use the Service for any unlawful purpose or in violation of any applicable laws.</li>
            <li>Attempt to gain unauthorized access to any part of the Service.</li>
            <li>Use the Service to spam, harass, or distribute malicious content.</li>
            <li>Reverse engineer, decompile, or disassemble any part of the Service.</li>
            <li>Use automated systems (bots, scrapers) to access the Service without permission.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">7. Disclaimer of Warranties</h2>
          <p>
            The Service is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either express or implied. We do not guarantee that the Service will be uninterrupted, secure, or error-free.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">8. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, Actracia shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of the Service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">9. Termination</h2>
          <p>
            We reserve the right to suspend or terminate your access to the Service at any time, with or without cause. You may stop using the Service at any time by disconnecting your accounts and ceasing use.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">10. Changes to Terms</h2>
          <p>
            We may revise these Terms of Service at any time. Changes will be effective when posted on this page. Your continued use of the Service after changes constitutes acceptance of the revised terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">11. Contact Us</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us at:{" "}
            <strong>contact@actracia.com</strong>
          </p>
        </section>
      </div>
    </div>
  );
}
