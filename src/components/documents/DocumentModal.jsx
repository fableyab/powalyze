import React from 'react';
import { X, FileText, File as FileIcon, FileSpreadsheet, Download, Calendar, User, FolderOpen, HardDrive } from 'lucide-react';

const DocumentModal = ({ document, onClose }) => {
  if (!document) return null;

  const getIcon = () => {
    switch (document.type) {
      case 'pdf':
        return <FileText className="w-12 h-12 text-red-500" />;
      case 'excel':
        return <FileSpreadsheet className="w-12 h-12 text-green-500" />;
      case 'word':
        return <FileIcon className="w-12 h-12 text-blue-500" />;
      default:
        return <FileIcon className="w-12 h-12 text-dark-400" />;
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
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getTypeLabel = () => {
    switch (document.type) {
      case 'pdf':
        return 'Document PDF';
      case 'excel':
        return 'Fichier Excel';
      case 'word':
        return 'Document Word';
      default:
        return 'Fichier';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-dark-900 rounded-lg border border-dark-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-dark-700">
          <div className="flex items-start gap-4 flex-1">
            <div className="bg-dark-800 p-3 rounded-lg">
              {getIcon()}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-white mb-1 break-words">
                {document.name}
              </h2>
              <p className="text-dark-400 text-sm">{getTypeLabel()}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-dark-800 rounded-lg text-dark-400 hover:text-white transition-colors ml-4"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Metadata Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-dark-800 border border-dark-700 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <HardDrive className="w-4 h-4 text-gold-primary" />
                <span className="text-dark-400 text-sm">Taille du fichier</span>
              </div>
              <p className="text-white font-semibold">{formatSize(document.size)}</p>
            </div>

            <div className="bg-dark-800 border border-dark-700 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-4 h-4 text-gold-primary" />
                <span className="text-dark-400 text-sm">Date d'ajout</span>
              </div>
              <p className="text-white font-semibold">{formatDate(document.uploadedAt)}</p>
            </div>

            <div className="bg-dark-800 border border-dark-700 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <User className="w-4 h-4 text-gold-primary" />
                <span className="text-dark-400 text-sm">Ajouté par</span>
              </div>
              <p className="text-white font-semibold">{document.uploadedBy}</p>
            </div>

            <div className="bg-dark-800 border border-dark-700 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <FolderOpen className="w-4 h-4 text-gold-primary" />
                <span className="text-dark-400 text-sm">Projet associé</span>
              </div>
              <p className="text-white font-semibold">{document.project}</p>
            </div>
          </div>

          {/* Description */}
          <div className="bg-dark-800 border border-dark-700 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-3">À propos de ce document</h3>
            <p className="text-dark-300 text-sm leading-relaxed">
              Ce document a été ajouté à votre espace le {formatDate(document.uploadedAt)} par {document.uploadedBy}. 
              Il est associé au projet "{document.project}" et contient des informations importantes pour le suivi de vos activités.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-dark-700">
          <button
            onClick={onClose}
            className="px-6 py-2.5 border border-dark-700 rounded-lg text-dark-300 hover:text-white hover:border-dark-600 transition-colors"
          >
            Fermer
          </button>
          <a
            href={document.url}
            download={document.name}
            className="px-6 py-2.5 bg-gold-primary hover:bg-gold-secondary text-dark-900 font-semibold rounded-lg transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Télécharger
          </a>
        </div>
      </div>
    </div>
  );
};

export default DocumentModal;
