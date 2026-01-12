import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { getStatusConfig } from '@/types/cockpit';

/**
 * 📊 Board Kanban View - Vue kanban par colonnes de statut
 */
export default function BoardKanbanView({ 
  board, 
  items = [], 
  viewConfig,
  onItemClick, 
  onItemCreate,
  onItemUpdate 
}) {
  const { group_by = 'status', swimlanes = [] } = viewConfig;

  // Grouper items par swimlane
  const groupedItems = React.useMemo(() => {
    const groups = {};
    
    swimlanes.forEach(lane => {
      groups[lane] = items.filter(item => item[group_by] === lane);
    });

    return groups;
  }, [items, group_by, swimlanes]);

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData('itemId', item.id);
  };

  const handleDrop = (e, targetLane) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('itemId');
    const item = items.find(i => i.id === itemId);
    
    if (item && item[group_by] !== targetLane) {
      onItemUpdate?.(itemId, { [group_by]: targetLane });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex-1 overflow-x-auto p-6">
      <div className="flex gap-4 min-w-max">
        {swimlanes.map((lane) => {
          const config = getStatusConfig(lane);
          const laneItems = groupedItems[lane] || [];

          return (
            <div
              key={lane}
              className="flex-shrink-0 w-80 flex flex-col bg-black/30 rounded-lg border border-white/10"
              onDrop={(e) => handleDrop(e, lane)}
              onDragOver={handleDragOver}
            >
              {/* Swimlane header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full bg-${config.color}-500`}></div>
                  <span className="font-semibold text-white text-sm">{config.label}</span>
                  <span className="text-xs text-white/60 bg-white/10 px-2 py-0.5 rounded-full">
                    {laneItems.length}
                  </span>
                </div>
                <button
                  onClick={() => onItemCreate?.({ [group_by]: lane })}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 p-3 space-y-2 overflow-y-auto max-h-[calc(100vh-280px)]">
                {laneItems.map((item) => (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item)}
                    onClick={() => onItemClick?.(item)}
                    className="p-4 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 cursor-move transition-colors"
                  >
                    <div className="font-medium text-white text-sm mb-2">{item.title}</div>
                    
                    {item.owner && (
                      <div className="text-xs text-white/60 mb-2">👤 {item.owner}</div>
                    )}

                    {item.progress !== undefined && (
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF]"
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-white/60">{item.progress}%</span>
                      </div>
                    )}

                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {item.tags.slice(0, 2).map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2 py-0.5 bg-white/10 text-white/60 rounded border border-white/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {laneItems.length === 0 && (
                  <div className="text-center text-white/40 text-sm py-8">
                    Aucun item
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
