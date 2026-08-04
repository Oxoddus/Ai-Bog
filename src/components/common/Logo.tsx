import React from 'react';

interface LogoProps {
  variant?: 'full' | 'monochrome' | 'icon-only';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  size = 'md',
  className = '',
  showTagline = false
}) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-14',
    xl: 'h-20'
  };

  const iconSizes = {
    sm: 32,
    md: 40,
    lg: 56,
    xl: 80
  };

  const iconPx = iconSizes[size];

  // Colors
  const isMono = variant === 'monochrome';
  const primaryBlue = isMono ? '#0F172A' : '#2563EB';
  const accentOrange = isMono ? '#475569' : '#F97316';
  const lightBg = isMono ? '#F8FAFC' : '#FFFFFF';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* SVG Icon: IC Chip + PCB Traces + Lightning Bolt + Gear + Letter U */}
      <svg
        width={iconPx}
        height={iconPx}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform hover:scale-105 duration-200"
      >
        <defs>
          <linearGradient id="ubayBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E40AF" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
          <linearGradient id="ubayOrangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EA580C" />
            <stop offset="100%" stopColor="#FB923C" />
          </linearGradient>
        </defs>

        {/* Rounded Base Shield / Outer IC Body */}
        <rect x="12" y="12" width="76" height="76" rx="20" fill="url(#ubayBlueGrad)" />

        {/* PCB Corner Pins / Pins IC Chip */}
        {/* Left IC Pins */}
        <rect x="4" y="28" width="8" height="6" rx="2" fill={accentOrange} />
        <rect x="4" y="47" width="8" height="6" rx="2" fill={accentOrange} />
        <rect x="4" y="66" width="8" height="6" rx="2" fill={accentOrange} />

        {/* Right IC Pins */}
        <rect x="88" y="28" width="8" height="6" rx="2" fill={accentOrange} />
        <rect x="88" y="47" width="8" height="6" rx="2" fill={accentOrange} />
        <rect x="88" y="66" width="8" height="6" rx="2" fill={accentOrange} />

        {/* Top/Bottom Pins */}
        <rect x="32" y="4" width="6" height="8" rx="2" fill={accentOrange} />
        <rect x="62" y="4" width="6" height="8" rx="2" fill={accentOrange} />
        <rect x="32" y="88" width="6" height="8" rx="2" fill={accentOrange} />
        <rect x="62" y="88" width="6" height="8" rx="2" fill={accentOrange} />

        {/* PCB Trace Circuit Lines */}
        <path d="M 22 22 L 32 32 L 40 32" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
        <circle cx="22" cy="22" r="2.5" fill="#60A5FA" />

        <path d="M 78 22 L 68 32 L 60 32" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
        <circle cx="78" cy="22" r="2.5" fill="#60A5FA" />

        {/* Modern Letter 'U' Shape inside IC */}
        <path
          d="M 32 30 V 58 C 32 68, 68 68, 68 58 V 30"
          stroke="#FFFFFF"
          strokeWidth="11"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Electric Lightning Bolt + Screwdriver Accent in Center */}
        <path
          d="M 52 24 L 40 48 H 52 L 48 72 L 64 44 H 50 Z"
          fill="url(#ubayOrangeGrad)"
          stroke="#FFFFFF"
          strokeWidth="1.5"
        />

        {/* Solder / Tech Gear Ring Dot */}
        <circle cx="50" cy="50" r="3" fill="#FFFFFF" />
      </svg>

      {/* Brand Text */}
      {variant !== 'icon-only' && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            <span className="font-extrabold tracking-tight text-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-orange-500 dark:from-blue-400 dark:to-orange-400 bg-clip-text text-transparent">
              Ubay<span className="text-orange-500 dark:text-orange-400">Hub</span>
            </span>
            <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-orange-100 text-orange-700 dark:bg-orange-950/80 dark:text-orange-300 border border-orange-300/40 uppercase tracking-widest">
              BLORA
            </span>
          </div>
          {showTagline && (
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-1">
              Toko Elektronik Online & Offline Terlengkap di Blora
            </span>
          )}
        </div>
      )}
    </div>
  );
};
