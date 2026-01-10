
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Target, TrendingUp, AlertTriangle, Lightbulb, ArrowRight, ExternalLink, CheckCircle, XCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';

const StrategicOverview = ({ data, period }) => {
  const navigate = useNavigate();
  const [selectedKpi, setSelectedKpi] = useState(null);
  
  const kpis = data?.kpis || [
    { label: 'Strategic Alignment', value: '92%', trend: '+4%', status: 'good' },
    { label: 'Budget Utilization', value: '68%', trend: '-2%', status: 'neutral' },
    { label: 'Risk Exposure', value: 'Low', trend: 'Stable', status: 'good' },
    { label: 'Portfolio Health', value: '8.5/10', trend: '+0.5', status: 'good' },
  ];

  const chartData = data?.trends || [
    { month: 'Jan', value: 65 }, { month: 'Feb', value: 72 }, { month: 'Mar', value: 68 },
    { month: 'Apr', value: 85 }, { month: 'May', value: 90 }, { month: 'Jun', value: 92 },
  ];

  const recommendations = data?.recommendations || [
    "Increase allocation to AI automation projects to boost Q3 efficiency.",
    "Monitor 'Cloud Migration' budget variance closely.",
    "Schedule executive review for 'Legacy Decommissioning'."
  ];

  const kpiDetails = {
    'Strategic Alignment': {
      positive: ['Project Alpha (+15%)', 'IA Automation (+12%)', 'Digital Workspace (+8%)'],
      negative: ['Legacy System Migration (-5%)', 'Old CRM Replacement (-3%)'],
      recommendation: 'Accélérer les projets IA pour maintenir la dynamique positive.'
    },
    'Budget Utilization': {
      positive: ['Cloud Infrastructure (optimal)', 'DevOps Team (on target)'],
      negative: ['Marketing Budget (15% over)', 'Cloud Migration (8% variance)'],
      recommendation: 'Surveiller le budget Cloud Migration et ajuster les ressources Marketing.'
    },
    'Risk Exposure': {
      positive: ['Cyberscurité renforcée', 'Compliance à jour', 'DR Plan validé'],
      negative: ['Dépendance fournisseur unique', 'Skills gap en IA'],
      recommendation: 'Former les équipes sur l\'IA pour réduire les risques futurs.'
    },
    'Portfolio Health': {
      positive: ['Delivery rate amélioré', 'Satisfaction client élevée', 'Innovation soutenue'],
      negative: ['Quelques retards techniques'],
      recommendation: 'Maintenir le rythme d\'innovation tout en résolvant les blocages techniques.'
    }
  };

  const recommendationActions = [
    {
      text: "Increase allocation to AI automation projects to boost Q3 efficiency.",
      action: "Voir les projets IA",
      path: "/app/projects?filter=ai"
    },
    {
      text: "Monitor 'Cloud Migration' budget variance closely.",
      action: "Ouvrir le budget",
      path: "/app/portfolio"
    },
    {
      text: "Schedule executive review for 'Legacy Decommissioning'.",
      action: "Créer un meeting",
      path: "/app/calendar"
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Titre éditorialisé Executive Cockpit */}
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-[#4A9EFF]/20 rounded-lg">
          <Target className="w-5 h-5 text-[#4A9EFF]" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Executive Cockpit</h2>
          <p className="text-slate-400 text-sm">Votre portefeuille est en trajectoire optimale pour {period.replace('_', ' ').toUpperCase()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => (
          <Card 
            key={idx} 
            className="bg-[#1A1A1A] border-slate-800 hover:border-[#4A9EFF] transition-all cursor-pointer hover:scale-105 hover:shadow-xl hover:shadow-[#4A9EFF]/20"
            onClick={() => setSelectedKpi(kpi)}
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-2">
                <p className="text-slate-400 text-sm font-medium">{kpi.label}</p>
                <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
                  kpi.status === 'good' ? 'bg-green-900/30 text-green-400' : 
                  kpi.status === 'bad' ? 'bg-red-900/30 text-red-400' : 'bg-yellow-900/30 text-yellow-400'
                }`}>
                  {kpi.status === 'good' ? <TrendingUp className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                  {kpi.trend}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{kpi.value}</h3>
              <div className="flex items-center text-[#4A9EFF] text-xs font-medium">
                <span>Voir les détails</span>
                <ArrowRight className="w-3 h-3 ml-1" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-[#1A1A1A] border-slate-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#4A9EFF]" /> Strategic Performance Trend
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4A9EFF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4A9EFF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="month" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip contentStyle={{ backgroundColor: '#1A1A1A', borderColor: '#333', color: '#fff' }} />
                <Area type="monotone" dataKey="value" stroke="#4A9EFF" fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="bg-[#1A1A1A] border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" /> AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {recommendationActions.map((rec, idx) => (
                  <li key={idx} className="bg-[#0F0F0F] border border-slate-800 rounded-lg p-4 hover:border-[#4A9EFF] transition-all group">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="min-w-[4px] h-4 bg-yellow-500 rounded mt-1"></div>
                      <p className="text-sm text-slate-300 flex-1">{rec.text}</p>
                    </div>
                    <Button 
                      size="sm" 
                      className="bg-[#4A9EFF] hover:bg-[#0052CC] text-white w-full group-hover:scale-105 transition-transform"
                      onClick={(e) => { e.stopPropagation(); navigate(rec.path); }}
                    >
                      {rec.action} <ExternalLink className="w-3 h-3 ml-2" />
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <Card className="bg-[#1A1A1A] border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" /> Critical Risks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-3 bg-red-900/10 border border-red-900/30 rounded-lg">
                <div>
                  <p className="text-red-400 font-bold text-sm">CyberSec Compliance</p>
                  <p className="text-red-300/70 text-xs">Deadline approaching</p>
                </div>
                <Button size="sm" variant="destructive" className="h-7 text-xs">View</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* KPI Details Dialog */}
      <Dialog open={!!selectedKpi} onOpenChange={() => setSelectedKpi(null)}>
        <DialogContent className="bg-[#1A1A1A] border-slate-800 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <Target className="w-6 h-6 text-[#4A9EFF]" />
              {selectedKpi?.label}
            </DialogTitle>
          </DialogHeader>
          
          {selectedKpi && kpiDetails[selectedKpi.label] && (
            <div className="space-y-6 py-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#4A9EFF]/10 to-transparent rounded-lg border border-[#4A9EFF]/30">
                <div>
                  <p className="text-sm text-slate-400">Valeur actuelle</p>
                  <p className="text-3xl font-bold text-white">{selectedKpi.value}</p>
                </div>
                <span className={`text-sm px-3 py-1.5 rounded-full ${
                  selectedKpi.status === 'good' ? 'bg-green-900/30 text-green-400' : 
                  selectedKpi.status === 'bad' ? 'bg-red-900/30 text-red-400' : 'bg-yellow-900/30 text-yellow-400'
                }`}>{selectedKpi.trend}</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-green-400 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> Facteurs positifs
                  </h4>
                  <ul className="space-y-2">
                    {kpiDetails[selectedKpi.label].positive.map((item, idx) => (
                      <li key={idx} className="text-sm text-slate-300 flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-red-400 flex items-center gap-2">
                    <XCircle className="w-4 h-4" /> Points d'attention
                  </h4>
                  <ul className="space-y-2">
                    {kpiDetails[selectedKpi.label].negative.map((item, idx) => (
                      <li key={idx} className="text-sm text-slate-300 flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-4 bg-[#4A9EFF]/10 border border-[#4A9EFF]/30 rounded-lg">
                <h4 className="text-sm font-semibold text-[#4A9EFF] mb-2 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" /> Recommandation
                </h4>
                <p className="text-sm text-slate-300">{kpiDetails[selectedKpi.label].recommendation}</p>
              </div>

              <Button 
                className="w-full bg-[#4A9EFF] hover:bg-[#0052CC] text-white"
                onClick={() => setSelectedKpi(null)}
              >
                Fermer
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StrategicOverview;
