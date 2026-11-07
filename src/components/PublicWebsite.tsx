import React, { useState } from 'react';
import { MembershipTier, ProgramItem, TrainerItem } from '../types';
import { PROGRAMS, TRAINERS } from '../data/mockData';

interface PublicWebsiteProps {
  onOpenCheckout: (tier: MembershipTier) => void;
  onOpenProgram: (program: ProgramItem) => void;
  onShowToast: (msg: string) => void;
}

export const PublicWebsite: React.FC<PublicWebsiteProps> = ({
  onOpenCheckout,
  onOpenProgram,
  onShowToast,
}) => {
  const [tourName, setTourName] = useState('');
  const [tourPhone, setTourPhone] = useState('');
  const [tourEmail, setTourEmail] = useState('');
  const [tourFocus, setTourFocus] = useState('strength');
  const [tourNotes, setTourNotes] = useState('');
  const [tourSubmitted, setTourSubmitted] = useState(false);

  const handleTourSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTourSubmitted(true);
    onShowToast('VIP Facility Onboarding tour booked! Our concierge will contact you within 2 hours.');
    setTimeout(() => {
      setTourName('');
      setTourPhone('');
      setTourEmail('');
      setTourNotes('');
    }, 4000);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col w-full text-[#e5e2e1]">
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[92vh] flex flex-col justify-between overflow-hidden pt-8 bg-[#0e0e0e]">
        {/* Hero Background Image & High-Contrast Scrim */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/assets/aistudio/cinematic_fitness_photography_of_an_athlete_training_in_a_luxury_dark_high_end_screen_f990f532.png')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-[#131313]/80 to-[#0e0e0e]/85"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#131313_75%)]"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 flex flex-col justify-center flex-grow">
          {/* High-Voltage Tag */}
          <div className="inline-flex items-center gap-2 self-start px-3.5 py-1 rounded-full bg-[#bef500]/15 text-[#bef500] font-['Inter'] text-xs font-bold uppercase tracking-widest backdrop-blur-md mb-6 border border-[#bef500]/30 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#bef500] animate-ping"></span>
            ENGINEERED FOR PEAK HUMAN SUPREMACY
          </div>

          {/* Headline */}
          <h1 className="font-['Sora'] text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-white max-w-4xl font-extrabold leading-none text-balance">
            BUILD YOUR{' '}
            <span className="text-[#bef500] underline decoration-[#bef500]/40 decoration-wavy">
              STRONGEST
            </span>{' '}
            SELF.
          </h1>

          <p className="font-['Inter'] text-base sm:text-lg text-[#c3caac] max-w-2xl mt-6 mb-10 leading-relaxed">
            Train harder. Stay consistent. Become unstoppable. State-of-the-art telemetry, biomechanical rigor, and an uncompromising atmosphere built for relentless athletes.
          </p>

          {/* Dual Actions */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => scrollToSection('membership-section')}
              className="px-8 py-4 rounded bg-[#bef500] hover:bg-[#a6d700] text-[#131313] font-['Sora'] text-sm sm:text-base uppercase tracking-wider font-bold transition-all transform hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(190,245,0,0.4)] flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <span>Explore Memberships</span>
              <span className="material-symbols-outlined text-base">arrow_downward</span>
            </button>

            <button
              onClick={() => onOpenCheckout('PRO')}
              className="px-8 py-4 rounded bg-[#2a2a2a] hover:bg-[#353534] text-white font-['Sora'] text-sm sm:text-base uppercase tracking-wider font-semibold transition-all backdrop-blur-md flex items-center gap-2 cursor-pointer shadow-md border border-white/[0.08]"
            >
              <span>Start Your Journey</span>
              <span className="material-symbols-outlined text-[#bef500] text-base">bolt</span>
            </button>
          </div>
        </div>

        {/* Real-Time Facility Metrics Ribbon */}
        <div className="relative z-10 w-full bg-[#201f1f]/90 backdrop-blur-xl py-6 border-t border-b border-white/[0.06] shadow-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col">
              <span className="font-['Inter'] text-[11px] font-bold text-[#c3caac] uppercase tracking-wider flex items-center gap-1.5">
                <span className="material-symbols-outlined text-xs text-[#bef500]">group</span> Community
              </span>
              <span className="font-['Sora'] text-3xl sm:text-4xl text-white font-extrabold tracking-tight mt-1">
                500+
              </span>
              <span className="font-['Inter'] text-xs text-[#c3caac]/70">Active Members</span>
            </div>

            <div className="flex flex-col">
              <span className="font-['Inter'] text-[11px] font-bold text-[#c3caac] uppercase tracking-wider flex items-center gap-1.5">
                <span className="material-symbols-outlined text-xs text-[#bef500]">sports_gymnastics</span> Coaching
              </span>
              <span className="font-['Sora'] text-3xl sm:text-4xl text-white font-extrabold tracking-tight mt-1">
                15+
              </span>
              <span className="font-['Inter'] text-xs text-[#c3caac]/70">Elite Master Trainers</span>
            </div>

            <div className="flex flex-col">
              <span className="font-['Inter'] text-[11px] font-bold text-[#c3caac] uppercase tracking-wider flex items-center gap-1.5">
                <span className="material-symbols-outlined text-xs text-[#bef500]">all_inclusive</span> Telemetry
              </span>
              <span className="font-['Sora'] text-3xl sm:text-4xl text-white font-extrabold tracking-tight mt-1">
                24/7
              </span>
              <span className="font-['Inter'] text-xs text-[#c3caac]/70">Unrestricted Access</span>
            </div>

            <div className="flex flex-col">
              <span className="font-['Inter'] text-[11px] font-bold text-[#c3caac] uppercase tracking-wider flex items-center gap-1.5">
                <span className="material-symbols-outlined text-xs text-[#bef500]">verified</span> Efficiency
              </span>
              <span className="font-['Sora'] text-3xl sm:text-4xl text-[#bef500] font-extrabold tracking-tight mt-1">
                98%
              </span>
              <span className="font-['Inter'] text-xs text-[#c3caac]/70">Goal Completion Ratio</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT XYZ GYM (EDITORIAL ARCHITECTURE) */}
      <section className="w-full py-20 bg-[#131313] relative border-b border-white/[0.06]" id="about-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="font-['Inter'] text-[11px] font-bold uppercase tracking-widest text-[#bef500]">
                Facility Philosophy & Architecture
              </span>
              <h2 className="font-['Sora'] text-3xl sm:text-4xl uppercase text-white font-bold tracking-tight mt-1">
                WHERE RIGOR MEETS REFINEMENT
              </h2>
            </div>
            <p className="font-['Inter'] text-sm sm:text-base text-[#c3caac] max-w-md leading-relaxed">
              Rejecting standard commercial club mediocrity. We combine heavy metal physics with biological science for calculated hypertrophy and speed.
            </p>
          </div>

          {/* Bento-Inspired Asymmetric Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Big Narrative Card */}
            <div className="lg:col-span-7 bg-[#1c1b1b] rounded-2xl p-6 sm:p-10 flex flex-col justify-between shadow-lg relative overflow-hidden border border-white/[0.06]">
              <div className="absolute -right-12 -top-12 w-64 h-64 bg-[#bef500]/5 rounded-full blur-3xl pointer-events-none"></div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-['JetBrains_Mono'] text-xs text-[#bef500] bg-[#201f1f] px-2.5 py-1 rounded border border-white/[0.06]">
                    EST. 2021
                  </span>
                  <span className="font-['Inter'] text-xs font-bold text-[#c3caac] uppercase tracking-wider">
                    HIGH-VOLTAGE TRAINING HUB
                  </span>
                </div>
                <h3 className="font-['Sora'] text-2xl sm:text-3xl uppercase text-white font-bold mb-4">
                  BIOMECHANICS OVER CASUAL FITNESS.
                </h3>
                <p className="font-['Inter'] text-sm sm:text-base text-[#c3caac] leading-relaxed mb-8">
                  XYZ GYM was erected on a singular mandate: provide an uncompromising, world-class athletic sanctuary. We house precision Eleiko calibrated steel plates, custom power racks, turf sprint tracks, and infrared recovery protocols designed to reconstruct muscle fiber with zero downtime.
                </p>
              </div>

              {/* 3 Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 bg-[#201f1f]/80 p-4 rounded-xl border border-white/[0.06]">
                <div>
                  <span className="material-symbols-outlined text-[#bef500] mb-1">fitness_center</span>
                  <h4 className="font-['Sora'] text-sm uppercase text-white font-bold">Eleiko Gear</h4>
                  <p className="font-['Inter'] text-xs text-[#c3caac]/80 mt-1">
                    Calibrated Olympic bars and heavy-duty competition racks.
                  </p>
                </div>
                <div>
                  <span className="material-symbols-outlined text-[#bef500] mb-1">spa</span>
                  <h4 className="font-['Sora'] text-sm uppercase text-white font-bold">Cold Plunge</h4>
                  <p className="font-['Inter'] text-xs text-[#c3caac]/80 mt-1">
                    Sub-4°C contrast hydrotherapy and Finnish sauna suite.
                  </p>
                </div>
                <div>
                  <span className="material-symbols-outlined text-[#bef500] mb-1">monitoring</span>
                  <h4 className="font-['Sora'] text-sm uppercase text-white font-bold">Telemetry</h4>
                  <p className="font-['Inter'] text-xs text-[#c3caac]/80 mt-1">
                    Bar velocity tracking and systemic biometric scanning.
                  </p>
                </div>
              </div>
            </div>

            {/* Visual Media Card with Photo */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden min-h-[380px] bg-[#2a2a2a] shadow-lg border border-white/[0.06]">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('/assets/aistudio/strength_training_in_premium_high_end_fitness_center_barbell_deadlift_setup_screen_1f2cfb0d.png')`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/40 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <span className="font-['Inter'] text-[11px] font-bold uppercase text-[#bef500] tracking-wider">
                  Unapologetic Energy
                </span>
                <h4 className="font-['Sora'] text-xl uppercase text-white font-extrabold mt-1">
                  IRON CATHEDRAL
                </h4>
                <p className="font-['Inter'] text-xs sm:text-sm text-[#c3caac] mt-1.5 leading-relaxed">
                  An arena engineered without distractions. No waiting for benches, no loud pop music, only pure focus and relentless drive.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WORKOUT PROGRAMS (INTERACTIVE SYSTEM) */}
      <section className="w-full py-20 bg-[#0e0e0e] border-b border-white/[0.06]" id="programs-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="font-['Inter'] text-[11px] font-bold uppercase tracking-widest text-[#bef500]">
                Targeted Regimens
              </span>
              <h2 className="font-['Sora'] text-3xl sm:text-4xl uppercase text-white font-bold tracking-tight mt-1">
                PERFORMANCE PROTOCOLS
              </h2>
            </div>
            <p className="font-['Inter'] text-sm sm:text-base text-[#c3caac] max-w-md">
              Engineered for raw functional transfer. Filter through specialized domains and elevate your anatomical capacity.
            </p>
          </div>

          {/* Programs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROGRAMS.map((prog) => (
              <div
                key={prog.id}
                className="bg-[#1c1b1b] rounded-2xl p-6 flex flex-col justify-between shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 group border border-white/[0.06] hover:border-[#bef500]/30"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-0.5 rounded bg-[#201f1f] font-['JetBrains_Mono'] text-xs text-[#bef500] border border-white/[0.06]">
                      {prog.code}
                    </span>
                    <span className="flex items-center gap-1.5 font-['Inter'] text-[11px] font-bold text-[#c3caac]">
                      <span className="w-2 h-2 rounded-full bg-[#bef500]"></span> INTENSITY: {prog.intensity}
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded bg-[#201f1f] flex items-center justify-center text-[#bef500] mb-4 group-hover:bg-[#bef500] group-hover:text-[#131313] transition-colors border border-white/[0.06]">
                    <span className="material-symbols-outlined text-2xl">{prog.icon}</span>
                  </div>

                  <h3 className="font-['Sora'] text-xl uppercase text-white font-bold mb-2">
                    {prog.title}
                  </h3>
                  <p className="font-['Inter'] text-xs sm:text-sm text-[#c3caac] leading-relaxed mb-6">
                    {prog.shortDesc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="font-['JetBrains_Mono'] text-xs text-[#c3caac]/80 font-medium">
                    {prog.sessionsPerWeek}
                  </span>
                  <button
                    onClick={() => onOpenProgram(prog)}
                    className="font-['Inter'] text-xs font-bold uppercase text-[#bef500] hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Details</span>
                    <span className="material-symbols-outlined text-sm">north_east</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ELITE TRAINERS */}
      <section className="w-full py-20 bg-[#131313] border-b border-white/[0.06]" id="trainers-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="font-['Inter'] text-[11px] font-bold uppercase tracking-widest text-[#bef500]">
                Master Coaching Staff
              </span>
              <h2 className="font-['Sora'] text-3xl sm:text-4xl uppercase text-white font-bold tracking-tight mt-1">
                ELITE PEDIGREE COACHES
              </h2>
            </div>
            <p className="font-['Inter'] text-sm sm:text-base text-[#c3caac] max-w-md">
              Certified by global gold-standard bodies. We do not hire social media influencers—we employ master practitioners.
            </p>
          </div>

          {/* 3 Trainers Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TRAINERS.map((trainer) => (
              <div
                key={trainer.id}
                className="bg-[#1c1b1b] rounded-2xl overflow-hidden shadow-lg flex flex-col group border border-white/[0.06] hover:border-[#bef500]/30 transition-all"
              >
                <div className="relative h-80 w-full overflow-hidden bg-[#2a2a2a]">
                  <img
                    alt={trainer.name}
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    src={trainer.imageUrl}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1c1b1b] via-transparent to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="px-2.5 py-1 rounded bg-[#0e0e0e]/85 backdrop-blur-md font-['JetBrains_Mono'] text-xs text-[#bef500] font-bold border border-white/[0.08]">
                      {trainer.experience}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-['Sora'] text-xl uppercase text-white font-bold">
                        {trainer.name}
                      </h3>
                      <span className="font-['Inter'] text-[11px] font-bold text-[#bef500]">
                        {trainer.credentials}
                      </span>
                    </div>
                    <p className="font-['JetBrains_Mono'] text-xs text-[#c3caac] uppercase mb-3">
                      {trainer.specialty}
                    </p>
                    <p className="font-['Inter'] text-xs sm:text-sm text-[#c3caac]/90 leading-relaxed mb-6">
                      {trainer.bio}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                    <div className="flex items-center gap-1.5 text-[#c3caac] font-['Inter'] text-[11px] font-bold uppercase">
                      <span className="material-symbols-outlined text-base text-[#bef500]">
                        military_tech
                      </span>{' '}
                      {trainer.role}
                    </div>
                    <button
                      onClick={() => {
                        scrollToSection('contact-section');
                        onShowToast(`Direct inquiry channeled for Coach ${trainer.name}. Fill details below.`);
                      }}
                      className="px-3.5 py-1.5 rounded bg-[#2a2a2a] hover:bg-[#bef500] hover:text-[#131313] text-white font-['Inter'] text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Book Session
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. MEMBERSHIP TIERS & PRICING */}
      <section
        className="w-full py-20 bg-[#0e0e0e] relative border-b border-white/[0.06]"
        id="membership-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-['Inter'] text-[11px] font-bold uppercase tracking-widest text-[#bef500]">
              Transparent Membership
            </span>
            <h2 className="font-['Sora'] text-3xl sm:text-4xl uppercase text-white font-bold tracking-tight mt-1">
              CHOOSE YOUR LEVEL OF COMMITMENT
            </h2>
            <p className="font-['Inter'] text-sm sm:text-base text-[#c3caac] mt-2">
              No initiation fines. No hidden cancellations. Pure unadulterated access to the city's highest-grade athletic compound.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* BASIC TIER */}
            <div className="bg-[#1c1b1b] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-lg relative border border-white/[0.06]">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-['JetBrains_Mono'] text-xs uppercase text-[#c3caac]">
                    TIER 01 / STARTER
                  </span>
                </div>
                <h3 className="font-['Sora'] text-2xl uppercase text-white font-bold">BASIC</h3>
                <p className="font-['Inter'] text-xs text-[#c3caac] mt-1">
                  Single-month flexibility for focused solo athletes.
                </p>

                <div className="my-6">
                  <div className="flex items-baseline gap-1">
                    <span className="font-['Sora'] text-4xl text-white font-extrabold">₹999</span>
                    <span className="font-['JetBrains_Mono'] text-xs text-[#c3caac]">/ 1 MONTH</span>
                  </div>
                  <span className="font-['Inter'] text-xs text-[#c3caac]/70">
                    Billed monthly · Cancel anytime
                  </span>
                </div>

                <ul className="space-y-3 mb-8 text-xs sm:text-sm font-['Inter'] text-[#e5e2e1]">
                  <li className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[#bef500] text-base">check_circle</span>
                    <span>Full gym equipment access</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[#bef500] text-base">check_circle</span>
                    <span>General workout orientation</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[#bef500] text-base">check_circle</span>
                    <span>Standard locker room & shower access</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-[#c3caac]/50">
                    <span className="material-symbols-outlined text-base">close</span>
                    <span>Custom nutrition programming</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-[#c3caac]/50">
                    <span className="material-symbols-outlined text-base">close</span>
                    <span>1-on-1 PT consultations</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => onOpenCheckout('BASIC')}
                className="w-full py-3.5 rounded bg-[#201f1f] hover:bg-[#2a2a2a] text-white font-['Sora'] text-sm uppercase tracking-wider font-semibold transition-all cursor-pointer border border-white/[0.08]"
              >
                Choose Basic
              </button>
            </div>

            {/* PRO TIER (HIGHLIGHTED) */}
            <div className="bg-[#201f1f] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative md:-translate-y-4 border-2 border-[#bef500]/60 ring-2 ring-[#bef500]/20">
              <div className="absolute inset-0 bg-[#bef500]/5 rounded-2xl pointer-events-none"></div>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-['JetBrains_Mono'] text-xs uppercase text-[#bef500] font-bold">
                    TIER 02 / HIGH DEMAND
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#bef500] text-[#131313] font-['Inter'] text-[10px] uppercase font-bold tracking-wider shadow-[0_0_12px_rgba(190,245,0,0.5)]">
                    MOST POPULAR
                  </span>
                </div>
                <h3 className="font-['Sora'] text-2xl uppercase text-white font-bold">PRO</h3>
                <p className="font-['Inter'] text-xs text-[#c3caac] mt-1">
                  Quarterly transformation for dedicated physique goals.
                </p>

                <div className="my-6">
                  <div className="flex items-baseline gap-1">
                    <span className="font-['Sora'] text-4xl text-white font-extrabold">₹2,499</span>
                    <span className="font-['JetBrains_Mono'] text-xs text-[#bef500] font-semibold">
                      / 3 MONTHS
                    </span>
                  </div>
                  <span className="font-['Inter'] text-xs text-[#bef500] font-semibold">
                    Save 17% vs monthly rate
                  </span>
                </div>

                <ul className="space-y-3 mb-8 text-xs sm:text-sm font-['Inter'] text-[#e5e2e1]">
                  <li className="flex items-center gap-2.5 font-medium">
                    <span className="material-symbols-outlined text-[#bef500] text-base">check_circle</span>
                    <span>Full gym equipment access</span>
                  </li>
                  <li className="flex items-center gap-2.5 font-medium">
                    <span className="material-symbols-outlined text-[#bef500] text-base">check_circle</span>
                    <span>Custom fitness consultation & assessment</span>
                  </li>
                  <li className="flex items-center gap-2.5 font-medium">
                    <span className="material-symbols-outlined text-[#bef500] text-base">check_circle</span>
                    <span>Personalized workout programming</span>
                  </li>
                  <li className="flex items-center gap-2.5 font-medium">
                    <span className="material-symbols-outlined text-[#bef500] text-base">check_circle</span>
                    <span>Bi-weekly body composition telemetry</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-[#c3caac]/50">
                    <span className="material-symbols-outlined text-base">close</span>
                    <span>Dedicated VIP locker reservation</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => onOpenCheckout('PRO')}
                className="w-full py-3.5 rounded bg-[#bef500] hover:bg-[#a6d700] text-[#131313] font-['Sora'] text-sm uppercase tracking-wider font-bold transition-all shadow-[0_0_20px_rgba(190,245,0,0.4)] cursor-pointer"
              >
                Choose Pro Plan
              </button>
            </div>

            {/* ELITE TIER */}
            <div className="bg-[#1c1b1b] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-lg relative border border-white/[0.06]">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-['JetBrains_Mono'] text-xs uppercase text-[#c3caac]">
                    TIER 03 / VIP SUPREMACY
                  </span>
                </div>
                <h3 className="font-['Sora'] text-2xl uppercase text-white font-bold">ELITE</h3>
                <p className="font-['Inter'] text-xs text-[#c3caac] mt-1">
                  Full 365-day athletic immersion with bespoke guidance.
                </p>

                <div className="my-6">
                  <div className="flex items-baseline gap-1">
                    <span className="font-['Sora'] text-4xl text-white font-extrabold">₹7,999</span>
                    <span className="font-['JetBrains_Mono'] text-xs text-[#c3caac]">/ 12 MONTHS</span>
                  </div>
                  <span className="font-['Inter'] text-xs text-[#c3caac]/70">
                    Lowest per-month effective cost
                  </span>
                </div>

                <ul className="space-y-3 mb-8 text-xs sm:text-sm font-['Inter'] text-[#e5e2e1]">
                  <li className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[#bef500] text-base">check_circle</span>
                    <span>Full 24/7 priority access all zones</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[#bef500] text-base">check_circle</span>
                    <span>Personal VIP permanent locker</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[#bef500] text-base">check_circle</span>
                    <span>Monthly 1-on-1 Master PT consultation</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[#bef500] text-base">check_circle</span>
                    <span>Priority nutrition & metabolic guide</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[#bef500] text-base">check_circle</span>
                    <span>Complimentary Finnish sauna & cold plunge</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => onOpenCheckout('ELITE')}
                className="w-full py-3.5 rounded bg-[#201f1f] hover:bg-[#2a2a2a] text-white font-['Sora'] text-sm uppercase tracking-wider font-semibold transition-all cursor-pointer border border-white/[0.08]"
              >
                Choose Elite
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CONTACT & FACILITY HEADQUARTERS */}
      <section className="w-full py-20 bg-[#131313] relative" id="contact-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="font-['Inter'] text-[11px] font-bold uppercase tracking-widest text-[#bef500]">
                Location & Intelligence
              </span>
              <h2 className="font-['Sora'] text-3xl sm:text-4xl uppercase text-white font-bold tracking-tight mt-1">
                FACILITY HEADQUARTERS
              </h2>
            </div>
            <div className="flex items-center gap-2 bg-[#201f1f] px-3.5 py-1.5 rounded font-['JetBrains_Mono'] text-xs text-[#c3caac] border border-white/[0.06]">
              <span className="w-2 h-2 rounded-full bg-[#bef500] animate-pulse"></span>
              <span>DEMO MODE · SIMULATED ENVIRONMENT</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Location Details & Stylized Map */}
            <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
              <div className="bg-[#1c1b1b] rounded-2xl p-6 sm:p-8 space-y-6 shadow-md border border-white/[0.06]">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-[#201f1f] text-[#bef500] mt-0.5 border border-white/[0.06]">
                    <span className="material-symbols-outlined text-2xl">location_on</span>
                  </div>
                  <div>
                    <h4 className="font-['Sora'] text-base uppercase text-white font-bold">
                      Facility Address
                    </h4>
                    <p className="font-['Inter'] text-sm text-[#c3caac] mt-0.5 leading-relaxed">
                      Plot 42, Cyber Hub Fitness Boulevard, Sector 29, Gurugram, NCR
                    </p>
                    <span className="font-['JetBrains_Mono'] text-xs text-[#bef500] mt-1 block">
                      Valet & Athlete Parking Available
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-[#201f1f] text-[#bef500] mt-0.5 border border-white/[0.06]">
                    <span className="material-symbols-outlined text-2xl">phone</span>
                  </div>
                  <div>
                    <h4 className="font-['Sora'] text-base uppercase text-white font-bold">
                      Direct Line (Demo)
                    </h4>
                    <p className="font-['Inter'] text-sm text-[#c3caac] mt-0.5">+91 98765 43210</p>
                    <span className="font-['JetBrains_Mono'] text-xs text-[#c3caac]/70 mt-1 block">
                      Support hours: 24/7 Round the clock
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-[#201f1f] text-[#bef500] mt-0.5 border border-white/[0.06]">
                    <span className="material-symbols-outlined text-2xl">mail</span>
                  </div>
                  <div>
                    <h4 className="font-['Sora'] text-base uppercase text-white font-bold">
                      Electronic Mail
                    </h4>
                    <p className="font-['Inter'] text-sm text-[#c3caac] mt-0.5">support@xyzgym.demo</p>
                  </div>
                </div>

                {/* Simulated WhatsApp CTA */}
                <button
                  type="button"
                  onClick={() => onShowToast('Simulated WhatsApp Concierge connection initiated (+91 98765 43210)')}
                  className="w-full flex items-center justify-between p-4 bg-[#201f1f] hover:bg-[#2a2a2a] rounded-xl transition-colors group cursor-pointer border border-white/[0.06]"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#bef500]">chat</span>
                    <span className="font-['Inter'] text-xs uppercase text-white font-bold tracking-wider">
                      Chat on WhatsApp (Simulated)
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-[#bef500] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </button>
              </div>

              {/* Stylized Dark Map Component */}
              <div className="w-full h-56 rounded-2xl bg-[#1c1b1b] relative overflow-hidden shadow-md flex items-center justify-center border border-white/[0.06] p-4 text-center">
                <div className="absolute inset-0 bg-[#0e0e0e]/85 backdrop-blur-[2px]"></div>
                {/* Stylized Radar grid lines */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#bef500_1px,transparent_1px)] [background-size:16px_16px]"></div>

                <div className="relative z-10 p-5 bg-[#201f1f]/95 rounded-xl border border-white/[0.08] shadow-lg max-w-sm">
                  <span className="material-symbols-outlined text-[#bef500] text-3xl animate-bounce">
                    location_pin
                  </span>
                  <p className="font-['Sora'] text-sm uppercase text-white font-bold mt-1">
                    XYZ PERFORMANCE COMPOUND
                  </p>
                  <p className="font-['JetBrains_Mono'] text-xs text-[#c3caac] mt-0.5">
                    Sector 29 · 28.4682° N, 77.0655° E
                  </p>
                </div>
              </div>
            </div>

            {/* VIP Tour Booking Form */}
            <div className="lg:col-span-6 bg-[#1c1b1b] rounded-2xl p-6 sm:p-10 shadow-lg flex flex-col justify-between border border-white/[0.06]">
              <div>
                <h3 className="font-['Sora'] text-2xl uppercase text-white font-bold mb-1">
                  REQUEST VIP ACCESS TOUR
                </h3>
                <p className="font-['Inter'] text-xs sm:text-sm text-[#c3caac] mb-6">
                  Experience the equipment, meet coaching leads, and receive a complete body composition scan.
                </p>

                <form className="space-y-4" onSubmit={handleTourSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-['Inter'] text-[11px] font-bold uppercase text-[#c3caac] mb-1">
                        Your Name
                      </label>
                      <input
                        className="w-full bg-[#0e0e0e] text-white px-3.5 py-2.5 rounded font-['Inter'] text-sm focus:outline-none focus:ring-1 focus:ring-[#bef500] border border-white/[0.08]"
                        placeholder="Alex Mercer"
                        required
                        type="text"
                        value={tourName}
                        onChange={(e) => setTourName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block font-['Inter'] text-[11px] font-bold uppercase text-[#c3caac] mb-1">
                        Phone Number
                      </label>
                      <input
                        className="w-full bg-[#0e0e0e] text-white px-3.5 py-2.5 rounded font-['Inter'] text-sm focus:outline-none focus:ring-1 focus:ring-[#bef500] border border-white/[0.08]"
                        placeholder="+91 98765 XXXXX"
                        required
                        type="tel"
                        value={tourPhone}
                        onChange={(e) => setTourPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-['Inter'] text-[11px] font-bold uppercase text-[#c3caac] mb-1">
                      Email Address
                    </label>
                    <input
                      className="w-full bg-[#0e0e0e] text-white px-3.5 py-2.5 rounded font-['Inter'] text-sm focus:outline-none focus:ring-1 focus:ring-[#bef500] border border-white/[0.08]"
                      placeholder="alex@domain.com"
                      required
                      type="email"
                      value={tourEmail}
                      onChange={(e) => setTourEmail(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block font-['Inter'] text-[11px] font-bold uppercase text-[#c3caac] mb-1">
                      Primary Training Focus
                    </label>
                    <select
                      className="w-full bg-[#0e0e0e] text-white px-3.5 py-2.5 rounded font-['Inter'] text-sm focus:outline-none focus:ring-1 focus:ring-[#bef500] border border-white/[0.08]"
                      value={tourFocus}
                      onChange={(e) => setTourFocus(e.target.value)}
                    >
                      <option value="strength">Heavy Compound Strength</option>
                      <option value="fatloss">Body Composition & Fat Loss</option>
                      <option value="coaching">1-on-1 Personal Coaching</option>
                      <option value="general">Facility Walkthrough & Free Day-Pass</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-['Inter'] text-[11px] font-bold uppercase text-[#c3caac] mb-1">
                      Specific Athlete Notes
                    </label>
                    <textarea
                      className="w-full bg-[#0e0e0e] text-white px-3.5 py-2.5 rounded font-['Inter'] text-sm focus:outline-none focus:ring-1 focus:ring-[#bef500] border border-white/[0.08]"
                      placeholder="Injuries, previous PRs, or preferred visit timings..."
                      rows={3}
                      value={tourNotes}
                      onChange={(e) => setTourNotes(e.target.value)}
                    ></textarea>
                  </div>

                  {tourSubmitted && (
                    <div className="p-3 bg-[#bef500]/15 text-[#bef500] rounded font-['Inter'] text-xs border border-[#bef500]/30 animate-pulse">
                      Request logged successfully in sandbox! Our member concierge will reach out within 2 hours.
                    </div>
                  )}

                  <button
                    className="w-full py-3.5 rounded bg-[#bef500] hover:bg-[#a6d700] text-[#131313] font-['Sora'] text-sm uppercase tracking-wider font-bold transition-all hover:shadow-[0_0_20px_rgba(190,245,0,0.4)] cursor-pointer"
                    type="submit"
                  >
                    Schedule Facility Onboarding
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
