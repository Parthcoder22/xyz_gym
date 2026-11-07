import React, { useState } from 'react';
import { MemberProfile, Transaction } from '../types';
import { playSuccessChime } from '../data/mockData';

interface RenewModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: MemberProfile;
  onRenewSuccess: (months: number, price: number, transaction: Transaction) => void;
}

export const RenewModal: React.FC<RenewModalProps> = ({
  isOpen,
  onClose,
  member,
  onRenewSuccess,
}) => {
  const [selectedDuration, setSelectedDuration] = useState<number>(3);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [feedbackNotice, setFeedbackNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const durationOptions = [
    {
      months: 1,
      name: '+1 Month Extension',
      desc: '30 additional calendar days',
      price: 999,
      badge: 'STANDARD',
      saveLabel: 'Standard Rate'
    },
    {
      months: 3,
      name: '+3 Months Extension (Pro Quarter)',
      desc: '90 additional calendar days + 2 Guest passes',
      price: 2499,
      badge: 'POPULAR',
      saveLabel: 'Save 16%'
    },
    {
      months: 12,
      name: '+12 Months (Supreme Athlete)',
      desc: '365 additional calendar days + Locker rental incl.',
      price: 7999,
      badge: 'BEST VALUE',
      saveLabel: 'Save 33%'
    }
  ];

  const currentOption = durationOptions.find(o => o.months === selectedDuration) || durationOptions[1];

  const handleProcessRenewal = () => {
    setIsProcessing(true);
    setFeedbackNotice('Contacting Razorpay sandbox gateway...');

    setTimeout(() => {
      setFeedbackNotice(`Payment Authorized: ₹${currentOption.price.toLocaleString('en-IN')} received!`);

      setTimeout(() => {
        const today = new Date();
        const dateStr = `${today.getDate()} ${today.toLocaleString('default', { month: 'short' })} ${today.getFullYear()}`;
        const invNum = `INV-2025-${Math.floor(1000 + Math.random() * 9000)}`;

        const newTx: Transaction = {
          id: invNum,
          date: dateStr,
          tierName: `${member.tier} Tier (+${currentOption.months} Mo Extension)`,
          amount: currentOption.price,
          gateway: paymentMethod === 'upi' ? 'UPI / Razorpay Test' : 'Corporate Card (Axis)',
          status: 'Verified Success'
        };

        playSuccessChime();
        onRenewSuccess(currentOption.months, currentOption.price, newTx);
        setIsProcessing(false);
        setFeedbackNotice(null);
        onClose();
      }, 900);
    }, 1100);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0e0e0e]/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#201f1f] rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative border border-white/[0.08] animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#c3caac] hover:text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        <div>
          <div className="flex items-center gap-2 text-[#bef500]">
            <span className="material-symbols-outlined text-lg">autorenew</span>
            <span className="font-['Inter'] text-[11px] font-bold uppercase tracking-wider">
              XYZ MEMBERSHIP ENGINE
            </span>
          </div>
          <h3 className="font-['Sora'] text-2xl text-white font-bold mt-1">
            Renew or Extend Subscription
          </h3>
          <p className="font-['Inter'] text-xs sm:text-sm text-[#c3caac] mt-1">
            Seamless continuation. New days stack on top of your remaining{' '}
            <span className="text-[#bef500] font-bold">{member.daysLeft}-day quota</span>.
          </p>
        </div>

        {/* Plan Duration Selector */}
        <div className="space-y-2.5 my-5">
          {durationOptions.map((opt) => {
            const isSelected = selectedDuration === opt.months;
            return (
              <label
                key={opt.months}
                onClick={() => setSelectedDuration(opt.months)}
                className={`flex items-center justify-between p-3.5 sm:p-4 rounded-xl cursor-pointer transition-all border ${
                  isSelected
                    ? 'bg-[#2a2a2a] border-[#bef500] ring-1 ring-[#bef500]/50 shadow-[0_0_15px_rgba(190,245,0,0.15)]'
                    : 'bg-[#1c1b1b] border-white/[0.06] hover:bg-[#201f1f]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="renew_duration"
                    checked={isSelected}
                    onChange={() => setSelectedDuration(opt.months)}
                    className="accent-[#bef500] w-4 h-4"
                  />
                  <div>
                    <div className="font-['Sora'] text-sm text-white font-semibold flex items-center gap-2">
                      {opt.name}
                      {opt.badge && (
                        <span className="px-1.5 py-0.5 rounded bg-[#bef500]/20 text-[#bef500] font-['Inter'] text-[9px] uppercase font-bold tracking-wider">
                          {opt.badge}
                        </span>
                      )}
                    </div>
                    <div className="font-['Inter'] text-xs text-[#c3caac]/80">{opt.desc}</div>
                  </div>
                </div>

                <div className="text-right pl-2">
                  <div className={`font-['Sora'] text-base font-bold ${isSelected ? 'text-[#bef500]' : 'text-white'}`}>
                    ₹{opt.price.toLocaleString('en-IN')}
                  </div>
                  <div className="font-['JetBrains_Mono'] text-[10px] text-[#c3caac]/80">
                    {opt.saveLabel}
                  </div>
                </div>
              </label>
            );
          })}
        </div>

        {/* Simulated Gateway Chooser */}
        <div className="space-y-1.5 mb-5">
          <label className="font-['Inter'] text-[11px] uppercase tracking-wider text-[#c3caac] font-bold">
            Simulated Gateway:
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => setPaymentMethod('upi')}
              className={`p-3 rounded-lg flex items-center gap-2 text-left transition-colors cursor-pointer border ${
                paymentMethod === 'upi'
                  ? 'bg-[#0e0e0e] border-[#bef500]'
                  : 'bg-[#1c1b1b] border-white/[0.06] hover:bg-[#2a2a2a]'
              }`}
            >
              <span className="material-symbols-outlined text-[#bef500] text-xl">
                account_balance_wallet
              </span>
              <div>
                <div className="font-['JetBrains_Mono'] text-xs text-white font-semibold">
                  UPI AutoPay / QR
                </div>
                <div className="font-['Inter'] text-[10px] text-[#c3caac]/70">Zero surcharge</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('card')}
              className={`p-3 rounded-lg flex items-center gap-2 text-left transition-colors cursor-pointer border ${
                paymentMethod === 'card'
                  ? 'bg-[#0e0e0e] border-[#bef500]'
                  : 'bg-[#1c1b1b] border-white/[0.06] hover:bg-[#2a2a2a]'
              }`}
            >
              <span className="material-symbols-outlined text-white text-xl">credit_card</span>
              <div>
                <div className="font-['JetBrains_Mono'] text-xs text-white font-semibold">
                  Razorpay Sandbox
                </div>
                <div className="font-['Inter'] text-[10px] text-[#c3caac]/70">Test card auth</div>
              </div>
            </button>
          </div>
        </div>

        {/* Processing Notification */}
        {feedbackNotice && (
          <div className="p-2.5 rounded bg-[#bef500]/15 text-[#bef500] font-['JetBrains_Mono'] text-xs text-center border border-[#bef500]/30 animate-pulse mb-4">
            {feedbackNotice}
          </div>
        )}

        {/* Action Bar */}
        <div className="pt-2 flex items-center justify-between border-t border-white/[0.08]">
          <div>
            <span className="font-['Inter'] text-[11px] uppercase tracking-wider text-[#c3caac]">
              Total Payable
            </span>
            <div className="font-['Sora'] text-2xl text-white font-bold">
              ₹{currentOption.price.toLocaleString('en-IN')}
            </div>
          </div>

          <button
            type="button"
            disabled={isProcessing}
            onClick={handleProcessRenewal}
            className="px-6 py-3 rounded bg-[#bef500] hover:bg-[#a6d700] text-[#131313] font-['Sora'] text-sm font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(190,245,0,0.3)] disabled:opacity-50 cursor-pointer flex items-center gap-2"
          >
            {isProcessing ? (
              <>
                <span className="material-symbols-outlined text-sm animate-spin">
                  progress_activity
                </span>
                <span>Authorizing...</span>
              </>
            ) : (
              <span>Authorize & Pay</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
