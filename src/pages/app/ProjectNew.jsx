import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { initiativeService } from '@/lib/initiativeService';
import customSupabaseClient from '@/lib/customSupabaseClient';
import { 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Calendar, 
  DollarSign, 
  User, 
  Target, 
  Loader2,
  Building2,
  Users,
  TrendingUp,
  FileText
} from 'lucide-react';

/**
 * COMPOSANTS RÉUTILISABLES
 */

// Section Container
const FormSection = ({ title, subtitle, icon: Icon, children, className = '' }) => (
  <div className={`rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden ${className}`}>
    <div className="border-b border-white/10 bg-white/5 px-6 py-4">
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#4A9EFF] flex items-center justify-center flex-shrink-0">
            <Icon className="w-5 h-5 text-white" />
          </div>
        )}
        <div>
          <h2 className="text-lg font-medium text-white">{title}</h2>
          {subtitle && <p className="text-sm text-white/60 mt-0.5">{subtitle}</p>}
        </div>
      </div>
    </div>
    <div className="p-6 space-y-4">
      {children}
    </div>
  </div>
);

// Input Field
const InputField = ({ 
  label, 
  name, 
  value, 
  onChange, 
  type = 'text', 
  placeholder, 
  required = false,
  icon: Icon,
  iconColor = 'text-[#D4AF37]',
  error,
  disabled = false
}) => (
  <div className="space-y-2">
    <label className="flex items-center gap-2 text-sm font-medium text-white/90">
      {Icon && <Icon className={`w-4 h-4 ${iconColor}`} />}
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      className={`w-full rounded-lg bg-white/10 border ${
        error ? 'border-red-500' : 'border-white/20'
      } px-4 py-3 text-white placeholder:text-white/40 focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
    />
    {error && <p className="text-sm text-red-400">{error}</p>}
  </div>
);

// Select Field
const SelectField = ({ 
  label, 
  name, 
  value, 
  onChange, 
  options, 
  required = false,
  icon: Icon,
  iconColor = 'text-[#D4AF37]',
  placeholder = 'Sélectionner...'
}) => (
  <div className="space-y-2">
    <label className="flex items-center gap-2 text-sm font-medium text-white/90">
      {Icon && <Icon className={`w-4 h-4 ${iconColor}`} />}
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-3 text-white focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 transition-all"
    >
      <option value="" className="bg-[#0A1628]">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value} className="bg-[#0A1628]">
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

// Textarea Field
const TextareaField = ({ 
  label, 
  name, 
  value, 
  onChange, 
  placeholder, 
  required = false,
  rows = 4,
  icon: Icon
}) => (
  <div className="space-y-2">
    <label className="flex items-center gap-2 text-sm font-medium text-white/90">
      {Icon && <Icon className="w-4 h-4 text-[#D4AF37]" />}
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      rows={rows}
      className="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-3 text-white placeholder:text-white/40 focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 transition-all resize-none"
    />
  </div>
);

// Priority Selector
const PrioritySelector = ({ value, onChange }) => {
  const priorities = [
    { value: 'low', label: 'Basse', color: 'green', emoji: '🟢' },
    { value: 'medium', label: 'Moyenne', color: 'orange', emoji: '🟠' },
    { value: 'high', label: 'Haute', color: 'red', emoji: '🔴' }
  ];

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-white/90">
        Priorité stratégique <span className="text-red-400">*</span>
      </label>
      <div className="grid grid-cols-3 gap-3">
        {priorities.map((priority) => (
          <button
            key={priority.value}
            type="button"
            onClick={() => onChange(priority.value)}
            className={`rounded-lg border px-4 py-3 text-sm font-medium transition-all ${
              value === priority.value
                ? `border-${priority.color}-500 bg-${priority.color}-500/20 text-${priority.color}-400`
                : 'border-white/20 bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            {priority.emoji} {priority.label}
          </button>
        ))}
      </div>
    </div>
  );
};

/**
 * COMPOSANT PRINCIPAL
 */
