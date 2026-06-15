'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Calculator, Droplets, Target, ChevronDown, ChevronUp, Leaf, Pill, UtensilsCrossed } from 'lucide-react';

function BMICalculator() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const bmi = height && weight ? (parseFloat(weight) / ((parseFloat(height) / 100) ** 2)).toFixed(1) : null;
  const getCategory = (b: number) =>
    b < 18.5 ? { label: 'Underweight', color: '#2563eb' }
    : b < 25 ? { label: 'Healthy Weight', color: '#568203' }
    : b < 30 ? { label: 'Overweight', color: '#b45309' }
    : { label: 'Obese', color: '#dc2626' };

  return (
    <div className="p-10 rounded-3xl border border-[#568203]/12 bg-white shadow-sm">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-[#568203]/10 border border-[#568203]/20 flex items-center justify-center"><Calculator size={20} color="#568203" strokeWidth={1.75} /></div>
        <div><h3 className="font-syne font-bold text-[#3d5e02] text-base">BMI Calculator</h3><p className="text-[#568203]/40 text-xs mt-0.5">Body Mass Index</p></div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-7">
        {[['Height (cm)', height, setHeight, '175'], ['Weight (kg)', weight, setWeight, '70']].map(([label, val, setter, ph]) => (
          <div key={label as string}>
            <label className="text-[#568203]/50 text-xs mb-2 block">{label as string}</label>
            <input type="number" placeholder={ph as string} value={val as string} onChange={e => (setter as (v: string) => void)(e.target.value)} className="w-full px-4 py-3.5 rounded-2xl bg-[#568203]/4 border border-[#568203]/12 text-[#3d5e02] text-sm placeholder-[#568203]/30 focus:outline-none focus:border-[#568203]/35 transition-colors" />
          </div>
        ))}
      </div>
      {bmi && (
        <div className="p-6 rounded-2xl bg-[#568203]/5 border border-[#568203]/10 text-center">
          <div className="font-syne font-bold mb-2" style={{ fontSize: '2.8rem', lineHeight: 1, color: getCategory(parseFloat(bmi)).color }}>{bmi}</div>
          <div className="text-sm font-semibold" style={{ color: getCategory(parseFloat(bmi)).color }}>{getCategory(parseFloat(bmi)).label}</div>
        </div>
      )}
    </div>
  );
}

