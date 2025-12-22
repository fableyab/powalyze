import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  CheckSquare,
  Calendar,
  BarChart3,
  Settings,
  ChevronRight
} from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { to: '/app/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/app/projects', icon: FolderKanban, label: 'Projets' },
    { to: '/app/team', icon: Users, label: 'Équipe' },
    { to: '/app/tasks', icon: CheckSquare, label: 'Tâches' },
    { to: '/app/calendar', icon: Calendar, label: 'Calendrier' },
    { to: '/app/reports', icon: BarChart3, label: 'Rapports' },
    { to: '/app/settings', icon: Settings, label: 'Paramètres' }
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <NavLink to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-powalyze-blue to-powalyze-blue-dark flex items-center justify-center">
            <span className="text-xl font-black text-white">P</span>
          </div>
          <div>
            <div className="text-lg font-black text-gray-900">POWALYZE</div>
            <div className="text-xs text-amber-600 font-semibold tracking-wider">WORKSPACE PMO</div>
          </div>
        </NavLink>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${
                  isActive
                    ? 'bg-gradient-to-r from-powalyze-blue to-powalyze-blue-dark text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-powalyze-blue'}`} />
                  <span className="font-semibold">{item.label}</span>
                  {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="bg-gradient-to-br from-blue-50 to-amber-50 rounded-lg p-4">
          <p className="text-xs font-semibold text-gray-700 mb-2">Version 2.0.1</p>
          <p className="text-xs text-gray-600">
            Hébergé en Suisse 🇨🇭
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
