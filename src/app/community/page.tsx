'use client';

import { useState } from 'react';
import { Trophy, Users, Flame, Timer, Heart, Share2, MessageCircle, Star, ChevronRight, Crown, Medal, Award } from 'lucide-react';

const challenges = [
  {
    id: 1, emoji: '🔥', title: '30-Day Transformation', category: 'Full Body',
    description: 'Complete body overhaul. Daily workouts, nutrition plans, and weekly check-ins with the community.',
    participants: 12847, duration: '30 days', difficulty: 'Intermediate', daysLeft: 14,
    prize: 'Featured Athlete + 3 months Elite free',
    color: '#C7F464', border: 'border-[#C7F464]/20', gradient: 'from-[#C7F464]/8',
  },
  {
    id: 2, emoji: '💪', title: '100 Push-Ups Challenge', category: 'Strength',
    description: 'Work your way up to 100 consecutive push-ups using our progressive overload protocol.',
    participants: 8934, duration: '60 days', difficulty: 'Beginner', daysLeft: 45,
    prize: 'Strength Warrior Badge',
    color: '#A8D5BA', border: 'border-[#A8D5BA]/20', gradient: 'from-[#A8D5BA]/8',
  },
  {
    id: 3, emoji: '🏃', title: '10K Steps Daily', category: 'Cardio',
    description: "Hit 10,000 steps every single day for 30 days. Simple. Effective. Life-changing.",
    participants: 15620, duration: '30 days', difficulty: 'Beginner', daysLeft: 22,
    prize: 'Active Lifestyle Badge',
    color: '#C7F464', border: 'border-[#C7F464]/15', gradient: 'from-[#C7F464]/6',
  },
  {
    id: 4, emoji: '⚡', title: 'Fat Loss Accelerator', category: 'Weight Loss',
    description: 'Combine HIIT training with a precision nutrition protocol for maximum fat loss in 45 days.',
    participants: 9211, duration: '45 days', difficulty: 'Advanced', daysLeft: 8,
    prize: 'Body Recomposition Trophy',
    color: '#A8D5BA', border: 'border-[#A8D5BA]/15', gradient: 'from-[#A8D5BA]/6',
  },
  {
    id: 5, emoji: '🥗', title: 'Clean Eating Month', category: 'Nutrition',
    description: 'No processed food, no alcohol, no excuses. 30 days of whole foods and real results.',
    participants: 6789, duration: '30 days', difficulty: 'Intermediate', daysLeft: 19,
    prize: 'Nutrition Champion Badge',
    color: '#C7F464', border: 'border-[#C7F464]/20', gradient: 'from-[#C7F464]/8',
  },
  {
    id: 6, emoji: '🧘', title: 'Flexibility in 30 Days', category: 'Mobility',
    description: 'Daily mobility routines that unlock flexibility most people thought impossible.',
    participants: 4523, duration: '30 days', difficulty: 'Beginner', daysLeft: 27,
    prize: 'Flexibility Master Badge',
    color: '#A8D5BA', border: 'border-[#A8D5BA]/20', gradient: 'from-[#A8D5BA]/8',
  },
];

const leaderboard = [
  { rank: 1, name: 'Marcus J.', avatar: '💪', points: 4820, streak: 47, badge: '🏆', challenge: '30-Day Transform' },
  { rank: 2, name: 'Priya S.', avatar: '🔥', points: 4650, streak: 42, badge: '🥈', challenge: 'Fat Loss Accel.' },
  { rank: 3, name: 'Jake T.', avatar: '⚡', points: 4390, streak: 38, badge: '🥉', challenge: '10K Steps' },
  { rank: 4, name: 'Aisha M.', avatar: '🌟', points: 3940, streak: 31, badge: '⭐', challenge: '30-Day Transform' },
  { rank: 5, name: 'Ryan K.', avatar: '🏋️', points: 3720, streak: 28, badge: '⭐', challenge: 'Push-Ups' },
  { rank: 6, name: 'Sofia L.', avatar: '✨', points: 3580, streak: 25, badge: '⭐', challenge: 'Clean Eating' },
  { rank: 7, name: 'David R.', avatar: '🎯', points: 3320, streak: 22, badge: '⭐', challenge: '10K Steps' },
  { rank: 8, name: 'Nina P.', avatar: '🦋', points: 3100, streak: 19, badge: '⭐', challenge: 'Flexibility' },
];

