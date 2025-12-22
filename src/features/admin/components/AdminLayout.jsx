import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { FiGrid, FiFolderPlus, FiCheckSquare, FiBarChart2, FiUsers, FiPackage, FiFileText, FiSettings } from 'react-icons/fi';
import { Badge } from '@/shared/components/ui/Badge';

const AdminLayout = () => {
  const location = useLocation();
  const navigation = [
    { name: 'Dashboard', href: '/espace-admin/dashboard', icon: FiGrid },
    { name: 'Projets', href: '/espace-admin/projets', icon: FiFolderPlus },
    { name: 'Tâches', href: '/espace-admin/taches', icon: FiCheckSquare },
    { name: 'Analytics', href: '/espace-admin/analytics', icon: FiBarChart2 },
    { name: 'Utilisateurs', href: '/espace-admin/utilisateurs', icon: FiUsers },
    { name: 'Connecteurs', href: '/espace-admin/connecteurs', icon: FiPackage },
    { name: 'Audit', href: '/espace-admin/audit', icon: FiFileText },
    { name: 'Paramètres', href: '/espace-admin/parametres', icon: FiSettings },
  ];

  return (
    <div className="flex h-screen bg-neutral-975">
      <aside className="w-64 bg-neutral-950 border-r border-white/10 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <Link to="/espace-admin/dashboard" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-brand-gold-500">Powalyze</span>
            <Badge variant="secondary" className="bg-red-500/20 text-red-400 border-red-500/50">ADMIN</Badge>
          </Link>
          <p className="text-xs text-gray-400 mt-1">Espace Administrateur</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map(item => {
            const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + '/');
            return (
              <Link key={item.name} to={item.href} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? 'bg-brand-gold-500/20 text-brand-gold-500 font-semibold' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
                <item.icon size={20} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/10">
          <Link to="/espace-pro/dashboard" className="text-sm text-gray-400 hover:text-brand-gold-500">← Retour Espace Pro</Link>
        </div>
      </aside>
      <main className="flex-1 overflow-auto"><Outlet /></main>
    </div>
  );
};

export default AdminLayout;
