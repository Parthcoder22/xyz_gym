import React, { useState, useEffect } from 'react';
import { MemberProfile, Transaction } from '../types';

interface MemberPortalProps {
  member: MemberProfile;
  transactions: Transaction[];
  facilityOccupancy: number;
  onOpenGatePass: () => void;
  onOpenRenew: () => void;
  onOpenMessageCoach: () => void;
  onNavigate: (view: string) => void;
  onShowToast: (msg: string) => void;
}

export const MemberPortal: React.FC<MemberPortalProps> = ({
  member,
  transactions,
  facilityOccupancy,
  onOpenGatePass,
  onOpenRenew,
  onOpenMessageCoach,
  onNavigate,
  onShowToast,
}) => {
  const [tokenTimer, setTokenTimer] = useState(44);
  const [currentToken, setCurrentToken] = useState('#9928-8421');

  // Dynamic QR countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTokenTimer((prev) => {
        if (prev <= 1) {
          const rand1 = Math.floor(1000 + Math.random() * 9000);
          const rand2 = Math.floor(1000 + Math.random() * 9000);
          setCurrentToken(`#${rand1}-${rand2}`);
          return 60;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const totalInvoiced = transactions.reduce((sum, tx) => sum + tx.amount, 0);

  const handleCopyKey = () => {
    const key = `${member.id}-SECURE-TOKEN`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(key);
    }
    onShowToast(`Member token ${key} copied to clipboard!`);
  };

  const handleDownload = (filename: string) => {
    onShowToast(`Initiating secure download for ${filename}...`);
  };

  // Weekly burn mock values for days
  const weeklyBurnDays = [
    { day: 'M', kcal: 620, heightClass: 'h-8', isToday: false },
    { day: 'T', kcal: 880, heightClass: 'h-14', isToday: true },
    { day: 'W', kcal: 740, heightClass: 'h-12', isToday: true },
    { day: 'T', kcal: 340, heightClass: 'h-5', isToday: false },
    { day: 'F', kcal: 980, heightClass: 'h-16', isToday: true },
    { day: 'S', kcal: 680, heightClass: 'h-10', isToday: true },
    { day: 'S', kcal: 220, heightClass: 'h-3', isToday: false },
  ];

  const elapsedPercent = Math.min(
    100,
    Math.max(0, Math.round(((member.totalDays - member.daysLeft) / member.totalDays) * 100))
  );

  return (
    <div className="flex flex-col w-full text-[#e5e2e1]">
      {/* Demo Switcher & Global Sync Banner */}
      <div className="w-full bg-[#0e0e0e] border-b border-white/[0.06] px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#bef500]/15 text-[#bef500] font-['Inter'] text-[11px] font-bold uppercase tracking-wider border border-[#bef500]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#bef500] animate-ping"></span>
            SANDBOX TELEMETRY ACTIVE
          </span>
          <span className="text-[#c3caac] font-['JetBrains_Mono'] text-xs hidden md:inline">
            NODE // BLR-METRIC-08 · SYNCED TO REALTIME RFID TURNSTILES
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[#c3caac] font-['JetBrains_Mono'] text-xs">ROLE VIEW:</span>
          <div className="inline-flex rounded bg-[#2a2a2a] p-0.5 border border-white/[0.08]">
            <button
              type="button"
              className="px-3 py-1 rounded bg-[#bef500] text-[#131313] font-['Inter'] text-[11px] font-bold tracking-widest uppercase transition-all shadow-sm"
            >
              Member
            </button>
            <button
              type="button"
              onClick={() => onNavigate('admin-overview')}
              className="px-3 py-1 rounded text-[#c3caac] hover:text-white font-['Inter'] text-[11px] font-bold tracking-widest uppercase transition-all flex items-center gap-1 cursor-pointer"
            >
              <span>Admin Dash</span>
              <span className="material-symbols-outlined text-[13px]">arrow_outward</span>
            </button>
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Header / Member Identity Deck */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0e0e0e] via-[#201f1f] to-[#1c1b1b] p-6 sm:p-8 lg:p-10 shadow-xl border border-white/[0.08]">
          <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-[#bef500]/5 blur-3xl pointer-events-none"></div>
          <div className="absolute left-1/3 -bottom-24 w-60 h-60 rounded-full bg-[#3a3939]/20 blur-2xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start md:items-center gap-5">
              <div className="relative shrink-0">
                <img
                  alt={member.name}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover shadow-2xl border-2 border-[#bef500]/60"
                  src={member.avatarUrl}
                />
                <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#bef500] flex items-center justify-center text-[#131313] shadow-md border-2 border-[#131313]">
                  <span className="material-symbols-outlined text-[14px] font-bold">bolt</span>
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#bef500]/20 text-[#bef500] font-['Inter'] text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-[0_0_12px_rgba(190,245,0,0.35)] border border-[#bef500]/30">
                    <span className="w-2 h-2 rounded-full bg-[#bef500] animate-pulse"></span>
                    ACTIVE {member.tier} MEMBER
                  </span>
                  <span className="text-[#c3caac] font-['JetBrains_Mono'] text-xs tracking-wider">
                    ID: <span className="text-white font-bold">{member.id}</span>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#353534] text-[#c6c6c7] font-['JetBrains_Mono'] text-[11px] font-medium">
                    {member.zoneAccess}
                  </span>
                </div>

                <h1 className="font-['Sora'] text-2xl sm:text-4xl text-white font-bold tracking-tight">
                  Welcome back, {member.name}!
                </h1>
                <p className="font-['Inter'] text-xs sm:text-sm text-[#c3caac] max-w-xl leading-relaxed">
                  Engineered hyper-performance track. Your biometric telemetry is synced to Main Deck lockers and smart recovery stations.
                </p>
              </div>
            </div>

            {/* Quick CTAs */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 lg:self-center">
              <button
                type="button"
                onClick={onOpenGatePass}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded bg-[#353534] hover:bg-[#3a3939] text-white font-['Sora'] text-xs sm:text-sm uppercase tracking-wider font-semibold transition-all border border-white/[0.08] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[#bef500] text-lg">qr_code_2</span>
                <span>Digital Gate Pass</span>
              </button>

              <button
                type="button"
                onClick={onOpenRenew}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded bg-[#bef500] hover:bg-[#a6d700] text-[#131313] font-['Sora'] text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(190,245,0,0.3)] cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">autorenew</span>
                <span>Renew Plan</span>
              </button>
            </div>
          </div>
        </div>

        {/* Key Metric Deck */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {/* Metric 1: Tier Status */}
          <div className="bg-[#1c1b1b] rounded-2xl p-5 flex flex-col justify-between shadow-md border border-white/[0.06]">
            <div className="flex items-center justify-between text-[#c3caac] mb-3">
              <span className="font-['Inter'] text-[11px] font-bold uppercase tracking-wider">
                Active Tier
              </span>
              <span className="material-symbols-outlined text-[#bef500]">verified</span>
            </div>
            <div>
              <div className="font-['Sora'] text-3xl text-white font-extrabold tracking-tight">
                {member.tierLabel}
              </div>
              <p className="font-['Inter'] text-xs text-[#c3caac] mt-1">
                Quarterly Commitment (3 Mo)
              </p>
            </div>
            <div className="mt-4 pt-2 flex items-center justify-between font-['JetBrains_Mono'] text-xs text-[#c3caac] bg-[#0e0e0e]/50 p-2 rounded-lg border border-white/[0.04]">
              <span>Tier: {member.level}</span>
              <span className="text-[#bef500] font-bold">Uncapped Sessions</span>
            </div>
          </div>

          {/* Metric 2: Timeline Dates */}
          <div className="bg-[#1c1b1b] rounded-2xl p-5 flex flex-col justify-between shadow-md border border-white/[0.06]">
            <div className="flex items-center justify-between text-[#c3caac] mb-3">
              <span className="font-['Inter'] text-[11px] font-bold uppercase tracking-wider">
                Cycle Period
              </span>
              <span className="material-symbols-outlined text-[#c6c6c7]">date_range</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-baseline justify-between">
                <span className="font-['JetBrains_Mono'] text-xs text-[#c3caac]">Started</span>
                <span className="font-['Sora'] text-sm sm:text-base text-white font-semibold">
                  {member.cycleStarted}
                </span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="font-['JetBrains_Mono'] text-xs text-[#c3caac]">Expiry</span>
                <span className="font-['Sora'] text-sm sm:text-base text-[#bef500] font-bold">
                  {member.cycleExpiry}
                </span>
              </div>
            </div>
            <div className="mt-4 pt-2 flex items-center justify-between font-['JetBrains_Mono'] text-xs text-[#c3caac] bg-[#0e0e0e]/50 p-2 rounded-lg border border-white/[0.04]">
              <span>Auto-Debit: {member.autoDebit ? 'ON' : 'OFF'}</span>
              <span className="text-[#c6c6c7]">Manual Renew</span>
            </div>
          </div>

          {/* Metric 3: Days Remaining & Burn Progress */}
          <div className="bg-[#1c1b1b] rounded-2xl p-5 flex flex-col justify-between shadow-md border border-white/[0.06]">
            <div className="flex items-center justify-between text-[#c3caac] mb-3">
              <span className="font-['Inter'] text-[11px] font-bold uppercase tracking-wider">
                Plan Longevity
              </span>
              <span className="material-symbols-outlined text-[#bef500]">hourglass_bottom</span>
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-['Sora'] text-3xl sm:text-4xl text-white font-extrabold">
                  {member.daysLeft}
                </span>
                <span className="font-['Sora'] text-sm sm:text-base text-[#bef500] uppercase font-bold">
                  Days Left
                </span>
              </div>
              {/* Progress bar */}
              <div className="w-full bg-[#353534] h-2 rounded-full mt-2.5 overflow-hidden">
                <div
                  className="bg-[#bef500] h-full rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(190,245,0,0.5)]"
                  style={{ width: `${100 - elapsedPercent}%` }}
                ></div>
              </div>
            </div>
            <div className="mt-4 pt-2 flex items-center justify-between font-['JetBrains_Mono'] text-xs text-[#c3caac] bg-[#0e0e0e]/50 p-2 rounded-lg border border-white/[0.04]">
              <span>
                {Math.max(0, member.totalDays - member.daysLeft)} of {member.totalDays} Days Used
              </span>
              <span className="text-[#bef500] font-bold">{elapsedPercent}% Elapsed</span>
            </div>
          </div>

          {/* Metric 4: Check-in Activity */}
          <div className="bg-[#1c1b1b] rounded-2xl p-5 flex flex-col justify-between shadow-md border border-white/[0.06]">
            <div className="flex items-center justify-between text-[#c3caac] mb-3">
              <span className="font-['Inter'] text-[11px] font-bold uppercase tracking-wider">
                Quarterly Momentum
              </span>
              <span className="material-symbols-outlined text-[#bef500]">fitness_center</span>
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-['Sora'] text-3xl sm:text-4xl text-white font-extrabold">
                  {member.checkins}
                </span>
                <span className="font-['Sora'] text-sm sm:text-base text-[#c6c6c7] uppercase">
                  Check-ins
                </span>
              </div>
              <p className="font-['Inter'] text-xs text-[#c3caac] mt-1">
                Top 8% consistency cohort this month
              </p>
            </div>
            <div className="mt-4 pt-2 flex items-center justify-between font-['JetBrains_Mono'] text-xs text-[#c3caac] bg-[#0e0e0e]/50 p-2 rounded-lg border border-white/[0.04]">
              <span>Avg: 4.8 visits/wk</span>
              <span className="text-[#bef500] font-bold">🔥 {member.streak}-day streak</span>
            </div>
          </div>
        </div>

        {/* Interactive Bento Section: Pass Card & Program Blueprints */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Gate Access Pass Interactive Card (4 cols) */}
          <div className="lg:col-span-5 xl:col-span-4 bg-[#1c1b1b] rounded-2xl p-6 flex flex-col justify-between shadow-xl relative overflow-hidden border border-white/[0.06]">
            <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-[#bef500]/10 blur-xl pointer-events-none"></div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#bef500] animate-ping"></span>
                  <span className="font-['Inter'] text-[11px] font-bold uppercase tracking-widest text-white">
                    RFID / OPTICAL TURNSTILE
                  </span>
                </div>
                <span className="text-[#c3caac] font-['JetBrains_Mono'] text-[10px] uppercase">
                  DYNAMIC ENCRYPTED
                </span>
              </div>
              <h2 className="font-['Sora'] text-xl text-white font-bold mt-1">Turnstile Pass</h2>
              <p className="font-['Inter'] text-xs text-[#c3caac] leading-relaxed">
                Hold against terminal scanner at Zone A, Locker Wing, or Recovery Pods.
              </p>
            </div>

            {/* Live QR Surface */}
            <div className="my-5 flex flex-col items-center justify-center p-6 bg-[#0e0e0e] rounded-xl border border-white/[0.06] shadow-inner">
              <div className="relative p-3 bg-white rounded-lg shadow-2xl flex items-center justify-center">
                {/* Precise QR Matrix SVG Representation */}
                <svg
                  className="w-44 h-44"
                  viewBox="0 0 100 100"
                  fill="#090909"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="5" y="5" width="26" height="26" rx="2" fill="#090909" />
                  <rect x="9" y="9" width="18" height="18" rx="1" fill="#FFFFFF" />
                  <rect x="13" y="13" width="10" height="10" fill="#090909" />

                  <rect x="69" y="5" width="26" height="26" rx="2" fill="#090909" />
                  <rect x="73" y="9" width="18" height="18" rx="1" fill="#FFFFFF" />
                  <rect x="77" y="13" width="10" height="10" fill="#090909" />

                  <rect x="5" y="69" width="26" height="26" rx="2" fill="#090909" />
                  <rect x="9" y="73" width="18" height="18" rx="1" fill="#FFFFFF" />
                  <rect x="13" y="77" width="10" height="10" fill="#090909" />

                  <rect x="36" y="8" width="5" height="5" />
                  <rect x="46" y="8" width="5" height="5" />
                  <rect x="56" y="8" width="5" height="5" />
                  <rect x="36" y="18" width="5" height="5" />
                  <rect x="50" y="18" width="12" height="5" />
                  <rect x="8" y="36" width="5" height="5" />
                  <rect x="18" y="36" width="10" height="5" />
                  <rect x="8" y="46" width="5" height="12" />
                  <rect x="18" y="50" width="8" height="5" />

                  {/* Center Core with Kinetic Logo Emblem */}
                  <rect x="35" y="35" width="30" height="30" rx="3" fill="#090909" />
                  <rect x="38" y="38" width="24" height="24" fill="#BEF500" />
                  <path
                    d="M44 44L56 56M56 44L44 56"
                    stroke="#090909"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  <rect x="36" y="72" width="6" height="6" />
                  <rect x="48" y="72" width="10" height="5" />
                  <rect x="64" y="72" width="5" height="15" />
                  <rect x="74" y="68" width="8" height="8" />
                  <rect x="86" y="72" width="6" height="6" />
                  <rect x="40" y="84" width="14" height="5" />
                  <rect x="74" y="84" width="12" height="6" />
                </svg>
                <div className="absolute inset-0 bg-[#bef500]/10 pointer-events-none rounded-lg animate-pulse"></div>
              </div>

              <div className="mt-3 flex items-center gap-2 text-[#c3caac] font-['JetBrains_Mono'] text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#bef500]"></span>
                <span>
                  TOKEN: <span className="text-[#bef500] font-bold">{currentToken}</span> (Exp in {tokenTimer}s)
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between bg-[#2a2a2a] p-3 rounded-lg border border-white/[0.06]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#bef500] text-lg">nfc</span>
                <span className="font-['JetBrains_Mono'] text-xs text-[#e5e2e1]">
                  Apple Wallet & Google Pay Ready
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopyKey}
                className="text-[#bef500] hover:text-white font-['Inter'] text-[11px] font-bold uppercase transition-colors cursor-pointer"
              >
                Copy Key
              </button>
            </div>
          </div>

          {/* Right Column: Performance Blueprints & Coaching Assets (8 cols) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-4">
            <div className="bg-[#1c1b1b] rounded-2xl p-6 shadow-md border border-white/[0.06]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                <div>
                  <span className="font-['Inter'] text-[11px] font-bold uppercase text-[#bef500] tracking-wider">
                    Assigned Directives
                  </span>
                  <h2 className="font-['Sora'] text-xl sm:text-2xl text-white font-bold mt-1">
                    Coaching Blueprints & Meal Architectures
                  </h2>
                </div>
                <span className="px-2.5 py-1 rounded bg-[#2a2a2a] text-[#c3caac] font-['JetBrains_Mono'] text-xs self-start sm:self-auto border border-white/[0.06]">
                  UPDATED 04 MAR 2025
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Download Guide Card 1 */}
                <div className="bg-[#201f1f] rounded-xl p-4 flex flex-col justify-between space-y-4 hover:bg-[#2a2a2a] transition-all border border-white/[0.06]">
                  <div className="flex items-start justify-between gap-3">
                    <div className="p-2.5 rounded bg-[#bef500]/10 text-[#bef500]">
                      <span className="material-symbols-outlined text-2xl">exercise</span>
                    </div>
                    <span className="font-['JetBrains_Mono'] text-xs text-[#c3caac]">
                      PDF · 14.8 MB
                    </span>
                  </div>
                  <div>
                    <span className="font-['Inter'] text-[10px] font-bold uppercase text-[#bef500] tracking-wider">
                      TRAINING PROTOCOL
                    </span>
                    <h3 className="font-['Sora'] text-base text-white font-bold mt-1">
                      Hypertrophy & S-Tier Power Phase 4
                    </h3>
                    <p className="font-['Inter'] text-xs text-[#c3caac] mt-1 leading-relaxed">
                      5-day split: Push/Pull/Legs heavy cluster sets engineered by Coach Vikram Rathore.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDownload('Hypertrophy_Phase_4_Marcus.pdf')}
                    className="w-full flex items-center justify-center gap-1.5 py-2 rounded bg-[#353534] hover:bg-[#bef500] hover:text-[#131313] text-white font-['Inter'] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">download</span>
                    <span>Download Routine (PDF)</span>
                  </button>
                </div>

                {/* Download Guide Card 2 */}
                <div className="bg-[#201f1f] rounded-xl p-4 flex flex-col justify-between space-y-4 hover:bg-[#2a2a2a] transition-all border border-white/[0.06]">
                  <div className="flex items-start justify-between gap-3">
                    <div className="p-2.5 rounded bg-[#bef500]/10 text-[#bef500]">
                      <span className="material-symbols-outlined text-2xl">nutrition</span>
                    </div>
                    <span className="font-['JetBrains_Mono'] text-xs text-[#c3caac]">
                      PDF · 8.2 MB
                    </span>
                  </div>
                  <div>
                    <span className="font-['Inter'] text-[10px] font-bold uppercase text-[#bef500] tracking-wider">
                      METABOLIC DIET MATRIX
                    </span>
                    <h3 className="font-['Sora'] text-base text-white font-bold mt-1">
                      Clean Macro Partitioning: 3,100 kcal
                    </h3>
                    <p className="font-['Inter'] text-xs text-[#c3caac] mt-1 leading-relaxed">
                      High bioavailability intake with timed peri-workout amino acid & carb loading schedule.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDownload('Diet_Macro_Blueprint_Marcus.pdf')}
                    className="w-full flex items-center justify-center gap-1.5 py-2 rounded bg-[#353534] hover:bg-[#bef500] hover:text-[#131313] text-white font-['Inter'] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">download</span>
                    <span>Download Macro Guide (PDF)</span>
                  </button>
                </div>
              </div>

              {/* Coach Check-in Micro Banner */}
              <div className="mt-4 p-4 rounded-xl bg-[#0e0e0e] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <img
                    alt="Head Coach Vikram Rathore"
                    className="w-11 h-11 rounded-full object-cover border border-[#bef500]/50"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDR0BwItttAWxfW-yG0DWXleQp04jtr4MM2VQRaBlZIzdGPhkM6S7Ph9V_yTbw3-8r9CQygy31kKTKhDJ3GArE36yO1Vi334KdznFzy_n7kVDUeRdq4nipa0wLVamxFRP9csXMfpPVEZTXFXsVnurrDIN31NnQ9hUEP5amimR9awLZNDgmFJSDBxgwpdubkf5C7SUgClt6aMYc21ntHmqrB0GkDtKuGOR9BbbC9tTc"
                  />
                  <div>
                    <h4 className="font-['Sora'] text-sm text-white font-bold">
                      Head Coach: Vikram Rathore
                    </h4>
                    <p className="font-['Inter'] text-xs text-[#c3caac]">
                      Next Biometric Assessment booked for Friday, 10:30 AM
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onOpenMessageCoach}
                  className="px-4 py-2 rounded bg-[#2a2a2a] hover:bg-[#353534] text-white font-['Inter'] text-xs font-bold uppercase tracking-wider transition-colors self-end sm:self-auto cursor-pointer border border-white/[0.06]"
                >
                  Message Coach
                </button>
              </div>
            </div>

            {/* Weekly Activity Breakdown with Animated Bars */}
            <div className="bg-[#1c1b1b] rounded-2xl p-6 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border border-white/[0.06]">
              <div className="space-y-1">
                <span className="font-['Inter'] text-[11px] font-bold uppercase text-[#c3caac] tracking-wider">
                  Weekly Caloric Burn
                </span>
                <div className="font-['Sora'] text-3xl sm:text-4xl text-white font-extrabold">
                  {member.weeklyCaloricBurn.toLocaleString('en-IN')}{' '}
                  <span className="text-[#bef500] text-lg font-normal">KCAL</span>
                </div>
                <p className="font-['Inter'] text-xs text-[#c3caac]">
                  Calibrated via XYZ Chest Straps & Smart Racks.
                </p>
              </div>

              {/* Inline Bar Chart Metric */}
              <div className="flex items-end gap-2.5 h-16 self-stretch sm:self-auto">
                {weeklyBurnDays.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center gap-1 group relative cursor-pointer"
                    title={`${item.day}: ${item.kcal} kcal`}
                  >
                    <div
                      className={`w-6 rounded-t transition-all group-hover:opacity-80 ${item.heightClass} ${
                        item.isToday
                          ? 'bg-[#bef500] shadow-[0_0_8px_rgba(190,245,0,0.3)]'
                          : 'bg-[#353534]'
                      }`}
                    ></div>
                    <span
                      className={`font-['JetBrains_Mono'] text-[10px] ${
                        item.isToday ? 'text-[#bef500] font-bold' : 'text-[#c3caac]'
                      }`}
                    >
                      {item.day}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Payment & Transaction History Ledger */}
        <div className="bg-[#1c1b1b] rounded-2xl p-6 sm:p-8 shadow-xl space-y-4 border border-white/[0.06]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#bef500] text-lg">receipt_long</span>
                <span className="font-['Inter'] text-[11px] font-bold uppercase text-[#bef500] tracking-wider">
                  Audit Log
                </span>
              </div>
              <h2 className="font-['Sora'] text-2xl text-white font-bold mt-1">
                Transaction & Billing History
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-['JetBrains_Mono'] text-xs text-[#c3caac]">
                Total Invoiced: ₹{totalInvoiced.toLocaleString('en-IN')}
              </span>
              <button
                type="button"
                onClick={() => onShowToast('Exporting All Invoices (Zip)...')}
                className="px-3.5 py-1.5 rounded bg-[#2a2a2a] hover:bg-[#353534] text-white font-['Inter'] text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1 cursor-pointer border border-white/[0.06]"
              >
                <span className="material-symbols-outlined text-sm">archive</span>
                <span>Export All</span>
              </button>
            </div>
          </div>

          {/* High Density Modern Data Table */}
          <div className="overflow-x-auto rounded-xl border border-white/[0.06]">
            <table className="w-full text-left font-['Inter'] text-xs sm:text-sm">
              <thead className="bg-[#0e0e0e] text-[#c3caac] font-['Inter'] text-[11px] font-bold uppercase tracking-widest border-b border-white/[0.06]">
                <tr>
                  <th className="py-3 px-4">Invoice #</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Subscription Tier</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Payment Gateway</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {transactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className="bg-[#201f1f]/60 hover:bg-[#2a2a2a]/80 transition-colors"
                  >
                    <td className="py-3.5 px-4 font-['JetBrains_Mono'] text-white font-bold">
                      {tx.id}
                    </td>
                    <td className="py-3.5 px-4 text-[#e5e2e1]">{tx.date}</td>
                    <td className="py-3.5 px-4 font-semibold text-white">{tx.tierName}</td>
                    <td className="py-3.5 px-4 font-['JetBrains_Mono'] text-white font-bold">
                      ₹{tx.amount.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1.5 text-[#e5e2e1]">
                        <span className="w-2 h-2 rounded-full bg-[#bef500]"></span>
                        {tx.gateway}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#bef500]/15 text-[#bef500] font-['Inter'] text-[10px] font-bold tracking-wider uppercase border border-[#bef500]/30">
                        <span className="material-symbols-outlined text-[12px]">check_circle</span>
                        Verified Success
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleDownload(`${tx.id}.pdf`)}
                        className="px-2.5 py-1 rounded bg-[#353534] hover:bg-[#bef500] hover:text-[#131313] text-[#e5e2e1] font-['Inter'] text-xs font-bold uppercase transition-colors inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[13px]">picture_as_pdf</span>
                        <span>PDF</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-[#c3caac] font-['JetBrains_Mono'] text-xs">
            <span>
              Displaying {transactions.length} recorded transactions · Tax Invoices GSTIN: 29AABCU9603R1ZX
            </span>
            <span className="text-[#bef500]">
              Need custom billing address? Contact front desk concierge.
            </span>
          </div>
        </div>

        {/* Facility Floor Cam & Capacity Telemetry Banner */}
        <div className="rounded-2xl bg-[#1c1b1b] p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md border border-white/[0.06]">
          <div className="space-y-1">
            <span className="font-['Inter'] text-[11px] font-bold uppercase text-[#bef500] tracking-wider">
              Facility Live Radar
            </span>
            <h3 className="font-['Sora'] text-xl text-white font-bold">
              Current Facility Load: {facilityOccupancy} / 60 Peak Capacity
            </h3>
            <p className="font-['Inter'] text-xs sm:text-sm text-[#c3caac]">
              Recommended training window: Now through 6:30 PM for zero equipment queue times.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="font-['Sora'] text-lg text-[#bef500] font-extrabold">OPTIMAL</div>
              <span className="font-['JetBrains_Mono'] text-xs text-[#c3caac]">Main Floor Free</span>
            </div>
            <div className="w-12 h-12 rounded-full bg-[#2a2a2a] flex items-center justify-center text-[#bef500] border border-white/[0.08]">
              <span className="material-symbols-outlined text-2xl">speed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
