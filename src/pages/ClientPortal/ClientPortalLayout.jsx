/**
 * CLIENT PORTAL LAYOUT - SIDEBAR PMO
 * ===================================
 * 
 * Layout principal pour l'espace PMO avec sidebar de navigation.
 * 
 * FONCTIONNALITÉS:
 * - Navigation sidebar responsive (mobile/desktop)
 * - Bouton "Demo" pour charger les données de démonstration
 * - Bouton "Reset" pour remettre à zéro (compte vierge)
 * - Intégration avec PMODataContext pour la gestion des données
 * 
 * @author POWALYZE
 * @version 2.0.0
 */

import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, FolderKanban, Users,
  BarChart3, CheckSquare, Calendar, Settings, LogOut, Menu, X, Bell,
  Play, RotateCcw, Check, AlertTriangle
} from 'lucide-react';
import { ClientProvider } from '@/context/ClientContext';
import { PMODataProvider, usePMOData } from '@/context/PMODataContext';
import { useAuth } from '@/context/AuthContext';
import Logo from '@/components/ui/Logo';
import { Button } from '@/components/ui/button';
import DarkModeToggle from '@/components/DarkModeToggle';

const SidebarItem = ({ icon: Icon, label, path, active, onClick }) => (
  <Link
    to={path}
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 mb-1 ${
      active
        ? 'bg-[#BFA76A]/20 text-[#BFA76A] font-bold border border-[#BFA76A]/30'
        : 'text-gray-400 hover:text-white hover:bg-white/5'
    }`}
  >
    <Icon size={20} />
    <span>{label}</span>
  </Link>
);

// Composant interne qui utilise le contexte PMO
const LayoutContent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [notification, setNotification] = useState(null);
  const location = useLocation();
  const { user, logout } = useAuth();
  const { loadDemoData, clearAllData, isDemoLoaded, projects } = usePMOData();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/pmo-workspace' },
    { icon: FolderKanban, label: 'Projets', path: '/pmo-projects' },
    { icon: Users, label: 'Equipe', path: '/pmo-team' },
    { icon: BarChart3, label: 'Rapports', path: '/pmo-reports' },
    { icon: CheckSquare, label: 'Taches', path: '/pmo-tasks' },
    { icon: Calendar, label: 'Calendrier', path: '/pmo-calendar' },
    { icon: Settings, label: 'Parametres', path: '/pmo-settings' },
  ];

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleLoadDemo = () => {
    loadDemoData();
    setShowDemoModal(false);
    showNotification('Donnees de demonstration chargees!');
  };

  const handleReset = () => {
    clearAllData();
    setShowResetModal(false);
    showNotification('Toutes les donnees ont ete effacees.');
  };

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-white font-sans flex overflow-hidden">
      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-6 right-6 z-[100] px-6 py-3 rounded-lg shadow-lg ${
              notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'
            }`}
          >
            <div className="flex items-center gap-2">
              <Check size={20} />
              <span>{notification.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Premium background effects */}
      <div className="pointer-events-none absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#0A0A0A]/85 to-[#0A0A0A]/70" />
      <div className="pointer-events-none absolute -top-[20%] -left-[10%] w-[45%] h-[45%] bg-[#BFA76A]/15 rounded-full blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-[15%] right-[5%] w-[35%] h-[35%] bg-[#BFA76A]/10 rounded-full blur-[120px]" />

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 bottom-0 z-50 w-72 bg-[#0F0F0F]/95 backdrop-blur-xl border-r border-white/10 p-6 flex flex-col transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="mb-8 pl-2 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Logo className="h-8" />
            <span className="text-[#BFA76A] font-bold text-sm">PMO</span>
          </div>
          <button className="lg:hidden text-white" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* Section Header */}
        <div className="px-4 mb-4">
          <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Navigation PMO</p>
        </div>

        <nav className="flex-1 space-y-1">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.path}
              {...item}
              active={location.pathname === item.path}
              onClick={() => setSidebarOpen(false)}
            />
          ))}

          {/* Séparateur */}
          <div className="my-4 border-t border-white/10"></div>

          {/* Section Demo/Reset */}
          <div className="px-4 mb-2">
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Donnees</p>
          </div>

          {/* Bouton Demo */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowDemoModal(true)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 mb-1 ${
              isDemoLoaded 
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-[#BFA76A]/10 text-[#BFA76A] hover:bg-[#BFA76A]/20 border border-[#BFA76A]/30'
            }`}
          >
            <Play size={20} />
            <span className="font-semibold">Demo</span>
            {isDemoLoaded && <Check size={16} className="ml-auto" />}
          </motion.button>

          {/* Bouton Reset */}
          {projects.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowResetModal(true)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200"
            >
              <RotateCcw size={20} />
              <span>Reset</span>
            </motion.button>
          )}
        </nav>

        <div className="pt-6 border-t border-white/10">
          <div className="flex items-center gap-3 px-4 py-3 mb-4 bg-white/5 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#BFA76A] to-[#D4AF37] text-black font-bold flex items-center justify-center shadow-lg">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="overflow-hidden flex-1">
              <p className="font-bold text-sm truncate text-white">{user?.name || 'Utilisateur'}</p>
              <p className="text-xs text-gray-400 truncate">{user?.email || 'user@example.com'}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors text-sm"
          >
            <LogOut size={18} /> Deconnexion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-72 flex flex-col min-h-screen relative z-10">
        {/* Topbar */}
        <header className="h-16 border-b border-white/10 bg-[#0D0D0D]/90 backdrop-blur-xl sticky top-0 z-30 px-6 flex items-center justify-between">
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>

          <div className="hidden lg:flex items-center gap-2">
            <span className="text-gray-400">PMO Workspace</span>
            <span className="text-[#BFA76A]">•</span>
            <span className="text-white font-medium">Gestion de Portefeuille</span>
            {projects.length === 0 && (
              <span className="ml-4 px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded-full">
                Aucun projet - Cliquez sur Demo
              </span>
            )}
          </div>

          <div className="flex-1 lg:flex-none"></div>

          <div className="flex items-center gap-4">
            <DarkModeToggle />
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#BFA76A] rounded-full"></span>
            </Button>
            <Button onClick={() => window.open('https://powalyze.com', '_blank')} variant="outline" className="border-[#BFA76A] text-[#BFA76A] hover:bg-[#BFA76A] hover:text-black hidden sm:flex">
              Site Principal
            </Button>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 lg:p-10">
          <Outlet />
        </main>
      </div>

      {/* Modal Demo */}
      <AnimatePresence>
        {showDemoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
            onClick={() => setShowDemoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#BFA76A]/20 flex items-center justify-center">
                  <Play className="text-[#BFA76A]" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Charger la Demo</h2>
                  <p className="text-gray-400 text-sm">Donnees de demonstration PMO</p>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4 mb-6">
                <p className="text-gray-300 mb-3">Cette action va charger :</p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-center gap-2">
                    <FolderKanban size={16} className="text-[#BFA76A]" />
                    6 projets avec statuts varies
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckSquare size={16} className="text-[#BFA76A]" />
                    8 taches Kanban
                  </li>
                  <li className="flex items-center gap-2">
                    <Users size={16} className="text-[#BFA76A]" />
                    6 membres d'equipe
                  </li>
                  <li className="flex items-center gap-2">
                    <Calendar size={16} className="text-[#BFA76A]" />
                    6 evenements calendrier
                  </li>
                </ul>
              </div>

              {projects.length > 0 && (
                <div className="flex items-center gap-2 p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg mb-4">
                  <AlertTriangle className="text-orange-400" size={20} />
                  <p className="text-sm text-orange-300">Attention: vos donnees actuelles seront remplacees.</p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setShowDemoModal(false)}
                  className="flex-1 px-4 py-3 border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleLoadDemo}
                  className="flex-1 px-4 py-3 bg-[#BFA76A] text-black font-semibold rounded-lg hover:bg-[#D4AF37] transition-colors flex items-center justify-center gap-2"
                >
                  <Play size={18} />
                  Charger Demo
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Reset */}
      <AnimatePresence>
        {showResetModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
            onClick={() => setShowResetModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                  <RotateCcw className="text-red-400" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Reset des donnees</h2>
                  <p className="text-gray-400 text-sm">Effacer toutes les donnees</p>
                </div>
              </div>

              <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/30 rounded-lg mb-6">
                <AlertTriangle className="text-red-400 flex-shrink-0" size={20} />
                <p className="text-sm text-red-300">
                  Cette action est irreversible. Toutes vos donnees (projets, taches, equipe, evenements) seront definitivement supprimees.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowResetModal(false)}
                  className="flex-1 px-4 py-3 border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 px-4 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCcw size={18} />
                  Confirmer Reset
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Composant principal avec les providers
const ClientPortalLayout = () => {
  return (
    <ClientProvider>
      <PMODataProvider>
        <LayoutContent />
      </PMODataProvider>
    </ClientProvider>
  );
};

export default ClientPortalLayout;
