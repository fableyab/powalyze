/**
 * DOCUMENTS PAGE
 * Gestion complète des documents avec upload, catégorisation PMO et téléchargement
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, Upload, Download, Trash2, Search, Filter,
  FolderOpen, File, FileSpreadsheet, Image as ImageIcon,
  Archive, Eye, Calendar, User, Tag, Plus, X
} from 'lucide-react';
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';
import { Badge } from '@/shared/components/ui/Badge';
import { Card } from '@/shared/components/ui/Card';
import { Modal } from '@/shared/components/ui/Modal';
import { Dropdown } from '@/shared/components/ui/Dropdown';
import { EmptyState } from '@/shared/components/ui/EmptyState';
import { formatDate, formatFileSize, cn } from '@/lib/utils';

// Catégories PMO standard
const PMO_CATEGORIES = [
  { id: 'charter', label: 'Charte Projet', icon: FileText, color: 'purple' },
  { id: 'planning', label: 'Planning', icon: Calendar, color: 'blue' },
  { id: 'budget', label: 'Budget', icon: FileSpreadsheet, color: 'green' },
  { id: 'risks', label: 'Risques', icon: Archive, color: 'orange' },
  { id: 'reports', label: 'Rapports', icon: FileText, color: 'indigo' },
  { id: 'powerbi', label: 'Power BI', icon: FileSpreadsheet, color: 'yellow' },
  { id: 'data-analysis', label: 'Analyse Données', icon: FileSpreadsheet, color: 'cyan' },
  { id: 'deliverables', label: 'Livrables', icon: FolderOpen, color: 'pink' },
  { id: 'contracts', label: 'Contrats', icon: File, color: 'red' },
  { id: 'other', label: 'Autres', icon: File, color: 'gray' },
];

const STORAGE_KEY = 'powalyze_documents';

const getFileIcon = (type) => {
  if (type?.includes('image')) return ImageIcon;
  if (type?.includes('spreadsheet') || type?.includes('excel')) return FileSpreadsheet;
  if (type?.includes('pdf')) return File;
  return FileText;
};

export default function DocumentsPage() {
  const [documents, setDocuments] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [uploadProgress, setUploadProgress] = useState(0);

  // Sauvegarde automatique
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(documents));
  }, [documents]);

  // === UPLOAD HANDLER ===
  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setCategoryModalOpen(true);
  };

  const handleCategorySelect = (category) => {
    if (!selectedFile) return;

    setSelectedCategory(category);
    setCategoryModalOpen(false);
    simulateUpload();
  };

  const simulateUpload = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          saveDocument();
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  const saveDocument = () => {
    if (!selectedFile || !selectedCategory) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const newDoc = {
        id: Date.now(),
        name: selectedFile.name,
        category: selectedCategory.id,
        categoryLabel: selectedCategory.label,
        type: selectedFile.type,
        size: selectedFile.size,
        data: e.target.result, // Base64 data
        uploadedAt: new Date().toISOString(),
        uploadedBy: 'Utilisateur',
      };

      setDocuments(prev => [newDoc, ...prev]);
      setSelectedFile(null);
      setSelectedCategory(null);
      setUploadProgress(0);
      setUploadModalOpen(false);
    };
    reader.readAsDataURL(selectedFile);
  };

  // === DOWNLOAD HANDLER ===
  const handleDownload = (doc) => {
    const link = document.createElement('a');
    link.href = doc.data;
    link.download = doc.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // === DELETE HANDLER ===
  const handleDelete = (docId) => {
    if (!confirm('Voulez-vous vraiment supprimer ce document ?')) return;
    setDocuments(prev => prev.filter(d => d.id !== docId));
  };

  // === FILTERS ===
  const filteredDocs = documents.filter(doc => {
    const matchSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       doc.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = filterCategory === 'all' || doc.category === filterCategory;
    return matchSearch && matchCategory;
  });

  // Stats
  const stats = {
    total: documents.length,
    byCategory: PMO_CATEGORIES.reduce((acc, cat) => {
      acc[cat.id] = documents.filter(d => d.category === cat.id).length;
      return acc;
    }, {}),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Documents</h1>
          <p className="text-gray-400">Gestion centralisée des documents PMO</p>
        </div>

        <Button
          variant="primary"
          onClick={() => setUploadModalOpen(true)}
          className="gap-2"
        >
          <Upload size={18} />
          Uploader un document
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border-purple-500/30 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <FileText className="text-purple-400" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
              <p className="text-xs text-gray-400">Documents</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border-blue-500/30 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <FolderOpen className="text-blue-400" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{PMO_CATEGORIES.length}</p>
              <p className="text-xs text-gray-400">Catégories</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/20 to-green-600/10 border-green-500/30 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <FileSpreadsheet className="text-green-400" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.byCategory['powerbi'] || 0}</p>
              <p className="text-xs text-gray-400">Power BI</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 border-orange-500/30 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
              <Archive className="text-orange-400" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.byCategory['data-analysis'] || 0}</p>
              <p className="text-xs text-gray-400">Analyses</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <Input
                placeholder="Rechercher un document..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            <Button
              variant={filterCategory === 'all' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setFilterCategory('all')}
            >
              Tous
            </Button>
            {PMO_CATEGORIES.map(cat => (
              <Button
                key={cat.id}
                variant={filterCategory === cat.id ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setFilterCategory(cat.id)}
              >
                <cat.icon size={14} />
                {cat.label}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Documents List */}
      {filteredDocs.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="Aucun document"
          description="Commencez par uploader votre premier document"
          action={
            <Button variant="primary" onClick={() => setUploadModalOpen(true)}>
              <Upload size={18} />
              Uploader un document
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocs.map(doc => {
            const Icon = getFileIcon(doc.type);
            const category = PMO_CATEGORIES.find(c => c.id === doc.category);
            
            return (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <Card className="p-4 hover:border-brand-gold-500/50 transition-all group">
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0",
                      `bg-${category?.color}-500/20`
                    )}>
                      <Icon className={`text-${category?.color}-400`} size={24} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white truncate mb-1">{doc.name}</h3>
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <Badge variant={category?.color} className="text-xs">
                          {doc.categoryLabel}
                        </Badge>
                        <span className="text-xs text-gray-500">{formatFileSize(doc.size)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <User size={12} />
                        <span>{doc.uploadedBy}</span>
                        <span>•</span>
                        <span>{formatDate(doc.uploadedAt)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownload(doc)}
                      className="flex-1"
                    >
                      <Download size={14} />
                      Télécharger
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(doc.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Upload Modal */}
      <Modal
        isOpen={uploadModalOpen}
        onClose={() => {
          setUploadModalOpen(false);
          setUploadProgress(0);
        }}
        title="Uploader un document"
      >
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-brand-gold-500 transition-colors">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileSelect}
              accept="*/*"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="mx-auto mb-4 text-gray-400" size={48} />
              <p className="text-white font-semibold mb-2">Cliquez pour sélectionner un fichier</p>
              <p className="text-sm text-gray-400">Tous types de fichiers acceptés</p>
            </label>
          </div>

          {uploadProgress > 0 && uploadProgress < 100 && (
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Upload en cours...</span>
                <span className="text-brand-gold-500">{uploadProgress}%</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-brand-gold-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </Modal>

      {/* Category Selection Modal */}
      <Modal
        isOpen={categoryModalOpen}
        onClose={() => {
          setCategoryModalOpen(false);
          setSelectedFile(null);
        }}
        title="Catégoriser le document"
        size="lg"
      >
        <div className="space-y-4">
          <p className="text-gray-400">
            Fichier: <span className="text-white font-semibold">{selectedFile?.name}</span>
          </p>
          <p className="text-sm text-gray-500">
            Sélectionnez la catégorie PMO appropriée pour ce document:
          </p>

          <div className="grid grid-cols-2 gap-3">
            {PMO_CATEGORIES.map(category => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category)}
                className={cn(
                  "p-4 rounded-lg border-2 transition-all text-left",
                  "hover:border-brand-gold-500 hover:bg-brand-gold-500/10",
                  "border-gray-700 bg-gray-800/50"
                )}
              >
                <category.icon className={`text-${category.color}-400 mb-2`} size={24} />
                <p className="font-semibold text-white text-sm">{category.label}</p>
              </button>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}
