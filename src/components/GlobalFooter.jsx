import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Linkedin, Twitter, Globe } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

const GlobalFooter = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#050509] border-t border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-bold">
              <span className="text-white">Pow</span>
              <span className="text-[#D4AF37]">alyze</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Plateforme SaaS de gouvernance stratégique pour les COMEX et PMO.
            </p>
            <div className="flex gap-3">
              <a href="https://linkedin.com/company/powalyze" target="_blank" rel="noopener noreferrer" 
                 className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#D4AF37] hover:text-black transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://twitter.com/powalyze" target="_blank" rel="noopener noreferrer"
                 className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#D4AF37] hover:text-black transition-all">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Solutions</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/solutions/pmo" className="text-slate-400 hover:text-[#D4AF37] transition-colors">PMO</Link></li>
              <li><Link to="/solutions/data" className="text-slate-400 hover:text-[#D4AF37] transition-colors">Data</Link></li>
              <li><Link to="/solutions/powerbi" className="text-slate-400 hover:text-[#D4AF37] transition-colors">Power BI</Link></li>
              <li><Link to="/solutions/saas" className="text-slate-400 hover:text-[#D4AF37] transition-colors">SaaS</Link></li>
              <li><Link to="/solutions/ia" className="text-slate-400 hover:text-[#D4AF37] transition-colors">IA Prédictive</Link></li>
            </ul>
          </div>

          {/* Fonctionnalités */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Fonctionnalités</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/features/portfolio" className="text-slate-400 hover:text-[#D4AF37] transition-colors">Portfolio Manager</Link></li>
              <li><Link to="/features/executive" className="text-slate-400 hover:text-[#D4AF37] transition-colors">Executive Dashboard</Link></li>
              <li><Link to="/features/decisions" className="text-slate-400 hover:text-[#D4AF37] transition-colors">Decision Hub</Link></li>
              <li><Link to="/features/predictive" className="text-slate-400 hover:text-[#D4AF37] transition-colors">Predictive Intelligence</Link></li>
              <li><Link to="/features/governance" className="text-slate-400 hover:text-[#D4AF37] transition-colors">Governance Engine</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">{t('footer_legal')}</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-slate-400">
                <Mail className="w-4 h-4 text-[#D4AF37]" />
                <a href="mailto:contact@powalyze.com" className="hover:text-[#D4AF37] transition-colors">
                  contact@powalyze.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <a href="tel:+41225550100" className="hover:text-[#D4AF37] transition-colors">
                  +41 22 555 01 00
                </a>
              </li>
              <li className="flex items-start gap-2 text-slate-400">
                <MapPin className="w-4 h-4 text-[#D4AF37] mt-0.5" />
                <span>Rue du Rhône 14<br />1204 Genève, Suisse</span>
              </li>
              <li className="flex items-center gap-2 text-slate-400 pt-2">
                <Globe className="w-4 h-4 text-[#D4AF37]" />
                <LanguageSwitcher />
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
            <p>© {new Date().getFullYear()} Powalyze. Tous droits réservés.</p>
            <div className="flex gap-6">
              <Link to="/legal/cgu" className="hover:text-[#D4AF37] transition-colors">{t('footer_cgu')}</Link>
              <Link to="/legal/privacy" className="hover:text-[#D4AF37] transition-colors">{t('footer_privacy')}</Link>
              <Link to="/legal/mentions" className="hover:text-[#D4AF37] transition-colors">{t('footer_legal_mentions')}</Link>
            </div>
          </div>
        </div>

        {/* Service Areas */}
        <div className="pt-6 text-center">
          <p className="text-xs text-slate-600">
            {t('footer_zones_title')}: {t('switzerland')} • {t('france')} • {t('norway')} • {t('international')}
          </p>
          <p className="text-xs text-slate-600 mt-1">
            {t('footer_response_time')}: {t('contact_delay')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default GlobalFooter;
