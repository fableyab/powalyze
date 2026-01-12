import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import riskService from '@/lib/riskService';
import initiativeService from '@/lib/initiativeService';
import customSupabaseClient from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';

const RiskNew = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [initiatives, setInitiatives] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    probability: '0.5',
    impact: '0.5',
    actionPlan: '',
    initiativeId: '',
  });

  useEffect(() => {
    // Charger les initiatives disponibles
    const loadInitiatives = async () => {
      try {
        const { data: userOrg } = await customSupabaseClient
          .from('user_organizations')
          .select('organization_id')
          .eq('user_id', user.id)
          .single();

        if (userOrg) {
          const data = await initiativeService.getInitiatives(userOrg.organization_id);
          setInitiatives(data || []);
        }
      } catch (error) {
        console.error('Erreur chargement initiatives:', error);
      }
    };

    if (user) loadInitiatives();
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      // Récupérer l'organization_id
      const { data: userOrgs } = await customSupabaseClient
        .from('user_organizations')
        .select('organization_id')
        .eq('user_id', user.id);

      if (!userOrgs || userOrgs.length === 0) {
        throw new Error('Aucune organisation trouvée');
      }

      const organizationId = userOrgs[0].organization_id;

      // Créer le risque directement dans Supabase
      const { data, error } = await customSupabaseClient
        .from('risks')
        .insert([{
          organization_id: organizationId,
          title: formData.title,
          description: formData.actionPlan,
          probability: parseFloat(formData.probability),
          impact: parseFloat(formData.impact),
          status: 'open',
        }])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: 'Risque créé',
        description: `Le risque "${formData.title}" a été enregistré avec succès.`,
      });

      navigate('/app/risks');
    } catch (error) {
      console.error('Erreur création risque:', error);
      toast({
        title: 'Erreur',
        description: error.message || 'Impossible de créer le risque',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full bg-[#050A12] text-white overflow-y-auto">
      <div className="max-w-3xl mx-auto px-6 py-6">
        <h1 className="text-xl font-semibold mb-1">Nouveau risque</h1>
        <p className="text-sm text-white/60 mb-4">
          Ajoutez un risque au registre de gouvernance.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs mb-1 text-white/70">Projet concerné</label>
            <select 
              name="initiativeId"
              value={formData.initiativeId}
              onChange={handleChange}
              className="w-full rounded-lg bg-white/5 border border-white/15 px-3 py-2 text-sm"
              required
            >
              <option value="">Sélectionner un projet</option>
              {initiatives.map((init) => (
                <option key={init.id} value={init.id}>{init.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs mb-1 text-white/70">Titre du risque</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-lg bg-white/5 border border-white/15 px-3 py-2 text-sm"
              placeholder="Ex : Retard critique sur migration Cloud"
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs mb-1 text-white/70">Probabilité</label>
              <select 
                name="probability"
                value={formData.probability}
                onChange={handleChange}
                className="w-full rounded-lg bg-white/5 border border-white/15 px-3 py-2 text-sm"
              >
                <option value="0.25">Faible (25%)</option>
                <option value="0.5">Moyenne (50%)</option>
                <option value="0.75">Élevée (75%)</option>
                <option value="1.0">Très élevée (100%)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs mb-1 text-white/70">Impact</label>
              <select 
                name="impact"
                value={formData.impact}
                onChange={handleChange}
                className="w-full rounded-lg bg-white/5 border border-white/15 px-3 py-2 text-sm"
              >
                <option value="0.25">Faible</option>
                <option value="0.5">Moyen</option>
                <option value="0.75">Élevé</option>
                <option value="1.0">Critique</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs mb-1 text-white/70">Plan d&apos;action</label>
            <textarea
              name="actionPlan"
              value={formData.actionPlan}
              onChange={handleChange}
              className="w-full rounded-lg bg-white/5 border border-white/15 px-3 py-2 text-sm min-h-[100px]"
              placeholder="Décrivez les actions envisagées pour réduire ce risque."
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Link
              to="/app/cockpit"
              className="rounded-lg border border-white/20 px-4 py-2 text-sm text-white/70 hover:bg-white/10"
            >
              Annuler
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-[#D4AF37] px-5 py-2 text-sm font-medium text-black hover:bg-[#f2c34d] disabled:opacity-50"
            >
              {loading ? 'Enregistrement...' : 'Enregistrer le risque'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RiskNew;
