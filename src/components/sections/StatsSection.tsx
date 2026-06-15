'use client';

import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: 50000, suffix: '+', label: 'Active Athletes', description: 'Training worldwide daily' },
  { value: 500, suffix: '+', label: 'Workout Plans', description: 'Expert-designed programs' },
  { value: 12, suffix: 'M+', label: 'Calories Burned', description: 'By our community this month' },
  { value: 98, suffix: '%', label: 'Success Rate', description: 'Members reach their goals' },
];

function useCounter(target: number, isVisible: boolean, duration = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
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
    <div className="flex-1 min-w-[200px] text-center group py-6">
      <div
        className="font-syne font-bold text-[#568203] mb-4 transition-all duration-300 group-hover:scale-105"
        style={{ fontSize: 'clamp(3rem, 5vw, 5rem)', lineHeight: 1 }}
      >
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-[#3d5e02] font-semibold text-base mb-2">{label}</div>
      <div className="text-[#568203]/55 text-sm">{description}</div>
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
    <section className="py-28 bg-[#FFF8B9] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#568203]/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#568203]/20 to-transparent" />

      <div ref={ref} className="max-w-6xl mx-auto px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label}>
              <StatCard {...s} isVisible={isVisible} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
