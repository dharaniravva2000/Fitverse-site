'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Marcus J.', role: 'Lost 28 lbs in 4 months', initials: 'MJ',
    imageId: '1507003211169-0a1dd7228f2d', rating: 5,
    text: "FITVERSE completely changed my relationship with fitness. The AI coach understands what I'm going through and the workout plans are next level. Went from 220 to 192 lbs and stronger than ever.",
    before: '220 lbs', after: '192 lbs',
  },
  {
    name: 'Priya S.', role: 'Gained 8 lbs of muscle', initials: 'PS',
    imageId: '1494790108377-be9c29b29330', rating: 5,
    text: "FITVERSE humbled me and then elevated me. The nutrition plans are next level and the community challenges kept me accountable when motivation dipped.",
    before: '125 lbs', after: '133 lbs',
  },
  {
    name: 'Jake T.', role: 'First marathon finisher', initials: 'JT',
    imageId: '1472099645785-5658abf4ff4e', rating: 5,
    text: "From couch potato to marathon runner in 6 months. The AI coach adjusted my training weekly based on my recovery data. Couldn't have done this without FITVERSE.",
    before: '0 km runs', after: '42.2 km done',
  },
  {
    name: 'Aisha M.', role: 'Postpartum comeback', initials: 'AM',
    imageId: '1438761681033-6461ffad8d80', rating: 5,
    text: "6 months postpartum and I'm in the best shape of my life. The meal plans were so easy to follow and the community was incredibly supportive.",
    before: 'Day 1 postpartum', after: '6 month transform',
  },
  {
    name: 'Ryan K.', role: 'Competitive bodybuilder', initials: 'RK',
    imageId: '1500648767791-00dcc994a43e', rating: 5,
    text: "Placed in my first bodybuilding competition using FITVERSE programming. The periodization planning and peak week protocols were incredibly precise.",
    before: 'Never competed', after: '2nd place local show',
  },
  {
    name: 'Sofia L.', role: 'Stress-free weight loss', initials: 'SL',
    imageId: '1544005313-94ddf0286df2', rating: 5,
    text: "Lost 35 lbs without feeling like I was on a diet. The vegan meal plans are creative and delicious. Tracking finally felt like a game.",
    before: '185 lbs', after: '150 lbs',
  },
];

function Avatar({ imageId, name, initials }: { imageId: string; name: string; initials: string }) {
  const [imgError, setImgError] = useState(false);
  if (imgError) {
    return (
      <div className="w-12 h-12 rounded-full bg-[#568203]/15 border border-[#568203]/25 flex items-center justify-center flex-shrink-0">
        <span className="font-syne font-bold text-sm text-[#568203]">{initials}</span>
      </div>
    );
  }
  return (
    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-[#568203]/20">
      <Image
        src={`https://images.unsplash.com/photo-${imageId}?auto=format&q=80&w=96&h=96&fit=crop&crop=face`}
        alt={name} width={48} height={48} className="object-cover w-full h-full"
        onError={() => setImgError(true)}
      />
    </div>
  );
}

export default function TestimonialsSection() {
  const [offset, setOffset] = useState(0);
  const animRef = useRef<number | null>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const scroll = () => {
      if (!pausedRef.current) {
        setOffset((prev) => (prev + 0.45) % (testimonials.length * 430));
      }
      animRef.current = requestAnimationFrame(scroll);
    };
    animRef.current = requestAnimationFrame(scroll);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, []);

  const doubled = [...testimonials, ...testimonials];

  return (
    <section className="py-44 bg-[#FFFFF0] relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[#568203]/5 blur-[110px] pointer-events-none" />

      {/* Header */}
      <div className="max-w-7xl mx-auto px-10 mb-24">
        <div className="max-w-xl">
          <span className="text-[#568203] text-xs font-semibold tracking-[0.25em] uppercase mb-6 block">
            Success Stories
          </span>
          <h2 className="font-syne font-bold text-[#3d5e02] leading-[1.1]" style={{ fontSize: 'clamp(2.6rem, 4.5vw, 4rem)' }}>
            Real people.
            <br />
            <span className="text-gradient-green">Real transformations.</span>
          </h2>
        </div>
      </div>

      {/* Scrolling row */}
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
      >
        <div className="absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-[#FFFFF0] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-[#FFFFF0] to-transparent z-10 pointer-events-none" />

        <div
          className="flex gap-6 pb-2"
          style={{ transform: `translateX(-${offset}px)`, willChange: 'transform' }}
        >
          {doubled.map((t, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[410px] p-8 rounded-3xl border border-[#568203]/12 bg-white hover:border-[#568203]/25 transition-colors duration-300 shadow-sm"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={13} fill="#568203" color="#568203" />
                ))}
              </div>

              <p className="text-[#3d5e02]/65 text-sm leading-[1.85] mb-8 line-clamp-3">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 mb-7">
                <Avatar imageId={t.imageId} name={t.name} initials={t.initials} />
                <div>
                  <div className="text-[#3d5e02] font-semibold text-sm">{t.name}</div>
                  <div className="text-[#568203] text-xs mt-1">{t.role}</div>
                </div>
              </div>

              {/* Before / After */}
              <div className="flex gap-4 pt-6 border-t border-[#568203]/10">
                <div className="flex-1 text-center">
                  <div className="text-[#568203]/40 text-[10px] uppercase tracking-[0.15em] mb-1.5">Before</div>
                  <div className="text-[#3d5e02]/60 text-xs font-medium">{t.before}</div>
                </div>
                <div className="w-px bg-[#568203]/12" />
                <div className="flex-1 text-center">
                  <div className="text-[#568203] text-[10px] uppercase tracking-[0.15em] mb-1.5">After</div>
                  <div className="text-[#568203] text-xs font-semibold">{t.after}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
