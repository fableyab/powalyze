import React from 'react';
import { Smartphone, Tablet, Monitor } from 'lucide-react';

/**
 * Bannière informative sur la version actuelle
 * Affichée en haut des pages mobile/tablet
 */
const VersionBanner = ({ currentView = 'desktop' }) => {
  const views = {
    desktop: {
      icon: Monitor,
      label: 'Version Desktop',
      color: 'bg-slate-600',
    },
    mobile: {
      icon: Smartphone,
      label: 'Version Mobile',
      color: 'bg-[#4A9EFF]',
    },
    tablet: {
      icon: Tablet,
      label: 'Version Tablette',
      color: 'bg-purple-600',
    },
  };

  const { icon: Icon, label, color } = views[currentView] || views.desktop;

  return (
    <div className={`${color} text-white text-center py-2 text-sm font-medium flex items-center justify-center gap-2`}>
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </div>
  );
};

export default VersionBanner;
