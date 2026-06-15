'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';
import Image from 'next/image';
import { Bot, User, Send, Trash2, Dumbbell, Zap, Brain, Utensils, Trophy, Sparkles } from 'lucide-react';
import { getBotResponse, type ChatMessage } from '@/lib/fitbot';

const quickPrompts = [
  { label: 'Build muscle plan', icon: Dumbbell, prompt: 'I want to build muscle. Give me a plan.' },
  { label: 'Fat loss help', icon: Zap, prompt: 'Help me lose fat and get shredded.' },
  { label: 'Arm workout', icon: Brain, prompt: 'I want bigger arms.' },
  { label: 'Vegan nutrition', icon: Utensils, prompt: "I'm vegan. What should I eat to build muscle?" },
  { label: 'Beginner plan', icon: Trophy, prompt: "I'm a complete beginner. Where do I start?" },
  { label: 'Motivate me', icon: Zap, prompt: "I'm feeling lazy today." },
];

function renderMarkdown(text: string): string {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>').replace(/\n/g, '<br />');
}

export default function AiCoachPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([{ id: '0', from: 'bot', text: "Hey — I'm FITBOT, your AI fitness coach. I know workouts, nutrition, and I'm just sarcastic enough to keep you accountable.\n\nWhat are we working on today?", timestamp: new Date() }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = { id: Date.now().toString(), from: 'user', text: text.trim(), timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]); setInput(''); setIsTyping(true);
    setTimeout(() => {
      const botMsg: ChatMessage = { id: (Date.now() + 1).toString(), from: 'bot', text: getBotResponse(text), timestamp: new Date() };
      setMessages(prev => [...prev, botMsg]); setIsTyping(false);
    }, 900 + Math.random() * 700);
  };

  const handleSubmit = (e: FormEvent) => { e.preventDefault(); sendMessage(input); };
  const clearChat = () => setMessages([{ id: '0', from: 'bot', text: "Fresh start! What are we working on?", timestamp: new Date() }]);

  return (
    <div className="min-h-screen bg-[#FFF8B9] pt-24">
      {/* Hero */}
      <div className="relative overflow-hidden bg-[#568203] border-b border-[#FFF8B9]/10">
        <div className="absolute inset-0"><Image src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&q=60&w=1800" alt="AI Coach" fill className="object-cover object-center opacity-10" /><div className="absolute inset-0 bg-gradient-to-b from-[#568203]/90 to-[#568203]" /></div>
        <div className="max-w-4xl mx-auto px-10 py-28 relative z-10 text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-3xl bg-[#FFF8B9]/12 border border-[#FFF8B9]/25 flex items-center justify-center"><Bot size={30} color="#FFF8B9" /></div>
            <div className="text-left">
              <span className="text-[#F0E878] text-xs font-semibold tracking-[0.25em] uppercase block mb-1.5">AI Fitness Coach</span>
              <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#FFF8B9] animate-pulse" /><span className="text-[#FFF8B9]/50 text-sm">Online — ready to train you</span></div>
            </div>
          </div>
          <h1 className="font-syne font-bold text-[#FFF8B9] leading-tight mb-6" style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)' }}>Meet <span className="text-[#F0E878]">FITBOT</span></h1>
          <p className="text-[#FFF8B9]/50 text-lg max-w-2xl mx-auto leading-[1.8]">Your 24/7 AI fitness coach. Knowledgeable, motivating, and just sarcastic enough to keep you honest. No external APIs — runs entirely on a local knowledge base.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="p-8 rounded-3xl border border-[#568203]/15 bg-white shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#568203]/10 border border-[#568203]/20 flex items-center justify-center"><Bot size={20} color="#568203" /></div>
                <div><div className="text-[#3d5e02] font-semibold text-sm">FITBOT</div><div className="flex items-center gap-1.5 mt-1"><div className="w-1.5 h-1.5 rounded-full bg-[#568203] animate-pulse" /><span className="text-[#568203] text-xs">Online</span></div></div>
                <Sparkles size={14} color="rgba(86,130,3,0.4)" className="ml-auto" />
              </div>
              <p className="text-[#568203]/50 text-xs leading-[1.8]">Powered by a local fitness knowledge base. No external API calls, no data sent anywhere.</p>
            </div>

            <div className="p-8 rounded-3xl border border-[#568203]/15 bg-white shadow-sm">
              <h3 className="text-[#3d5e02] font-semibold text-sm mb-6">I can help with</h3>
              <div className="space-y-4">
                {[[Dumbbell, 'Workout plans & exercises'], [Utensils, 'Meal plans & macro targets'], [Zap, 'Fat loss & muscle gain strategy'], [Trophy, 'Challenge recommendations'], [Brain, 'Fitness FAQs & beginner advice']].map(([Icon, label]) => (
                  <div key={label as string} className="flex items-center gap-3 text-[#568203]/55 text-xs"><Icon size={13} color="#568203" /><span>{label as string}</span></div>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-3xl border border-[#568203]/15 bg-white shadow-sm">
              <h3 className="text-[#3d5e02] font-semibold text-sm mb-6">Quick prompts</h3>
              <div className="space-y-2">
                {quickPrompts.map((qp) => (
                  <button key={qp.label} onClick={() => sendMessage(qp.prompt)} className="w-full text-left px-4 py-3 rounded-2xl text-xs text-[#568203]/55 hover:text-[#568203] hover:bg-[#568203]/6 border border-transparent hover:border-[#568203]/15 transition-all duration-200 flex items-center gap-3">
                    <qp.icon size={12} />{qp.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Chat */}
          <div className="lg:col-span-3">
            <div className="rounded-3xl border border-[#568203]/15 bg-white overflow-hidden flex flex-col shadow-sm" style={{ height: '72vh', minHeight: '560px' }}>
              <div className="flex items-center justify-between px-7 py-5 border-b border-[#568203]/10 bg-[#568203]/4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#568203]/10 border border-[#568203]/20 flex items-center justify-center"><Bot size={18} color="#568203" /></div>
                  <div><div className="text-[#3d5e02] font-semibold text-sm">FITBOT</div><div className="flex items-center gap-1.5 mt-0.5"><div className="w-1.5 h-1.5 rounded-full bg-[#568203] animate-pulse" /><span className="text-[#568203] text-xs">Ready to train you</span></div></div>
                </div>
                <button onClick={clearChat} className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#568203]/15 text-[#568203]/40 text-xs hover:text-[#568203] hover:border-[#568203]/30 transition-all"><Trash2 size={11} />Clear</button>
              </div>

              <div className="flex-1 overflow-y-auto p-7 space-y-5 bg-[#FFFFF5]">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex gap-4 chat-bubble-in ${msg.from === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${msg.from === 'bot' ? 'bg-[#568203]/10 border border-[#568203]/20' : 'bg-[#568203] border border-[#568203]'}`}>
                      {msg.from === 'bot' ? <Bot size={15} color="#568203" /> : <User size={15} color="#FFF8B9" />}
                    </div>
                    <div className={`max-w-[80%] flex flex-col gap-1.5 ${msg.from === 'user' ? 'items-end' : 'items-start'}`}>
                      <div className={`px-5 py-4 rounded-2xl text-sm leading-relaxed ${msg.from === 'bot' ? 'border border-[#568203]/10 bg-white text-[#3d5e02] rounded-tl-sm' : 'bg-[#568203] text-[#FFF8B9] rounded-tr-sm'}`} dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.text) }} />
                      <div className="text-[#568203]/25 text-[10px] px-1">{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex gap-4 chat-bubble-in">
                    <div className="w-9 h-9 rounded-full bg-[#568203]/10 border border-[#568203]/20 flex items-center justify-center flex-shrink-0"><Bot size={15} color="#568203" /></div>
                    <div className="px-5 py-4 rounded-2xl rounded-tl-sm border border-[#568203]/10 bg-white flex items-center gap-1.5">
                      {[0, 150, 300].map(d => <div key={d} className="w-1.5 h-1.5 rounded-full bg-[#568203]/40 animate-bounce" style={{ animationDelay: `${d}ms` }} />)}
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              <div className="px-7 py-6 border-t border-[#568203]/10 bg-white">
                <div className="flex gap-2 mb-4 overflow-x-auto hide-scrollbar pb-1">
                  {['Arms', 'Fat Loss', 'Nutrition', 'Motivate me', 'Cardio', 'Beginner plan'].map((chip) => (
                    <button key={chip} onClick={() => sendMessage(chip)} className="flex-shrink-0 px-4 py-2 rounded-full border border-[#568203]/15 bg-[#568203]/4 text-[#568203]/55 text-xs hover:border-[#568203]/30 hover:text-[#568203] transition-all duration-200">{chip}</button>
                  ))}
                </div>
                <form onSubmit={handleSubmit} className="flex gap-3">
                  <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Ask me anything about fitness..." disabled={isTyping} className="flex-1 px-5 py-3.5 rounded-2xl border border-[#568203]/15 bg-[#568203]/3 text-[#3d5e02] placeholder-[#568203]/30 text-sm focus:outline-none focus:border-[#568203]/35 transition-colors disabled:opacity-50" />
                  <button type="submit" disabled={isTyping || !input.trim()} className="w-12 h-12 rounded-2xl bg-[#568203] flex items-center justify-center hover:bg-[#3d5e02] transition-all hover:scale-105 disabled:opacity-35 disabled:scale-100 flex-shrink-0"><Send size={17} color="#FFF8B9" /></button>
                </form>
                <p className="text-[#568203]/25 text-[11px] mt-3 text-center">FITBOT uses local knowledge only — no data sent to external servers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
