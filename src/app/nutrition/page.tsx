'use client';

import { useState } from 'react';
import { Calculator, Droplets, Utensils, Leaf, Target, ChevronDown, ChevronUp } from 'lucide-react';

/* ─── BMI Calculator ─── */
function BMICalculator() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const bmi = height && weight ? (parseFloat(weight) / ((parseFloat(height) / 100) ** 2)).toFixed(1) : null;
  const getCategory = (b: number) =>
    b < 18.5 ? { label: 'Underweight', color: '#A8D5BA' }
    : b < 25 ? { label: 'Healthy', color: '#C7F464' }
    : b < 30 ? { label: 'Overweight', color: '#ffb347' }
    : { label: 'Obese', color: '#ff6464' };

  return (
    <div className="p-6 rounded-2xl glass border border-white/8">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-[#C7F464]/15 border border-[#C7F464]/30 flex items-center justify-center">
          <Calculator size={18} color="#C7F464" />
        </div>
        <div>
          <h3 className="font-syne font-bold text-white">BMI Calculator</h3>
          <p className="text-white/40 text-xs">Body Mass Index</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="text-white/40 text-xs mb-1 block">Height (cm)</label>
          <input
            type="number" placeholder="175" value={height} onChange={e => setHeight(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/8 text-white text-sm focus:outline-none focus:border-[#C7F464]/40 transition-colors"
          />
        </div>
        <div>
          <label className="text-white/40 text-xs mb-1 block">Weight (kg)</label>
          <input
            type="number" placeholder="70" value={weight} onChange={e => setWeight(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/8 text-white text-sm focus:outline-none focus:border-[#C7F464]/40 transition-colors"
          />
        </div>
      </div>
      {bmi && (
        <div className="p-4 rounded-xl bg-white/3 border border-white/5 text-center">
          <div className="font-syne font-bold text-4xl mb-1" style={{ color: getCategory(parseFloat(bmi)).color }}>{bmi}</div>
          <div className="text-sm font-medium" style={{ color: getCategory(parseFloat(bmi)).color }}>{getCategory(parseFloat(bmi)).label}</div>
        </div>
      )}
    </div>
  );
}

/* ─── Calorie Calculator ─── */
function CalorieCalculator() {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male'|'female'>('male');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activity, setActivity] = useState('1.375');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const a = parseFloat(age), h = parseFloat(height), w = parseFloat(weight), act = parseFloat(activity);
    if (!a || !h || !w) return;
    const bmr = gender === 'male'
      ? 88.36 + 13.4 * w + 4.8 * h - 5.7 * a
      : 447.6 + 9.2 * w + 3.1 * h - 4.3 * a;
    setResult(Math.round(bmr * act));
  };

  return (
    <div className="p-6 rounded-2xl glass border border-white/8">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-[#A8D5BA]/15 border border-[#A8D5BA]/30 flex items-center justify-center">
          <Target size={18} color="#A8D5BA" />
        </div>
        <div>
          <h3 className="font-syne font-bold text-white">Calorie Calculator</h3>
          <p className="text-white/40 text-xs">Daily energy needs (TDEE)</p>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex gap-3">
          {(['male', 'female'] as const).map(g => (
            <button key={g} onClick={() => setGender(g)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${gender === g ? 'bg-[#C7F464]/20 border border-[#C7F464]/40 text-[#C7F464]' : 'bg-white/5 border border-white/8 text-white/40'}`}>
              {g === 'male' ? '♂ Male' : '♀ Female'}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[['Age', age, setAge, '25'], ['Height cm', height, setHeight, '175'], ['Weight kg', weight, setWeight, '70']].map(([label, val, setter, ph]) => (
            <div key={label as string}>
              <label className="text-white/40 text-xs mb-1 block">{label as string}</label>
              <input type="number" placeholder={ph as string} value={val as string}
                onChange={e => (setter as (v: string) => void)(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/8 text-white text-sm focus:outline-none focus:border-[#C7F464]/40 transition-colors"
              />
            </div>
          ))}
        </div>
        <div>
          <label className="text-white/40 text-xs mb-1 block">Activity Level</label>
          <select value={activity} onChange={e => setActivity(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/8 text-white text-sm focus:outline-none focus:border-[#C7F464]/40 appearance-none cursor-pointer">
            <option value="1.2">Sedentary (desk job, no gym)</option>
            <option value="1.375">Light (1-3x/week)</option>
            <option value="1.55">Moderate (3-5x/week)</option>
            <option value="1.725">Active (6-7x/week)</option>
            <option value="1.9">Very Active (athlete)</option>
          </select>
        </div>
        <button onClick={calculate}
          className="w-full py-3 rounded-xl bg-[#C7F464] text-black font-semibold text-sm hover:bg-[#DEFF6E] transition-all hover:scale-[1.02]">
          Calculate My Calories
        </button>
        {result && (
          <div className="p-4 rounded-xl bg-[#C7F464]/8 border border-[#C7F464]/20 text-center">
            <div className="text-white/40 text-xs mb-1">Your Daily Calories (TDEE)</div>
            <div className="font-syne font-bold text-3xl text-[#C7F464]">{result.toLocaleString()}</div>
            <div className="text-white/30 text-xs mt-2">Fat loss: {result - 500} | Maintain: {result} | Gain: {result + 300}</div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Water Calculator ─── */
function WaterCalculator() {
  const [weight, setWeight] = useState('');
  const liters = weight ? (parseFloat(weight) * 0.033).toFixed(1) : null;
  const glasses = liters ? Math.round(parseFloat(liters) / 0.25) : null;

  return (
    <div className="p-6 rounded-2xl glass border border-white/8">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-[#A8D5BA]/15 border border-[#A8D5BA]/30 flex items-center justify-center">
          <Droplets size={18} color="#A8D5BA" />
        </div>
        <div>
          <h3 className="font-syne font-bold text-white">Water Intake</h3>
          <p className="text-white/40 text-xs">Daily hydration needs</p>
        </div>
      </div>
      <label className="text-white/40 text-xs mb-1 block">Your Weight (kg)</label>
      <input type="number" placeholder="70" value={weight} onChange={e => setWeight(e.target.value)}
        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/8 text-white text-sm mb-4 focus:outline-none focus:border-[#A8D5BA]/40 transition-colors"
      />
      {liters && (
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-[#A8D5BA]/8 border border-[#A8D5BA]/20 flex items-center justify-between">
            <span className="text-white/60 text-sm">Daily Target</span>
            <span className="font-syne font-bold text-2xl text-[#A8D5BA]">{liters}L</span>
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {Array.from({ length: glasses || 0 }).map((_, i) => (
              <div key={i} className="w-7 h-7 rounded-full border border-[#A8D5BA]/30 bg-[#A8D5BA]/10 flex items-center justify-center text-xs text-[#A8D5BA]">💧</div>
            ))}
          </div>
          <p className="text-white/30 text-xs">= approximately {glasses} glasses (250ml each)</p>
        </div>
      )}
    </div>
  );
}

/* ─── Meal Plan Card ─── */
const mealPlans = [
  {
    id: 'muscle', title: 'Muscle Gain', emoji: '💪', color: '#C7F464',
    calories: '2800-3200', protein: '180-220g', carbs: '350-400g', fats: '80-100g',
    description: 'High-calorie, protein-rich plan designed for maximum muscle synthesis.',
    meals: [
      { time: '7:00 AM', name: 'Power Breakfast', items: 'Oats + 4 eggs + banana + whole milk', cal: 550, protein: 35 },
      { time: '10:00 AM', name: 'Mid-Morning Fuel', items: 'Greek yogurt + berries + almonds + honey', cal: 350, protein: 25 },
      { time: '1:00 PM', name: 'Lunch', items: '200g chicken breast + 200g rice + broccoli', cal: 650, protein: 55 },
      { time: '4:00 PM', name: 'Pre-Workout', items: 'Whey protein shake + banana + peanut butter', cal: 350, protein: 30 },
      { time: '7:00 PM', name: 'Dinner', items: 'Salmon + sweet potato + green salad', cal: 600, protein: 45 },
      { time: '9:30 PM', name: 'Night Fuel', items: 'Cottage cheese + casein protein + walnuts', cal: 300, protein: 30 },
    ],
  },
  {
    id: 'fatloss', title: 'Fat Loss', emoji: '🔥', color: '#C7F464',
    calories: '1600-1900', protein: '160-200g', carbs: '150-200g', fats: '50-70g',
    description: 'Calorie deficit plan that preserves muscle while accelerating fat loss.',
    meals: [
      { time: '7:00 AM', name: 'Lean Start', items: 'Spinach + egg white omelette + black coffee', cal: 280, protein: 28 },
      { time: '10:00 AM', name: 'Protein Break', items: 'Whey shake + apple', cal: 200, protein: 25 },
      { time: '1:00 PM', name: 'Power Lunch', items: 'Tuna salad + whole grain bread + cucumber', cal: 380, protein: 38 },
      { time: '4:00 PM', name: 'Afternoon Snack', items: 'Greek yogurt + celery sticks', cal: 130, protein: 12 },
      { time: '7:00 PM', name: 'Dinner', items: '180g chicken + large mixed vegetable stir-fry', cal: 420, protein: 45 },
    ],
  },
  {
    id: 'vegan', title: 'Vegan Plan', emoji: '🌱', color: '#A8D5BA',
    calories: '2000-2400', protein: '140-170g', carbs: '250-300g', fats: '65-80g',
    description: 'Complete plant-based plan with optimal protein combining for athletes.',
    meals: [
      { time: '7:00 AM', name: 'Green Start', items: 'Tofu scramble + whole grain toast + fruit', cal: 420, protein: 28 },
      { time: '10:00 AM', name: 'Smoothie Fuel', items: 'Pea protein + berries + oats + almond milk', cal: 320, protein: 30 },
      { time: '1:00 PM', name: 'Lentil Bowl', items: 'Lentils + brown rice + roasted veggies + tahini', cal: 530, protein: 28 },
      { time: '4:00 PM', name: 'Snack', items: 'Edamame + mixed nuts + hummus', cal: 280, protein: 18 },
      { time: '7:00 PM', name: 'Power Dinner', items: 'Tempeh stir fry + quinoa + avocado', cal: 520, protein: 38 },
    ],
  },
];

function MealPlanCard({ plan }: { plan: typeof mealPlans[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl glass border border-white/8 overflow-hidden">
      <button
        className="w-full p-6 text-left flex items-center gap-4 hover:bg-white/2 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <div className="text-3xl">{plan.emoji}</div>
        <div className="flex-1">
          <h3 className="font-syne font-bold text-lg text-white mb-1">{plan.title}</h3>
          <p className="text-white/40 text-sm">{plan.description}</p>
        </div>
        <div className="flex items-center gap-6 mr-4 hidden md:flex">
          {[['Calories', plan.calories], ['Protein', plan.protein], ['Carbs', plan.carbs]].map(([label, val]) => (
            <div key={label} className="text-center">
              <div className="font-semibold text-sm" style={{ color: plan.color }}>{val}</div>
              <div className="text-white/30 text-xs">{label}</div>
            </div>
          ))}
        </div>
        {open ? <ChevronUp size={18} color="rgba(255,255,255,0.3)" /> : <ChevronDown size={18} color="rgba(255,255,255,0.3)" />}
      </button>

      <div className={`transition-all duration-500 overflow-hidden ${open ? 'max-h-[600px]' : 'max-h-0'}`}>
        <div className="px-6 pb-6 space-y-3">
          {plan.meals.map((meal) => (
            <div key={meal.time} className="flex items-start gap-4 p-4 rounded-xl bg-white/3 border border-white/5">
              <div className="flex-shrink-0 w-16 text-xs text-white/30 font-medium pt-0.5">{meal.time}</div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-white text-sm mb-0.5">{meal.name}</div>
                <div className="text-white/40 text-xs">{meal.items}</div>
              </div>
              <div className="flex-shrink-0 text-right">
                <div className="text-xs font-medium" style={{ color: plan.color }}>{meal.cal} cal</div>
                <div className="text-white/30 text-xs">{meal.protein}g protein</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const supplements = [
  { name: 'Creatine', dose: '5g/day', benefit: 'Strength & power', stars: 5, emoji: '⚡' },
  { name: 'Whey Protein', dose: '1-2 scoops', benefit: 'Muscle recovery', stars: 5, emoji: '🥛' },
  { name: 'Vitamin D3', dose: '2000-4000 IU', benefit: 'Immunity & hormones', stars: 5, emoji: '☀️' },
  { name: 'Omega-3', dose: '2-4g EPA/DHA', benefit: 'Joints & brain health', stars: 4, emoji: '🐟' },
  { name: 'Magnesium', dose: '300-400mg', benefit: 'Sleep & recovery', stars: 4, emoji: '💤' },
  { name: 'Pre-Workout', dose: '1 serving', benefit: 'Energy & focus', stars: 3, emoji: '🚀' },
];

export default function NutritionPage() {
  const [activeTab, setActiveTab] = useState<'plans'|'calculators'|'supplements'>('plans');

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24">
      {/* Hero */}
      <div className="relative overflow-hidden py-20 border-b border-white/5">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[#A8D5BA]/8 blur-[80px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="text-6xl mb-6">🥗</div>
          <span className="text-[#A8D5BA] text-sm font-semibold tracking-widest uppercase mb-4 block">Smart Nutrition</span>
          <h1 className="font-syne font-bold text-[clamp(3rem,7vw,6rem)] text-white leading-tight mb-6">
            Eat Smart.
            <br />
            <span style={{ color: '#A8D5BA' }}>Perform Better.</span>
          </h1>
          <p className="text-white/40 text-xl max-w-2xl mx-auto">
            Science-backed meal plans, precise calculators, and supplement guidance — everything your nutrition needs.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Tabs */}
        <div className="flex gap-2 mb-10 bg-white/3 border border-white/8 rounded-2xl p-1.5 w-fit">
          {[
            { id: 'plans', label: '🍽 Meal Plans', icon: Utensils },
            { id: 'calculators', label: '🧮 Calculators', icon: Calculator },
            { id: 'supplements', label: '💊 Supplements', icon: Leaf },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-[#C7F464] text-black'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Meal Plans */}
        {activeTab === 'plans' && (
          <div className="space-y-6">
            <div className="mb-8">
              <h2 className="font-syne font-bold text-3xl text-white mb-2">Choose Your Plan</h2>
              <p className="text-white/40">Click any plan to reveal the full day of meals and macros.</p>
            </div>
            {mealPlans.map(plan => <MealPlanCard key={plan.id} plan={plan} />)}

            {/* Floating food emojis */}
            <div className="py-16 text-center relative overflow-hidden rounded-2xl glass border border-white/5">
              <div className="flex justify-center gap-6 text-4xl mb-6 animate-float">
                🥑 🍗 🥦 🍳 🐟 🥗
              </div>
              <h3 className="font-syne font-bold text-2xl text-white mb-3">Want a custom meal plan?</h3>
              <p className="text-white/40 text-sm mb-6">Tell our AI coach your goals and get a tailored nutrition plan in seconds.</p>
              <a href="/ai-coach" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C7F464] text-black font-semibold text-sm hover:bg-[#DEFF6E] transition-all hover:scale-105">
                Get Custom Plan →
              </a>
            </div>
          </div>
        )}

        {/* Calculators */}
        {activeTab === 'calculators' && (
          <div className="space-y-6">
            <div className="mb-8">
              <h2 className="font-syne font-bold text-3xl text-white mb-2">Know Your Numbers</h2>
              <p className="text-white/40">Precision is the difference between good results and great results.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <BMICalculator />
              <WaterCalculator />
              <div className="p-6 rounded-2xl glass border border-white/8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-[#C7F464]/15 border border-[#C7F464]/30 flex items-center justify-center">
                    <Target size={18} color="#C7F464" />
                  </div>
                  <div>
                    <h3 className="font-syne font-bold text-white">Protein Target</h3>
                    <p className="text-white/40 text-xs">Daily protein needs</p>
                  </div>
                </div>
                <p className="text-white/40 text-sm mb-4">General rule: <span className="text-[#C7F464] font-semibold">1g per lb</span> of bodyweight for muscle building, <span className="text-[#C7F464] font-semibold">0.7g per lb</span> for maintenance.</p>
                <div className="space-y-3">
                  {[['Sedentary', '0.6g/lb', '#fff'], ['Active', '0.8g/lb', '#A8D5BA'], ['Athletic', '1.0g/lb', '#C7F464'], ['Bodybuilder', '1.2g/lb', '#C7F464']].map(([level, target, color]) => (
                    <div key={level} className="flex items-center justify-between p-3 rounded-xl bg-white/3 border border-white/5">
                      <span className="text-white/50 text-sm">{level}</span>
                      <span className="font-semibold text-sm" style={{ color }}>{target}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <CalorieCalculator />
          </div>
        )}

        {/* Supplements */}
        {activeTab === 'supplements' && (
          <div>
            <div className="mb-8">
              <h2 className="font-syne font-bold text-3xl text-white mb-2">Evidence-Based Supplements</h2>
              <p className="text-white/40">Only supplements with real scientific backing. No BS, no fluff.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {supplements.map((s) => (
                <div key={s.name} className="p-6 rounded-2xl glass border border-white/8 hover:border-[#C7F464]/20 transition-all duration-300 card-hover">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-3xl">{s.emoji}</div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className={`w-3 h-3 rounded-full ${i < s.stars ? 'bg-[#C7F464]' : 'bg-white/10'}`} />
                      ))}
                    </div>
                  </div>
                  <h3 className="font-syne font-bold text-lg text-white mb-1">{s.name}</h3>
                  <p className="text-[#C7F464] text-sm font-medium mb-2">{s.dose}</p>
                  <p className="text-white/40 text-sm">{s.benefit}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 p-6 rounded-2xl bg-[#C7F464]/5 border border-[#C7F464]/20">
              <p className="text-white/40 text-sm">
                ⚠️ <span className="text-white/60 font-medium">Disclaimer:</span> Always consult a healthcare professional before starting any supplement regimen. FITVERSE provides educational information only.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
