'use client';

import Link from 'next/link';
import { Zap, Dumbbell, AtSign, Hash, Radio } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-[#0a0a0a] border-t border-white/5 overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#C7F464]/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#C7F464] flex items-center justify-center">
                <Zap size={18} fill="#111" color="#111" />
              </div>
              <span className="font-syne font-bold text-xl tracking-tight">
                FIT<span className="text-[#C7F464]">VERSE</span>
              </span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              Train Hard. Eat Smart. Stay Consistent. Your premium fitness platform for a stronger, healthier you.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: AtSign, label: 'Instagram' },
                { icon: Hash, label: 'Twitter' },
                { icon: Radio, label: 'YouTube' },
              ].map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="w-9 h-9 rounded-full glass flex items-center justify-center text-white/50 hover:text-[#C7F464] hover:border-[#C7F464]/30 transition-all duration-300"
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            {
              title: 'Platform',
              links: [
                { href: '/workouts', label: 'Workouts' },
                { href: '/nutrition', label: 'Nutrition' },
                { href: '/community', label: 'Community' },
                { href: '/ai-coach', label: 'AI Coach' },
              ],
            },
            {
              title: 'Programs',
              links: [
                { href: '/workouts', label: 'Fat Loss' },
                { href: '/workouts', label: 'Muscle Building' },
                { href: '/workouts', label: 'Beginner Training' },
                { href: '/workouts', label: 'Cardio Programs' },
              ],
            },
            {
              title: 'Company',
              links: [
                { href: '/', label: 'About Us' },
                { href: '/', label: 'Blog' },
                { href: '/', label: 'Careers' },
                { href: '/', label: 'Contact' },
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/40 text-sm hover:text-[#C7F464] transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white/30 text-sm">
            <Dumbbell size={14} />
            <span>© 2026 FITVERSE. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6 text-white/30 text-sm">
            <Link href="/" className="hover:text-white/60 transition-colors">Privacy Policy</Link>
            <Link href="/" className="hover:text-white/60 transition-colors">Terms of Service</Link>
            <Link href="/" className="hover:text-white/60 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
