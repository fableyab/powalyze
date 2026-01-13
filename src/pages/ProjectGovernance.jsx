/**
 * PAGE PROJECT GOVERNANCE
 * Gestion des modèles de gouvernance et rituels
 */

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FileText, Calendar, Users, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { getTemplates, getRituals, prepareCommittee } from '@/lib/governanceService';

export default function ProjectGovernance() {
  const { workspaceId } = useParams();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [templates, setTemplates] = useState([]);
  const [rituals, setRituals] = useState([]);
  const [selectedRitual, setSelectedRitual] = useState(null);
  const [committeeData, setCommitteeData] = useState(null);

  useEffect(() => {
    loadGovernanceData();
  }, [workspaceId]);

  const loadGovernanceData = async () => {
    try {
      setLoading(true);
      const [templatesData, ritualsData] = await Promise.all([
        getTemplates(workspaceId),
        getRituals(workspaceId)
      ]);
      setTemplates(templatesData || []);
      setRituals(ritualsData || []);
    } catch (error) {
      console.error('Erreur chargement gouvernance:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrepareCommittee = async (ritual) => {
    try {
      const data = await prepareCommittee(ritual.id);
      setCommitteeData(data);
      setSelectedRitual(ritual);
    } catch (error) {
      console.error('Erreur préparation comité:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-white font-light">Chargement de la gouvernance...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-extralight mb-2">
            Gouvernance <span className="text-[#D4AF37]">Projet</span>
          </h1>
          <p className="text-gray-400 font-light">
            Modèles et rituels de gouvernance exécutive
          </p>
        </div>

        {/* Templates */}
        <div>
          <h2 className="text-2xl font-light mb-4 flex items-center gap-2">
            <FileText className="h-6 w-6 text-[#D4AF37]" />
            Modèles de gouvernance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {templates.map((template) => (
              <div
                key={template.id}
                className="bg-[#0A1A2F] border border-gray-800 rounded-xl p-6 hover:border-[#D4AF37]/30 transition-colors"
              >
                <h3 className="text-xl font-light mb-2">{template.name}</h3>
                <p className="text-sm text-gray-400 font-light mb-4">{template.description}</p>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock className="h-4 w-4" />
                    <span>Cadence: {template.cadence}</span>
                  </div>
                  
                  {template.deliverables && template.deliverables.length > 0 && (
                    <div>
                      <p className="text-gray-500 mb-2">Livrables:</p>
                      <ul className="list-disc list-inside space-y-1 text-gray-400">
                        {template.deliverables.map((deliverable, idx) => (
                          <li key={idx}>{deliverable}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {template.indicators && template.indicators.length > 0 && (
                    <div>
                      <p className="text-gray-500 mb-2">Indicateurs:</p>
                      <div className="flex flex-wrap gap-2">
                        {template.indicators.map((indicator, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-[#D4AF37]/10 text-[#D4AF37] rounded-full text-xs"
                          >
                            {indicator}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rituels à venir */}
        <div>
          <h2 className="text-2xl font-light mb-4 flex items-center gap-2">
            <Calendar className="h-6 w-6 text-[#D4AF37]" />
            Prochains rituels
          </h2>
          <div className="space-y-4">
            {rituals.map((ritual) => {
              const nextDate = new Date(ritual.next_date);
              const isUpcoming = nextDate <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

              return (
                <div
                  key={ritual.id}
                  className={`
                    bg-[#0A1A2F] border rounded-xl p-6
                    ${isUpcoming ? 'border-[#D4AF37]' : 'border-gray-800'}
                    hover:border-[#D4AF37]/30 transition-colors
                  `}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-light">{ritual.name}</h3>
                        {isUpcoming && (
                          <span className="px-2 py-0.5 bg-[#D4AF37]/20 text-[#D4AF37] rounded-full text-xs">
                            Imminent
                          </span>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                        <div>
                          <p className="text-gray-500 mb-1">Type</p>
                          <p className="text-white font-light capitalize">{ritual.type}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 mb-1">Prochaine date</p>
                          <p className="text-white font-light">
                            {nextDate.toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500 mb-1">Fréquence</p>
                          <p className="text-white font-light capitalize">{ritual.frequency}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 mb-1">Participants</p>
                          <p className="text-white font-light flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {ritual.participants?.length || 0}
                          </p>
                        </div>
                      </div>

                      {ritual.description && (
                        <p className="text-sm text-gray-400 font-light mb-4">
                          {ritual.description}
                        </p>
                      )}

                      <button
                        onClick={() => handlePrepareCommittee(ritual)}
                        className="px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] text-black font-light rounded-lg hover:opacity-90 transition-opacity text-sm"
                      >
                        Préparer le comité
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pack comité (si généré) */}
        {committeeData && selectedRitual && (
          <div className="bg-[#0A1A2F] border border-[#D4AF37] rounded-xl p-6">
            <h2 className="text-2xl font-light mb-4">
              Pack comité: {selectedRitual.name}
            </h2>
            
            <div className="space-y-6">
              {/* Overview */}
              {committeeData.overview && (
                <div>
                  <h3 className="text-lg font-light mb-3 text-[#D4AF37]">Vue d'ensemble</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 mb-1">Initiatives actives</p>
                      <p className="text-white text-xl font-light">
                        {committeeData.overview.active_count || 0}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Budget total</p>
                      <p className="text-white text-xl font-light">
                        {new Intl.NumberFormat('fr-FR', {
                          style: 'currency',
                          currency: 'EUR',
                          notation: 'compact'
                        }).format(committeeData.overview.total_budget || 0)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Risques critiques</p>
                      <p className="text-red-400 text-xl font-light">
                        {committeeData.overview.critical_risks || 0}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Alignement moyen</p>
                      <p className="text-emerald-400 text-xl font-light">
                        {committeeData.overview.avg_alignment || 0}%
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Top risques */}
              {committeeData.top_risks && committeeData.top_risks.length > 0 && (
                <div>
                  <h3 className="text-lg font-light mb-3 text-[#D4AF37]">Top 5 risques</h3>
                  <div className="space-y-2">
                    {committeeData.top_risks.map((risk, idx) => (
                      <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-800">
                        <span className="text-white font-light">{risk.risk_name}</span>
                        <span className="text-red-400 text-sm">Score: {risk.score}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Décisions en attente */}
              {committeeData.pending_decisions && committeeData.pending_decisions.length > 0 && (
                <div>
                  <h3 className="text-lg font-light mb-3 text-[#D4AF37]">Décisions en attente</h3>
                  <div className="space-y-2">
                    {committeeData.pending_decisions.map((decision, idx) => (
                      <div key={idx} className="py-2 border-b border-gray-800">
                        <p className="text-white font-light">{decision.title}</p>
                        <p className="text-sm text-gray-400">{decision.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] text-black font-light rounded-lg hover:opacity-90 transition-opacity"
            >
              Exporter le pack (PDF)
            </button>
          </div>
        )}

        {/* Empty states */}
        {templates.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 bg-[#0A1A2F] border border-gray-800 rounded-xl">
            <FileText className="h-12 w-12 text-gray-600 mb-4" />
            <p className="text-gray-500 font-light">Aucun modèle de gouvernance</p>
          </div>
        )}
      </div>
    </div>
  );
}
