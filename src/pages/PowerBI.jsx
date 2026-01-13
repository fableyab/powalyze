import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BarChart3, Star, Eye, Upload, Search, LayoutGrid, List, RefreshCw, Filter, Play, AlertCircle, Loader2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getPowerBIToken } from '@/api/powerbiToken';
import * as powerbi from 'powerbi-client';

const PowerBI = () => {
  const [searchParams] = useSearchParams();
  const reportIdFromUrl = searchParams.get('reportId');
  const reportTypeFromUrl = searchParams.get('report'); // NEW: Support ?report=commercial
  
  const [activeView, setActiveView] = useState('gallery'); // 'gallery' or 'embedded'
  const [selectedReport, setSelectedReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [embedConfig, setEmbedConfig] = useState(null);
  const reportContainerRef = useRef(null);
  const embeddedReportRef = useRef(null);

  // Mapping report types to IDs
  const reportTypeToId = {
    'commercial': 'report-1',
    'finance': 'report-2',
    'pmo': 'report-3',
    'predictive': 'report-4',
    'operational': 'report-5',
    'strategic': 'report-6'
  };

  // Rapports disponibles (simulés - à remplacer par vos vrais IDs)
  const reports = [
    {
      id: 'report-1',
      type: 'commercial',
      title: 'Dashboard Commercial',
      description: 'Analyse des performances commerciales et KPIs ventes',
      tag: 'Ventes',
      date: '2025-01-15',
      views: 249,
      color: 'from-blue-500 to-blue-600',
      favorite: true
    },
    {
      id: 'report-2',
      type: 'finance',
      title: 'Analyse Financière Q4',
      description: 'Indicateurs financiers et prévisions budgétaires',
      tag: 'Finance',
      date: '2025-01-10',
      views: 156,
      color: 'from-emerald-500 to-emerald-600',
      favorite: false
    },
    {
      id: 'report-3',
      type: 'pmo',
      title: 'KPIs Projet PMO',
      description: 'Suivi de portefeuille et gouvernance projets',
      tag: 'PMO',
      date: '2025-01-05',
      views: 342,
      color: 'from-purple-500 to-purple-600',
      favorite: true
    },
    {
      id: 'report-4',
      type: 'predictive',
      title: 'Analyse Prédictive Q2',
      description: 'Prévisions et tendances basées sur IA',
      tag: 'IA',
      date: '2025-01-08',
      views: 189,
      color: 'from-purple-500 to-pink-600',
      favorite: false
    },
    {
      id: 'report-5',
      type: 'operational',
      title: 'Efficacité Opérationnelle',
      description: 'Analyse des processus et optimisations',
      tag: 'Ops',
      date: '2025-01-05',
      views: 278,
      color: 'from-amber-500 to-orange-600',
      favorite: false
    },
    {
      id: 'report-6',
      type: 'strategic',
      title: 'Roadmap Stratégique 2026',
      description: 'Feuille de route et planification annuelle',
      tag: 'Stratégie',
      date: '2024-12-28',
      views: 421,
      color: 'from-indigo-500 to-blue-600',
      favorite: true
    }
  ];

  // Auto-load report if reportId OR report type is in URL
  useEffect(() => {
    let targetReportId = reportIdFromUrl;
    
    // If ?report= parameter exists, map it to reportId
    if (reportTypeFromUrl && reportTypeToId[reportTypeFromUrl]) {
      targetReportId = reportTypeToId[reportTypeFromUrl];
    }
    
    if (targetReportId) {
      const report = reports.find(r => r.id === targetReportId);
      if (report) {
        loadReport(report);
      }
    }
  }, [reportIdFromUrl, reportTypeFromUrl]);

  const loadReport = async (report) => {
    setLoading(true);
    setError(null);
    setSelectedReport(report);
    setActiveView('embedded');

    try {
      // Get Power BI token from backend using report TYPE (not ID)
      const tokenData = await getPowerBIToken(report.type);
      
      // Check if we got mock data (API not configured)
      if (tokenData.isMock) {
        setError(`⚠️ Configuration Metabase requise\n\n${tokenData.configMessage}\n\nRapport: ${report.title}\nType: ${report.type}\n\nÉtapes:\n1. Installez Metabase via Docker (voir METABASE_SETUP.md)\n2. Configurez vos dashboards dans Metabase\n3. Ajoutez VITE_METABASE_URL et VITE_METABASE_SECRET_KEY dans .env\n\nPour une intégration complète, utilisez PowerBIHub (route /powerbi-hub)`);
        setLoading(false);
        return;
      }
      
      setEmbedConfig(tokenData);
      
      // Power BI Embedded configuration
      const config = {
        type: 'report',
        id: tokenData.reportId,
        embedUrl: tokenData.embedUrl,
        accessToken: tokenData.accessToken,
        tokenType: powerbi.models.TokenType.Embed,
        settings: {
          panes: {
            filters: { visible: true, expanded: false },
            pageNavigation: { visible: true, position: powerbi.models.PageNavigationPosition.Left }
          },
          background: powerbi.models.BackgroundType.Transparent,
          layoutType: powerbi.models.LayoutType.Custom,
          customLayout: {
            displayOption: powerbi.models.DisplayOption.FitToWidth
          }
        }
      };

      // Initialize Power BI service
      const powerbiService = new powerbi.service.Service(
        powerbi.factories.hpmFactory,
        powerbi.factories.wpmpFactory,
        powerbi.factories.routerFactory
      );

      // Embed the report
      if (reportContainerRef.current) {
        embeddedReportRef.current = powerbiService.embed(reportContainerRef.current, config);
        
        // Handle events
        embeddedReportRef.current.on('loaded', () => {
          console.log('✅ Report loaded successfully');
          setLoading(false);
        });

        embeddedReportRef.current.on('error', (event) => {
          console.error('❌ Power BI error:', event.detail);
          const errorDetail = event.detail;
          const errorMsg = errorDetail?.message || 'Erreur inconnue';
          const errorCode = errorDetail?.detailedMessage || errorDetail?.errorCode || 'N/A';
          setError(`${errorMsg} (Code: ${errorCode})`);
          setLoading(false);
        });

        embeddedReportRef.current.on('rendered', () => {
          console.log('Report rendered');
        });
      }
      
    } catch (err) {
      console.error('Power BI Embed Error:', err);
      const errorMsg = err.message || 'Erreur lors du chargement du rapport Power BI';
      const errorStack = err.stack ? `\n\nStack: ${err.stack.substring(0, 200)}...` : '';
      setError(`${errorMsg}${errorStack}`);
      setLoading(false);
    }
  };

  const refreshReport = () => {
    if (selectedReport) {
      loadReport(selectedReport);
    }
  };

  const backToGallery = () => {
    setActiveView('gallery');
    setSelectedReport(null);
    setError(null);
    setEmbedConfig(null);
  };

  // Vue Gallery (liste des rapports)
  if (activeView === 'gallery') {
    return (
      <div className="min-h-full bg-[#000000] text-white p-4 sm:p-6 md:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-2.5 sm:p-3 bg-[#D4AF37] rounded-xl">
              <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-[#000000]" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-light text-white">Power BI</h1>
              <p className="text-white/50 text-xs sm:text-sm font-light">Rapports analytiques en temps réel</p>
            </div>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button className="flex-1 sm:flex-none bg-[#D4AF37] hover:bg-[#B8976A] text-[#000000] gap-2 font-light">
              <Upload className="w-4 h-4" /> Importer
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <StatCard label="Rapports" value={reports.length.toString()} icon={BarChart3} />
          <StatCard label="Actifs" value={reports.length.toString()} icon={Play} />
          <StatCard label="Vues" value="747" icon={Eye} />
          <StatCard label="Favoris" value={reports.filter(r => r.favorite).length.toString()} icon={Star} />
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4 mb-6">
          <div className="relative flex-1 max-w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input 
              type="text" 
              placeholder="Rechercher un rapport..." 
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#D4AF37] text-white placeholder:text-white/30 font-light text-sm"
            />
          </div>
          <div className="flex bg-white/5 p-1 rounded-lg border border-white/10 self-end">
            <button className="p-2 bg-[#D4AF37] rounded text-[#000000]">
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button className="p-2 text-white/50 hover:text-white">
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {reports.map((report) => (
            <ReportCard 
              key={report.id}
              report={report}
              onOpen={() => loadReport(report)}
            />
          ))}
        </div>
      </div>
    );
  }

  // Vue Embedded (rapport Power BI actif)
  return (
    <div className="min-h-full bg-[#000000] text-white p-4 sm:p-6 md:p-8">
      {/* Header avec navigation */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <button 
            onClick={backToGallery}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors border border-white/10 flex-shrink-0"
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
          <div className="min-w-0 flex-1">
            <h1 className="text-xl sm:text-2xl font-light text-white truncate">{selectedReport?.title || 'Rapport Power BI'}</h1>
            <p className="text-white/50 text-xs sm:text-sm font-light line-clamp-1">{selectedReport?.description}</p>
          </div>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button 
            onClick={refreshReport}
            variant="outline"
            className="flex-1 sm:flex-none border-white/10 text-white hover:bg-white/5 gap-2 font-light text-sm"
            disabled={loading}
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Actualiser</span>
          </Button>
          <Button className="flex-1 sm:flex-none bg-[#D4AF37] hover:bg-[#B8976A] text-[#000000] gap-2 font-light text-sm">
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filtres</span>
          </Button>
          {embedConfig && (
            <Button 
              onClick={() => window.open(embedConfig.embedUrl, '_blank')}
              variant="outline"
              className="flex-1 sm:flex-none border-white/10 text-white hover:bg-white/5 gap-2 font-light text-sm"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden sm:inline">Ouvrir</span>
            </Button>
          )}
        </div>
      </div>

      {/* Zone d'embed Power BI */}
      <div className="relative">
        {loading && (
          <div className="absolute inset-0 bg-[#000000]/90 backdrop-blur-sm z-10 flex items-center justify-center rounded-xl border border-white/10">
            <div className="flex flex-col items-center gap-4 p-4">
              <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 animate-spin text-[#D4AF37]" />
              <p className="text-white/70 font-light text-sm sm:text-base">Chargement du rapport...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 bg-[#000000]/90 backdrop-blur-sm z-10 flex items-center justify-center rounded-xl border border-red-500/20">
            <div className="flex flex-col items-center gap-4 p-6 sm:p-8 text-center max-w-2xl">
              <AlertCircle className="w-10 h-10 sm:w-12 sm:h-12 text-red-400" />
              <p className="text-white font-light text-base sm:text-lg">Erreur de chargement</p>
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 w-full">
                <p className="text-red-200 text-xs sm:text-sm font-mono text-left whitespace-pre-wrap break-all">{error}</p>
              </div>
              <Button 
                onClick={backToGallery}
                className="bg-[#D4AF37] hover:bg-[#B8976A] text-[#000000] font-light"
              >
                Retour à la galerie
              </Button>
            </div>
          </div>
        )}

        {embedConfig && !loading && !error && (
          <div 
            ref={reportContainerRef}
            className="w-full h-[60vh] sm:h-[70vh] lg:h-[calc(100vh-220px)] rounded-xl border border-[#D4AF37]/30 overflow-hidden bg-white/[0.02]"
            style={{ minHeight: '400px' }}
          />
        )}

        {!embedConfig && !loading && !error && (
          <div className="w-full h-[60vh] sm:h-[70vh] lg:h-[calc(100vh-220px)] rounded-xl border border-white/10 bg-white/5 flex items-center justify-center" style={{ minHeight: '400px' }}>
            <div className="text-center p-4">
              <BarChart3 className="w-12 h-12 sm:w-16 sm:h-16 text-white/20 mx-auto mb-4" />
              <p className="text-white/50 font-light text-sm sm:text-base">Sélectionnez un rapport pour commencer</p>
            </div>
          </div>
        )}
      </div>

      {/* Info bar */}
      {selectedReport && (
        <div className="flex items-center justify-between mt-4 px-4 py-3 bg-white/5 rounded-lg border border-white/10">
          <div className="flex items-center gap-6 text-sm font-light">
            <span className="text-white/50">
              Rapport : <span className="text-white">{selectedReport?.id}</span>
            </span>
            <span className="text-white/50">
              Catégorie : <span className="text-[#D4AF37]">{selectedReport?.tag}</span>
            </span>
            <span className="text-white/50">
              Dernière mise à jour : <span className="text-white">{selectedReport?.date}</span>
            </span>
          </div>
          <div className="flex items-center gap-2 text-white/50 text-sm">
            <Eye className="w-4 h-4" />
            <span>{selectedReport?.views} vues</span>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ label, value, icon: Icon }) => (
  <div className="rounded-xl p-6 bg-white/5 border border-white/10 flex justify-between items-center hover:bg-white/10 transition-colors">
    <div>
      <p className="text-xs text-white/50 uppercase font-light tracking-wider mb-2">{label}</p>
      <p className="text-3xl font-light text-white">{value}</p>
    </div>
    <div className="bg-[#D4AF37]/20 p-3 rounded-lg">
      <Icon className="w-6 h-6 text-[#D4AF37]" />
    </div>
  </div>
);

const ReportCard = ({ report, onOpen }) => (
  <div 
    onClick={onOpen}
    className="border border-white/10 rounded-xl overflow-hidden hover:border-[#D4AF37]/50 transition-all bg-white/5 group cursor-pointer"
  >
    <div className={`h-40 bg-gradient-to-br ${report.color} relative p-4 flex flex-col justify-between group-hover:opacity-90 transition-opacity`}>
      <div className="self-end">
        <Star 
          className={`w-5 h-5 cursor-pointer transition-colors ${
            report.favorite ? 'text-[#D4AF37] fill-[#D4AF37]' : 'text-white/30 hover:text-[#D4AF37]'
          }`}
        />
      </div>
      <div className="flex items-center gap-2">
        <BarChart3 className="w-8 h-8 text-white/80" />
      </div>
    </div>
    <div className="p-5">
      <h3 className="font-light text-lg text-white mb-2">{report.title}</h3>
      <p className="text-sm text-white/50 font-light mb-4">{report.description}</p>
      <div className="flex items-center justify-between">
        <span className="bg-[#D4AF37]/20 text-[#D4AF37] px-3 py-1 rounded-full text-xs font-light border border-[#D4AF37]/30">
          {report.tag}
        </span>
        <div className="flex items-center gap-4 text-xs text-white/50 font-light">
          <span className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            {report.views}
          </span>
          <span>{report.date}</span>
        </div>
      </div>
    </div>
  </div>
);

export default PowerBI;