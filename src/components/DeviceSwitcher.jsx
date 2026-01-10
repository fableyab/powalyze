import React from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, Tablet, Monitor } from 'lucide-react';

/**
 * Bouton pour basculer entre les versions desktop/mobile/tablet
 * À placer dans le Dashboard ou le Profil
 */
const DeviceSwitcher = ({ currentView = 'desktop' }) => {
  const views = [
    {
      id: 'desktop',
      label: 'Desktop',
      icon: Monitor,
      path: '/app/cockpit',
      color: 'text-slate-600'
    },
    {
      id: 'mobile',
      label: 'Mobile',
      icon: Smartphone,
      path: '/mobile/cockpit',
      color: 'text-blue-600'
    },
    {
      id: 'tablet',
      label: 'Tablet',
      icon: Tablet,
      path: '/tablet/cockpit',
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="inline-flex items-center gap-2 p-1 bg-slate-100 rounded-lg">
      {views.map(({ id, label, icon: Icon, path, color }) => (
        <Link
          key={id}
          to={path}
          className={`
            flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium
            transition-all duration-150
            ${currentView === id
              ? 'bg-white shadow-sm ' + color
              : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'
            }
          `}
        >
          <Icon className="w-4 h-4" />
          <span className="hidden sm:inline">{label}</span>
        </Link>
      ))}
    </div>
  );
};

export default DeviceSwitcher;
