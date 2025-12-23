import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiHome, FiUsers, FiBriefcase, FiSettings, FiLogOut, FiGrid } from 'react-icons/fi';

function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: FiHome },
    { path: '/admin/utilisateurs', label: 'Utilisateurs', icon: FiUsers },
    { path: '/admin/organisations', label: 'Organisations', icon: FiGrid },
    { path: '/admin/projets', label: 'Projets', icon: FiBriefcase },
    { path: '/admin/parametres', label: 'Paramètres', icon: FiSettings },
  ];

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-[#0A0A0A] text-white overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? 'w-64' : 'w-0'
        } bg-gradient-to-b from-[#1A1A1A] to-[#0F0F0F] border-r border-[#BFA76A]/20 transition-all duration-300 flex flex-col overflow-hidden`}
      >
        <div className="p-6 border-b border-[#BFA76A]/20">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#BFA76A] to-[#D4AF37] bg-clip-text text-transparent">
            Powalyze Admin
          </h1>
          <p className="text-gray-400 text-sm mt-1">Portail Administration</p>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#BFA76A]/20 to-[#D4AF37]/10 border border-[#BFA76A]/30 text-[#BFA76A]'
                    : 'text-gray-300 hover:bg-[#1A1A1A] hover:text-white'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-[#BFA76A]/20">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-gray-300 hover:bg-red-500/10 hover:text-red-400 transition-all"
          >
            <FiLogOut className="w-5 h-5" />
            <span className="font-medium">Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-gradient-to-r from-[#1A1A1A] to-[#0F0F0F] border-b border-[#BFA76A]/20 px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-[#BFA76A]/10 transition-colors"
          >
            {isSidebarOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium">Admin Powalyze</p>
              <p className="text-xs text-gray-400">Super Administrateur</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#BFA76A] to-[#D4AF37] flex items-center justify-center font-bold">
              AP
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;