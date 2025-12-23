import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDashboardContext } from '../../contexts/DashboardContext';
import { useProjectsContext } from '../../contexts/ProjectsContext';
import BackToDashboard from '../../components/dashboard/BackToDashboard';
import { FiSettings, FiSave, FiTrash2, FiAlertTriangle, FiCheck } from 'react-icons/fi';

const DashboardSettings = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { getProjectById } = useDashboardContext();
  const { updateProject, deleteProject, PROJECT_STATUSES, PROJECT_PRIORITIES, PROJECT_CATEGORIES } = useProjectsContext();
  
  const project = getProjectById(projectId);
  
  const [formData, setFormData] = useState({
    name: project?.name || '',
    description: project?.description || '',
    manager: project?.manager || '',
    startDate: project?.startDate || '',
    endDate: project?.endDate || '',
    status: project?.status || 'planification',
    priority: project?.priority || 'moyenne',
    category: project?.category || '',
    budget: project?.budget || '',
    budgetUsed: project?.budgetUsed || '',
    progress: project?.progress || 0
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] p-8">
        <BackToDashboard className="mb-6" />
        <div className="bg-[#111] border border-white/10 rounded-lg p-12 text-center">
          <FiAlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Projet introuvable</h1>
          <p className="text-gray-400">Le projet demandé n'existe pas ou a été supprimé.</p>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProject(projectId, formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleDelete = () => {
    deleteProject(projectId);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-8 space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-4">
          <BackToDashboard />
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-lg bg-[#BFA76A]/20 flex items-center justify-center">
              <FiSettings className="w-8 h-8 text-[#BFA76A]" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Paramètres du Projet</h1>
              <p className="text-gray-400">{project.name}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {saveSuccess && (
        <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 flex items-center gap-3">
          <FiCheck className="text-green-400" size={20} />
          <span className="text-green-400 font-medium">Paramètres enregistrés avec succès !</span>
        </div>
      )}

      {/* Settings Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-[#111] border border-white/10 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-6">Informations Générales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nom du projet *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#BFA76A]/50"
                placeholder="Nom du projet"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Manager *
              </label>
              <input
                type="text"
                name="manager"
                value={formData.manager}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#BFA76A]/50"
                placeholder="Nom du manager"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#BFA76A]/50 resize-none"
                placeholder="Description du projet"
              />
            </div>
          </div>
        </div>

        {/* Dates & Classification */}
        <div className="bg-[#111] border border-white/10 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-6">Dates & Classification</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Date de début *
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#BFA76A]/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Date de fin estimée
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#BFA76A]/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Statut
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#BFA76A]/50"
              >
                {Object.entries(PROJECT_STATUSES).map(([key, value]) => (
                  <option key={key} value={value}>
                    {value === 'en-cours' ? 'En cours' :
                     value === 'en-pause' ? 'En pause' :
                     value === 'termine' ? 'Terminé' :
                     value === 'annule' ? 'Annulé' :
                     'Planification'}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Priorité
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#BFA76A]/50"
              >
                {Object.entries(PROJECT_PRIORITIES).map(([key, value]) => (
                  <option key={key} value={value}>
                    {value === 'critique' ? 'Critique' :
                     value === 'haute' ? 'Haute' :
                     value === 'moyenne' ? 'Moyenne' :
                     'Basse'}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Catégorie
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#BFA76A]/50"
              >
                <option value="">Sélectionner une catégorie</option>
                {Object.entries(PROJECT_CATEGORIES).map(([key, value]) => (
                  <option key={key} value={value}>
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Progression (%)
              </label>
              <input
                type="number"
                name="progress"
                value={formData.progress}
                onChange={handleChange}
                min="0"
                max="100"
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#BFA76A]/50"
              />
            </div>
          </div>
        </div>

        {/* Budget */}
        <div className="bg-[#111] border border-white/10 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-6">Budget</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Budget total (€)
              </label>
              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#BFA76A]/50"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Budget utilisé (€)
              </label>
              <input
                type="number"
                name="budgetUsed"
                value={formData.budgetUsed}
                onChange={handleChange}
                min="0"
                max={formData.budget}
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#BFA76A]/50"
                placeholder="0"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setShowDeleteConfirm(true)}
            className="px-6 py-3 bg-red-500/20 border border-red-500/50 text-red-400 font-bold rounded-lg hover:bg-red-500/30 transition-colors flex items-center gap-2"
          >
            <FiTrash2 />
            <span>Supprimer le projet</span>
          </button>

          <button
            type="submit"
            className="px-8 py-3 bg-[#BFA76A] text-black font-bold rounded-lg hover:bg-[#D4AF37] transition-colors flex items-center gap-2"
          >
            <FiSave />
            <span>Enregistrer les modifications</span>
          </button>
        </div>
      </form>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#111] border border-red-500/50 rounded-lg p-8 max-w-md w-full">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                <FiAlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Confirmer la suppression</h3>
                <p className="text-gray-400 text-sm">Cette action est irréversible</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6">
              Êtes-vous sûr de vouloir supprimer le projet <strong className="text-white">{project.name}</strong> ?
              Toutes les données associées seront définitivement supprimées.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-colors"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardSettings;
