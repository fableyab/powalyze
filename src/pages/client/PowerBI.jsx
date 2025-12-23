import React, { useState } from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { useResponsive } from '../../../hooks/useResponsive';

/**
 * Page Power BI - Intégration complète des rapports
 * NOUVELLE PAGE requise par l'utilisateur
 */
const PowerBI = () => {
  const { isMobile, isTablet } = useResponsive();
  const [selectedReport, setSelectedReport] = useState('overview');

  // Configuration des rapports Power BI
  // TODO: Remplacer par vos vrais IDs de rapports Power BI
  const reports = [
    {
      id: 'overview',
      name: 'Vue d\'ensemble',
      description: 'Tableau de bord général avec les KPI principaux',
      icon: '📊',
      embedUrl: 'https://app.powerbi.com/view?r=YOUR_REPORT_ID_1',
      category: 'general',
    },
    {
      id: 'projects',
      name: 'Analyse des projets',
      description: 'Suivi détaillé de l\'avancement des projets',
      icon: '📁',
      embedUrl: 'https://app.powerbi.com/view?r=YOUR_REPORT_ID_2',
      category: 'projects',
    },
    {
      id: 'finance',
      name: 'Analyse financière',
      description: 'Budget, coûts et prévisions financières',
      icon: '💰',
      embedUrl: 'https://app.powerbi.com/view?r=YOUR_REPORT_ID_3',
      category: 'finance',
    },
    {
      id: 'resources',
      name: 'Ressources humaines',
      description: 'Allocation des équipes et charge de travail',
      icon: '👥',
      embedUrl: 'https://app.powerbi.com/view?r=YOUR_REPORT_ID_4',
      category: 'resources',
    },
    {
      id: 'performance',
      name: 'Performance',
      description: 'Indicateurs de performance et productivité',
      icon: '📈',
      embedUrl: 'https://app.powerbi.com/view?r=YOUR_REPORT_ID_5',
      category: 'performance',
    },
  ];

  const currentReport = reports.find((r) => r.id === selectedReport);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Power BI Analytics
        </h1>
        <p className="text-dark-300">
          Visualisez et analysez vos données en temps réel
        </p>
      </div>

      {/* Info Banner */}
      <Card variant="highlight" padding="normal">
        <div className="flex items-start space-x-3">
          <span className="text-2xl">💡</span>
          <div>
            <h3 className="text-white font-semibold mb-1">
              Rapports interactifs Power BI
            </h3>
            <p className="text-dark-300 text-sm">
              Utilisez les filtres et interactions dans les rapports ci-dessous pour explorer vos données.
              Les rapports sont mis à jour automatiquement toutes les heures.
            </p>
          </div>
        </div>
      </Card>

      {/* Sélecteur de rapports (Mobile/Tablet: Dropdown, Desktop: Tabs) */}
      {isMobile || isTablet ? (
        <Card padding="small">
          <select
            value={selectedReport}
            onChange={(e) => setSelectedReport(e.target.value)}
            className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold-primary"
          >
            {reports.map((report) => (
              <option key={report.id} value={report.id}>
                {report.icon} {report.name}
              </option>
            ))}
          </select>
        </Card>
      ) : (
        <Card padding="small">
          <div className="flex flex-wrap gap-2">
            {reports.map((report) => (
              <button
                key={report.id}
                onClick={() => setSelectedReport(report.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedReport === report.id
                    ? 'bg-gold-primary text-dark-primary shadow-lg'
                    : 'bg-dark-700 text-dark-200 hover:bg-dark-600 hover:text-white'
                }`}
              >
                <span className="mr-2">{report.icon}</span>
                {report.name}
              </button>
            ))}
          </div>
        </Card>
      )}

      {/* Description du rapport sélectionné */}
      <Card padding="normal">
        <div className="flex items-start space-x-3">
          <span className="text-3xl">{currentReport.icon}</span>
          <div>
            <h2 className="text-xl font-bold text-white mb-1">
              {currentReport.name}
            </h2>
            <p className="text-dark-300">{currentReport.description}</p>
          </div>
        </div>
      </Card>

      {/* Power BI Embed */}
      <Card padding="none" className="overflow-hidden">
        {currentReport.embedUrl.includes('YOUR_REPORT_ID') ? (
          /* Placeholder si pas encore configuré */
          <div className="relative bg-gradient-to-br from-dark-800 to-dark-900 border-2 border-dashed border-dark-600">
            <div className="flex flex-col items-center justify-center p-12 md:p-20 text-center">
              <div className="mb-6 w-24 h-24 bg-dark-700 rounded-2xl flex items-center justify-center text-5xl">
                {currentReport.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Rapport Power BI: {currentReport.name}
              </h3>
              <p className="text-dark-300 mb-6 max-w-md">
                Cette zone affichera le rapport Power BI intégré. Pour activer l'intégration:
              </p>
              <div className="bg-dark-800 rounded-lg p-6 text-left max-w-2xl w-full space-y-3 text-sm">
                <div className="flex items-start space-x-3">
                  <span className="text-gold-primary font-bold">1.</span>
                  <div>
                    <p className="text-white font-medium">Publiez votre rapport sur Power BI Service</p>
                    <p className="text-dark-400 text-xs mt-1">app.powerbi.com → Publier</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-gold-primary font-bold">2.</span>
                  <div>
                    <p className="text-white font-medium">Partagez le rapport et récupérez le lien d'intégration</p>
                    <p className="text-dark-400 text-xs mt-1">Fichier → Intégrer → Publier sur le web</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-gold-primary font-bold">3.</span>
                  <div>
                    <p className="text-white font-medium">Remplacez 'YOUR_REPORT_ID' par l'ID réel</p>
                    <p className="text-dark-400 text-xs mt-1">Dans src/pages/client/PowerBI.jsx</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3 justify-center">
                <a
                  href="https://docs.microsoft.com/fr-fr/power-bi/collaborate-share/service-embed-secure"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="primary">
                    📖 Documentation Power BI
                  </Button>
                </a>
                <a
                  href="https://app.powerbi.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline">
                    🔗 Ouvrir Power BI Service
                  </Button>
                </a>
              </div>
            </div>
          </div>
        ) : (
          /* Iframe Power BI réel */
          <div className="relative" style={{ height: isMobile ? '500px' : isTablet ? '600px' : '800px' }}>
            <iframe
              title={currentReport.name}
              src={currentReport.embedUrl}
              className="w-full h-full border-0"
              allowFullScreen
            />
          </div>
        )}
      </Card>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <Button
          variant="outline"
          onClick={() => window.open(currentReport.embedUrl, '_blank')}
        >
          🔗 Ouvrir en plein écran
        </Button>
        <Button variant="ghost">
          📥 Exporter en PDF
        </Button>
        <Button variant="ghost">
          📊 Planifier un rapport
        </Button>
      </div>

      {/* Info supplémentaires */}
      <Card title="À propos de Power BI" padding="normal">
        <div className="space-y-4 text-dark-300">
          <div>
            <h4 className="text-white font-medium mb-2">🔄 Actualisation des données</h4>
            <p className="text-sm">
              Les rapports sont automatiquement actualisés toutes les heures. 
              La dernière actualisation a eu lieu aujourd'hui à {new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}.
            </p>
          </div>
          <div>
            <h4 className="text-white font-medium mb-2">🔒 Sécurité et confidentialité</h4>
            <p className="text-sm">
              Vos données sont protégées et seuls les utilisateurs autorisés peuvent accéder à ces rapports.
              L'intégration utilise l'authentification sécurisée Power BI Embedded.
            </p>
          </div>
          <div>
            <h4 className="text-white font-medium mb-2">💡 Besoin d'aide ?</h4>
            <p className="text-sm">
              Consultez notre <a href="/support" className="text-gold-primary hover:underline">centre d'aide</a> ou 
              contactez le <a href="/contact" className="text-gold-primary hover:underline">support technique</a> pour toute question.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PowerBI;
