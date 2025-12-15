import React from 'react';

const BaseSVG = ({ children, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 400 300" 
    preserveAspectRatio="xMidYMid slice"
    className={`w-full h-full ${className}`}
  >
    <defs>
      <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#111111" />
        <stop offset="50%" stopColor="#1a1a1a" />
        <stop offset="100%" stopColor="#0A0A0A" />
      </linearGradient>
      <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#BFA76A" />
        <stop offset="100%" stopColor="#8C7A4D" />
      </linearGradient>
      <linearGradient id="gold-glow" x1="0%" y1="0%" x2="100%" y2="0%">
         <stop offset="0%" stopColor="rgba(191, 167, 106, 0)" />
         <stop offset="50%" stopColor="rgba(191, 167, 106, 0.1)" />
         <stop offset="100%" stopColor="rgba(191, 167, 106, 0)" />
      </linearGradient>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#222" strokeWidth="1"/>
      </pattern>
    </defs>
    <rect width="400" height="300" fill="url(#bg-gradient)" />
    <rect width="400" height="300" fill="url(#grid)" opacity="0.5" />
    {children}
  </svg>
);

export const StrategicPMOVisual = () => (
  <BaseSVG>
    {/* Abstract Background Flow */}
    <path d="M-50 250 C 50 250, 100 150, 200 150 S 350 50, 450 50" stroke="url(#gold-glow)" strokeWidth="40" fill="none" />

    {/* Connecting Nodes */}
    <g transform="translate(200, 150)">
       {/* Central Hub */}
       <circle r="40" fill="none" stroke="#BFA76A" strokeWidth="1" opacity="0.3" />
       <circle r="30" fill="#1a1a1a" stroke="#BFA76A" strokeWidth="2" />
       <circle r="8" fill="#BFA76A" />
       
       {/* Satellite Nodes */}
       <g opacity="0.8">
         <line x1="0" y1="0" x2="80" y2="-60" stroke="#444" strokeWidth="1" />
         <circle cx="80" cy="-60" r="12" fill="#111" stroke="#666" strokeWidth="1" />
         <circle cx="80" cy="-60" r="4" fill="#666" />

         <line x1="0" y1="0" x2="90" y2="40" stroke="#444" strokeWidth="1" />
         <circle cx="90" cy="40" r="15" fill="#111" stroke="#BFA76A" strokeWidth="1" />
         <circle cx="90" cy="40" r="5" fill="#BFA76A" opacity="0.5" />

         <line x1="0" y1="0" x2="-70" y2="50" stroke="#444" strokeWidth="1" />
         <circle cx="-70" cy="50" r="10" fill="#111" stroke="#666" strokeWidth="1" />
         
         <line x1="0" y1="0" x2="-60" y2="-70" stroke="#444" strokeWidth="1" />
         <circle cx="-60" cy="-70" r="8" fill="#111" stroke="#666" strokeWidth="1" />
       </g>
    </g>

    {/* Typography Overlay - stylized background text */}
    <text x="200" y="280" textAnchor="middle" fill="#fff" opacity="0.03" fontSize="60" fontWeight="900" fontFamily="Arial, sans-serif">STRATEGY</text>
    <text x="380" y="30" textAnchor="end" fill="#BFA76A" opacity="0.8" fontSize="10" letterSpacing="2" fontWeight="bold">PORTFOLIO MANAGEMENT</text>
  </BaseSVG>
);

export const BusinessIntelligenceVisual = () => (
  <BaseSVG>
    {/* Data Streams */}
    <g opacity="0.1">
      <text x="20" y="50" fill="#BFA76A" fontSize="10" fontFamily="monospace">01010010 10101010</text>
      <text x="20" y="70" fill="#BFA76A" fontSize="10" fontFamily="monospace">11001010 00101011</text>
      <text x="20" y="90" fill="#BFA76A" fontSize="10" fontFamily="monospace">00111010 11100010</text>
    </g>

    {/* Chart Elements */}
    <g transform="translate(50, 50)">
       {/* Bars */}
       <rect x="20" y="150" width="30" height="50" fill="#222" stroke="#444" />
       <rect x="70" y="100" width="30" height="100" fill="#222" stroke="#444" />
       <rect x="120" y="120" width="30" height="80" fill="#222" stroke="#444" />
       <rect x="170" y="60" width="30" height="140" fill="url(#gold-gradient)" opacity="0.8" />
       <rect x="220" y="30" width="30" height="170" fill="url(#gold-gradient)" />
       
       {/* Trend Line */}
       <polyline points="35,150 85,100 135,120 185,60 235,30" fill="none" stroke="#fff" strokeWidth="2" opacity="0.8" />
       <circle cx="185" cy="60" r="4" fill="#fff" />
       <circle cx="235" cy="30" r="4" fill="#fff" stroke="#BFA76A" strokeWidth="2" />
       
       {/* Floating Data Badge */}
       <g transform="translate(250, 40)">
          <rect width="60" height="24" rx="4" fill="#1a1a1a" stroke="#BFA76A" strokeWidth="1" />
          <text x="30" y="16" textAnchor="middle" fill="#BFA76A" fontSize="10" fontWeight="bold">+124%</text>
       </g>
    </g>

    <text x="200" y="280" textAnchor="middle" fill="#fff" opacity="0.03" fontSize="60" fontWeight="900" fontFamily="Arial, sans-serif">ANALYTICS</text>
    <text x="380" y="30" textAnchor="end" fill="#BFA76A" opacity="0.8" fontSize="10" letterSpacing="2" fontWeight="bold">DATA INSIGHTS</text>
  </BaseSVG>
);

export const AutomationAIVisual = () => (
  <BaseSVG>
    {/* Circuit/Network Patterns */}
    <g transform="translate(200, 150)" opacity="0.3">
       <circle r="80" fill="none" stroke="#BFA76A" strokeWidth="0.5" strokeDasharray="5 5" />
       <circle r="110" fill="none" stroke="#444" strokeWidth="0.5" />
    </g>

    {/* Neural Network Nodes */}
    <g transform="translate(50, 40)">
       <circle cx="50" cy="50" r="4" fill="#444" />
       <circle cx="50" cy="150" r="4" fill="#444" />
       <circle cx="150" cy="100" r="6" fill="#666" />
       <circle cx="250" cy="50" r="4" fill="#444" />
       <circle cx="250" cy="150" r="4" fill="#444" />
       
       {/* Central AI Brain Node */}
       <g transform="translate(150, 100)">
         <circle r="20" fill="url(#gold-gradient)" opacity="0.2" />
         <circle r="10" fill="url(#gold-gradient)" />
         <circle r="15" fill="none" stroke="#BFA76A" strokeWidth="1" strokeDasharray="4 4">
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="10s" repeatCount="indefinite" />
         </circle>
       </g>
       
       {/* Connections */}
       <path d="M50 50 L150 100 L250 50" stroke="#BFA76A" strokeWidth="1" opacity="0.6" />
       <path d="M50 150 L150 100 L250 150" stroke="#BFA76A" strokeWidth="1" opacity="0.6" />
       <path d="M50 50 L50 150" stroke="#444" strokeWidth="0.5" opacity="0.3" />
    </g>

    {/* Processing Pulse lines */}
    <line x1="0" y1="280" x2="400" y2="280" stroke="#222" strokeWidth="2" />
    <rect x="50" y="279" width="40" height="2" fill="#BFA76A">
       <animate attributeName="x" from="-40" to="440" dur="2s" repeatCount="indefinite" />
    </rect>

    <text x="200" y="250" textAnchor="middle" fill="#fff" opacity="0.03" fontSize="60" fontWeight="900" fontFamily="Arial, sans-serif">INTELLIGENCE</text>
    <text x="380" y="30" textAnchor="end" fill="#BFA76A" opacity="0.8" fontSize="10" letterSpacing="2" fontWeight="bold">AI AUTOMATION</text>
  </BaseSVG>
);

export const GovernanceRiskVisual = () => (
  <BaseSVG>
    {/* Radar Background */}
    <g transform="translate(200, 150)" opacity="0.2">
       <polygon points="0,-100 95,-31 59,81 -59,81 -95,-31" fill="none" stroke="#666" strokeWidth="1" />
       <polygon points="0,-70 66,-21 41,56 -41,56 -66,-21" fill="none" stroke="#666" strokeWidth="1" />
       <polygon points="0,-40 38,-12 23,32 -23,32 -38,-12" fill="none" stroke="#666" strokeWidth="1" />
    </g>

    {/* Shield Icon */}
    <g transform="translate(200, 150) scale(0.8)">
       <path d="M0 -60 C 40 -60, 70 -30, 70 20 C 70 60, 0 100, 0 100 C 0 100, -70 60, -70 20 C -70 -30, -40 -60, 0 -60 Z" fill="#111" stroke="url(#gold-gradient)" strokeWidth="3" />
       
       {/* Lock / Security Symbol */}
       <g transform="translate(0, 10)">
         <rect x="-20" y="0" width="40" height="30" rx="3" fill="#BFA76A" />
         <path d="M-12 0 V-15 C -12 -25, 12 -25, 12 -15 V0" fill="none" stroke="#8C7A4D" strokeWidth="4" />
         <circle cx="0" cy="15" r="4" fill="#111" />
       </g>
    </g>
    
    {/* Verification Ticks */}
    <g transform="translate(320, 150)">
       <circle r="15" fill="#1a1a1a" stroke="#BFA76A" strokeWidth="1" />
       <path d="M-5 0 L-1 4 L5 -4" stroke="#BFA76A" strokeWidth="2" fill="none" />
    </g>
    <g transform="translate(80, 150)">
       <circle r="15" fill="#1a1a1a" stroke="#444" strokeWidth="1" />
       <path d="M-5 0 L-1 4 L5 -4" stroke="#444" strokeWidth="2" fill="none" />
    </g>

    <text x="200" y="280" textAnchor="middle" fill="#fff" opacity="0.03" fontSize="60" fontWeight="900" fontFamily="Arial, sans-serif">SECURITY</text>
    <text x="380" y="30" textAnchor="end" fill="#BFA76A" opacity="0.8" fontSize="10" letterSpacing="2" fontWeight="bold">GOVERNANCE & RISK</text>
  </BaseSVG>
);