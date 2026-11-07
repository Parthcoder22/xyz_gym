import React, { useState } from 'react';
import { MemberProfile } from '../types';
import { Logo } from './Logo';

interface HeaderProps {
  activeView: string;
  onNavigate: (view: string) => void;
  member: MemberProfile;
}

export const Header: React.FC<HeaderProps> = ({ activeView, onNavigate, member }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'programs', label: 'Programs' },
    { id: 'trainers', label: 'Trainers' },
    { id: 'membership', label: 'Membership' },
    { id: 'contact', label: 'Contact' },
    { id: 'member-portal', label: 'Member Portal' },
  ];

  const handleLinkClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0e0e0e]/95 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_1px_8px_rgba(0,0,0,0.6)]">
      <div className="h-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center text-left cursor-pointer group focus:outline-none"
            aria-label="XYZ GYM Home"
          >
            <Logo size="md" />
          </button>

          <span className="hidden lg:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#2a2a2a] text-[#bef500] font-['Inter'] text-[11px] font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#bef500] animate-pulse"></span>
            DEMO MODE
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = activeView === link.id;
            return (
              <button
                key={link.id}
                onClick={(e) => handleLinkClick(link.id, e)}
                className={`font-['Inter'] text-[12px] uppercase tracking-wider py-2 transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'text-[#bef500] border-b-2 border-[#bef500] font-bold'
                    : 'text-[#c3caac]/80 hover:text-white font-medium'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right CTA & Profile Quick-Access */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate(activeView === 'admin-overview' ? 'member-portal' : 'admin-overview')}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded transition-all font-['JetBrains_Mono'] text-xs cursor-pointer ${
              activeView === 'admin-overview'
                ? 'bg-[#bef500] text-[#131313] font-bold shadow-[0_0_12px_rgba(190,245,0,0.4)]'
                : 'bg-[#2a2a2a] hover:bg-[#353534] text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[16px] text-inherit">
              admin_panel_settings
            </span>
            <span>{activeView === 'admin-overview' ? 'Exit Admin' : 'Admin Portal'}</span>
          </button>

          <button
            onClick={() => onNavigate('member-portal')}
            className="flex items-center gap-2 pl-2 bg-[#1c1b1b] hover:bg-[#201f1f] py-1 px-2.5 rounded-full border border-white/[0.08] transition-all cursor-pointer"
          >
            <div className="hidden md:flex flex-col text-right">
              <span className="font-['Inter'] text-[11px] uppercase text-white font-bold leading-none">
                {member.name}
              </span>
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#bef500] font-medium">
                {member.tier} Member
              </span>
            </div>
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover border border-[#bef500]/40 shadow-sm"
              src={member.avatarUrl}
            />
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded bg-[#201f1f] text-white hover:text-[#bef500] transition-colors"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0e0e0e] border-t border-white/[0.08] px-6 py-4 space-y-2 animate-fadeIn">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={(e) => handleLinkClick(link.id, e)}
              className={`w-full text-left font-['Inter'] text-sm uppercase tracking-wider py-2.5 px-3 rounded transition-colors ${
                activeView === link.id
                  ? 'bg-[#201f1f] text-[#bef500] font-bold'
                  : 'text-[#e5e2e1] hover:bg-[#1c1b1b]'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onNavigate('admin-overview');
            }}
            className="w-full text-left font-['JetBrains_Mono'] text-xs uppercase tracking-wider py-2.5 px-3 rounded bg-[#2a2a2a] text-[#bef500] flex items-center justify-between"
          >
            <span>Admin Control Dash</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      )}
    </header>
  );
};
