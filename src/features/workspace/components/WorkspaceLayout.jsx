import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { FiGrid, FiFolderPlus, FiCheckSquare, FiFileText, FiUsers, FiCalendar, FiBarChart2, FiPackage, FiSettings } from 'react-icons/fi';
import { Badge } from '@/shared/components/ui/Badge';

const WorkspaceLayout = ({ workspaceType = 'pro' }) => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/espace-pro/dashboard', icon: FiGrid },
    { name: 'Projets', href: '/espace-pro/projets', icon: FiFolderPlus },
    { name: 'Tâches', href: '/espace-pro/taches', icon: FiCheckSquare },
    { name: 'Documents', href: '/espace-pro/documents', icon: FiFileText },
    { name: 'Équipe', href: '/espace-pro/equipe', icon: FiUsers },
    { name: 'Calendrier', href: '/espace-pro/calendrier', icon: FiCalendar },
    { name: 'Rapports', href: '/espace-pro/rapports', icon: FiBarChart2 },
    { name: 'Connecteurs', href: '/espace-pro/connecteurs', icon: FiPackage },
    { name: 'Paramètres', href: '/espace-pro/parametres', icon: FiSettings },
  ];

  return (
    <div className="flex h-screen bg-neutral-975">
      {/* Sidebar Espace Pro */}
      <aside className="w-64 bg-neutral-950 border-r border-white/10 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <Link to="/espace-pro/dashboard" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-brand-gold-500">Powalyze</span>
            <Badge variant="secondary" className="bg-brand-gold-500/20 text-brand-gold-500 border-brand-gold-500/50">PRO</Badge>
          </Link>
          <p className="text-xs text-gray-400 mt-1">Espace Professionnel</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map(item => {
            const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-brand-gold-500/20 text-brand-gold-500 font-semibold'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon size={20} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/10">
          <Link to="/espace-admin/dashboard" className="text-sm text-gray-400 hover:text-red-500 flex items-center gap-2">
            <FiSettings size={14} />
            → Accéder à l'Admin
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default WorkspaceLayout;
