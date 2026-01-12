import React from 'react';
import { Table, LayoutList, Calendar, BarChart3 } from 'lucide-react';

/**
 * 🔍 View Selector - Bascule entre vues (Table/Kanban/Timeline/Executive)
 * Design: Pills horizontal compact
 */
export default function ViewSelector({ views, activeView, onViewChange }) {
  const VIEW_ICONS = {
    table: Table,
    kanban: LayoutList,
    timeline: Calendar,
    executive: BarChart3
  };

  return (
    <div className="flex items-center gap-1 bg-black/30 rounded-lg p-1">
      {views.map((view) => {
        const Icon = VIEW_ICONS[view.type] || Table;
        const isActive = activeView === view.id;

        return (
          <button
            key={view.id}
            onClick={() => onViewChange(view.id)}
            title={view.name}
            className={`
              flex items-center gap-2 px-3 py-1.5 rounded-md transition-all duration-150 text-sm font-medium
              ${isActive 
                ? 'bg-[#D4AF37]/20 text-[#D4AF37]' 
                : 'text-white/60 hover:text-white hover:bg-white/5'
              }
            `}
          >
            <Icon className="w-4 h-4" />
            <span>{view.name}</span>
          </button>
        );
      })}
    </div>
  );
}
