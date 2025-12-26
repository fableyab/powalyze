import React from 'react';
import { FileText, File as FileIcon, FileSpreadsheet, Download, Eye, Trash2 } from 'lucide-react';

const DocumentCard = ({ document, onView, onDelete }) => {
  const getIcon = () => {
    switch (document.type) {
      case 'pdf':
        return <FileText className="w-8 h-8 text-red-500" />;
      case 'excel':
        return <FileSpreadsheet className="w-8 h-8 text-green-500" />;
      case 'word':
        return <FileIcon className="w-8 h-8 text-blue-500" />;
      default:
        return <FileIcon className="w-8 h-8 text-dark-400" />;
    }
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="bg-dark-800 border border-dark-700 rounded-lg p-4 hover:border-gold-primary/50 transition-all group">
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="flex-shrink-0 bg-dark-900 p-3 rounded-lg">
          {getIcon()}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-medium mb-1 truncate group-hover:text-gold-primary transition-colors">
            {document.name}
          </h4>
          <div className="flex flex-wrap items-center gap-3 text-xs text-dark-400">
            <span>{formatSize(document.size)}</span>
            <span>•</span>
            <span>{document.project}</span>
            <span>•</span>
            <span>{formatDate(document.uploadedAt)}</span>
          </div>
          <p className="text-dark-500 text-xs mt-2">
            Ajouté par <span className="text-dark-400">{document.uploadedBy}</span>
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onView(document)}
            className="p-2 hover:bg-dark-700 rounded-lg text-dark-400 hover:text-gold-primary transition-colors"
            title="Voir les détails"
          >
            <Eye className="w-4 h-4" />
          </button>
          <a
            href={document.url}
            download={document.name}
            className="p-2 hover:bg-dark-700 rounded-lg text-dark-400 hover:text-green-500 transition-colors"
            title="Télécharger"
          >
            <Download className="w-4 h-4" />
          </a>
          <button
            onClick={() => onDelete(document.id)}
            className="p-2 hover:bg-dark-700 rounded-lg text-dark-400 hover:text-red-500 transition-colors"
            title="Supprimer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;
