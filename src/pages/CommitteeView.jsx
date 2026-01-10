import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Users,
  Plus,
  Download,
  CheckCircle,
  Clock,
  Edit,
  Trash2
} from 'lucide-react';
import { committeeService, committeeItemService } from '@/lib/committeeService';
import { Link } from 'react-router-dom';

const CommitteeView = () => {
  const [loading, setLoading] = useState(true);
  const [committees, setCommittees] = useState([]);
  const [filter, setFilter] = useState('upcoming');
  const organizationId = 'YOUR_ORG_ID';

  useEffect(() => {
    loadCommittees();
  }, [filter]);

  const loadCommittees = async () => {
    setLoading(true);
    try {
      const filters = {};
      if (filter === 'upcoming') {
        filters.status = 'PLANNED';
      } else if (filter === 'closed') {
        filters.status = 'CLOSED';
      }

      const data = await committeeService.getCommittees(organizationId, filters);
      setCommittees(data);
    } catch (error) {
      console.error('Erreur chargement comités:', error);
    } finally {
      setLoading(false);
    }
  };

  const statusColors = {
    PLANNED: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    IN_PROGRESS: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    CLOSED: 'bg-gray-500/20 text-gray-400 border-gray-500/30'
  };

  const statusLabels = {
    PLANNED: 'Planifié',
    IN_PROGRESS: 'En cours',
    CLOSED: 'Terminé'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1A2F] via-[#0D2340] to-[#0A1A2F]">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0A1A2F]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-light text-white mb-2">Comités de Gouvernance</h1>
              <p className="text-sm text-gray-400">Préparez et tracez vos comités</p>
            </div>
            <button className="px-4 py-2 bg-[#D4AF37] text-[#0A1A2F] rounded-lg hover:bg-[#C4A137] transition-colors flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Nouveau Comité
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Filtres */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setFilter('upcoming')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'upcoming'
                ? 'bg-[#D4AF37] text-[#0A1A2F]'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            À venir
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'all'
                ? 'bg-[#D4AF37] text-[#0A1A2F]'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            Tous
          </button>
          <button
            onClick={() => setFilter('closed')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'closed'
                ? 'bg-[#D4AF37] text-[#0A1A2F]'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            Terminés
          </button>
        </div>

        {/* Liste des comités */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full"
            />
          </div>
        ) : committees.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {committees.map((committee, index) => (
              <motion.div
                key={committee.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-[#D4AF37]/50 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-light text-white">
                        {committee.committee_type?.name || 'Comité'}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs border ${
                          statusColors[committee.status]
                        }`}
                      >
                        {statusLabels[committee.status]}
                      </span>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(committee.date).toLocaleDateString('fr-FR', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Président: {committee.chair?.first_name} {committee.chair?.last_name}
                      </div>
                      {committee.committee_items?.[0]?.count && (
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          {committee.committee_items[0].count} points
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/committees/${committee.id}`}
                      className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <Edit className="w-4 h-4 text-[#D4AF37]" />
                    </Link>
                    {committee.status === 'CLOSED' && (
                      <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                        <Download className="w-4 h-4 text-gray-400" />
                      </button>
                    )}
                  </div>
                </div>

                {committee.agenda && (
                  <div className="mt-4 p-4 bg-white/5 rounded-lg">
                    <h4 className="text-sm text-gray-400 mb-2">Agenda</h4>
                    <p className="text-white text-sm">{committee.agenda}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Clock className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl text-white mb-2">Aucun comité</h3>
            <p className="text-gray-400 mb-6">Créez votre premier comité de gouvernance</p>
            <button className="px-6 py-3 bg-[#D4AF37] text-[#0A1A2F] rounded-lg hover:bg-[#C4A137] transition-colors">
              Créer un comité
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommitteeView;
