'use client';

import Link from 'next/link';
import { Zap, Dumbbell, AtSign, Hash, Radio } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-[#2d4501] border-t border-[#FFF8B9]/10 overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#FFF8B9]/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-10 pt-20 pb-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-14 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-6">
              <div className="w-9 h-9 rounded-xl bg-[#FFF8B9] flex items-center justify-center">
                <Zap size={18} fill="#568203" color="#568203" />
              </div>
              <span className="font-syne font-bold text-xl tracking-tight text-[#FFF8B9]">
                FIT<span className="text-[#F0E878]">VERSE</span>
              </span>
            </Link>
            <p className="text-[#FFF8B9]/45 text-sm leading-[1.8] mb-7">
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
                  className="w-10 h-10 rounded-full border border-[#FFF8B9]/15 bg-[#FFF8B9]/5 flex items-center justify-center text-[#FFF8B9]/45 hover:text-[#FFF8B9] hover:border-[#FFF8B9]/30 transition-all duration-300"
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
              <h4 className="text-[#FFF8B9] font-semibold mb-6 text-xs tracking-[0.2em] uppercase">
                {col.title}
              </h4>
              <ul className="space-y-4">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[#FFF8B9]/40 text-sm hover:text-[#FFF8B9] transition-colors duration-300"
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
        <div className="pt-8 border-t border-[#FFF8B9]/8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[#FFF8B9]/28 text-sm">
            <Dumbbell size={14} />
            <span>© 2026 FITVERSE. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6 text-[#FFF8B9]/28 text-sm">
            <Link href="/" className="hover:text-[#FFF8B9]/60 transition-colors">Privacy Policy</Link>
            <Link href="/" className="hover:text-[#FFF8B9]/60 transition-colors">Terms of Service</Link>
            <Link href="/" className="hover:text-[#FFF8B9]/60 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
