import Link from "next/link";
import {
  Zap,
  Globe,
  ShieldCheck,
  Link2,
  FileText,
  Code2,
  Check,
  Users,
  MapPin,
  Mail,
  Building2,
  Sparkles,
  BarChart3,
  Layers,
} from "lucide-react";
import PricingWizard from "@/components/pricing-wizard";

const LANGUAGES = [
  "English", "Spanish", "French", "German", "Italian", "Portuguese",
  "Dutch", "Russian", "Chinese", "Japanese", "Korean", "Arabic",
  "Hindi", "Turkish", "Polish", "Swedish", "Norwegian", "Danish",
  "Finnish", "Greek", "Hebrew", "Thai", "Vietnamese", "Indonesian",
  "Malay", "Czech", "Romanian", "Hungarian", "Ukrainian", "Catalan",
  "Bulgarian", "Croatian", "Slovak", "Serbian", "Slovenian", "Estonian",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f0f4f8] font-sans">

      {/* NAV */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <Zap className="h-5 w-5 text-teal-500" />
            <span>BingDrop</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-600">
            <Link href="/#features" className="hover:text-gray-900 transition-colors">Features</Link>
            <Link href="/#how-it-works" className="hover:text-gray-900 transition-colors">How It Works</Link>
            <Link href="/#pricing" className="hover:text-gray-900 transition-colors">Pricing</Link>
            <Link href="/about" className="text-teal-600 font-semibold">About</Link>
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
      <section className="py-20 text-center bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 text-teal-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            About BingDrop
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-5 leading-tight">
            AI-Powered SEO Content,<br />Built for the Modern Web
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto mb-8">
            BingDrop helps content creators, agencies, and teams generate SEO-optimized content
            in 30+ languages — powered by the best AI models on the market.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/register"
              className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors text-sm"
            >
              Start Free Trial
            </Link>
            <Link
              href="/#pricing"
              className="border border-gray-300 text-gray-700 hover:border-teal-400 font-semibold px-6 py-3 rounded-lg transition-colors text-sm"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We built BingDrop because creating high-quality, SEO-optimized content shouldn't
                require an army of writers, expensive agencies, or hours of manual research.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our platform brings together the most powerful AI models — OpenAI, Anthropic, and
                Google — so you can pick the best tool for the job and bring your own API keys,
                keeping costs transparent and fully under your control.
              </p>
              <ul className="space-y-3">
                {[
                  "Rank Math 100-score SEO guidelines baked in",
                  "Bring your own API keys — no markups",
                  "30+ languages with native SEO optimization",
                  "Schema markup, link strategy & more",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                    <Check className="h-4 w-4 text-teal-500 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Globe,    label: "30+ Languages",       desc: "Native SEO in every language" },
                { icon: Layers,   label: "3 AI Providers",      desc: "OpenAI, Anthropic & Google" },
                { icon: BarChart3,label: "Rank Math 100",        desc: "Built-in SEO scoring" },
                { icon: Users,    label: "Teams Welcome",        desc: "Up to 4 users per plan" },
              ].map(({ icon: Icon, label, desc }) => (
                <div key={label} className="bg-white rounded-2xl border border-gray-200 p-5 text-center shadow-sm">
                  <Icon className="h-6 w-6 text-teal-500 mx-auto mb-2" />
                  <p className="font-semibold text-gray-900 text-sm">{label}</p>
                  <p className="text-xs text-gray-500 mt-1">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Everything You Need to Rank</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              A complete SEO content suite — from generation to publishing.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Sparkles, title: "Multi-AI Support",       desc: "Switch between OpenAI, Anthropic, and Google models per generation." },
              { icon: Globe,    title: "30+ Languages",          desc: "Generate natively in any language with proper SEO metadata for each locale." },
              { icon: ShieldCheck, title: "SEO Best Practices", desc: "Every piece follows Rank Math 100 guidelines automatically." },
              { icon: Link2,    title: "Link Strategy",          desc: "Automated internal/external link scraping and strategic placement." },
              { icon: FileText, title: "Content Types",          desc: "Blog posts, product pages, landing pages, FAQs, and more." },
              { icon: Code2,    title: "Schema Markup",          desc: "Auto-generated JSON-LD schema for rich results in search engines." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-[#f0f4f8] rounded-2xl p-6 border border-gray-200">
                <div className="w-9 h-9 rounded-xl bg-teal-100 flex items-center justify-center mb-4">
                  <Icon className="h-4.5 w-4.5 text-teal-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LANGUAGES MARQUEE */}
      <section className="py-12 bg-[#f0f4f8] overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 text-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Supported Languages
          </h2>
          <p className="text-sm text-gray-500 mt-1">Rank in every market, in every language</p>
        </div>
        <div className="marquee-container">
          <div className="animate-marquee gap-3 px-3">
            {[...LANGUAGES, ...LANGUAGES].map((lang, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-4 py-1.5 text-sm text-gray-700 font-medium mx-1.5 whitespace-nowrap shadow-sm"
              >
                <Globe className="h-3.5 w-3.5 text-teal-500" />
                {lang}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-20 bg-[#eef2f7]">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Simple, Transparent Pricing</h2>
          <p className="text-gray-500">No contracts. Cancel anytime. Scale with your team.</p>
        </div>
        <PricingWizard />
      </section>

      {/* TRIAL BANNER */}
      <section className="py-12 bg-gray-900">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-teal-400 text-sm font-semibold uppercase tracking-widest mb-3">Try before you commit</p>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Get Full Access for 24 Hours — Just $1.99
          </h2>
          <p className="text-gray-400 mb-6 text-sm">
            No commitment. Explore every feature. Cancel any time before your trial ends.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-bold px-8 py-3 rounded-xl transition-colors text-sm"
          >
            Start $1.99 Trial
          </Link>
          <p className="text-gray-600 text-xs mt-3">14-day money-back guarantee on all paid plans</p>
        </div>
      </section>

      {/* COMPANY INFO */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-teal-50 border border-teal-100 mb-6">
            <Building2 className="h-6 w-6 text-teal-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">About the Company</h2>
          <p className="text-gray-500 text-sm mb-8 max-w-lg mx-auto">
            BingDrop is a product of Bikerchalen LLC, a technology company based in Montana, USA.
          </p>
          <div className="inline-block bg-[#f0f4f8] border border-gray-200 rounded-2xl px-8 py-6 text-left">
            <p className="font-bold text-gray-900 text-lg mb-4">BIKERCHALEN LLC</p>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-teal-500 shrink-0 mt-0.5" />
                <div>
                  <p>127 N Higgins Ave, Ste 307D, Num 1765</p>
                  <p>Missoula, MT 59802</p>
                  <p>United States</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-teal-500 shrink-0" />
                <span>support@bingdrop.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-950 py-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-white font-bold">
              <Zap className="h-4 w-4 text-teal-500" />
              BingDrop
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <Link href="/#features"  className="hover:text-gray-300 transition-colors">Features</Link>
              <Link href="/#pricing"   className="hover:text-gray-300 transition-colors">Pricing</Link>
              <Link href="/about"      className="hover:text-gray-300 transition-colors">About</Link>
              <Link href="/login"      className="hover:text-gray-300 transition-colors">Login</Link>
              <Link href="/register"   className="hover:text-gray-300 transition-colors">Sign Up</Link>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-800 text-center text-xs text-gray-600">
            © {new Date().getFullYear()} BingDrop — Bikerchalen LLC, 127 N Higgins Ave Ste 307D, Missoula, MT 59802. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}
