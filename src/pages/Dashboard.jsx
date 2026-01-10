
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { 
  Briefcase, CheckSquare, FileText, MessageSquare, 
  Activity, Save, Download, Share2, AlertCircle, ArrowUpRight, TrendingUp, Clock, Target
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import ConfigurationPanel from '@/components/ConfigurationPanel';
import StrategicOverview from '@/components/StrategicOverview';
import { SaveConfigurationModal, ExportStrategicModal, ShareStrategicModal } from '@/components/dashboard/DashboardModals';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import DeviceSwitcher from '@/components/DeviceSwitcher';


const Dashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [reportPeriod, setReportPeriod] = useState('q1_2026');
  const [stats, setStats] = useState([
    { label: 'Total Projects', value: 0, icon: Briefcase, color: "text-blue-500", bg: "bg-blue-500/10", path: '/app/projects', trend: 0, previousValue: 0 },
    { label: 'Total Tasks', value: 0, icon: CheckSquare, color: "text-green-500", bg: "bg-green-500/10", path: '/app/tasks', trend: 0, previousValue: 0 },
    { label: 'Total Documents', value: 0, icon: FileText, color: "text-purple-500", bg: "bg-purple-500/10", path: '/app/documents', trend: 0, previousValue: 0 },
    { label: 'Total Messages', value: 0, icon: MessageSquare, color: "text-orange-500", bg: "bg-orange-500/10", path: '/app/messages', trend: 0, previousValue: 0 },
  ]);

  const [nextBestAction, setNextBestAction] = useState(null);
  const [executiveSummary, setExecutiveSummary] = useState("");

  // Modals state
  const [isSaveOpen, setIsSaveOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const [projectData, setProjectData] = useState([
    { name: 'Completed', value: 400 },
    { name: 'In Progress', value: 300 },
    { name: 'To Do', value: 300 },
  ]);

  const [financialData, setFinancialData] = useState([]);
  const [strategicData, setStrategicData] = useState(null);

  useEffect(() => {
      updateDashboardData(reportPeriod);
  }, [reportPeriod]);

  const handlePeriodChange = (newPeriod) => {
    setReportPeriod(newPeriod);
  };

  const updateDashboardData = (period) => {
    let newStats = [...stats];
    let newProjectData = [];
    let newFinancialData = [];
    let newStrategicData = {};
    let newNBA = null;
    let newSummary = "";

    switch (period) {
      case 'q1_2026':
        newStats[0].value = 12; newStats[0].previousValue = 9; newStats[0].trend = +3;
        newStats[1].value = 48; newStats[1].previousValue = 42; newStats[1].trend = +6;
        newStats[2].value = 156; newStats[2].previousValue = 148; newStats[2].trend = +8;
        newStats[3].value = 24; newStats[3].previousValue = 21; newStats[3].trend = +3;
        
        newProjectData = [{ name: 'Completed', value: 5 }, { name: 'In Progress', value: 5 }, { name: 'To Do', value: 2 }];
        newFinancialData = [
          { month: 'Jan', revenue: 4000, expenses: 2400 },
          { month: 'Feb', revenue: 3000, expenses: 1398 },
          { month: 'Mar', revenue: 2000, expenses: 9800 },
        ];
        newStrategicData = {
             kpis: [
                { label: 'Strategic Alignment', value: '94%', trend: '+2%', status: 'good' },
                { label: 'Budget Utilization', value: '88%', trend: '+5%', status: 'warning' },
                { label: 'Risk Exposure', value: 'Low', trend: 'Stable', status: 'good' },
                { label: 'Portfolio Health', value: '9.0/10', trend: '+0.2', status: 'good' },
            ],
            trends: [
                { month: 'Jan', value: 75 }, { month: 'Feb', value: 82 }, { month: 'Mar', value: 88 }
            ]
        };
        newNBA = {
          title: "Valider le budget Cloud Migration",
          description: "Le dépassement budgétaire détecté nécessite une validation exécutive avant le 12 janvier.",
          action: "Voir le budget",
          path: "/app/portfolio",
          priority: "high"
        };
        newSummary = "Votre portefeuille est en trajectoire optimale pour Q1 2026. Les indicateurs montrent une progression maîtrisée avec un alignement stratégique élevé (94%) et un risque global faible.";
        break;
      default:
        newStats[0].value = 25; newStats[0].previousValue = 20; newStats[0].trend = +5;
        newStats[1].value = 100; newStats[1].previousValue = 95; newStats[1].trend = +5;
        newStats[2].value = 300; newStats[2].previousValue = 280; newStats[2].trend = +20;
        newStats[3].value = 50; newStats[3].previousValue = 48; newStats[3].trend = +2;
        
        newProjectData = [{ name: 'Completed', value: 10 }, { name: 'In Progress', value: 10 }, { name: 'To Do', value: 5 }];
        newFinancialData = [
          { month: 'M1', revenue: 5000, expenses: 3000 },
          { month: 'M2', revenue: 6000, expenses: 3500 },
        ];
        newStrategicData = {
             kpis: [
                { label: 'Strategic Alignment', value: '85%', trend: '0%', status: 'neutral' },
                { label: 'Budget Utilization', value: '50%', trend: '-10%', status: 'bad' },
                { label: 'Risk Exposure', value: 'Medium', trend: 'Rising', status: 'warning' },
                { label: 'Portfolio Health', value: '7.5/10', trend: '-0.2', status: 'neutral' },
            ],
            trends: [{ month: 'Avg', value: 50 }]
        };
        newNBA = {
          title: "Revoir l'allocation budgétaire",
          description: "L'utilisation budgétaire est en baisse. Analysez les projets sous-perform ants.",
          action: "Voir les projets",
          path: "/app/projects",
          priority: "medium"
        };
        newSummary = "Powalyze analyse 27 projets actifs. Votre portefeuille présente des opportunités d'optimisation budgétaire.";
        break;
    }
    setStats(newStats);
    setProjectData(newProjectData);
    setFinancialData(newFinancialData);
    setStrategicData(newStrategicData);
    setNextBestAction(newNBA);
    setExecutiveSummary(newSummary);
  };

  const COLORS = ['#10B981', '#3B82F6', '#64748B'];

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header avec LanguageSwitcher */}
      <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-white">{t('nav.dashboard')}</h1>
          <div className="flex items-center gap-4">
            <DeviceSwitcher currentView="desktop" />
            <LanguageSwitcher />
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="space-y-8 p-6 max-w-7xl mx-auto pb-20">
      {/* Executive Summary - Premium Banner */}
      {executiveSummary && (
        <div className="bg-gradient-to-r from-[#4A9EFF]/10 via-[#D4AF37]/10 to-[#4A9EFF]/10 border border-[#4A9EFF]/30 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#4A9EFF]/20 rounded-xl">
              <Target className="w-6 h-6 text-[#4A9EFF]" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white mb-2">Executive Summary</h2>
              <p className="text-slate-300 leading-relaxed">{executiveSummary}</p>
            </div>
          </div>
        </div>
      )}

      {/* Next Best Action - NBA */}
      {nextBestAction && (
        <div className={`border-l-4 ${
          nextBestAction.priority === 'high' ? 'border-red-500 bg-red-500/10' : 
          nextBestAction.priority === 'medium' ? 'border-yellow-500 bg-yellow-500/10' : 
          'border-blue-500 bg-blue-500/10'
        } rounded-xl p-6 backdrop-blur-sm hover:scale-[1.02] transition-transform cursor-pointer`}
        onClick={() => navigate(nextBestAction.path)}>
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-4 flex-1">
              <div className="p-2 bg-white/10 rounded-lg">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-white">Next Best Action</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    nextBestAction.priority === 'high' ? 'bg-red-500/20 text-red-300' : 
                    nextBestAction.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-300' : 
                    'bg-blue-500/20 text-blue-300'
                  }`}>{nextBestAction.priority.toUpperCase()}</span>
                </div>
                <p className="text-white font-semibold mb-1">{nextBestAction.title}</p>
                <p className="text-slate-400 text-sm">{nextBestAction.description}</p>
              </div>
            </div>
            <Button className="bg-[#4A9EFF] hover:bg-[#0052CC] text-white">
              {nextBestAction.action} <ArrowUpRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4 md:gap-6">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div className="w-full md:w-auto">
               <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                 {t('dashboard.welcome')} <span className="text-[#4A9EFF]">{user?.user_metadata?.full_name || user?.email?.split('@')[0]}</span>
               </h1>
               <p className="text-slate-400 mt-2 text-sm sm:text-base">Strategic overview for <span className="text-white font-bold">{reportPeriod.replace('_', ' ').toUpperCase()}</span></p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-2 w-full md:w-auto">
                <ConfigurationPanel onPeriodChange={handlePeriodChange} />
                <div className="flex items-center gap-2 flex-wrap">
                    <Button variant="outline" size="sm" onClick={() => setIsSaveOpen(true)} className="flex-1 sm:flex-none h-9 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white">
                        <Save className="w-4 h-4 mr-2" /> Save
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setIsExportOpen(true)} className="flex-1 sm:flex-none h-9 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white">
                        <Download className="w-4 h-4 mr-2" /> Export
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setIsShareOpen(true)} className="flex-1 sm:flex-none h-9 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white">
                        <Share2 className="w-4 h-4 mr-2" /> Share
                    </Button>
                </div>
            </div>
         </div>
      </div>

      <StrategicOverview data={strategicData} period={reportPeriod} />

      {/* Power BI Reports Quick Access */}
      <div className="mt-6 md:mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-white">Power BI Reports</h2>
          <Button variant="ghost" size="sm" onClick={() => navigate('/app/powerbi')} className="text-[#4A9EFF] hover:bg-[#4A9EFF]/10">
            Voir tous <ArrowUpRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {[
            { id: 'commercial', name: 'Dashboard Commercial', category: 'Sales', icon: TrendingUp, color: 'from-blue-500 to-cyan-500' },
            { id: 'finance', name: 'Analyse Financière Q4', category: 'Finance', icon: Activity, color: 'from-green-500 to-emerald-500' },
            { id: 'pmo', name: 'KPIs Projet PMO', category: 'Project Management', icon: Target, color: 'from-purple-500 to-pink-500' },
            { id: 'predictive', name: 'Analyse Prédictive Q2', category: 'AI Analytics', icon: Activity, color: 'from-orange-500 to-red-500' },
            { id: 'operational', name: 'Efficacité Opérationnelle', category: 'Operations', icon: Clock, color: 'from-indigo-500 to-blue-500' },
            { id: 'strategic', name: 'Roadmap Stratégique 2026', category: 'Strategy', icon: Target, color: 'from-amber-500 to-yellow-500' },
          ].map((report) => (
            <Card 
              key={report.id}
              onClick={() => navigate(`/app/powerbi?report=${report.id}`)}
              className="bg-[#1A1A1A] border-slate-800 cursor-pointer hover:border-[#4A9EFF] transition-all group active:scale-95 sm:hover:scale-105 overflow-hidden"
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`p-2.5 rounded-lg bg-gradient-to-br ${report.color} flex-shrink-0`}>
                    <report.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold text-sm sm:text-base line-clamp-1 group-hover:text-[#4A9EFF] transition-colors">
                      {report.name}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm mt-1">{report.category}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400">
                        Connected
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-[#4A9EFF] transition-colors flex-shrink-0" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6 md:mt-8">
        {stats.map((stat, i) => {
          const trendPercent = stat.previousValue > 0 ? Math.round(((stat.value - stat.previousValue) / stat.previousValue) * 100) : 0;
          const isPositive = trendPercent > 0;
          
          return (
           <Card key={i} onClick={() => navigate(stat.path)} className="bg-[#1A1A1A] border-slate-800 cursor-pointer hover:border-[#4A9EFF] transition-all group active:scale-95 sm:hover:scale-105">
              <CardContent className="p-4 sm:p-6">
                 <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div className="flex-1 min-w-0">
                       <p className="text-slate-500 text-xs sm:text-sm font-medium group-hover:text-white transition-colors truncate">{stat.label}</p>
                       <p className="text-xl sm:text-2xl font-bold text-white mt-1">{stat.value}</p>
                       
                       {/* Trend indicator */}
                       <div className="flex items-center gap-1 sm:gap-2 mt-2">
                         <span className={`text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full flex items-center gap-1 ${
                           isPositive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                         }`}>
                           <TrendingUp className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${!isPositive && 'rotate-180'}`} />
                           {trendPercent > 0 ? '+' : ''}{trendPercent}%
                         </span>
                         <span className="text-xs text-slate-500 hidden sm:inline">vs. last month</span>
                       </div>
                    </div>
                    <div className={`p-2 sm:p-3 rounded-lg ${stat.bg} group-hover:bg-opacity-20 transition-all flex-shrink-0`}>
                       <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color}`} />
                    </div>
                 </div>
                 
                 {/* CTA */}
                 <div className="flex items-center text-[#4A9EFF] text-xs sm:text-sm font-medium group-hover:gap-2 transition-all">
                   <span className="truncate">Voir le détail</span>
                   <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                 </div>
              </CardContent>
           </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
         <Card className="lg:col-span-2 bg-[#1A1A1A] border-slate-800">
            <CardHeader>
               <CardTitle className="text-white flex items-center gap-2 text-base sm:text-lg">
                  <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-[#4A9EFF]" /> {t('dashboard.recentActivity')}
               </CardTitle>
            </CardHeader>
            <CardContent>
               <div className="space-y-3 sm:space-y-4">
                  {[1,2,3,4].map((i) => (
                     <div key={i} className="flex items-start gap-3 sm:gap-4 p-2 sm:p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                        <div className="w-2 h-2 mt-2 rounded-full bg-[#4A9EFF] flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                           <p className="text-white text-xs sm:text-sm">Project <span className="font-bold">Alpha Migration</span> status updated to <span className="text-green-500">Completed</span></p>
                           <p className="text-slate-500 text-xs mt-1">2 hours ago by Sarah Connor</p>
                        </div>
                     </div>
                  ))}
               </div>
            </CardContent>
         </Card>

         <div className="space-y-4 sm:space-y-6 flex flex-col">
            <Card className="bg-[#1A1A1A] border-slate-800 flex-1 min-h-[280px] sm:min-h-[300px]">
                <CardHeader>
                  <CardTitle className="text-white text-base sm:text-lg">{t('dashboard.projectStatus')}</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center items-center h-full pb-6">
                  <div className="w-[180px] h-[180px] sm:w-[200px] sm:h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={projectData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {projectData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #333' }} />
                        </PieChart>
                      </ResponsiveContainer>
                  </div>
                </CardContent>
            </Card>
         </div>
      </div>

      <Card className="bg-[#1A1A1A] border-slate-800">
        <CardHeader>
          <CardTitle className="text-white text-base sm:text-lg">Financial Overview (Revenue vs Expenses)</CardTitle>
        </CardHeader>
        <CardContent className="h-[250px] sm:h-[300px] overflow-hidden">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={financialData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="month" stroke="#888" tick={{ fontSize: 12 }} />
              <YAxis stroke="#888" tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} name="Revenue" />
              <Line type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={2} name="Expenses" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <SaveConfigurationModal isOpen={isSaveOpen} onClose={() => setIsSaveOpen(false)} />
      <ExportStrategicModal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} />
      <ShareStrategicModal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} />
      </div>
    </div>
  );
};

export default Dashboard;
