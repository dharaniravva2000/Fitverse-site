'use client';

import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: 50000, suffix: '+', label: 'Active Athletes', description: 'Training worldwide daily' },
  { value: 500, suffix: '+', label: 'Workout Plans', description: 'Expert-designed programs' },
  { value: 12, suffix: 'M+', label: 'Calories Burned', description: 'By our community this month' },
  { value: 98, suffix: '%', label: 'Success Rate', description: 'Members hit their goals' },
];

function useCounter(target: number, isVisible: boolean, duration = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, target, duration]);
  return count;
}

function StatCard({ value, suffix, label, description, isVisible }: {
  value: number; suffix: string; label: string; description: string; isVisible: boolean;
}) {
  const count = useCounter(value, isVisible);
  return (
    <div className="flex-1 min-w-[200px] text-center group">
      <div className="font-syne font-bold text-[clamp(2.5rem,5vw,4rem)] text-[#C7F464] leading-none mb-2 group-hover:scale-110 transition-transform duration-300">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-white font-semibold text-lg mb-1">{label}</div>
      <div className="text-white/40 text-sm">{description}</div>
    </div>
  );
}

export default function StatsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 bg-[#0d0d0d] relative overflow-hidden">
      {/* Decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C7F464]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C7F464]/30 to-transparent" />

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap gap-12 items-center justify-around">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
