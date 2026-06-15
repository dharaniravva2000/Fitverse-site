'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';
import { Bot, User, Send, Trash2, Zap, Brain, Dumbbell, Utensils, Trophy } from 'lucide-react';
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
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    .replace(/\n/g, '<br />');
}

export default function AiCoachPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '0',
      from: 'bot',
      text: "Hey there, champion! 👋 I'm FITBOT — your AI fitness coach. I know workouts, nutrition, challenges, and I'm just sarcastic enough to keep you accountable.\n\nWhat are we working on today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = { id: Date.now().toString(), from: 'user', text: text.trim(), timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const delay = 800 + Math.random() * 800;
    setTimeout(() => {
      const response = getBotResponse(text);
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        from: 'bot',
        text: response,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, delay);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const clearChat = () => {
    setMessages([{
      id: '0',
      from: 'bot',
      text: "Fresh start! What are we working on? 💪",
      timestamp: new Date(),
    }]);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24">
      {/* Hero */}
      <div className="relative overflow-hidden py-16 border-b border-white/5">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-[#C7F464]/6 blur-[80px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#C7F464]/15 border border-[#C7F464]/30 mb-6 mx-auto">
            <Bot size={32} color="#C7F464" />
          </div>
          <span className="text-[#C7F464] text-sm font-semibold tracking-widest uppercase mb-3 block">AI Fitness Coach</span>
          <h1 className="font-syne font-bold text-[clamp(2.5rem,6vw,5rem)] text-white leading-tight mb-4">
            Meet <span className="text-[#C7F464]">FITBOT</span>
          </h1>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            Your 24/7 AI fitness coach. Knowledgeable, motivating, and just sarcastic enough to keep you honest.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* About */}
            <div className="p-5 rounded-2xl glass border border-white/8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#C7F464]/15 border border-[#C7F464]/30 flex items-center justify-center">
                  <Bot size={20} color="#C7F464" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">FITBOT</div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C7F464] animate-pulse" />
                    <span className="text-[#C7F464] text-xs">Online</span>
                  </div>
                </div>
              </div>
              <p className="text-white/40 text-xs leading-relaxed">
                Powered by a deep fitness knowledge base. No external APIs, no data collection — just real fitness advice.
              </p>
            </div>

            {/* Capabilities */}
            <div className="p-5 rounded-2xl glass border border-white/8">
              <h3 className="text-white font-semibold text-sm mb-4">I can help with</h3>
              <div className="space-y-2.5">
                {[
                  ['💪', 'Workout plans & exercises'],
                  ['🥗', 'Meal plans & macros'],
                  ['📊', 'BMI & calorie targets'],
                  ['🔥', 'Fat loss strategies'],
                  ['🏆', 'Challenge recommendations'],
                  ['💬', 'Motivation (+ mild sass)'],
                  ['❓', 'Fitness FAQs answered'],
                ].map(([emoji, label]) => (
                  <div key={label} className="flex items-center gap-2 text-white/50 text-xs">
                    <span>{emoji}</span>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Prompts */}
            <div className="p-5 rounded-2xl glass border border-white/8">
              <h3 className="text-white font-semibold text-sm mb-4">Quick prompts</h3>
              <div className="space-y-2">
                {quickPrompts.map((qp) => (
                  <button
                    key={qp.label}
                    onClick={() => sendMessage(qp.prompt)}
                    className="w-full text-left px-3 py-2.5 rounded-xl text-xs text-white/60 hover:text-[#C7F464] hover:bg-[#C7F464]/5 border border-transparent hover:border-[#C7F464]/20 transition-all duration-200 flex items-center gap-2"
                  >
                    <qp.icon size={12} />
                    {qp.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl glass border border-white/8 overflow-hidden flex flex-col" style={{ height: '72vh', minHeight: '500px' }}>
              {/* Chat header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 bg-white/2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#C7F464]/15 border border-[#C7F464]/30 flex items-center justify-center">
                    <Bot size={18} color="#C7F464" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">FITBOT</div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C7F464] animate-pulse" />
                      <span className="text-[#C7F464] text-xs">Ready to train you</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={clearChat}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass border border-white/8 text-white/30 text-xs hover:text-white/60 hover:border-white/20 transition-all"
                >
                  <Trash2 size={12} />
                  Clear
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-3 chat-bubble-in ${msg.from === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    {/* Avatar */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        msg.from === 'bot'
                          ? 'bg-[#C7F464]/15 border border-[#C7F464]/30'
                          : 'bg-white/10 border border-white/20'
                      }`}
                    >
                      {msg.from === 'bot'
                        ? <Bot size={16} color="#C7F464" />
                        : <User size={16} color="rgba(255,255,255,0.7)" />
                      }
                    </div>

                    {/* Bubble */}
                    <div className={`max-w-[80%] ${msg.from === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                      <div
                        className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                          msg.from === 'bot'
                            ? 'glass border border-white/8 text-white/80 rounded-tl-sm'
                            : 'bg-[#C7F464]/15 border border-[#C7F464]/20 text-[#C7F464] rounded-tr-sm'
                        }`}
                        dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.text) }}
                      />
                      <div className="text-white/20 text-[10px] px-1">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex gap-3 chat-bubble-in">
                    <div className="w-8 h-8 rounded-full bg-[#C7F464]/15 border border-[#C7F464]/30 flex items-center justify-center flex-shrink-0">
                      <Bot size={16} color="#C7F464" />
                    </div>
                    <div className="px-4 py-3 rounded-2xl rounded-tl-sm glass border border-white/8 flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-[#C7F464]/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 rounded-full bg-[#C7F464]/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 rounded-full bg-[#C7F464]/60 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div className="px-5 py-4 border-t border-white/5">
                {/* Quick chips */}
                <div className="flex gap-2 mb-3 overflow-x-auto hide-scrollbar pb-1">
                  {['💪 Arms', '🔥 Fat Loss', '🥗 Nutrition', '⚡ Motivate me', '🏃 Cardio'].map((chip) => (
                    <button
                      key={chip}
                      onClick={() => sendMessage(chip.split(' ').slice(1).join(' '))}
                      className="flex-shrink-0 px-3 py-1.5 rounded-full bg-white/5 border border-white/8 text-white/50 text-xs hover:border-[#C7F464]/30 hover:text-[#C7F464] transition-all duration-200"
                    >
                      {chip}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleSubmit} className="flex gap-3">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Ask me anything about fitness..."
                    disabled={isTyping}
                    className="flex-1 px-4 py-3 rounded-xl glass border border-white/8 bg-transparent text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#C7F464]/40 transition-colors disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={isTyping || !input.trim()}
                    className="w-11 h-11 rounded-xl bg-[#C7F464] flex items-center justify-center text-black hover:bg-[#DEFF6E] transition-all hover:scale-105 disabled:opacity-40 disabled:scale-100 flex-shrink-0"
                  >
                    <Send size={18} />
                  </button>
                </form>
                <p className="text-white/15 text-xs mt-2 text-center">
                  FITBOT uses local knowledge only. No data sent to external servers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
