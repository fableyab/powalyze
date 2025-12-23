import React from 'react';
import { Link } from 'react-router-dom';
import { FiLinkedin, FiTwitter, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#BFA76A] to-[#8B7355] rounded-lg flex items-center justify-center font-bold text-black text-xl">P</div>
              <span className="text-xl font-bold text-white">POWALYZE</span>
            </div>
            <p className="text-gray-400 mb-4">La plateforme PMO de référence pour piloter vos projets avec intelligence.</p>
            <div className="flex gap-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#BFA76A] transition-colors">
                <FiLinkedin size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#BFA76A] transition-colors">
                <FiTwitter size={20} />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-bold mb-4">Produit</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="text-gray-400 hover:text-[#BFA76A] transition-colors">Fonctionnalités</a></li>
              <li><Link to="/services/pmo-strategique" className="text-gray-400 hover:text-[#BFA76A] transition-colors">PMO Stratégique</Link></li>
              <li><Link to="/services/automatisation-ia" className="text-gray-400 hover:text-[#BFA76A] transition-colors">Automatisation IA</Link></li>
              <li><Link to="/espace-pro/dashboard" className="text-gray-400 hover:text-[#BFA76A] transition-colors">Espace Pro</Link></li>
              <li><Link to="/espace-admin/dashboard" className="text-gray-400 hover:text-[#BFA76A] transition-colors">Espace Admin</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-bold mb-4">Ressources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-[#BFA76A] transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#BFA76A] transition-colors">Guides</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#BFA76A] transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#BFA76A] transition-colors">Support</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#BFA76A] transition-colors">API</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400">
                <FiMail size={16} />
                <span>contact@powalyze.com</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <FiPhone size={16} />
                <span>+41 XX XXX XX XX</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <FiMapPin size={16} />
                <span>Genève, Suisse</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2025 Powalyze. Tous droits réservés.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-[#BFA76A] text-sm transition-colors">Mentions légales</a>
            <a href="#" className="text-gray-400 hover:text-[#BFA76A] text-sm transition-colors">Confidentialité</a>
            <a href="#" className="text-gray-400 hover:text-[#BFA76A] text-sm transition-colors">CGU</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
