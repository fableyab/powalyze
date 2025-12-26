import React, { useState } from 'react';
import { FolderOpen, FileText } from 'lucide-react';
import DocumentUploader from '../../components/documents/DocumentUploader';
import DocumentFilters from '../../components/documents/DocumentFilters';
import DocumentList from '../../components/documents/DocumentList';
import DocumentModal from '../../components/documents/DocumentModal';
import { useDocuments } from '../../contexts/DocumentsContext';

const Documents = () => {
  const { documents } = useDocuments();
  const [selectedDocument, setSelectedDocument] = useState(null);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-dark-800 to-dark-900 rounded-lg p-8 border border-dark-700 shadow-xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-gold-primary/10 p-3 rounded-lg">
            <FolderOpen className="w-8 h-8 text-gold-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Documents</h1>
            <p className="text-dark-300 mt-1">Centralisez et organisez tous vos fichiers projet</p>
          </div>
        </div>
        <p className="text-dark-400 max-w-3xl">
          Importez, classez et partagez vos documents en toute sécurité. Tous vos fichiers sont organisés par projet 
          et accessibles en un clic pour une gestion optimale de votre documentation.
        </p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-dark-800 border border-dark-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-dark-400 text-sm mb-1">Total documents</p>
              <p className="text-3xl font-bold text-white">{documents.length}</p>
            </div>
            <FileText className="w-10 h-10 text-gold-primary/30" />
          </div>
        </div>

        <div className="bg-dark-800 border border-dark-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-dark-400 text-sm mb-1">Documents PDF</p>
              <p className="text-3xl font-bold text-white">
                {documents.filter(d => d.type === 'pdf').length}
              </p>
            </div>
            <FileText className="w-10 h-10 text-red-500/30" />
          </div>
        </div>

        <div className="bg-dark-800 border border-dark-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-dark-400 text-sm mb-1">Fichiers Excel</p>
              <p className="text-3xl font-bold text-white">
                {documents.filter(d => d.type === 'excel').length}
              </p>
            </div>
            <FileText className="w-10 h-10 text-green-500/30" />
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Importer un document</h2>
        <DocumentUploader />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <DocumentFilters />
        </div>

        {/* Documents List */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">
              Mes documents ({documents.length})
            </h2>
          </div>
          <DocumentList onView={setSelectedDocument} />
        </div>
      </div>

      {/* Document Details Modal */}
      {selectedDocument && (
        <DocumentModal
          document={selectedDocument}
          onClose={() => setSelectedDocument(null)}
        />
      )}
    </div>
  );
};

export default Documents;
