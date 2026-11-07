import React from 'react';
import { Logo } from './Logo';

interface FooterProps {
  onNavigate: (view: string) => void;
  facilityOccupancy?: number;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, facilityOccupancy = 42 }) => {
  return (
    <footer className="w-full bg-[#0e0e0e] text-[#c3caac] border-t border-white/[0.06] mt-auto">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="space-y-3">
            <Logo size="sm" />
            <p className="font-['Inter'] text-xs text-[#c3caac]/80 leading-relaxed">
              Elite athletic club and performance training center engineered for human supremacy. High-voltage training ecosystems.
            </p>
            <div className="flex items-center gap-2 font-['Inter'] text-[11px] font-bold text-[#bef500] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#bef500] animate-ping"></span>
              FACILITY OPERATIONAL · 24/7 ACCESS
            </div>
          </div>

          <div>
            <h4 className="font-['Inter'] text-xs uppercase text-white font-bold mb-3 tracking-widest">
              Quick Navigation
            </h4>
            <ul className="space-y-2 font-['Inter'] text-xs">
              <li>
                <button
                  onClick={() => onNavigate('programs')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Performance Programs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('trainers')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Master Trainers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('membership')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Tiered Membership
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('member-portal')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Member Space
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-['Inter'] text-xs uppercase text-white font-bold mb-3 tracking-widest">
              Portals & Access
            </h4>
            <ul className="space-y-2 font-['Inter'] text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Public Web
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('member-portal')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Member Portal
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('admin-overview')}
                  className="hover:text-[#bef500] transition-colors cursor-pointer flex items-center gap-1 text-white font-semibold"
                >
                  <span>Admin Operations</span>
                  <span className="material-symbols-outlined text-[13px]">arrow_outward</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Location & Inquiries
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-['Inter'] text-xs uppercase text-white font-bold mb-3 tracking-widest">
              System Status
            </h4>
            <div className="p-3 bg-[#1c1b1b] rounded-lg border border-white/[0.06] space-y-2 font-['JetBrains_Mono'] text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#c3caac]/80">Environment</span>
                <span className="text-[#bef500] uppercase font-bold">Demo Sandbox</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#c3caac]/80">Live Load</span>
                <span className="text-white font-semibold">
                  {Math.round((facilityOccupancy / 60) * 100)}% Occupancy ({facilityOccupancy}/60)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#c3caac]/80">Telemetry</span>
                <span className="text-[#bef500]">Online (v3.2)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4 text-[#c3caac]/70 font-['JetBrains_Mono'] text-[11px]">
          <p>© 2025 XYZ GYM PERFORMANCE INC. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">PRIVACY</span>
            <span className="hover:text-white transition-colors cursor-pointer">TERMS</span>
            <span className="hover:text-white transition-colors cursor-pointer">HEALTH CLEARANCE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
