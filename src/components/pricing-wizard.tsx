"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, FileText, ShieldCheck, Zap } from "lucide-react";

const PLANS = [
  {
    label: "1 Month",
    total: 16.99,
    perMonth: 16.99,
    badge: null,
    highlight: false,
  },
  {
    label: "3 Months",
    total: 29.99,
    perMonth: 10.0,
    badge: "Save 40%",
    badgeColor: "bg-green-100 text-green-600",
    highlight: false,
    savings: "−$10/mo",
    savingsLink: "Save more",
  },
  {
    label: "6 Months",
    total: 40.99,
    perMonth: 6.83,
    badge: "Save 58%",
    badgeColor: "bg-green-100 text-green-600",
    highlight: false,
    savings: "−$6.83/mo",
    savingsLink: "Save more",
  },
  {
    label: "12 Months",
    total: 69.99,
    perMonth: 5.83,
    badge: "Best Value",
    badgeColor: "bg-orange-100 text-orange-500",
    highlight: true,
    savings: "−$5.83/mo",
    savingsLink: "Best deal!",
  },
];

const USER_OPTIONS = [1, 2, 3, 4];

export default function PricingWizard() {
  const [selectedUsers, setSelectedUsers] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState(3);
  const router = useRouter();

  const plan = PLANS[selectedPlan];
  const totalPrice = (plan.total * selectedUsers).toFixed(2);

  return (
    <div className="max-w-2xl mx-auto px-6">
      {/* Stepper */}
      <div className="flex items-center justify-center gap-2 mb-8 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center">1</span>
          <span className="font-semibold text-gray-900">Select Users</span>
        </div>
        <div className="flex-1 max-w-[60px] h-px bg-gray-300 mx-1" />
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-gray-200 text-gray-500 text-xs font-bold flex items-center justify-center">2</span>
          <span className="text-gray-400">Choose Plan</span>
        </div>
        <div className="flex-1 max-w-[60px] h-px bg-gray-300 mx-1" />
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-gray-200 text-gray-500 text-xs font-bold flex items-center justify-center">3</span>
          <span className="text-gray-400">Complete Order</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        {/* User selection */}
        <p className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <User className="h-4 w-4 text-teal-500" />
          How many users will you have?
        </p>
        <div className="grid grid-cols-4 gap-3 mb-8">
          {USER_OPTIONS.map((u) => (
            <button
              key={u}
              onClick={() => setSelectedUsers(u)}
              className={`flex flex-col items-center justify-center gap-2 py-4 rounded-xl border-2 text-sm font-semibold transition-all ${
                selectedUsers === u
                  ? "border-teal-500 bg-teal-50 text-teal-700"
                  : "border-gray-200 text-gray-700 hover:border-teal-300"
              }`}
            >
              <User className="h-5 w-5" />
              {u} {u === 1 ? "User" : "Users"}
            </button>
          ))}
        </div>

        {/* Plan duration */}
        <p className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <span className="text-base">⏱</span> Select your plan duration
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {PLANS.map((p, i) => (
            <button
              key={p.label}
              onClick={() => setSelectedPlan(i)}
              className={`relative flex flex-col items-center justify-center py-4 px-2 rounded-xl border-2 text-sm transition-all ${
                selectedPlan === i
                  ? "border-teal-500 bg-teal-50"
                  : "border-gray-200 hover:border-teal-300"
              }`}
            >
              {p.badge && (
                <span className={`absolute -top-2.5 text-xs font-bold px-2 py-0.5 rounded-full ${p.badgeColor}`}>
                  {p.badge}
                </span>
              )}
              <span className="text-gray-500 text-xs mb-1">{p.label}</span>
              <span className="text-xl font-extrabold text-red-500">${(p.total * selectedUsers).toFixed(2)}</span>
              {p.savings && (
                <>
                  <span className="text-xs text-gray-400 mt-0.5">{p.savings}</span>
                  <span className={`text-xs font-semibold mt-0.5 ${p.highlight ? "text-orange-500" : "text-teal-500"}`}>
                    {p.savingsLink}
                  </span>
                </>
              )}
              {!p.savings && (
                <span className="text-xs text-gray-400 mt-0.5">per month</span>
              )}
            </button>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => router.push("/register")}
          className="w-full bg-gradient-to-r from-teal-400 to-teal-600 hover:from-teal-500 hover:to-teal-700 text-white font-bold py-4 rounded-xl text-sm transition-all flex items-center justify-center gap-2"
        >
          Complete Your Order →
        </button>
        <p className="text-center text-xs text-gray-400 mt-3">
          14-day money-back guarantee. No questions asked.
        </p>

        {/* Trust badges */}
        <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-3 gap-4 text-center">
          {[
            { icon: FileText, title: "Transparent pricing", desc: "No contracts. Cancel anytime." },
            { icon: Zap, title: "Instant activation", desc: "Start watching in minutes." },
            { icon: ShieldCheck, title: "Risk-free", desc: "14-day money-back guarantee." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center gap-1">
              <Icon className="h-5 w-5 text-teal-500 mb-1" />
              <p className="text-xs font-semibold text-gray-700">{title}</p>
              <p className="text-xs text-gray-400">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
