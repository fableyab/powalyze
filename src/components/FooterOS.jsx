import React from 'react';
import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';

export default function FooterOS() {
  return (
    <footer className="relative bg-brand-blue-dark py-20 border-t border-brand-gold/20">
      <div className="absolute inset-0 tech-grid opacity-[0.05]" />

      <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-16">

        <div>
          <h4 className="text-brand-gold text-lg font-semibold mb-4">Plateforme</h4>
          <ul className="space-y-2 text-white/70 text-sm">
            <li><Link to="/app/dashboard" className="hover:text-brand-gold transition">Cockpit</Link></li>
            <li><Link to="/app/portfolio" className="hover:text-brand-gold transition">Portefeuilles</Link></li>
            <li><Link to="/app/committees" className="hover:text-brand-gold transition">Comités</Link></li>
            <li><Link to="/app/decisions" className="hover:text-brand-gold transition">Décisions</Link></li>
            <li><Link to="/app/risks" className="hover:text-brand-gold transition">Risques</Link></li>
            <li><Link to="/app/powerbi" className="hover:text-brand-gold transition">Reporting</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-brand-gold text-lg font-semibold mb-4">Solutions</h4>
          <ul className="space-y-2 text-white/70 text-sm">
            <li><Link to="/solutions-page" className="hover:text-brand-gold transition">Vue d'ensemble</Link></li>
            <li><Link to="/solutions/pmo" className="hover:text-brand-gold transition">PMO & Direction</Link></li>
            <li><Link to="/solutions/data-bi" className="hover:text-brand-gold transition">Data & BI</Link></li>
            <li><Link to="/solutions/chefs-projet" className="hover:text-brand-gold transition">Chefs de Projet</Link></li>
            <li><Link to="/solutions/direction" className="hover:text-brand-gold transition">Direction Générale</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-brand-gold text-lg font-semibold mb-4">Entreprise</h4>
          <ul className="space-y-2 text-white/70 text-sm">
            <li><Link to="/about" className="hover:text-brand-gold transition">À propos</Link></li>
            <li><Link to="/demo-new" className="hover:text-brand-gold transition">Démo</Link></li>
            <li><Link to="/contact" className="hover:text-brand-gold transition">Contact</Link></li>
            <li><Link to="/cgu" className="hover:text-brand-gold transition">CGU</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-brand-gold transition">Confidentialité</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-brand-gold text-lg font-semibold mb-4">Contact</h4>
          <ul className="space-y-3 text-white/70 text-sm">
            <li>
              <a href="mailto:contact@powalyze.com" className="hover:text-brand-gold transition">
                contact@powalyze.com
              </a>
            </li>
            <li>
              <a href="mailto:contact@powalyze.ch" className="hover:text-brand-gold transition">
                contact@powalyze.ch
              </a>
            </li>
            <li>
              <a href="tel:+33615767067" className="hover:text-brand-gold transition">
                +33 6 15 76 70 67
              </a>
            </li>
            <li className="pt-4 border-t border-brand-gold/20">
              <p className="text-xs text-brand-gold/60 uppercase tracking-wider mb-2 flex items-center gap-1">
                <Globe className="w-3 h-3" /> Zones d'intervention
              </p>
              <p className="text-white">🇨🇭 Suisse • 🇫🇷 France • 🇳🇴 Norvège • 🌍 International</p>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative text-center text-white/40 mt-16 text-sm">
        © {new Date().getFullYear()} Powalyze AG — Powered by Powalyze OS
      </div>
    </footer>
  );
}
