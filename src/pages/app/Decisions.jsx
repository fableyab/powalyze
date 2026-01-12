import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import decisionService from '@/lib/decisionService';
import organizationService from '@/lib/organizationService';
import CockpitLayout from '@/components/layout/CockpitLayout';
import { Plus, CheckCircle2, Clock, AlertCircle, XCircle } from 'lucide-react';

export default function DecisionsPage() {
  const { user } = useAuth();
  const [decisions, setDecisions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    urgent: 0,
  });

  useEffect(() => {
    if (user) loadDecisions();
  }, [user]);

  async function loadDecisions() {
    try {
      // Obtenir ou créer l'organization_id automatiquement
      const organizationId = await organizationService.getUserOrganizationId(user.id, user.email);

      if (organizationId) {
        const data = await decisionService.getDecisions(organizationId);
        setDecisions(data || []);

        // Calculer stats
        const today = new Date();
        const in7Days = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

        const urgent = data?.filter(d => {
          if (!d.due_date || d.status !== 'pending') return false;
          const dueDate = new Date(d.due_date);
          return dueDate <= in7Days && dueDate >= today;
        }).length || 0;

        setStats({
          total: data?.length || 0,
          pending: data?.filter(d => d.status === 'pending').length || 0,
          approved: data?.filter(d => d.status === 'approved').length || 0,
          rejected: data?.filter(d => d.status === 'rejected').length || 0,
          urgent,
        });
      }
    } catch (error) {
      console.error('Erreur chargement décisions:', error);
    } finally {
      setLoading(false);
    }
  }

  const getStatusConfig = (status) => {
    switch (status) {
      case 'approved':
        return { label: 'Approuvée', icon: CheckCircle2, color: 'bg-green-500/10 text-green-400 border-green-500/20' };
      case 'rejected':
        return { label: 'Rejetée', icon: XCircle, color: 'bg-red-500/10 text-red-400 border-red-500/20' };
      case 'pending':
        return { label: 'En attente', icon: Clock, color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' };
      default:
        return { label: status, icon: AlertCircle, color: 'bg-white/10 text-white/60 border-white/10' };
    }
  };

  const getImpactColor = (level) => {
    switch (level) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-white/60';
    }
  };

  const isUrgent = (dueDate, status) => {
    if (!dueDate || status !== 'pending') return false;
    const today = new Date();
    const due = new Date(dueDate);
    const in7Days = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    return due <= in7Days && due >= today;
  };

  const getDaysUntilDue = (dueDate) => {
    if (!dueDate) return null;
    const today = new Date();
    const due = new Date(dueDate);
    const diff = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <CockpitLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white mb-1">Décisions</h1>
            <p className="text-sm text-white/60">
              Suivi des décisions de gouvernance.
            </p>
          </div>
          <Link
            to="/app/decisions/new"
            className="inline-flex items-center gap-2 rounded-lg bg-[#D4AF37] px-4 py-2 text-sm font-medium text-black hover:bg-[#f2c34d] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Nouvelle décision
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="rounded-xl border border-white/10 bg-black/40 p-4">
            <div className="text-xs text-white/60 mb-2">Total</div>
            <div className="text-2xl font-semibold text-white">{stats.total}</div>
          </div>
          <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-yellow-400" />
              <div className="text-xs text-white/60">En attente</div>
            </div>
            <div className="text-2xl font-semibold text-yellow-400">{stats.pending}</div>
          </div>
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-red-400" />
              <div className="text-xs text-white/60">Urgentes</div>
            </div>
            <div className="text-2xl font-semibold text-red-400">{stats.urgent}</div>
          </div>
          <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <div className="text-xs text-white/60">Approuvées</div>
            </div>
            <div className="text-2xl font-semibold text-green-400">{stats.approved}</div>
          </div>
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
            <div className="flex items-center gap-2 mb-2">
              <XCircle className="w-4 h-4 text-red-400" />
              <div className="text-xs text-white/60">Rejetées</div>
            </div>
            <div className="text-2xl font-semibold text-red-400">{stats.rejected}</div>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-12 text-white/60">
            Chargement des décisions...
          </div>
        )}

        {/* Empty state */}
        {!loading && decisions.length === 0 && (
          <div className="border border-white/10 bg-black/30 rounded-2xl p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-white/40" />
            </div>
            <p className="text-white/60 mb-4">Aucune décision enregistrée.</p>
            <Link
              to="/app/decisions/new"
              className="inline-flex items-center gap-2 rounded-lg bg-[#D4AF37] px-4 py-2 text-sm font-medium text-black hover:bg-[#f2c34d]"
            >
              <Plus className="w-4 h-4" />
              Créer votre première décision
            </Link>
          </div>
        )}

        {/* Decisions list */}
        {!loading && decisions.length > 0 && (
          <div className="space-y-3">
            {decisions.map((decision) => {
              const statusConfig = getStatusConfig(decision.status);
              const StatusIcon = statusConfig.icon;
              const urgent = isUrgent(decision.due_date, decision.status);
              const daysUntilDue = getDaysUntilDue(decision.due_date);
              
              return (
                <div
                  key={decision.id}
                  className={`rounded-2xl border p-4 hover:bg-black/60 transition-colors ${
                    urgent 
                      ? 'border-red-500/30 bg-red-500/5' 
                      : 'border-white/10 bg-black/40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <h3 className="text-base font-medium text-white">
                          {decision.title}
                        </h3>
                        <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs ${statusConfig.color}`}>
                          <StatusIcon className="w-3 h-3" />
                          {statusConfig.label}
                        </span>
                        {urgent && (
                          <span className="inline-flex items-center gap-1 rounded-full border border-red-500/30 bg-red-500/10 px-2 py-0.5 text-xs text-red-400">
                            <AlertCircle className="w-3 h-3" />
                            Urgent
                          </span>
                        )}
                      </div>
                      
                      {decision.description && (
                        <p className="text-sm text-white/60 mb-2 line-clamp-2">
                          {decision.description}
                        </p>
                      )}
                      
                      <div className="flex items-center gap-4 flex-wrap text-xs text-white/50">
                        <span className={getImpactColor(decision.impact_level)}>
                          Impact: {decision.impact_level || 'N/C'}
                        </span>
                        {decision.due_date && (
                          <span>
                            Échéance: {new Date(decision.due_date).toLocaleDateString('fr-FR')}
                            {daysUntilDue !== null && daysUntilDue >= 0 && (
                              <span className="ml-1 text-yellow-400">
                                (dans {daysUntilDue} jour{daysUntilDue > 1 ? 's' : ''})
                              </span>
                            )}
                          </span>
                        )}
                        <span>Créée le {new Date(decision.created_at).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>

                    {/* Visual status indicator */}
                    <div className={`w-12 h-12 shrink-0 rounded-lg flex items-center justify-center ${
                      decision.status === 'approved' ? 'bg-green-500/20' :
                      decision.status === 'rejected' ? 'bg-red-500/20' :
                      urgent ? 'bg-red-500/20' :
                      'bg-yellow-500/20'
                    }`}>
                      <StatusIcon className="w-6 h-6" />
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
