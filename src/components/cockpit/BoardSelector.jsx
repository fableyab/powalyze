import React from 'react';
import { Rocket, AlertTriangle, CheckCircle, Users, BarChart3 } from 'lucide-react';
import { BOARDS_CONFIG } from '@/types/cockpit';

/**
 * 🎯 Board Selector - Navigation entre boards type monday.com
 * Design: Tabs horizontal avec icônes + badge count
 */
export default function BoardSelector({ activeBoard, onBoardChange, itemCounts = {} }) {
  const ICON_MAP = {
    Rocket,
    AlertTriangle,
    CheckCircle,
    Users,
    BarChart3
  };

  const boards = Object.values(BOARDS_CONFIG);

  return (
    <div className="flex items-center gap-2 border-b border-white/10 bg-black/20 px-6 py-3">
      {boards.map((board) => {
        const Icon = ICON_MAP[board.icon] || Rocket;
        const isActive = activeBoard === board.id;
        const count = itemCounts[board.id] || 0;

        return (
          <button
            key={board.id}
            onClick={() => onBoardChange(board.id)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200
              ${isActive 
                ? 'bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30' 
                : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
              }
            `}
          >
            <Icon className="w-4 h-4" />
            <span className="font-medium text-sm">{board.name}</span>
            {count > 0 && (
              <span className={`
                text-xs px-2 py-0.5 rounded-full font-semibold
                ${isActive 
                  ? 'bg-[#D4AF37]/30 text-[#D4AF37]' 
                  : 'bg-white/10 text-white/60'
                }
              `}>
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
