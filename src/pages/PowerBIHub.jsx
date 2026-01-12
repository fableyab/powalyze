import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '@/components/LanguageSwitcher';

// Environnement vide - pas de rapports de test
const INITIAL_REPORTS = [];

const levelColor = (level) => {
  switch (level) {
    case "red":
      return "border-[#C96A6A] text-[#C96A6A]";
    case "orange":
      return "border-[#D4AF37] text-[#D4AF37]";
    case "gold":
    default:
      return "border-[#D4AF37] text-[#D4AF37]";
  }
};

export default function PowerBIHub() {
  const { t } = useTranslation(['saas', 'common']);
  const [reports, setReports] = useState(INITIAL_REPORTS);
  const [selectedReport, setSelectedReport] = useState(INITIAL_REPORTS[0] || null);
  const [showCreate, setShowCreate] = useState(false);
  const [newReport, setNewReport] = useState({
    name: "",
    description: "",
    domain: "Ventes"
  });

  const handleImport = () => {
    // Fonctionnalité d'import - À implémenter
    console.log("Import de rapport demandé");
  };

  const handleCreateReport = (e) => {
    e.preventDefault();
    if (!newReport.name.trim()) return;

    const created = {
      id: `r${reports.length + 1}`,
      name: newReport.name,
      description: newReport.description || "Rapport personnalisé",
      domain: newReport.domain,
      views: 0,
      date: new Date().toISOString().slice(0, 10),
      level: "gold",
      demoMetrics: {
        vues: "0",
        utilisateurs: "1",
        données: "N/A",
        statut: "Nouveau"
      }
    };

    setReports([created, ...reports]);
    setSelectedReport(created);
    setNewReport({ name: "", description: "", domain: "Ventes" });
    setShowCreate(false);
  };

  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="px-8 pt-6 pb-4 flex items-center justify-between border-b border-[#1A1A1A] flex-shrink-0">
        <div>
          <h1 className="text-2xl font-light text-[#D4AF37]">
            Analytics Hub
          </h1>
          <p className="text-sm text-gray-300 mt-1">
            Plateforme d'analyse décisionnelle pour pilotage stratégique et opérationnel
          </p>
        </div>
        <div className="flex gap-3 items-center">
          <LanguageSwitcher />
          <button
            onClick={handleImport}
            className="px-4 py-2 border border-[#D4AF37] text-[#D4AF37] text-sm rounded-full hover:bg-[#D4AF37] hover:text-black transition"
          >
            {t('saas:actions.import', 'Importer un rapport')}
          </button>
          <button
            onClick={() => setShowCreate(true)}
            className="px-4 py-2 bg-[#D4AF37] text-black text-sm rounded-full hover:bg-[#e0c58b] transition"
          >
            {t('saas:reports.newReport', 'Créer un rapport')}
          </button>
        </div>
      </header>

      {/* Contenu principal */}
      <div className="flex flex-1 overflow-hidden" style={{ minHeight: 'calc(100vh - 200px)' }}>
        {/* Liste des rapports */}
        <aside className="w-[38%] border-r border-[#1A1A1A] p-6 overflow-y-auto flex-shrink-0">
          <h2 className="text-sm uppercase tracking-[0.2em] text-gray-400 mb-4">
            {t('saas:reports.title', 'Rapports')}
          </h2>
          <div className="space-y-3">
            {reports.map((r) => (
              <button
                key={r.id}
                onClick={() => setSelectedReport(r)}
                className={`w-full text-left p-4 rounded-xl bg-[#000000] border ${
                  selectedReport?.id === r.id
                    ? "border-[#D4AF37]"
                    : "border-[#1A1A1A]"
                } hover:border-[#D4AF37] transition`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-400">{r.domain}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full border ${levelColor(
                      r.level
                    )}`}
                  >
                    {r.level === "red"
                      ? "Critique"
                      : r.level === "orange"
                      ? "À surveiller"
                      : "Stable"}
                  </span>
                </div>
                <div className="text-[15px] text-white mb-1">{r.name}</div>
                <div className="text-xs text-gray-400 line-clamp-2">
                  {r.description}
                </div>
                <div className="flex justify-between mt-2 text-[11px] text-gray-500">
                  <span>{r.views} vues</span>
                  <span>{r.date}</span>
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* Zone de visualisation / futur embed Power BI */}
        <main className="flex-1 p-6 flex flex-col">
          {selectedReport ? (
            <>
              <div className="mb-4">
                <h2 className="text-lg text-[#D4AF37] mb-1">
                  {selectedReport.name}
                </h2>
                <p className="text-sm text-gray-300">
                  {selectedReport.description}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Domaine : {selectedReport.domain} • {selectedReport.views} vues
                </p>
              </div>

              <div className="flex-1 border border-[#1A1A1A] rounded-xl bg-[#050505] overflow-hidden min-h-[400px] p-8">
                {/* Demo Visualization */}
                <div className="h-full flex flex-col">
                  {/* Header Metrics */}
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    {selectedReport?.demoMetrics && Object.entries(selectedReport.demoMetrics).map(([key, value]) => (
                      <div key={key} className="bg-black border border-[#1A1A1A] rounded-lg p-4">
                        <div className="text-xs text-gray-500 uppercase mb-1">{key}</div>
                        <div className="text-2xl font-light text-[#D4AF37]">{value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Chart Area */}
                  <div className="flex-1 bg-black border border-[#1A1A1A] rounded-lg p-6 flex flex-col items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="text-6xl mb-4">📊</div>
                      <div className="text-xl text-[#D4AF37]">Zone de visualisation</div>
                      <div className="text-sm text-gray-400 max-w-md">
                        Vos dashboards analytics seront affichés ici une fois connectés à vos sources de données.
                      </div>
                      <div className="flex gap-4 mt-6 justify-center">
                        <div className="px-4 py-2 bg-[#000000] border border-[#1A1A1A] rounded-lg text-xs text-gray-400">
                          🔄 Mise à jour temps réel
                        </div>
                        <div className="px-4 py-2 bg-[#000000] border border-[#1A1A1A] rounded-lg text-xs text-gray-400">
                          📈 Graphiques interactifs
                        </div>
                        <div className="px-4 py-2 bg-[#000000] border border-[#1A1A1A] rounded-lg text-xs text-gray-400">
                          🎯 Filtres dynamiques
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-xs text-gray-400">
                Synthèse pour direction :  
                <br />
                Ce rapport met en évidence les principaux indicateurs du domaine{" "}
                {selectedReport.domain}.  
                Les risques et écarts majeurs sont automatiquement mis en avant
                pour faciliter la décision.
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500 text-sm">
              Sélectionnez un rapport dans la liste de gauche.
            </div>
          )}
        </main>
      </div>

      {/* Modal création de rapport */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="w-full max-w-md bg-[#000000] border border-[#1A1A1A] rounded-2xl p-6">
            <h3 className="text-lg text-[#D4AF37] mb-4">
              Créer un nouveau rapport
            </h3>
            <form onSubmit={handleCreateReport} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  Nom du rapport
                </label>
                <input
                  type="text"
                  className="w-full bg-black border border-[#1A1A1A] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  value={newReport.name}
                  onChange={(e) =>
                    setNewReport({ ...newReport, name: e.target.value })
                  }
                  placeholder="Ex : Synthèse portefeuille projets"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  Description
                </label>
                <textarea
                  className="w-full bg-black border border-[#1A1A1A] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  rows={3}
                  value={newReport.description}
                  onChange={(e) =>
                    setNewReport({
                      ...newReport,
                      description: e.target.value
                    })
                  }
                  placeholder="Ex : Vue consolidée des risques et décisions à venir."
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  Domaine
                </label>
                <select
                  className="w-full bg-black border border-[#1A1A1A] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  value={newReport.domain}
                  onChange={(e) =>
                    setNewReport({ ...newReport, domain: e.target.value })
                  }
                >
                  <option>Ventes</option>
                  <option>Finance</option>
                  <option>PMO</option>
                  <option>Risques</option>
                  <option>Portefeuille</option>
                  <option>Stratégie</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreate(false)}
                  className="px-3 py-1.5 text-xs text-gray-400 hover:text-white"
                >
                  {t('common:cancel', 'Annuler')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#D4AF37] text-black text-xs rounded-full hover:bg-[#e0c58b]"
                >
                  {t('common:create', 'Créer le rapport')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