const spotlights = [
  {
    name: 'Marcus Johnson', handle: '@marcusfits', avatar: '💪', followers: '2.3K',
    achievement: 'Lost 28 lbs in 4 months — completely transformed his lifestyle.',
    likes: 847, comments: 134, shares: 92, image: '🏋️‍♂️',
    stats: { before: '220 lbs', after: '192 lbs', duration: '16 weeks' },
  },
  {
    name: 'Priya Sharma', handle: '@priyastrength', avatar: '🔥', followers: '1.8K',
    achievement: 'Went from never lifting to competing in her first powerlifting meet!',
    likes: 623, comments: 89, shares: 71, image: '🏆',
    stats: { before: 'Never trained', after: '1st place meet', duration: '8 months' },
  },
  {
    name: 'Jake Torres', handle: '@jakeruns', avatar: '⚡', followers: '3.1K',
    achievement: 'Couch potato to marathon finisher in just 6 months. Unreal.',
    likes: 1203, comments: 198, shares: 145, image: '🏃‍♂️',
    stats: { before: '0 km runs', after: '42.2 km done', duration: '6 months' },
  },
];

const badges = [
  { name: 'Iron Will', emoji: '⚡', description: '30 days straight', earned: true },
  { name: 'First Blood', emoji: '🩸', description: 'Completed first workout', earned: true },
  { name: 'Community Star', emoji: '⭐', description: '100 community interactions', earned: true },
  { name: 'Nutrition Ninja', emoji: '🥗', description: 'Logged meals 14 days', earned: false },
  { name: 'Marathon Mind', emoji: '🏃', description: 'Run 100km total', earned: false },
  { name: 'Century Club', emoji: '💯', description: '100 workouts completed', earned: false },
  { name: 'Challenge Beast', emoji: '🔥', description: 'Won 3 challenges', earned: false },
  { name: 'FITVERSE Elite', emoji: '👑', description: 'Top 1% of community', earned: false },
];

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<'challenges'|'leaderboard'|'spotlight'|'badges'>('challenges');
  const [joined, setJoined] = useState<number[]>([]);

  const toggleJoin = (id: number) => {
    setJoined(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const diffClass = (d: string) => d === 'Beginner' ? 'badge-beginner' : d === 'Advanced' ? 'badge-advanced' : 'badge-intermediate';

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24">
      {/* Hero */}
      <div className="relative overflow-hidden py-20 border-b border-white/5">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 right-1/4 w-[500px] h-[300px] rounded-full bg-[#C7F464]/5 blur-[80px]" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[200px] rounded-full bg-[#A8D5BA]/5 blur-[60px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <span className="text-[#C7F464] text-sm font-semibold tracking-widest uppercase mb-4 block">Community Hub</span>
          <h1 className="font-syne font-bold text-[clamp(3rem,7vw,6rem)] text-white leading-tight mb-6">
            Train Together.
            <br />
            <span className="text-gradient">Win Together.</span>
          </h1>
          <p className="text-white/40 text-xl max-w-2xl mx-auto mb-8">
            Join 50,000+ athletes. Compete in challenges, celebrate wins, and find the accountability that actually makes the difference.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {[['👥 50K+', 'Members'], ['🏆 200+', 'Challenges'], ['🔥 4.8M', 'Workouts logged'], ['⭐ 99%', 'Love the community']].map(([val, label]) => (
              <div key={label} className="text-center">
                <div className="font-syne font-bold text-[#C7F464]">{val}</div>
                <div className="text-white/40">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Tabs */}
        <div className="flex gap-2 mb-10 overflow-x-auto hide-scrollbar pb-1">
          {[
            { id: 'challenges', label: '🔥 Challenges' },
            { id: 'leaderboard', label: '🏆 Leaderboard' },
            { id: 'spotlight', label: '⭐ Spotlight' },
            { id: 'badges', label: '🎖 Badges' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-[#C7F464] text-black scale-105'
                  : 'glass border border-white/8 text-white/60 hover:border-white/20'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Challenges */}
        {activeTab === 'challenges' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((c) => {
              const isJoined = joined.includes(c.id);
              return (
                <div key={c.id}
                  className={`rounded-2xl glass border ${c.border} bg-gradient-to-br ${c.gradient} to-transparent overflow-hidden group card-hover`}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-4xl">{c.emoji}</div>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${diffClass(c.difficulty)}`}>{c.difficulty}</span>
                    </div>
                    <h3 className="font-syne font-bold text-xl text-white mb-2 group-hover:text-[#C7F464] transition-colors">{c.title}</h3>
                    <p className="text-white/40 text-sm leading-relaxed mb-4">{c.description}</p>

                    <div className="p-3 rounded-xl bg-black/20 border border-white/5 text-xs text-white/40 mb-4">
                      🏅 Prize: <span className="text-white/70">{c.prize}</span>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-white/40 mb-5">
                      <span className="flex items-center gap-1.5">
                        <Users size={13} style={{ color: c.color }} />{c.participants.toLocaleString()} joined
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Timer size={13} style={{ color: c.color }} />{c.daysLeft}d left
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="mb-5">
                      <div className="flex justify-between text-xs text-white/30 mb-1">
                        <span>Progress</span>
                        <span>{Math.round(((parseInt(c.duration) - c.daysLeft) / parseInt(c.duration)) * 100)}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/5">
                        <div className="h-full rounded-full transition-all duration-1000"
                          style={{ width: `${Math.round(((parseInt(c.duration) - c.daysLeft) / parseInt(c.duration)) * 100)}%`, background: c.color }}
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => toggleJoin(c.id)}
                      className={`w-full py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                        isJoined
                          ? 'bg-white/5 border border-white/10 text-white/60'
                          : 'hover:scale-[1.02] hover:shadow-lg'
                      }`}
                      style={!isJoined ? { background: `${c.color}20`, border: `1px solid ${c.color}40`, color: c.color } : {}}
                    >
                      {isJoined ? '✓ Joined — Good luck!' : 'Join Challenge →'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Leaderboard */}
        {activeTab === 'leaderboard' && (
          <div>
            <div className="mb-8">
              <h2 className="font-syne font-bold text-3xl text-white mb-2">Global Leaderboard</h2>
              <p className="text-white/40">Top athletes by points earned across all challenges this month.</p>
            </div>
            <div className="space-y-3">
              {leaderboard.map((user) => (
                <div key={user.rank}
                  className={`flex items-center gap-4 p-5 rounded-2xl transition-all duration-300 ${
                    user.rank === 1 ? 'glass border border-[#C7F464]/30 bg-gradient-to-r from-[#C7F464]/8 to-transparent'
                    : user.rank <= 3 ? 'glass border border-white/8 hover:border-white/15'
                    : 'glass border border-white/5 hover:border-white/10'
                  }`}
                >
                  {/* Rank */}
                  <div className="w-10 text-center flex-shrink-0">
                    {user.rank <= 3 ? (
                      <span className="text-2xl">{user.rank === 1 ? '🏆' : user.rank === 2 ? '🥈' : '🥉'}</span>
                    ) : (
                      <span className="font-syne font-bold text-lg text-white/40">#{user.rank}</span>
                    )}
                  </div>

                  {/* Avatar */}
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center text-xl flex-shrink-0 ${
                    user.rank === 1 ? 'bg-[#C7F464]/20 border-2 border-[#C7F464]/40' : 'bg-white/5 border border-white/10'
                  }`}>
                    {user.avatar}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-white text-sm">{user.name}</div>
                    <div className="text-white/30 text-xs">{user.challenge}</div>
                  </div>

                  {/* Streak */}
                  <div className="text-center hidden sm:block">
                    <div className="flex items-center gap-1 text-[#C7F464] text-sm font-semibold">
                      <Flame size={14} /> {user.streak}
                    </div>
                    <div className="text-white/30 text-xs">day streak</div>
                  </div>

                  {/* Points */}
                  <div className="text-right flex-shrink-0">
                    <div className="font-syne font-bold text-lg text-[#C7F464]">{user.points.toLocaleString()}</div>
                    <div className="text-white/30 text-xs">points</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-5 rounded-2xl glass border border-white/5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-lg">😤</div>
              <div className="flex-1">
                <div className="text-white/60 text-sm font-medium">Your ranking</div>
                <div className="text-white/30 text-xs">Join a challenge to appear on the leaderboard!</div>
              </div>
              <button
                onClick={() => setActiveTab('challenges')}
                className="px-4 py-2 rounded-xl bg-[#C7F464]/10 border border-[#C7F464]/30 text-[#C7F464] text-xs font-medium hover:bg-[#C7F464]/20 transition-all"
              >
                Join Now →
              </button>
            </div>
          </div>
        )}

        {/* Spotlight */}
        {activeTab === 'spotlight' && (
          <div>
            <div className="mb-8">
              <h2 className="font-syne font-bold text-3xl text-white mb-2">Member Spotlight</h2>
              <p className="text-white/40">Real transformations from real FITVERSE members. These people are not special — they just showed up.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {spotlights.map((s) => (
                <div key={s.name} className="rounded-2xl glass border border-white/8 overflow-hidden card-hover group">
                  {/* Image placeholder */}
                  <div className="h-48 bg-gradient-to-br from-[#C7F464]/10 to-[#A8D5BA]/5 flex items-center justify-center text-7xl">
                    {s.image}
                  </div>
                  <div className="p-6">
                    {/* Author */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-[#C7F464]/10 border border-[#C7F464]/20 flex items-center justify-center text-xl">
                        {s.avatar}
                      </div>
                      <div>
                        <div className="text-white font-semibold text-sm">{s.name}</div>
                        <div className="text-white/30 text-xs">{s.handle} · {s.followers} followers</div>
                      </div>
                    </div>

                    <p className="text-white/60 text-sm leading-relaxed mb-4">&ldquo;{s.achievement}&rdquo;</p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {[['Before', s.stats.before, 'white/30'], ['After', s.stats.after, '#C7F464'], ['Time', s.stats.duration, '#A8D5BA']].map(([label, val, color]) => (
                        <div key={label} className="text-center p-2 rounded-lg bg-white/3 border border-white/5">
                          <div className="text-xs font-medium mb-0.5" style={{ color: color.startsWith('#') ? color : undefined, opacity: color.startsWith('#') ? 1 : 0.5 }}>{val}</div>
                          <div className="text-white/20 text-[10px]">{label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4 text-white/30 text-sm">
                      <button className="flex items-center gap-1.5 hover:text-[#C7F464] transition-colors">
                        <Heart size={14} /> {s.likes}
                      </button>
                      <button className="flex items-center gap-1.5 hover:text-[#A8D5BA] transition-colors">
                        <MessageCircle size={14} /> {s.comments}
                      </button>
                      <button className="flex items-center gap-1.5 hover:text-white transition-colors ml-auto">
                        <Share2 size={14} /> Share
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Badges */}
        {activeTab === 'badges' && (
          <div>
            <div className="mb-8">
              <h2 className="font-syne font-bold text-3xl text-white mb-2">Achievement Badges</h2>
              <p className="text-white/40">Collect badges by completing workouts, challenges, and hitting milestones.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {badges.map((badge) => (
                <div
                  key={badge.name}
                  className={`p-6 rounded-2xl text-center transition-all duration-300 ${
                    badge.earned
                      ? 'glass border border-[#C7F464]/20 bg-gradient-to-b from-[#C7F464]/8 to-transparent'
                      : 'glass border border-white/5 opacity-40'
                  }`}
                >
                  <div className={`text-4xl mb-3 ${!badge.earned ? 'grayscale' : ''}`}>{badge.emoji}</div>
                  <div className={`font-syne font-bold text-sm mb-1 ${badge.earned ? 'text-white' : 'text-white/40'}`}>{badge.name}</div>
                  <div className="text-white/30 text-xs">{badge.description}</div>
                  {badge.earned && (
                    <div className="mt-3 inline-block px-2 py-0.5 rounded-full bg-[#C7F464]/20 text-[#C7F464] text-[10px] font-semibold">EARNED</div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-12 p-8 rounded-2xl glass border border-white/5 text-center">
              <div className="text-5xl mb-4">👑</div>
              <h3 className="font-syne font-bold text-2xl text-white mb-3">Become a FITVERSE Legend</h3>
              <p className="text-white/40 text-sm max-w-lg mx-auto mb-6">
                Complete all 8 badges and unlock the exclusive &quot;FITVERSE Legend&quot; status — plus a free Elite membership for 6 months.
              </p>
              <button
                onClick={() => setActiveTab('challenges')}
                className="px-6 py-3 rounded-full bg-[#C7F464] text-black font-semibold text-sm hover:bg-[#DEFF6E] hover:scale-105 transition-all"
              >
                Start a Challenge →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
