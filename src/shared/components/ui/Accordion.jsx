/**
 * ACCORDION COMPONENT
 * Sections pliables
 */

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Accordion({ items, allowMultiple = false, className }) {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (itemId) => {
    setOpenItems(prev => {
      const newSet = allowMultiple ? new Set(prev) : new Set();
      if (prev.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  return (
    <div className={cn('space-y-2', className)}>
      {items.map((item) => {
        const isOpen = openItems.has(item.id);
        return (
          <div key={item.id} className="border border-gray-700 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full px-4 py-3 flex items-center justify-between bg-gray-800 hover:bg-gray-750 transition-colors text-left"
            >
              <span className="font-semibold text-white">{item.title}</span>
              <ChevronDown
                size={20}
                className={cn('text-gray-400 transition-transform', isOpen && 'rotate-180')}
              />
            </button>
            {isOpen && (
              <div className="px-4 py-3 bg-gray-800/50 text-gray-300">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