const ProjectNew = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  // État du formulaire structuré par sections
  const [formData, setFormData] = useState({
    // Identité du projet
    name: '',
    code: '',
    type: '',
    department: '',
    
    // Gouvernance
    sponsor: '',
    project_manager: '',
    
    // Objectifs
    main_objective: '',
    secondary_objectives: '',
    
    // Planning
    start_date: '',
    end_date: '',
    
    // Budget
    budget: '',
    
    // Portfolio (module optionnel)
    portfolio_id: '',
    
    // Priorité
    priority: 'medium'
  });


  // Handler pour les changements de formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Nettoyer les erreurs de validation au changement
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Validation côté client
  const validateForm = () => {
    const errors = {};
    
    // Identité
    if (!formData.name.trim()) {
      errors.name = 'Le nom du projet est obligatoire';
    }
    
    // Planning
    if (formData.start_date && formData.end_date) {
      if (new Date(formData.end_date) < new Date(formData.start_date)) {
        errors.end_date = 'La date de fin doit être après la date de début';
      }
    }
    
    // Budget
    if (formData.budget && isNaN(parseFloat(formData.budget))) {
      errors.budget = 'Le budget doit être un nombre valide';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!validateForm()) {
      setError('Veuillez corriger les erreurs dans le formulaire');
      return;
    }
    
    setLoading(true);
    setError(null);

    try {
      console.log('🚀 Création projet pour:', user.id);

      // 1. Vérifier/Créer le profil utilisateur
      const { data: existingProfile } = await customSupabaseClient
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .single();

      if (!existingProfile) {
        console.log('⚠️ Création profil automatique');
        await customSupabaseClient
          .from('profiles')
          .insert([{
            id: user.id,
            email: user.email,
            created_at: new Date().toISOString(),
          }]);
      }

      // 2. Récupérer ou créer l'organisation
      const { data: userOrgs } = await customSupabaseClient
        .from('user_organizations')
        .select('organization_id')
        .eq('user_id', user.id);

      let organizationId;

      if (!userOrgs || userOrgs.length === 0) {
        console.log('⚠️ Création organisation automatique');
        
        const { data: newOrg, error: createOrgError } = await customSupabaseClient
          .from('organizations')
          .insert([{
            name: `Organisation de ${user.email}`,
            created_at: new Date().toISOString(),
          }])
          .select()
          .single();

        if (createOrgError) {
          throw new Error(`Impossible de créer l'organisation: ${createOrgError.message}`);
        }

        organizationId = newOrg.id;

        // Lier l'utilisateur à l'organisation en tant qu'admin
        await customSupabaseClient
          .from('user_organizations')
          .insert([{
            user_id: user.id,
            organization_id: organizationId,
            role: 'admin',
            created_at: new Date().toISOString(),
          }]);

        // Attendre la propagation
        await new Promise(resolve => setTimeout(resolve, 500));
      } else {
        organizationId = userOrgs[0].organization_id;
      }

      // 3. Préparer les données du projet
      const projectData = {
        organization_id: organizationId,
        name: formData.name,
        code: formData.code || null,
        type: formData.type || null,
        department: formData.department || null,
        status: 'planned',
        progress: 0,
        priority: formData.priority,
        owner_id: user.id,
        start_date: formData.start_date || null,
        end_date: formData.end_date || null,
        budget: formData.budget ? parseFloat(formData.budget) : null,
        
        // Construire la description à partir des objectifs
        description: [
          formData.main_objective && `Objectif principal: ${formData.main_objective}`,
          formData.secondary_objectives && `Objectifs secondaires: ${formData.secondary_objectives}`,
          formData.sponsor && `Sponsor: ${formData.sponsor}`,
          formData.project_manager && `Chef de projet: ${formData.project_manager}`,
        ].filter(Boolean).join(' | ') || 'Nouveau projet stratégique'
      };

      // 4. Créer le projet via le service
      const newInitiative = await initiativeService.createInitiative(projectData);

      console.log('✅ Projet créé:', newInitiative);
      setSuccess(true);

      // Redirection après succès
      setTimeout(() => {
        navigate('/app/portfolio');
      }, 1500);

    } catch (error) {
      console.error('❌ Erreur création projet:', error);
      setError(error.message || 'Impossible de créer le projet. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };


  // Types de projets (exemple - à adapter selon vos besoins)
  const projectTypes = [
    { value: 'transformation', label: 'Transformation Digitale' },
    { value: 'infrastructure', label: 'Infrastructure IT' },
    { value: 'product', label: 'Développement Produit' },
    { value: 'process', label: 'Amélioration Processus' },
    { value: 'strategic', label: 'Initiative Stratégique' },
    { value: 'other', label: 'Autre' }
  ];

  // Départements (exemple - à adapter selon vos besoins)
  const departments = [
    { value: 'it', label: 'IT / DSI' },
    { value: 'finance', label: 'Finance' },
    { value: 'hr', label: 'Ressources Humaines' },
    { value: 'operations', label: 'Opérations' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'sales', label: 'Commercial' },
    { value: 'other', label: 'Autre' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050A12] via-[#0A1628] to-[#050A12] text-white">
      <div className="max-w-6xl mx-auto px-6 py-8">
        
        {/* Header Premium */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#4A9EFF] flex items-center justify-center shadow-lg shadow-[#D4AF37]/20">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-extralight text-white">Nouveau Projet Stratégique</h1>
                <p className="text-white/60 font-light mt-1">
                  Créez et structurez une nouvelle initiative dans votre portefeuille
                </p>
              </div>
            </div>
            <Link
              to="/app/projects"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              ← Retour
            </Link>
          </div>

          {/* Barre de progression visuelle */}
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-0 bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] transition-all duration-500" />
          </div>
        </div>

        {/* Messages d'état */}
        {success && (
          <div className="mb-6 rounded-xl border border-green-500/30 bg-green-500/10 p-4 backdrop-blur-xl animate-in fade-in duration-300">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
              <div>
                <div className="font-medium text-green-400">Projet créé avec succès !</div>
                <div className="text-sm text-green-400/70 mt-1">
                  Redirection vers votre portefeuille...
                </div>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 backdrop-blur-xl animate-in fade-in duration-300">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-red-400">Erreur lors de la création</div>
                <div className="text-sm text-red-400/70 mt-1">{error}</div>
              </div>
            </div>
          </div>
        )}

        {/* Formulaire structuré en sections */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* SECTION 1: IDENTITÉ DU PROJET */}
          <FormSection
            title="Identité du Projet"
            subtitle="Informations de base et classification"
            icon={FileText}
          >
            <div className="space-y-4">
              <InputField
                label="Nom du projet"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ex: Transformation Digitale 2026"
                required
                icon={Target}
                error={validationErrors.name}
              />

              <div className="grid gap-4 md:grid-cols-2">
                <InputField
                  label="Code projet"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  placeholder="Ex: PROJ-2026-001"
                  icon={FileText}
                  iconColor="text-blue-400"
                />

                <SelectField
                  label="Type de projet"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  options={projectTypes}
                  icon={TrendingUp}
                  iconColor="text-purple-400"
                />
              </div>

              <SelectField
                label="Département porteur"
                name="department"
                value={formData.department}
                onChange={handleChange}
                options={departments}
                icon={Building2}
                iconColor="text-orange-400"
              />
            </div>
          </FormSection>

          {/* SECTION 2: GOUVERNANCE */}
          <FormSection
            title="Gouvernance"
            subtitle="Responsables et parties prenantes clés"
            icon={Users}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <InputField
                label="Sponsor Exécutif"
                name="sponsor"
                value={formData.sponsor}
                onChange={handleChange}
                placeholder="Nom du sponsor"
                icon={User}
                iconColor="text-[#D4AF37]"
              />

              <InputField
                label="Chef de Projet"
                name="project_manager"
                value={formData.project_manager}
                onChange={handleChange}
                placeholder="Nom du chef de projet"
                icon={User}
                iconColor="text-blue-400"
              />
            </div>
          </FormSection>

          {/* SECTION 3: OBJECTIFS */}
          <FormSection
            title="Objectifs & Résultats Attendus"
            subtitle="Définissez la valeur et les bénéfices stratégiques"
            icon={Target}
          >
            <div className="space-y-4">
              <TextareaField
                label="Objectif Principal"
                name="main_objective"
                value={formData.main_objective}
                onChange={handleChange}
                placeholder="Décrivez l'objectif stratégique principal de ce projet..."
                rows={3}
              />

              <TextareaField
                label="Objectifs Secondaires"
                name="secondary_objectives"
                value={formData.secondary_objectives}
                onChange={handleChange}
                placeholder="Listez les objectifs secondaires et résultats clés attendus..."
                rows={3}
              />
            </div>
          </FormSection>

          {/* SECTION 4: PLANNING */}
          <FormSection
            title="Planning"
            subtitle="Dates prévisionnelles de réalisation"
            icon={Calendar}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <InputField
                label="Date de début"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                type="date"
                icon={Calendar}
                iconColor="text-green-400"
              />

              <InputField
                label="Date de fin prévue"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                type="date"
                icon={Calendar}
                iconColor="text-red-400"
                error={validationErrors.end_date}
              />
            </div>
          </FormSection>

          {/* SECTION 5: BUDGET */}
          <FormSection
            title="Budget"
            subtitle="Enveloppe financière allouée"
            icon={DollarSign}
          >
            <InputField
              label="Budget Total (€)"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              type="number"
              placeholder="Ex: 500000"
              icon={DollarSign}
              iconColor="text-green-400"
              error={validationErrors.budget}
            />
          </FormSection>

          {/* SECTION 6: PRIORITÉ */}
          <FormSection
            title="Priorité Stratégique"
            subtitle="Niveau d'importance dans le portefeuille"
            icon={TrendingUp}
          >
            <PrioritySelector
              value={formData.priority}
              onChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}
            />
          </FormSection>

          {/* Actions du formulaire */}
          <div className="flex items-center justify-between pt-6 border-t border-white/10">
            <Link
              to="/app/projects"
              className="rounded-lg border border-white/20 px-6 py-3 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              Annuler
            </Link>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setFormData({
                  name: '',
                  code: '',
                  type: '',
                  department: '',
                  sponsor: '',
                  project_manager: '',
                  main_objective: '',
                  secondary_objectives: '',
                  start_date: '',
                  end_date: '',
                  budget: '',
                  portfolio_id: '',
                  priority: 'medium'
                })}
                className="rounded-lg border border-white/20 px-6 py-3 text-sm font-medium text-white/70 hover:bg-white/10 transition-all"
              >
                Réinitialiser
              </button>

              <button
                type="submit"
                disabled={loading || success}
                className="rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] px-8 py-3 text-sm font-semibold text-white hover:shadow-lg hover:shadow-[#D4AF37]/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Création en cours...
                  </>
                ) : success ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Projet créé !
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Créer le Projet
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Note informative */}
        <div className="mt-8 rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
          <p className="text-sm text-white/60">
            <span className="text-[#D4AF37] font-medium">💡 Note:</span> Ce projet sera ajouté à votre portefeuille stratégique. 
            Les modules avancés (alertes, prédictions, KPIs) seront activés selon votre offre.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectNew;
