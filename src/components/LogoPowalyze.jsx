// Logo Powalyze - Swiss Precision Design
export default function LogoPowalyze({ size = "default", animated = false }) {
  const sizes = {
    small: "w-8 h-8",
    default: "w-10 h-10",
    large: "w-14 h-14",
    xlarge: "w-20 h-20",
  };

  return (
    <div className={`relative ${sizes[size]} flex items-center justify-center`}>
      {/* Swiss precision border */}
      <div className="relative z-10 w-full h-full rounded-[2px] border border-[#D4AF37]/30 p-[1px] hover:border-[#D4AF37]/60 hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] transition-all duration-700">
        <div className="w-full h-full rounded-[1px] bg-black flex items-center justify-center relative overflow-hidden">
          {/* Subtle shine effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/0 via-[#D4AF37]/5 to-[#D4AF37]/0 opacity-0 hover:opacity-100 transition-opacity duration-700" />
          
          {/* PZ monogram - Swiss typography */}
          <div className="relative text-base font-light text-[#D4AF37] tracking-[0.1em]">
            PZ
          </div>
        </div>
      </div>
    </div>
  );
}

// Logo avec texte pour le header - Swiss precision
export function LogoWithText({ size = "default" }) {
  return (
    <div className="flex items-center gap-3">
      <LogoPowalyze size={size} />
      <div className="flex flex-col">
        <div className="text-sm font-light tracking-[0.25em] text-white uppercase">
          POWALYZE
        </div>
        <div className="text-[8px] text-white tracking-[0.3em] uppercase font-extralight">
          Swiss Precision
        </div>
      </div>
    </div>
  );
}
