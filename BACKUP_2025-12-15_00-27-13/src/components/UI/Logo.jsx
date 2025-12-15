import React from 'react';
import { Link } from 'react-router-dom';

const Logo = ({ className = "", showSubtitle = true, scale = 1 }) => {
  // Scale factor for resizing the SVG purely via props if needed, 
  // though CSS className is preferred for container sizing.
  
  return (
    <Link 
      to="/" 
      className={`flex items-center gap-3 group hover:opacity-90 transition-opacity ${className}`}
      aria-label="Powalyze Home"
    >
      {/* Minimalist Geometric Symbol */}
      <div className="relative flex-shrink-0" style={{ width: 32 * scale, height: 32 * scale }}>
        <svg 
          viewBox="0 0 40 40" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-visible"
        >
          {/* Gold Pillar: Stability & Leadership */}
          <rect 
            x="4" 
            y="2" 
            width="8" 
            height="36" 
            rx="1" 
            fill="#BFA76A" 
            className="drop-shadow-[0_0_8px_rgba(191,167,106,0.3)]"
          />
          
          {/* Electric Blue Strategic Arc: Vision & Clarity */}
          {/* Abstract 'P' loop that implies forward motion/strategy */}
          <path 
            d="M16 6H24C30.6274 6 36 11.3726 36 18C36 24.6274 30.6274 30 24 30H16V22H24C26.2091 22 28 20.2091 28 18C28 15.7909 26.2091 14 24 14H16V6Z" 
            fill="#3A7BFF"
          />
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col justify-center">
        <span 
          className="font-bold leading-none text-[#BFA76A] tracking-wide"
          style={{ 
            fontFamily: '"Segoe UI", sans-serif', 
            fontSize: `${1.25 * scale}rem` 
          }}
        >
          POWALYZE
        </span>
        
        {showSubtitle && (
          <span 
            className="font-light text-[#3A7BFF] leading-tight uppercase tracking-wider hidden sm:block"
            style={{ 
              fontFamily: '"Segoe UI", sans-serif',
              fontSize: `${0.55 * scale}rem`,
              marginTop: '2px'
            }}
          >
            L'art du pilotage stratégique
          </span>
        )}
      </div>
    </Link>
  );
};

export default Logo;