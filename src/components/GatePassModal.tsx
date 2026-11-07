import React, { useState } from 'react';
import { MemberProfile } from '../types';
import { playTurnstileBeep } from '../data/mockData';

interface GatePassModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: MemberProfile;
  onTurnstileScan: (zone: string) => void;
}

export const GatePassModal: React.FC<GatePassModalProps> = ({
  isOpen,
  onClose,
  member,
  onTurnstileScan,
}) => {
  const [selectedZone, setSelectedZone] = useState('Zone A Main Deck');
  const [isBeeping, setIsBeeping] = useState(false);

  if (!isOpen) return null;

  const handleSimulateEntry = () => {
    setIsBeeping(true);
    playTurnstileBeep();
    onTurnstileScan(selectedZone);
    setTimeout(() => {
      setIsBeeping(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0e0e0e]/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#201f1f] rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-white/[0.08] animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#c3caac] hover:text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        <div className="text-center space-y-1 mt-1">
          <span className="inline-block px-3 py-0.5 rounded-full bg-[#bef500]/20 text-[#bef500] font-['Inter'] text-[11px] font-bold tracking-widest uppercase">
            TURNSTILE UNLOCK TOKEN
          </span>
          <h3 className="font-['Sora'] text-2xl text-white font-bold">{member.name}</h3>
          <p className="font-['JetBrains_Mono'] text-xs text-[#c3caac]">
            MEMBER ID {member.id} · {member.tier} TIER
          </p>
        </div>

        {/* QR Code and NFC Beam Surface */}
        <div className="my-5 p-6 bg-[#0e0e0e] rounded-xl flex flex-col items-center justify-center space-y-4 border border-white/[0.06] shadow-inner relative overflow-hidden">
          {/* NFC Wave Animation */}
          <div className="absolute top-3 w-16 h-16 rounded-full bg-[#bef500]/10 animate-ping pointer-events-none"></div>

          <div className="p-4 bg-white rounded-xl relative shadow-2xl">
            {/* High-Contrast Precise QR Matrix SVG */}
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

              <circle cx="50" cy="50" r="13" fill="#BEF500" />
              <path
                d="M45 45L55 55M55 45L45 55"
                stroke="#090909"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              <rect x="36" y="8" width="5" height="5" />
              <rect x="46" y="8" width="5" height="5" />
              <rect x="56" y="8" width="5" height="5" />
              <rect x="36" y="18" width="5" height="5" />
              <rect x="50" y="18" width="12" height="5" />

              <rect x="8" y="36" width="5" height="5" />
              <rect x="18" y="36" width="10" height="5" />
              <rect x="8" y="46" width="5" height="12" />
              <rect x="18" y="50" width="8" height="5" />

              <rect x="36" y="72" width="6" height="6" />
              <rect x="48" y="72" width="10" height="5" />
              <rect x="64" y="72" width="5" height="15" />
              <rect x="74" y="68" width="8" height="8" />
              <rect x="86" y="72" width="6" height="6" />
              <rect x="40" y="84" width="14" height="5" />
              <rect x="74" y="84" width="12" height="6" />
            </svg>
          </div>

          <div className="text-center">
            <div className="font-['Sora'] text-base text-[#bef500] font-bold tracking-wider">
              HOLD NEAR SENSOR
            </div>
            <p className="font-['Inter'] text-xs text-[#c3caac]/80 mt-0.5">
              Encrypted 13.56MHz RFID Beam Broadcast
            </p>
          </div>
        </div>

        {/* Turnstile Zone Selector */}
        <div className="mb-4">
          <label className="block font-['Inter'] text-[11px] uppercase tracking-wider text-[#c3caac] font-bold mb-1.5">
            Target Optical Gate:
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              'Zone A Main Deck',
              'Locker Wing',
              'Recovery Pods',
            ].map((zone) => (
              <button
                key={zone}
                type="button"
                onClick={() => setSelectedZone(zone)}
                className={`py-1.5 px-2 rounded text-xs font-['Inter'] transition-colors text-center cursor-pointer ${
                  selectedZone === zone
                    ? 'bg-[#bef500] text-[#131313] font-bold'
                    : 'bg-[#1c1b1b] text-white hover:bg-[#2a2a2a]'
                }`}
              >
                {zone.split(' ')[0]} {zone.split(' ')[1] || ''}
              </button>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <button
          type="button"
          disabled={isBeeping}
          onClick={handleSimulateEntry}
          className={`w-full py-3 rounded font-['Sora'] text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
            isBeeping
              ? 'bg-[#bef500] text-[#131313] shadow-[0_0_24px_rgba(190,245,0,0.6)] animate-pulse'
              : 'bg-[#bef500] hover:bg-[#a6d700] text-[#131313] shadow-[0_0_20px_rgba(190,245,0,0.3)]'
          }`}
        >
          <span className="material-symbols-outlined text-lg">
            {isBeeping ? 'sensors' : 'tap_and_play'}
          </span>
          <span>{isBeeping ? 'Unlocking Optical Gate...' : `Simulate ${selectedZone} Entry`}</span>
        </button>

        <p className="text-center font-['JetBrains_Mono'] text-[10px] text-[#c3caac]/60 mt-3">
          Compatible with Apple Wallet, WearOS & NFC Turnstiles
        </p>
      </div>
    </div>
  );
};
