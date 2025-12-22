/**
 * TABLE COMPONENT
 * Tableau de données
 */

import React from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from './Skeleton';

export function Table({ children, className }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className={cn('w-full', className)}>
        {children}
      </table>
    </div>
  );
}

export function TableHeader({ children, className }) {
  return (
    <thead className={cn('bg-gray-800/50 border-b border-gray-700', className)}>
      {children}
    </thead>
  );
}

export function TableBody({ children, className, loading = false, rows = 5 }) {
  if (loading) {
    return (
      <tbody className={className}>
        {Array.from({ length: rows }).map((_, i) => (
          <tr key={i}>
            <td colSpan="100%" className="px-4 py-3">
              <Skeleton className="h-10 w-full" />
            </td>
          </tr>
        ))}
      </tbody>
    );
  }

  return <tbody className={className}>{children}</tbody>;
}

export function TableRow({ children, className, onClick }) {
  return (
    <tr
      className={cn(
        'border-b border-gray-800 transition-colors',
        onClick && 'cursor-pointer hover:bg-gray-800/30',
        className
      )}
      onClick={onClick}
    >
      {children}
    </tr>
  );
}

export function TableHead({ children, className }) {
  return (
    <th className={cn('px-4 py-3 text-left text-sm font-semibold text-gray-300', className)}>
      {children}
    </th>
  );
}

export function TableCell({ children, className }) {
  return (
    <td className={cn('px-4 py-3 text-sm text-white', className)}>
      {children}
    </td>
  );
}
