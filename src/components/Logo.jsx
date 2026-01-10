
import React from 'react';
import { cn } from '@/lib/utils';

const Logo = ({ className, size = "default", textVisible = true }) => {
  const sizes = {
    sm: "h-9",
    default: "h-12",
    lg: "h-16",
    xl: "h-20"
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className={cn(
        "relative flex items-center justify-center shrink-0",
        sizes[size]
      )}>
        <svg viewBox="0 0 400 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-auto">
          <defs>
            {/* Gradient doré premium */}
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor: '#FFD700', stopOpacity: 1}} />
              <stop offset="50%" style={{stopColor: '#D4AF37', stopOpacity: 1}} />
              <stop offset="100%" style={{stopColor: '#B8860B', stopOpacity: 1}} />
            </linearGradient>
            
            {/* Gradient bleu électrique */}
            <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor: '#60A5FA', stopOpacity: 1}} />
              <stop offset="50%" style={{stopColor: '#3B82F6', stopOpacity: 1}} />
              <stop offset="100%" style={{stopColor: '#2563EB', stopOpacity: 1}} />
            </linearGradient>

            {/* Effet de brillance */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Logo Icon - Style moderne et épuré */}
          <g transform="translate(10, 15)">
            {/* Forme principale - Bouclier/Hexagone moderne */}
            <path d="M40 10 L60 0 L80 10 L80 50 L60 60 L40 50 Z" 
                  fill="url(#goldGradient)" 
                  filter="url(#glow)"
                  opacity="0.95"/>
            
            {/* Lettre P stylisée intégrée */}
            <path d="M50 15 L50 45 M50 15 L65 15 Q72 15 72 25 Q72 35 65 35 L50 35" 
                  stroke="#0F0F0F" 
                  strokeWidth="4" 
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"/>
            
            {/* Accent bleu - Ligne dynamique */}
            <path d="M30 25 L35 30 L30 35" 
                  stroke="url(#blueGradient)" 
                  strokeWidth="3" 
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.8"/>
            
            {/* Point d'accent or */}
            <circle cx="72" cy="25" r="3" fill="#FFD700"/>
          </g>

          {/* Texte POWALYZE */}
          {textVisible && (
            <g transform="translate(95, 0)">
              <text x="0" y="50" 
                    fontFamily="system-ui, -apple-system, sans-serif" 
                    fontWeight="300" 
                    fontSize="28" 
                    fill="url(#goldGradient)"
                    letterSpacing="3">
                POWALYZE
              </text>
              
              {/* Ligne de séparation élégante */}
              <line x1="0" y1="60" x2="180" y2="60" 
                    stroke="url(#goldGradient)" 
                    strokeWidth="1" 
                    opacity="0.4"/>
              
              {/* Sous-titre */}
              <text x="0" y="80" 
                    fontFamily="system-ui, -apple-system, sans-serif" 
                    fontSize="9" 
                    fill="#4A9EFF"
                    letterSpacing="2.5"
                    opacity="0.95">
                STRATEGIC PORTFOLIO INTELLIGENCE
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};

export default Logo;
