'use client';

import { useEffect, useRef } from 'react';
import { Brain, Dumbbell, Utensils, Users, Zap, Trophy } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Coaching',
    description: 'Your personal AI coach that knows your history, adapts to your progress, and gives you real-time feedback 24/7.',
    color: '#C7F464',
    delay: 0,
  },
  {
    icon: Dumbbell,
    title: '500+ Expert Workouts',
    description: 'From beginner bodyweight to elite powerlifting — every program designed by certified trainers with proven results.',
    color: '#A8D5BA',
    delay: 100,
  },
  {
    icon: Utensils,
    title: 'Smart Nutrition Plans',
    description: 'Customized meal plans, macro tracking, and diet strategies tailored to your body type and fitness goals.',
    color: '#C7F464',
    delay: 200,
  },
  {
    icon: Users,
    title: 'Global Community',
    description: 'Join 50,000+ athletes worldwide. Share progress, join challenges, and find accountability partners.',
    color: '#A8D5BA',
    delay: 300,
  },
  {
    icon: Zap,
    title: 'Real-Time Progress',
    description: 'Visual dashboards, streak tracking, and achievement badges that make your progress addictive to watch.',
    color: '#C7F464',
    delay: 400,
  },
  {
    icon: Trophy,
    title: 'Fitness Challenges',
    description: 'Compete in monthly challenges, earn badges, and climb leaderboards against athletes from around the world.',
    color: '#A8D5BA',
    delay: 500,
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
      { threshold: 0.1 }
    );
    cardsRef.current.forEach((card) => { if (card) observer.observe(card); });
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-28 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-[#C7F464]/4 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block text-[#C7F464] text-sm font-semibold tracking-widest uppercase mb-4">
            Why FITVERSE
          </span>
          <h2 className="font-syne font-bold text-[clamp(2.5rem,5vw,4rem)] text-white leading-tight mb-6">
            Everything you need to
            <br />
            <span className="text-gradient">transform your life</span>
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            Not just another gym app. FITVERSE is a complete ecosystem designed
            to make fitness the best part of your day.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                ref={(el) => { cardsRef.current[i] = el; }}
                className="group p-8 rounded-2xl glass border border-white/5 card-hover cursor-pointer"
                style={{
                  opacity: 0,
                  transform: 'translateY(40px)',
                  transition: `opacity 0.6s ease ${f.delay}ms, transform 0.6s cubic-bezier(0.23,1,0.32,1) ${f.delay}ms, box-shadow 0.4s ease`,
                }}
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: `${f.color}18`, border: `1px solid ${f.color}30` }}
                >
                  <Icon size={22} style={{ color: f.color }} />
                </div>

                <h3 className="font-syne font-bold text-xl text-white mb-3 group-hover:text-[#C7F464] transition-colors">
                  {f.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">{f.description}</p>

                {/* Hover accent line */}
                <div
                  className="mt-6 h-px bg-gradient-to-r from-transparent to-transparent group-hover:from-transparent group-hover:to-transparent transition-all duration-500"
                  style={{
                    background: `linear-gradient(90deg, ${f.color}00, ${f.color}60, ${f.color}00)`,
                    transform: 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 0.4s ease',
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
