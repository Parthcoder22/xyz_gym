import { MemberProfile, Transaction, ProgramItem, TrainerItem, GateLog } from '../types';

export const INITIAL_MEMBER: MemberProfile = {
  id: '#XYZ-7429',
  name: 'Marcus Vance',
  email: 'marcus.vance@perftest.io',
  phone: '+91 98765 43210',
  tier: 'PRO',
  tierLabel: 'PRO TIER',
  cycleStarted: '12 Jan 2025',
  cycleExpiry: '12 Apr 2025',
  daysLeft: 28,
  totalDays: 90,
  checkins: 46,
  streak: 12,
  zoneAccess: 'ZONE 1 ACCESS (24/7)',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCclHFAnCG2eCeVpATMC1evdJgvLHWafWqIFMqhaD0eqtEYZZAq6vt0qLvTEfdu6me5OM18JvB6O32OHl6PQhx5cuN_RpT4H2--JEqbstY37JNz8n584ZuRYWc5DSFDyW6Ptcx_HdJG6-cIxqg_ZgUkFDJUdw2YrLWJ9_6StUp7pnS1D7m7iHqrDArZ1aKhENQ7dq_QBoGuRx67Kn3blPar_ZUtubFgQQYnE2PUukQ',
  autoDebit: false,
  weeklyCaloricBurn: 4820,
  level: 'Level 3 Elite'
};

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'INV-2025-0144',
    date: '12 Jan 2025',
    tierName: 'PRO Tier (3 Months)',
    amount: 2499,
    gateway: 'UPI / Razorpay Test',
    status: 'Verified Success'
  },
  {
    id: 'INV-2024-0982',
    date: '12 Oct 2024',
    tierName: 'PRO Tier (3 Months)',
    amount: 2499,
    gateway: 'UPI / Razorpay Test',
    status: 'Verified Success'
  },
  {
    id: 'INV-2024-0511',
    date: '10 Jul 2024',
    tierName: 'PRO Tier (3 Months)',
    amount: 2499,
    gateway: 'Razorpay NetBanking',
    status: 'Verified Success'
  },
  {
    id: 'INV-2024-0102',
    date: '15 Jan 2024',
    tierName: 'Annual Starter Elite',
    amount: 10497,
    gateway: 'Corporate Card (Axis)',
    status: 'Verified Success'
  }
];

export const INITIAL_GATE_LOGS: GateLog[] = [
  {
    id: 'GATE-9842',
    timestamp: '2 mins ago',
    memberName: 'Marcus Vance',
    memberId: '#XYZ-7429',
    zone: 'Zone A Main Deck',
    status: 'GRANTED'
  },
  {
    id: 'GATE-9841',
    timestamp: '14 mins ago',
    memberName: 'Devin Mercer',
    memberId: '#XYZ-1022',
    zone: 'Recovery Pods / Sauna',
    status: 'GRANTED'
  },
  {
    id: 'GATE-9840',
    timestamp: '28 mins ago',
    memberName: 'Elena Rostova',
    memberId: '#XYZ-0041',
    zone: 'Locker Wing & Showers',
    status: 'GRANTED'
  },
  {
    id: 'GATE-9839',
    timestamp: '42 mins ago',
    memberName: 'Rohan Sharma',
    memberId: '#XYZ-6512',
    zone: 'Zone A Main Deck',
    status: 'GRANTED'
  }
];

