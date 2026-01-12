import React, { useState } from 'react';
import { Plus, ChevronDown, ArrowUpDown, Filter } from 'lucide-react';
import ItemRow from './ItemRow';
import ItemDetailPanel from './ItemDetailPanel';

/**
 * 📊 Board Table View - Vue tableau type monday.com
 * Features: Tri, filtres, sélection multi, panneau détail
 */
export default function BoardTableView({ 
  board, 
  items = [], 
  onItemClick, 
  onItemCreate,
  onItemUpdate,
  onItemDelete 
}) {
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [sortBy, setSortBy] = useState(board.default_sort?.[0] || null);
  const [filters, setFilters] = useState(board.default_filters || {});

  // Items filtrés et triés
  const processedItems = React.useMemo(() => {
    let result = [...items];

    // Filtres
    Object.entries(filters).forEach(([field, values]) => {
      if (values && values.length > 0) {
        result = result.filter(item => {
          if (Array.isArray(item[field])) {
            return item[field].some(v => values.includes(v));
          }
          return values.includes(item[field]);
        });
      }
    });

    // Tri
    if (sortBy) {
      const [field, order] = sortBy.split(':');
      result.sort((a, b) => {
        const aVal = a[field] || '';
        const bVal = b[field] || '';
        const comparison = aVal > bVal ? 1 : -1;
        return order === 'desc' ? -comparison : comparison;
      });
    }

    return result;
  }, [items, filters, sortBy]);

  const selectedItem = selectedItemId 
    ? items.find(i => i.id === selectedItemId) 
    : null;

  const handleItemClick = (item) => {
    setSelectedItemId(item.id);
    onItemClick?.(item);
  };

  const handleClosePanel = () => {
    setSelectedItemId(null);
  };

  return (
    <div className="flex h-full">
      {/* Zone principale: Tableau */}
      <div className={`flex-1 flex flex-col min-w-0 ${selectedItemId ? 'mr-96' : ''}`}>
        {/* Header actions */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/20">
          <div className="flex items-center gap-3">
            <button
              onClick={onItemCreate}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] text-black font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              <Plus className="w-4 h-4" />
              Nouveau
            </button>

            <button className="flex items-center gap-2 px-3 py-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors border border-white/10">
              <Filter className="w-4 h-4" />
              Filtrer
            </button>
          </div>

          <div className="text-white/60 text-sm">
            {processedItems.length} / {items.length} items
          </div>
        </div>

        {/* Table header */}
        <div className="flex items-center gap-4 px-6 py-3 bg-black/30 border-b border-white/10 text-xs font-semibold text-white/60 uppercase tracking-wider">
          {board.columns.map((col) => (
            <div
              key={col.id}
              className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors"
              style={{ width: col.width }}
              onClick={() => col.sortable && setSortBy(`${col.id}:${sortBy?.includes(':desc') ? 'asc' : 'desc'}`)}
            >
              <span>{col.label}</span>
              {col.sortable && <ArrowUpDown className="w-3 h-3" />}
            </div>
          ))}
        </div>

        {/* Table body */}
        <div className="flex-1 overflow-y-auto">
          {processedItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-white/40">
              <p className="text-lg font-light">Aucun item dans ce board</p>
              <button
                onClick={onItemCreate}
                className="mt-4 text-[#D4AF37] hover:underline text-sm"
              >
                + Créer le premier item
              </button>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {processedItems.map((item) => (
                <ItemRow
                  key={item.id}
                  item={item}
                  columns={board.columns}
                  onClick={() => handleItemClick(item)}
                  isSelected={selectedItemId === item.id}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Panneau de détail (slide-in droit) */}
      {selectedItemId && selectedItem && (
        <ItemDetailPanel
          item={selectedItem}
          onClose={handleClosePanel}
          onUpdate={(updates) => {
            onItemUpdate?.(selectedItem.id, updates);
            setSelectedItemId(null);
          }}
          onDelete={() => {
            onItemDelete?.(selectedItem.id);
            setSelectedItemId(null);
          }}
        />
      )}
    </div>
  );
}
