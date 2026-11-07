import React from 'react';
import { ProgramItem } from '../types';

interface ProgramModalProps {
  program: ProgramItem | null;
  isOpen: boolean;
  onClose: () => void;
  onEnroll: () => void;
}

export const ProgramModal: React.FC<ProgramModalProps> = ({
  program,
  isOpen,
  onClose,
  onEnroll,
}) => {
  if (!isOpen || !program) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0e0e0e]/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#1c1b1b] max-w-lg w-full rounded-2xl p-6 sm:p-8 shadow-2xl relative border border-white/[0.08] animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#c3caac] hover:text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        <span className="inline-block px-3 py-0.5 rounded bg-[#201f1f] font-['JetBrains_Mono'] text-xs text-[#bef500] font-semibold border border-white/[0.06]">
          INTENSITY LEVEL: {program.intensity}
        </span>

        <h3 className="font-['Sora'] text-2xl uppercase text-white font-bold mt-2">
          {program.title}
        </h3>
        <p className="font-['Inter'] text-xs font-bold text-[#c3caac] uppercase tracking-wider mt-1">
          {program.focus} · {program.sessionsPerWeek}
        </p>

        <div className="my-5 p-4 bg-[#201f1f] rounded-xl space-y-3 font-['Inter'] text-sm border border-white/[0.06]">
          <p className="text-[#e5e2e1] leading-relaxed">{program.fullDesc}</p>
          <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs font-['JetBrains_Mono'] text-[#c3caac]">
            <span>Code Reference: {program.code}</span>
            <span className="text-[#bef500]">Telemetry Tracked</span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded bg-[#2a2a2a] hover:bg-[#353534] text-white font-['Inter'] text-xs uppercase tracking-wider cursor-pointer transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onEnroll();
            }}
            className="px-5 py-2.5 rounded bg-[#bef500] hover:bg-[#a6d700] text-[#131313] font-['Inter'] text-xs uppercase font-bold tracking-wider cursor-pointer shadow-[0_0_15px_rgba(190,245,0,0.3)] transition-all"
          >
            Enroll In Protocol
          </button>
        </div>
      </div>
    </div>
  );
};
