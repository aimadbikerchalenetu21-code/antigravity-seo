import Link from "next/link";
import { Zap, Cookie } from "lucide-react";

export const metadata = {
  title: "Cookie Policy — BingDrop",
  description: "How BingDrop uses cookies and similar tracking technologies.",
};

export default function CookiesPage() {
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
            <Cookie className="h-3.5 w-3.5" />
            Legal
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Cookie Policy</h1>
          <p className="text-gray-500 text-sm">Last updated: March 18, 2026</p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6 bg-white rounded-2xl border border-gray-200 shadow-sm p-10 space-y-10">

          <div>
            <p className="text-gray-600 leading-relaxed text-sm">
              This Cookie Policy explains how Bikerchalen LLC ("we", "us", "our") uses cookies and similar tracking
              technologies when you visit or use BingDrop. By continuing to use our site, you consent to the use of
              cookies as described in this policy.
            </p>
          </div>

          <LegalSection title="1. What Are Cookies?">
            <p>
              Cookies are small text files placed on your device by a website when you visit it. They are widely used
              to make websites work more efficiently, remember your preferences, and provide information to site owners.
              Similar technologies include web beacons, pixels, and local storage.
            </p>
          </LegalSection>

          <LegalSection title="2. Types of Cookies We Use">
            <div className="space-y-4 mt-2">
              <CookieType
                name="Strictly Necessary Cookies"
                purpose="Essential for the website to function. They enable core features like secure login, session management, and navigation. These cannot be disabled."
                examples="Session token, CSRF protection token, authentication cookie"
                duration="Session / up to 30 days"
              />
              <CookieType
                name="Functional Cookies"
                purpose="Remember your preferences and settings to provide a more personalized experience."
                examples="Selected plan, preferred language, UI preferences"
                duration="Up to 1 year"
              />
              <CookieType
                name="Analytics Cookies"
                purpose="Help us understand how visitors interact with our website so we can improve it. Data is aggregated and anonymized."
                examples="Page views, session duration, referral source"
                duration="Up to 2 years"
              />
              <CookieType
                name="Performance Cookies"
                purpose="Collect information about how the website performs (errors, load times) to help us identify and fix issues."
                examples="Error logs, performance metrics"
                duration="Session"
              />
            </div>
          </LegalSection>

          <LegalSection title="3. Third-Party Cookies">
            <p>Some cookies on our site are placed by third-party services we use:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Payment Processors:</strong> For secure checkout functionality.</li>
              <li><strong>Analytics Providers:</strong> To track aggregate usage patterns. Data is pseudonymized.</li>
              <li><strong>Authentication Services:</strong> To securely manage login sessions (NextAuth.js).</li>
            </ul>
            <p className="mt-2">These third parties have their own privacy policies governing their use of your data.</p>
          </LegalSection>

          <LegalSection title="4. Managing Cookies">
            <p>You can control and manage cookies in the following ways:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>
                <strong>Browser Settings:</strong> Most browsers allow you to view, delete, or block cookies through
                their settings. Note that disabling strictly necessary cookies will affect website functionality.
              </li>
              <li>
                <strong>Opt-Out Tools:</strong> You may opt out of analytics tracking where applicable.
              </li>
              <li>
                <strong>Do Not Track:</strong> We respect Do Not Track (DNT) signals from your browser where technically feasible.
              </li>
            </ul>
            <p className="mt-3">
              To manage cookies in your browser, visit the help section of your browser:
              Chrome, Firefox, Safari, Edge, or Opera.
            </p>
          </LegalSection>

          <LegalSection title="5. Cookie Consent">
            <p>
              By continuing to use BingDrop after seeing our cookie notice, you consent to our use of cookies as
              described in this policy. You can withdraw consent at any time by adjusting your browser settings or
              contacting us. Withdrawing consent may affect your experience on the platform.
            </p>
            <p className="mt-2">
              For users in the EU/EEA, we comply with the ePrivacy Directive and GDPR requirements for cookie consent.
            </p>
          </LegalSection>

          <LegalSection title="6. Changes to This Policy">
            <p>
              We may update this Cookie Policy from time to time. Changes will be posted on this page with an updated
              date. Significant changes will be communicated via a notice on our website.
            </p>
          </LegalSection>

          <LegalSection title="7. Contact Us">
            <address className="not-italic text-gray-700">
              <strong>Bikerchalen LLC</strong><br />
              127 N Higgins Ave, Ste 307D, Num 1765<br />
              Missoula, MT 59802, United States<br />
              Email: <a href="mailto:contact@bingdrop.com" className="text-teal-600 hover:underline">contact@bingdrop.com</a>
            </address>
          </LegalSection>

        </div>
      </section>

      <LegalFooter />
    </div>
  );
}

function CookieType({ name, purpose, examples, duration }: {
  name: string; purpose: string; examples: string; duration: string;
}) {
  return (
    <div className="bg-[#f0f4f8] rounded-xl p-4 border border-gray-200">
      <p className="font-semibold text-gray-900 text-sm mb-1">{name}</p>
      <p className="text-gray-600 text-sm mb-2">{purpose}</p>
      <div className="flex flex-wrap gap-4 text-xs text-gray-500">
        <span><strong>Examples:</strong> {examples}</span>
        <span><strong>Duration:</strong> {duration}</span>
      </div>
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
