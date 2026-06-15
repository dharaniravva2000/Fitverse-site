'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Users, Timer, Flame, Heart, Share2, MessageCircle, Star, ChevronRight, Crown, Footprints, Target, Zap, Leaf } from 'lucide-react';

const challenges = [
  { id: 1, icon: Flame, title: '30-Day Transformation', description: 'Complete body overhaul. Daily workouts, nutrition plans, and weekly check-ins with the community.', participants: 12847, duration: '30 days', difficulty: 'Intermediate', daysLeft: 14, prize: 'Featured Athlete + 3 months Elite free' },
  { id: 2, icon: Target, title: '100 Push-Ups Challenge', description: 'Work your way up to 100 consecutive push-ups using our progressive overload protocol.', participants: 8934, duration: '60 days', difficulty: 'Beginner', daysLeft: 45, prize: 'Strength Warrior Badge' },
  { id: 3, icon: Footprints, title: '10K Steps Daily', description: "Hit 10,000 steps every single day for 30 days. Simple. Effective. Life-changing.", participants: 15620, duration: '30 days', difficulty: 'Beginner', daysLeft: 22, prize: 'Active Lifestyle Badge' },
  { id: 4, icon: Zap, title: 'Fat Loss Accelerator', description: 'Combine HIIT training with a precision nutrition protocol for maximum fat loss in 45 days.', participants: 9211, duration: '45 days', difficulty: 'Advanced', daysLeft: 8, prize: 'Body Recomposition Trophy' },
  { id: 5, icon: Leaf, title: 'Clean Eating Month', description: 'No processed food, no alcohol, no excuses. 30 days of whole foods and real results.', participants: 6789, duration: '30 days', difficulty: 'Intermediate', daysLeft: 19, prize: 'Nutrition Champion Badge' },
  { id: 6, icon: Target, title: 'Flexibility in 30 Days', description: 'Daily mobility routines that unlock flexibility most people thought impossible.', participants: 4523, duration: '30 days', difficulty: 'Beginner', daysLeft: 27, prize: 'Flexibility Master Badge' },
];

const leaderboard = [
  { rank: 1, name: 'Marcus J.', initials: 'MJ', imageId: '1507003211169-0a1dd7228f2d', points: 4820, streak: 47, challenge: '30-Day Transform' },
  { rank: 2, name: 'Priya S.', initials: 'PS', imageId: '1494790108377-be9c29b29330', points: 4650, streak: 42, challenge: 'Fat Loss Accel.' },
  { rank: 3, name: 'Jake T.', initials: 'JT', imageId: '1472099645785-5658abf4ff4e', points: 4390, streak: 38, challenge: '10K Steps' },
  { rank: 4, name: 'Aisha M.', initials: 'AM', imageId: '1438761681033-6461ffad8d80', points: 3940, streak: 31, challenge: '30-Day Transform' },
  { rank: 5, name: 'Ryan K.', initials: 'RK', imageId: '1500648767791-00dcc994a43e', points: 3720, streak: 28, challenge: 'Push-Ups' },
  { rank: 6, name: 'Sofia L.', initials: 'SL', imageId: '1544005313-94ddf0286df2', points: 3580, streak: 25, challenge: 'Clean Eating' },
  { rank: 7, name: 'David R.', initials: 'DR', imageId: '1464863979621-258859e62245', points: 3320, streak: 22, challenge: '10K Steps' },
  { rank: 8, name: 'Nina P.', initials: 'NP', imageId: '1488426862026-3ee34a7d66df', points: 3100, streak: 19, challenge: 'Flexibility' },
];

const spotlights = [
  { name: 'Marcus Johnson', handle: '@marcusfits', initials: 'MJ', avatarId: '1507003211169-0a1dd7228f2d', coverId: '1534438327276-14e5300c3a48', achievement: 'Lost 28 lbs in 4 months — completely transformed his lifestyle and confidence.', likes: 847, comments: 134, shares: 92, stats: { before: '220 lbs', after: '192 lbs', duration: '16 weeks' } },
  { name: 'Priya Sharma', handle: '@priyastrength', initials: 'PS', avatarId: '1494790108377-be9c29b29330', coverId: '1581009146145-b5ef050c2e1e', achievement: 'Went from never lifting to competing in her first powerlifting meet!', likes: 623, comments: 89, shares: 71, stats: { before: 'Never trained', after: '1st place meet', duration: '8 months' } },
  { name: 'Jake Torres', handle: '@jakeruns', initials: 'JT', avatarId: '1472099645785-5658abf4ff4e', coverId: '1552674605-db6ffd4facb5', achievement: 'Couch potato to marathon finisher in just 6 months. An absolute inspiration.', likes: 1203, comments: 198, shares: 145, stats: { before: '0 km runs', after: '42.2 km', duration: '6 months' } },
];

