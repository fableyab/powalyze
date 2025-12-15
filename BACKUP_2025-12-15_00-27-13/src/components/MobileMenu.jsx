
import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LogIn, User, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DarkModeToggle from '@/components/DarkModeToggle';
import Logo from '@/components/ui/Logo';

const MobileMenu = ({ isOpen, onClose, navLinks, user, onLogout, changeLanguage }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[90]"
          />
          
          {/* Menu Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-background border-l border-border z-[100] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border/50">
              <Logo className="h-8" />
              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-6 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={onClose}
                  className="flex items-center justify-between p-4 rounded-xl text-lg font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 transition-all"
                >
                  {link.label}
                  <ChevronRight size={16} className="opacity-50" />
                </Link>
              ))}
            </nav>

            {/* Footer Actions */}
            <div className="p-6 border-t border-border/50 space-y-6 bg-muted/20">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-muted-foreground">Apparence</span>
                <DarkModeToggle />
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => changeLanguage('fr')} className="flex-1 border-border/50">FR</Button>
                <Button variant="outline" size="sm" onClick={() => changeLanguage('en')} className="flex-1 border-border/50">EN</Button>
                <Button variant="outline" size="sm" onClick={() => changeLanguage('de')} className="flex-1 border-border/50">DE</Button>
              </div>

              {user ? (
                <div className="space-y-3">
                  <Link to="/espace-client" onClick={onClose}>
                    <Button className="w-full bg-primary text-primary-foreground font-bold">
                      <User size={18} className="mr-2" /> Espace Client
                    </Button>
                  </Link>
                  <Button variant="ghost" onClick={onLogout} className="w-full text-destructive hover:bg-destructive/10">
                    Déconnexion
                  </Button>
                </div>
              ) : (
                <Link to="/login" onClick={onClose}>
                  <Button className="w-full bg-primary text-primary-foreground font-bold h-12 text-lg">
                    <LogIn size={18} className="mr-2" /> Connexion
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
