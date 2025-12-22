/**
 * EMPTY STATE COMPONENT
 * Placeholder pour états vides
 */

import React from 'react';
import { cn } from '@/lib/utils';

export function EmptyState({ icon: Icon, title, description, action, className }) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12 px-4 text-center', className)}>
      {Icon && (
        <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mb-4">
          <Icon className="text-gray-500" size={32} />
        </div>
      )}
      {title && <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>}
      {description && <p className="text-gray-400 mb-6 max-w-md">{description}</p>}
      {action && <div>{action}</div>}
    </div>
  );
}
