import React from 'react';
import { Menu } from 'lucide-react';

/**
 * Header pour l'application mobile
 */
const MobileHeader = ({ title = 'Powalyze', onMenuClick }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-14 px-4">
        <div className="flex items-center gap-3">
          {onMenuClick && (
            <button
              onClick={onMenuClick}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5 text-slate-700" />
            </button>
          )}
          <h1 className="text-lg font-semibold text-slate-900">{title}</h1>
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;
