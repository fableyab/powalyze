import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const PremiumLayout = ({ children }) => {
  const location = useLocation();
  const { t } = useLanguage();
  
  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-[#000000] text-white relative">
      {/* Texture légère */}
      <div 
        className="fixed inset-0 opacity-[0.015] pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Header minimaliste */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#000000]/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-xl font-light tracking-wide">
              Powalyze
            </Link>
            
            <nav className="hidden md:flex items-center gap-10 font-light text-sm">
              <Link 
                to="/" 
                className={`transition-colors ${isActive('/') ? 'text-[#D4AF37]' : 'text-white/50 hover:text-[#D4AF37]'}`}
              >
                {t('layout.home')}
              </Link>
              <Link 
                to="/services" 
                className={`transition-colors ${isActive('/services') ? 'text-[#D4AF37]' : 'text-white/50 hover:text-[#D4AF37]'}`}
              >
                {t('layout.services')}
              </Link>
              <Link 
                to="/methode" 
                className={`transition-colors ${isActive('/methode') ? 'text-[#D4AF37]' : 'text-white/50 hover:text-[#D4AF37]'}`}
              >
                {t('layout.method')}
              </Link>
              <Link 
                to="/about" 
                className={`transition-colors ${isActive('/about') ? 'text-[#D4AF37]' : 'text-white/50 hover:text-[#D4AF37]'}`}
              >
                {t('layout.about')}
              </Link>
              <Link 
                to="/contact" 
                className={`transition-colors ${isActive('/contact') ? 'text-[#D4AF37]' : 'text-white/50 hover:text-[#D4AF37]'}`}
              >
                {t('layout.contact')}
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <Link 
                to="/login" 
                className="px-7 py-2.5 border border-[#D4AF37] text-[#D4AF37] text-sm font-light hover:bg-[#D4AF37] hover:text-[#000000] transition-all rounded-sm"
              >
                {t('layout.login')}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="relative z-10">
        {children}
      </main>

      {/* Footer minimal */}
      <footer className="relative py-16 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <div className="text-xl font-light mb-2">Powalyze</div>
              <p className="text-sm font-light text-white/40">{t('layout.tagline')}</p>
            </div>

            <nav className="flex flex-wrap items-center justify-center gap-8 text-sm font-light text-white/50">
              <Link to="/about" className="hover:text-[#D4AF37] transition-colors">{t('layout.about')}</Link>
              <Link to="/services" className="hover:text-[#D4AF37] transition-colors">{t('layout.services')}</Link>
              <Link to="/contact" className="hover:text-[#D4AF37] transition-colors">{t('layout.contact')}</Link>
              <Link to="/cgu" className="hover:text-[#D4AF37] transition-colors">{t('layout.cgu')}</Link>
              <Link to="/login" className="hover:text-[#D4AF37] transition-colors">{t('layout.platformAccess')}</Link>
            </nav>
          </div>

          <div className="mt-12 pt-8 border-t border-white/5 text-center">
            <p className="text-xs font-light text-white/30">
              {t('layout.copyright')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PremiumLayout;
