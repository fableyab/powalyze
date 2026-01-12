/**
 * Page d'administration des environnements Demo/Prod
 */
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import environmentService from '@/lib/environmentService';
import { useToast } from '@/components/ui/use-toast';
import { Eye, Briefcase, Plus, Users, FileText, Target, CheckCircle2 } from 'lucide-react';

export default function EnvironmentAdmin() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creatingOrg, setCreatingOrg] = useState(false);
  const [newOrgName, setNewOrgName] = useState('');
  const [newOrgType, setNewOrgType] = useState('prod');
  const [stats, setStats] = useState({});

  useEffect(() => {
    loadOrganizations();
  }, []);

  async function loadOrganizations() {
    try {
      setLoading(true);
      const { organizations: orgs } = await environmentService.getUserOrganizations(user.id);
      setOrganizations(orgs || []);

      // Charger les stats pour chaque organisation
      const statsPromises = (orgs || []).map(org => 
        environmentService.getOrganizationStats(org.id)
      );
      const statsResults = await Promise.all(statsPromises);
      
      const statsMap = {};
      statsResults.forEach((result, index) => {
        if (result.stats) {
          statsMap[orgs[index].id] = result.stats;
        }
      });
      setStats(statsMap);
    } catch (error) {
      console.error('Error loading organizations:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les organisations",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }

  async function createOrganization(e) {
    e.preventDefault();
    if (!newOrgName.trim()) return;

    try {
      setCreatingOrg(true);
      const { organization, error } = await environmentService.createOrganization(
        newOrgName,
        newOrgType,
        user.id
      );

      if (error) throw error;

      toast({
        title: "Organisation créée",
        description: `L'organisation "${newOrgName}" a été créée avec succès`
      });

      setNewOrgName('');
      setNewOrgType('prod');
      loadOrganizations();
    } catch (error) {
      console.error('Error creating organization:', error);
      toast({
        title: "Erreur",
        description: "Impossible de créer l'organisation",
        variant: "destructive"
      });
    } finally {
      setCreatingOrg(false);
    }
  }

  async function giveDemoAccess() {
    try {
      const { success, error } = await environmentService.giveDemoAccess(user.id);
      
      if (error) throw error;

      toast({
        title: "Accès démo activé",
        description: "Vous avez maintenant accès à l'environnement de démonstration"
      });

      loadOrganizations();
    } catch (error) {
      console.error('Error giving demo access:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'activer l'accès démo",
        variant: "destructive"
      });
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-extralight mb-2">Gestion des Environnements</h1>
          <p className="text-slate-400">Gérez vos organisations Demo et Production</p>
        </div>

        {/* Formulaire de création */}
        <div className="bg-slate-900 rounded-lg p-6 mb-8 border border-slate-800">
          <h2 className="text-xl font-light mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-[#D4AF37]" />
            Créer une nouvelle organisation
          </h2>
          <form onSubmit={createOrganization} className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-2">Nom de l'organisation</label>
              <input
                type="text"
                value={newOrgName}
                onChange={(e) => setNewOrgName(e.target.value)}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:border-[#D4AF37] focus:outline-none"
                placeholder="Ex: Acme Corp"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-2">Type d'environnement</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="prod"
                    checked={newOrgType === 'prod'}
                    onChange={(e) => setNewOrgType(e.target.value)}
                    className="text-[#D4AF37]"
                  />
                  <Briefcase className="w-4 h-4 text-[#D4AF37]" />
                  <span>Production</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="demo"
                    checked={newOrgType === 'demo'}
                    onChange={(e) => setNewOrgType(e.target.value)}
                    className="text-blue-400"
                  />
                  <Eye className="w-4 h-4 text-blue-400" />
                  <span>Démonstration</span>
                </label>
              </div>
            </div>
            <button
              type="submit"
              disabled={creatingOrg}
              className="px-6 py-2 bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {creatingOrg ? 'Création...' : 'Créer l\'organisation'}
            </button>
          </form>
        </div>

        {/* Accès démo rapide */}
        {!organizations.some(o => o.isDemo) && (
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-4">
              <Eye className="w-8 h-8 text-blue-400 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-lg font-medium mb-2">Accès à l'environnement de démonstration</h3>
                <p className="text-slate-400 mb-4">
                  Activez l'accès à l'organisation de démonstration pour tester toutes les fonctionnalités
                  avec des données préchargées.
                </p>
                <button
                  onClick={giveDemoAccess}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
                >
                  Activer l'accès démo
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Liste des organisations */}
        <div className="space-y-4">
          <h2 className="text-xl font-light mb-4">Vos organisations</h2>
          {organizations.length === 0 ? (
            <div className="bg-slate-900 rounded-lg p-8 text-center border border-slate-800">
              <p className="text-slate-400">Aucune organisation trouvée</p>
            </div>
          ) : (
            organizations.map((org) => (
              <div
                key={org.id}
                className="bg-slate-900 rounded-lg p-6 border border-slate-800 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    {org.isDemo ? (
                      <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                        <Eye className="w-6 h-6 text-blue-400" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
                        <Briefcase className="w-6 h-6 text-[#D4AF37]" />
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-medium">{org.name}</h3>
                      <p className="text-sm text-slate-400">
                        {org.isDemo ? 'Environnement de démonstration' : 'Environnement de production'}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        Rôle: {org.role === 'admin' ? 'Administrateur' : org.role === 'editor' ? 'Éditeur' : 'Lecteur'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Statistiques */}
                {stats[org.id] && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-800">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-slate-400" />
                      <div>
                        <p className="text-xs text-slate-400">Initiatives</p>
                        <p className="text-lg font-medium">{stats[org.id].initiatives}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-slate-400" />
                      <div>
                        <p className="text-xs text-slate-400">Décisions</p>
                        <p className="text-lg font-medium">{stats[org.id].decisions}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-slate-400" />
                      <div>
                        <p className="text-xs text-slate-400">Comités</p>
                        <p className="text-lg font-medium">{stats[org.id].committees}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-slate-400" />
                      <div>
                        <p className="text-xs text-slate-400">Documents</p>
                        <p className="text-lg font-medium">{stats[org.id].documents}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
