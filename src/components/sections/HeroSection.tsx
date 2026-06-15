'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Play, ChevronDown } from 'lucide-react';

const WORDS = ['Stronger', 'Faster', 'Leaner', 'Unstoppable', 'Elite'];

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const particleRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number | null>(null);

  // Word cycling
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

  // Particle canvas
  useEffect(() => {
    const canvas = particleRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const particles: {
      x: number; y: number; r: number; speedX: number; speedY: number; opacity: number; color: string;
    }[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -Math.random() * 0.6 - 0.2,
      opacity: Math.random() * 0.5 + 0.1,
      color: Math.random() > 0.5 ? '#C7F464' : '#A8D5BA',
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', onResize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Particle canvas */}
      <canvas ref={particleRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-[#C7F464]/6 blur-[120px]" />
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[#A8D5BA]/5 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-[#C7F464]/5 blur-[80px]" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(#C7F464 1px, transparent 1px), linear-gradient(90deg, #C7F464 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#C7F464]/20 text-[#C7F464] text-sm font-medium mb-8 animate-bounce-gentle">
          <span className="w-2 h-2 rounded-full bg-[#C7F464] animate-pulse" />
          Premium AI-Powered Fitness Platform
          <ArrowRight size={14} />
        </div>

        {/* Headline */}
        <h1 className="font-syne font-bold leading-[1.05] mb-6">
          <span className="block text-[clamp(3rem,8vw,7rem)] text-white">
            Become
          </span>
          <span
            className={`block text-[clamp(3rem,8vw,7rem)] text-[#C7F464] transition-all duration-300 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}
            style={{ textShadow: '0 0 40px rgba(199,244,100,0.4)' }}
          >
            {WORDS[wordIndex]}
          </span>
        </h1>

        <p className="text-white/50 text-[clamp(1rem,2vw,1.25rem)] max-w-2xl mx-auto mb-12 leading-relaxed">
          Train Hard. Eat Smart. Stay Consistent. Join 50,000+ athletes using
          AI-powered coaching, science-backed workouts, and a community that
          keeps you accountable.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="/workouts"
            className="group flex items-center gap-3 px-8 py-4 rounded-full bg-[#C7F464] text-black font-bold text-base hover:bg-[#DEFF6E] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(199,244,100,0.5)] ripple"
          >
            Start Training Free
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/ai-coach"
            className="group flex items-center gap-3 px-8 py-4 rounded-full glass border border-white/10 text-white font-medium text-base hover:border-[#C7F464]/40 transition-all duration-300"
          >
            <Play size={16} className="fill-white" />
            Meet Your AI Coach
          </Link>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {[
            { value: '50K+', label: 'Athletes' },
            { value: '500+', label: 'Workouts' },
            { value: '98%', label: 'Success Rate' },
            { value: '4.9★', label: 'App Rating' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-syne font-bold text-3xl text-[#C7F464] mb-1">{stat.value}</div>
              <div className="text-white/40 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating 3D-style dumbbell visuals */}
      <div className="absolute left-8 top-1/3 opacity-20 animate-float-slow hidden lg:block">
        <div className="text-8xl select-none">🏋️</div>
      </div>
      <div className="absolute right-12 top-1/4 opacity-15 animate-float hidden lg:block" style={{ animationDelay: '1s' }}>
        <div className="text-6xl select-none">💪</div>
      </div>
      <div className="absolute right-8 bottom-1/3 opacity-15 animate-float-slow hidden lg:block" style={{ animationDelay: '2s' }}>
        <div className="text-7xl select-none">⚡</div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 animate-bounce-gentle">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown size={16} />
      </div>
    </section>
  );
}
