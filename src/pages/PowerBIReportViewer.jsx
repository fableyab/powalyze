import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import { ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getReportById } from '@/data/powerbiReports';

/**
 * 📊 Power BI Report Viewer
 * Affiche un rapport Power BI avec token sécurisé généré par le backend
 */
const PowerBIReportViewer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const report = getReportById(id);

  useEffect(() => {
    async function fetchToken() {
      if (!report) {
        setError('Rapport introuvable');
        setLoading(false);
        return;
      }

      if (!report.reportId) {
        setError('Configuration Power BI manquante. Vérifiez vos variables d\'environnement.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Appel au backend Express pour générer le token
        const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';
        const response = await fetch(`${backendUrl}/api/powerbi/token`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reportId: report.reportId }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Échec de génération du token');
        }

        const data = await response.json();
        setToken(data.token);
      } catch (err) {
        console.error('❌ Token Error:', err);
        setError(err.message || 'Impossible de charger le rapport');
      } finally {
        setLoading(false);
      }
    }

    fetchToken();
  }, [report, id]);

  // Rapport introuvable
  if (!report) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <Button 
          variant="outline" 
          onClick={() => navigate('/app/reports')}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour aux rapports
        </Button>
        <div className="p-8 text-center bg-slate-900/50 rounded-xl border border-slate-800">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Rapport introuvable</h2>
          <p className="text-slate-400">Le rapport demandé n'existe pas.</p>
        </div>
      </div>
    );
  }

  // Chargement
  if (loading) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <Button 
          variant="outline" 
          onClick={() => navigate('/app/reports')}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour aux rapports
        </Button>
        <div className="p-12 text-center bg-slate-900/50 rounded-xl border border-slate-800">
          <Loader2 className="w-12 h-12 text-[#4A9EFF] animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Chargement du rapport…</h2>
          <p className="text-slate-400">Génération du token sécurisé en cours…</p>
        </div>
      </div>
    );
  }

  // Erreur
  if (error) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <Button 
          variant="outline" 
          onClick={() => navigate('/app/reports')}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour aux rapports
        </Button>
        <div className="p-8 text-center bg-slate-900/50 rounded-xl border border-red-900/50">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Erreur de chargement</h2>
          <p className="text-slate-400 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Réessayer
          </Button>
        </div>
      </div>
    );
  }

  // Affichage du rapport
  return (
    <div className="p-6 space-y-4 max-w-[2000px] mx-auto">
      {/* Header avec bouton retour */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => navigate('/app/reports')}
            className="border-slate-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-white">{report.name}</h1>
            <p className="text-sm text-slate-400">{report.description}</p>
          </div>
        </div>
      </div>

      {/* Power BI Embed */}
      <div className="rounded-xl overflow-hidden shadow-2xl bg-white border border-slate-800">
        <PowerBIEmbed
          embedConfig={{
            type: 'report',
            id: report.reportId,
            embedUrl: report.embedUrl,
            accessToken: token,
            tokenType: models.TokenType.Embed,
            settings: {
              panes: {
                filters: { visible: false },
                pageNavigation: { visible: true },
              },
              background: models.BackgroundType.Transparent,
            },
          }}
          cssClassName="powerbi-report-container"
          style={{ height: '85vh', width: '100%' }}
        />
      </div>
    </div>
  );
};

export default PowerBIReportViewer;
