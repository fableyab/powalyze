import React from 'react';
import { getStatusConfig, getPriorityConfig } from '@/types/cockpit';
import { Calendar, User, Tag } from 'lucide-react';

/**
 * 📄 Item Row - Ligne d'item dans table view
 */
export default function ItemRow({ item, columns, onClick, isSelected }) {
  const renderCell = (column) => {
    const value = item[column.id];

    switch (column.type) {
      case 'text':
        return (
          <div className="font-medium text-white truncate">
            {value || '-'}
          </div>
        );

      case 'status': {
        const config = getStatusConfig(value);
        return (
          <span className={`
            inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium
            bg-${config.color}-500/20 text-${config.color}-400 border border-${config.color}-500/30
          `}>
            {config.label}
          </span>
        );
      }

      case 'user':
        return (
          <div className="flex items-center gap-2 text-white/70">
            <User className="w-4 h-4" />
            <span className="text-sm">{value || 'Non assigné'}</span>
          </div>
        );

      case 'date':
        return (
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <Calendar className="w-3.5 h-3.5" />
            {value ? new Date(value).toLocaleDateString('fr-FR') : '-'}
          </div>
        );

      case 'progress':
        return (
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] transition-all duration-300"
                style={{ width: `${value || 0}%` }}
              />
            </div>
            <span className="text-xs text-white/60 font-medium w-10 text-right">{value || 0}%</span>
          </div>
        );

      case 'tags':
        return (
          <div className="flex items-center gap-1 flex-wrap">
            {Array.isArray(value) && value.length > 0 ? (
              value.map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-2 py-0.5 bg-white/10 text-white/70 text-xs rounded border border-white/20"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))
            ) : (
              <span className="text-white/40 text-xs">-</span>
            )}
          </div>
        );

      case 'number':
        return (
          <div className="text-white font-medium text-sm">
            {value !== null && value !== undefined ? value.toLocaleString('fr-FR') : '-'}
          </div>
        );

      default:
        return <span className="text-white/60 text-sm">{value || '-'}</span>;
    }
  };

  return (
    <div
      onClick={onClick}
      className={`
        flex items-center gap-4 px-6 py-4 cursor-pointer transition-all duration-150
        ${isSelected 
          ? 'bg-[#D4AF37]/10 border-l-2 border-l-[#D4AF37]' 
          : 'hover:bg-white/5 border-l-2 border-l-transparent'
        }
      `}
    >
      {columns.map((col) => (
        <div
          key={col.id}
          style={{ width: col.width }}
          className="min-w-0"
        >
          {renderCell(col)}
        </div>
      ))}
    </div>
  );
}
