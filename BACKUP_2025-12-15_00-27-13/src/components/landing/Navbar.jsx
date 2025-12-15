import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, LogIn, User } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import Logo from '@/components/ui/Logo';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import MobileMenu from '@/components/MobileMenu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { changeLanguage, language } = useLanguage();
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const solutionLinks = [
    { label: 'PMO Demo', path: '/pmo-demo' },
    { label: 'Financial Report', path: '/financial-report' },
    { label: 'Executive Dashboard', path: '/executive-dashboard' },
    { label: 'Live Demo', path: '/live-demo' }
  ];

  const menuItems = [
    { label: 'Solutions', path: '/services' },
    ...solutionLinks,
    { label: 'Contact', path: '/contact' },
    { label: 'Espace Client', path: '/espace-client' }
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-black/95 backdrop-blur-md border-b border-white/10 py-3 shadow-md' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="z-50 flex-shrink-0">
            <Logo className="h-8 md:h-10 text-white" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative text-sm font-medium transition-all ${
                  location.pathname === item.path
                    ? 'text-[#BFA76A]'
                    : 'text-gray-300 hover:text-white'
                } group`}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#BFA76A] transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Right Section: Language + Auth */}
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-gray-300 hover:text-white hover:bg-white/10 rounded-md text-xs font-bold"
                >
                  {language.toUpperCase()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-[#111] border-white/10">
                {['fr', 'en', 'de'].map((lang) => (
                  <DropdownMenuItem
                    key={lang}
                    onClick={() => changeLanguage(lang)}
                    className={`cursor-pointer ${language === lang ? 'bg-[#BFA76A]/10 text-[#BFA76A]' : 'text-white'}`}
                  >
                    {lang === 'fr' ? '🇫🇷 Français' : lang === 'en' ? '🇬🇧 English' : '🇩🇪 Deutsch'}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Auth Buttons */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                    <User size={20} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-[#111] border-white/10">
                  <DropdownMenuItem className="text-white cursor-pointer">
                    {user.name}
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/espace-client" className="text-white cursor-pointer">
                      Espace Client
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout} className="text-red-400 cursor-pointer">
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button size="sm" className="bg-[#BFA76A] text-black hover:bg-white font-bold">
                  <LogIn size={16} className="mr-2" /> Connexion
                </Button>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-300 hover:text-white"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
        items={menuItems}
      />
    </>
  );
};

export default Navbar;
