import React, { useState } from 'react';

interface MessageCoachModalProps {
  isOpen: boolean;
  onClose: () => void;
  coachName?: string;
  onSendToast: (msg: string) => void;
}

export const MessageCoachModal: React.FC<MessageCoachModalProps> = ({
  isOpen,
  onClose,
  coachName = 'Vikram Rathore',
  onSendToast,
}) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'coach'; text: string; time: string }>>([
    {
      sender: 'coach',
      text: 'Marcus, your mechanical bar velocity numbers on Friday were outstanding. Let\'s dial in your peri-workout carb loading before tomorrow\'s heavy cluster session.',
      time: 'Yesterday, 4:15 PM',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userText = message.trim();
    setMessage('');
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: userText, time: 'Just now' },
    ]);

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'coach',
          text: `Noted, Marcus. I have reviewed your directive. Keep pushing with strict eccentric control—I'll check in on the main floor at 10:30 AM!`,
          time: 'Just now',
        },
      ]);
      onSendToast(`Coach ${coachName} responded to your directive.`);
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0e0e0e]/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#1c1b1b] max-w-lg w-full rounded-2xl p-6 shadow-2xl relative border border-white/[0.08] animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#c3caac] hover:text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        {/* Coach Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-white/[0.08]">
          <img
            alt={coachName}
            className="w-12 h-12 rounded-full object-cover border border-[#bef500]/50"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDR0BwItttAWxfW-yG0DWXleQp04jtr4MM2VQRaBlZIzdGPhkM6S7Ph9V_yTbw3-8r9CQygy31kKTKhDJ3GArE36yO1Vi334KdznFzy_n7kVDUeRdq4nipa0wLVamxFRP9csXMfpPVEZTXFXsVnurrDIN31NnQ9hUEP5amimR9awLZNDgmFJSDBxgwpdubkf5C7SUgClt6aMYc21ntHmqrB0GkDtKuGOR9BbbC9tTc"
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-['Sora'] text-base text-white font-bold">{coachName}</h3>
              <span className="w-2 h-2 rounded-full bg-[#bef500] animate-pulse"></span>
            </div>
            <p className="font-['Inter'] text-xs text-[#bef500]">
              Head S&C Specialist · Direct Mentorship Channel
            </p>
          </div>
        </div>

        {/* Chat Stream */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3.5 my-2">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] p-3.5 rounded-xl text-xs sm:text-sm font-['Inter'] leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#bef500] text-[#131313] font-medium rounded-br-none'
                    : 'bg-[#2a2a2a] text-[#e5e2e1] rounded-bl-none border border-white/[0.06]'
                }`}
              >
                {m.text}
              </div>
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#c3caac]/60 mt-1 px-1">
                {m.time}
              </span>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-1.5 p-3 rounded-lg bg-[#2a2a2a] w-fit text-[#bef500] text-xs font-['Inter'] animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-[#bef500]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#bef500]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#bef500]"></span>
              <span className="ml-1 text-[11px] text-[#c3caac]">Coach {coachName} is typing...</span>
            </div>
          )}
        </div>

        {/* Quick Prompts */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-2 no-scrollbar">
          {[
            'Review bench cluster sets',
            'Adjust macro carb timing',
            'Confirm 10:30 AM assessment',
          ].map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => setMessage(prompt)}
              className="text-[11px] font-['Inter'] whitespace-nowrap bg-[#201f1f] hover:bg-[#2a2a2a] text-[#c3caac] hover:text-white px-2.5 py-1 rounded border border-white/[0.06] transition-colors cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Field */}
        <form onSubmit={handleSend} className="flex gap-2 pt-2 border-t border-white/[0.08]">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type message to Head Coach..."
            className="flex-1 bg-[#0e0e0e] text-white px-3.5 py-2.5 rounded font-['Inter'] text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#bef500] border border-white/[0.08]"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded bg-[#bef500] hover:bg-[#a6d700] text-[#131313] font-['Sora'] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">send</span>
            <span className="hidden sm:inline">Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