export const PROGRAMS: ProgramItem[] = [
  {
    id: 'hyp-01',
    code: 'CODE: HYP-01',
    title: 'Strength Training',
    intensity: 'HIGH',
    sessionsPerWeek: '5 SESSIONS / WK',
    shortDesc: 'Compound mechanical overload. Master the big three—Squat, Bench, and Deadlift—with bar path telemetry and periodized load cycling.',
    focus: 'Barbell Mastery & Powerlifting',
    fullDesc: 'This rigorous program focuses on neuromuscular adaptations, multi-joint power generation, and periodized progressive overload. Incorporates velocity-based sensors to measure mean concentric speed and maximize absolute power without overtraining.',
    icon: 'fitness_center'
  },
  {
    id: 'shred-02',
    code: 'CODE: SHRED-02',
    title: 'Weight Loss & Shred',
    intensity: 'PEAK',
    sessionsPerWeek: '4 SESSIONS / WK',
    shortDesc: 'Thermogenic conditioning that fuses metabolic circuits with hypertrophy maintenance. Strip visceral fat while maintaining muscular density.',
    focus: 'Metabolic Conditioning & Caloric Burn',
    fullDesc: 'Calibrated high-output metabolic resistance training utilizing assault runners, sled pushes, and targeted density complexes. Supported with calculated nutritional frameworks for steady lipolysis and maximum lean retention.',
    icon: 'local_fire_department'
  },
  {
    id: 'mass-03',
    code: 'CODE: MASS-03',
    title: 'Muscle Hypertrophy',
    intensity: 'VERY HIGH',
    sessionsPerWeek: '6 SESSIONS / WK',
    shortDesc: 'Biomechanically sound vector isolation and eccentric tension loading designed for pure myofibrillar and sarcoplasmic expansion.',
    focus: 'Sarcoplasmic Expansion & Symmetry',
    fullDesc: 'High-volume structural training using cable cam profiles and mechanical drop sets. Focuses on full range-of-motion stretching under tension, maximizing localized blood pooling, and systemic muscular growth.',
    icon: 'sports_martial_arts'
  },
  {
    id: 'coach-04',
    code: 'CODE: 1ON1-04',
    title: 'Personal Coaching',
    intensity: 'CUSTOM',
    sessionsPerWeek: 'INDIVIDUALIZED',
    shortDesc: 'One-on-one direct mentorship with dedicated bio-mechanists. Real-time form adjustments, customized recovery, and weekly blood lipid/nutrition audits.',
    focus: 'Elite 1-on-1 Direct Mentorship',
    fullDesc: 'Comprehensive bespoke physical architecture. Includes full musculoskeletal screen, gait analysis, 3D body scans, tailored macronutrient balancing, and dedicated weekly performance reviews.',
    icon: 'person_pin'
  },
  {
    id: 'cardio-05',
    code: 'CODE: CARD-05',
    title: 'High-Intensity Cardio',
    intensity: 'REDLINE',
    sessionsPerWeek: '3 SESSIONS / WK',
    shortDesc: 'VO2 Max optimization using SkiErgs, curved non-motorized treadmills, and fan bikes. Build an unshakeable aerobic engine and lactic threshold.',
    focus: 'VO2 Max & Lactic Threshold Development',
    fullDesc: 'Intense anaerobic and aerobic interval training. Pushes cardiovascular output to 90%+ maximal heart rate in measured intervals, increasing mitochondrial density and systemic endurance under stress.',
    icon: 'ecg_heart'
  },
  {
    id: 'cross-06',
    code: 'CODE: CROSS-06',
    title: 'Functional Cross-Training',
    intensity: 'HIGH',
    sessionsPerWeek: '4 SESSIONS / WK',
    shortDesc: 'Kettlebell ballistics, gymnastic ring stability, tire flips, and sandbag carries. Forged for multi-planar agility and durability.',
    focus: 'Multi-Planar Strength & Dynamic Agility',
    fullDesc: 'Unconventional loading patterns and odd-object carrying. Enhances rotational core integrity, shoulder complex health, grip resilience, and everyday physical athleticism across all movement planes.',
    icon: 'swap_driving_apps'
  }
];

export const TRAINERS: TrainerItem[] = [
  {
    id: 'marcus',
    name: 'Marcus Vance',
    credentials: 'CSCS, USAW-L2',
    specialty: 'Biomechanics & Olympic Lifts',
    role: 'S&C DIRECTOR',
    bio: 'Former collegiate strength coordinator specialized in kinetic force plate feedback, bar path optimization, and heavy squat rehabilitation.',
    experience: '10+ YRS EXP',
    imageUrl: '/assets/aistudio/elite_male_strength_and_conditioning_coach_in_black_athletic_sleeveless_hoodie_screen_c8b314e2.png'
  },
  {
    id: 'elena',
    name: 'Elena Rostova',
    credentials: 'ACE-CPT, NASM-PES',
    specialty: 'HIIT & Metabolic Conditioning',
    role: 'HEAD OF CONDITIONING',
    bio: 'High-performance athletic conditioning director specializing in VO2 max threshold training, explosive agility, and rapid lean recomposition.',
    experience: '8+ YRS EXP',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGh43ehkq5KrDguuuIZ6Qr6-fMcZz6LSMrGgsQFZf2DXqeE8cI6I0QBZim4E6pe66Zqc3RDNfZ_7QuVXIks1ZP6TXoZywjDxMecyJZ69tdxym2e4pWRtESI-CnNTYnVkBPiKFpzmmj9-qCL-osedqp_0HiXZDcdVXbjDSW-KYqR8wDxi-u0xuRy5_5NUD6PtG0gvLbJi1yOY4LMWb90vX0oNTuUFx9Gy-069lr2sc'
  },
  {
    id: 'devin',
    name: 'Devin Mercer',
    credentials: 'FMS-2, EXOS-XPS',
    specialty: 'Hypertrophy & Kinetic Recovery',
    role: 'LEAD HYPERTROPHY',
    bio: 'Pioneering vector analysis for stubborn muscle groups, active tissue mobility release, and posture re-alignment under heavy resistance.',
    experience: '7+ YRS EXP',
    imageUrl: '/assets/aistudio/strength_training_in_premium_high_end_fitness_center_barbell_deadlift_setup_screen_1f2cfb0d.png'
  }
];

/**
 * Web Audio synthesizer for turnstile scanners and checkout authorization
 */
export function playTurnstileBeep() {
  try {
    const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    
    // First high beep
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(880, ctx.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.12);
    
    gain1.gain.setValueAtTime(0.15, ctx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
    
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    
    osc1.start();
    osc1.stop(ctx.currentTime + 0.18);
  } catch {
    // Audio synthesis fallback
  }
}

export function playSuccessChime() {
  try {
    const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
      gain.gain.setValueAtTime(0.12, ctx.currentTime + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.25);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.08);
      osc.stop(ctx.currentTime + idx * 0.08 + 0.25);
    });
  } catch {
    // Audio fallback
  }
}
