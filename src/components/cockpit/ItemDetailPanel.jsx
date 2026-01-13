import React, { useState } from 'react';
import { X, Edit2, Trash2, Save } from 'lucide-react';
import { getStatusConfig } from '@/types/cockpit';

/**
 * 📋 Item Detail Panel - Panneau latéral droit (slide-in)
 * Style: monday.com item drawer
 */
export default function ItemDetailPanel({ item, onClose, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState(item);

  const handleSave = () => {
    onUpdate(editedItem);
    setIsEditing(false);
  };

  const statusConfig = getStatusConfig(item.status);

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-black/95 backdrop-blur-xl border-l border-white/10 shadow-2xl z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <h3 className="text-lg font-semibold text-white truncate flex-1 mr-4">
          {item?.title || 'Sans titre'}
        </h3>
        <button
          onClick={onClose}
          className="text-white/60 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
        {/* Statut */}
        <div>
          <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
            Statut
          </label>
          <span className={`
            inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium
            bg-${statusConfig.color}-500/20 text-${statusConfig.color}-400 border border-${statusConfig.color}-500/30
          `}>
            {statusConfig.label}
          </span>
        </div>

        {/* Responsable */}
        <div>
          <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
            Responsable
          </label>
          <div className="text-white/80">{item.owner || 'Non assigné'}</div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
              Début
            </label>
            <div className="text-white/70 text-sm">
              {item.start_date ? new Date(item.start_date).toLocaleDateString('fr-FR') : '-'}
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
              Fin
            </label>
            <div className="text-white/70 text-sm">
              {item.end_date ? new Date(item.end_date).toLocaleDateString('fr-FR') : '-'}
            </div>
          </div>
        </div>

        {/* Avancement */}
        <div>
          <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
            Avancement
          </label>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] transition-all duration-300"
                style={{ width: `${item.progress || 0}%` }}
              />
            </div>
            <span className="text-white font-semibold text-sm w-12">{item.progress || 0}%</span>
          </div>
        </div>

        {/* Priorité */}
        <div>
          <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
            Priorité
          </label>
          <div className="text-white/80 capitalize">{item.priority || 'Non définie'}</div>
        </div>

        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div>
            <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
              Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-white/10 text-white/70 text-xs rounded-full border border-white/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Custom fields */}
        {item.custom_fields && Object.keys(item.custom_fields).length > 0 && (
          <div>
            <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
              Champs Custom
            </label>
            <div className="space-y-2 text-sm">
              {Object.entries(item.custom_fields).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-white/60">{key}:</span>
                  <span className="text-white/80">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer actions */}
      <div className="flex items-center gap-2 px-6 py-4 border-t border-white/10">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors border border-white/10"
        >
          <Edit2 className="w-4 h-4" />
          Modifier
        </button>
        <button
          onClick={onDelete}
          className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors border border-red-500/30"
        >
          <Trash2 className="w-4 h-4" />
          Supprimer
        </button>
      </div>
    </div>
  );
}
