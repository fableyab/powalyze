import React from 'react';
import { FileX } from 'lucide-react';
import DocumentCard from './DocumentCard';
import { useDocuments } from '../../contexts/DocumentsContext';

const DocumentList = ({ onView }) => {
  const { documents, deleteDocument } = useDocuments();

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce document ?')) {
      deleteDocument(id);
    }
  };

  if (documents.length === 0) {
    return (
      <div className="bg-dark-800 border border-dark-700 rounded-lg p-12 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="bg-dark-900 p-6 rounded-full">
            <FileX className="w-12 h-12 text-dark-500" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg mb-2">Aucun document trouvé</h3>
            <p className="text-dark-400 text-sm">
              Aucun document ne correspond à vos critères de recherche.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {documents.map((document) => (
        <DocumentCard
          key={document.id}
          document={document}
          onView={onView}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default DocumentList;
