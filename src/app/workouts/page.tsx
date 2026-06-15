'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, Filter, Play, Clock, Flame, ChevronRight, Dumbbell } from 'lucide-react';

const categories = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Fat Loss', 'Muscle Building', 'Cardio', 'Home Workout', 'Strength', 'Mobility'];

const workouts = [
  {
    id: 1, title: 'Full Body Blitz', category: 'Beginner', duration: '30 min', calories: 280,
    exercises: 6, emoji: '💪', description: 'Perfect first workout. Full body, minimal equipment, maximum results.',
    tags: ['Beginner', 'Home Workout'], color: '#A8D5BA',
  },
  {
    id: 2, title: 'Upper Body Hypertrophy', category: 'Muscle Building', duration: '55 min', calories: 420,
    exercises: 8, emoji: '🏋️', description: 'Science-backed program for maximum muscle growth in chest, back, and arms.',
    tags: ['Intermediate', 'Muscle Building'], color: '#C7F464',
  },
  {
    id: 3, title: 'HIIT Fat Burner', category: 'Fat Loss', duration: '25 min', calories: 380,
    exercises: 7, emoji: '🔥', description: 'High-intensity intervals that keep your metabolism elevated for hours post-workout.',
    tags: ['Advanced', 'Fat Loss', 'Cardio'], color: '#C7F464',
  },
  {
    id: 4, title: 'Leg Day Destroyer', category: 'Strength', duration: '60 min', calories: 500,
    exercises: 7, emoji: '🦵', description: 'Squat, lunge, deadlift — your legs will never forgive you. Or thank you. Both.',
    tags: ['Intermediate', 'Strength'], color: '#A8D5BA',
  },
  {
    id: 5, title: 'Core & Mobility', category: 'Mobility', duration: '40 min', calories: 180,
    exercises: 9, emoji: '🧘', description: 'Build a bulletproof core and unlock flexibility you never thought possible.',
    tags: ['Beginner', 'Mobility'], color: '#A8D5BA',
  },
  {
    id: 6, title: 'Push Pull Legs Split', category: 'Muscle Building', duration: '70 min', calories: 560,
    exercises: 12, emoji: '⚡', description: 'The classic PPL split optimized for natural athletes. 3-day cycle, maximum efficiency.',
    tags: ['Advanced', 'Muscle Building'], color: '#C7F464',
  },
  {
    id: 7, title: 'Zero Equipment Home', category: 'Home Workout', duration: '35 min', calories: 310,
    exercises: 8, emoji: '🏠', description: 'No gym? No problem. Full body workout using nothing but your bodyweight.',
    tags: ['Beginner', 'Home Workout'], color: '#A8D5BA',
  },
  {
    id: 8, title: 'Cardio Endurance Run', category: 'Cardio', duration: '45 min', calories: 450,
    exercises: 4, emoji: '🏃', description: 'Structured run/walk intervals to build cardiovascular endurance from the ground up.',
    tags: ['Beginner', 'Cardio'], color: '#C7F464',
  },
  {
    id: 9, title: 'Olympic Lifting Intro', category: 'Strength', duration: '75 min', calories: 480,
    exercises: 6, emoji: '🥇', description: 'Learn the snatch and clean & jerk with a progressive loading protocol.',
    tags: ['Advanced', 'Strength'], color: '#A8D5BA',
  },
  {
    id: 10, title: '5×5 Powerbuilding', category: 'Strength', duration: '65 min', calories: 520,
    exercises: 5, emoji: '💥', description: 'The best of both worlds: powerlifting strength with bodybuilding aesthetics.',
    tags: ['Intermediate', 'Strength', 'Muscle Building'], color: '#C7F464',
  },
  {
    id: 11, title: 'Yoga Flow for Athletes', category: 'Mobility', duration: '50 min', calories: 150,
    exercises: 15, emoji: '🌿', description: 'Recover faster, move better, prevent injuries. Your rest day just leveled up.',
    tags: ['Beginner', 'Mobility'], color: '#A8D5BA',
  },
  {
    id: 12, title: 'Shred in 6 Weeks', category: 'Fat Loss', duration: '50 min', calories: 600,
    exercises: 10, emoji: '🗡️', description: 'The complete fat loss program. Combines resistance training with metabolic finishers.',
    tags: ['Advanced', 'Fat Loss'], color: '#C7F464',
  },
];

const muscleMap: Record<string, string[]> = {
  'Full Body Blitz': ['chest', 'back', 'legs', 'core'],
  'Upper Body Hypertrophy': ['chest', 'back', 'biceps', 'triceps', 'shoulders'],
  'HIIT Fat Burner': ['full body'],
  'Leg Day Destroyer': ['quads', 'hamstrings', 'glutes', 'calves'],
  'Core & Mobility': ['core', 'hip flexors', 'spine'],
  'Push Pull Legs Split': ['chest', 'back', 'legs', 'shoulders', 'arms'],
};

