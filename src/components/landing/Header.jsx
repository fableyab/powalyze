import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-powalyze-blue to-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:shadow-lg transition-shadow">
              P
            </div>
            <span className="text-2xl font-bold text-powalyze-blue">Powalyze</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#fonctionnalites" className="text-gray-700 hover:text-powalyze-blue font-medium transition">
              Fonctionnalités
            </a>
            <a href="#cas-usage" className="text-gray-700 hover:text-powalyze-blue font-medium transition">
              Cas d'usage
            </a>
            <a href="#avantages" className="text-gray-700 hover:text-powalyze-blue font-medium transition">
              Avantages
            </a>
            <a href="#faq" className="text-gray-700 hover:text-powalyze-blue font-medium transition">
              FAQ
            </a>
            <Link to="/login" className="text-gray-700 hover:text-powalyze-blue font-medium transition">
              Se connecter
            </Link>
            <a href="#demo" className="btn-primary">
              Demander une démo
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 border-t border-gray-100 pt-4">
            <a href="#fonctionnalites" className="block text-gray-700 hover:text-powalyze-blue font-medium transition">
              Fonctionnalités
            </a>
            <a href="#cas-usage" className="block text-gray-700 hover:text-powalyze-blue font-medium transition">
              Cas d'usage
            </a>
            <a href="#avantages" className="block text-gray-700 hover:text-powalyze-blue font-medium transition">
              Avantages
            </a>
            <a href="#faq" className="block text-gray-700 hover:text-powalyze-blue font-medium transition">
              FAQ
            </a>
            <Link to="/login" className="block text-gray-700 hover:text-powalyze-blue font-medium transition">
              Se connecter
            </Link>
            <a href="#demo" className="block btn-primary text-center">
              Demander une démo
            </a>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
