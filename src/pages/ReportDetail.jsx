import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Download, Share2, Eye, TrendingUp, Brain, FileText, 
  ExternalLink, Sparkles, CheckCircle2, AlertTriangle, Calendar,
  Users, Target, Send, Printer
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const ReportDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState(null);

  // Mock data - remplacer par API call
  const report = {
    id: id,
    name: 'Financial Overview Q1 2026',
    category: 'Financier',
    description: 'Vue consolidée des performances financières du premier trimestre',
    date: 'Jan 15, 2026',
    author: 'Fabrice Fays',
    status: 'finalized',
    linkedModule: '/app/projects',
    linkedModuleName: 'Projets',
    powerBiReportId: 'report-1',
    tags: ['Finance', 'Q1', 'Budget', 'Stratégie'],
    metrics: {
      revenue: 'CHF 2.4M',
      growth: '+12%',
      projects: '24',
      budget: '95%'
    }
  };

  const handleAIAnalyze = async () => {
    setLoading(true);
    toast({
      title: "🤖 Analyse IA en cours",
      description: "Génération de la synthèse exécutive...",
      duration: 3000
    });

    // Simulation d'appel API
    setTimeout(() => {
      setAiAnalysis({
        summary: "Le rapport financier Q1 2026 montre une croissance solide de 12% par rapport à Q4 2025. Les principaux moteurs sont l'augmentation des revenus récurrents (+18%) et l'optimisation des coûts opérationnels (-8%).",
        insights: [
          {
            type: 'positive',
            title: 'Performance exceptionnelle',
            description: 'Dépassement des objectifs de 15% sur les revenus récurrents'
          },
          {
            type: 'warning',
            title: 'Zone d\'attention',
            description: 'Augmentation des délais de paiement clients de 5 jours en moyenne'
          },
          {
            type: 'action',
            title: 'Opportunité détectée',
            description: 'Potentiel d\'optimisation de 12% sur les coûts de structure'
          }
        ],
        recommendations: [
          'Renforcer le suivi des créances clients avec un processus de relance automatisé',
          'Investir dans l\'automatisation des processus comptables pour réduire les coûts',
          'Capitaliser sur la croissance des revenus récurrents en augmentant l\'acquisition'
        ]
      });

      setLoading(false);
      toast({
        title: "✅ Analyse terminée",
        description: "La synthèse exécutive est prête",
        duration: 3000
      });
    }, 3000);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`https://powalyze.com/reports/${id}`);
    toast({
      title: "🔗 Lien copié",
      description: "Le lien sécurisé a été copié",
      duration: 2000
    });
  };

  const handleExport = (format) => {
    toast({
      title: `📄 Export ${format.toUpperCase()}`,
      description: `Téléchargement en cours...`,
      duration: 2000
    });
  };

  const handleViewInPowerBI = () => {
    navigate(`/app/powerbi?reportId=${report.powerBiReportId}`);
  };

  const handleViewModule = () => {
    navigate(report.linkedModule);
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white">
      <div className="max-w-7xl mx-auto p-8 space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            onClick={() => navigate('/app/reports')}
            variant="ghost"
            className="text-[#D4AF37] hover:text-white hover:bg-white/5"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux rapports
          </Button>

          <div className="flex items-center gap-2">
            <Button
              onClick={handleShare}
              variant="outline"
              className="border-white/10 text-white/70 hover:border-[#4A9EFF] hover:bg-[#4A9EFF]/10"
              size="sm"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Partager
            </Button>
            <Button
              onClick={() => handleExport('pdf')}
              variant="outline"
              className="border-white/10 text-white/70 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10"
              size="sm"
            >
              <Download className="w-4 h-4 mr-2" />
              PDF
            </Button>
            <Button
              onClick={() => handleExport('pptx')}
              variant="outline"
              className="border-white/10 text-white/70 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10"
              size="sm"
            >
              <Send className="w-4 h-4 mr-2" />
              PowerPoint
            </Button>
            <Button
              onClick={() => window.print()}
              variant="outline"
              className="border-white/10 text-white/70 hover:border-white/30"
              size="sm"
            >
              <Printer className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Title Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-4 bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border border-emerald-500/20 rounded-xl">
              <FileText className="w-8 h-8 text-emerald-500" />
            </div>
            <div>
              <h1 className="text-4xl font-extralight text-white">{report.name}</h1>
              <p className="text-white/50 mt-2">{report.description}</p>
            </div>
          </div>

          {/* Metadata */}
          <div className="flex items-center gap-6 text-sm text-white/40">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {report.date}
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              {report.author}
            </div>
            <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-500 text-xs">
              Finalisé
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {report.tags.map((tag, i) => (
              <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/60">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            onClick={handleViewInPowerBI}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white h-16 justify-start px-6"
          >
            <TrendingUp className="w-5 h-5 mr-3" />
            <div className="text-left">
              <div className="font-medium">Ouvrir dans Power BI</div>
              <div className="text-xs opacity-80">Vue dynamique et interactive</div>
            </div>
          </Button>

          <Button
            onClick={handleViewModule}
            className="bg-gradient-to-r from-[#D4AF37] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#A78747] text-black h-16 justify-start px-6"
          >
            <ExternalLink className="w-5 h-5 mr-3" />
            <div className="text-left">
              <div className="font-medium">Voir dans {report.linkedModuleName}</div>
              <div className="text-xs opacity-80">Accéder au module lié</div>
            </div>
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-6 bg-white/[0.02] border border-white/5 rounded-xl">
            <div className="text-3xl font-extralight text-white mb-2">{report.metrics.revenue}</div>
            <div className="text-xs text-white/50 uppercase tracking-wider">Revenue</div>
          </div>
          <div className="p-6 bg-white/[0.02] border border-white/5 rounded-xl">
            <div className="text-3xl font-extralight text-green-500 mb-2">{report.metrics.growth}</div>
            <div className="text-xs text-white/50 uppercase tracking-wider">Croissance</div>
          </div>
          <div className="p-6 bg-white/[0.02] border border-white/5 rounded-xl">
            <div className="text-3xl font-extralight text-white mb-2">{report.metrics.projects}</div>
            <div className="text-xs text-white/50 uppercase tracking-wider">Projets</div>
          </div>
          <div className="p-6 bg-white/[0.02] border border-white/5 rounded-xl">
            <div className="text-3xl font-extralight text-amber-500 mb-2">{report.metrics.budget}</div>
            <div className="text-xs text-white/50 uppercase tracking-wider">Budget utilisé</div>
          </div>
        </div>

        {/* AI Analysis Section */}
        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <Brain className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <h2 className="text-xl font-light text-white">Analyse IA</h2>
                <p className="text-sm text-white/50">Synthèse exécutive générée par intelligence artificielle</p>
              </div>
            </div>

            {!aiAnalysis && (
              <Button
                onClick={handleAIAnalyze}
                disabled={loading}
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white"
              >
                {loading ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                    Analyse en cours...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Générer l'analyse
                  </>
                )}
              </Button>
            )}
          </div>

          {aiAnalysis && (
            <div className="space-y-6">
              {/* Summary */}
              <div className="p-4 bg-purple-500/5 border border-purple-500/10 rounded-lg">
                <h3 className="text-sm font-medium text-purple-400 mb-2">📊 Synthèse Exécutive</h3>
                <p className="text-white/80 font-light leading-relaxed">{aiAnalysis.summary}</p>
              </div>

              {/* Insights */}
              <div>
                <h3 className="text-sm font-medium text-white/70 mb-3 uppercase tracking-wider">Insights Clés</h3>
                <div className="space-y-3">
                  {aiAnalysis.insights.map((insight, i) => {
                    const config = {
                      positive: { icon: CheckCircle2, color: 'green', bg: 'bg-green-500/5', border: 'border-green-500/20' },
                      warning: { icon: AlertTriangle, color: 'amber', bg: 'bg-amber-500/5', border: 'border-amber-500/20' },
                      action: { icon: Target, color: 'blue', bg: 'bg-blue-500/5', border: 'border-blue-500/20' }
                    }[insight.type];

                    return (
                      <div key={i} className={`p-4 ${config.bg} border ${config.border} rounded-lg flex items-start gap-3`}>
                        <config.icon className={`w-5 h-5 text-${config.color}-500 shrink-0 mt-0.5`} />
                        <div>
                          <h4 className={`text-sm font-medium text-${config.color}-400 mb-1`}>{insight.title}</h4>
                          <p className="text-white/70 text-sm font-light">{insight.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <h3 className="text-sm font-medium text-white/70 mb-3 uppercase tracking-wider">Recommandations</h3>
                <div className="space-y-2">
                  {aiAnalysis.recommendations.map((rec, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-white/[0.02] border border-white/5 rounded-lg">
                      <div className="w-6 h-6 rounded-full bg-[#4A9EFF]/20 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-xs text-[#4A9EFF] font-medium">{i + 1}</span>
                      </div>
                      <p className="text-white/80 text-sm font-light">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportDetail;
