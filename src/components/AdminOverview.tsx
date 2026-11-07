import React, { useState } from 'react';
import { MemberProfile, Transaction, GateLog } from '../types';

interface AdminOverviewProps {
  member: MemberProfile;
  transactions: Transaction[];
  gateLogs: GateLog[];
  facilityOccupancy: number;
  onUpdateOccupancy: (val: number) => void;
  onExtendMember: (days: number) => void;
  onNavigate: (view: string) => void;
  onShowToast: (msg: string) => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({
  member,
  transactions,
  gateLogs,
  facilityOccupancy,
  onUpdateOccupancy,
  onExtendMember,
  onNavigate,
  onShowToast,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'PRO' | 'ELITE' | 'BASIC'>('ALL');

  const totalRevenue = transactions.reduce((sum, tx) => sum + tx.amount, 0);

  // Mock staff member list including current active member
  const allMembers: MemberProfile[] = [
    member,
    {
      id: '#XYZ-1022',
      name: 'Devin Mercer',
      email: 'devin@perftest.io',
      phone: '+91 98765 11022',
      tier: 'ELITE',
      tierLabel: 'ELITE TIER',
      cycleStarted: '01 Jan 2025',
      cycleExpiry: '01 Jan 2026',
      daysLeft: 312,
      totalDays: 365,
      checkins: 89,
      streak: 22,
      zoneAccess: 'ALL ZONES + VIP SUITE (24/7)',
      avatarUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDS1Ll6sJDjIL3SVc-vjN3eXXYplhxmOd9-FIfTKIi5ACoydheCFZLD1PVNrX08XDimNioeRMrZrz37ogimHwQirHvrpLPmo2tfJ2rOAZdu3EpEWoQs4o7lO7LlPdtLVB9FHYZOnzCdPAj3SE7aUNtJv92MCb0hwfDG8zLVzj-cbIuj9jGV7M7EtZ2ZjJYJI6OWQxFsXVta8aqsPphEpE8RGmsmNq37sgPR1Huldz0',
      autoDebit: true,
      weeklyCaloricBurn: 5400,
      level: 'Level 5 Master',
    },
    {
      id: '#XYZ-0041',
      name: 'Elena Rostova',
      email: 'elena@perftest.io',
      phone: '+91 98765 00041',
      tier: 'PRO',
      tierLabel: 'PRO TIER',
      cycleStarted: '10 Feb 2025',
      cycleExpiry: '10 May 2025',
      daysLeft: 56,
      totalDays: 90,
      checkins: 38,
      streak: 9,
      zoneAccess: 'ZONE 1 ACCESS (24/7)',
      avatarUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCGh43ehkq5KrDguuuIZ6Qr6-fMcZz6LSMrGgsQFZf2DXqeE8cI6I0QBZim4E6pe66Zqc3RDNfZ_7QuVXIks1ZP6TXoZywjDxMecyJZ69tdxym2e4pWRtESI-CnNTYnVkBPiKFpzmmj9-qCL-osedqp_0HiXZDcdVXbjDSW-KYqR8wDxi-u0xuRy5_5NUD6PtG0gvLbJi1yOY4LMWb90vX0oNTuUFx9Gy-069lr2sc',
      autoDebit: false,
      weeklyCaloricBurn: 4100,
      level: 'Level 4 Coach',
    },
    {
      id: '#XYZ-6512',
      name: 'Rohan Sharma',
      email: 'rohan.s@gmail.com',
      phone: '+91 98765 65120',
      tier: 'BASIC',
      tierLabel: 'BASIC TIER',
      cycleStarted: '01 Mar 2025',
      cycleExpiry: '01 Apr 2025',
      daysLeft: 12,
      totalDays: 30,
      checkins: 11,
      streak: 3,
      zoneAccess: 'ZONE 1 ACCESS',
      avatarUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAWvmb1cQLzuyKoPpoTeQCtm8kRvGA85VkiNuu00HwO0xeCWdBkIGxyNaGtcZ8DgsUk0jvlUJgC5_yrzMlS4gXXoQznr3HPZL8T6L18jiRT12uMT-BPILbjLoQp6K10xG96fsyDHCkylXNKGsR1K3BXSbqvhTf3xLEDCwRcJNAhcQCecjoFW08jI31wFEjDKDvgbCpm3o-cTblqpIGF6ixvzHm3NVu4u1isTNI_ETc',
      autoDebit: false,
      weeklyCaloricBurn: 2800,
      level: 'Level 1 Athlete',
    },
  ];

  const filteredMembers = allMembers.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'ALL' || m.tier === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex flex-col w-full text-[#e5e2e1]">
      {/* Admin Top Telemetry Ribbon */}
      <div className="w-full bg-[#0e0e0e] border-b border-white/[0.06] px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#bef500] text-[#131313] font-['Inter'] text-[11px] font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#131313] animate-pulse"></span>
            ADMIN CONSOLE // FACILITY OPERATIONS
          </span>
          <span className="text-[#c3caac] font-['JetBrains_Mono'] text-xs hidden md:inline">
            FIRMWARE v4.12 · SECURE RFID GATE CONTROLLER · SERVER ONLINE
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('member-portal')}
            className="px-3 py-1 rounded bg-[#2a2a2a] hover:bg-[#353534] text-white font-['Inter'] text-[11px] font-bold uppercase tracking-wider transition-colors flex items-center gap-1 cursor-pointer border border-white/[0.08]"
          >
            <span>Back to Member View</span>
            <span className="material-symbols-outlined text-[13px]">arrow_back</span>
          </button>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Metric Overview Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#1c1b1b] rounded-2xl p-5 border border-white/[0.06] shadow-md flex flex-col justify-between">
            <span className="font-['Inter'] text-[11px] font-bold uppercase tracking-wider text-[#c3caac]">
              Total Invoiced Revenue
            </span>
            <div className="my-2">
              <span className="font-['Sora'] text-3xl font-extrabold text-[#bef500]">
                ₹{totalRevenue.toLocaleString('en-IN')}
              </span>
              <span className="font-['Inter'] text-xs text-[#c3caac] block mt-0.5">
                {transactions.length} verified transactions
              </span>
            </div>
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#bef500]">
              +100% test sandbox settlement
            </span>
          </div>

          <div className="bg-[#1c1b1b] rounded-2xl p-5 border border-white/[0.06] shadow-md flex flex-col justify-between">
            <span className="font-['Inter'] text-[11px] font-bold uppercase tracking-wider text-[#c3caac]">
              Live Facility Capacity
            </span>
            <div className="my-2">
              <div className="flex items-baseline gap-2">
                <span className="font-['Sora'] text-3xl font-extrabold text-white">
                  {facilityOccupancy}
                </span>
                <span className="font-['JetBrains_Mono'] text-xs text-[#c3caac]">/ 60 Athletes</span>
              </div>
              <input
                type="range"
                min="0"
                max="60"
                value={facilityOccupancy}
                onChange={(e) => onUpdateOccupancy(Number(e.target.value))}
                className="w-full mt-2 accent-[#bef500] cursor-pointer"
              />
            </div>
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#c3caac]">
              Drag to simulate real-time load
            </span>
          </div>

          <div className="bg-[#1c1b1b] rounded-2xl p-5 border border-white/[0.06] shadow-md flex flex-col justify-between">
            <span className="font-['Inter'] text-[11px] font-bold uppercase tracking-wider text-[#c3caac]">
              Active RFID Turnstiles
            </span>
            <div className="my-2">
              <span className="font-['Sora'] text-3xl font-extrabold text-white">4 / 4 ONLINE</span>
              <span className="font-['Inter'] text-xs text-[#c3caac] block mt-0.5">
                Zone A, Zone B, Locker, Sauna
              </span>
            </div>
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#bef500]">
              Latency: 18ms · Zero Dropouts
            </span>
          </div>

          <div className="bg-[#1c1b1b] rounded-2xl p-5 border border-white/[0.06] shadow-md flex flex-col justify-between">
            <span className="font-['Inter'] text-[11px] font-bold uppercase tracking-wider text-[#c3caac]">
              Fast Operations
            </span>
            <div className="my-2 space-y-1.5">
              <button
                type="button"
                onClick={() => {
                  onExtendMember(30);
                  onShowToast('Staff Override: Added +30 Days to active athlete!');
                }}
                className="w-full py-1.5 px-3 rounded bg-[#2a2a2a] hover:bg-[#bef500] hover:text-[#131313] text-white font-['Inter'] text-xs font-bold uppercase tracking-wider transition-colors text-left flex items-center justify-between cursor-pointer border border-white/[0.06]"
              >
                <span>+30 Days Courtesy</span>
                <span className="material-symbols-outlined text-sm">add_circle</span>
              </button>
              <button
                type="button"
                onClick={() => onShowToast('Turnstile hardware ping: All 4 gates acknowledge ping signal.')}
                className="w-full py-1.5 px-3 rounded bg-[#2a2a2a] hover:bg-[#353534] text-white font-['Inter'] text-xs font-bold uppercase tracking-wider transition-colors text-left flex items-center justify-between cursor-pointer border border-white/[0.06]"
              >
                <span>Ping RFID Gates</span>
                <span className="material-symbols-outlined text-sm">network_check</span>
              </button>
            </div>
          </div>
        </div>

        {/* Live Turnstile Scans Feed & Member Directory Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Real-time Gate Entry Feed (4 cols) */}
          <div className="lg:col-span-5 bg-[#1c1b1b] rounded-2xl p-6 border border-white/[0.06] shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#bef500] animate-ping"></span>
                  <h3 className="font-['Sora'] text-lg uppercase text-white font-bold">
                    Live Optical Scans
                  </h3>
                </div>
                <span className="font-['JetBrains_Mono'] text-xs text-[#bef500]">REAL-TIME</span>
              </div>
              <p className="font-['Inter'] text-xs text-[#c3caac] mb-4">
                Telemetry streaming from optical gate sensors and turnstile bar readers.
              </p>

              <div className="space-y-2.5">
                {gateLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-3 bg-[#0e0e0e] rounded-xl border border-white/[0.06] flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-['Sora'] text-xs font-bold text-white">
                          {log.memberName}
                        </span>
                        <span className="font-['JetBrains_Mono'] text-[10px] text-[#c3caac]">
                          {log.memberId}
                        </span>
                      </div>
                      <div className="font-['Inter'] text-[11px] text-[#c3caac]/80 mt-0.5 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-xs text-[#bef500]">
                          meeting_room
                        </span>
                        <span>{log.zone}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-2 py-0.5 rounded bg-[#bef500]/20 text-[#bef500] font-['JetBrains_Mono'] text-[10px] font-bold">
                        {log.status}
                      </span>
                      <span className="block font-['JetBrains_Mono'] text-[10px] text-[#c3caac]/60 mt-1">
                        {log.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-[#c3caac] font-['JetBrains_Mono']">
              <span>Automatic RFID Handshake</span>
              <span className="text-[#bef500]">Security L4</span>
            </div>
          </div>

          {/* Member Roster & Subscription Management (7 cols) */}
          <div className="lg:col-span-7 bg-[#1c1b1b] rounded-2xl p-6 border border-white/[0.06] shadow-md space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-['Sora'] text-xl uppercase text-white font-bold">
                  Athletic Registry & Passes
                </h3>
                <p className="font-['Inter'] text-xs text-[#c3caac]">
                  Active credentials, longevity quotas, and telemetry assignments.
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1 bg-[#0e0e0e] p-1 rounded-lg border border-white/[0.06]">
                {(['ALL', 'PRO', 'ELITE', 'BASIC'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSelectedFilter(t)}
                    className={`px-2.5 py-1 rounded text-xs font-['Inter'] uppercase transition-colors cursor-pointer ${
                      selectedFilter === t
                        ? 'bg-[#bef500] text-[#131313] font-bold'
                        : 'text-[#c3caac] hover:text-white'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Input */}
            <div>
              <input
                type="text"
                placeholder="Search by member name, ID, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0e0e0e] text-white px-3.5 py-2.5 rounded-lg font-['Inter'] text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#bef500] border border-white/[0.08]"
              />
            </div>

            {/* Member List Table */}
            <div className="overflow-x-auto rounded-xl border border-white/[0.06]">
              <table className="w-full text-left font-['Inter'] text-xs sm:text-sm">
                <thead className="bg-[#0e0e0e] text-[#c3caac] font-['Inter'] text-[11px] font-bold uppercase tracking-wider border-b border-white/[0.06]">
                  <tr>
                    <th className="py-3 px-3">Athlete</th>
                    <th className="py-3 px-3">ID / Tier</th>
                    <th className="py-3 px-3">Quota Left</th>
                    <th className="py-3 px-3">Check-ins</th>
                    <th className="py-3 px-3 text-right">Quick Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {filteredMembers.map((m) => (
                    <tr
                      key={m.id}
                      className="bg-[#201f1f]/50 hover:bg-[#2a2a2a]/80 transition-colors"
                    >
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2.5">
                          <img
                            alt={m.name}
                            className="w-8 h-8 rounded-full object-cover border border-[#bef500]/40"
                            src={m.avatarUrl}
                          />
                          <div>
                            <span className="font-['Sora'] text-xs font-bold text-white block">
                              {m.name}
                            </span>
                            <span className="font-['Inter'] text-[10px] text-[#c3caac]/70">
                              {m.email}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="font-['JetBrains_Mono'] text-xs text-white block">
                          {m.id}
                        </span>
                        <span className="inline-block px-1.5 py-0.2 rounded bg-[#bef500]/15 text-[#bef500] font-['Inter'] text-[9px] font-bold">
                          {m.tier}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-['JetBrains_Mono'] text-xs">
                        <span className="text-[#bef500] font-bold">{m.daysLeft}d</span> /{' '}
                        <span className="text-[#c3caac]/70">{m.totalDays}d</span>
                      </td>
                      <td className="py-3 px-3 font-['JetBrains_Mono'] text-xs text-white">
                        {m.checkins} visits
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          type="button"
                          onClick={() => {
                            onExtendMember(30);
                            onShowToast(`Extended +30 days for ${m.name}`);
                          }}
                          className="px-2 py-1 rounded bg-[#353534] hover:bg-[#bef500] hover:text-[#131313] text-[#e5e2e1] font-['Inter'] text-[11px] font-bold uppercase transition-colors inline-flex items-center gap-1 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[13px]">add</span>
                          <span>+30d</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
