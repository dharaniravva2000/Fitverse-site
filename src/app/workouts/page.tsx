'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Filter, Play, Clock, Flame, Dumbbell, ChevronRight } from 'lucide-react';

const categories = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Fat Loss', 'Muscle Building', 'Cardio', 'Home Workout', 'Strength', 'Mobility'];

const workouts = [
  { id: 1, title: 'Full Body Blitz', category: 'Beginner', duration: '30 min', calories: 280, exercises: 6, description: 'Perfect first workout. Full body, minimal equipment, maximum results.', tags: ['Beginner', 'Home Workout'], imageId: '1534438327276-14e5300c3a48' },
  { id: 2, title: 'Upper Body Hypertrophy', category: 'Muscle Building', duration: '55 min', calories: 420, exercises: 8, description: 'Science-backed program for maximum muscle growth in chest, back, and arms.', tags: ['Intermediate', 'Muscle Building'], imageId: '1581009146145-b5ef050c2e1e' },
  { id: 3, title: 'HIIT Fat Burner', category: 'Fat Loss', duration: '25 min', calories: 380, exercises: 7, description: 'High-intensity intervals that keep your metabolism elevated for hours post-workout.', tags: ['Advanced', 'Fat Loss', 'Cardio'], imageId: '1549060279-7e168fcee0c2' },
  { id: 4, title: 'Leg Day Destroyer', category: 'Strength', duration: '60 min', calories: 500, exercises: 7, description: 'Squat, lunge, deadlift — your legs will never forgive you. Or thank you. Both.', tags: ['Intermediate', 'Strength'], imageId: '1571019613454-1cb2f99b2d8b' },
  { id: 5, title: 'Core & Mobility', category: 'Mobility', duration: '40 min', calories: 180, exercises: 9, description: 'Build a bulletproof core and unlock flexibility you never thought possible.', tags: ['Beginner', 'Mobility'], imageId: '1506126613408-eca07ce68773' },
  { id: 6, title: 'Push Pull Legs', category: 'Muscle Building', duration: '70 min', calories: 560, exercises: 12, description: 'The classic PPL split optimized for natural athletes. Three-day cycle, maximum efficiency.', tags: ['Advanced', 'Muscle Building'], imageId: '1517836357463-d25dfeac3438' },
  { id: 7, title: 'Zero Equipment Home', category: 'Home Workout', duration: '35 min', calories: 310, exercises: 8, description: 'No gym? No problem. Full body workout using nothing but your bodyweight.', tags: ['Beginner', 'Home Workout'], imageId: '1518611012118-696072aa579a' },
  { id: 8, title: 'Cardio Endurance', category: 'Cardio', duration: '45 min', calories: 450, exercises: 4, description: 'Structured run/walk intervals to build cardiovascular endurance from the ground up.', tags: ['Beginner', 'Cardio'], imageId: '1552674605-db6ffd4facb5' },
  { id: 9, title: 'Olympic Lifting Intro', category: 'Strength', duration: '75 min', calories: 480, exercises: 6, description: 'Learn the snatch and clean & jerk with a progressive loading protocol.', tags: ['Advanced', 'Strength'], imageId: '1517963879433-6ad2b056d712' },
  { id: 10, title: '5×5 Powerbuilding', category: 'Strength', duration: '65 min', calories: 520, exercises: 5, description: 'The best of both worlds: powerlifting strength with bodybuilding aesthetics.', tags: ['Intermediate', 'Strength', 'Muscle Building'], imageId: '1526506118085-60ce8714f8c5' },
  { id: 11, title: 'Yoga Flow for Athletes', category: 'Mobility', duration: '50 min', calories: 150, exercises: 15, description: 'Recover faster, move better, prevent injuries. Your rest day just levelled up.', tags: ['Beginner', 'Mobility'], imageId: '1599901860904-17e6ed7083a5' },
  { id: 12, title: 'Shred in 6 Weeks', category: 'Fat Loss', duration: '50 min', calories: 600, exercises: 10, description: 'The complete fat-loss program combining resistance training with metabolic finishers.', tags: ['Advanced', 'Fat Loss'], imageId: '1605296867304-46d5465a13f1' },
];

