import React, { useState } from 'react';
import { useDocuments, DOCUMENT_TYPES, DOCUMENT_CATEGORIES } from '../../../contexts/DocumentsContext';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { Select } from '../../../components/ui/Input';
import FileUploader from '../../../components/ui/FileUploader';
import Modal from '../../../components/ui/Modal';
import { useResponsive } from '../../../hooks/useResponsive';

/**
 * Page Documents avec upload et gestion
 */
const Documents = () => {
  const { documents, filterDocuments, addDocument, deleteDocument } = useDocuments();
  const { isMobile } = useResponsive();

  const [filters, setFilters] = useState({
    type: '',
    category: '',
    search: '',
  });

  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  // Appliquer les filtres
  const filteredDocuments = filterDocuments(filters);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  // Format taille
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  // Icône du type de document
  const getDocumentIcon = (type) => {
    const icons = {
      pdf: '📕',
      word: '📘',
      excel: '📊',
      image: '🖼️',
      contract: '📝',
      report: '📈',
      presentation: '📽️',
      other: '📄',
    };
    return icons[type] || '📄';
  };

  // Callback après upload
  const handleUploadComplete = (uploadedFiles) => {
    uploadedFiles.forEach((file) => {
      addDocument({
        name: file.name,
        size: file.size,
        type: file.extension.replace('.', '') || 'other',
        category: 'other',
        tags: [],
      });
    });
    setUploadModalOpen(false);
  };

  const handleDelete = (documentId) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce document ?')) {
      deleteDocument(documentId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Documents
          </h1>
          <p className="text-dark-300">
            {filteredDocuments.length} document{filteredDocuments.length > 1 ? 's' : ''}
          </p>
        </div>
        <Button variant="primary" onClick={() => setUploadModalOpen(true)}>
          <span className="mr-2">📤</span>
          {!isMobile && 'Importer'}
        </Button>
      </div>

      {/* Filtres */}
      <Card padding="normal">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Rechercher un document..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-gold-primary"
          />
          <Select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            options={Object.entries(DOCUMENT_TYPES).map(([key, label]) => ({
              value: key,
              label,
            }))}
            placeholder="Tous les types"
            fullWidth
          />
          <Select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            options={Object.entries(DOCUMENT_CATEGORIES).map(([key, label]) => ({
              value: key,
              label,
            }))}
            placeholder="Toutes catégories"
            fullWidth
          />
        </div>
      </Card>

      {/* Liste des documents */}
      {filteredDocuments.length === 0 ? (
        <Card padding="large">
          <div className="text-center py-8">
            <span className="text-6xl mb-4 block">📄</span>
            <h3 className="text-xl font-semibold text-white mb-2">
              Aucun document trouvé
            </h3>
            <p className="text-dark-300 mb-6">
              {filters.search || filters.type || filters.category
                ? 'Essayez de modifier vos filtres'
                : 'Importez vos premiers documents'}
            </p>
            <Button variant="primary" onClick={() => setUploadModalOpen(true)}>
              Importer des documents
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredDocuments.map((doc) => (
            <Card key={doc.id} padding="normal" hoverable>
              <div className="flex items-start justify-between">
                {/* Info document */}
                <div className="flex items-start space-x-4 flex-1 min-w-0">
                  {/* Icône */}
                  <div className="text-4xl flex-shrink-0">
                    {getDocumentIcon(doc.type)}
                  </div>

                  {/* Détails */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-white mb-1 truncate">
                      {doc.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-dark-300 mb-2">
                      <span>{DOCUMENT_TYPES[doc.type]}</span>
                      <span>•</span>
                      <span>{DOCUMENT_CATEGORIES[doc.category]}</span>
                      <span>•</span>
                      <span>{formatFileSize(doc.size)}</span>
                      <span>•</span>
                      <span>v{doc.version}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="text-dark-400">
                        Importé par {doc.uploadedBy} le {formatDate(doc.uploadedAt)}
                      </span>
                      {doc.tags.length > 0 && (
                        <>
                          <span className="text-dark-400">•</span>
                          <div className="flex flex-wrap gap-1">
                            {doc.tags.map((tag, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 bg-dark-700 text-gold-primary rounded-full"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                    {doc.description && (
                      <p className="text-dark-300 text-sm mt-2 line-clamp-2">
                        {doc.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-2 ml-4 flex-shrink-0">
                  <Button variant="outline" size="sm">
                    📥 Télécharger
                  </Button>
                  <Button variant="ghost" size="sm">
                    👁️ Voir
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(doc.id)}
                  >
                    🗑️
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Modal d'upload */}
      <Modal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        title="Importer des documents"
        size="lg"
      >
        <FileUploader
          accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.gif"
          multiple={true}
          maxSize={20 * 1024 * 1024} // 20MB
          onUploadComplete={handleUploadComplete}
        />
        <div className="mt-6 p-4 bg-dark-700 rounded-lg">
          <h4 className="text-white font-medium mb-2">📋 Formats acceptés</h4>
          <p className="text-dark-300 text-sm">
            PDF, Word (.doc, .docx), Excel (.xls, .xlsx), PowerPoint (.ppt, .pptx), 
            Images (.jpg, .jpeg, .png, .gif)
          </p>
          <p className="text-dark-400 text-xs mt-2">
            Taille maximale: 20 MB par fichier
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default Documents;
