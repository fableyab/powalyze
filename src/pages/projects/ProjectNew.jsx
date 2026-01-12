import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { createProject } from '@/lib/projectServiceV2';
import { getPortfolios } from '@/lib/portfolioServiceV2';
import customSupabaseClient from '@/lib/customSupabaseClient';

export default function ProjectNew() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [portfolios, setPortfolios] = useState([]);
  const [users, setUsers] = useState([]);

  const [formData, setFormData] = useState({
    // Bloc 1 : Identité
    code: '',
    name: '',
    type: 'Transformation',
    department: '',
    portfolio_id: null,

    // Bloc 2 : Gouvernance
    sponsor_id: null,
    manager_id: null,
    committee_frequency: 'Mensuel',

    // Bloc 3 : Périmètre & Objectifs
    main_objective: '',
    secondary_objectives: [],

    // Bloc 4 : Planning
    start_date: '',
    end_date: '',
    milestones: [],

    // Bloc 5 : Budget
    budget_total: 0,
    budget_capex: 0,
    budget_opex: 0,

    // Bloc 6 : Risques & Dépendances
    risk_level: 'LOW',
    dependencies: []
  });

  useEffect(() => {
    loadOptions();
  }, []);

  async function loadOptions() {
    try {
      const orgId = user?.user_metadata?.organization_id || user?.organization_id;
      
      // Charger portfolios
      const portfoliosData = await getPortfolios(orgId);
      setPortfolios(portfoliosData);

      // Charger utilisateurs
      const { data: usersData } = await customSupabaseClient
        .from('profiles')
        .select('id, name, role')
        .eq('organization_id', orgId);
      setUsers(usersData || []);
    } catch (error) {
      console.error('Erreur chargement options:', error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orgId = user?.user_metadata?.organization_id || user?.organization_id;
      
      const projectData = {
        ...formData,
        organization_id: orgId,
        status: 'PLANNED',
        health_status: 'ON_TRACK',
        completion_percent: 0
      };

      const newProject = await createProject(projectData);
      navigate(`/projects/${newProject.id}`);
    } catch (error) {
      console.error('Erreur création projet:', error);
      alert('Erreur lors de la création du projet');
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const projectTypes = ['Transformation', 'IT', 'Stratégique', 'Réglementaire', 'Innovation', 'Maintenance'];
  const riskLevels = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
  const frequencies = ['Hebdomadaire', 'Bimensuel', 'Mensuel', 'Trimestriel'];

  return (
    <div className="min-h-screen bg-black text-slate-200 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/projects')}
            className="flex items-center gap-2 text-slate-400 hover:text-slate-200 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux projets
          </button>
          <h1 className="text-3xl font-extralight text-slate-100 mb-2">
            Créer un nouveau projet
          </h1>
          <p className="text-slate-400 text-sm">
            Formulaire complet avec gouvernance, budget et planning
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Bloc 1 : Identité */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
            <h2 className="text-xl font-light text-[#D4AF37] mb-4">1. Identité du projet</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">Code projet *</label>
                <input
                  type="text"
                  required
                  value={formData.code}
                  onChange={(e) => updateField('code', e.target.value.toUpperCase())}
                  placeholder="PROJ-2026-001"
                  className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded text-slate-200 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Nom du projet *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="Transformation digitale..."
                  className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded text-slate-200 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Type *</label>
                <select
                  value={formData.type}
                  onChange={(e) => updateField('type', e.target.value)}
                  className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded text-slate-200 focus:outline-none focus:border-[#D4AF37]"
                >
                  {projectTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Département / BU</label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => updateField('department', e.target.value)}
                  placeholder="IT, Finance, RH..."
                  className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded text-slate-200 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm text-slate-400 mb-2">Portfolio (optionnel)</label>
                <select
                  value={formData.portfolio_id || ''}
                  onChange={(e) => updateField('portfolio_id', e.target.value || null)}
                  className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded text-slate-200 focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="">Aucun portfolio</option>
                  {portfolios.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Bloc 2 : Gouvernance */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
            <h2 className="text-xl font-light text-[#D4AF37] mb-4">2. Gouvernance</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">Sponsor</label>
                <select
                  value={formData.sponsor_id || ''}
                  onChange={(e) => updateField('sponsor_id', e.target.value || null)}
                  className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded text-slate-200 focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="">Sélectionner...</option>
                  {users.filter(u => u.role === 'EXECUTIVE' || u.role === 'ADMIN').map(u => (
                    <option key={u.id} value={u.id}>{u.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Project Manager *</label>
                <select
                  required
                  value={formData.manager_id || ''}
                  onChange={(e) => updateField('manager_id', e.target.value)}
                  className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded text-slate-200 focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="">Sélectionner...</option>
                  {users.filter(u => u.role === 'PM' || u.role === 'ADMIN').map(u => (
                    <option key={u.id} value={u.id}>{u.name}</option>
                  ))}
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-sm text-slate-400 mb-2">Fréquence des comités</label>
                <select
                  value={formData.committee_frequency}
                  onChange={(e) => updateField('committee_frequency', e.target.value)}
                  className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded text-slate-200 focus:outline-none focus:border-[#D4AF37]"
                >
                  {frequencies.map(freq => (
                    <option key={freq} value={freq}>{freq}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Bloc 3 : Périmètre & Objectifs */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
            <h2 className="text-xl font-light text-[#D4AF37] mb-4">3. Périmètre & Objectifs</h2>
            <div>
              <label className="block text-sm text-slate-400 mb-2">Objectif principal *</label>
              <textarea
                required
                value={formData.main_objective}
                onChange={(e) => updateField('main_objective', e.target.value)}
                placeholder="Décrire l'objectif principal du projet..."
                rows={3}
                className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded text-slate-200 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          {/* Bloc 4 : Planning */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
            <h2 className="text-xl font-light text-[#D4AF37] mb-4">4. Planning</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">Date début *</label>
                <input
                  type="date"
                  required
                  value={formData.start_date}
                  onChange={(e) => updateField('start_date', e.target.value)}
                  className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded text-slate-200 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Date fin prévisionnelle *</label>
                <input
                  type="date"
                  required
                  value={formData.end_date}
                  onChange={(e) => updateField('end_date', e.target.value)}
                  className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded text-slate-200 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>
          </div>

          {/* Bloc 5 : Budget */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
            <h2 className="text-xl font-light text-[#D4AF37] mb-4">5. Budget</h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">Budget total (€) *</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.budget_total}
                  onChange={(e) => updateField('budget_total', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded text-slate-200 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Capex (€)</label>
                <input
                  type="number"
                  min="0"
                  value={formData.budget_capex}
                  onChange={(e) => updateField('budget_capex', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded text-slate-200 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Opex (€)</label>
                <input
                  type="number"
                  min="0"
                  value={formData.budget_opex}
                  onChange={(e) => updateField('budget_opex', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded text-slate-200 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>
          </div>

          {/* Bloc 6 : Risques */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
            <h2 className="text-xl font-light text-[#D4AF37] mb-4">6. Risques & Dépendances</h2>
            <div>
              <label className="block text-sm text-slate-400 mb-2">Niveau de risque initial</label>
              <select
                value={formData.risk_level}
                onChange={(e) => updateField('risk_level', e.target.value)}
                className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded text-slate-200 focus:outline-none focus:border-[#D4AF37]"
              >
                {riskLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate('/projects')}
              className="px-6 py-3 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] text-black font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Création...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Créer le projet
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
