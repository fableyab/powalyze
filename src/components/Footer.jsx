
import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Github, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-slate-800 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <span className="text-white font-bold text-xl tracking-tight">POWALYZE</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              La plateforme de référence pour le pilotage stratégique et la gouvernance de données. Transformez votre vision en résultats.
            </p>
            <div className="flex gap-4">
              <a href="https://linkedin.com/company/powalyze" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#D4AF37] transition-colors"><Linkedin className="w-5 h-5" /></a>
              <a href="https://twitter.com/powalyze" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#D4AF37] transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="https://github.com/powalyze" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#D4AF37] transition-colors"><Github className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-white font-bold mb-6">Solutions</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><Link to="/discover/pmo-strategique" className="hover:text-[#D4AF37] transition-colors">PMO Stratégique</Link></li>
              <li><Link to="/discover/automation-ai" className="hover:text-[#D4AF37] transition-colors">Automation & IA</Link></li>
              <li><Link to="/discover/cockpit-executif" className="hover:text-[#D4AF37] transition-colors">Cockpit Exécutif</Link></li>
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-white font-bold mb-6">Plateforme</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><Link to="/how-it-works" className="hover:text-[#D4AF37] transition-colors">Comment ça marche</Link></li>
              <li><Link to="/app/pitch-deck" className="hover:text-[#D4AF37] transition-colors">Pitch Deck</Link></li>
              <li><Link to="/app/executive-hub" className="hover:text-[#D4AF37] transition-colors">Executive Hub</Link></li>
              <li><Link to="/cognitive-theater" className="hover:text-[#D4AF37] transition-colors">Cognitive Theater</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-bold mb-6">Entreprise</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><Link to="/about" className="hover:text-[#D4AF37] transition-colors">À propos</Link></li>
              <li><Link to="/consulting" className="hover:text-[#D4AF37] transition-colors">Consulting & SaaS</Link></li>
              <li><Link to="/contact" className="hover:text-[#D4AF37] transition-colors">Contact</Link></li>
              <li><Link to="/blog" className="hover:text-[#D4AF37] transition-colors">Blog</Link></li>
              <li><Link to="/demo" className="hover:text-[#D4AF37] transition-colors">Demander une démo</Link></li>
            </ul>
          </div>

          {/* Legal & Locations */}
          <div>
            <h4 className="text-white font-bold mb-6">Légal & Contact</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><Link to="/cgu" className="hover:text-[#D4AF37] transition-colors">CGU</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-[#D4AF37] transition-colors">Politique de Confidentialité</Link></li>
              <li><Link to="/legal" className="hover:text-[#D4AF37] transition-colors">Mentions Légales</Link></li>
              <li className="pt-4 border-t border-slate-800">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Email</p>
                <a href="mailto:contact@powalyze.com" className="hover:text-[#D4AF37] transition-colors block">
                  contact@powalyze.com
                </a>
                <a href="mailto:contact@powalyze.ch" className="hover:text-[#D4AF37] transition-colors block">
                  contact@powalyze.ch
                </a>
              </li>
              <li>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Téléphone</p>
                <a href="tel:+33615767067" className="hover:text-[#D4AF37] transition-colors">
                  +33 6 15 76 70 67
                </a>
              </li>
              <li>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Zones d'intervention</p>
                <p className="text-white text-sm">🇨🇭 Suisse • 🇫🇷 France • 🇳🇴 Norvège • 🌍 International</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} Powalyze AG. Tous droits réservés.
          </p>
          <div className="flex gap-6 text-xs text-slate-500">
             <span>Made with ❤️ in Zürich</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
