'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Bot, User, Sparkles } from 'lucide-react';

const conversation = [
  { from: 'user', text: "I want bigger arms." },
  { from: 'bot', text: "Great. Let's make your sleeves regret existing. 4×8 barbell curls, 3×10 hammer curls, then skull crushers. Your biceps will file a formal complaint tomorrow." },
  { from: 'user', text: "I skipped leg day." },
  { from: 'bot', text: "We need to have a serious conversation. Your upper body is writing checks your legs can't cash. Squat rack. Today." },
  { from: 'user', text: "What should I eat to lose fat?" },
  { from: 'bot', text: "High protein (1g/lb bodyweight), moderate carbs, cut the processed junk. Chicken, rice, broccoli — the proven trio. Want a full personalised plan?" },
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
    <section className="py-44 bg-[#FFF8B9] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#568203]/8 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">

          {/* Left: Text */}
          <div>
            <span className="text-[#568203] text-xs font-semibold tracking-[0.25em] uppercase mb-6 block">
              AI Fitness Coach
            </span>
            <h2 className="font-syne font-bold text-[#3d5e02] leading-[1.1] mb-7" style={{ fontSize: 'clamp(2.6rem, 4.5vw, 4rem)' }}>
              Your smartest
              <br />
              <span className="text-gradient-green">gym buddy.</span>
              <br />
              Available 24/7.
            </h2>
            <p className="text-[#568203]/65 text-xl leading-[1.75] mb-12">
              No API keys. No subscriptions within subscriptions. Our AI coach
              lives right here — powered by a deep fitness knowledge base — ready
              to guide workouts, plan meals, and keep you accountable.
            </p>

            <div className="flex flex-col gap-5 mb-14">
              {[
                'Personalised workout recommendations',
                'Meal plan suggestions & macro guidance',
                'Motivational — with just enough sass',
                'Answers beginner to advanced questions',
              ].map((item) => (
                <div key={item} className="flex items-center gap-4">
                  <div className="w-5 h-5 rounded-full bg-[#568203]/15 border border-[#568203]/30 flex items-center justify-center flex-shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#568203]" />
                  </div>
                  <span className="text-[#3d5e02]/70 text-base">{item}</span>
                </div>
              ))}
            </div>

            <Link
              href="/ai-coach"
              className="inline-flex items-center gap-3 px-9 py-4 rounded-full bg-[#568203] text-[#FFF8B9] font-bold text-base hover:bg-[#3d5e02] hover:scale-105 transition-all duration-300 hover:shadow-[0_0_50px_rgba(86,130,3,0.4)]"
            >
              Chat with FITBOT <ArrowRight size={18} />
            </Link>
          </div>

          {/* Right: Chat preview */}
          <div className="relative">
            <div className="rounded-3xl border border-[#568203]/20 bg-white overflow-hidden shadow-2xl shadow-[#568203]/10">

              {/* Chat header */}
              <div className="flex items-center gap-3 px-6 py-5 border-b border-[#568203]/10 bg-[#568203]/5">
                <div className="w-10 h-10 rounded-full bg-[#568203]/12 border border-[#568203]/25 flex items-center justify-center flex-shrink-0">
                  <Bot size={18} color="#568203" />
                </div>
                <div>
                  <div className="text-[#3d5e02] font-semibold text-sm">FITBOT</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#568203] animate-pulse" />
                    <span className="text-[#568203] text-xs">Online — ready to train you</span>
                  </div>
                </div>
                <Sparkles size={15} color="rgba(86,130,3,0.45)" className="ml-auto" />
              </div>

              {/* Messages */}
              <div className="p-6 space-y-5 min-h-[320px] bg-[#FFFFF5]">
                {!started ? (
                  <div className="flex items-center justify-center min-h-[240px]">
                    <button
                      onClick={() => setStarted(true)}
                      className="flex items-center gap-3 px-7 py-3.5 rounded-full border border-[#568203]/25 bg-[#568203]/8 text-[#568203] text-sm font-medium hover:bg-[#568203]/15 transition-all duration-300"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#568203]" />
                      Watch a demo conversation
                    </button>
                  </div>
                ) : (
                  conversation.map((msg, i) =>
                    visible.includes(i) ? (
                      <div
                        key={i}
                        className={`flex gap-3 chat-bubble-in ${msg.from === 'user' ? 'flex-row-reverse' : ''}`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          msg.from === 'bot' ? 'bg-[#568203]/12 border border-[#568203]/25' : 'bg-[#FFF8B9] border border-[#568203]/20'
                        }`}>
                          {msg.from === 'bot'
                            ? <Bot size={14} color="#568203" />
                            : <User size={14} color="#568203" />}
                        </div>
                        <div className={`max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                          msg.from === 'bot'
                            ? 'border border-[#568203]/10 bg-white text-[#3d5e02] rounded-tl-sm'
                            : 'bg-[#568203] text-[#FFF8B9] rounded-tr-sm'
                        }`}>
                          {msg.text}
                        </div>
                      </div>
                    ) : null
                  )
                )}
              </div>

              {/* Input bar */}
              <div className="px-6 py-5 border-t border-[#568203]/10 bg-white flex items-center gap-3">
                <div className="flex-1 px-5 py-3 rounded-full border border-[#568203]/15 bg-[#568203]/4 text-[#568203]/35 text-sm">
                  Ask me anything about fitness...
                </div>
                <Link href="/ai-coach" className="w-10 h-10 rounded-full bg-[#568203] flex items-center justify-center hover:bg-[#3d5e02] transition-colors flex-shrink-0">
                  <ArrowRight size={16} color="#FFF8B9" />
                </Link>
              </div>
            </div>

            {/* Floating labels */}
            <div className="absolute -top-5 -right-4 px-5 py-2.5 rounded-full border border-[#568203]/25 bg-[#FFF8B9] text-[#568203] text-xs font-semibold shadow-md animate-float hidden sm:block">
              AI-Powered
            </div>
            <div className="absolute -bottom-5 -left-4 px-5 py-2.5 rounded-full border border-[#568203]/20 bg-[#FFF8B9] text-[#568203] text-xs font-semibold shadow-md animate-float hidden sm:block" style={{ animationDelay: '1.5s' }}>
              Instant Answers
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
