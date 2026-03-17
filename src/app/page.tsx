import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Zap,
  Globe,
  ShieldCheck,
  Link2,
  FileText,
  Code2,
  Check,
  X,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

export default async function LandingPage() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/dashboard");

  return (
    <div className="min-h-screen bg-[#f0f4f8] font-sans">
      {/* NAV */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-lg">
            <Zap className="h-5 w-5 text-teal-500" />
            <span>AntiGravity SEO</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-600">
            <a href="#features" className="hover:text-gray-900 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-gray-900 transition-colors">How It Works</a>
            <a href="#pricing" className="hover:text-gray-900 transition-colors">Pricing</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              Login
            </Link>
            <Link
              href="/register"
              className="bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 text-teal-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
          AI-Powered Content Generation
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight mb-6">
          Create{" "}
          <span className="text-teal-500">SEO Content</span>
          <br />
          That Actually Ranks
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto mb-10">
          Generate optimized titles, meta descriptions, and full articles in 30+ languages.
          Bring your own API keys from OpenAI, Anthropic, or Google.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="/register"
            className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors text-sm"
          >
            Start Free <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="#how-it-works"
            className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
          >
            Learn More
          </a>
        </div>

        {/* Stats */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
          {[
            { value: "30+", label: "LANGUAGES" },
            { value: "3", label: "AI PROVIDERS" },
            { value: "100%", label: "SEO OPTIMIZED" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-3xl font-extrabold text-gray-900">{value}</div>
              <div className="text-xs text-gray-400 tracking-widest mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="bg-[#eef2f7] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Everything You Need</h2>
            <p className="text-gray-500">Powerful features to create content that ranks on search engines and engages your audience.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: Zap,
                title: "Multi-AI Support",
                desc: "Choose from OpenAI GPT-4, Anthropic Claude, or Google Gemini. Use your own API keys for full control and privacy.",
              },
              {
                icon: Globe,
                title: "30+ Languages",
                desc: "Generate content in English, French, Spanish, Japanese, Arabic, and 25+ more languages with native SEO optimization.",
              },
              {
                icon: ShieldCheck,
                title: "SEO Best Practices",
                desc: "Every piece of content follows Rank Math SEO 100 guidelines with proper keyword placement, headings, and meta optimization.",
              },
              {
                icon: Link2,
                title: "Link Strategy",
                desc: "Scrape and manage internal and external links. Automatically weave them into your content for better SEO authority.",
              },
              {
                icon: FileText,
                title: "Multiple Content Types",
                desc: "Generate title tags, meta descriptions, blog posts, and product descriptions. Each type is optimized for its specific purpose.",
              },
              {
                icon: Code2,
                title: "Schema Markup",
                desc: "Generate valid JSON-LD structured data ready to paste into your site. No additional editing required.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center mb-4">
                  <Icon className="h-5 w-5 text-teal-500" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">How It Works</h2>
            <p className="text-gray-500">Get SEO-optimized content in three simple steps.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Add Your API Keys",
                desc: "Connect your OpenAI, Anthropic, or Google API keys in settings. You control your data.",
              },
              {
                step: "2",
                title: "Enter Your Keywords",
                desc: "Provide target keywords, content type, language, and any additional context for your content.",
              },
              {
                step: "3",
                title: "Generate & Publish",
                desc: "Get complete SEO-optimized content with title, meta, and HTML body ready to publish.",
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-teal-500 text-white text-lg font-bold flex items-center justify-center mx-auto mb-5">
                  {step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="bg-[#eef2f7] py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Why Choose AntiGravity SEO?</h2>
            <p className="text-gray-500">See how we stack up against traditional tools.</p>
          </div>
          <div className="grid grid-cols-2 gap-5">
            {/* Typical */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h3 className="font-semibold text-gray-500 mb-4 text-sm uppercase tracking-wide">Typical SEO Tools</h3>
              <ul className="space-y-3 text-sm text-gray-500">
                {[
                  "Expensive subscriptions ($99+)",
                  "Generic, robotic AI content",
                  "Limits on articles",
                  "No link strategy targeting",
                  "Single language support",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <X className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* AntiGravity */}
            <div className="bg-white rounded-xl p-6 border-2 border-teal-400 shadow-md relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                AI POWERED
              </div>
              <h3 className="font-semibold text-teal-600 mb-4 text-sm uppercase tracking-wide">AntiGravity SEO</h3>
              <ul className="space-y-3 text-sm text-gray-700">
                {[
                  "Free BYOK Model (Pay per API)",
                  "Multi-AI (GPT-4o, Claude, Gemini)",
                  "Unlimited generation",
                  "Auto link strategy & targeting",
                  "30+ Languages Native SEO",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-teal-500 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 text-teal-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            LIVE NOW
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Simple, Transparent Pricing</h2>
          <p className="text-gray-500 mb-10">Choose the plan that fits your needs. Scale with your team.</p>

          <div className="bg-white rounded-2xl border-2 border-teal-400 shadow-lg p-8 text-left">
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-5xl font-extrabold text-gray-900">$69</span>
              <span className="text-2xl font-bold text-gray-900">.99</span>
              <span className="text-gray-400 ml-1">/year</span>
            </div>
            <ul className="space-y-3 mb-8">
              {[
                "Unlimited content generation",
                "All SEO languages",
                "OpenAI, Anthropic & Google",
                "Link strategy tools",
                "Export to HTML & JSON",
                "Bring your own API keys",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-gray-700">
                  <Check className="h-4 w-4 text-teal-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/register"
              className="flex items-center justify-center gap-2 w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-lg transition-colors text-sm"
            >
              Get Started Now <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-6 flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-5 py-4">
            <div className="text-left">
              <p className="text-sm font-semibold text-gray-900">Not sure yet? Try Risk-Free.</p>
              <p className="text-xs text-gray-500">Get full access for 24 hours. No strings attached.</p>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-gray-900">$1.99</div>
              <div className="text-xs text-gray-400">24 hours</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 py-20 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Create Content That Ranks?</h2>
          <p className="text-gray-400 mb-8">
            Join thousands of content creators using AI to generate SEO-optimized content in minutes.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-6 py-3 rounded-full hover:bg-white/10 transition-colors text-sm"
          >
            Start Generating Content <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-950 py-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-white font-bold">
              <Zap className="h-4 w-4 text-teal-500" />
              AntiGravity SEO
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <a href="#features" className="hover:text-gray-300 transition-colors">Features</a>
              <a href="#pricing" className="hover:text-gray-300 transition-colors">Pricing</a>
              <Link href="/login" className="hover:text-gray-300 transition-colors">Login</Link>
              <Link href="/register" className="hover:text-gray-300 transition-colors">Sign Up</Link>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-800 text-center text-xs text-gray-600">
            © {new Date().getFullYear()} AntiGravity SEO. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
