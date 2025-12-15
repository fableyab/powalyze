
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logo from '@/components/ui/Logo';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Resources', path: '/resources' },
    { name: 'About', path: '/about' },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 z-50">
            <Logo className="h-8 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-[#BFA76A] ${
                  location.pathname === link.path ? 'text-[#BFA76A]' : 'text-gray-300'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 text-gray-300 hover:text-white">
                    <User className="h-4 w-4" />
                    <span>{user.email}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-[#1A1A1A] border-white/10 text-gray-300">
                  <DropdownMenuItem onClick={() => navigate('/dashboard')} className="hover:bg-white/5 cursor-pointer">
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut} className="hover:bg-white/5 cursor-pointer text-red-400">
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                  Log In
                </Link>
                <Button 
                  onClick={() => navigate('/powerbi-advanced')}
                  className="bg-[#BFA76A] hover:bg-[#A08B55] text-black font-semibold"
                >
                  Power BI Avancé démo
                </Button>
                <a href="https://powalyze.ch/pmo-demo">
                  <Button 
                    variant="outline"
                    className="border-[#BFA76A] text-[#BFA76A] hover:bg-[#BFA76A]/10"
                  >
                    Voir la Démo PMO
                  </Button>
                </a>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden z-50 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-[#0A0A0A] z-40 flex flex-col items-center justify-center space-y-8 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-medium text-gray-300 hover:text-[#BFA76A]"
            >
              {link.name}
            </Link>
          ))}
          <div className="flex flex-col gap-4 w-full px-8">
            {user ? (
              <>
                <Button onClick={() => { navigate('/dashboard'); setIsMobileMenuOpen(false); }} className="w-full">
                  Dashboard
                </Button>
                <Button onClick={() => { handleSignOut(); setIsMobileMenuOpen(false); }} variant="destructive" className="w-full">
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button 
                  onClick={() => { navigate('/powerbi-advanced'); setIsMobileMenuOpen(false); }}
                  className="w-full bg-[#BFA76A] text-black"
                >
                  Power BI Avancé démo
                </Button>
                <a href="https://powalyze.ch/pmo-demo" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button 
                    variant="outline"
                    className="w-full border-[#BFA76A] text-[#BFA76A]"
                  >
                    Voir la Démo PMO
                  </Button>
                </a>
                <Link 
                  to="/login" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-center text-gray-400 hover:text-white"
                >
                  Log In
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
