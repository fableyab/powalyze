import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const SECTIONS = [
  { id: 'hero', label: 'Accueil' },
  { id: 'problem', label: 'Problème' },
  { id: 'value', label: 'Plateforme' },
  { id: 'modules', label: 'Modules' },
  { id: 'governance', label: 'Gouvernance & IA' },
  { id: 'demo', label: 'Démonstration' },
  { id: 'onboarding', label: 'Onboarding' },
  { id: 'results', label: 'Résultats' },
  { id: 'contact', label: 'Contact' },
];

const LANGS = ['fr', 'en', 'de', 'no'];

export const Navbar = ({ lang, onLangChange, langLabels }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        isScrolled ? 'bg-[#0A1A2F]/90 backdrop-blur border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#f5e3a3] group-hover:scale-110 transition-transform duration-300" />
          <span className="text-xs tracking-[0.25em] uppercase text-white font-light">
            Powalyze
          </span>
        </button>

        {/* Menu desktop */}
        <nav className="hidden lg:flex items-center gap-6 text-xs text-white/80 font-light">
          {SECTIONS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="hover:text-[#D4AF37] transition-colors duration-300"
            >
              {item.label}
            </button>
          ))}

          <Link
            to="/login"
            className="hover:text-[#D4AF37] transition-colors duration-300"
          >
            Connexion
          </Link>

          <Link
            to="/signup"
            className="px-4 py-2 rounded-full bg-[#D4AF37] hover:bg-[#B89659] text-black font-medium transition-all duration-300"
          >
            Créer un compte
          </Link>

          {/* Langues */}
          <div className="flex items-center gap-1 ml-4">
            {LANGS.map((l) => (
              <button
                key={l}
                onClick={() => onLangChange(l)}
                className={`text-[10px] px-2 py-1 rounded-full transition-all duration-300 ${
                  lang === l
                    ? 'bg-[#D4AF37] text-black'
                    : 'border border-white/20 text-white/70 hover:border-white/40'
                }`}
              >
                {langLabels?.[l] || l.toUpperCase()}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
};
