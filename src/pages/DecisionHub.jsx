import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  Filter,
  Plus,
  Calendar,
  User,
  FolderKanban
} from 'lucide-react';
import { decisionService } from '@/lib/decisionRiskService';
import { Link } from 'react-router-dom';

const DecisionHub = () => {
  const [loading, setLoading] = useState(true);
  const [decisions, setDecisions] = useState([]);
  const [filters, setFilters] = useState({
    status: '',
    decisionType: ''
  });

  const organizationId = 'YOUR_ORG_ID';

  useEffect(() => {
    loadDecisions();
  }, [filters]);

  const loadDecisions = async () => {
    setLoading(true);
    try {
      const data = await decisionService.getDecisions(organizationId, filters);
      setDecisions(data);
    } catch (error) {
      console.error('Erreur chargement décisions:', error);
    } finally {
      setLoading(false);
    }
  };

  const statusConfig = {
    PLANNED: {
      label: 'Planifiée',
      color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      icon: Clock
    },
    TAKEN: {
      label: 'Prise',
      color: 'bg-green-500/20 text-green-400 border-green-500/30',
      icon: CheckCircle
    },
    REJECTED: {
      label: 'Rejetée',
      color: 'bg-red-500/20 text-red-400 border-red-500/30',
      icon: XCircle
    },
    DEFERRED: {
      label: 'Reportée',
      color: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      icon: AlertCircle
    }
  };

  const decisionTypes = {
    GO: 'Go',
    NO_GO: 'No Go',
    SCOPE_CHANGE: 'Changement de périmètre',
    BUDGET: 'Budget',
    PRIORITY: 'Priorité',
    RISK_ACCEPT: 'Acceptation risque',
    RISK_MITIGATE: 'Mitigation risque',
    OTHER: 'Autre'
  };

  const groupedDecisions = decisions.reduce((acc, decision) => {
    const status = decision.status;
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(decision);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1A2F] via-[#0D2340] to-[#0A1A2F]">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0A1A2F]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-light text-white mb-2">Hub Décisions</h1>
              <p className="text-sm text-gray-400">Registre central de toutes les décisions</p>
            </div>
            <button className="px-4 py-2 bg-[#D4AF37] text-[#0A1A2F] rounded-lg hover:bg-[#C4A137] transition-colors flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Nouvelle Décision
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Filtres */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <Filter className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="text-lg font-light text-white">Filtres</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Statut</label>
              <select
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-[#D4AF37] transition-colors"
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              >
                <option value="">Tous les statuts</option>
                <option value="PLANNED">Planifiée</option>
                <option value="TAKEN">Prise</option>
                <option value="REJECTED">Rejetée</option>
                <option value="DEFERRED">Reportée</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Type</label>
              <select
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-[#D4AF37] transition-colors"
                value={filters.decisionType}
                onChange={(e) => setFilters({ ...filters, decisionType: e.target.value })}
              >
                <option value="">Tous les types</option>
                {Object.entries(decisionTypes).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Stats rapides */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Object.entries(statusConfig).map(([status, config], index) => {
            const count = groupedDecisions[status]?.length || 0;
            const Icon = config.icon;
            return (
              <motion.div
                key={status}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className="w-5 h-5 text-[#D4AF37]" />
                  <span className="text-2xl font-light text-white">{count}</span>
                </div>
                <p className="text-sm text-gray-400">{config.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Liste des décisions */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full"
            />
          </div>
        ) : decisions.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            {decisions.map((decision) => {
              const statusInfo = statusConfig[decision.status];
              const Icon = statusInfo.icon;

              return (
                <div
                  key={decision.id}
                  className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-[#D4AF37]/50 transition-all"
                >
                  <div className="flex items-start gap-4">
                    {/* Icône de statut */}
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        statusInfo.color.split(' ')[0]
                      }`}
                    >
                      <Icon className={`w-6 h-6 ${statusInfo.color.split(' ')[1]}`} />
                    </div>

                    {/* Contenu principal */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <Link
                            to={`/decisions/${decision.id}`}
                            className="text-xl text-white hover:text-[#D4AF37] transition-colors inline-block mb-2"
                          >
                            {decision.title}
                          </Link>
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <span
                              className={`px-3 py-1 rounded-full border ${statusInfo.color}`}
                            >
                              {statusInfo.label}
                            </span>
                            <span className="px-3 py-1 bg-white/5 rounded-full">
                              {decisionTypes[decision.decision_type]}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-300 mb-4 line-clamp-2">{decision.description}</p>

                      {/* Métadonnées */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        {decision.related_project && (
                          <div className="flex items-center gap-2 text-gray-400">
                            <FolderKanban className="w-4 h-4 text-[#D4AF37]" />
                            <span>{decision.related_project.name}</span>
                          </div>
                        )}
                        {decision.created_by && (
                          <div className="flex items-center gap-2 text-gray-400">
                            <User className="w-4 h-4 text-blue-400" />
                            <span>
                              Par: {decision.created_by.first_name}{' '}
                              {decision.created_by.last_name}
                            </span>
                          </div>
                        )}
                        {decision.decision_date && (
                          <div className="flex items-center gap-2 text-gray-400">
                            <Calendar className="w-4 h-4 text-purple-400" />
                            <span>
                              {new Date(decision.decision_date).toLocaleDateString('fr-FR')}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Impact */}
                      {decision.impact_summary && (
                        <div className="mt-4 p-3 bg-white/5 rounded-lg">
                          <h4 className="text-xs text-gray-400 mb-1">Impact</h4>
                          <p className="text-sm text-white">{decision.impact_summary}</p>
                        </div>
                      )}

                      {/* Actions associées */}
                      {decision.decision_actions && decision.decision_actions.length > 0 && (
                        <div className="mt-4 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-[#D4AF37]" />
                          <span className="text-sm text-gray-400">
                            {decision.decision_actions.length} action
                            {decision.decision_actions.length > 1 ? 's' : ''} associée
                            {decision.decision_actions.length > 1 ? 's' : ''}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <CheckCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl text-white mb-2">Aucune décision</h3>
            <p className="text-gray-400 mb-6">Commencez à tracer vos décisions stratégiques</p>
            <button className="px-6 py-3 bg-[#D4AF37] text-[#0A1A2F] rounded-lg hover:bg-[#C4A137] transition-colors">
              Créer une décision
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DecisionHub;
