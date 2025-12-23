import React, { useState } from 'react';
import { FiArrowLeft, FiUpload, FiSave } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useProjectsContext, PROJECT_STATUSES, PROJECT_PRIORITIES, PROJECT_CATEGORIES } from '@/contexts/ProjectsContext';
import ProjectUploader from '@/components/projects/ProjectUploader';

export default function NouveauProjet() {
  const navigate = useNavigate();
  const { createProject } = useProjectsContext();
  const [showUploader, setShowUploader] = useState(false);
  const [documents, setDocuments] = useState([]);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    manager: '',
    startDate: '',
    endDate: '',
    status: 'planification',
    priority: 'moyenne',
    category: 'autre',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Le nom du projet est obligatoire';
    if (!formData.manager.trim()) newErrors.manager = 'Le chef de projet est obligatoire';
    if (!formData.startDate) newErrors.startDate = 'La date de début est obligatoire';
    if (formData.endDate && formData.startDate && new Date(formData.endDate) < new Date(formData.startDate)) {
      newErrors.endDate = 'La date de fin doit être après la date de début';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newProject = createProject({
      ...formData,
      documents,
    });

    navigate('/espace-pro/projets');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/espace-pro/projets')}
          className="p-3 rounded-lg bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#BFA76A]/20 hover:border-[#BFA76A]/40 transition-all"
        >
          <FiArrowLeft className="w-6 h-6 text-[#BFA76A]" />
        </button>
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#BFA76A] to-[#D4AF37] bg-clip-text text-transparent">
            Nouveau Projet
          </h1>
          <p className="text-gray-400 mt-2">Créez un nouveau projet avec tous les détails</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Informations de base */}
        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#BFA76A]/20 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Informations de base</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Nom du projet *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-4 py-3 bg-[#0A0A0A] border rounded-lg text-white placeholder-gray-500 focus:outline-none ${
                  errors.name ? 'border-red-500/50 focus:border-red-500' : 'border-[#BFA76A]/20 focus:border-[#BFA76A]/50'
                }`}
                placeholder="Ex: Migration vers Azure"
              />
              {errors.name && <p className="text-red-400 text-sm mt-2">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#BFA76A]/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#BFA76A]/50 resize-none"
                placeholder="Description du projet..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Chef de projet *</label>
              <input
                type="text"
                value={formData.manager}
                onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                className={`w-full px-4 py-3 bg-[#0A0A0A] border rounded-lg text-white placeholder-gray-500 focus:outline-none ${
                  errors.manager ? 'border-red-500/50 focus:border-red-500' : 'border-[#BFA76A]/20 focus:border-[#BFA76A]/50'
                }`}
                placeholder="Ex: Marie Dubois"
              />
              {errors.manager && <p className="text-red-400 text-sm mt-2">{errors.manager}</p>}
            </div>
          </div>
        </div>

        {/* Dates et Classification */}
        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#BFA76A]/20 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Dates et Classification</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Date de début *</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className={`w-full px-4 py-3 bg-[#0A0A0A] border rounded-lg text-white focus:outline-none ${
                  errors.startDate ? 'border-red-500/50 focus:border-red-500' : 'border-[#BFA76A]/20 focus:border-[#BFA76A]/50'
                }`}
              />
              {errors.startDate && <p className="text-red-400 text-sm mt-2">{errors.startDate}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Date de fin</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className={`w-full px-4 py-3 bg-[#0A0A0A] border rounded-lg text-white focus:outline-none ${
                  errors.endDate ? 'border-red-500/50 focus:border-red-500' : 'border-[#BFA76A]/20 focus:border-[#BFA76A]/50'
                }`}
              />
              {errors.endDate && <p className="text-red-400 text-sm mt-2">{errors.endDate}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Statut</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#BFA76A]/20 rounded-lg text-white focus:outline-none focus:border-[#BFA76A]/50"
              >
                {PROJECT_STATUSES.map(status => (
                  <option key={status.id} value={status.id}>{status.icon} {status.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Priorité</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#BFA76A]/20 rounded-lg text-white focus:outline-none focus:border-[#BFA76A]/50"
              >
                {PROJECT_PRIORITIES.map(priority => (
                  <option key={priority.id} value={priority.id}>{priority.icon} {priority.label}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-400 mb-2">Catégorie</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#BFA76A]/20 rounded-lg text-white focus:outline-none focus:border-[#BFA76A]/50"
              >
                {PROJECT_CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.icon} {cat.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Documents */}
        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#BFA76A]/20 rounded-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Documents</h2>
            <button
              type="button"
              onClick={() => setShowUploader(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#BFA76A] to-[#D4AF37] text-black font-medium rounded-lg hover:shadow-lg hover:shadow-[#BFA76A]/20 transition-all"
            >
              <FiUpload className="w-4 h-4" />
              Upload
            </button>
          </div>
          {documents.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-[#BFA76A]/30 rounded-xl">
              <p className="text-gray-400">Aucun document ajouté</p>
              <p className="text-gray-500 text-sm mt-2">Cliquez sur "Upload" pour ajouter des documents</p>
            </div>
          ) : (
            <div className="space-y-3">
              {documents.map((doc, index) => (
                <div key={index} className="flex items-center justify-between bg-[#0A0A0A] border border-[#BFA76A]/20 rounded-lg p-4">
                  <span className="text-white">{doc.name}</span>
                  <button
                    type="button"
                    onClick={() => setDocuments(documents.filter((_, i) => i !== index))}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    Supprimer
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => navigate('/espace-pro/projets')}
            className="flex-1 px-6 py-4 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 transition-all"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#BFA76A] to-[#D4AF37] text-black font-bold rounded-lg hover:shadow-lg hover:shadow-[#BFA76A]/20 transition-all"
          >
            <FiSave className="w-5 h-5" />
            Créer le projet
          </button>
        </div>
      </form>

      {/* Uploader Modal */}
      {showUploader && (
        <ProjectUploader
          onClose={() => setShowUploader(false)}
          onSuccess={() => {
            setShowUploader(false);
            // Documents will be handled by DocumentsContext
          }}
        />
      )}
    </div>
  );
}