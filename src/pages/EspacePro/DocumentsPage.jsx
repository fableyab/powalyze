import React, { useState, useEffect } from 'react';
import { FiUpload, FiDownload, FiTrash2, FiSearch, FiFile, FiFileText, FiImage, FiFolder } from 'react-icons/fi';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const PMO_CATEGORIES = [
  { id: 'charter', label: '📄 Charte Projet', color: 'purple' },
  { id: 'planning', label: '📅 Planning', color: 'blue' },
  { id: 'budget', label: '💰 Budget', color: 'green' },
  { id: 'risks', label: '⚠️ Risques', color: 'orange' },
  { id: 'reports', label: '📊 Rapports', color: 'indigo' },
  { id: 'powerbi', label: '📊 Power BI', color: 'yellow' },
  { id: 'data-analysis', label: '📊 Analyse Données', color: 'cyan' },
  { id: 'deliverables', label: '📦 Livrables', color: 'pink' },
  { id: 'contracts', label: '📝 Contrats', color: 'red' },
  { id: 'other', label: '📁 Autres', color: 'gray' },
];

const STORAGE_KEY = 'powalyze_documents';

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
};

const getFileIcon = (type) => {
  if (type?.includes('image')) return FiImage;
  if (type?.includes('spreadsheet') || type?.includes('excel')) return FiFileText;
  if (type?.includes('pdf')) return FiFile;
  return FiFileText;
};

