/**
 * ALERT COMPONENT
 * Messages d'alerte
 */

import React from 'react';
import { AlertCircle, CheckCircle, Info, XCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const variants = {
  info: {
    bg: 'bg-blue-500/10 border-blue-500/30',
    text: 'text-blue-400',
    icon: Info,
  },
  success: {
    bg: 'bg-green-500/10 border-green-500/30',
    text: 'text-green-400',
    icon: CheckCircle,
  },
  warning: {
    bg: 'bg-yellow-500/10 border-yellow-500/30',
    text: 'text-yellow-400',
    icon: AlertCircle,
  },
  error: {
    bg: 'bg-red-500/10 border-red-500/30',
    text: 'text-red-400',
    icon: XCircle,
  },
};

export function Alert({ variant = 'info', title, message, onClose, className }) {
  const config = variants[variant];
  const Icon = config.icon;

  return (
    <div className={cn('p-4 border rounded-lg flex gap-3', config.bg, className)}>
      <Icon className={cn('flex-shrink-0', config.text)} size={20} />
      <div className="flex-1">
        {title && <h4 className={cn('font-semibold mb-1', config.text)}>{title}</h4>}
        {message && <p className="text-gray-300 text-sm">{message}</p>}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className={cn('flex-shrink-0 hover:opacity-70 transition-opacity', config.text)}
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}
