import React from 'react';

interface IllustrationProps {
  name: 'farm-hero' | 'tractor-field' | 'storage-silo' | 'handshake' | 'crop-harvest';
  className?: string;
}

export const AgriculturalIllustration: React.FC<IllustrationProps> = ({ name, className = 'w-full h-auto' }) => {
  if (name === 'farm-hero') {
    return (
      <svg viewBox="0 0 540 320" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Rural farm with sunrise, tractor and wheat crops">
        <defs>
          <linearGradient id="skyGrad" x1="270" y1="0" x2="270" y2="200" gradientUnits="userSpaceOnUse">
            <stop stopColor="#EBF8EE" />
            <stop offset="0.6" stopColor="#FEF9E7" />
            <stop offset="1" stopColor="#FDE68A" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="hillGrad1" x1="0" y1="120" x2="540" y2="280" gradientUnits="userSpaceOnUse">
            <stop stopColor="#86EFAC" />
            <stop offset="1" stopColor="#22C55E" />
          </linearGradient>
          <linearGradient id="hillGrad2" x1="0" y1="170" x2="540" y2="320" gradientUnits="userSpaceOnUse">
            <stop stopColor="#15803D" />
            <stop offset="1" stopColor="#166534" />
          </linearGradient>
          <linearGradient id="soilGrad" x1="0" y1="260" x2="540" y2="320" gradientUnits="userSpaceOnUse">
            <stop stopColor="#D97706" />
            <stop offset="1" stopColor="#92400E" />
          </linearGradient>
        </defs>
        
        {/* Sky Background */}
        <rect width="540" height="320" rx="16" fill="url(#skyGrad)" />
        
        {/* Morning Sun */}
        <circle cx="410" cy="90" r="48" fill="#FBBF24" fillOpacity="0.4" />
        <circle cx="410" cy="90" r="32" fill="#F59E0B" fillOpacity="0.85" />
        
        {/* Distant Trees & Rolling Hills */}
        <path d="M-20 180 C80 140, 160 170, 270 150 C380 130, 480 160, 560 140 L560 320 L-20 320 Z" fill="#BBF7D0" fillOpacity="0.6" />
        <path d="M-20 200 C90 170, 220 210, 340 180 C440 150, 500 170, 560 190 L560 320 L-20 320 Z" fill="url(#hillGrad1)" fillOpacity="0.85" />
        
        {/* Foreground Crop Field */}
        <path d="M-20 235 C110 215, 230 240, 350 225 C450 210, 510 230, 560 220 L560 320 L-20 320 Z" fill="url(#hillGrad2)" />
        
        {/* Cultivated Furrows / Earth */}
        <path d="M0 280 Q 270 265 540 280 L540 320 L0 320 Z" fill="url(#soilGrad)" />
        <path d="M0 295 Q 270 282 540 295" stroke="#78350F" strokeWidth="2" strokeDasharray="6 4" opacity="0.6" />
        <path d="M0 310 Q 270 298 540 310" stroke="#78350F" strokeWidth="2" strokeDasharray="6 4" opacity="0.6" />

        {/* Golden Wheat Stalks in Foreground */}
        <g stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round">
          {/* Group 1 */}
          <path d="M40 300 Q 45 255 42 230" />
          <path d="M42 230 L 48 220 M42 238 L 36 228 M42 246 L 48 236 M42 254 L 36 244" />
          
          <path d="M65 305 Q 70 260 72 235" />
          <path d="M72 235 L 78 225 M72 243 L 66 233 M72 251 L 78 241" />

          <path d="M90 310 Q 92 270 88 240" />
          <path d="M88 240 L 94 230 M88 248 L 82 238 M88 256 L 94 246" />

          {/* Group 2 Right */}
          <path d="M470 310 Q 465 260 468 235" />
          <path d="M468 235 L 474 225 M468 243 L 462 233 M468 251 L 474 241" />
          <path d="M495 315 Q 500 265 496 238" />
          <path d="M496 238 L 502 228 M496 246 L 490 236" />
        </g>

        {/* Clean Modern Tractor Silhouette */}
        <g transform="translate(200, 175) scale(0.85)">
          {/* Tractor Body */}
          <rect x="50" y="45" width="60" height="25" rx="4" fill="#DC2626" />
          <path d="M75 20 L 105 20 L 110 45 L 68 45 Z" fill="#0284C7" fillOpacity="0.4" stroke="#0369A1" strokeWidth="2" />
          <rect x="73" y="18" width="34" height="4" fill="#0F172A" rx="1" />
          <rect x="105" y="32" width="40" height="38" rx="5" fill="#DC2626" />
          <rect x="135" y="24" width="6" height="15" fill="#475569" rx="1" />
          {/* Big Rear Wheel */}
          <circle cx="55" cy="72" r="26" fill="#1E293B" />
          <circle cx="55" cy="72" r="15" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="3" />
          <circle cx="55" cy="72" r="6" fill="#334155" />
          {/* Small Front Wheel */}
          <circle cx="138" cy="78" r="16" fill="#1E293B" />
          <circle cx="138" cy="78" r="9" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="2" />
          <circle cx="138" cy="78" r="4" fill="#334155" />
          {/* Exhaust Smoke Puff */}
          <circle cx="138" cy="14" r="5" fill="#CBD5E1" opacity="0.6" />
          <circle cx="142" cy="6" r="7" fill="#E2E8F0" opacity="0.4" />
        </g>
      </svg>
    );
  }

  if (name === 'tractor-field') {
    return (
      <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect width="200" height="120" rx="8" fill="#F0FDF4" />
        <path d="M0 80 Q 100 65 200 80 L200 120 L0 120 Z" fill="#22C55E" fillOpacity="0.2" />
        <circle cx="70" cy="85" r="18" fill="#15803D" />
        <circle cx="70" cy="85" r="9" fill="#DCFCE7" />
        <circle cx="130" cy="90" r="12" fill="#15803D" />
        <circle cx="130" cy="90" r="6" fill="#DCFCE7" />
        <rect x="65" y="55" width="60" height="24" rx="3" fill="#16A34A" />
        <path d="M85 38 L 105 38 L 110 55 L 80 55 Z" fill="#86EFAC" />
        <rect x="115" y="42" width="4" height="14" fill="#15803D" />
      </svg>
    );
  }

  if (name === 'storage-silo') {
    return (
      <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect width="200" height="120" rx="8" fill="#FEFCE8" />
        <rect x="40" y="45" width="45" height="55" rx="3" fill="#CA8A04" fillOpacity="0.25" stroke="#A16207" strokeWidth="2" />
        <path d="M38 45 Q 62.5 25 87 45 Z" fill="#A16207" />
        <rect x="100" y="35" width="65" height="65" rx="4" fill="#FACC15" fillOpacity="0.2" stroke="#CA8A04" strokeWidth="2" />
        <path d="M96 35 L 132.5 15 L 169 35 Z" fill="#CA8A04" />
        <rect x="120" y="70" width="25" height="30" fill="#713F12" rx="2" />
        <circle cx="132" cy="50" r="6" fill="#FEF08A" />
      </svg>
    );
  }

  if (name === 'crop-harvest') {
    return (
      <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect width="200" height="120" rx="8" fill="#ECFDF5" />
        <path d="M60 95 C 65 60 75 40 85 25" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="90" cy="30" rx="10" ry="5" transform="rotate(-30 90 30)" fill="#34D399" />
        <ellipse cx="80" cy="45" rx="10" ry="5" transform="rotate(25 80 45)" fill="#059669" />
        <ellipse cx="95" cy="58" rx="10" ry="5" transform="rotate(-25 95 58)" fill="#34D399" />
        <ellipse cx="85" cy="72" rx="10" ry="5" transform="rotate(30 85 72)" fill="#059669" />
        <path d="M110 95 C 115 65 125 45 135 30" stroke="#047857" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="140" cy="35" rx="9" ry="5" transform="rotate(-30 140 35)" fill="#10B981" />
        <ellipse cx="130" cy="50" rx="9" ry="5" transform="rotate(25 130 50)" fill="#047857" />
        <ellipse cx="142" cy="65" rx="9" ry="5" transform="rotate(-25 142 65)" fill="#10B981" />
      </svg>
    );
  }

  // handshake / partnership
  return (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="200" height="120" rx="8" fill="#F0FDF4" />
      <circle cx="100" cy="60" r="42" fill="#DCFCE7" />
      <path d="M65 65 L 85 55 L 100 68 L 115 55 L 135 65" stroke="#16A34A" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M80 50 L 100 65 L 120 50" stroke="#15803D" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="100" cy="38" r="8" fill="#16A34A" />
    </svg>
  );
};
