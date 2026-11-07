import React, { useState } from 'react';
import { MembershipTier, Transaction, MemberProfile } from '../types';
import { playSuccessChime } from '../data/mockData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTier?: MembershipTier;
  onPaymentComplete: (newMember: MemberProfile, newTx: Transaction) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  initialTier = 'PRO',
  onPaymentComplete,
}) => {
  const [tier, setTier] = useState<MembershipTier>(initialTier);
  const [name, setName] = useState('Alex Vance');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [email, setEmail] = useState('alex.vance@perftest.io');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const plans: Record<MembershipTier, { name: string; price: number; duration: string; months: number }> = {
    BASIC: { name: 'BASIC', price: 999, duration: '1 Month', months: 1 },
    PRO: { name: 'PRO', price: 2499, duration: '3 Months', months: 3 },
    ELITE: { name: 'ELITE', price: 7999, duration: '12 Months', months: 12 },
  };

  const selectedPlan = plans[tier];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const today = new Date();
      const expiry = new Date();
      expiry.setDate(today.getDate() + selectedPlan.months * 30);

      const dateOpts: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
      const startDateStr = today.toLocaleDateString('en-US', dateOpts);
      const expiryDateStr = expiry.toLocaleDateString('en-US', dateOpts);

      const randomId = `#XYZ-${Math.floor(1000 + Math.random() * 9000)}`;
      const invNum = `INV-2025-${Math.floor(1000 + Math.random() * 9000)}`;

      const newTx: Transaction = {
        id: invNum,
        date: startDateStr,
        tierName: `${selectedPlan.name} Tier (${selectedPlan.duration})`,
        amount: selectedPlan.price,
        gateway: 'UPI / Razorpay Test',
        status: 'Verified Success',
      };

      const newMember: MemberProfile = {
        id: randomId,
        name: name.trim() || 'Alex Vance',
        email: email.trim() || 'alex.vance@perftest.io',
        phone: phone.trim() || '+91 98765 43210',
        tier: tier,
        tierLabel: `${tier} TIER`,
        cycleStarted: startDateStr,
        cycleExpiry: expiryDateStr,
        daysLeft: selectedPlan.months * 30,
        totalDays: selectedPlan.months * 30,
        checkins: 0,
        streak: 1,
        zoneAccess: tier === 'ELITE' ? 'ALL ZONES + VIP SUITE (24/7)' : 'ZONE 1 ACCESS (24/7)',
        avatarUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuCGh43ehkq5KrDguuuIZ6Qr6-fMcZz6LSMrGgsQFZf2DXqeE8cI6I0QBZim4E6pe66Zqc3RDNfZ_7QuVXIks1ZP6TXoZywjDxMecyJZ69tdxym2e4pWRtESI-CnNTYnVkBPiKFpzmmj9-qCL-osedqp_0HiXZDcdVXbjDSW-KYqR8wDxi-u0xuRy5_5NUD6PtG0gvLbJi1yOY4LMWb90vX0oNTuUFx9Gy-069lr2sc',
        autoDebit: false,
        weeklyCaloricBurn: 3200,
        level: tier === 'ELITE' ? 'Level 5 Master' : tier === 'PRO' ? 'Level 3 Elite' : 'Level 1 Athlete',
      };

      playSuccessChime();
      setIsSubmitting(false);
      onPaymentComplete(newMember, newTx);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0e0e0e]/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#201f1f] max-w-xl w-full rounded-2xl p-6 sm:p-8 shadow-2xl relative border border-white/[0.08] max-h-[92vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#c3caac] hover:text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        {/* Razorpay Sandbox Notice */}
        <div className="flex items-center gap-2 p-2.5 bg-[#bef500]/15 text-[#bef500] rounded mb-4 font-['JetBrains_Mono'] text-xs border border-[#bef500]/30">
          <span className="material-symbols-outlined text-sm">science</span>
          <span>SIMULATED TEST CHECKOUT (DEMO MODE) · ZERO REAL CHARGES</span>
        </div>

        <h3 className="font-['Sora'] text-2xl uppercase text-white font-bold">
          MEMBERSHIP ACQUISITION
        </h3>
        <p className="font-['Inter'] text-xs sm:text-sm text-[#c3caac] mt-1 mb-5">
          Finalize credentials for high-voltage facility access token.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Selected Plan Selector with live price calculation */}
          <div>
            <label className="block font-['Inter'] text-[11px] font-bold uppercase tracking-wider text-[#c3caac] mb-1.5">
              Selected Access Tier:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['BASIC', 'PRO', 'ELITE'] as MembershipTier[]).map((p) => {
                const planData = plans[p];
                const isSelected = tier === p;
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setTier(p)}
                    className={`p-3 rounded-lg text-left transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-[#2a2a2a] border-[#bef500] shadow-[0_0_12px_rgba(190,245,0,0.2)]'
                        : 'bg-[#1c1b1b] border-white/[0.06] opacity-70 hover:opacity-100 hover:bg-[#201f1f]'
                    }`}
                  >
                    <span className="block font-['Sora'] text-xs uppercase font-bold text-white">
                      {planData.name}
                    </span>
                    <span className="block font-['JetBrains_Mono'] text-sm text-[#bef500] font-bold">
                      ₹{planData.price.toLocaleString('en-IN')}
                    </span>
                    <span className="block text-[10px] text-[#c3caac]">{planData.duration}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-['Inter'] text-[11px] font-bold uppercase tracking-wider text-[#c3caac] mb-1">
                Full Legal Name
              </label>
              <input
                className="w-full bg-[#0e0e0e] text-white px-3.5 py-2.5 rounded font-['Inter'] text-sm focus:outline-none focus:ring-1 focus:ring-[#bef500] border border-white/[0.08]"
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Marcus Vance"
              />
            </div>
            <div>
              <label className="block font-['Inter'] text-[11px] font-bold uppercase tracking-wider text-[#c3caac] mb-1">
                Mobile Contact
              </label>
              <input
                className="w-full bg-[#0e0e0e] text-white px-3.5 py-2.5 rounded font-['Inter'] text-sm focus:outline-none focus:ring-1 focus:ring-[#bef500] border border-white/[0.08]"
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 XXXXX"
              />
            </div>
          </div>

          <div>
            <label className="block font-['Inter'] text-[11px] font-bold uppercase tracking-wider text-[#c3caac] mb-1">
              Email For Telemetry & ID
            </label>
            <input
              className="w-full bg-[#0e0e0e] text-white px-3.5 py-2.5 rounded font-['Inter'] text-sm focus:outline-none focus:ring-1 focus:ring-[#bef500] border border-white/[0.08]"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@xyzgym.demo"
            />
          </div>

          {/* Simulated Gateway Card Details */}
          <div className="p-3.5 bg-[#1c1b1b] rounded-lg space-y-2 border border-white/[0.06]">
            <div className="flex items-center justify-between">
              <span className="font-['Inter'] text-[11px] font-bold text-[#c3caac] uppercase tracking-wider">
                Payment Provider: Razorpay Mock
              </span>
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#bef500]">
                AUTO-AUTHORIZED
              </span>
            </div>
            <div className="flex items-center gap-2.5 bg-[#0e0e0e] p-2.5 rounded border border-white/[0.06]">
              <span className="material-symbols-outlined text-[#bef500] text-lg">credit_card</span>
              <input
                className="bg-transparent font-['JetBrains_Mono'] text-xs text-white w-full focus:outline-none cursor-default"
                readOnly
                type="text"
                value="4111 2222 3333 4444 (Test Card)"
              />
              <span className="font-['JetBrains_Mono'] text-[11px] text-[#c3caac]">12/28</span>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="p-3.5 bg-[#0e0e0e] rounded-lg flex items-center justify-between border border-white/[0.06]">
            <div>
              <span className="font-['JetBrains_Mono'] text-xs text-[#c3caac] block">
                Total Due (Taxes Included)
              </span>
              <span className="font-['Sora'] text-2xl uppercase text-white font-extrabold">
                ₹{selectedPlan.price.toLocaleString('en-IN')}
              </span>
            </div>
            <span className="font-['Inter'] text-xs text-[#bef500] uppercase font-bold tracking-wider">
              Instant Activation
            </span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded bg-[#bef500] hover:bg-[#a6d700] text-[#131313] font-['Sora'] text-sm uppercase tracking-wider font-bold transition-all shadow-[0_0_20px_rgba(190,245,0,0.4)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <span className="material-symbols-outlined text-sm animate-spin">
                  progress_activity
                </span>
                <span>Simulating Razorpay Node...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-base">lock</span>
                <span>Authorize Payment · ₹{selectedPlan.price.toLocaleString('en-IN')}</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
