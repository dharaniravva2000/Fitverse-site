'use client';

import { useEffect, useRef } from 'react';
import { Brain, Dumbbell, Utensils, Users, BarChart2, Trophy } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Coaching',
    description: 'Your personal AI coach that knows your history, adapts to your progress, and gives you real-time feedback 24/7 — no appointment needed.',
    delay: 0,
  },
  {
    icon: Dumbbell,
    title: '500+ Expert Workouts',
    description: 'From beginner bodyweight to elite powerlifting — every program designed by certified trainers and backed by exercise science.',
    delay: 80,
  },
  {
    icon: Utensils,
    title: 'Smart Nutrition Plans',
    description: 'Customized meal plans, macro tracking, and diet strategies tailored precisely to your body type and fitness goal.',
    delay: 160,
  },
  {
    icon: Users,
    title: 'Global Community',
    description: 'Join 50,000+ athletes worldwide. Share progress, join challenges, and find the accountability that actually makes the difference.',
    delay: 240,
  },
  {
    icon: BarChart2,
    title: 'Real-Time Progress',
    description: 'Visual dashboards, streak tracking, and achievement badges that make watching your progress genuinely addictive.',
    delay: 320,
  },
  {
    icon: Trophy,
    title: 'Fitness Challenges',
    description: 'Compete in monthly challenges, earn badges, and climb leaderboards against athletes from around the world.',
    delay: 400,
  },
];

export default function WhyUsSection() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = '1';
            (entry.target as HTMLElement).style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.08 }
    );
    cardsRef.current.forEach((card) => { if (card) observer.observe(card); });
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-44 bg-[#3d5e02] relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] rounded-full bg-[#FFF8B9]/5 blur-[130px] pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-10">

        {/* Section header */}
        <div className="max-w-2xl mb-24">
          <span className="inline-block text-[#F0E878] text-xs font-semibold tracking-[0.25em] uppercase mb-6">
            Why FITVERSE
          </span>
          <h2 className="font-syne font-bold text-[#FFF8B9] leading-[1.1] mb-7" style={{ fontSize: 'clamp(2.6rem, 4.5vw, 4rem)' }}>
            Everything you need to
            <br />
            <span className="text-gradient">transform your life</span>
          </h2>
          <p className="text-[#FFF8B9]/50 text-xl leading-[1.75]">
            Not just another gym app. FITVERSE is a complete ecosystem designed
            to make fitness the best part of your day.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                ref={(el) => { cardsRef.current[i] = el; }}
                className="group p-10 rounded-3xl border border-[#FFF8B9]/10 bg-[#FFF8B9]/[0.04] hover:bg-[#FFF8B9]/[0.08] hover:border-[#FFF8B9]/18 transition-all duration-500 cursor-default card-hover-dark"
                style={{
                  opacity: 0,
                  transform: 'translateY(32px)',
                  transition: `opacity 0.55s ease ${f.delay}ms, transform 0.55s cubic-bezier(0.23,1,0.32,1) ${f.delay}ms, background 0.3s ease, border-color 0.3s ease`,
                }}
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-8 bg-[#FFF8B9]/12 border border-[#FFF8B9]/20">
                  <Icon size={22} color="#FFF8B9" strokeWidth={1.7} />
                </div>

                <h3 className="font-syne font-bold text-[1.15rem] text-[#FFF8B9] mb-4 group-hover:text-[#F0E878] transition-colors duration-300">
                  {f.title}
                </h3>
                <p className="text-[#FFF8B9]/45 text-sm leading-[1.8]">{f.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
