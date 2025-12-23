import React from 'react';
import { FiDownload, FiPrinter, FiFileText, FiTrendingUp } from 'react-icons/fi';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const RapportsPage = () => {
  const reports = [
    { id: 1, title: 'Rapport Exécutif Mensuel', description: 'Vue d’ensemble des projets, budgets et KPIs pour le comité de direction', type: 'executive', lastGenerated: '2025-12-20', status: 'ready' },
    { id: 2, title: 'Suivi Budgétaire Détaillé', description: 'Analyse complète des dépenses par projet avec prévisions Q1', type: 'financial', lastGenerated: '2025-12-22', status: 'ready' },
    { id: 3, title: 'Performance Agile', description: 'Vélocité, burndown charts et métriques d’équipe', type: 'agile', lastGenerated: '2025-12-23', status: 'ready' },
    { id: 4, title: 'Gestion des Risques', description: 'Cartographie des risques actifs avec plans de mitigation', type: 'risks', lastGenerated: '2025-12-21', status: 'ready' },
    { id: 5, title: 'Allocation Ressources', description: 'Planification capacité et taux d’occupation par équipe', type: 'resources', lastGenerated: '2025-12-19', status: 'ready' },
    { id: 6, title: 'Portefeuille Projets', description: 'Matrice de priorisation et pipeline de projets futurs', type: 'portfolio', lastGenerated: '2025-12-18', status: 'ready' },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Rapports</h1>
        <p className="text-gray-400">Génération et consultation des rapports PMO</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-[#111] border-white/10 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <FiFileText className="text-blue-400" size={24} />
            </div>
            <div>
              <p className="text-3xl font-bold text-white">{reports.length}</p>
              <p className="text-sm text-gray-400">Rapports</p>
            </div>
          </div>
        </Card>
        <Card className="bg-[#111] border-white/10 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
              <FiTrendingUp className="text-green-400" size={24} />
            </div>
            <div>
              <p className="text-3xl font-bold text-white">{reports.filter(r => r.status === 'ready').length}</p>
              <p className="text-sm text-gray-400">Disponibles</p>
            </div>
          </div>
        </Card>
        <Card className="bg-[#111] border-white/10 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <FiDownload className="text-purple-400" size={24} />
            </div>
            <div>
              <p className="text-3xl font-bold text-white">247</p>
              <p className="text-sm text-gray-400">Téléchargements</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {reports.map(report => (
          <Card key={report.id} className="bg-[#111] border-white/10 p-6 hover:border-[#BFA76A]/50 transition-all">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-[#BFA76A]/20 flex items-center justify-center flex-shrink-0">
                <FiFileText className="text-[#BFA76A]" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-1">{report.title}</h3>
                <p className="text-sm text-gray-400 mb-2">{report.description}</p>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/50 text-xs">
                    {report.status === 'ready' ? 'Disponible' : 'Génération...'}
                  </Badge>
                  <span className="text-xs text-gray-500">
                    Dernière génération: {new Date(report.lastGenerated).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 bg-[#BFA76A] hover:bg-[#BFA76A]/90 text-black px-4 py-2 rounded-lg text-sm font-medium transition-all">
                <FiDownload size={14} />
                Télécharger PDF
              </button>
              <button className="flex items-center justify-center bg-white/5 hover:bg-white/10 text-white border border-white/10 px-3 py-2 rounded-lg transition-all">
                <FiPrinter size={14} />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RapportsPage;