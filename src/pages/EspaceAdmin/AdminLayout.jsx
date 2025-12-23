import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { FiHome, FiFolder, FiCheckSquare, FiBarChart2, FiUsers, FiZap, FiActivity, FiSettings } from 'react-icons/fi';
import { Badge } from '@/components/ui/badge';

const AdminLayout = () => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', path: '/espace-admin/dashboard', icon: FiHome },
    { name: 'Projets', path: '/espace-admin/projets', icon: FiFolder },
    { name: 'Tâches', path: '/espace-admin/taches', icon: FiCheckSquare },
    { name: 'Analytics', path: '/espace-admin/analytics', icon: FiBarChart2 },
    { name: 'Utilisateurs', path: '/espace-admin/utilisateurs', icon: FiUsers },
    { name: 'Connecteurs', path: '/espace-admin/connecteurs', icon: FiZap },
    { name: 'Audit', path: '/espace-admin/audit', icon: FiActivity },
    { name: 'Paramètres', path: '/espace-admin/parametres', icon: FiSettings },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#111] border-r border-white/10 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center font-bold text-white text-xl">A</div>
            <div>
              <h1 className="text-xl font-bold text-white">POWALYZE</h1>
              <Badge className="bg-red-500/20 text-red-400 border-red-500/50 text-xs mt-1">ADMIN</Badge>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-red-500/20 text-red-400 border border-red-500/50'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <Link
            to="/espace-pro/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#BFA76A]/10 text-[#BFA76A] border border-[#BFA76A]/50 hover:bg-[#BFA76A]/20 transition-all"
          >
            <FiSettings size={20} />
            <span className="font-medium">Espace Pro</span>
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

export default AdminLayout;