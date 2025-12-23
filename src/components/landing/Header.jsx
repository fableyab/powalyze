import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiPlay } from 'react-icons/fi';
import { useAuth } from '@/context/AuthContext';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { loginDemo } = useAuth();

  const handleDemoAccess = () => {
    loginDemo();
    navigate('/espace-pro/dashboard');
  };

  return (
    <header className="fixed top-0 w-full bg-black/95 backdrop-blur-sm border-b border-white/10 z-50">
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#BFA76A] to-[#8B7355] rounded-lg flex items-center justify-center font-bold text-black text-xl">P</div>
            <span className="text-2xl font-bold text-white">POWALYZE</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-300 hover:text-[#BFA76A] transition-colors">Fonctionnalités</a>
            <a href="#solutions" className="text-gray-300 hover:text-[#BFA76A] transition-colors">Solutions</a>
            <a href="#avantages" className="text-gray-300 hover:text-[#BFA76A] transition-colors">Avantages</a>
            <Link to="/contact" className="text-gray-300 hover:text-[#BFA76A] transition-colors">Contact</Link>
            <button 
              onClick={handleDemoAccess}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-5 py-2 rounded-lg font-medium transition-all"
            >
              <FiPlay size={16} />
              Démo
            </button>
            <Link to="/login" className="bg-[#BFA76A] hover:bg-[#BFA76A]/90 text-black px-6 py-2 rounded-lg font-medium transition-all">
              Connexion
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white">
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-4 pb-4">
            <a href="#features" className="block text-gray-300 hover:text-[#BFA76A] transition-colors">Fonctionnalités</a>
            <a href="#solutions" className="block text-gray-300 hover:text-[#BFA76A] transition-colors">Solutions</a>
            <a href="#avantages" className="block text-gray-300 hover:text-[#BFA76A] transition-colors">Avantages</a>
            <Link to="/contact" className="block text-gray-300 hover:text-[#BFA76A] transition-colors">Contact</Link>
            <button 
              onClick={handleDemoAccess}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-5 py-2 rounded-lg font-medium transition-all"
            >
              <FiPlay size={16} />
              Démo
            </button>
            <Link to="/login" className="block bg-[#BFA76A] hover:bg-[#BFA76A]/90 text-black px-6 py-2 rounded-lg font-medium transition-all text-center">
              Connexion
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
