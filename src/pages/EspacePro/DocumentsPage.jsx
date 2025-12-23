import React, { useState } from 'react';
import { FiPlus, FiSearch, FiFilter, FiFileText, FiGrid, FiList } from 'react-icons/fi';
import { useDocumentsContext, FILE_TYPES, CATEGORIES } from '@/contexts/DocumentsContext';
import FileUploader from '@/components/documents/FileUploader';
import FileCard from '@/components/documents/FileCard';
import RenameModal from '@/components/documents/RenameModal';
import TagsEditModal from '@/components/documents/TagsEditModal';

export default function DocumentsPage() {
  const {
    documents,
    deleteDocument,
    renameDocument,
    updateDocumentTags,
    downloadDocument,
  } = useDocumentsContext();

  const [showUploader, setShowUploader] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [renameDoc, setRenameDoc] = useState(null);
  const [tagsEditDoc, setTagsEditDoc] = useState(null);

  // Stats
  const stats = {
    total: documents.length,
    byType: FILE_TYPES.reduce((acc, type) => {
      acc[type.id] = documents.filter(d => d.fileType === type.id).length;
      return acc;
    }, {}),
    byCategory: CATEGORIES.reduce((acc, cat) => {
      acc[cat.id] = documents.filter(d => d.category === cat.id).length;
      return acc;
    }, {}),
    totalSize: documents.reduce((sum, doc) => sum + doc.size, 0),
  };

  // Filtering
  const filteredDocs = documents.filter(doc => {
    const matchSearch = 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchType = filterType === 'all' || doc.fileType === filterType;
    const matchCategory = filterCategory === 'all' || doc.category === filterCategory;
    return matchSearch && matchType && matchCategory;
  });

  const handleDelete = (doc) => {
    if (window.confirm(`Voulez-vous vraiment supprimer "${doc.name}" ?`)) {
      deleteDocument(doc.id);
    }
  };

  const formatTotalSize = (bytes) => {
    const gb = bytes / 1024 / 1024 / 1024;
    return gb >= 1 ? `${gb.toFixed(2)} GB` : `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#BFA76A] to-[#D4AF37] bg-clip-text text-transparent">
            Documents
          </h1>
          <p className="text-gray-400 mt-2">
            Gestionnaire de documents premium - Style Monday.com
          </p>
        </div>
        <button
          onClick={() => setShowUploader(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#BFA76A] to-[#D4AF37] text-black font-bold rounded-lg hover:shadow-lg hover:shadow-[#BFA76A]/20 transition-all"
        >
          <FiPlus className="w-5 h-5" />
          Nouveau Document
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#BFA76A]/20 rounded-xl p-6 hover:border-[#BFA76A]/40 transition-all">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 flex items-center justify-center">
              <FiFileText className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-3xl font-bold text-white">{stats.total}</p>
              <p className="text-sm text-gray-400">Documents</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#BFA76A]/20 rounded-xl p-6 hover:border-[#BFA76A]/40 transition-all">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 flex items-center justify-center">
              <FiGrid className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-3xl font-bold text-white">{FILE_TYPES.length}</p>
              <p className="text-sm text-gray-400">Types</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#BFA76A]/20 rounded-xl p-6 hover:border-[#BFA76A]/40 transition-all">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30 flex items-center justify-center">
              <FiList className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-3xl font-bold text-white">{CATEGORIES.length}</p>
              <p className="text-sm text-gray-400">Catégories</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#BFA76A]/20 rounded-xl p-6 hover:border-[#BFA76A]/40 transition-all">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 flex items-center justify-center">
              <FiFileText className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{formatTotalSize(stats.totalSize)}</p>
              <p className="text-sm text-gray-400">Stockage</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#BFA76A]/20 rounded-xl p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par nom ou tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[#0A0A0A] border border-[#BFA76A]/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#BFA76A]/50"
            />
          </div>

          {/* Filter Type */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-3 bg-[#0A0A0A] border border-[#BFA76A]/20 rounded-lg text-white focus:outline-none focus:border-[#BFA76A]/50"
          >
            <option value="all">Tous les types</option>
            {FILE_TYPES.map(type => (
              <option key={type.id} value={type.id}>
                {type.icon} {type.label}
              </option>
            ))}
          </select>

          {/* Filter Category */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-3 bg-[#0A0A0A] border border-[#BFA76A]/20 rounded-lg text-white focus:outline-none focus:border-[#BFA76A]/50"
          >
            <option value="all">Toutes les catégories</option>
            {CATEGORIES.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.icon} {cat.label}
              </option>
            ))}
          </select>

          {/* View Mode */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-3 rounded-lg transition-all ${
                viewMode === 'grid'
                  ? 'bg-[#BFA76A]/20 text-[#BFA76A] border border-[#BFA76A]/50'
                  : 'bg-[#0A0A0A] text-gray-400 border border-[#BFA76A]/20 hover:text-white'
              }`}
            >
              <FiGrid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-3 rounded-lg transition-all ${
                viewMode === 'list'
                  ? 'bg-[#BFA76A]/20 text-[#BFA76A] border border-[#BFA76A]/50'
                  : 'bg-[#0A0A0A] text-gray-400 border border-[#BFA76A]/20 hover:text-white'
              }`}
            >
              <FiList className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Documents Grid/List */}
      {filteredDocs.length === 0 ? (
        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#BFA76A]/20 rounded-xl p-12">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#BFA76A]/20 to-[#D4AF37]/10 border border-[#BFA76A]/30 flex items-center justify-center">
              <FiFileText className="w-12 h-12 text-[#BFA76A]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              {searchQuery || filterType !== 'all' || filterCategory !== 'all' 
                ? 'Aucun document trouvé'
                : 'Aucun document'
              }
            </h3>
            <p className="text-gray-400 mb-8">
              {searchQuery || filterType !== 'all' || filterCategory !== 'all'
                ? 'Essayez de modifier vos filtres de recherche'
                : 'Commencez par uploader votre premier document'
              }
            </p>
            <button
              onClick={() => setShowUploader(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#BFA76A] to-[#D4AF37] text-black font-bold rounded-lg hover:shadow-lg hover:shadow-[#BFA76A]/20 transition-all"
            >
              <FiPlus className="w-5 h-5" />
              Nouveau Document
            </button>
          </div>
        </div>
      ) : (
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          : 'space-y-4'
        }>
          {filteredDocs.map(doc => (
            <FileCard
              key={doc.id}
              document={doc}
              onDownload={downloadDocument}
              onDelete={handleDelete}
              onRename={setRenameDoc}
              onTagsEdit={setTagsEditDoc}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      {showUploader && (
        <FileUploader
          onClose={() => setShowUploader(false)}
          onSuccess={() => setShowUploader(false)}
        />
      )}

      {renameDoc && (
        <RenameModal
          document={renameDoc}
          onClose={() => setRenameDoc(null)}
          onSave={renameDocument}
        />
      )}

      {tagsEditDoc && (
        <TagsEditModal
          document={tagsEditDoc}
          onClose={() => setTagsEditDoc(null)}
          onSave={updateDocumentTags}
        />
      )}
    </div>
  );
}
