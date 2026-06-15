'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Zap } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/workouts', label: 'Workouts' },
  { href: '/nutrition', label: 'Nutrition' },
  { href: '/community', label: 'Community' },
  { href: '/ai-coach', label: 'AI Coach', badge: 'NEW' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3 nav-blur bg-black/70 border-b border-white/5'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-[#C7F464] flex items-center justify-center group-hover:scale-110 transition-transform">
            <Zap size={18} fill="#111" color="#111" />
          </div>
          <span className="font-syne font-800 text-xl tracking-tight">
            FIT<span className="text-[#C7F464]">VERSE</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link, i) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(null)}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-1.5 ${
                  isActive
                    ? 'text-[#C7F464]'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-lg bg-white/5" />
                )}
                {activeIndex === i && !isActive && (
                  <span className="absolute inset-0 rounded-lg bg-white/5" />
                )}
                {link.label}
                {link.badge && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#C7F464] text-black">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/ai-coach"
            className="px-5 py-2 rounded-full bg-[#C7F464] text-black text-sm font-semibold hover:bg-[#DEFF6E] transition-all duration-300 hover:scale-105 ripple"
          >
            Start Free →
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg glass text-white"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-500 overflow-hidden ${
          menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-4 bg-black/90 border-t border-white/5 flex flex-col gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-3 rounded-xl text-sm font-medium flex items-center justify-between ${
                  isActive
                    ? 'bg-[#C7F464]/10 text-[#C7F464]'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
                {link.badge && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#C7F464] text-black">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
          <Link
            href="/ai-coach"
            className="mt-2 px-5 py-3 rounded-full bg-[#C7F464] text-black text-sm font-semibold text-center"
          >
            Start Free →
          </Link>
        </div>
      </div>
    </nav>
  );
}
