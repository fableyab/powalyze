import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { FiHome, FiFolder, FiCheckSquare, FiCalendar, FiUsers, FiFileText, FiBarChart2, FiSettings, FiZap } from 'react-icons/fi';
import { Badge } from '@/components/ui/badge';

const WorkspaceLayout = () => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', path: '/espace-pro/dashboard', icon: FiHome },
    { name: 'Projets', path: '/espace-pro/projets', icon: FiFolder },
    { name: 'Tâches', path: '/espace-pro/taches', icon: FiCheckSquare },
    { name: 'Documents', path: '/espace-pro/documents', icon: FiFileText },
    { name: 'Calendrier', path: '/espace-pro/calendrier', icon: FiCalendar },
    { name: 'Équipe', path: '/espace-pro/equipe', icon: FiUsers },
    { name: 'Connecteurs', path: '/espace-pro/connecteurs', icon: FiZap },
    { name: 'Rapports', path: '/espace-pro/rapports', icon: FiBarChart2 },
    { name: 'Paramètres', path: '/espace-pro/parametres', icon: FiSettings },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#111] border-r border-white/10 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#BFA76A] to-[#8B7355] rounded-lg flex items-center justify-center font-bold text-black text-xl">P</div>
            <div>
              <h1 className="text-xl font-bold text-white">POWALYZE</h1>
              <Badge className="bg-[#BFA76A]/20 text-[#BFA76A] border-[#BFA76A]/50 text-xs mt-1">PRO</Badge>
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
                    ? 'bg-[#BFA76A]/20 text-[#BFA76A] border border-[#BFA76A]/50'
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
            to="/espace-admin/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-red-500/10 text-red-400 border border-red-500/50 hover:bg-red-500/20 transition-all"
          >
            <FiSettings size={20} />
            <span className="font-medium">Espace Admin</span>
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