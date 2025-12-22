/**
 * BREADCRUMB COMPONENT
 * Fil d'Ariane
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Breadcrumb({ items, className }) {
  return (
    <nav className={cn('flex items-center gap-2 text-sm', className)}>
      <Link to="/" className="text-gray-400 hover:text-white transition-colors">
        <Home size={16} />
      </Link>

      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight size={14} className="text-gray-600" />
          {item.href ? (
            <Link
              to={item.href}
              className="text-gray-400 hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-white font-medium">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