function CalorieCalculator() {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activity, setActivity] = useState('1.375');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const a = parseFloat(age), h = parseFloat(height), w = parseFloat(weight), act = parseFloat(activity);
    if (!a || !h || !w) return;
    const bmr = gender === 'male' ? 88.36 + 13.4 * w + 4.8 * h - 5.7 * a : 447.6 + 9.2 * w + 3.1 * h - 4.3 * a;
    setResult(Math.round(bmr * act));
  };

  return (
    <div className="p-10 rounded-3xl border border-[#568203]/12 bg-white shadow-sm">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-[#568203]/10 border border-[#568203]/20 flex items-center justify-center"><Target size={20} color="#568203" strokeWidth={1.75} /></div>
        <div><h3 className="font-syne font-bold text-[#3d5e02] text-base">Calorie Calculator</h3><p className="text-[#568203]/40 text-xs mt-0.5">Daily energy needs (TDEE)</p></div>
      </div>
      <div className="space-y-5">
        <div className="flex gap-3">
          {(['male', 'female'] as const).map(g => (
            <button key={g} onClick={() => setGender(g)} className={`flex-1 py-3 rounded-2xl text-sm font-medium transition-all ${gender === g ? 'bg-[#568203] text-[#FFF8B9]' : 'bg-[#568203]/5 border border-[#568203]/15 text-[#568203]/50 hover:text-[#568203]'}`}>{g === 'male' ? 'Male' : 'Female'}</button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[['Age', age, setAge, '25'], ['Height cm', height, setHeight, '175'], ['Weight kg', weight, setWeight, '70']].map(([label, val, setter, ph]) => (
            <div key={label as string}>
              <label className="text-[#568203]/50 text-xs mb-2 block">{label as string}</label>
              <input type="number" placeholder={ph as string} value={val as string} onChange={e => (setter as (v: string) => void)(e.target.value)} className="w-full px-3 py-3 rounded-2xl bg-[#568203]/4 border border-[#568203]/12 text-[#3d5e02] text-sm placeholder-[#568203]/30 focus:outline-none focus:border-[#568203]/35 transition-colors" />
            </div>
          ))}
        </div>
        <div>
          <label className="text-[#568203]/50 text-xs mb-2 block">Activity Level</label>
          <select value={activity} onChange={e => setActivity(e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-[#568203]/4 border border-[#568203]/12 text-[#3d5e02] text-sm focus:outline-none focus:border-[#568203]/35 appearance-none cursor-pointer">
            <option value="1.2">Sedentary (desk job, no exercise)</option>
            <option value="1.375">Light (1–3 workouts/week)</option>
            <option value="1.55">Moderate (3–5 workouts/week)</option>
            <option value="1.725">Active (6–7 workouts/week)</option>
            <option value="1.9">Very Active (athlete/physical job)</option>
          </select>
        </div>
        <button onClick={calculate} className="w-full py-3.5 rounded-2xl bg-[#568203] text-[#FFF8B9] font-semibold text-sm hover:bg-[#3d5e02] transition-all hover:scale-[1.02]">Calculate My Calories</button>
        {result && (
          <div className="p-6 rounded-2xl bg-[#568203]/8 border border-[#568203]/18 text-center">
            <div className="text-[#568203]/50 text-xs uppercase tracking-widest mb-2">Your Daily Target (TDEE)</div>
            <div className="font-syne font-bold text-[#568203]" style={{ fontSize: '2.5rem', lineHeight: 1 }}>{result.toLocaleString()}</div>
            <div className="text-[#568203]/40 text-xs mt-4">
              Fat loss: <span className="text-[#568203] font-medium">{result - 500}</span> &nbsp;·&nbsp; Maintain: <span className="text-[#568203] font-medium">{result}</span> &nbsp;·&nbsp; Muscle gain: <span className="text-[#568203] font-medium">{result + 300}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function WaterCalculator() {
  const [weight, setWeight] = useState('');
  const liters = weight ? (parseFloat(weight) * 0.033).toFixed(1) : null;
  const glasses = liters ? Math.round(parseFloat(liters) / 0.25) : null;

  return (
    <div className="p-10 rounded-3xl border border-[#568203]/12 bg-white shadow-sm">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-[#568203]/10 border border-[#568203]/20 flex items-center justify-center"><Droplets size={20} color="#568203" strokeWidth={1.75} /></div>
        <div><h3 className="font-syne font-bold text-[#3d5e02] text-base">Water Intake</h3><p className="text-[#568203]/40 text-xs mt-0.5">Daily hydration needs</p></div>
      </div>
      <label className="text-[#568203]/50 text-xs mb-2 block">Your Weight (kg)</label>
      <input type="number" placeholder="70" value={weight} onChange={e => setWeight(e.target.value)} className="w-full px-4 py-3.5 rounded-2xl bg-[#568203]/4 border border-[#568203]/12 text-[#3d5e02] text-sm placeholder-[#568203]/30 mb-7 focus:outline-none focus:border-[#568203]/35 transition-colors" />
      {liters && (
        <div className="space-y-5">
          <div className="p-5 rounded-2xl bg-[#568203]/8 border border-[#568203]/18 flex items-center justify-between">
            <span className="text-[#568203]/55 text-sm">Daily target</span>
            <span className="font-syne font-bold text-[#568203] text-2xl">{liters}L</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: glasses || 0 }).map((_, i) => (
              <div key={i} className="w-7 h-7 rounded-full border border-[#568203]/20 bg-[#568203]/8 flex items-center justify-center"><Droplets size={12} color="#568203" /></div>
            ))}
          </div>
          <p className="text-[#568203]/40 text-xs">≈ {glasses} glasses of 250ml each</p>
        </div>
      )}
    </div>
  );
}

const mealPlans = [
  {
    id: 'muscle', title: 'Muscle Gain Plan', icon: '💪',
    calories: '2800–3200', protein: '180–220g', carbs: '350–400g', fats: '80–100g',
    description: 'High-calorie, protein-rich plan designed for maximum muscle synthesis.',
    imageId: '1581009146145-b5ef050c2e1e',
    meals: [
      { time: '7:00 AM', name: 'Power Breakfast', items: 'Oats + 4 eggs + banana + whole milk', cal: 550, protein: 35 },
      { time: '10:00 AM', name: 'Mid-Morning', items: 'Greek yoghurt + berries + almonds + honey', cal: 350, protein: 25 },
      { time: '1:00 PM', name: 'Lunch', items: '200g chicken breast + 200g rice + broccoli', cal: 650, protein: 55 },
      { time: '4:00 PM', name: 'Pre-Workout', items: 'Whey protein + banana + peanut butter', cal: 350, protein: 30 },
      { time: '7:00 PM', name: 'Dinner', items: 'Salmon + sweet potato + green salad', cal: 600, protein: 45 },
      { time: '9:30 PM', name: 'Night Fuel', items: 'Cottage cheese + casein protein + walnuts', cal: 300, protein: 30 },
    ],
  },
  {
    id: 'fatloss', title: 'Fat Loss Plan', icon: '🔥',
    calories: '1600–1900', protein: '160–200g', carbs: '150–200g', fats: '50–70g',
    description: 'Calorie deficit plan that preserves muscle while accelerating fat loss.',
    imageId: '1490645935967-10de6ba17061',
    meals: [
      { time: '7:00 AM', name: 'Lean Start', items: 'Spinach + egg white omelette + black coffee', cal: 280, protein: 28 },
      { time: '10:00 AM', name: 'Protein Break', items: 'Whey shake + apple', cal: 200, protein: 25 },
      { time: '1:00 PM', name: 'Power Lunch', items: 'Tuna salad + whole grain bread + cucumber', cal: 380, protein: 38 },
      { time: '4:00 PM', name: 'Afternoon', items: 'Greek yoghurt + celery sticks', cal: 130, protein: 12 },
      { time: '7:00 PM', name: 'Dinner', items: '180g chicken + large mixed vegetable stir-fry', cal: 420, protein: 45 },
    ],
  },
  {
    id: 'vegan', title: 'Vegan Plan', icon: '🌱',
    calories: '2000–2400', protein: '140–170g', carbs: '250–300g', fats: '65–80g',
    description: 'Complete plant-based plan with optimal protein combining for athletes.',
    imageId: '1512621776951-a57141f2eefd',
    meals: [
      { time: '7:00 AM', name: 'Green Start', items: 'Tofu scramble + whole grain toast + fruit', cal: 420, protein: 28 },
      { time: '10:00 AM', name: 'Smoothie', items: 'Pea protein + berries + oats + almond milk', cal: 320, protein: 30 },
      { time: '1:00 PM', name: 'Lentil Bowl', items: 'Lentils + brown rice + roasted veggies + tahini', cal: 530, protein: 28 },
      { time: '4:00 PM', name: 'Snack', items: 'Edamame + mixed nuts + hummus', cal: 280, protein: 18 },
      { time: '7:00 PM', name: 'Power Dinner', items: 'Tempeh stir fry + quinoa + avocado', cal: 520, protein: 38 },
    ],
  },
];

function MealPlanCard({ plan }: { plan: typeof mealPlans[0] }) {
  const [open, setOpen] = useState(false);
  const [imgErr, setImgErr] = useState(false);

  return (
    <div className="rounded-3xl border border-[#568203]/12 bg-white overflow-hidden shadow-sm">
      <button className="w-full text-left flex flex-col sm:flex-row items-start sm:items-center gap-5 hover:bg-[#568203]/3 transition-colors" onClick={() => setOpen(!open)}>
        <div className="relative w-full sm:w-36 h-32 sm:h-28 flex-shrink-0 overflow-hidden">
          {!imgErr ? (
            <Image src={`https://images.unsplash.com/photo-${plan.imageId}?auto=format&q=75&w=400&h=250&fit=crop`} alt={plan.title} fill className="object-cover" onError={() => setImgErr(true)} />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-3xl bg-[#568203]/8">{plan.icon}</div>
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/50 sm:to-white/80" />
        </div>
        <div className="flex-1 min-w-0 px-8 py-6 sm:py-0 sm:px-0">
          <h3 className="font-syne font-bold text-xl text-[#3d5e02] mb-2">{plan.title}</h3>
          <p className="text-[#568203]/50 text-sm mb-5 leading-[1.75]">{plan.description}</p>
          <div className="hidden md:flex items-center gap-8">
            {[['Calories', plan.calories], ['Protein', plan.protein], ['Carbs', plan.carbs]].map(([label, val]) => (
              <div key={label} className="text-center">
                <div className="font-semibold text-sm mb-1 text-[#568203]">{val}</div>
                <div className="text-[#568203]/35 text-[11px] uppercase tracking-wide">{label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="px-8 pb-6 sm:py-0 sm:pr-8 sm:pl-0">
          {open ? <ChevronUp size={18} color="rgba(86,130,3,0.4)" /> : <ChevronDown size={18} color="rgba(86,130,3,0.4)" />}
        </div>
      </button>
      <div className={`transition-all duration-500 overflow-hidden ${open ? 'max-h-[600px]' : 'max-h-0'}`}>
        <div className="px-8 pb-8 space-y-3 border-t border-[#568203]/8 pt-6">
          {plan.meals.map((meal) => (
            <div key={meal.time} className="flex items-start gap-5 p-5 rounded-2xl bg-[#568203]/4 border border-[#568203]/8">
              <div className="flex-shrink-0 w-16 text-xs text-[#568203]/40 font-medium pt-0.5">{meal.time}</div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-[#3d5e02] text-sm mb-1">{meal.name}</div>
                <div className="text-[#568203]/50 text-xs leading-relaxed">{meal.items}</div>
              </div>
              <div className="flex-shrink-0 text-right">
                <div className="text-xs font-semibold text-[#568203] mb-1">{meal.cal} cal</div>
                <div className="text-[#568203]/35 text-[11px]">{meal.protein}g protein</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const supplements = [
  { name: 'Creatine Monohydrate', dose: '5g daily', benefit: 'Proven to increase strength and power output', stars: 5 },
  { name: 'Whey Protein', dose: '1–2 scoops post-workout', benefit: 'Fast-absorbing protein for muscle recovery', stars: 5 },
  { name: 'Vitamin D3', dose: '2000–4000 IU daily', benefit: 'Hormone health, immunity, and mood', stars: 5 },
  { name: 'Omega-3 Fish Oil', dose: '2–4g EPA/DHA daily', benefit: 'Reduces inflammation, supports joint health', stars: 4 },
  { name: 'Magnesium Glycinate', dose: '300–400mg before bed', benefit: 'Sleep quality and recovery', stars: 4 },
  { name: 'Pre-Workout', dose: '1 serving 20min before', benefit: "Energy and focus (don't rely on it)", stars: 3 },
];

export default function NutritionPage() {
  const [activeTab, setActiveTab] = useState<'plans' | 'calculators' | 'supplements'>('plans');

  return (
    <div className="min-h-screen bg-[#FFF8B9] pt-24">
      {/* Hero */}
      <div className="relative overflow-hidden py-36 bg-[#568203]">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&q=70&w=1800" alt="Nutrition" fill className="object-cover object-center opacity-12" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#568203]/90 via-[#568203]/70 to-[#568203]" />
        </div>
        <div className="max-w-4xl mx-auto px-10 relative z-10 text-center">
          <span className="text-[#F0E878] text-xs font-semibold tracking-[0.25em] uppercase mb-7 block">Smart Nutrition</span>
          <h1 className="font-syne font-bold text-[#FFF8B9] leading-tight mb-8" style={{ fontSize: 'clamp(3rem, 6.5vw, 6rem)' }}>
            Eat Smart.<br /><span className="text-gradient">Perform Better.</span>
          </h1>
          <p className="text-[#FFF8B9]/55 text-xl max-w-2xl mx-auto leading-[1.75]">Science-backed meal plans, precision calculators, and supplement guidance — everything your nutrition needs.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-10 py-24">
        {/* Tabs */}
        <div className="flex gap-2.5 mb-16 overflow-x-auto hide-scrollbar pb-1">
          {[
            { id: 'plans', label: 'Meal Plans', icon: UtensilsCrossed },
            { id: 'calculators', label: 'Calculators', icon: Calculator },
            { id: 'supplements', label: 'Supplements', icon: Pill },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as typeof activeTab)} className={`flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === tab.id ? 'bg-[#568203] text-[#FFF8B9]' : 'border border-[#568203]/18 bg-white text-[#568203]/60 hover:border-[#568203]/35 hover:text-[#568203]'}`}>
              <tab.icon size={14} />{tab.label}
            </button>
          ))}
        </div>

        {/* Meal Plans */}
        {activeTab === 'plans' && (
          <div className="space-y-5">
            <div className="mb-12">
              <h2 className="font-syne font-bold text-3xl text-[#3d5e02] mb-3">Choose Your Plan</h2>
              <p className="text-[#568203]/50 leading-[1.75]">Click any plan to reveal the full day of meals and macros.</p>
            </div>
            {mealPlans.map(plan => <MealPlanCard key={plan.id} plan={plan} />)}
            <div className="mt-12 p-12 rounded-3xl border border-[#568203]/12 bg-white text-center shadow-sm">
              <Leaf size={28} className="mx-auto mb-6" color="rgba(86,130,3,0.5)" />
              <h3 className="font-syne font-bold text-2xl text-[#3d5e02] mb-4">Want a custom meal plan?</h3>
              <p className="text-[#568203]/50 text-sm max-w-md mx-auto mb-9 leading-[1.8]">Tell our AI coach your goals and get a tailored nutrition plan based on your body and targets.</p>
              <a href="/ai-coach" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#568203] text-[#FFF8B9] font-semibold text-sm hover:bg-[#3d5e02] transition-all hover:scale-105">Get Custom Plan →</a>
            </div>
          </div>
        )}

        {/* Calculators */}
        {activeTab === 'calculators' && (
          <div className="space-y-8">
            <div className="mb-12">
              <h2 className="font-syne font-bold text-3xl text-[#3d5e02] mb-3">Know Your Numbers</h2>
              <p className="text-[#568203]/50 leading-[1.75]">Precision is the difference between good results and exceptional results.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              <BMICalculator />
              <WaterCalculator />
              <div className="p-10 rounded-3xl border border-[#568203]/12 bg-white shadow-sm">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-[#568203]/10 border border-[#568203]/20 flex items-center justify-center"><Target size={20} color="#568203" strokeWidth={1.75} /></div>
                  <div><h3 className="font-syne font-bold text-[#3d5e02] text-base">Protein Target</h3><p className="text-[#568203]/40 text-xs mt-0.5">Daily protein needs by goal</p></div>
                </div>
                <p className="text-[#568203]/55 text-sm mb-7 leading-[1.8]">
                  Rule of thumb: <span className="text-[#568203] font-semibold">1g per lb</span> of bodyweight for muscle building, <span className="text-[#568203] font-semibold">0.7g per lb</span> for maintenance.
                </p>
                <div className="space-y-3">
                  {[['Sedentary', '0.6g/lb', false], ['Active', '0.8g/lb', false], ['Athletic', '1.0g/lb', true], ['Bodybuilder', '1.2g/lb', true]].map(([level, target, highlight]) => (
                    <div key={level as string} className="flex items-center justify-between p-4 rounded-2xl bg-[#568203]/5 border border-[#568203]/8">
                      <span className="text-[#568203]/55 text-sm">{level as string}</span>
                      <span className={`font-semibold text-sm ${highlight ? 'text-[#568203]' : 'text-[#3d5e02]/50'}`}>{target as string}</span>
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
            <div className="mb-12">
              <h2 className="font-syne font-bold text-3xl text-[#3d5e02] mb-3">Evidence-Based Supplements</h2>
              <p className="text-[#568203]/50 leading-[1.75]">Only supplements with real scientific backing. No hype, no filler.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {supplements.map((s) => (
                <div key={s.name} className="p-10 rounded-3xl border border-[#568203]/12 bg-white hover:border-[#568203]/25 transition-all duration-300 card-hover shadow-sm">
                  <div className="flex items-start justify-between mb-7">
                    <div className="w-12 h-12 rounded-2xl bg-[#568203]/10 border border-[#568203]/18 flex items-center justify-center"><Pill size={20} color="#568203" strokeWidth={1.75} /></div>
                    <div className="flex gap-1.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className={`w-2.5 h-2.5 rounded-full ${i < s.stars ? 'bg-[#568203]' : 'bg-[#568203]/12'}`} />
                      ))}
                    </div>
                  </div>
                  <h3 className="font-syne font-bold text-[#3d5e02] text-base mb-2">{s.name}</h3>
                  <p className="text-[#568203] text-sm font-medium mb-4">{s.dose}</p>
                  <p className="text-[#568203]/50 text-sm leading-[1.8]">{s.benefit}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 p-8 rounded-3xl bg-[#568203]/5 border border-[#568203]/10">
              <p className="text-[#568203]/50 text-sm leading-[1.8]">
                <span className="text-[#3d5e02] font-semibold">Disclaimer:</span> Always consult a healthcare professional before starting any supplement regimen. FITVERSE provides educational information only and does not constitute medical advice.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
