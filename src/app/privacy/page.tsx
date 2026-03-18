import Link from "next/link";
import { Zap, Shield } from "lucide-react";

export const metadata = {
  title: "Privacy Policy — BingDrop",
  description: "How BingDrop collects, stores, and uses your data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#f0f4f8] font-sans">
      {/* NAV */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <Zap className="h-5 w-5 text-teal-500" />
            BingDrop
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">Login</Link>
            <Link href="/register" className="bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="py-14 bg-white border-b border-gray-100 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 text-teal-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            <Shield className="h-3.5 w-3.5" />
            Legal
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Privacy Policy</h1>
          <p className="text-gray-500 text-sm">Last updated: March 18, 2026</p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6 bg-white rounded-2xl border border-gray-200 shadow-sm p-10 space-y-10">

          <div>
            <p className="text-gray-600 leading-relaxed">
              Bikerchalen LLC ("we", "our", or "us") operates BingDrop (the "Service"). This Privacy Policy explains how we collect,
              use, disclose, and safeguard your information when you visit our website or use our platform. Please read this policy carefully.
              If you disagree with its terms, please discontinue use of the Service.
            </p>
          </div>

          <LegalSection title="1. Information We Collect">
            <p>We may collect the following categories of personal information:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Account Data:</strong> Name, email address, and password when you register.</li>
              <li><strong>Payment Data:</strong> Billing details processed securely through our payment processor. We do not store full card numbers.</li>
              <li><strong>Usage Data:</strong> Pages visited, features used, timestamps, IP address, browser type, and device information.</li>
              <li><strong>API Keys:</strong> Third-party API keys you voluntarily add to the platform (encrypted at rest).</li>
              <li><strong>Content Data:</strong> Prompts, generated content, and project data you create within the Service.</li>
              <li><strong>Cookies:</strong> See our Cookie Policy for details.</li>
            </ul>
          </LegalSection>

          <LegalSection title="2. How We Use Your Information">
            <ul className="list-disc pl-5 space-y-1">
              <li>Provide, operate, and maintain the Service</li>
              <li>Process transactions and send related information (receipts, invoices)</li>
              <li>Send administrative communications (account updates, security alerts)</li>
              <li>Respond to comments, questions, and support requests</li>
              <li>Monitor and analyze usage to improve the Service</li>
              <li>Detect, prevent, and address technical issues or fraud</li>
              <li>Comply with legal obligations</li>
            </ul>
            <p className="mt-3">We do <strong>not</strong> sell, rent, or trade your personal information to third parties for marketing purposes.</p>
          </LegalSection>

          <LegalSection title="3. Legal Bases for Processing (GDPR)">
            <p>If you are located in the European Economic Area, our legal bases for processing your data include:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Contract:</strong> Processing necessary to fulfill our subscription agreement with you.</li>
              <li><strong>Legitimate Interests:</strong> Improving the Service, preventing fraud, and ensuring security.</li>
              <li><strong>Consent:</strong> Where you have given explicit consent (e.g., marketing emails).</li>
              <li><strong>Legal Obligation:</strong> Where we must comply with applicable law.</li>
            </ul>
          </LegalSection>

          <LegalSection title="4. Data Sharing and Disclosure">
            <p>We may share your information with:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Service Providers:</strong> Hosting, payment processing, analytics, and email delivery vendors who process data on our behalf under confidentiality agreements.</li>
              <li><strong>AI Providers:</strong> When you use your own API keys, your prompts are sent directly to OpenAI, Anthropic, or Google under their respective terms.</li>
              <li><strong>Legal Requirements:</strong> If required by law, subpoena, or to protect the rights and safety of our users or the public.</li>
              <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your data may be transferred with notice provided to you.</li>
            </ul>
          </LegalSection>

          <LegalSection title="5. Data Retention">
            <p>
              We retain your personal data for as long as your account is active or as needed to provide the Service.
              You may request deletion of your account and associated data at any time by contacting us. We may retain
              certain information as required by law or for legitimate business purposes (e.g., billing records for tax compliance).
            </p>
          </LegalSection>

          <LegalSection title="6. Your Rights">
            <p>Depending on your location, you may have the following rights:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data.</li>
              <li><strong>Deletion:</strong> Request deletion of your personal data ("right to be forgotten").</li>
              <li><strong>Portability:</strong> Receive your data in a machine-readable format.</li>
              <li><strong>Objection / Restriction:</strong> Object to or restrict certain types of processing.</li>
              <li><strong>Opt-out of Sale (CCPA):</strong> California residents may opt out of the sale of personal information. We do not sell personal information.</li>
            </ul>
            <p className="mt-3">To exercise any of these rights, email us at <strong>contact@bingdrop.com</strong>.</p>
          </LegalSection>

          <LegalSection title="7. Security">
            <p>
              We implement industry-standard security measures including encryption in transit (TLS), encryption at rest for
              sensitive data, and access controls. However, no method of transmission over the Internet is 100% secure,
              and we cannot guarantee absolute security.
            </p>
          </LegalSection>

          <LegalSection title="8. Children's Privacy">
            <p>
              The Service is not directed to individuals under the age of 16. We do not knowingly collect personal information
              from children. If we become aware that a child under 16 has provided us with personal data, we will delete it promptly.
            </p>
          </LegalSection>

          <LegalSection title="9. International Transfers">
            <p>
              Your information may be transferred to and processed in the United States. If you are located outside the US,
              be aware that your data will be subject to US law. For EEA/UK users, we rely on appropriate safeguards (Standard
              Contractual Clauses) for cross-border transfers.
            </p>
          </LegalSection>

          <LegalSection title="10. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. We will notify you of material changes by posting the new
              policy on this page and updating the "Last updated" date. Continued use of the Service after changes constitutes
              acceptance of the revised policy.
            </p>
          </LegalSection>

          <LegalSection title="11. Contact Us">
            <p>If you have questions about this Privacy Policy, please contact:</p>
            <address className="not-italic mt-3 text-gray-700">
              <strong>Bikerchalen LLC</strong><br />
              127 N Higgins Ave, Ste 307D, Num 1765<br />
              Missoula, MT 59802<br />
              United States<br />
              Email: <a href="mailto:contact@bingdrop.com" className="text-teal-600 hover:underline">contact@bingdrop.com</a>
            </address>
          </LegalSection>

        </div>
      </section>

      <LegalFooter />
    </div>
  );
}

function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-lg font-bold text-gray-900 mb-3">{title}</h2>
      <div className="text-gray-600 leading-relaxed space-y-2 text-sm">{children}</div>
    </div>
  );
}

function LegalFooter() {
  return (
    <footer className="bg-gray-950 py-10 mt-0">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white font-bold">
            <Zap className="h-4 w-4 text-teal-500" />
            BingDrop
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <Link href="/privacy"  className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms"    className="hover:text-gray-300 transition-colors">Terms of Service</Link>
            <Link href="/cookies"  className="hover:text-gray-300 transition-colors">Cookie Policy</Link>
            <Link href="/refund"   className="hover:text-gray-300 transition-colors">Refund Policy</Link>
            <Link href="/about"    className="hover:text-gray-300 transition-colors">About</Link>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-gray-800 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} BingDrop — Bikerchalen LLC, 127 N Higgins Ave Ste 307D, Missoula, MT 59802. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
