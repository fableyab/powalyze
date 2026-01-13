/**
 * ROADMAP TIMELINE COMPONENT
 * Timeline Gantt-style pour la roadmap des projets
 */

import React, { useMemo } from 'react';
import { Calendar, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export default function RoadmapTimeline({ items = [], showDependencies = true }) {
  // Trouver les dates min/max pour l'échelle
  const { minDate, maxDate, totalDays } = useMemo(() => {
    if (items.length === 0) return { minDate: new Date(), maxDate: new Date(), totalDays: 0 };

    const dates = items.flatMap(item => [
      item.start_date ? new Date(item.start_date) : null,
      item.end_date ? new Date(item.end_date) : null
    ]).filter(Boolean);

    const min = new Date(Math.min(...dates));
    const max = new Date(Math.max(...dates));
    const days = Math.ceil((max - min) / (1000 * 60 * 60 * 24));

    return {
      minDate: min,
      maxDate: max,
      totalDays: days || 1
    };
  }, [items]);

  // Calculer la position et la largeur de chaque item
  const getItemPosition = (item) => {
    if (!item.start_date || !item.end_date) return { left: 0, width: 0 };

    const start = new Date(item.start_date);
    const end = new Date(item.end_date);

    const leftOffset = Math.max(0, (start - minDate) / (1000 * 60 * 60 * 24));
    const duration = Math.max(1, (end - start) / (1000 * 60 * 60 * 24));

    return {
      left: (leftOffset / totalDays) * 100,
      width: (duration / totalDays) * 100
    };
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'done':
        return 'bg-emerald-600';
      case 'in_progress':
        return 'bg-[#4A9EFF]';
      case 'blocked':
        return 'bg-red-600';
      case 'planned':
      default:
        return 'bg-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'done':
        return CheckCircle2;
      case 'blocked':
        return AlertCircle;
      case 'in_progress':
        return Clock;
      case 'planned':
      default:
        return Calendar;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-[#0A1A2F] border border-gray-800 rounded-xl">
        <p className="text-gray-500 font-light">Aucun élément de roadmap</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-[#0A1A2F] border border-gray-800 rounded-xl p-6">
      {/* Header avec échelle de temps */}
      <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span className="font-light">{formatDate(minDate)}</span>
        </div>
        <div className="text-xs text-gray-500">
          {totalDays} jours
        </div>
        <div className="flex items-center gap-2">
          <span className="font-light">{formatDate(maxDate)}</span>
          <Calendar className="h-4 w-4" />
        </div>
      </div>

      {/* Timeline items */}
      <div className="space-y-4">
        {items.map((item, index) => {
          const position = getItemPosition(item);
          const StatusIcon = getStatusIcon(item.status);

          return (
            <div key={item.id || index} className="relative">
              {/* Item name */}
              <div className="flex items-center gap-3 mb-2">
                <StatusIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span className="text-sm text-white font-light truncate">
                  {item.title}
                </span>
                {item.dependency_id && showDependencies && (
                  <span className="text-xs text-amber-400 px-2 py-0.5 bg-amber-400/10 rounded-full">
                    Dépendance
                  </span>
                )}
              </div>

              {/* Timeline bar container */}
              <div className="relative h-10 bg-black/30 rounded-lg overflow-hidden">
                {/* Grid lines (months) */}
                <div className="absolute inset-0 flex">
                  {Array.from({ length: Math.ceil(totalDays / 30) }).map((_, i) => (
                    <div
                      key={i}
                      className="border-r border-gray-800"
                      style={{ width: `${(30 / totalDays) * 100}%` }}
                    />
                  ))}
                </div>

                {/* Progress bar */}
                <div
                  className={`
                    absolute top-1/2 -translate-y-1/2 h-6 rounded-md
                    ${getStatusColor(item.status)}
                    transition-all duration-300 hover:h-7
                    flex items-center justify-between px-3
                    group cursor-pointer
                  `}
                  style={{
                    left: `${position.left}%`,
                    width: `${position.width}%`
                  }}
                >
                  {/* Hover tooltip */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-black/90 border border-gray-700 rounded-lg text-xs whitespace-nowrap z-10">
                    <p className="text-white font-light">{item.title}</p>
                    <p className="text-gray-400">{formatDate(item.start_date)} → {formatDate(item.end_date)}</p>
                    {item.description && (
                      <p className="text-gray-500 mt-1 text-xs max-w-xs">{item.description}</p>
                    )}
                  </div>

                  {/* Bar content */}
                  <span className="text-xs text-white font-light truncate">
                    {item.status === 'done' ? '✓' : ''}
                  </span>
                </div>

                {/* Today marker */}
                {(() => {
                  const today = new Date();
                  if (today >= minDate && today <= maxDate) {
                    const todayOffset = ((today - minDate) / (1000 * 60 * 60 * 24) / totalDays) * 100;
                    return (
                      <div
                        className="absolute top-0 bottom-0 w-0.5 bg-[#D4AF37] z-20"
                        style={{ left: `${todayOffset}%` }}
                      >
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#D4AF37] text-black text-xs rounded">
                          Aujourd'hui
                        </div>
                      </div>
                    );
                  }
                  return null;
                })()}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 pt-4 border-t border-gray-800 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-emerald-600 rounded"></div>
          <span className="text-gray-400 font-light">Terminé</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#4A9EFF] rounded"></div>
          <span className="text-gray-400 font-light">En cours</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gray-600 rounded"></div>
          <span className="text-gray-400 font-light">Planifié</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-600 rounded"></div>
          <span className="text-gray-400 font-light">Bloqué</span>
        </div>
      </div>
    </div>
  );
}
