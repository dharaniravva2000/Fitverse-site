'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, Zap } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: { monthly: 0, yearly: 0 },
    badge: null,
    description: 'Perfect for beginners taking their first step.',
    color: '#A8D5BA',
    features: [
      '10 free workout programs',
      'Basic nutrition guides',
      'Community access (read-only)',
      'BMI & calorie calculator',
      'Mobile app access',
    ],
    cta: 'Get Started Free',
    href: '/workouts',
  },
  {
    name: 'Pro',
    price: { monthly: 9.99, yearly: 7.99 },
    badge: 'Most Popular',
    description: 'For serious athletes ready to level up.',
    color: '#C7F464',
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
  },
  {
    name: 'Elite',
    price: { monthly: 24.99, yearly: 19.99 },
    badge: 'Best Value',
    description: 'The complete transformation package.',
    color: '#C7F464',
    features: [
      'Everything in Pro',
      '1-on-1 expert sessions (2/month)',
      'Custom training periodization',
      'Bloodwork-based optimization',
      'Elite community access',
      'Early feature access',
      'Dedicated coach',
    ],
    cta: 'Go Elite',
    href: '/ai-coach',
  },
];

export default function MembershipSection() {
  const [yearly, setYearly] = useState(false);

  return (
    <section className="py-28 bg-[#0d0d0d] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-[#C7F464]/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#C7F464] text-sm font-semibold tracking-widest uppercase mb-4 block">
            Membership Plans
          </span>
          <h2 className="font-syne font-bold text-[clamp(2.5rem,5vw,4rem)] text-white mb-6">
            Invest in yourself.
            <br />
            <span className="text-gradient">The ROI is eternal.</span>
          </h2>

          {/* Toggle */}
          <div className="inline-flex items-center gap-4 mt-4">
            <span className={`text-sm ${!yearly ? 'text-white' : 'text-white/40'}`}>Monthly</span>
            <button
              onClick={() => setYearly(!yearly)}
              className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${yearly ? 'bg-[#C7F464]' : 'bg-white/10'}`}
            >
              <div
                className={`absolute top-1 w-5 h-5 rounded-full bg-black transition-transform duration-300 ${yearly ? 'translate-x-8' : 'translate-x-1'}`}
              />
            </button>
            <span className={`text-sm ${yearly ? 'text-white' : 'text-white/40'}`}>
              Yearly <span className="text-[#C7F464] font-semibold">Save 20%</span>
            </span>
          </div>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const price = yearly ? plan.price.yearly : plan.price.monthly;
            const isPro = plan.name === 'Pro';
            return (
              <div
                key={plan.name}
                className={`relative p-8 rounded-2xl flex flex-col transition-all duration-500 ${
                  isPro
                    ? 'border border-[#C7F464]/40 bg-gradient-to-b from-[#C7F464]/8 to-transparent scale-[1.02]'
                    : 'glass border border-white/5 hover:border-white/10'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#C7F464] text-black text-xs font-bold whitespace-nowrap">
                    {plan.badge}
                  </div>
                )}

                {/* Plan header */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    {isPro && <Zap size={16} fill="#C7F464" color="#C7F464" />}
                    <span className="font-syne font-bold text-lg text-white">{plan.name}</span>
                  </div>
                  <p className="text-white/40 text-sm mb-4">{plan.description}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="font-syne font-bold text-4xl text-white">
                      {price === 0 ? 'Free' : `$${price}`}
                    </span>
                    {price > 0 && <span className="text-white/40 text-sm">/mo</span>}
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <div
                        className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: `${plan.color}20`, border: `1px solid ${plan.color}40` }}
                      >
                        <Check size={10} style={{ color: plan.color }} />
                      </div>
                      <span className="text-white/60 text-sm">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={plan.href}
                  className={`w-full py-3 rounded-full text-sm font-semibold text-center transition-all duration-300 ${
                    isPro
                      ? 'bg-[#C7F464] text-black hover:bg-[#DEFF6E] hover:scale-105 hover:shadow-[0_0_30px_rgba(199,244,100,0.4)]'
                      : 'glass border border-white/10 text-white hover:border-white/20'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            );
          })}
        </div>

        <p className="text-center text-white/25 text-sm mt-8">
          No credit card required for free plan. Cancel anytime.
        </p>
      </div>
    </section>
  );
}
