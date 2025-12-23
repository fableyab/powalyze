import React from 'react';
import { FiDownload, FiTrash2, FiEdit2, FiTag } from 'react-icons/fi';
import { FILE_TYPES, CATEGORIES } from '@/contexts/DocumentsContext';

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', { 
    day: '2-digit', 
    month: 'short', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export default function FileCard({ document, onDownload, onDelete, onRename, onTagsEdit }) {
  const fileType = FILE_TYPES.find(t => t.id === document.fileType);
  const category = CATEGORIES.find(c => c.id === document.category);

  return (
    <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#BFA76A]/20 rounded-xl p-6 hover:border-[#BFA76A]/40 hover:shadow-lg hover:shadow-[#BFA76A]/10 transition-all group">
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#BFA76A]/20 to-[#D4AF37]/10 border border-[#BFA76A]/30 flex items-center justify-center flex-shrink-0">
          <span className="text-3xl">{fileType?.icon || '📄'}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-white text-lg truncate mb-1 group-hover:text-[#BFA76A] transition-colors">
            {document.name}
          </h3>
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full text-xs font-bold">
              {fileType?.icon} {fileType?.label}
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-full text-xs font-bold">
              {category?.icon} {category?.label}
            </span>
          </div>
          {document.tags && document.tags.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              {document.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-0.5 bg-[#BFA76A]/10 text-[#BFA76A] border border-[#BFA76A]/20 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
              {document.tags.length > 3 && (
                <span className="text-xs text-gray-500">+{document.tags.length - 3}</span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-[#0A0A0A] rounded-lg border border-[#BFA76A]/10">
        <div>
          <p className="text-xs text-gray-500 mb-1">Taille</p>
          <p className="text-sm font-medium text-white">{formatFileSize(document.size)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Uploadé le</p>
          <p className="text-sm font-medium text-white">{formatDate(document.uploadedAt)}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => onDownload(document)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0A0A0A] border border-[#BFA76A]/20 text-white font-medium rounded-lg hover:border-[#BFA76A]/50 hover:bg-[#BFA76A]/5 transition-all"
          title="Télécharger"
        >
          <FiDownload className="w-4 h-4" />
          <span className="hidden sm:inline">Télécharger</span>
        </button>
        <button
          onClick={() => onRename(document)}
          className="px-4 py-2.5 bg-[#0A0A0A] border border-[#BFA76A]/20 text-blue-400 rounded-lg hover:border-blue-500/50 hover:bg-blue-500/10 transition-all"
          title="Renommer"
        >
          <FiEdit2 className="w-4 h-4" />
        </button>
        <button
          onClick={() => onTagsEdit(document)}
          className="px-4 py-2.5 bg-[#0A0A0A] border border-[#BFA76A]/20 text-purple-400 rounded-lg hover:border-purple-500/50 hover:bg-purple-500/10 transition-all"
          title="Éditer les tags"
        >
          <FiTag className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(document)}
          className="px-4 py-2.5 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/20 hover:border-red-500/50 transition-all"
          title="Supprimer"
        >
          <FiTrash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}