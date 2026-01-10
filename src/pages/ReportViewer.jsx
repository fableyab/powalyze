import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import { ArrowLeft, AlertCircle, Loader2 } from 'lucide-react';
import { getReportById } from '@/lib/powerbi-reports';

/**
 * Viewer dynamique pour afficher un rapport Power BI
 * Route: /app/reports/:id
 * 🔐 Utilise un token généré côté serveur (sécurisé)
 */
const ReportViewer = () => {
  const { id } = useParams();
  const report = getReportById(id);
  
  const [token, setToken] = useState(null);
  const [embedUrl, setEmbedUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSecureToken() {
      if (!report) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // 🔐 Appel API backend sécurisé (pas de secrets dans le navigateur)
        const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';
        const response = await fetch(`${backendUrl}/api/powerbi/token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            reportType: id, // portfolio, projects, capacity
            reportId: report.reportId,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch token');
        }

        const data = await response.json();
        setToken(data.token);
        setEmbedUrl(data.embedUrl);
        setLoading(false);

        console.log(`✅ Token obtenu pour ${report.name} (expire: ${data.expiration})`);
      } catch (err) {
        console.error('❌ Erreur token Power BI:', err);
        setError(err.message);
        setLoading(false);
      }
    }

    fetchSecureToken();
  }, [id, report]);

  if (!report) {
    return (
      <div className="p-6 space-y-6">
        <Link
          to="/app/reports"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux rapports
        </Link>

        <div className="p-6 rounded-xl bg-slate-900/50 border border-red-500/20">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 mt-1" />
            <div>
              <h1 className="text-xl font-bold text-white mb-2">Rapport introuvable</h1>
              <p className="text-slate-400">
                Le rapport avec l'ID "<code className="px-2 py-1 bg-slate-800 rounded text-[#4A9EFF]">{id}</code>" n'existe pas dans la configuration.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <Link
          to="/app/reports"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux rapports
        </Link>

        <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-[#4A9EFF]" />
          <p className="text-slate-400">Génération du token sécurisé...</p>
          <p className="text-xs text-slate-500">{report.name}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 space-y-6">
        <Link
          to="/app/reports"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux rapports
        </Link>

        <div className="p-6 rounded-xl bg-slate-900/50 border border-yellow-500/20">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-400 mt-1" />
            <div>
              <h1 className="text-xl font-bold text-white mb-2">Erreur de configuration</h1>
              <p className="text-slate-400 mb-4">
                Impossible de générer le token Power BI pour "<strong>{report.name}</strong>".
              </p>
              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800">
                <p className="text-xs text-red-400 font-mono">{error}</p>
              </div>
              <div className="mt-4 p-4 rounded-lg bg-slate-950 border border-slate-800">
                <p className="text-xs text-slate-400 mb-2">Vérifiez les variables backend :</p>
                <pre className="text-xs text-slate-500">
{`PBI_TENANT_ID=xxx
PBI_CLIENT_ID=xxx
PBI_CLIENT_SECRET=xxx
PBI_WORKSPACE_ID=xxx
PBI_REPORT_${id.toUpperCase()}_ID=xxx`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header avec retour */}
      <div className="flex items-center justify-between">
        <Link
          to="/app/reports"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux rapports
        </Link>
        <span className="text-xs text-slate-500">🔐 Token sécurisé backend</span>
      </div>

      {/* Titre du rapport */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">{report.name}</h1>
        <p className="text-slate-400">{report.description}</p>
      </div>

      {/* Power BI Embed */}
      <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
        <PowerBIEmbed
          embedConfig={{
            type: 'report',
            id: report.reportId,
            embedUrl: embedUrl,
            accessToken: token,
            tokenType: models.TokenType.Embed,
            settings: {
              panes: {
                filters: { expanded: false, visible: true },
                pageNavigation: { visible: true },
              },
              background: models.BackgroundType.Transparent,
            },
          }}
          eventHandlers={
            new Map([
              ['loaded', () => console.log(`✅ Rapport ${report.name} chargé`)],
              ['rendered', () => console.log(`✅ Rapport ${report.name} rendu`)],
              ['error', (event) => console.error('❌ Erreur Power BI:', event.detail)],
            ])
          }
          cssClassName="powerbi-report-container"
          getEmbeddedComponent={(embeddedReport) => {
            window.report = embeddedReport;
          }}
        />
      </div>
    </div>
  );
};

export default ReportViewer;
