import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from '@/components/mobile/BottomNav';
import VersionBanner from '@/components/VersionBanner';

/**
 * Layout principal pour l'application mobile
 * Sans header, juste le contenu et la bottom nav
 */
const MobileLayout = () => {
  const location = useLocation();
  
  // Définir les titres selon la route
  const getTitleFromPath = () => {
    if (location.pathname.includes('cockpit')) return 'Cockpit';
    if (location.pathname.includes('portfolio')) return 'Portefeuille';
    if (location.pathname.includes('project')) return 'Projet';
    if (location.pathname.includes('risks')) return 'Risques';
    if (location.pathname.includes('profile')) return 'Profil';
    return 'Powalyze';
  };

  return (
    <div className="flex flex-col h-screen w-screen fixed inset-0 bg-slate-50 overflow-hidden z-[9999]">
      {/* Bannière version mobile */}
      <VersionBanner currentView="mobile" />
      
      {/* Header fixe simplifié */}
      <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between h-14 px-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#4A9EFF] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <h1 className="text-lg font-semibold text-slate-900">{getTitleFromPath()}</h1>
          </div>
        </div>
      </header>
      
      {/* Contenu principal avec scroll */}
      <main className="flex-1 overflow-y-auto pb-20">
        <Outlet />
      </main>

      {/* Bottom navigation */}
      <BottomNav />
    </div>
  );
};

export default MobileLayout;
