import knowledgeRaw from '../../public/data/fitness-knowledge.json';

type Knowledge = typeof knowledgeRaw;
const knowledge = knowledgeRaw as Knowledge;

export interface ChatMessage {
  id: string;
  from: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function formatWorkout(key: keyof typeof knowledge.workouts): string {
  const w = knowledge.workouts[key];
  const lines = [w.message, ''];
  w.exercises.forEach((ex, i) => {
    lines.push(`${i + 1}. **${ex.name}** — ${ex.sets} sets × ${ex.reps}`);
    lines.push(`   💡 ${ex.tip}`);
  });
  return lines.join('\n');
}

export function getBotResponse(input: string): string {
  const q = input.toLowerCase().trim();

  /* ── Greetings ── */
  if (/^(hi|hello|hey|sup|yo|start|begin)/.test(q)) {
    return randomItem(knowledge.greetings);
  }

  /* ── Motivation / mood ── */
  if (/lazy|don't want|dont want|no motivation|unmotivated/.test(q)) {
    return randomItem(knowledge.motivational_responses.lazy);
  }
  if (/tired|exhausted|drained|no energy/.test(q)) {
    return randomItem(knowledge.motivational_responses.tired);
  }
  if (/motivated|pumped|ready|let's go|lets go|fired up/.test(q)) {
    return randomItem(knowledge.motivational_responses.motivated);
  }
  if (/skipped|missed|skip/.test(q)) {
    return randomItem(knowledge.motivational_responses.skip);
  }

  /* ── Leg day jokes ── */
  if (/leg day|legs/.test(q) && /skip|skipped|hate|avoid/.test(q)) {
    return knowledge.workouts.legs.message;
  }

  /* ── Workout by muscle group ── */
  if (/arm|bicep|tricep|curl/.test(q)) {
    return formatWorkout('arms');
  }
  if (/chest|bench|pec/.test(q)) {
    return formatWorkout('chest');
  }
  if (/leg|squat|quad|hamstring|glute|calf/.test(q)) {
    return formatWorkout('legs');
  }
  if (/back|lats|deadlift|row|pull.?up/.test(q)) {
    return formatWorkout('back');
  }
  if (/shoulder|delt|press/.test(q)) {
    return formatWorkout('shoulders');
  }
  if (/ab|core|six.?pack|stomach/.test(q)) {
    return formatWorkout('abs');
  }
  if (/cardio|run|sprint|hiit|endurance/.test(q)) {
    return formatWorkout('cardio');
  }
  if (/full.?body|everything|all muscle/.test(q)) {
    return formatWorkout('full_body');
  }
  if (/beginner|start|new|first time|never/.test(q)) {
    return formatWorkout('beginner');
  }

  /* ── Nutrition ── */
  if (/protein|how much protein|eat protein/.test(q)) {
    const sources = knowledge.nutrition.protein_sources.slice(0, 5);
    const list = sources.map(s => `• **${s.food}** — ${s.protein_per_100g}g protein/100g (${s.calories} cal) — ${s.tip}`).join('\n');
    return `Here are the best protein sources on the planet:\n\n${list}\n\nAim for 1g of protein per lb of bodyweight. Non-negotiable if you want results.`;
  }

  if (/lose weight|fat loss|cut|shred|lose fat/.test(q)) {
    const plan = knowledge.nutrition.meal_plans.fat_loss;
    const meals = plan.meals.map(m => `• ${m.time} — ${m.meal} (${m.calories} cal, ${m.protein}g protein)`).join('\n');
    return `Fat loss plan incoming. This one works:\n\nTarget: ${plan.calories} calories/day | ${plan.protein} protein\n\n${meals}\n\nDo this consistently for 8 weeks and you'll barely recognize yourself.`;
  }

  if (/gain muscle|build muscle|bulk|mass/.test(q)) {
    const plan = knowledge.nutrition.meal_plans.muscle_gain;
    const meals = plan.meals.map(m => `• ${m.time} — ${m.meal} (${m.calories} cal, ${m.protein}g protein)`).join('\n');
    return `Muscle gain mode activated. Here's your eating blueprint:\n\nTarget: ${plan.calories} cal/day | ${plan.protein} protein\n\n${meals}\n\nYou can't out-train a bad diet. But with this plan, you won't need to.`;
  }

  if (/vegan|plant.?based|no meat/.test(q)) {
    const plan = knowledge.nutrition.meal_plans.vegan;
    const meals = plan.meals.map(m => `• ${m.time} — ${m.meal} (${m.calories} cal, ${m.protein}g protein)`).join('\n');
    return `Plants CAN build muscle. Here's how:\n\nTarget: ${plan.calories} cal/day | ${plan.protein} protein\n\n${meals}\n\nKey: protein combining + enough total calories. You've got this.`;
  }

  if (/water|hydrat|drink/.test(q)) {
    return `Stay hydrated or stay mediocre. Simple choice.\n\n💧 Formula: body weight (kg) × 0.033 = daily litres\n\nTop tips:\n${knowledge.nutrition.hydration.tips.map(t => `• ${t}`).join('\n')}`;
  }

  if (/supplement|creatine|whey|protein powder|pre.?workout/.test(q)) {
    const sups = knowledge.nutrition.supplements;
    const list = sups.map(s => `• **${s.name}** (${s.dose}) — ${s.benefit} [${'⭐'.repeat(s.rating)}]`).join('\n');
    return `The only supplements worth your money:\n\n${list}\n\nStart with creatine + whey protein. Everything else is optional. Don't believe the hype on the rest.`;
  }

  /* ── FAQs ── */
  if (/how.?(often|many times|frequent)/.test(q) && /train|workout|gym/.test(q)) {
    return knowledge.faqs.how_often_train.answer;
  }
  if (/how long|when|results|see progress/.test(q)) {
    return knowledge.faqs.how_long_results.answer;
  }
  if (/cardio.*(first|before|after)|weights.*(first|before|after)/.test(q)) {
    return knowledge.faqs.cardio_or_weights.answer;
  }
  if (/protein.*timing|when.*eat.*protein|after workout.*eat/.test(q)) {
    return knowledge.faqs.protein_timing.answer;
  }
  if (/plateau|stuck|no progress|stop.*progress/.test(q)) {
    return knowledge.faqs.plateau.answer;
  }
  if (/sore|doms|hurt|pain/.test(q)) {
    return knowledge.faqs.sore_muscles.answer;
  }
  if (/membership|plan|price|cost|fitverse/.test(q)) {
    return knowledge.faqs.membership.answer;
  }

  /* ── Motivation quotes ── */
  if (/quote|inspire|motivat|remind me|keep going/.test(q)) {
    return `"${randomItem(knowledge.quotes)}"\n\nNow close the browser. Open the gym door. GO.`;
  }

  /* ── Challenges ── */
  if (/challenge|competition|leaderboard/.test(q)) {
    const challenges = knowledge.challenges;
    const list = challenges.map(c => `• **${c.name}** — ${c.description} (${c.participants.toLocaleString()} participants)`).join('\n');
    return `Ready to level up? Here are our active challenges:\n\n${list}\n\nHead to the Community page to join. Your competition is waiting.`;
  }

  /* ── Default catch-all ── */
  const defaults = [
    `I didn't quite catch that — but here's something better: what's your fitness goal right now? I'll build you a custom plan.\n\nOptions:\n• 💪 "I want to build muscle"\n• 🔥 "I want to lose fat"\n• 🏃 "I want to improve cardio"\n• 🥗 "Help me with nutrition"\n• ⚡ "Give me a beginner plan"`,
    `Interesting question. Let me redirect your energy more productively — what specific goal can I help you crush today? Arms? Legs? Fat loss? Nutrition?`,
    `I'm a fitness expert, not a philosopher. Ask me about workouts, nutrition, or goals and I'll deliver. What are we working on?`,
  ];
  return randomItem(defaults);
}
