import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Briefcase, AlertTriangle, User } from 'lucide-react';

/**
 * Navigation inférieure pour mobile (Bottom Navigation Bar)
 */
const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { href: '/mobile/cockpit', label: 'Cockpit', icon: Home },
    { href: '/mobile/portfolio', label: 'Portfolio', icon: Briefcase },
    { href: '/mobile/risks', label: 'Risques', icon: AlertTriangle },
    { href: '/mobile/profile', label: 'Profil', icon: User }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-[100] safe-area-bottom shadow-lg">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;

          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                isActive
                  ? 'text-[#4A9EFF]'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