const badges = [
  { name: 'Iron Will', icon: '⚡', description: '30 consecutive days', earned: true },
  { name: 'First Blood', icon: '🎯', description: 'First workout completed', earned: true },
  { name: 'Community Star', icon: '⭐', description: '100 community interactions', earned: true },
  { name: 'Nutrition Ninja', icon: '🥗', description: 'Logged meals for 14 days', earned: false },
  { name: 'Marathon Mind', icon: '🏃', description: 'Run 100km total', earned: false },
  { name: 'Century Club', icon: '💯', description: '100 workouts completed', earned: false },
  { name: 'Challenge Beast', icon: '🔥', description: 'Won 3 challenges', earned: false },
  { name: 'FITVERSE Elite', icon: '👑', description: 'Top 1% of community', earned: false },
];

function SmallAvatar({ imageId, initials }: { imageId: string; initials: string }) {
  const [err, setErr] = useState(false);
  if (err) return <div className="w-11 h-11 rounded-full bg-[#568203]/12 border border-[#568203]/20 flex items-center justify-center flex-shrink-0"><span className="font-syne font-bold text-xs text-[#568203]">{initials}</span></div>;
  return <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0 border border-[#568203]/15"><Image src={`https://images.unsplash.com/photo-${imageId}?auto=format&q=80&w=88&h=88&fit=crop&crop=face`} alt={initials} width={44} height={44} className="object-cover w-full h-full" onError={() => setErr(true)} /></div>;
}

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<'challenges' | 'leaderboard' | 'spotlight' | 'badges'>('challenges');
  const [joined, setJoined] = useState<number[]>([]);
  const toggleJoin = (id: number) => setJoined(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  const diffClass = (d: string) => d === 'Beginner' ? 'badge-beginner-light' : d === 'Advanced' ? 'badge-advanced-light' : 'badge-intermediate-light';

  return (
    <div className="min-h-screen bg-[#FFF8B9] pt-24">
      {/* Hero */}
      <div className="relative overflow-hidden py-36 bg-[#568203]">
        <div className="absolute inset-0"><Image src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&q=70&w=1800" alt="Community" fill className="object-cover object-center opacity-12" /><div className="absolute inset-0 bg-gradient-to-b from-[#568203]/90 via-[#568203]/70 to-[#568203]" /></div>
        <div className="max-w-4xl mx-auto px-10 relative z-10 text-center">
          <span className="text-[#F0E878] text-xs font-semibold tracking-[0.25em] uppercase mb-7 block">Community Hub</span>
          <h1 className="font-syne font-bold text-[#FFF8B9] leading-tight mb-8" style={{ fontSize: 'clamp(3rem, 6.5vw, 6rem)' }}>Train Together.<br /><span className="text-gradient">Win Together.</span></h1>
          <p className="text-[#FFF8B9]/55 text-xl max-w-2xl mx-auto leading-[1.75] mb-14">Join 50,000+ athletes. Compete in challenges, celebrate wins, and find accountability that actually makes the difference.</p>
          <div className="flex flex-wrap justify-center gap-12">
            {[['50K+', 'Members'], ['200+', 'Challenges run'], ['4.8M', 'Workouts logged'], ['99%', 'Love the community']].map(([val, label]) => (
              <div key={label}><div className="font-syne font-bold text-[#F0E878] text-2xl mb-1">{val}</div><div className="text-[#FFF8B9]/40 text-sm">{label}</div></div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-10 py-24">
        {/* Tabs */}
        <div className="flex gap-2.5 mb-16 overflow-x-auto hide-scrollbar pb-1">
          {[{ id: 'challenges', label: 'Challenges' }, { id: 'leaderboard', label: 'Leaderboard' }, { id: 'spotlight', label: 'Member Spotlight' }, { id: 'badges', label: 'Badges' }].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as typeof activeTab)} className={`flex-shrink-0 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === tab.id ? 'bg-[#568203] text-[#FFF8B9]' : 'border border-[#568203]/18 bg-white text-[#568203]/60 hover:border-[#568203]/35 hover:text-[#568203]'}`}>{tab.label}</button>
          ))}
        </div>

        {/* Challenges */}
        {activeTab === 'challenges' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {challenges.map((c) => {
              const Icon = c.icon; const isJoined = joined.includes(c.id);
              const progress = Math.round(((parseInt(c.duration) - c.daysLeft) / parseInt(c.duration)) * 100);
              return (
                <div key={c.id} className="rounded-3xl bg-white border border-[#568203]/12 overflow-hidden card-hover shadow-sm">
                  <div className="p-10">
                    <div className="flex items-start gap-5 mb-7">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 bg-[#568203]/10 border border-[#568203]/18"><Icon size={22} color="#568203" strokeWidth={1.75} /></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <h3 className="font-syne font-bold text-[#3d5e02] text-base leading-tight">{c.title}</h3>
                          <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-semibold ${diffClass(c.difficulty)}`}>{c.difficulty}</span>
                        </div>
                        <p className="text-[#568203]/55 text-sm leading-[1.8]">{c.description}</p>
                      </div>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#568203]/5 border border-[#568203]/10 text-xs text-[#568203]/50 mb-7">Prize: <span className="text-[#3d5e02] font-medium">{c.prize}</span></div>
                    <div className="flex items-center gap-6 text-sm text-[#568203]/45 mb-7">
                      <span className="flex items-center gap-1.5"><Users size={13} color="#568203" />{c.participants.toLocaleString()} joined</span>
                      <span className="flex items-center gap-1.5"><Timer size={13} color="#568203" />{c.daysLeft}d left</span>
                    </div>
                    <div className="mb-8">
                      <div className="flex justify-between text-[11px] text-[#568203]/35 mb-2"><span>Progress</span><span>{progress}%</span></div>
                      <div className="h-1.5 rounded-full bg-[#568203]/10"><div className="h-full rounded-full bg-[#568203] transition-all" style={{ width: `${progress}%` }} /></div>
                    </div>
                    <button onClick={() => toggleJoin(c.id)} className={`w-full py-3.5 rounded-2xl text-sm font-semibold transition-all duration-300 ${isJoined ? 'border border-[#568203]/15 bg-[#568203]/5 text-[#568203]/50' : 'bg-[#568203] text-[#FFF8B9] hover:bg-[#3d5e02] hover:scale-[1.02]'}`}>
                      {isJoined ? '✓ Joined — you got this' : 'Join Challenge →'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Leaderboard */}
        {activeTab === 'leaderboard' && (
          <div className="max-w-3xl">
            <div className="mb-14"><h2 className="font-syne font-bold text-3xl text-[#3d5e02] mb-3">Global Leaderboard</h2><p className="text-[#568203]/55 leading-[1.8]">Top athletes by points earned across all challenges this month.</p></div>
            <div className="space-y-3">
              {leaderboard.map((user) => (
                <div key={user.rank} className={`flex items-center gap-5 p-6 rounded-3xl transition-all duration-300 ${user.rank === 1 ? 'border border-[#568203]/30 bg-[#568203]/8' : 'border border-[#568203]/10 bg-white hover:bg-[#568203]/4'}`}>
                  <div className="w-8 text-center flex-shrink-0">
                    {user.rank <= 3 ? <Crown size={18} style={{ color: user.rank === 1 ? '#568203' : user.rank === 2 ? '#888' : '#b07a3a', margin: '0 auto' }} /> : <span className="font-syne font-bold text-base text-[#568203]/30">#{user.rank}</span>}
                  </div>
                  <SmallAvatar imageId={user.imageId} initials={user.initials} />
                  <div className="flex-1 min-w-0"><div className="font-semibold text-[#3d5e02] text-sm">{user.name}</div><div className="text-[#568203]/40 text-xs mt-1">{user.challenge}</div></div>
                  <div className="text-center hidden sm:block"><div className="flex items-center gap-1 text-sm font-semibold text-[#568203]"><Flame size={13} />{user.streak}</div><div className="text-[#568203]/30 text-[11px] mt-0.5">day streak</div></div>
                  <div className="text-right flex-shrink-0"><div className="font-syne font-bold text-lg text-[#568203]">{user.points.toLocaleString()}</div><div className="text-[#568203]/30 text-[11px] mt-0.5">pts</div></div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-6 rounded-3xl border border-[#568203]/12 bg-white flex items-center gap-5">
              <div className="w-11 h-11 rounded-full bg-[#568203]/8 border border-[#568203]/12 flex items-center justify-center flex-shrink-0"><Star size={16} color="rgba(86,130,3,0.3)" /></div>
              <div className="flex-1"><div className="text-[#3d5e02] text-sm font-medium">Your ranking</div><div className="text-[#568203]/40 text-xs mt-1">Join a challenge to appear on the leaderboard</div></div>
              <button onClick={() => setActiveTab('challenges')} className="px-5 py-2.5 rounded-2xl bg-[#568203]/10 border border-[#568203]/20 text-[#568203] text-xs font-medium hover:bg-[#568203]/18 transition-all flex-shrink-0">Join Now</button>
            </div>
          </div>
        )}

        {/* Spotlight */}
        {activeTab === 'spotlight' && (
          <div>
            <div className="mb-14"><h2 className="font-syne font-bold text-3xl text-[#3d5e02] mb-3">Member Spotlight</h2><p className="text-[#568203]/55 leading-[1.8]">Real transformations from real FITVERSE members. These people just showed up.</p></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {spotlights.map((s) => {
                const [coverErr, setCoverErr] = useState(false);
                const [avatarErr, setAvatarErr] = useState(false);
                return (
                  <div key={s.name} className="rounded-3xl border border-[#568203]/12 bg-white overflow-hidden card-hover group shadow-sm">
                    <div className="relative h-52 bg-[#568203]/5 overflow-hidden">
                      {!coverErr ? <Image src={`https://images.unsplash.com/photo-${s.coverId}?auto=format&q=75&w=600&h=400&fit=crop`} alt={s.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" onError={() => setCoverErr(true)} /> : <div className="absolute inset-0 bg-gradient-to-br from-[#568203]/15 to-[#3d5e02]/8" />}
                      <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent" />
                    </div>
                    <div className="p-8">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-11 h-11 rounded-full overflow-hidden border border-[#568203]/15 flex-shrink-0">
                          {!avatarErr ? <Image src={`https://images.unsplash.com/photo-${s.avatarId}?auto=format&q=80&w=80&h=80&fit=crop&crop=face`} alt={s.name} width={44} height={44} className="object-cover w-full h-full" onError={() => setAvatarErr(true)} /> : <div className="w-full h-full bg-[#568203]/12 flex items-center justify-center"><span className="font-syne font-bold text-xs text-[#568203]">{s.initials}</span></div>}
                        </div>
                        <div><div className="text-[#3d5e02] font-semibold text-sm">{s.name}</div><div className="text-[#568203]/40 text-xs mt-1">{s.handle}</div></div>
                      </div>
                      <p className="text-[#568203]/60 text-sm leading-[1.8] mb-7">&ldquo;{s.achievement}&rdquo;</p>
                      <div className="grid grid-cols-3 gap-3 mb-7 pt-5 border-t border-[#568203]/8">
                        {[['Before', s.stats.before, false], ['After', s.stats.after, true], ['Time', s.stats.duration, false]].map(([label, val, highlight]) => (
                          <div key={label as string} className="text-center"><div className={`text-xs font-semibold mb-1 ${highlight ? 'text-[#568203]' : 'text-[#3d5e02]/55'}`}>{val as string}</div><div className="text-[#568203]/30 text-[10px] uppercase tracking-wide">{label as string}</div></div>
                        ))}
                      </div>
                      <div className="flex items-center gap-5 text-[#568203]/35 text-sm">
                        <button className="flex items-center gap-1.5 hover:text-[#568203] transition-colors"><Heart size={13} />{s.likes}</button>
                        <button className="flex items-center gap-1.5 hover:text-[#568203] transition-colors"><MessageCircle size={13} />{s.comments}</button>
                        <button className="flex items-center gap-1.5 hover:text-[#568203] transition-colors ml-auto"><Share2 size={13} />Share</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Badges */}
        {activeTab === 'badges' && (
          <div>
            <div className="mb-14"><h2 className="font-syne font-bold text-3xl text-[#3d5e02] mb-3">Achievement Badges</h2><p className="text-[#568203]/55 leading-[1.8]">Collect badges by completing workouts, challenges, and milestones.</p></div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {badges.map((badge) => (
                <div key={badge.name} className={`p-8 rounded-3xl text-center transition-all duration-300 ${badge.earned ? 'border border-[#568203]/20 bg-white shadow-sm' : 'border border-[#568203]/8 bg-white/50 opacity-40'}`}>
                  <div className={`text-3xl mb-4 ${!badge.earned ? 'grayscale opacity-50' : ''}`}>{badge.icon}</div>
                  <div className={`font-syne font-bold text-sm mb-2 ${badge.earned ? 'text-[#3d5e02]' : 'text-[#568203]/40'}`}>{badge.name}</div>
                  <div className="text-[#568203]/40 text-xs leading-relaxed">{badge.description}</div>
                  {badge.earned && <div className="mt-4 inline-block px-2.5 py-0.5 rounded-full bg-[#568203]/12 text-[#568203] text-[10px] font-bold tracking-wide">EARNED</div>}
                </div>
              ))}
            </div>
            <div className="mt-14 p-12 rounded-3xl border border-[#568203]/15 bg-white text-center shadow-sm">
              <Crown size={32} className="mx-auto mb-6" color="rgba(86,130,3,0.5)" />
              <h3 className="font-syne font-bold text-2xl text-[#3d5e02] mb-4">Become a FITVERSE Legend</h3>
              <p className="text-[#568203]/55 text-sm max-w-md mx-auto mb-10 leading-[1.8]">Complete all 8 badges and unlock the exclusive &ldquo;FITVERSE Legend&rdquo; status — plus a free Elite membership for 6 months.</p>
              <button onClick={() => setActiveTab('challenges')} className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#568203] text-[#FFF8B9] font-semibold text-sm hover:bg-[#3d5e02] hover:scale-105 transition-all">Start a Challenge <ChevronRight size={16} /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
