import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-powalyze-blue to-powalyze-blue-dark flex items-center justify-center">
                <span className="text-2xl font-black text-white">P</span>
              </div>
              <div>
                <div className="text-xl font-black text-white">POWALYZE</div>
                <div className="text-xs text-amber-500 font-semibold tracking-wider">CONSEIL SUISSE PREMIUM</div>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Le cockpit stratégique des PMO modernes. Pilotez votre portefeuille de projets avec clarté et confiance.
            </p>
            <div className="flex gap-4">
              <a
                href="https://linkedin.com/company/powalyze"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-powalyze-blue flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/powalyze"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-powalyze-blue flex items-center justify-center transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Produit</h4>
            <ul className="space-y-3">
              <li>
                <a href="#fonctionnalites" className="text-sm hover:text-white transition-colors">
                  Fonctionnalités
                </a>
              </li>
              <li>
                <a href="#cas-usage" className="text-sm hover:text-white transition-colors">
                  Cas d'usage
                </a>
              </li>
              <li>
                <a href="#avantages" className="text-sm hover:text-white transition-colors">
                  Avantages
                </a>
              </li>
              <li>
                <Link to="/workspace" className="text-sm hover:text-white transition-colors">
                  Workspace PMO
                </Link>
              </li>
              <li>
                <a href="#demo" className="text-sm hover:text-white transition-colors">
                  Demander une démo
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Ressources</h4>
            <ul className="space-y-3">
              <li>
                <a href="#faq" className="text-sm hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/docs" className="text-sm hover:text-white transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="/blog" className="text-sm hover:text-white transition-colors">
                  Blog & Insights
                </a>
              </li>
              <li>
                <a href="/webinars" className="text-sm hover:text-white transition-colors">
                  Webinaires PMO
                </a>
              </li>
              <li>
                <a href="/templates" className="text-sm hover:text-white transition-colors">
                  Templates gratuits
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-white mb-1">Email</div>
                  <a href="mailto:contact@powalyze.ch" className="text-sm hover:text-white transition-colors">
                    contact@powalyze.ch
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-white mb-1">Téléphone</div>
                  <a href="tel:+41225667788" className="text-sm hover:text-white transition-colors">
                    +41 22 566 77 88
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-white mb-1">Adresse</div>
                  <p className="text-sm">
                    Route de Chêne 30<br />
                    1208 Genève, Suisse
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Powalyze SA. Tous droits réservés.
            </p>
            <div className="flex gap-6">
              <a href="/legal/privacy" className="text-sm text-gray-500 hover:text-white transition-colors">
                Politique de confidentialité
              </a>
              <a href="/legal/terms" className="text-sm text-gray-500 hover:text-white transition-colors">
                Conditions générales
              </a>
              <a href="/legal/cookies" className="text-sm text-gray-500 hover:text-white transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
