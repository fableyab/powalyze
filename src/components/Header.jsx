
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AnimatedLogo from '@/components/AnimatedLogo';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import OrganizationSwitcher from '@/components/OrganizationSwitcher';
import gsap from 'gsap';

const Header = () => {
  const { t } = useTranslation('common');
  const { user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // GSAP refs
  const headerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const dropdownRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ✨ GSAP Animation: Navbar fade-in au chargement
  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { 
          y: -20
        },
        { 
          y: 0,
          duration: 0.8, 
          ease: 'power3.out',
          delay: 0.1
        }
      );
    }
  }, []);

  // ✨ GSAP Animation: Menu mobile slide-in
  useEffect(() => {
    if (isMobileMenuOpen && mobileMenuRef.current) {
      gsap.fromTo(
        mobileMenuRef.current,
        { x: '100%', opacity: 0 },
        { 
          x: '0%', 
          opacity: 1, 
          duration: 0.5, 
          ease: 'power3.out' 
        }
      );
    }
  }, [isMobileMenuOpen]);

  // ✨ GSAP Animation: Dropdown scale + fade
  const animateDropdown = (index, show) => {
    if (dropdownRefs.current[index]) {
      if (show) {
        gsap.fromTo(
          dropdownRefs.current[index],
          { opacity: 0, scale: 0.95, y: -10 },
          { 
            opacity: 1, 
            scale: 1, 
            y: 0, 
            duration: 0.3, 
            ease: 'power2.out' 
          }
        );
      } else {
        gsap.to(dropdownRefs.current[index], {
          opacity: 0,
          scale: 0.95,
          y: -10,
          duration: 0.2,
          ease: 'power2.in'
        });
      }
    }
  };

  // Fonction pour gérer le scroll vers les sections
  const handleNavClick = (e, link) => {
    if (link.scroll) {
      e.preventDefault();
      
      // Si on n'est pas sur la page d'accueil, naviguer d'abord
      if (location.pathname !== '/') {
        navigate('/');
        // Attendre que la navigation soit terminée avant de scroller
        setTimeout(() => {
          const element = document.getElementById(link.scroll);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      } else {
        // Si déjà sur la page d'accueil, scroller directement
        const element = document.getElementById(link.scroll);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { 
      name: 'Plateforme',
      dropdown: [
        { name: 'Cockpit exécutif', path: '/plateforme/cockpit' },
        { name: 'Portfolio Manager', path: '/plateforme/portfolio' },
        { name: 'Committee Center', path: '/plateforme/comites' },
        { name: 'Decision Hub', path: '/plateforme/decisions' },
        { name: 'Risk Intelligence', path: '/plateforme/risques' },
        { name: 'Reporting & Power BI', path: '/plateforme/reporting' }
      ]
    },
    { 
      name: 'Cas d\'usage',
      dropdown: [
        { name: 'PMO', path: '/usecases/pmo' },
        { name: 'Direction', path: '/usecases/direction' },
        { name: 'Data / BI', path: '/usecases/data' },
        { name: 'Chefs de projets', path: '/usecases/chefs-projets' },
        { name: 'Conseil', path: '/usecases/conseil' }
      ]
    },
    { 
      name: 'Ressources',
      dropdown: [
        { name: 'Documentation', path: '/ressources/docs' },
        { name: 'Modèles de gouvernance', path: '/ressources/modeles' },
        { name: 'Guides PMO', path: '/ressources/guides' }
      ]
    },
    { name: 'Démo', path: '/demo' },
    { 
      name: 'À propos',
      dropdown: [
        { name: 'Vision', path: '/apropos/vision' },
        { name: 'Gouvernance moderne', path: '/apropos/gouvernance' },
        { name: 'Sécurité', path: '/apropos/securite' }
      ]
    },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      <header
        ref={headerRef}
        className={`relative w-full z-[9999] transition-all duration-300 ${
          isScrolled ? 'bg-black/90 backdrop-blur-lg border-b border-[#1A1A1A] py-3' : 'bg-transparent py-5'
        }`}
      >
        <nav className='container mx-auto px-4 max-w-7xl flex items-center justify-between'>
          <AnimatedLogo size={isScrolled ? "sm" : "default"} />

          {/* Desktop Navigation */}
          <div className='hidden lg:flex items-center gap-6'>
            {navLinks.map((link, index) => (
              link.dropdown ? (
                <div key={link.name} className="relative group">
                  <button
                    className="text-sm font-light transition-all hover:text-[#D4AF37] text-white/70"
                  >
                    {link.name}
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute top-full left-0 mt-3 bg-[#0A1A2F] border border-white/10 rounded-xl shadow-xl p-4 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="block px-2 py-2 text-white/80 hover:text-[#D4AF37] transition-all rounded-lg hover:bg-white/5"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link 
                  key={link.path}
                  to={link.path} 
                  className={`text-sm font-light transition-all hover:text-[#D4AF37] ${
                    location.pathname === link.path ? 'text-white' : 'text-white/70'
                  }`}
                >
                  {link.name}
                </Link>
              )
            ))}
          </div>

          {/* Desktop Actions */}
          <div className='hidden lg:flex items-center gap-3'>
            <LanguageSwitcher />
            
            {/* Sélecteur d'organisation (visible uniquement si connecté) */}
            {user && <OrganizationSwitcher />}

            {/* Bouton Démo toujours visible */}
            <Button
              onClick={() => navigate('/demo-complete')}
              variant="ghost"
              size="sm"
              className='text-white/70 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all border border-[#D4AF37]/30 hover:border-[#D4AF37]/60'
            >
              ✨ Démo
            </Button>

            {!user ? (
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => navigate('/login')}
                  variant="ghost"
                  size="sm"
                  className='text-white/70 hover:text-white hover:bg-white/5 transition-all'
                >
                  Connexion
                </Button>
                <Button
                  onClick={() => navigate('/signup')}
                  size="sm"
                  className='bg-[#D4AF37] hover:bg-[#B89659] text-black font-medium transition-all hover:scale-105'
                >
                  Créer un compte
                </Button>
              </div>
            ) : (
               <Button
                  onClick={() => navigate('/app')}
                  className='bg-[#4A9EFF] hover:bg-[#0052cc] text-white font-bold'
                >
                  {t('nav.dashboard')}
                </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 lg:hidden">
            <LanguageSwitcher />
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className='text-white p-2 hover:bg-[#1A1A1A] rounded-lg transition-all'
            >
              <Menu className='w-6 h-6' />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu avec animation GSAP */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Menu Slide-in */}
          <div
            ref={mobileMenuRef}
            className="fixed top-0 right-0 bottom-0 z-[9999] w-80 bg-[#000000] border-l border-white/10 shadow-2xl flex flex-col p-6"
          >
            <div className="flex justify-between items-center mb-8">
              <AnimatedLogo />
              <button 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="text-white/70 hover:text-white transition-all p-2 hover:bg-white/5 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex flex-col gap-4 text-lg flex-1 overflow-y-auto">
              {navLinks.map((link) => (
                <div key={link.name} className="space-y-2">
                  {link.dropdown ? (
                    <>
                      <div className="text-white/90 font-medium">{link.name}</div>
                      <div className="pl-4 space-y-2">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block text-sm text-white/60 hover:text-[#D4AF37] transition-colors py-1"
                          >
                            → {item.name}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link 
                      to={link.path} 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block font-light transition-all hover:text-[#D4AF37] ${
                        location.pathname === link.path ? 'text-white' : 'text-white/70'
                      }`}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-auto space-y-4 pt-6 border-t border-white/10">
              <Button
                onClick={() => { navigate('/demo-complete'); setIsMobileMenuOpen(false); }}
                variant="ghost"
                className='w-full text-white/70 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 border border-[#D4AF37]/30 hover:border-[#D4AF37]/60'
              >
                ✨ Démo
              </Button>

              {!user ? (
                <>
                  <Button 
                    onClick={() => { navigate('/login'); setIsMobileMenuOpen(false); }} 
                    variant="ghost"
                    className="w-full text-white/70 hover:text-white hover:bg-white/5"
                  >
                    {t('nav.login')}
                  </Button>
                  <Button 
                    onClick={() => { navigate('/signup'); setIsMobileMenuOpen(false); }} 
                    className="w-full bg-[#D4AF37] hover:bg-[#B89659] text-black font-medium"
                  >
                    Créer un compte
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => { navigate('/app'); setIsMobileMenuOpen(false); }}
                  className='w-full bg-[#4A9EFF] hover:bg-[#0052cc] text-white font-bold'
                >
                  {t('nav.dashboard')}
                </Button>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