function WorkoutCard({ workout, index }: { workout: typeof workouts[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const difficultyLabel = workout.tags.find(t => ['Beginner','Intermediate','Advanced'].includes(t)) || 'All Levels';
  const diffClass = difficultyLabel === 'Beginner' ? 'badge-beginner' : difficultyLabel === 'Advanced' ? 'badge-advanced' : 'badge-intermediate';

  return (
    <div
      ref={ref}
      className="group rounded-2xl glass border border-white/5 hover:border-white/10 overflow-hidden card-hover"
      style={{ opacity: 0, transform: 'translateY(40px)', transition: `all 0.5s ease ${index * 60}ms` }}
    >
      {/* Card top */}
      <div
        className="relative p-6 pb-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        {/* Gradient accent */}
        <div
          className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 blur-3xl"
          style={{ background: workout.color }}
        />

        <div className="flex items-start justify-between mb-4 relative">
          <div className="text-4xl">{workout.emoji}</div>
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${diffClass}`}>{difficultyLabel}</span>
        </div>

        <h3 className="font-syne font-bold text-xl text-white mb-2 group-hover:text-[#C7F464] transition-colors">
          {workout.title}
        </h3>
        <p className="text-white/40 text-sm leading-relaxed mb-4">{workout.description}</p>

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-white/40">
          <span className="flex items-center gap-1.5">
            <Clock size={13} style={{ color: workout.color }} />
            {workout.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <Flame size={13} style={{ color: workout.color }} />
            {workout.calories} cal
          </span>
          <span className="flex items-center gap-1.5">
            <Dumbbell size={13} style={{ color: workout.color }} />
            {workout.exercises} exercises
          </span>
        </div>
      </div>

      {/* Expanded */}
      <div
        className={`overflow-hidden transition-all duration-500 ${expanded ? 'max-h-48' : 'max-h-0'}`}
      >
        <div className="px-6 pb-4 border-t border-white/5 pt-4">
          <div className="flex flex-wrap gap-2 mb-3">
            {(muscleMap[workout.title] || workout.tags).map(m => (
              <span key={m} className="text-xs px-2 py-1 rounded-full glass border border-white/8 text-white/50 capitalize">{m}</span>
            ))}
          </div>
          <p className="text-white/30 text-xs">Tap &quot;Start&quot; to begin your AI-guided session</p>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between">
        <div className="flex gap-1.5 flex-wrap">
          {workout.tags.slice(0, 2).map(tag => (
            <span key={tag} className="text-[11px] px-2 py-0.5 rounded-full bg-white/5 text-white/30">{tag}</span>
          ))}
        </div>
        <button
          className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 hover:scale-105"
          style={{ background: `${workout.color}20`, border: `1px solid ${workout.color}40`, color: workout.color }}
        >
          <Play size={12} fill={workout.color} />
          Start
        </button>
      </div>
    </div>
  );
}

export default function WorkoutsPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = workouts.filter(w => {
    const matchSearch = w.title.toLowerCase().includes(search.toLowerCase()) ||
      w.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'All' || w.tags.includes(activeCategory) || w.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24">
      {/* Hero */}
      <div className="relative overflow-hidden py-20 border-b border-white/5">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[#C7F464]/6 blur-[80px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <span className="text-[#C7F464] text-sm font-semibold tracking-widest uppercase mb-4 block">500+ Programs</span>
          <h1 className="font-syne font-bold text-[clamp(3rem,7vw,6rem)] text-white leading-tight mb-6">
            Find Your
            <br />
            <span className="text-gradient">Perfect Workout</span>
          </h1>
          <p className="text-white/40 text-xl max-w-2xl mx-auto">
            Expert-designed programs for every level, goal, and lifestyle. No guesswork — just results.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              placeholder="Search workouts..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl glass border border-white/8 bg-transparent text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#C7F464]/40 transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 px-5 py-3.5 rounded-xl glass border border-white/8 text-white/60 text-sm hover:border-white/20 transition-colors">
            <Filter size={16} />
            Filters
          </button>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-[#C7F464] text-black scale-105'
                  : 'glass border border-white/8 text-white/60 hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-white/40 text-sm">
            Showing <span className="text-white">{filtered.length}</span> workout{filtered.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((w, i) => (
              <WorkoutCard key={w.id} workout={w} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🏋️</div>
            <h3 className="font-syne font-bold text-2xl text-white mb-2">No workouts found</h3>
            <p className="text-white/40">Try a different search or category</p>
            <button
              onClick={() => { setSearch(''); setActiveCategory('All'); }}
              className="mt-6 px-6 py-3 rounded-full bg-[#C7F464]/10 border border-[#C7F464]/30 text-[#C7F464] text-sm font-medium hover:bg-[#C7F464]/20 transition-all"
            >
              Reset filters
            </button>
          </div>
        )}

        {/* Weekly Plan Banner */}
        <div className="mt-20 p-8 md:p-12 rounded-2xl glass border border-[#C7F464]/20 bg-gradient-to-r from-[#C7F464]/8 to-[#A8D5BA]/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-syne font-bold text-3xl text-white mb-3">
              Want a personalised plan?
            </h3>
            <p className="text-white/50 text-base max-w-md">
              Let our AI coach build a custom weekly training schedule based on your goals, experience level, and available equipment.
            </p>
          </div>
          <a
            href="/ai-coach"
            className="flex-shrink-0 flex items-center gap-2 px-8 py-4 rounded-full bg-[#C7F464] text-black font-bold hover:bg-[#DEFF6E] hover:scale-105 transition-all duration-300 whitespace-nowrap"
          >
            Build My Plan <ChevronRight size={18} />
          </a>
        </div>
      </div>
    </div>
  );
}
