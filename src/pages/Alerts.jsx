
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import CockpitLayout from '@/components/layout/CockpitLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { 
  Search, 
  Flame, 
  AlertTriangle, 
  TrendingDown, 
  Target,
  Theater,
  Gavel,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ChevronRight,
  Filter,
  Download
} from 'lucide-react';

// Mock data - Risk Intelligence
const mockRisks = [
  {
    id: 1,
    title: 'Dérive budgétaire Projet Alpha',
    domain: 'Finance',
    stream: 'Financial',
    severity: 'Critical',
    impact: 5,
    probability: 4,
    status: 'Active',
    date: '2026-01-05',
    description: 'Budget dépassé de 18% au T4',
    decisionHook: 'Faut-il réduire le périmètre ?'
  },
  {
    id: 2,
    title: 'Retard livraison Q1 Commercial',
    domain: 'PMO',
    stream: 'Operational',
    severity: 'High',
    impact: 4,
    probability: 5,
    status: 'Active',
    date: '2026-01-04',
    description: '3 sprints de retard sur roadmap',
    decisionHook: 'Faut-il replanifier ?'
  },
  {
    id: 3,
    title: 'Compression marges produit B',
    domain: 'Commercial',
    stream: 'Financial',
    severity: 'High',
    impact: 4,
    probability: 4,
    status: 'Active',
    date: '2026-01-03',
    description: 'Marges passées de 32% à 24%',
    decisionHook: 'Faut-il escalader au Comex ?'
  },
  {
    id: 4,
    title: 'Dépendance technique microservice X',
    domain: 'IT',
    stream: 'Strategic',
    severity: 'Medium',
    impact: 3,
    probability: 4,
    status: 'Emerging',
    date: '2026-01-02',
    description: 'Architecture couplée crée risque cascade',
    decisionHook: 'Faut-il refactoriser ?'
  },
  {
    id: 5,
    title: 'Non-conformité RGPD module CRM',
    domain: 'Compliance',
    stream: 'Strategic',
    severity: 'Critical',
    impact: 5,
    probability: 3,
    status: 'Active',
    date: '2026-01-01',
    description: 'Audit interne révèle non-conformité',
    decisionHook: 'Faut-il suspendre le module ?'
  },
  {
    id: 6,
    title: 'Cashflow tendu T1',
    domain: 'Finance',
    stream: 'Financial',
    severity: 'High',
    impact: 4,
    probability: 3,
    status: 'Active',
    date: '2025-12-30',
    description: 'Décalage paiements clients',
    decisionHook: 'Faut-il renégocier les délais ?'
  },
  {
    id: 7,
    title: 'Turnover équipe DevOps',
    domain: 'PMO',
    stream: 'Operational',
    severity: 'Medium',
    impact: 3,
    probability: 3,
    status: 'Resolved',
    date: '2025-12-28',
    description: '2 départs confirmés Q1',
    decisionHook: null
  },
  {
    id: 8,
    title: 'Alignement stratégie produit',
    domain: 'Strategy',
    stream: 'Strategic',
    severity: 'Medium',
    impact: 3,
    probability: 4,
    status: 'Emerging',
    date: '2025-12-25',
    description: 'Roadmap produit vs vision Comex',
    decisionHook: 'Faut-il réaligner les priorités ?'
  }
];

