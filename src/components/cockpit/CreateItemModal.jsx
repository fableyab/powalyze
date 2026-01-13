import { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

/**
 * 🎯 Modal Création d'Item Cockpit
 * Formulaire complet pour créer une initiative/projet/risque/décision
 */
export default function CreateItemModal({ 
  isOpen, 
  onClose, 
  onCreate, 
  itemType = 'initiative',
  defaultValues = {} 
}) {
  const { t } = useTranslation('common');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'planned',
    priority: 'medium',
    progress: 0,
    start_date: '',
    end_date: '',
    budget: '',
    owner_id: '',
    sponsor_id: '',
    tags: [],
    ...defaultValues
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    
    if (!formData.title || formData.title.trim().length < 3) {
      newErrors.title = 'Le titre doit contenir au moins 3 caractères';
    }

    if (formData.start_date && formData.end_date) {
      if (new Date(formData.start_date) > new Date(formData.end_date)) {
        newErrors.end_date = 'La date de fin doit être postérieure à la date de début';
      }
    }

    if (formData.budget && isNaN(parseFloat(formData.budget))) {
      newErrors.budget = 'Le budget doit être un nombre valide';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setLoading(true);
    
    try {
      // Nettoyer les données
      const cleanData = {
        ...formData,
        title: formData.title.trim(),
        description: formData.description?.trim() || null,
        budget: formData.budget ? parseFloat(formData.budget) : null,
        progress: parseInt(formData.progress) || 0,
        type: itemType
      };

      await onCreate(cleanData);
      
      // Reset + fermeture
      setFormData({
        title: '',
        description: '',
        status: 'planned',
        priority: 'medium',
        progress: 0,
        start_date: '',
        end_date: '',
        budget: '',
        owner_id: '',
        sponsor_id: '',
        tags: []
      });
      setErrors({});
      onClose();
    } catch (err) {
      console.error('Erreur création item:', err);
      setErrors({ submit: err.message || 'Erreur lors de la création' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error pour ce champ
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const getTypeLabel = () => {
    const labels = {
      initiative: 'Initiative',
      project: 'Projet',
      risk: 'Risque',
      decision: 'Décision',
      signal: 'Signal'
    };
    return labels[itemType] || 'Item';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-slate-900 rounded-2xl shadow-2xl border border-white/10 w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-white/10">
          <div>
            <h2 className="text-2xl font-light text-white">
              Créer {getTypeLabel()}
            </h2>
            <p className="text-sm text-white/60 mt-1">
              Remplissez les informations essentielles pour démarrer
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-white/70" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8">
          <div className="space-y-6">
            {/* Titre */}
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Titre <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder={`Ex: Migration Cloud Azure, Refonte ERP...`}
                className={`w-full px-4 py-3 bg-black/40 border ${errors.title ? 'border-red-500' : 'border-white/10'} rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-[#D4AF37] transition-colors`}
                autoFocus
              />
              {errors.title && (
                <p className="text-red-400 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Décrivez le contexte, les objectifs et les enjeux stratégiques..."
                rows={4}
                className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
              />
            </div>

            {/* Row: Statut + Priorité */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Statut
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                >
                  <option value="backlog">Backlog</option>
                  <option value="planned">Planifié</option>
                  <option value="in_progress">En cours</option>
                  <option value="blocked">Bloqué</option>
                  <option value="done">Terminé</option>
                  <option value="cancelled">Annulé</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Priorité
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => handleChange('priority', e.target.value)}
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                >
                  <option value="low">Basse</option>
                  <option value="medium">Moyenne</option>
                  <option value="high">Haute</option>
                  <option value="critical">Critique</option>
                </select>
              </div>
            </div>

            {/* Row: Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Date de début
                </label>
                <input
                  type="date"
                  value={formData.start_date}
                  onChange={(e) => handleChange('start_date', e.target.value)}
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Date de fin
                </label>
                <input
                  type="date"
                  value={formData.end_date}
                  onChange={(e) => handleChange('end_date', e.target.value)}
                  className={`w-full px-4 py-3 bg-black/40 border ${errors.end_date ? 'border-red-500' : 'border-white/10'} rounded-lg text-white focus:outline-none focus:border-[#D4AF37] transition-colors`}
                />
                {errors.end_date && (
                  <p className="text-red-400 text-sm mt-1">{errors.end_date}</p>
                )}
              </div>
            </div>

            {/* Budget */}
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Budget (CHF/EUR)
              </label>
              <input
                type="number"
                value={formData.budget}
                onChange={(e) => handleChange('budget', e.target.value)}
                placeholder="Ex: 250000"
                className={`w-full px-4 py-3 bg-black/40 border ${errors.budget ? 'border-red-500' : 'border-white/10'} rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-[#D4AF37] transition-colors`}
              />
              {errors.budget && (
                <p className="text-red-400 text-sm mt-1">{errors.budget}</p>
              )}
            </div>

            {/* Avancement */}
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Avancement ({formData.progress}%)
              </label>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={formData.progress}
                onChange={(e) => handleChange('progress', e.target.value)}
                className="w-full accent-[#D4AF37]"
              />
              <div className="flex justify-between text-xs text-white/50 mt-1">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
          </div>

          {/* Erreur globale */}
          {errors.submit && (
            <div className="mt-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
              {errors.submit}
            </div>
          )}
        </form>

        {/* Footer actions */}
        <div className="flex items-center justify-end gap-3 px-8 py-6 border-t border-white/10 bg-black/20">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors border border-white/10"
            disabled={loading}
          >
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] text-black font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Création...
              </>
            ) : (
              <>Créer {getTypeLabel()}</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
