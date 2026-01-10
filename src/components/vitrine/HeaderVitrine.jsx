import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeaderVitrine() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 left-0 w-full z-50 bg-black/95 backdrop-blur-xl border-b border-[#D4AF37]/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="text-[#D4AF37] font-semibold text-lg tracking-wide hover:text-[#D4AF37]/80 transition">
          POWALYZE
        </Link>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex items-center gap-8 text-white/80 text-sm">
          <a href="#features" className="hover:text-[#D4AF37] transition">Fonctionnalités</a>
          <a href="#demo" className="hover:text-[#D4AF37] transition">Démo</a>
          <a href="#results" className="hover:text-[#D4AF37] transition">Résultats</a>
          <Link to="/contact" className="hover:text-[#D4AF37] transition">Contact</Link>
        </nav>

        {/* CTA */}
        <Link 
          to="/app-modules"
          className="hidden md:block px-5 py-2 bg-[#D4AF37] text-black rounded-md font-medium shadow hover:shadow-[#D4AF37]/40 transition text-sm"
        >
          Essayer
        </Link>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-[#0A1A2F] border-t border-white/10 px-6 py-4 space-y-4 animate-fadeIn">
          <a href="#features" className="block text-white/80 hover:text-[#D4AF37] transition">Fonctionnalités</a>
          <a href="#demo" className="block text-white/80 hover:text-[#D4AF37] transition">Démo</a>
          <a href="#results" className="block text-white/80 hover:text-[#D4AF37] transition">Résultats</a>
          <Link to="/contact" className="block text-white/80 hover:text-[#D4AF37] transition">Contact</Link>

          <Link 
            to="/app-modules"
            className="block w-full text-center px-5 py-2 bg-[#D4AF37] text-black rounded-md font-medium shadow hover:shadow-[#D4AF37]/40 transition"
          >
            Essayer
          </Link>
        </div>
      )}
    </header>
  );
}
