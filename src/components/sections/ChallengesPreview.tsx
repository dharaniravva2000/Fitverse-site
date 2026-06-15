'use client';

import Link from 'next/link';
import { ArrowRight, Users, Flame, Timer } from 'lucide-react';

const challenges = [
  {
    emoji: '🔥',
    title: '30-Day Transformation',
    description: 'Complete body overhaul in one month. Daily workouts, meal plans, and accountability check-ins.',
    participants: '12,847',
    duration: '30 days',
    difficulty: 'Intermediate',
    difficultyClass: 'badge-intermediate',
    gradient: 'from-[#C7F464]/10 to-transparent',
    border: 'border-[#C7F464]/20',
    accent: '#C7F464',
  },
  {
    emoji: '💪',
    title: '100 Push-Ups Challenge',
    description: 'Start from zero and work up to 100 consecutive push-ups. Simple, brutal, effective.',
    participants: '8,934',
    duration: '60 days',
    difficulty: 'Beginner',
    difficultyClass: 'badge-beginner',
    gradient: 'from-[#A8D5BA]/10 to-transparent',
    border: 'border-[#A8D5BA]/20',
    accent: '#A8D5BA',
  },
  {
    emoji: '🏃',
    title: '10K Steps Daily',
    description: "Hit 10,000 steps every day for 30 consecutive days. Your activity tracker's new best friend.",
    participants: '15,620',
    duration: '30 days',
    difficulty: 'Beginner',
    difficultyClass: 'badge-beginner',
    gradient: 'from-[#C7F464]/8 to-transparent',
    border: 'border-[#C7F464]/15',
    accent: '#C7F464',
  },
  {
    emoji: '⚡',
    title: 'Fat Loss Accelerator',
    description: 'High-intensity protocols combined with a calorie deficit strategy. Real results, no BS.',
    participants: '9,211',
    duration: '45 days',
    difficulty: 'Advanced',
    difficultyClass: 'badge-advanced',
    gradient: 'from-[#A8D5BA]/10 to-transparent',
    border: 'border-[#A8D5BA]/15',
    accent: '#A8D5BA',
  },
];

export default function ChallengesPreview() {
  return (
    <section className="py-28 bg-[#0d0d0d] relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-[#C7F464]/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-[#C7F464] text-sm font-semibold tracking-widest uppercase mb-4 block">
              Fitness Challenges
            </span>
            <h2 className="font-syne font-bold text-[clamp(2.5rem,5vw,4rem)] text-white leading-tight">
              Compete. Transform.
              <br />
              <span className="text-gradient">Dominate.</span>
            </h2>
          </div>
          <Link
            href="/community"
            className="flex items-center gap-2 text-[#C7F464] font-medium hover:gap-3 transition-all duration-300 flex-shrink-0"
          >
            View all challenges <ArrowRight size={16} />
          </Link>
        </div>

        {/* Challenge cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {challenges.map((c) => (
            <Link
              key={c.title}
              href="/community"
              className={`group p-6 rounded-2xl bg-gradient-to-br ${c.gradient} border ${c.border} glass card-hover block`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="text-4xl">{c.emoji}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="font-syne font-bold text-white text-lg group-hover:text-[#C7F464] transition-colors">
                      {c.title}
                    </h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.difficultyClass}`}>
                      {c.difficulty}
                    </span>
                  </div>
                  <p className="text-white/40 text-sm leading-relaxed">{c.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-6 pt-4 border-t border-white/5">
                <div className="flex items-center gap-1.5 text-white/40 text-sm">
                  <Users size={14} style={{ color: c.accent }} />
                  <span>{c.participants} joined</span>
                </div>
                <div className="flex items-center gap-1.5 text-white/40 text-sm">
                  <Timer size={14} style={{ color: c.accent }} />
                  <span>{c.duration}</span>
                </div>
                <div className="ml-auto flex items-center gap-1 text-sm font-medium" style={{ color: c.accent }}>
                  Join Now <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
