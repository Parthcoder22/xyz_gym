import React from 'react';
import { MemberProfile } from '../types';
import { Logo } from './Logo';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: MemberProfile;
  onNavigate: (view: string) => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  member,
  onNavigate,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0e0e0e]/90 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="bg-[#201f1f] max-w-lg w-full rounded-2xl p-6 sm:p-8 shadow-2xl relative text-center border border-white/[0.08] animate-in fade-in zoom-in-95 duration-200">
        <div className="w-16 h-16 rounded-full bg-[#bef500]/20 text-[#bef500] flex items-center justify-center mx-auto mb-4 border border-[#bef500]/40 shadow-[0_0_20px_rgba(190,245,0,0.2)]">
          <span className="material-symbols-outlined text-3xl">check_circle</span>
        </div>

        <span className="px-3 py-1 rounded-full bg-[#bef500]/20 text-[#bef500] font-['Inter'] text-[11px] font-bold uppercase tracking-wider inline-block mb-1">
          TRANSACTION SIMULATED SUCCESSFULLY
        </span>

        <h3 className="font-['Sora'] text-2xl uppercase text-white font-extrabold mt-1">
          ACCESS TOKEN ISSUED
        </h3>
        <p className="font-['Inter'] text-xs sm:text-sm text-[#c3caac] mt-1 mb-6">
          Your high-performance athletic profile has been populated into the facility ledger.
        </p>

        {/* Digital Pass Card */}
        <div className="bg-[#0e0e0e] p-5 rounded-xl text-left space-y-3 mb-6 shadow-inner relative overflow-hidden border border-white/[0.08]">
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-[#bef500]/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="flex items-center justify-between">
            <Logo size="sm" />
            <span className="px-2.5 py-0.5 rounded bg-[#bef500] text-[#131313] font-['Inter'] text-[11px] font-bold uppercase">
              {member.tier} MEMBER
            </span>
          </div>

          <div>
            <span className="font-['JetBrains_Mono'] text-xs text-[#c3caac] block">
              MEMBER ID & TOKEN
            </span>
            <span className="font-['Sora'] text-2xl text-[#bef500] font-mono tracking-widest font-extrabold">
              {member.id}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/[0.06] font-['JetBrains_Mono'] text-xs">
            <div>
              <span className="text-[#c3caac] block text-[10px]">START DATE</span>
              <span className="text-white font-semibold">{member.cycleStarted}</span>
            </div>
            <div>
              <span className="text-[#c3caac] block text-[10px]">EXPIRY DATE</span>
              <span className="text-white font-semibold">{member.cycleExpiry}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => {
              onClose();
              onNavigate('member-portal');
            }}
            className="py-3 px-4 rounded bg-[#bef500] hover:bg-[#a6d700] text-[#131313] font-['Inter'] text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(190,245,0,0.3)] transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">person</span>
            <span>Go to Member Portal</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onNavigate('admin-overview');
            }}
            className="py-3 px-4 rounded bg-[#2a2a2a] hover:bg-[#353534] text-white font-['Inter'] text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-white/[0.08]"
          >
            <span className="material-symbols-outlined text-sm">dashboard</span>
            <span>View Admin Ledger</span>
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-4 text-[#c3caac]/70 hover:text-white font-['Inter'] text-[11px] uppercase tracking-wider cursor-pointer"
        >
          Dismiss Notice
        </button>
      </div>
    </div>
  );
};
