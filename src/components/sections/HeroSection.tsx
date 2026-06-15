'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronDown } from 'lucide-react';

const WORDS = ['Stronger', 'Faster', 'Leaner', 'Unstoppable', 'Elite'];

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % WORDS.length);
        setVisible(true);
      }, 300);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex overflow-hidden bg-[#568203]">

      {/* Left: content */}
      <div className="relative z-10 flex flex-col justify-center w-full lg:w-[58%] px-10 sm:px-14 lg:px-20 xl:px-28 pt-32 pb-24">
        {/* Glow */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#FFF8B9]/8 blur-[130px] pointer-events-none" />

        {/* Badge */}
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-[#FFF8B9]/25 bg-[#FFF8B9]/10 text-[#FFF8B9] text-xs font-semibold tracking-wide uppercase mb-12 w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFF8B9] animate-pulse" />
          Premium AI-Powered Fitness Platform
        </div>

        {/* Headline */}
        <h1 className="font-syne font-bold leading-[1.05] mb-10">
          <span className="block text-[#FFF8B9]" style={{ fontSize: 'clamp(4rem, 7.5vw, 7.5rem)' }}>
            Become
          </span>
          <span
            className="block text-[#F0E878] transition-all duration-300"
            style={{
              fontSize: 'clamp(4rem, 7.5vw, 7.5rem)',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(-14px)',
              textShadow: '0 0 70px rgba(255,248,185,0.3)',
            }}
          >
            {WORDS[wordIndex]}
          </span>
        </h1>

        <p className="text-[#FFF8B9]/60 leading-[1.8] mb-14 max-w-lg" style={{ fontSize: 'clamp(1.05rem, 1.5vw, 1.2rem)' }}>
          Train Hard. Eat Smart. Stay Consistent. Join 50,000+ athletes using
          AI-powered coaching, science-backed workouts, and a community built
          for results.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-start gap-4 mb-20">
          <Link
            href="/workouts"
            className="group flex items-center gap-3 px-9 py-4 rounded-full bg-[#FFF8B9] text-[#568203] font-bold text-base hover:bg-[#F0E878] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_55px_rgba(255,248,185,0.35)]"
          >
            Start Training Free
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/ai-coach"
            className="flex items-center gap-3 px-9 py-4 rounded-full border border-[#FFF8B9]/25 text-[#FFF8B9]/80 font-medium text-base hover:border-[#FFF8B9]/50 hover:text-[#FFF8B9] transition-all duration-300"
          >
            Meet Your AI Coach
          </Link>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-x-12 gap-y-8">
          {[
            { value: '50K+', label: 'Active Athletes' },
            { value: '500+', label: 'Workout Programs' },
            { value: '98%', label: 'Success Rate' },
            { value: '4.9★', label: 'App Rating' },
          ].map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-4">
              {i > 0 && <div className="w-px h-9 bg-[#FFF8B9]/15" />}
              <div>
                <div className="font-syne font-bold text-2xl text-[#F0E878] mb-0.5">{stat.value}</div>
                <div className="text-[#FFF8B9]/40 text-xs tracking-wide">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: athlete image */}
      <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[48%]">
        <Image
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&q=85&w=1400"
          alt="Athlete training"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#568203] via-[#568203]/25 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#568203] to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#568203]/70 to-transparent" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] z-[1]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,248,185,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,248,185,1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Scroll hint */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 text-[#FFF8B9]/30 z-10 animate-bounce-gentle">
        <span className="text-[10px] tracking-[0.2em] uppercase font-medium">Scroll</span>
        <ChevronDown size={14} />
      </div>
    </section>
  );
}
