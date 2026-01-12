import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import customSupabaseClient from '@/lib/customSupabaseClient';
import organizationService from '@/lib/organizationService';
import CockpitLayout from '@/components/layout/CockpitLayout';
import EmptyState from '@/components/EmptyState';
import logger from '@/lib/logger';
import { Plus, AlertTriangle, Shield, TrendingUp } from 'lucide-react';

export default function RisksPage() {
  const { user } = useAuth();
  const [risks, setRisks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    critical: 0,
    high: 0,
    medium: 0,
    low: 0,
  });

  useEffect(() => {
    if (user) loadRisks();
  }, [user]);

  async function loadRisks() {
    try {
      // Obtenir ou créer l'organization_id automatiquement
      const organizationId = await organizationService.getUserOrganizationId(user.id, user.email);

      if (!organizationId) {
        setLoading(false);
        return;
      }

      // Récupérer les risques avec leurs projets liés
      const { data: risksData } = await customSupabaseClient
        .from('risks')
        .select(`
          *,
          initiative:initiative_id(id, name, status, organization_id)
        `)
        .order('created_at', { ascending: false });

      // Filtrer par organisation via les initiatives
      const filteredRisks = risksData?.filter(
        r => r.initiative?.organization_id === organizationId
      ) || [];

      setRisks(filteredRisks);

      // Calculer criticité : probability * impact
      const critical = filteredRisks.filter(r => r.probability * r.impact > 0.56).length;
      const high = filteredRisks.filter(r => r.probability * r.impact > 0.36 && r.probability * r.impact <= 0.56).length;
      const medium = filteredRisks.filter(r => r.probability * r.impact > 0.16 && r.probability * r.impact <= 0.36).length;
      const low = filteredRisks.filter(r => r.probability * r.impact <= 0.16).length;

      setStats({
        total: filteredRisks.length,
        critical,
        high,
        medium,
        low,
      });
    } catch (error) {
      console.error('Erreur chargement risques:', error);
    } finally {
      setLoading(false);
    }
  }

  const getCriticalityLevel = (probability, impact) => {
    const score = probability * impact;
    if (score > 0.56) return { label: 'Critique', color: 'bg-red-500/10 text-red-400 border-red-500/20' };
    if (score > 0.36) return { label: 'Élevé', color: 'bg-orange-500/10 text-orange-400 border-orange-500/20' };
    if (score > 0.16) return { label: 'Moyen', color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' };
    return { label: 'Faible', color: 'bg-green-500/10 text-green-400 border-green-500/20' };
  };

  const formatPercentage = (value) => `${Math.round(value * 100)}%`;

  return (
    <CockpitLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white mb-1">Risques</h1>
            <p className="text-sm text-white/60">
              Registre des risques du portefeuille.
            </p>
          </div>
          <Link
            to="/app/risks/new"
            className="inline-flex items-center gap-2 rounded-lg bg-[#D4AF37] px-4 py-2 text-sm font-medium text-black hover:bg-[#f2c34d] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Nouveau risque
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="rounded-xl border border-white/10 bg-black/40 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-white/60" />
              <div className="text-xs text-white/60">Total</div>
            </div>
            <div className="text-2xl font-semibold text-white">{stats.total}</div>
          </div>
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <div className="text-xs text-white/60">Critique</div>
            </div>
            <div className="text-2xl font-semibold text-red-400">{stats.critical}</div>
          </div>
          <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-orange-400" />
              <div className="text-xs text-white/60">Élevé</div>
            </div>
            <div className="text-2xl font-semibold text-orange-400">{stats.high}</div>
          </div>
          <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4">
            <div className="text-xs text-white/60 mb-2">Moyen</div>
            <div className="text-2xl font-semibold text-yellow-400">{stats.medium}</div>
          </div>
          <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4">
            <div className="text-xs text-white/60 mb-2">Faible</div>
            <div className="text-2xl font-semibold text-green-400">{stats.low}</div>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-12 text-white/60">
            Chargement des risques...
          </div>
        )}

        {/* Empty state */}
        {!loading && risks.length === 0 && (
          <EmptyState
            icon={Shield}
            title="Aucun risque"
            description="Identifiez et suivez les risques potentiels de vos projets pour une gestion proactive."
            actionLabel="Créer un risque"
            actionRoute="/app/risks/new"
          />
        )}

        {/* Risks list */}
        {!loading && risks.length > 0 && (
          <div className="space-y-3">
            {risks.map((risk) => {
              const criticality = getCriticalityLevel(risk.probability, risk.impact);
              
              return (
                <div
                  key={risk.id}
                  className="rounded-2xl border border-white/10 bg-black/40 p-4 hover:bg-black/60 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-base font-medium text-white truncate">
                          {risk.name}
                        </h3>
                        <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs ${criticality.color}`}>
                          <AlertTriangle className="w-3 h-3" />
                          {criticality.label}
                        </span>
                      </div>
                      
                      {risk.initiative && (
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs text-white/40">Projet:</span>
                          <span className="text-xs text-[#D4AF37]">{risk.initiative.name}</span>
                        </div>
                      )}
                      
                      {risk.description && (
                        <p className="text-sm text-white/60 mb-2 line-clamp-2">
                          {risk.description}
                        </p>
                      )}
                      
                      <div className="flex items-center gap-4 text-xs text-white/50">
                        <span>Probabilité: {formatPercentage(risk.probability)}</span>
                        <span>Impact: {formatPercentage(risk.impact)}</span>
                        <span>Score: {(risk.probability * risk.impact * 100).toFixed(0)}</span>
                        <span>Créé le {new Date(risk.created_at).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>

                    {/* Visual indicator */}
                    <div className="w-16 h-16 shrink-0 rounded-lg bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center">
                      <div className="text-xl font-bold text-white">
                        {(risk.probability * risk.impact * 100).toFixed(0)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </CockpitLayout>
  );
}
