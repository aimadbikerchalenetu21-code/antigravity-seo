import Link from "next/link";
import { Zap, RotateCcw } from "lucide-react";

export const metadata = {
  title: "Refund & Cancellation Policy — BingDrop",
  description: "BingDrop's refund and cancellation policy for subscriptions and trial access.",
};

export default function RefundPage() {
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
            <RotateCcw className="h-3.5 w-3.5" />
            Legal
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Refund & Cancellation Policy</h1>
          <p className="text-gray-500 text-sm">Last updated: March 18, 2026</p>
        </div>
      </section>

      {/* SUMMARY CARDS */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-6 grid sm:grid-cols-3 gap-4">
          {[
            { emoji: "✅", title: "14-Day Money-Back", desc: "Full refund on all paid plans within 14 days of purchase." },
            { emoji: "🔄", title: "Cancel Anytime", desc: "No lock-in. Cancel your subscription at any time from your account." },
            { emoji: "⚡", title: "Trial is Final", desc: "The $1.99 / 24-hour trial charge is non-refundable." },
          ].map(({ emoji, title, desc }) => (
            <div key={title} className="bg-[#f0f4f8] border border-gray-200 rounded-2xl p-5 text-center">
              <div className="text-2xl mb-2">{emoji}</div>
              <p className="font-semibold text-gray-900 text-sm mb-1">{title}</p>
              <p className="text-xs text-gray-500">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6 bg-white rounded-2xl border border-gray-200 shadow-sm p-10 space-y-10">

          <LegalSection title="1. Subscription Plans">
            <p>
              BingDrop offers recurring subscription plans billed monthly, quarterly (3 months), semi-annually
              (6 months), or annually (12 months) for 1 to 4 users. All plans are prepaid and renew automatically
              at the end of each billing period unless cancelled.
            </p>
          </LegalSection>

          <LegalSection title="2. 14-Day Money-Back Guarantee">
            <p>
              We offer a <strong>14-day money-back guarantee</strong> on all new paid subscription purchases.
              If you are not satisfied with BingDrop for any reason, you may request a full refund within 14
              calendar days of your initial payment.
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>The guarantee applies to the <strong>first purchase</strong> of each subscription tier.</li>
              <li>It does not apply to renewal charges — please cancel before renewal if you wish to stop.</li>
              <li>Refunds are issued to the original payment method within 5–10 business days.</li>
              <li>To request a refund, email <a href="mailto:contact@bingdrop.com" className="text-teal-600 hover:underline">contact@bingdrop.com</a> with your account email and order details.</li>
            </ul>
          </LegalSection>

          <LegalSection title="3. Trial Access ($1.99 / 24 Hours)">
            <p>
              BingDrop offers a one-time trial for <strong>$1.99</strong> that grants full platform access for
              24 hours. This charge is <strong>non-refundable</strong> and is separate from any subscription plan.
              The trial does not automatically convert into a paid subscription — you must purchase a plan separately.
            </p>
          </LegalSection>

          <LegalSection title="4. How to Cancel Your Subscription">
            <p>You can cancel your subscription at any time using either of the following methods:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Account Settings:</strong> Navigate to your account settings and select "Cancel Subscription".</li>
              <li><strong>Email:</strong> Contact <a href="mailto:contact@bingdrop.com" className="text-teal-600 hover:underline">contact@bingdrop.com</a> from your registered email address.</li>
            </ul>
            <p className="mt-3">
              Upon cancellation, your subscription will remain active through the end of the current paid billing period.
              You will not be charged again after that date. <strong>We do not prorate partial billing periods.</strong>
            </p>
          </LegalSection>

          <LegalSection title="5. Renewals">
            <p>
              Subscriptions renew automatically unless cancelled at least <strong>24 hours before</strong> the renewal date.
              You will receive an email reminder before each renewal. If a renewal charge fails, we will retry
              up to 3 times before suspending your account. You can update your payment method at any time in
              account settings.
            </p>
          </LegalSection>

          <LegalSection title="6. Plan Changes">
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Upgrades</strong> take effect immediately; you will be charged a prorated amount for the remainder of your current billing period.</li>
              <li><strong>Downgrades</strong> take effect at the start of the next billing cycle.</li>
              <li>Adding users to your plan is treated as an upgrade and follows upgrade pricing rules.</li>
            </ul>
          </LegalSection>

          <LegalSection title="7. Exceptional Circumstances">
            <p>
              We review refund requests outside the standard 14-day window on a case-by-case basis for circumstances
              such as technical failures on our end that prevented use of the Service. We do not generally offer
              refunds for:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Forgetting to cancel before a renewal date</li>
              <li>Dissatisfaction with AI-generated content quality (output depends on your prompts and AI providers)</li>
              <li>Third-party API costs (OpenAI, Anthropic, Google charge separately for API usage)</li>
            </ul>
          </LegalSection>

          <LegalSection title="8. Contact Us">
            <p>For refund or cancellation requests, please contact:</p>
            <address className="not-italic mt-3 text-gray-700">
              <strong>Bikerchalen LLC — BingDrop Support</strong><br />
              127 N Higgins Ave, Ste 307D, Num 1765<br />
              Missoula, MT 59802, United States<br />
              Email: <a href="mailto:contact@bingdrop.com" className="text-teal-600 hover:underline">contact@bingdrop.com</a><br />
              Response time: within 2 business days
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
