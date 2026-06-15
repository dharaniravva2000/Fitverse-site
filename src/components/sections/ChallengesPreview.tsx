'use client';

import Link from 'next/link';
import { ArrowRight, Users, Timer, Flame, Target, Footprints, Zap } from 'lucide-react';

const challenges = [
  {
    icon: Flame,
    title: '30-Day Transformation',
    description: 'Complete body overhaul in one month. Daily workouts, meal plans, and accountability check-ins.',
    participants: '12,847', duration: '30 days', difficulty: 'Intermediate',
  },
  {
    icon: Target,
    title: '100 Push-Ups Challenge',
    description: 'Work up to 100 consecutive push-ups using our progressive overload protocol. Starts from zero.',
    participants: '8,934', duration: '60 days', difficulty: 'Beginner',
  },
  {
    icon: Footprints,
    title: '10K Steps Daily',
    description: "Hit 10,000 steps every single day for 30 days. Simple. Consistent. Life-changing.",
    participants: '15,620', duration: '30 days', difficulty: 'Beginner',
  },
  {
    icon: Zap,
    title: 'Fat Loss Accelerator',
    description: 'High-intensity protocols combined with a calorie deficit strategy. Real results, no BS.',
    participants: '9,211', duration: '45 days', difficulty: 'Advanced',
  },
];

export default function ChallengesPreview() {
  return (
    <section className="py-44 bg-[#568203] relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full bg-[#FFF8B9]/5 blur-[120px] pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-10 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-20">
          <div className="max-w-xl">
            <span className="text-[#F0E878] text-xs font-semibold tracking-[0.25em] uppercase mb-6 block">
              Fitness Challenges
            </span>
            <h2 className="font-syne font-bold text-[#FFF8B9] leading-[1.1]" style={{ fontSize: 'clamp(2.6rem, 4.5vw, 4rem)' }}>
              Compete. Transform.
              <br />
              <span className="text-gradient">Dominate.</span>
            </h2>
          </div>
          <Link
            href="/community"
            className="flex items-center gap-2 text-[#FFF8B9]/50 text-sm font-medium hover:text-[#FFF8B9] transition-colors duration-300 group flex-shrink-0"
          >
            View all challenges
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {challenges.map((c) => {
            const Icon = c.icon;
            const diffColor = c.difficulty === 'Advanced' ? 'bg-[#ff8060]/15 text-[#ff8060] border-[#ff8060]/25' : 'bg-[#FFF8B9]/15 text-[#FFF8B9] border-[#FFF8B9]/25';
            return (
              <Link
                key={c.title}
                href="/community"
                className="group p-10 rounded-3xl bg-[#FFF8B9]/8 border border-[#FFF8B9]/15 hover:bg-[#FFF8B9]/14 hover:border-[#FFF8B9]/28 transition-all duration-400 block card-hover-dark"
              >
                <div className="flex items-start gap-6 mb-8">
                  <div className="w-13 h-13 rounded-2xl flex items-center justify-center flex-shrink-0 bg-[#FFF8B9]/12 border border-[#FFF8B9]/20" style={{ width: '52px', height: '52px' }}>
                    <Icon size={24} color="#FFF8B9" strokeWidth={1.7} />
                  </div>
                  <div className="flex-1 min-w-0 pt-1">
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <h3 className="font-syne font-bold text-[#FFF8B9] text-xl group-hover:text-[#F0E878] transition-colors leading-tight">
                        {c.title}
                      </h3>
                      <span className={`text-[11px] px-2.5 py-1 rounded-full font-semibold border ${diffColor}`}>
                        {c.difficulty}
                      </span>
                    </div>
                    <p className="text-[#FFF8B9]/50 text-sm leading-[1.8]">{c.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-8 pt-6 border-t border-[#FFF8B9]/10">
                  <div className="flex items-center gap-2 text-[#FFF8B9]/45 text-sm">
                    <Users size={14} color="rgba(255,248,185,0.6)" />
                    <span>{c.participants} joined</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#FFF8B9]/45 text-sm">
                    <Timer size={14} color="rgba(255,248,185,0.6)" />
                    <span>{c.duration}</span>
                  </div>
                  <div className="ml-auto flex items-center gap-2 text-sm font-semibold text-[#F0E878]">
                    Join Now
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
