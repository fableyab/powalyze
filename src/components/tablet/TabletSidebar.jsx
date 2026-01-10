import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Briefcase, AlertTriangle, User, BarChart3, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/SupabaseAuthContext';

/**
 * Sidebar pour tablette/iPad
 */
const TabletSidebar = () => {
  const location = useLocation();
  const { profile, signOut } = useAuth();

  const navItems = [
    { href: '/tablet/cockpit', label: 'Cockpit', icon: Home },
    { href: '/tablet/portfolio', label: 'Portefeuille', icon: Briefcase },
    { href: '/tablet/analytics', label: 'Analytics', icon: BarChart3 },
    { href: '/tablet/risks', label: 'Risques', icon: AlertTriangle },
    { href: '/tablet/profile', label: 'Profil', icon: User }
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-slate-900">Powalyze</h1>
        {profile && (
          <p className="text-sm text-slate-500 mt-1">{profile.email}</p>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;

          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-[#4A9EFF] text-white'
                  : 'text-slate-700 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={signOut}
          className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Déconnexion</span>
        </button>
      </div>
    </aside>
  );
};

export default TabletSidebar;
