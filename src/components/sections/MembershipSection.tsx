'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, Zap } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: { monthly: 0, yearly: 0 },
    badge: null,
    description: 'Perfect for beginners taking their first step into fitness.',
    features: [
      '10 free workout programs',
      'Basic nutrition guides',
      'Community access (read-only)',
      'BMI & calorie calculator',
      'Mobile app access',
    ],
    cta: 'Get Started Free',
    href: '/workouts',
    highlight: false,
  },
  {
    name: 'Pro',
    price: { monthly: 9.99, yearly: 7.99 },
    badge: 'Most Popular',
    description: 'For serious athletes ready to level up and see real results.',
    features: [
      'All 500+ workout programs',
      'AI Fitness Coach (unlimited)',
      'Custom meal plans',
      'Macro & calorie tracking',
      'Challenge participation',
      'Progress analytics',
      'Priority support',
    ],
    cta: 'Start Pro Free Trial',
    href: '/ai-coach',
    highlight: true,
  },
  {
    name: 'Elite',
    price: { monthly: 24.99, yearly: 19.99 },
    badge: 'Best Value',
    description: 'The complete transformation package for maximum results.',
    features: [
      'Everything in Pro',
      '1-on-1 expert sessions (2/month)',
      'Custom training periodization',
      'Elite community access',
      'Early feature access',
      'Dedicated personal coach',
    ],
    cta: 'Go Elite',
    href: '/ai-coach',
    highlight: false,
  },
];

export default function MembershipSection() {
  const [yearly, setYearly] = useState(false);

  return (
    <section className="py-40 bg-[#2d4501] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-[#FFF8B9]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-10 relative z-10">

        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-[#F0E878] text-xs font-semibold tracking-[0.25em] uppercase mb-6 block">
            Membership Plans
          </span>
          <h2 className="font-syne font-bold text-[#FFF8B9] leading-[1.1] mb-10" style={{ fontSize: 'clamp(2.6rem, 5vw, 4.2rem)' }}>
            Invest in yourself.
            <br />
            <span className="text-gradient">The ROI is eternal.</span>
          </h2>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-5">
            <span className={`text-sm font-medium transition-colors ${!yearly ? 'text-[#FFF8B9]' : 'text-[#FFF8B9]/35'}`}>Monthly</span>
            <button
              onClick={() => setYearly(!yearly)}
              className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${yearly ? 'bg-[#FFF8B9]' : 'bg-[#FFF8B9]/15'}`}
            >
              <div className={`absolute top-1 w-5 h-5 rounded-full transition-transform duration-300 ${yearly ? 'bg-[#568203] translate-x-8' : 'bg-[#FFF8B9] translate-x-1'}`} />
            </button>
            <span className={`text-sm font-medium transition-colors ${yearly ? 'text-[#FFF8B9]' : 'text-[#FFF8B9]/35'}`}>
              Yearly{' '}
              <span className="text-[#F0E878] font-bold">−20%</span>
            </span>
          </div>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => {
            const price = yearly ? plan.price.yearly : plan.price.monthly;
            return (
              <div
                key={plan.name}
                className={`relative p-10 rounded-3xl flex flex-col transition-all duration-500 ${
                  plan.highlight
                    ? 'border border-[#FFF8B9]/40 bg-[#FFF8B9]/10'
                    : 'border border-[#FFF8B9]/10 bg-[#FFF8B9]/[0.04] hover:bg-[#FFF8B9]/[0.07] hover:border-[#FFF8B9]/18'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-[#FFF8B9] text-[#568203] text-xs font-bold whitespace-nowrap tracking-wide">
                    {plan.badge}
                  </div>
                )}

                {/* Plan header */}
                <div className="mb-10">
                  <div className="flex items-center gap-2 mb-3">
                    {plan.highlight && <Zap size={15} fill="#F0E878" color="#F0E878" />}
                    <span className="font-syne font-bold text-xl text-[#FFF8B9]">{plan.name}</span>
                  </div>
                  <p className="text-[#FFF8B9]/45 text-sm leading-relaxed mb-6">{plan.description}</p>

                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="font-syne font-bold text-[#FFF8B9]" style={{ fontSize: '3rem', lineHeight: 1 }}>
                      {price === 0 ? 'Free' : `$${price}`}
                    </span>
                    {price > 0 && <span className="text-[#FFF8B9]/35 text-sm ml-1.5">/month</span>}
                  </div>
                  {price > 0 && yearly && (
                    <p className="text-[#FFF8B9]/28 text-xs">Billed annually</p>
                  )}
                </div>

                <div className="h-px bg-[#FFF8B9]/8 mb-8" />

                {/* Features */}
                <ul className="space-y-5 mb-10 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-4">
                      <div className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 bg-[#FFF8B9]/15 border border-[#FFF8B9]/30">
                        <Check size={10} color="#FFF8B9" strokeWidth={3} />
                      </div>
                      <span className="text-[#FFF8B9]/55 text-sm leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={plan.href}
                  className={`w-full py-4 rounded-full text-sm font-semibold text-center transition-all duration-300 ${
                    plan.highlight
                      ? 'bg-[#FFF8B9] text-[#568203] hover:bg-[#F0E878] hover:scale-[1.03] hover:shadow-[0_0_35px_rgba(255,248,185,0.25)]'
                      : 'border border-[#FFF8B9]/15 text-[#FFF8B9]/60 hover:border-[#FFF8B9]/30 hover:text-[#FFF8B9]'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            );
          })}
        </div>

        <p className="text-center text-[#FFF8B9]/22 text-xs mt-10 tracking-wide">
          No credit card required for free plan &nbsp;·&nbsp; Cancel any time
        </p>
      </div>
    </section>
  );
}