const RiskIntelligenceCenter = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [risks, setRisks] = useState(mockRisks);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStream, setSelectedStream] = useState('All');
  const [selectedDomain, setSelectedDomain] = useState('All');

  // Metrics computation
  const criticalTensions = useMemo(() => risks.filter(r => r.severity === 'Critical' && r.status === 'Active').length, [risks]);
  const emergingRisks = useMemo(() => risks.filter(r => r.status === 'Emerging').length, [risks]);
  const derivesDetectees = useMemo(() => risks.filter(r => r.stream === 'Financial' && r.status === 'Active').length, [risks]);
  const impactsPotentiels = useMemo(() => risks.reduce((sum, r) => r.status === 'Active' ? sum + r.impact : sum, 0), [risks]);

  // Risk Radar data
  const radarDomains = useMemo(() => {
    const domains = ['Finance', 'PMO', 'Commercial', 'IT', 'Compliance'];
    return domains.map(domain => {
      const domainRisks = risks.filter(r => r.domain === domain && r.status === 'Active');
      const avgImpact = domainRisks.length > 0 
        ? domainRisks.reduce((sum, r) => sum + r.impact, 0) / domainRisks.length 
        : 0;
      return {
        domain,
        score: Math.round(avgImpact * 20), // 0-100
        count: domainRisks.length
      };
    });
  }, [risks]);

  // Filtered risks
  const filteredRisks = useMemo(() => {
    return risks.filter(r => {
      const matchSearch = r.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          r.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStream = selectedStream === 'All' || r.stream === selectedStream;
      const matchDomain = selectedDomain === 'All' || r.domain === selectedDomain;
      return matchSearch && matchStream && matchDomain;
    });
  }, [risks, searchTerm, selectedStream, selectedDomain]);

  // Risk streams
  const operationalRisks = useMemo(() => filteredRisks.filter(r => r.stream === 'Operational'), [filteredRisks]);
  const financialRisks = useMemo(() => filteredRisks.filter(r => r.stream === 'Financial'), [filteredRisks]);
  const strategicRisks = useMemo(() => filteredRisks.filter(r => r.stream === 'Strategic'), [filteredRisks]);

  // Timeline data
  const timelineEvents = useMemo(() => {
    const sorted = [...risks].sort((a, b) => new Date(b.date) - new Date(a.date));
    return sorted.slice(0, 8).map(r => ({
      date: r.date,
      title: r.title,
      type: r.status === 'Active' ? 'new' : r.status === 'Emerging' ? 'emerging' : 'resolved',
      severity: r.severity
    }));
  }, [risks]);

  useEffect(() => {
    // In real app: fetchRisks from Supabase
  }, [user]);

  const getSeverityColor = (sev) => {
    switch(sev) {
      case 'Critical': return 'bg-rose-500';
      case 'High': return 'bg-orange-500';
      case 'Medium': return 'bg-yellow-500';
      default: return 'bg-slate-500';
    }
  };

  const getSeverityBorder = (sev) => {
    switch(sev) {
      case 'Critical': return 'border-rose-400';
      case 'High': return 'border-orange-400';
      case 'Medium': return 'border-yellow-400';
      default: return 'border-slate-400';
    }
  };

  const getStreamIcon = (stream) => {
    switch(stream) {
      case 'Operational': return Clock;
      case 'Financial': return TrendingDown;
      case 'Strategic': return Target;
      default: return AlertCircle;
    }
  };

  const handleRiskClick = (risk) => {
    navigate('/app/theater', { state: { risk } });
  };

  return (
    <CockpitLayout>
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-extralight text-white tracking-tight mb-2">Risk Intelligence Center</h1>
          <p className="text-xs text-white/40 tracking-[0.1em] uppercase">Strategic Risk Analytics</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-black/40 backdrop-blur-xl border border-white/5 rounded-[2px] text-xs text-white/60 hover:text-white hover:border-white/10 transition-all duration-500 flex items-center gap-2">
            <Filter className="w-3 h-3" />
            Filter
          </button>
          <button className="px-6 py-2 bg-[#D4AF37] text-black rounded-[2px] text-xs font-light hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] transition-all duration-500 tracking-[0.2em] uppercase flex items-center gap-2">
            <Download className="w-3 h-3" />
            Export
          </button>
        </div>
      </div>

      {/* A. Executive Risk Pulse */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          
          {/* Tensions critiques */}
          <div className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-[2px] p-6 hover:border-white/10 transition-all duration-500">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 border border-rose-500/20 rounded-[2px] flex items-center justify-center">
                <Flame className="w-5 h-5 text-rose-400" />
              </div>
              <span className="text-xs font-light text-white/40 tracking-[0.15em] uppercase">Critical Tensions</span>
            </div>
            <div className="text-3xl font-extralight text-white">{criticalTensions}</div>
            <div className="text-xs text-white/40 mt-2">Require immediate action</div>
          </div>

          {/* Risques émergents */}
          <div className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-[2px] p-6 hover:border-white/10 transition-all duration-500">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 border border-orange-500/20 rounded-[2px] flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-orange-400" />
              </div>
              <span className="text-xs font-light text-white/40 tracking-[0.15em] uppercase">Emerging Risks</span>
            </div>
            <div className="text-3xl font-extralight text-white">{emergingRisks}</div>
            <div className="text-xs text-white/40 mt-2">To monitor closely</div>
          </div>

          {/* Dérives détectées */}
          <div className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-[2px] p-6 hover:border-white/10 transition-all duration-500">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 border border-yellow-500/20 rounded-[2px] flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-yellow-400" />
              </div>
              <span className="text-xs font-light text-white/40 tracking-[0.15em] uppercase">Detected Drifts</span>
            </div>
            <div className="text-3xl font-extralight text-white">{derivesDetectees}</div>
            <div className="text-xs text-white/40 mt-2">Budget/Margin deviations</div>
          </div>

          {/* Impacts potentiels */}
          <div className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-[2px] p-6 hover:border-white/10 transition-all duration-500">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 border border-blue-500/20 rounded-[2px] flex items-center justify-center">
                <Target className="w-5 h-5 text-blue-400" />
              </div>
              <span className="text-xs font-light text-white/40 tracking-[0.15em] uppercase">Total Impact</span>
            </div>
            <div className="text-3xl font-extralight text-white">{impactsPotentiels}</div>
            <div className="text-xs text-white/40 mt-2">Cumulative impact score</div>
          </div>

        </div>

        {/* B. Risk Radar */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-[2px] p-8 mb-8">
          <h2 className="text-xl font-light text-white mb-6 tracking-tight">Risk Radar</h2>
          <p className="text-sm text-white/50 mb-6">Risk distribution by domain</p>
          
          <div className="flex items-end justify-between gap-4 h-64">
            {radarDomains.map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div className="text-2xl font-bold text-slate-900">{item.count}</div>
                <div 
                  className="w-full rounded-t-lg bg-gradient-to-t transition-all"
                  style={{
                    height: `${item.score}%`,
                    backgroundImage: item.score > 70 
                      ? 'linear-gradient(to top, #fca5a5, #ef4444)' 
                      : item.score > 40 
                      ? 'linear-gradient(to top, #fcd34d, #f59e0b)'
                      : 'linear-gradient(to top, #a7f3d0, #10b981)'
                  }}
                />
                <div className="text-xs font-medium text-slate-700 text-center">{item.domain}</div>
                <div className="text-xs text-slate-500">{item.score}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <Input 
              placeholder="Rechercher un risque..." 
              className="pl-10 bg-white border-slate-200" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select 
            className="px-4 py-2 border border-slate-200 rounded-lg bg-white text-slate-700"
            value={selectedStream}
            onChange={(e) => setSelectedStream(e.target.value)}
          >
            <option value="All">Tous les flux</option>
            <option value="Operational">Operational</option>
            <option value="Financial">Financial</option>
            <option value="Strategic">Strategic</option>
          </select>

          <select 
            className="px-4 py-2 border border-slate-200 rounded-lg bg-white text-slate-700"
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
          >
            <option value="All">Tous les domaines</option>
            <option value="Finance">Finance</option>
            <option value="PMO">PMO</option>
            <option value="Commercial">Commercial</option>
            <option value="IT">IT</option>
            <option value="Compliance">Compliance</option>
          </select>
        </div>

        {/* C. Alert Streams */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Operational Alerts */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-900">Operational Alerts</h3>
              </div>
              <p className="text-xs text-slate-600 mt-1">Projets · Délais · Budgets</p>
            </div>
            <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
              {operationalRisks.map(risk => (
                <div 
                  key={risk.id} 
                  className={`p-4 rounded-lg border-l-4 ${getSeverityBorder(risk.severity)} bg-slate-50 hover:bg-slate-100 cursor-pointer transition-all`}
                  onClick={() => handleRiskClick(risk)}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-semibold text-sm text-slate-900">{risk.title}</h4>
                    <span className={`text-xs px-2 py-0.5 rounded ${getSeverityColor(risk.severity)} text-white`}>
                      {risk.severity}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mb-2">{risk.description}</p>
                  {risk.decisionHook && (
                    <div className="text-xs font-medium text-blue-600 flex items-center gap-1">
                      <ChevronRight className="w-3 h-3" />
                      {risk.decisionHook}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Financial Alerts */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <TrendingDown className="w-5 h-5 text-rose-600" />
                <h3 className="font-bold text-slate-900">Financial Alerts</h3>
              </div>
              <p className="text-xs text-slate-600 mt-1">Marges · Cashflow · Remises</p>
            </div>
            <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
              {financialRisks.map(risk => (
                <div 
                  key={risk.id} 
                  className={`p-4 rounded-lg border-l-4 ${getSeverityBorder(risk.severity)} bg-slate-50 hover:bg-slate-100 cursor-pointer transition-all`}
                  onClick={() => handleRiskClick(risk)}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-semibold text-sm text-slate-900">{risk.title}</h4>
                    <span className={`text-xs px-2 py-0.5 rounded ${getSeverityColor(risk.severity)} text-white`}>
                      {risk.severity}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mb-2">{risk.description}</p>
                  {risk.decisionHook && (
                    <div className="text-xs font-medium text-rose-600 flex items-center gap-1">
                      <ChevronRight className="w-3 h-3" />
                      {risk.decisionHook}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Strategic Alerts */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-purple-600" />
                <h3 className="font-bold text-slate-900">Strategic Alerts</h3>
              </div>
              <p className="text-xs text-slate-600 mt-1">Alignement · Dépendances · Arbitrages</p>
            </div>
            <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
              {strategicRisks.map(risk => (
                <div 
                  key={risk.id} 
                  className={`p-4 rounded-lg border-l-4 ${getSeverityBorder(risk.severity)} bg-slate-50 hover:bg-slate-100 cursor-pointer transition-all`}
                  onClick={() => handleRiskClick(risk)}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-semibold text-sm text-slate-900">{risk.title}</h4>
                    <span className={`text-xs px-2 py-0.5 rounded ${getSeverityColor(risk.severity)} text-white`}>
                      {risk.severity}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mb-2">{risk.description}</p>
                  {risk.decisionHook && (
                    <div className="text-xs font-medium text-purple-600 flex items-center gap-1">
                      <ChevronRight className="w-3 h-3" />
                      {risk.decisionHook}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Risk Heatmap */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Risk Heatmap</h2>
          <p className="text-sm text-slate-600 mb-8">Matrice Impact × Probabilité</p>
          
          <div className="relative">
            {/* Y-axis label */}
            <div className="absolute -left-12 top-1/2 -translate-y-1/2 -rotate-90 text-xs font-medium text-slate-600">
              Impact
            </div>
            
            {/* Grid */}
            <div className="grid grid-cols-5 gap-2">
              {[5,4,3,2,1].map(impact => (
                <React.Fragment key={impact}>
                  {[1,2,3,4,5].map(prob => {
                    const risksInCell = risks.filter(r => 
                      r.impact === impact && 
                      r.probability === prob && 
                      r.status === 'Active'
                    );
                    const severity = impact * prob;
                    const bgColor = severity >= 20 ? 'bg-rose-100' : severity >= 12 ? 'bg-orange-100' : severity >= 6 ? 'bg-yellow-100' : 'bg-green-100';
                    
                    return (
                      <div 
                        key={`${impact}-${prob}`} 
                        className={`aspect-square ${bgColor} rounded border border-slate-200 flex items-center justify-center relative group cursor-pointer`}
                      >
                        {risksInCell.length > 0 && (
                          <>
                            <div className={`w-4 h-4 rounded-full ${getSeverityColor(risksInCell[0].severity)} animate-pulse`} />
                            {risksInCell.length > 1 && (
                              <div className="absolute -top-1 -right-1 w-5 h-5 bg-slate-900 text-white text-xs rounded-full flex items-center justify-center">
                                {risksInCell.length}
                              </div>
                            )}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                              <div className="bg-slate-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                                {risksInCell.map(r => r.title).join(', ')}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
            
            {/* X-axis label */}
            <div className="text-center text-xs font-medium text-slate-600 mt-4">
              Probabilité
            </div>
          </div>
        </div>

        {/* Risk Timeline */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Risk Timeline</h2>
          <p className="text-sm text-slate-600 mb-8">Évolution chronologique des risques</p>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200" />
            
            <div className="space-y-6">
              {timelineEvents.map((event, idx) => {
                const Icon = event.type === 'new' ? AlertCircle : event.type === 'emerging' ? AlertTriangle : event.type === 'resolved' ? CheckCircle2 : XCircle;
                const iconColor = event.type === 'new' ? 'text-rose-600' : event.type === 'emerging' ? 'text-orange-600' : 'text-green-600';
                const bgColor = event.type === 'new' ? 'bg-rose-50' : event.type === 'emerging' ? 'bg-orange-50' : 'bg-green-50';
                
                return (
                  <div key={idx} className="relative flex items-start gap-6 pl-14">
                    <div className={`absolute left-3 w-6 h-6 rounded-full ${bgColor} flex items-center justify-center border-2 border-white shadow`}>
                      <Icon className={`w-4 h-4 ${iconColor}`} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xs font-medium text-slate-500">{event.date}</span>
                        <span className={`text-xs px-2 py-0.5 rounded ${getSeverityColor(event.severity)} text-white`}>
                          {event.severity}
                        </span>
                      </div>
                      <h4 className="font-semibold text-slate-900">{event.title}</h4>
                      <p className="text-xs text-slate-600 mt-1">
                        {event.type === 'new' && 'Nouveau risque identifié'}
                        {event.type === 'emerging' && 'Risque émergent sous surveillance'}
                        {event.type === 'resolved' && 'Risque résolu'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Premium CTA */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-12 text-center shadow-xl">
          <h2 className="text-3xl font-bold text-white mb-4">Transformez les risques en décisions</h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Chaque alerte devient une scène dans le Theater, une décision dans la Decision Room, 
            un impact mesurable dans votre Dashboard
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button 
              onClick={() => navigate('/app/theater')}
              className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-6 text-lg font-semibold shadow-lg"
            >
              <Theater className="mr-2 h-5 w-5" />
              Analyser dans le Theater
            </Button>
            <Button 
              onClick={() => navigate('/app/decision-room')}
              className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-6 text-lg font-semibold shadow-lg"
            >
              <Gavel className="mr-2 h-5 w-5" />
              Escalader en Decision Room
            </Button>
          </div>
        </div>

    </CockpitLayout>
  );
};

export default RiskIntelligenceCenter;
