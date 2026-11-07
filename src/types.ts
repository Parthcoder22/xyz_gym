export type MembershipTier = 'BASIC' | 'PRO' | 'ELITE';

export interface MemberProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  tier: MembershipTier;
  tierLabel: string;
  cycleStarted: string;
  cycleExpiry: string;
  daysLeft: number;
  totalDays: number;
  checkins: number;
  streak: number;
  zoneAccess: string;
  avatarUrl: string;
  autoDebit: boolean;
  weeklyCaloricBurn: number;
  level: string;
}

export interface Transaction {
  id: string;
  date: string;
  tierName: string;
  amount: number;
  gateway: string;
  status: 'Verified Success' | 'Pending' | 'Refunded';
}

export interface GateLog {
  id: string;
  timestamp: string;
  memberName: string;
  memberId: string;
  zone: string;
  status: 'GRANTED' | 'SCANNING' | 'DENIED';
}

export interface ProgramItem {
  id: string;
  code: string;
  title: string;
  intensity: 'HIGH' | 'PEAK' | 'VERY HIGH' | 'CUSTOM' | 'REDLINE';
  sessionsPerWeek: string;
  shortDesc: string;
  fullDesc: string;
  focus: string;
  icon: string;
}

export interface TrainerItem {
  id: string;
  name: string;
  credentials: string;
  specialty: string;
  role: string;
  bio: string;
  experience: string;
  imageUrl: string;
}
