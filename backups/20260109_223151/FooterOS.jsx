import React from 'react';

export default function FooterOS() {
  return (
    <footer className="py-16 md:py-20 bg-black border-t border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16">

        <div>
          <h4 className="text-[#D4AF37] text-xl md:text-2xl font-bold mb-4 md:mb-6">Powalyze</h4>
          <p className="text-[#4A9EFF] text-sm mb-4">
            Le Governance OS de nouvelle génération pour PMO et comités exécutifs.
          </p>
          <div className="space-y-2 text-white/70 text-sm">
            <p className="flex items-center gap-2">
              <span className="text-[#D4AF37]">📧</span>
              <a href="mailto:contact@powalyze.com" className="hover:text-[#D4AF37] transition">contact@powalyze.com</a>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-[#D4AF37]">📞</span>
              <a href="tel:+41123456789" className="hover:text-[#D4AF37] transition">+41 12 345 67 89</a>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-[#D4AF37]">📍</span>
              <span>Genève, Suisse</span>
            </p>
          </div>
        </div>

        <div>
          <h4 className="text-[#D4AF37] text-base md:text-lg font-semibold mb-4">Plateforme</h4>
          <ul className="space-y-2 text-white/70 text-sm">
            <li className="hover:text-white transition-colors cursor-pointer">Cockpit</li>
            <li className="hover:text-white transition-colors cursor-pointer">Portefeuilles</li>
            <li className="hover:text-white transition-colors cursor-pointer">Comités</li>
            <li className="hover:text-white transition-colors cursor-pointer">Décisions</li>
            <li className="hover:text-white transition-colors cursor-pointer">Risques</li>
            <li className="hover:text-white transition-colors cursor-pointer">Reporting</li>
          </ul>
        </div>

        <div>
          <h4 className="text-[#D4AF37] text-base md:text-lg font-semibold mb-4">Ressources</h4>
          <ul className="space-y-2 text-white/70 text-sm">
            <li className="hover:text-white transition-colors cursor-pointer">Documentation</li>
            <li className="hover:text-white transition-colors cursor-pointer">Modèles</li>
            <li className="hover:text-white transition-colors cursor-pointer">Guides PMO</li>
            <li className="hover:text-white transition-colors cursor-pointer">API</li>
          </ul>
        </div>

        <div>
          <h4 className="text-[#D4AF37] text-base md:text-lg font-semibold mb-4">À propos</h4>
          <ul className="space-y-2 text-white/70 text-sm">
            <li className="hover:text-white transition-colors cursor-pointer">Vision</li>
            <li className="hover:text-white transition-colors cursor-pointer">Gouvernance moderne</li>
            <li className="hover:text-white transition-colors cursor-pointer">Sécurité</li>
            <li className="hover:text-white transition-colors cursor-pointer">Contact</li>
          </ul>
        </div>
      </div>

      <div className="text-center text-white/40 mt-12 md:mt-16 text-sm">
        <p className="mb-2">Powered by Powalyze OS</p>
        <p className="text-xs">© 2026 Powalyze. Tous droits réservés.</p>
      </div>
    </footer>
  );
}
