import { useState, useEffect } from 'react';
import { MemberProfile, Transaction, GateLog, ProgramItem, MembershipTier } from './types';
import { INITIAL_MEMBER, INITIAL_TRANSACTIONS, INITIAL_GATE_LOGS } from './data/mockData';
import { Header } from './components/Header';
import { PublicWebsite } from './components/PublicWebsite';
import { MemberPortal } from './components/MemberPortal';
import { AdminOverview } from './components/AdminOverview';
import { GatePassModal } from './components/GatePassModal';
import { RenewModal } from './components/RenewModal';
import { CheckoutModal } from './components/CheckoutModal';
import { ConfirmationModal } from './components/ConfirmationModal';
import { ProgramModal } from './components/ProgramModal';
import { MessageCoachModal } from './components/MessageCoachModal';
import { Footer } from './components/Footer';

export default function App() {
  const [activeView, setActiveView] = useState<string>('home');
  const [member, setMember] = useState<MemberProfile>(() => {
    const saved = localStorage.getItem('xyz_member_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_MEMBER;
      }
    }
    return INITIAL_MEMBER;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('xyz_member_txs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_TRANSACTIONS;
      }
    }
    return INITIAL_TRANSACTIONS;
  });

  const [gateLogs, setGateLogs] = useState<GateLog[]>(INITIAL_GATE_LOGS);
  const [facilityOccupancy, setFacilityOccupancy] = useState<number>(42);

  // Modals
  const [isGatePassOpen, setIsGatePassOpen] = useState(false);
  const [isRenewOpen, setIsRenewOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutTier, setCheckoutTier] = useState<MembershipTier>('PRO');
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<ProgramItem | null>(null);
  const [isMessageCoachOpen, setIsMessageCoachOpen] = useState(false);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('xyz_member_profile', JSON.stringify(member));
  }, [member]);

  useEffect(() => {
    localStorage.setItem('xyz_member_txs', JSON.stringify(transactions));
  }, [transactions]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 4000);
  };

  const handleNavigate = (view: string) => {
    if (['programs', 'trainers', 'membership', 'contact'].includes(view)) {
      if (activeView !== 'home') {
        setActiveView('home');
        setTimeout(() => {
          const el = document.getElementById(`${view}-section`);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.getElementById(`${view}-section`);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setActiveView(view);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenCheckout = (tier: MembershipTier) => {
    setCheckoutTier(tier);
    setIsCheckoutOpen(true);
  };

  const handleTurnstileScan = (zone: string) => {
    const newLog: GateLog = {
      id: `GATE-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: 'Just now',
      memberName: member.name,
      memberId: member.id,
      zone: zone,
      status: 'GRANTED',
    };
    setGateLogs((prev) => [newLog, ...prev]);
    setMember((prev) => ({
      ...prev,
      checkins: prev.checkins + 1,
      streak: prev.streak + 1,
    }));
    setFacilityOccupancy((prev) => Math.min(60, prev + 1));
    showToast(`TURNSTILE BEEP // ACCESS GRANTED - ${zone} Unlocked`);
  };

  const handleRenewSuccess = (months: number, _price: number, newTx: Transaction) => {
    const addedDays = months * 30;
    setTransactions((prev) => [newTx, ...prev]);

    const today = new Date();
    const newExp = new Date();
    newExp.setDate(today.getDate() + (member.daysLeft + addedDays));
    const dateOpts: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };

    setMember((prev) => ({
      ...prev,
      daysLeft: prev.daysLeft + addedDays,
      totalDays: prev.totalDays + addedDays,
      cycleExpiry: newExp.toLocaleDateString('en-US', dateOpts),
    }));

    showToast(`Plan renewed! +${addedDays} days appended to ${member.name}.`);
  };

  const handlePaymentComplete = (newMember: MemberProfile, newTx: Transaction) => {
    setMember(newMember);
    setTransactions((prev) => [newTx, ...prev]);
    setIsConfirmOpen(true);
    showToast(`Welcome to XYZ GYM, ${newMember.name}! ${newMember.tier} Plan Activated.`);
  };

  const handleExtendMember = (days: number) => {
    setMember((prev) => ({
      ...prev,
      daysLeft: prev.daysLeft + days,
      totalDays: prev.totalDays + days,
    }));
  };

  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1] flex flex-col font-['Inter'] selection:bg-[#bef500] selection:text-[#131313]">
      {/* Top Header */}
      <Header activeView={activeView} onNavigate={handleNavigate} member={member} />

      {/* Main Content Area */}
      <main className="w-full pt-20 flex-grow">
        {activeView === 'home' && (
          <PublicWebsite
            onOpenCheckout={handleOpenCheckout}
            onOpenProgram={(prog) => setSelectedProgram(prog)}
            onShowToast={showToast}
          />
        )}

        {activeView === 'member-portal' && (
          <MemberPortal
            member={member}
            transactions={transactions}
            facilityOccupancy={facilityOccupancy}
            onOpenGatePass={() => setIsGatePassOpen(true)}
            onOpenRenew={() => setIsRenewOpen(true)}
            onOpenMessageCoach={() => setIsMessageCoachOpen(true)}
            onNavigate={handleNavigate}
            onShowToast={showToast}
          />
        )}

        {activeView === 'admin-overview' && (
          <AdminOverview
            member={member}
            transactions={transactions}
            gateLogs={gateLogs}
            facilityOccupancy={facilityOccupancy}
            onUpdateOccupancy={setFacilityOccupancy}
            onExtendMember={handleExtendMember}
            onNavigate={handleNavigate}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} facilityOccupancy={facilityOccupancy} />

      {/* Modals */}
      <GatePassModal
        isOpen={isGatePassOpen}
        onClose={() => setIsGatePassOpen(false)}
        member={member}
        onTurnstileScan={handleTurnstileScan}
      />

      <RenewModal
        isOpen={isRenewOpen}
        onClose={() => setIsRenewOpen(false)}
        member={member}
        onRenewSuccess={handleRenewSuccess}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        initialTier={checkoutTier}
        onPaymentComplete={handlePaymentComplete}
      />

      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        member={member}
        onNavigate={handleNavigate}
      />

      <ProgramModal
        isOpen={selectedProgram !== null}
        program={selectedProgram}
        onClose={() => setSelectedProgram(null)}
        onEnroll={() => handleOpenCheckout('PRO')}
      />

      <MessageCoachModal
        isOpen={isMessageCoachOpen}
        onClose={() => setIsMessageCoachOpen(false)}
        coachName="Vikram Rathore"
        onSendToast={showToast}
      />

      {/* Interactive Toast Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#201f1f] border border-[#bef500]/50 text-white px-4 py-3 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="w-7 h-7 rounded-full bg-[#bef500] text-[#131313] flex items-center justify-center font-bold">
            <span className="material-symbols-outlined text-base">bolt</span>
          </div>
          <span className="font-['JetBrains_Mono'] text-xs font-medium max-w-sm">
            {toastMessage}
          </span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-[#c3caac] hover:text-white ml-2 text-xs"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