function WorkoutCard({ workout, index }: { workout: typeof workouts[0]; index: number }) {
  const [imgError, setImgError] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; } }, { threshold: 0.08 });
    observer.observe(el); return () => observer.disconnect();
  }, []);
  const diffLabel = workout.tags.find(t => ['Beginner', 'Intermediate', 'Advanced'].includes(t)) || 'All Levels';
  const diffClass = diffLabel === 'Beginner' ? 'badge-beginner-light' : diffLabel === 'Advanced' ? 'badge-advanced-light' : 'badge-intermediate-light';

  return (
    <div ref={ref} className="group rounded-3xl border border-[#568203]/15 bg-white hover:border-[#568203]/30 overflow-hidden card-hover shadow-sm" style={{ opacity: 0, transform: 'translateY(32px)', transition: `all 0.5s cubic-bezier(0.23,1,0.32,1) ${index * 50}ms` }}>
      <div className="relative h-52 overflow-hidden bg-[#568203]/5">
        {!imgError ? (
          <Image src={`https://images.unsplash.com/photo-${workout.imageId}?auto=format&q=75&w=600&h=320&fit=crop`} alt={workout.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" onError={() => setImgError(true)} />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[#568203]/8"><Dumbbell size={40} color="#568203" style={{ opacity: 0.3 }} /></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />
        <div className="absolute top-4 right-4"><span className={`text-[11px] px-2.5 py-1 rounded-full font-semibold ${diffClass}`}>{diffLabel}</span></div>
      </div>
      <div className="p-8">
        <h3 className="font-syne font-bold text-[1.1rem] text-[#3d5e02] mb-3 group-hover:text-[#568203] transition-colors duration-300 leading-snug">{workout.title}</h3>
        <p className="text-[#568203]/55 text-sm leading-[1.8] mb-7">{workout.description}</p>
        <div className="flex items-center gap-6 text-[13px] text-[#568203]/45 mb-7">
          <span className="flex items-center gap-1.5"><Clock size={12} color="#568203" />{workout.duration}</span>
          <span className="flex items-center gap-1.5"><Flame size={12} color="#568203" />{workout.calories} cal</span>
          <span className="flex items-center gap-1.5"><Dumbbell size={12} color="#568203" />{workout.exercises} exercises</span>
        </div>
        <div className="flex items-center justify-between pt-6 border-t border-[#568203]/8">
          <div className="flex gap-1.5">{workout.tags.slice(0, 2).map(tag => (<span key={tag} className="text-[11px] px-2.5 py-1 rounded-full bg-[#568203]/8 text-[#568203]/60 border border-[#568203]/12">{tag}</span>))}</div>
          <button className="flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold bg-[#568203] text-[#FFF8B9] hover:bg-[#3d5e02] transition-all duration-300 hover:scale-105">
            <Play size={11} fill="#FFF8B9" />Start
          </button>
        </div>
      </div>
    </div>
  );
}

export default function WorkoutsPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const filtered = workouts.filter(w => {
    const matchSearch = w.title.toLowerCase().includes(search.toLowerCase()) || w.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'All' || w.tags.includes(activeCategory) || w.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="min-h-screen bg-[#FFF8B9] pt-24">
      {/* Hero */}
      <div className="relative overflow-hidden py-36 bg-[#568203]">
        <div className="absolute inset-0"><Image src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&q=70&w=1800" alt="Gym" fill className="object-cover object-center opacity-15" /><div className="absolute inset-0 bg-gradient-to-b from-[#568203]/80 via-[#568203]/60 to-[#568203]" /></div>
        <div className="max-w-4xl mx-auto px-10 relative z-10 text-center">
          <span className="text-[#F0E878] text-xs font-semibold tracking-[0.25em] uppercase mb-7 block">500+ Programs</span>
          <h1 className="font-syne font-bold text-[#FFF8B9] leading-tight mb-8" style={{ fontSize: 'clamp(3rem, 6.5vw, 6rem)' }}>Find Your<br /><span className="text-gradient">Perfect Workout</span></h1>
          <p className="text-[#FFF8B9]/55 text-xl max-w-2xl mx-auto leading-[1.75]">Expert-designed programs for every level, goal, and lifestyle. No guesswork — just results.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-10 py-24">
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#568203]/40" />
            <input type="text" placeholder="Search workouts..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-11 pr-4 py-4 rounded-2xl border border-[#568203]/18 bg-white text-[#3d5e02] placeholder-[#568203]/35 text-sm focus:outline-none focus:border-[#568203]/40 transition-colors" />
          </div>
          <button className="flex items-center gap-2 px-6 py-4 rounded-2xl border border-[#568203]/18 bg-white text-[#568203]/60 text-sm hover:border-[#568203]/35 hover:text-[#568203] transition-all"><Filter size={15} />Filters</button>
        </div>

        <div className="flex gap-2.5 overflow-x-auto hide-scrollbar pb-1 mb-12">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === cat ? 'bg-[#568203] text-[#FFF8B9]' : 'border border-[#568203]/18 bg-white text-[#568203]/60 hover:border-[#568203]/35 hover:text-[#568203]'}`}>{cat}</button>
          ))}
        </div>

        <p className="text-[#568203]/45 text-sm mb-10">Showing <span className="text-[#568203] font-medium">{filtered.length}</span> workout{filtered.length !== 1 ? 's' : ''}</p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{filtered.map((w, i) => <WorkoutCard key={w.id} workout={w} index={i} />)}</div>
        ) : (
          <div className="text-center py-36">
            <div className="w-20 h-20 rounded-3xl border border-[#568203]/15 bg-white flex items-center justify-center mx-auto mb-8"><Dumbbell size={32} color="#568203" style={{ opacity: 0.3 }} /></div>
            <h3 className="font-syne font-bold text-2xl text-[#3d5e02] mb-3">No workouts found</h3>
            <p className="text-[#568203]/50 mb-10">Try a different search term or category</p>
            <button onClick={() => { setSearch(''); setActiveCategory('All'); }} className="px-7 py-3.5 rounded-full border border-[#568203]/25 bg-white text-[#568203] text-sm font-medium hover:bg-[#568203]/5 transition-all">Reset filters</button>
          </div>
        )}

        <div className="mt-28 relative overflow-hidden p-12 md:p-16 rounded-3xl bg-[#568203]">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#FFF8B9]/8 blur-[60px] pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
            <div className="max-w-xl">
              <h3 className="font-syne font-bold text-[#FFF8B9] mb-4" style={{ fontSize: '2rem' }}>Want a personalised training plan?</h3>
              <p className="text-[#FFF8B9]/55 text-base leading-[1.8]">Let our AI coach build a custom weekly schedule based on your goals, experience level, and available equipment.</p>
            </div>
            <Link href="/ai-coach" className="flex-shrink-0 flex items-center gap-2 px-9 py-4 rounded-full bg-[#FFF8B9] text-[#568203] font-bold hover:bg-[#F0E878] hover:scale-105 transition-all duration-300 whitespace-nowrap">Build My Plan <ChevronRight size={18} /></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
