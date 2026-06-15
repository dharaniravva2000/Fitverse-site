'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Bot, User } from 'lucide-react';

const conversation = [
  { from: 'user', text: "I want bigger arms." },
  { from: 'bot', text: "Great. Let's make your sleeves regret existing. Start with 4×8 barbell curls, 3×10 hammer curls, then finish with skull crushers. Your biceps will file a formal complaint tomorrow." },
  { from: 'user', text: "I skipped leg day." },
  { from: 'bot', text: "We need to have a serious conversation. 👀 Your upper body is writing checks your legs can't cash. See you in the squat rack — today." },
  { from: 'user', text: "What should I eat to lose fat?" },
  { from: 'bot', text: "High protein (1g per lb bodyweight), moderate carbs, less processed junk. Think: chicken, rice, broccoli — the classic bro trio. But actually good versions of it. Want a full meal plan?" },
];

export default function AiPreviewSection() {
  const [visible, setVisible] = useState<number[]>([]);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    conversation.forEach((_, i) => {
      setTimeout(() => {
        setVisible((prev) => [...prev, i]);
      }, i * 1000);
    });
  }, [started]);

  return (
    <section className="py-28 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#C7F464]/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <span className="text-[#C7F464] text-sm font-semibold tracking-widest uppercase mb-4 block">
              AI Fitness Coach
            </span>
            <h2 className="font-syne font-bold text-[clamp(2.5rem,5vw,4rem)] text-white leading-tight mb-6">
              Your smartest
              <br />
              <span className="text-gradient">gym buddy.</span>
              <br />
              Available 24/7.
            </h2>
            <p className="text-white/40 text-lg leading-relaxed mb-8">
              No API keys. No subscriptions within subscriptions. Our AI coach
              lives right here, powered by a deep fitness knowledge base — ready
              to guide workouts, plan your meals, and keep you accountable.
            </p>
            <div className="flex flex-col gap-4 mb-10">
              {[
                'Personalised workout recommendations',
                'Meal plan suggestions & macro math',
                'Motivational — with just enough sass',
                'Answers beginner to advanced questions',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#C7F464]/20 border border-[#C7F464]/40 flex items-center justify-center flex-shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C7F464]" />
                  </div>
                  <span className="text-white/60 text-sm">{item}</span>
                </div>
              ))}
            </div>
            <Link
              href="/ai-coach"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#C7F464] text-black font-bold hover:bg-[#DEFF6E] hover:scale-105 transition-all duration-300"
            >
              Chat with FITBOT <ArrowRight size={18} />
            </Link>
          </div>

          {/* Right: Chat preview */}
          <div className="relative">
            {/* Chat window */}
            <div className="rounded-2xl glass border border-white/8 overflow-hidden">
              {/* Header */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5 bg-white/3">
                <div className="w-9 h-9 rounded-full bg-[#C7F464]/15 border border-[#C7F464]/30 flex items-center justify-center">
                  <Bot size={18} color="#C7F464" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">FITBOT</div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C7F464] animate-pulse" />
                    <span className="text-[#C7F464] text-xs">Online — ready to train you</span>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="p-5 space-y-4 min-h-[320px]">
                {!started ? (
                  <div className="flex items-center justify-center h-full min-h-[200px]">
                    <button
                      onClick={() => setStarted(true)}
                      className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#C7F464]/10 border border-[#C7F464]/30 text-[#C7F464] text-sm font-medium hover:bg-[#C7F464]/20 transition-all duration-300"
                    >
                      ▶ Watch a demo conversation
                    </button>
                  </div>
                ) : (
                  conversation.map((msg, i) =>
                    visible.includes(i) ? (
                      <div
                        key={i}
                        className={`flex gap-3 chat-bubble-in ${msg.from === 'user' ? 'flex-row-reverse' : ''}`}
                      >
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                            msg.from === 'bot'
                              ? 'bg-[#C7F464]/15 border border-[#C7F464]/30'
                              : 'bg-white/10 border border-white/20'
                          }`}
                        >
                          {msg.from === 'bot' ? (
                            <Bot size={14} color="#C7F464" />
                          ) : (
                            <User size={14} color="rgba(255,255,255,0.6)" />
                          )}
                        </div>
                        <div
                          className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                            msg.from === 'bot'
                              ? 'glass border border-white/5 text-white/80 rounded-tl-sm'
                              : 'bg-[#C7F464]/15 border border-[#C7F464]/20 text-[#C7F464] rounded-tr-sm'
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ) : null
                  )
                )}
              </div>

              {/* Input preview */}
              <div className="px-5 py-4 border-t border-white/5 flex items-center gap-3">
                <div className="flex-1 px-4 py-2.5 rounded-full glass border border-white/8 text-white/20 text-sm">
                  Ask me anything about fitness...
                </div>
                <Link
                  href="/ai-coach"
                  className="w-9 h-9 rounded-full bg-[#C7F464] flex items-center justify-center hover:bg-[#DEFF6E] transition-colors"
                >
                  <ArrowRight size={16} color="#111" />
                </Link>
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 px-4 py-2 rounded-full glass border border-[#C7F464]/20 text-[#C7F464] text-xs font-semibold animate-float">
              🧠 AI-Powered
            </div>
            <div className="absolute -bottom-4 -left-4 px-4 py-2 rounded-full glass border border-[#A8D5BA]/20 text-[#A8D5BA] text-xs font-semibold animate-float" style={{ animationDelay: '1.5s' }}>
              ⚡ Instant Answers
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
