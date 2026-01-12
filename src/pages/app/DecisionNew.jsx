import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import decisionService from '@/lib/decisionService';
import customSupabaseClient from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';

const DecisionNew = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    meeting: '',
    owner: '',
    dueDate: '',
    description: '',
    impactLevel: 'medium',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Récupérer l'organization_id de l'utilisateur
      const { data: userOrg } = await customSupabaseClient
        .from('user_organizations')
        .select('organization_id')
        .eq('user_id', user.id)
        .single();

      if (!userOrg) throw new Error('Organisation non trouvée');

      await decisionService.createDecision(userOrg.organization_id, {
        title: formData.title,
        description: `${formData.description}\nSéance: ${formData.meeting}\nResponsable: ${formData.owner}`,
        impact_level: formData.impactLevel,
        due_date: formData.dueDate || null,
        status: 'pending',
      });

      toast({
        title: 'Décision créée',
        description: `La décision "${formData.title}" a été enregistrée avec succès.`,
      });

      navigate('/app/cockpit');
    } catch (error) {
      console.error('Erreur création décision:', error);
      toast({
        title: 'Erreur',
        description: error.message || 'Impossible de créer la décision',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full bg-[#050A12] text-white overflow-y-auto">
      <div className="max-w-3xl mx-auto px-6 py-6">
        <h1 className="text-xl font-semibold mb-1">Nouvelle décision</h1>
        <p className="text-sm text-white/60 mb-4">
          Enregistrez une décision prise dans vos rituels de gouvernance.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs mb-1 text-white/70">Titre de la décision</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-lg bg-white/5 border border-white/15 px-3 py-2 text-sm"
              placeholder="Ex : Valider budget additionnel pour Projet Alpha"
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs mb-1 text-white/70">Prise en séance</label>
              <input
                name="meeting"
                value={formData.meeting}
                onChange={handleChange}
                className="w-full rounded-lg bg-white/5 border border-white/15 px-3 py-2 text-sm"
                placeholder="Ex : Comité Portefeuille du 24/10"
              />
            </div>
            <div>
              <label className="block text-xs mb-1 text-white/70">Responsable</label>
              <input
                name="owner"
                value={formData.owner}
                onChange={handleChange}
                className="w-full rounded-lg bg-white/5 border border-white/15 px-3 py-2 text-sm"
                placeholder="Ex : Directeur des opérations"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs mb-1 text-white/70">Délai / Échéance</label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full rounded-lg bg-white/5 border border-white/15 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs mb-1 text-white/70">Niveau d'impact</label>
              <select
                name="impactLevel"
                value={formData.impactLevel}
                onChange={handleChange}
                className="w-full rounded-lg bg-white/5 border border-white/15 px-3 py-2 text-sm"
              >
                <option value="low">Faible</option>
                <option value="medium">Moyen</option>
                <option value="high">Élevé</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs mb-1 text-white/70">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-lg bg-white/5 border border-white/15 px-3 py-2 text-sm min-h-[100px]"
              placeholder="Précisez le contexte, la décision et les suites attendues."
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
              {loading ? 'Enregistrement...' : 'Enregistrer la décision'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DecisionNew;
