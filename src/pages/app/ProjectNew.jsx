import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { initiativeService } from '@/lib/initiativeService';
import customSupabaseClient from '@/lib/customSupabaseClient';
import { CheckCircle2, AlertCircle, Sparkles, Calendar, DollarSign, User, Target, Loader2 } from 'lucide-react';

const ProjectNew = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    owner: '',
    budget: '',
    description: '',
    start_date: '',
    end_date: '',
    priority: 'medium',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      console.log('🚀 Début création projet pour user:', user.id);

      // 1. Créer le profil utilisateur s'il n'existe pas
      const { data: existingProfile, error: profileCheckError } = await customSupabaseClient
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .single();

      if (!existingProfile) {
        console.log('⚠️ Profil non trouvé, création automatique...');
        const { error: profileCreateError } = await customSupabaseClient
          .from('profiles')
          .insert([{
            id: user.id,
            email: user.email,
            created_at: new Date().toISOString(),
          }]);

        if (profileCreateError) {
          console.error('❌ Erreur création profil:', profileCreateError);
        } else {
          console.log('✅ Profil créé');
        }
      }

      // 2. Récupérer l'organisation de l'utilisateur
      const { data: userOrgs, error: orgError } = await customSupabaseClient
        .from('user_organizations')
        .select('organization_id')
        .eq('user_id', user.id);

      if (orgError) {
        console.error('❌ Erreur organisation:', orgError);
        throw new Error('Impossible de récupérer votre organisation');
      }

      let organizationId;

      if (!userOrgs || userOrgs.length === 0) {
        console.log('⚠️ Aucune organisation trouvée, création automatique...');
        
        // Créer automatiquement une organisation pour l'utilisateur
        const { data: newOrg, error: createOrgError } = await customSupabaseClient
          .from('organizations')
          .insert([{
            name: `Organisation de ${user.email}`,
            owner_id: user.id,
            created_at: new Date().toISOString(),
          }])
          .select()
          .single();

        if (createOrgError) {
          console.error('❌ Erreur création organisation:', createOrgError);
          throw new Error(`Impossible de créer votre organisation: ${createOrgError.message || createOrgError.code || 'Erreur inconnue'}`);
        }

        if (!newOrg) {
          console.error('❌ Aucune organisation retournée après insertion');
          throw new Error('Erreur: organisation créée mais non retournée par la base de données');
        }

        organizationId = newOrg.id;
        console.log('✅ Organisation créée:', organizationId);

        // Lier l'utilisateur à la nouvelle organisation
        const { error: linkError } = await customSupabaseClient
          .from('user_organizations')
          .insert([{
            user_id: user.id,
            organization_id: organizationId,
            role: 'admin',
            created_at: new Date().toISOString(),
          }]);

        if (linkError) {
          console.error('❌ Erreur liaison user-org:', linkError);
          throw new Error('Impossible de lier votre compte à l\'organisation');
        }

        console.log('✅ Utilisateur lié à l\'organisation');
        
        // ⚠️ IMPORTANT: Attendre que la liaison soit effective dans la base
        await new Promise(resolve => setTimeout(resolve, 500));
      } else {
        organizationId = userOrgs[0].organization_id;
        console.log('✅ Organisation trouvée:', organizationId);
      }

      // Vérifier que la liaison user-org existe bien
      const { data: checkLink } = await customSupabaseClient
        .from('user_organizations')
        .select('*')
        .eq('user_id', user.id)
        .eq('organization_id', organizationId)
        .single();

      if (!checkLink) {
        throw new Error('Liaison utilisateur-organisation non trouvée. Veuillez rafraîchir la page et réessayer.');
      }

      console.log('✅ Liaison confirmée:', checkLink);

      // Créer l'initiative avec organization_id
      const newInitiative = await initiativeService.createInitiative({
        organization_id: organizationId,
        name: formData.name,
        description: formData.description || `Budget: ${formData.budget} | Responsable: ${formData.owner}`,
        status: 'planned',
        progress: 0,
        owner_id: user.id,
        start_date: formData.start_date || null,
        end_date: formData.end_date || null,
        priority: formData.priority,
        budget: formData.budget ? parseFloat(formData.budget) : null,
      });

      console.log('✅ Projet créé avec succès:', newInitiative);
      setSuccess(true);

      // Redirection après 1.5s
      setTimeout(() => {
        navigate('/app/portfolio');
      }, 1500);

    } catch (error) {
      console.error('❌ Erreur création projet:', error);
      setError(error.message || 'Impossible de créer le projet. Vérifiez votre connexion et réessayez.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full bg-gradient-to-br from-[#050A12] via-[#0A1628] to-[#050A12] text-white overflow-y-auto">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header avec gradient */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#4A9EFF] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl font-extralight">Nouveau projet</h1>
          </div>
          <p className="text-white/60 font-light">
            Créez un nouveau projet stratégique dans votre portefeuille d'initiatives.
          </p>
        </div>

        {/* Message de succès */}
        {success && (
          <div className="mb-6 rounded-xl border border-green-500/30 bg-green-500/10 p-4 backdrop-blur-xl animate-in fade-in duration-300">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              <div>
                <div className="font-medium text-green-400">Projet créé avec succès !</div>
                <div className="text-sm text-green-400/70">Redirection vers la liste des projets...</div>
              </div>
            </div>
          </div>
        )}

        {/* Message d'erreur */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 backdrop-blur-xl animate-in fade-in duration-300">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <div>
                <div className="font-medium text-red-400">Erreur lors de la création</div>
                <div className="text-sm text-red-400/70">{error}</div>
              </div>
            </div>
          </div>
        )}

        {/* Formulaire amélioré */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Card principale */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl space-y-6">
            
            {/* Nom du projet */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2 text-white/90">
                <Target className="w-4 h-4 text-[#D4AF37]" />
                Nom du projet *
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-3 text-white placeholder:text-white/40 focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 transition-all"
                placeholder="Ex : Transformation Digitale 2026"
                required
              />
            </div>

            {/* Grid 2 colonnes */}
            <div className="grid gap-6 md:grid-cols-2">
              
              {/* Responsable */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2 text-white/90">
                  <User className="w-4 h-4 text-blue-400" />
                  Responsable
                </label>
                <input
                  name="owner"
                  value={formData.owner}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-3 text-white placeholder:text-white/40 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all"
                  placeholder="Nom du chef de projet"
                />
              </div>

              {/* Budget */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2 text-white/90">
                  <DollarSign className="w-4 h-4 text-green-400" />
                  Budget estimé
                </label>
                <input
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-3 text-white placeholder:text-white/40 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/20 transition-all"
                  placeholder="Ex : 500 000 €"
                />
              </div>

              {/* Date de début */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2 text-white/90">
                  <Calendar className="w-4 h-4 text-purple-400" />
                  Date de début
                </label>
                <input
                  type="date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-3 text-white focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20 transition-all"
                />
              </div>

              {/* Date de fin */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2 text-white/90">
                  <Calendar className="w-4 h-4 text-orange-400" />
                  Date de fin prévue
                </label>
                <input
                  type="date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-3 text-white focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 transition-all"
                />
              </div>

            </div>

            {/* Priorité */}
            <div>
              <label className="block text-sm font-medium mb-2 text-white/90">
                Priorité stratégique
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['low', 'medium', 'high'].map((priority) => (
                  <button
                    key={priority}
                    type="button"
                    onClick={() => setFormData({ ...formData, priority })}
                    className={`rounded-lg border px-4 py-3 text-sm font-medium transition-all ${
                      formData.priority === priority
                        ? priority === 'high'
                          ? 'border-red-500 bg-red-500/20 text-red-400'
                          : priority === 'medium'
                          ? 'border-orange-500 bg-orange-500/20 text-orange-400'
                          : 'border-green-500 bg-green-500/20 text-green-400'
                        : 'border-white/20 bg-white/5 text-white/60 hover:bg-white/10'
                    }`}
                  >
                    {priority === 'high' ? '🔴 Haute' : priority === 'medium' ? '🟠 Moyenne' : '🟢 Basse'}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-2 text-white/90">
                Objectif & Résultat attendu
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-3 text-white placeholder:text-white/40 focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 transition-all min-h-[120px] resize-none"
                placeholder="Décrivez l'objectif stratégique, les bénéfices attendus et les résultats clés à atteindre..."
              />
            </div>

          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Link
              to="/app/projects"
              className="rounded-lg border border-white/20 px-6 py-3 text-sm font-medium text-white/70 hover:bg-white/10 transition-all"
            >
              Annuler
            </Link>
            <button
              type="submit"
              disabled={loading || success}
              className="rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] px-8 py-3 text-sm font-semibold text-white hover:shadow-lg hover:shadow-[#D4AF37]/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Enregistrement...
                </>
              ) : success ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Créé !
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Créer le projet
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectNew;
