import Link from "next/link";
import { Zap, FileText } from "lucide-react";

export const metadata = {
  title: "Terms of Service — BingDrop",
  description: "The rules and terms governing your use of the BingDrop platform.",
};

export default function TermsPage() {
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
            <FileText className="h-3.5 w-3.5" />
            Legal
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Terms of Service</h1>
          <p className="text-gray-500 text-sm">Last updated: March 18, 2026</p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6 bg-white rounded-2xl border border-gray-200 shadow-sm p-10 space-y-10">

          <div>
            <p className="text-gray-600 leading-relaxed text-sm">
              Please read these Terms of Service ("Terms") carefully before using the BingDrop platform operated by
              Bikerchalen LLC ("Company", "we", "us", or "our"). By accessing or using the Service, you agree to be
              bound by these Terms. If you do not agree, do not use the Service.
            </p>
          </div>

          <LegalSection title="1. Acceptance of Terms">
            <p>
              By creating an account or using any part of the Service, you confirm that you are at least 18 years old,
              have read and understood these Terms, and agree to be legally bound by them. If you are using the Service
              on behalf of a company or organization, you represent that you have authority to bind that entity.
            </p>
          </LegalSection>

          <LegalSection title="2. Description of Service">
            <p>
              BingDrop is an AI-powered SEO content generation platform that allows users to generate, manage, and
              export search-engine-optimized content using third-party AI providers (OpenAI, Anthropic, Google).
              Users provide their own API keys to access these AI models directly.
            </p>
          </LegalSection>

          <LegalSection title="3. User Accounts">
            <ul className="list-disc pl-5 space-y-1">
              <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
              <li>You are responsible for all activities that occur under your account.</li>
              <li>You must notify us immediately of any unauthorized use of your account.</li>
              <li>One person or legal entity may not maintain more than one free account.</li>
              <li>We reserve the right to suspend or terminate accounts that violate these Terms.</li>
            </ul>
          </LegalSection>

          <LegalSection title="4. Subscriptions and Billing">
            <p>BingDrop offers subscription plans on a recurring basis (monthly, quarterly, 6-month, and annual):</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Subscriptions automatically renew at the end of each billing period unless cancelled.</li>
              <li>You authorize us to charge your payment method on file at the start of each billing cycle.</li>
              <li>Prices are listed in USD and may be subject to applicable taxes.</li>
              <li>Downgrading or upgrading plans takes effect at the start of the next billing cycle.</li>
              <li>We reserve the right to change pricing with 30 days' advance notice.</li>
            </ul>
          </LegalSection>

          <LegalSection title="5. Refunds and Cancellation">
            <p>
              Please refer to our <Link href="/refund" className="text-teal-600 hover:underline">Refund & Cancellation Policy</Link> for
              full details. In summary:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>All paid plans include a 14-day money-back guarantee.</li>
              <li>The $1.99 trial is non-refundable.</li>
              <li>You may cancel your subscription at any time; access continues until the end of the paid period.</li>
            </ul>
          </LegalSection>

          <LegalSection title="6. Acceptable Use">
            <p>You agree not to use the Service to:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Generate content that is illegal, defamatory, harassing, or violates any third-party rights.</li>
              <li>Produce spam, misleading content, or material designed to deceive.</li>
              <li>Violate the terms of service of any connected AI provider (OpenAI, Anthropic, Google).</li>
              <li>Reverse engineer, decompile, or attempt to extract the source code of the Service.</li>
              <li>Use the Service in any way that could damage, disable, or impair it.</li>
              <li>Resell or sublicense access to the Service without written permission.</li>
            </ul>
          </LegalSection>

          <LegalSection title="7. API Keys and Third-Party Services">
            <p>
              BingDrop allows you to connect your own API keys from OpenAI, Anthropic, and Google. You are solely
              responsible for your API usage, associated costs, and compliance with those providers' terms of service.
              We store API keys in encrypted form and do not use them for any purpose other than fulfilling your
              generation requests.
            </p>
          </LegalSection>

          <LegalSection title="8. Intellectual Property">
            <p>
              <strong>Your Content:</strong> You retain ownership of any content you input and the outputs generated
              using your API keys through the Service. You are responsible for ensuring generated content does not
              infringe third-party intellectual property rights.
            </p>
            <p className="mt-2">
              <strong>Our Platform:</strong> All software, designs, trademarks, and other intellectual property of
              BingDrop remain the exclusive property of Bikerchalen LLC. Nothing in these Terms transfers any IP
              rights to you.
            </p>
          </LegalSection>

          <LegalSection title="9. Disclaimer of Warranties">
            <p>
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR
              IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
              OR NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR THAT
              GENERATED CONTENT WILL BE ACCURATE OR SUITABLE FOR YOUR PURPOSES.
            </p>
          </LegalSection>

          <LegalSection title="10. Limitation of Liability">
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, BIKERCHALEN LLC SHALL NOT BE LIABLE FOR ANY INDIRECT,
              INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR GOODWILL,
              ARISING FROM YOUR USE OF OR INABILITY TO USE THE SERVICE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH
              DAMAGES. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE 12 MONTHS PRECEDING
              THE CLAIM.
            </p>
          </LegalSection>

          <LegalSection title="11. Indemnification">
            <p>
              You agree to indemnify, defend, and hold harmless Bikerchalen LLC and its officers, directors, employees,
              and agents from any claims, damages, liabilities, and expenses (including attorneys' fees) arising from
              your use of the Service, violation of these Terms, or infringement of any third-party rights.
            </p>
          </LegalSection>

          <LegalSection title="12. Governing Law">
            <p>
              These Terms shall be governed by the laws of the State of Montana, United States, without regard to
              conflict of law principles. Any disputes shall be resolved exclusively in the state or federal courts
              located in Missoula County, Montana.
            </p>
          </LegalSection>

          <LegalSection title="13. Changes to Terms">
            <p>
              We reserve the right to modify these Terms at any time. We will provide at least 14 days' notice of
              material changes via email or a prominent notice on the Service. Continued use after changes take effect
              constitutes acceptance of the revised Terms.
            </p>
          </LegalSection>

          <LegalSection title="14. Contact">
            <address className="not-italic text-gray-700">
              <strong>Bikerchalen LLC</strong><br />
              127 N Higgins Ave, Ste 307D, Num 1765<br />
              Missoula, MT 59802, United States<br />
              Email: <a href="mailto:support@bingdrop.com" className="text-teal-600 hover:underline">support@bingdrop.com</a>
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
    <footer className="bg-gray-950 py-10">
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