export default function DocumentsPage() {
  const [documents, setDocuments] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(documents));
  }, [documents]);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    setCategoryModalOpen(true);
  };

  const handleCategorySelect = (category) => {
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const newDoc = {
        id: Date.now(),
        name: selectedFile.name,
        category: category.id,
        categoryLabel: category.label,
        type: selectedFile.type,
        size: selectedFile.size,
        data: e.target.result,
        uploadedAt: new Date().toISOString(),
        uploadedBy: 'Utilisateur',
      };

      setDocuments(prev => [newDoc, ...prev]);
      setSelectedFile(null);
      setCategoryModalOpen(false);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleDownload = (doc) => {
    try {
      const link = document.createElement('a');
      link.href = doc.data;
      link.download = doc.name;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        document.body.removeChild(link);
        if (doc.data.startsWith('blob:')) {
          URL.revokeObjectURL(doc.data);
        }
      }, 100);
    } catch (error) {
      console.error('Erreur de téléchargement:', error);
      alert('Erreur lors du téléchargement du fichier');
    }
  };

  const handleDelete = (docId) => {
    if (!confirm('Voulez-vous vraiment supprimer ce document ?')) return;
    setDocuments(prev => prev.filter(d => d.id !== docId));
  };

  const filteredDocs = documents.filter(doc => {
    const matchSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       doc.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = filterCategory === 'all' || doc.category === filterCategory;
    return matchSearch && matchCategory;
  });

  const stats = {
    total: documents.length,
    byCategory: PMO_CATEGORIES.reduce((acc, cat) => {
      acc[cat.id] = documents.filter(d => d.category === cat.id).length;
      return acc;
    }, {}),
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Documents</h1>
          <p className="text-gray-400">Gestion centralisée des documents PMO</p>
        </div>
        <label htmlFor="file-upload" className="bg-[#BFA76A] hover:bg-[#BFA76A]/90 text-black font-medium px-6 py-3 rounded-lg transition-all cursor-pointer inline-flex items-center gap-2">
          <FiUpload size={18} />
          Uploader un document
          <input type="file" id="file-upload" className="hidden" onChange={handleFileSelect} accept="*/*" />
        </label>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-[#111] border-white/10 p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <FiFileText className="text-purple-400" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
              <p className="text-xs text-gray-400">Documents</p>
            </div>
          </div>
        </Card>
        <Card className="bg-[#111] border-white/10 p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <FiFolder className="text-blue-400" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{PMO_CATEGORIES.length}</p>
              <p className="text-xs text-gray-400">Catégories</p>
            </div>
          </div>
        </Card>
        <Card className="bg-[#111] border-white/10 p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <FiFileText className="text-green-400" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.byCategory['powerbi'] || 0}</p>
              <p className="text-xs text-gray-400">Power BI</p>
            </div>
          </div>
        </Card>
        <Card className="bg-[#111] border-white/10 p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
              <FiFileText className="text-orange-400" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.byCategory['data-analysis'] || 0}</p>
              <p className="text-xs text-gray-400">Analyses</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="bg-[#111] border-white/10 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Rechercher un document..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder:text-gray-500 focus:border-[#BFA76A]/50 focus:outline-none"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filterCategory === 'all'
                  ? 'bg-[#BFA76A]/20 text-[#BFA76A] border border-[#BFA76A]/50'
                  : 'bg-white/5 text-gray-400 border border-white/10 hover:text-white'
              }`}
            >
              Tous
            </button>
            {PMO_CATEGORIES.slice(0, 5).map(cat => (
              <button
                key={cat.id}
                onClick={() => setFilterCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filterCategory === cat.id
                    ? 'bg-[#BFA76A]/20 text-[#BFA76A] border border-[#BFA76A]/50'
                    : 'bg-white/5 text-gray-400 border border-white/10 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {filteredDocs.length === 0 ? (
        <Card className="bg-[#111] border-white/10 p-12">
          <div className="text-center">
            <FiFileText className="mx-auto text-gray-600 mb-4" size={64} />
            <h3 className="text-xl font-bold text-white mb-2">Aucun document</h3>
            <p className="text-gray-400 mb-6">Commencez par uploader votre premier document</p>
            <label htmlFor="file-upload-empty" className="inline-flex items-center gap-2 bg-[#BFA76A] hover:bg-[#BFA76A]/90 text-black font-medium px-6 py-3 rounded-lg transition-all cursor-pointer">
              <FiUpload size={18} />
              Uploader un document
              <input type="file" id="file-upload-empty" className="hidden" onChange={handleFileSelect} accept="*/*" />
            </label>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocs.map(doc => {
            const Icon = getFileIcon(doc.type);
            return (
              <Card key={doc.id} className="bg-[#111] border-white/10 p-4 hover:border-[#BFA76A]/50 transition-all group">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-[#BFA76A]/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="text-[#BFA76A]" size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white truncate mb-1">{doc.name}</h3>
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <Badge className="text-xs bg-blue-500/20 text-blue-400 border-blue-500/50">{doc.categoryLabel}</Badge>
                      <span className="text-xs text-gray-500">{formatFileSize(doc.size)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span>{doc.uploadedBy}</span>
                      <span>•</span>
                      <span>{formatDate(doc.uploadedAt)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDownload(doc)}
                    className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-4 py-2 rounded-lg text-sm transition-all"
                  >
                    <FiDownload size={14} />
                    Télécharger
                  </button>
                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="flex items-center justify-center bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-2 rounded-lg transition-all"
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Modal Catégorisation */}
      {categoryModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#111] border border-white/10 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-white/10">
              <h2 className="text-2xl font-bold text-white mb-2">Catégoriser le document</h2>
              <p className="text-gray-400">Fichier: <span className="text-white font-semibold">{selectedFile?.name}</span></p>
              <p className="text-sm text-gray-500 mt-2">Sélectionnez la catégorie PMO appropriée pour ce document:</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-3">
                {PMO_CATEGORIES.map(category => (
                  <button
                    key={category.id}
                    onClick={() => handleCategorySelect(category)}
                    className="p-4 rounded-lg border-2 border-white/10 bg-[#0A0A0A] hover:border-[#BFA76A]/50 hover:bg-[#BFA76A]/10 transition-all text-left"
                  >
                    <p className="font-semibold text-white text-sm">{category.label}</p>
                  </button>
                ))}
              </div>
            </div>
            <div className="p-6 border-t border-white/10">
              <button
                onClick={() => {
                  setCategoryModalOpen(false);
                  setSelectedFile(null);
                }}
                className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 px-4 py-2 rounded-lg transition-all"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
