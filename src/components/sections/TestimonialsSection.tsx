'use client';

import { useRef, useEffect, useState } from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Marcus J.',
    role: 'Lost 28 lbs in 4 months',
    avatar: '💪',
    rating: 5,
    text: "FITVERSE completely changed my relationship with fitness. The AI coach actually understands what I'm going through and the workout plans are legit. I went from 220 to 192 lbs and I'm stronger than I've ever been.",
    before: '220 lbs',
    after: '192 lbs',
  },
  {
    name: 'Priya S.',
    role: 'Gained 8 lbs of muscle',
    avatar: '🔥',
    rating: 5,
    text: "As someone who thought they knew fitness, FITVERSE humbled me and then elevated me. The nutrition plans are next level and the community challenges kept me accountable when motivation dipped.",
    before: '125 lbs',
    after: '133 lbs',
  },
  {
    name: 'Jake T.',
    role: 'First marathon finisher',
    avatar: '⚡',
    rating: 5,
    text: "From couch potato to marathon runner in 6 months. The AI coach adjusted my training weekly based on my recovery data. I couldn't have done this without FITVERSE.",
    before: '0 km runs',
    after: '42.2 km',
  },
  {
    name: 'Aisha M.',
    role: 'Postpartum comeback',
    avatar: '🌟',
    rating: 5,
    text: "6 months postpartum and I'm in the best shape of my life. The meal plans were so easy to follow and the community was incredibly supportive during the tough days.",
    before: 'Day 1 postpartum',
    after: '6 month transformation',
  },
  {
    name: 'Ryan K.',
    role: 'Competitive bodybuilder',
    avatar: '🏆',
    rating: 5,
    text: "Placed in my first bodybuilding competition using FITVERSE programming. The periodization planning and peak week protocols from the AI coach were incredibly accurate.",
    before: 'Never competed',
    after: '2nd place local show',
  },
  {
    name: 'Sofia L.',
    role: 'Stress-free weight loss',
    avatar: '✨',
    rating: 5,
    text: "Lost 35 lbs without feeling like I was on a diet. The vegan meal plans are so creative and delicious. The app made tracking fun instead of a chore.",
    before: '185 lbs',
    after: '150 lbs',
  },
];

export default function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    const scroll = () => {
      setOffset((prev) => {
        const maxOffset = testimonials.length * 380;
        return (prev + 0.5) % maxOffset;
      });
      animRef.current = requestAnimationFrame(scroll);
    };
    animRef.current = requestAnimationFrame(scroll);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, []);

  const doubled = [...testimonials, ...testimonials];

  return (
    <section className="py-28 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#A8D5BA]/5 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="text-center">
          <span className="text-[#C7F464] text-sm font-semibold tracking-widest uppercase mb-4 block">
            Success Stories
          </span>
          <h2 className="font-syne font-bold text-[clamp(2.5rem,5vw,4rem)] text-white mb-6">
            Real people.
            <br />
            <span className="text-gradient">Real transformations.</span>
          </h2>
          <p className="text-white/40 text-lg">
            Join 50,000+ athletes who made FITVERSE their fitness home.
          </p>
        </div>
      </div>

      {/* Scrolling testimonials */}
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

        <div
          ref={scrollRef}
          className="flex gap-6 pb-4"
          style={{ transform: `translateX(-${offset}px)`, willChange: 'transform' }}
        >
          {doubled.map((t, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[360px] p-6 rounded-2xl glass border border-white/5 hover:border-[#C7F464]/20 transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} fill="#C7F464" color="#C7F464" />
                ))}
              </div>

              <p className="text-white/60 text-sm leading-relaxed mb-6 line-clamp-3">&ldquo;{t.text}&rdquo;</p>

              {/* Author */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#C7F464]/10 border border-[#C7F464]/20 flex items-center justify-center text-xl">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{t.name}</div>
                  <div className="text-[#C7F464] text-xs">{t.role}</div>
                </div>
              </div>

              {/* Before / After */}
              <div className="flex gap-3">
                <div className="flex-1 rounded-lg bg-white/3 border border-white/5 px-3 py-2 text-center">
                  <div className="text-white/30 text-[10px] uppercase tracking-wider">Before</div>
                  <div className="text-white/60 text-xs font-medium">{t.before}</div>
                </div>
                <div className="flex-1 rounded-lg bg-[#C7F464]/8 border border-[#C7F464]/20 px-3 py-2 text-center">
                  <div className="text-[#C7F464]/60 text-[10px] uppercase tracking-wider">After</div>
                  <div className="text-[#C7F464] text-xs font-medium">{t.after}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
