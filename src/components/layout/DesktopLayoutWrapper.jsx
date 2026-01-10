import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';

/**
 * DesktopLayoutWrapper - Wrapper conditionnel pour le layout desktop
 * N'affiche la sidebar QUE sur les routes /app/*
 * Exclut complètement /mobile/* et /tablet/*
 */
const DesktopLayoutWrapper = ({ children }) => {
  const location = useLocation();
  const pathname = location.pathname;

  // 👉 Pas de layout desktop pour mobile/tablet
  if (pathname.startsWith('/mobile') || pathname.startsWith('/tablet')) {
    return <>{children}</>;
  }

  // 👉 Pas de layout pour les pages publiques
  const publicRoutes = ['/', '/login', '/signup', '/register', '/blog', '/contact', '/legal', '/cgu', '/privacy-policy', '/terms-of-service'];
  const isPublicRoute = publicRoutes.includes(pathname) || 
                        pathname.startsWith('/blog/') || 
                        pathname.startsWith('/discover/') ||
                        pathname.startsWith('/services/') ||
                        pathname.startsWith('/vision-') ||
                        pathname.startsWith('/gouvernance-') ||
                        pathname.startsWith('/maitrise-') ||
                        pathname.startsWith('/prise-') ||
                        pathname.startsWith('/organisation-') ||
                        pathname.startsWith('/resultats-');

  if (isPublicRoute) {
    return <>{children}</>;
  }

  // 👉 Layout desktop pour /app/*
  if (pathname.startsWith('/app')) {
    return (
      <div className="flex h-screen bg-black text-slate-200 overflow-hidden font-sans selection:bg-[#4A9EFF] selection:text-white">
        <Sidebar />
        <div className="flex-1 flex flex-col h-full overflow-hidden relative bg-[#0F0F0F]">
          <Topbar />
          <main className="flex-1 overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
            {children}
          </main>
        </div>
      </div>
    );
  }

  // Par défaut, pas de wrapper
  return <>{children}</>;
};

export default DesktopLayoutWrapper;
