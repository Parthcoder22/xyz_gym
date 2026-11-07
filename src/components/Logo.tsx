import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
}) => {
  const sizeMap = {
    sm: { icon: 'w-7 h-7', text: 'text-lg', sub: 'text-[9px]' },
    md: { icon: 'w-9 h-9', text: 'text-xl', sub: 'text-[10px]' },
    lg: { icon: 'w-12 h-12', text: 'text-2xl', sub: 'text-xs' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Precision Kinetic Obsidian Vector Emblem */}
      <div className={`relative shrink-0 ${currentSize.icon} flex items-center justify-center`}>
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full drop-shadow-[0_0_10px_rgba(190,245,0,0.35)] transition-transform duration-300 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="logoLimeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#bef500" />
              <stop offset="100%" stopColor="#96c500" />
            </linearGradient>
            <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Faceted Outer Carbon Shield */}
          <polygon
            points="60,6 112,32 112,88 60,114 8,88 8,32"
            fill="#0e0e0e"
            stroke="#2a2a2a"
            strokeWidth="3.5"
          />

          {/* Electric Lime Inner Keyline */}
          <polygon
            points="60,15 104,37 104,83 60,105 16,83 16,37"
            stroke="#bef500"
            strokeWidth="2.5"
            strokeOpacity="0.85"
          />

          {/* White High-Velocity Wing Blade */}
          <path d="M34 32 L50 32 L86 88 L70 88 Z" fill="#ffffff" />

          {/* Electric Lime High-Voltage Kinetic Blade */}
          <path
            d="M86 32 L70 32 L34 88 L50 88 Z"
            fill="url(#logoLimeGrad)"
            filter="url(#logoGlow)"
          />

          {/* Center Void Diamond Cutout & Neon Core */}
          <polygon points="60,46 73,60 60,74 47,60" fill="#0e0e0e" />
          <circle cx="60" cy="60" r="4.5" fill="#bef500" />

          {/* Top & Bottom Kinetic Anchor Pips */}
          <rect x="56" y="9" width="8" height="3" fill="#bef500" rx="1" />
          <rect x="56" y="108" width="8" height="3" fill="#bef500" rx="1" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col justify-center leading-none">
          <div className="flex items-center gap-1">
            <span
              className={`font-['Sora'] ${currentSize.text} uppercase text-white font-extrabold tracking-tight`}
            >
              XYZ GYM
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#bef500] animate-pulse"></span>
          </div>
          <span
            className={`font-['JetBrains_Mono'] ${currentSize.sub} uppercase tracking-widest text-[#c3caac]/75 font-semibold mt-0.5`}
          >
            PERFORMANCE
          </span>
        </div>
      )}
    </div>
  );
};
