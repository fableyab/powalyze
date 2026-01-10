import React from 'react';

/**
 * Composant visuel Blueprint industriel
 * Fond noir, lignes bleu électrique, points or/ambre, géométrie technique
 */
const BlueprintVisual = ({ 
  imageSrc = null, 
  alt = "Schéma blueprint Powalyze", 
  variant = "hero", // hero | platform | governance | scenarios
  className = "" 
}) => {
  const heightClass = {
    hero: "h-64 md:h-80",
    platform: "h-40",
    governance: "h-48",
    scenarios: "h-56"
  }[variant] || "h-64";

  return (
    <div className={`relative ${className}`}>
      {/* Halo lumineux blueprint */}
      <div className="absolute -inset-10 bg-gradient-to-br from-sky-500/20 via-transparent to-amber-400/15 blur-3xl opacity-70" />
      
      {/* Conteneur blueprint */}
      <div className={`relative ${heightClass} overflow-hidden rounded-md border border-slate-800/60 bg-black/90`}>
        {/* Vidéo blueprint */}
        <video
          src="/videos/manifeste-powalyze.mp4"
          className="absolute inset-0 w-full h-full object-contain opacity-90"
          autoPlay
          loop
          muted
          playsInline
        />
        
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={alt}
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
        ) : (
          // Placeholder blueprint avec gradients CSS
          <div className="absolute inset-0">
            {/* Grille technique */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(90deg, rgba(14, 165, 233, 0.1) 1px, transparent 1px),
                  linear-gradient(0deg, rgba(14, 165, 233, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px'
              }}
            />
            
            {/* Lignes diagonales blueprint */}
            <div className="absolute inset-0 opacity-30">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="blueprint-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(14, 165, 233, 0.3)" strokeWidth="0.5"/>
                    <line x1="50" y1="0" x2="50" y2="100" stroke="rgba(14, 165, 233, 0.3)" strokeWidth="0.5"/>
                    <circle cx="50" cy="50" r="2" fill="rgba(251, 191, 36, 0.6)"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#blueprint-pattern)"/>
              </svg>
            </div>
            
            {/* Gradient central blueprint */}
            <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/10 via-transparent to-amber-300/15" />
            
            {/* Points lumineux or/ambre */}
            <div className="absolute top-8 left-12 w-2 h-2 rounded-full bg-amber-400/60 blur-sm" />
            <div className="absolute top-20 right-16 w-1.5 h-1.5 rounded-full bg-sky-400/60 blur-sm" />
            <div className="absolute bottom-12 left-24 w-1.5 h-1.5 rounded-full bg-amber-400/60 blur-sm" />
            <div className="absolute bottom-16 right-12 w-2 h-2 rounded-full bg-sky-400/60 blur-sm" />
          </div>
        )}
        
        {/* Overlay sombre pour effet blueprint */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        
        {/* Label technique */}
        <div className="relative z-10 p-3 flex justify-between text-[0.65rem] text-slate-400">
          <span className="font-mono">POWALYZE_MANIFESTE</span>
          <span className="font-mono opacity-60">BLUEPRINT_SYS</span>
        </div>
      </div>
    </div>
  );
};

export default BlueprintVisual;
