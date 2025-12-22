/**
 * SKELETON COMPONENT
 * Loading placeholder
 */

import React from 'react';
import { cn } from '@/lib/utils';

export function Skeleton({ className, animate = true }) {
  return (
    <div
      className={cn(
        'bg-gray-800 rounded',
        animate && 'animate-pulse',
        className
      )}
    />
  );
}

export function SkeletonText({ lines = 3, className }) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className="h-4 w-full" />
      ))}
    </div>
  );
}

export function SkeletonCard({ className }) {
  return (
    <div className={cn('p-4 border border-gray-800 rounded-lg space-y-3', className)}>
      <Skeleton className="h-6 w-3/4" />
      <SkeletonText lines={2} />
      <Skeleton className="h-10 w-full" />
    </div>
  );
}
