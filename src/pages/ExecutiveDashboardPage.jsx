
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, Briefcase, Target, AlertTriangle, 
  TrendingUp, TrendingDown, DollarSign, Activity, Filter
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, 
  ComposedChart, Line, CartesianGrid, AreaChart, Area, PieChart, Pie, Cell, Legend
} from 'recharts';
import PDFExportButton from '@/components/ui/PDFExportButton';

const ExecutiveDashboardPage = () => {
  const [timeRange, setTimeRange] = useState('YTD');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date().toLocaleTimeString());
  const [currentData, setCurrentData] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date().toLocaleTimeString());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Data Definitions per Period
  const dataSets = {
    Q1: {
      kpi: {
        revenue: { value: "CHF 1.1M", trend: "+5.2%", isPositive: true },
        margin: { value: "30.5%", trend: "+1.2%", isPositive: true },
        costs: { value: "CHF 0.7M", trend: "-2.1%", isPositive: true }, 
        activeProjects: { value: "22", trend: "Stable", isPositive: true }
      },
      budget: [
        { month: 'Jan', budget: 350, actual: 340, variance: 10 },
        { month: 'Feb', budget: 380, actual: 390, variance: -10 },
        { month: 'Mar', budget: 410, actual: 405, variance: 5 },
      ],
      profit: [
        { month: 'Jan', revenue: 500, profit: 150 },
        { month: 'Feb', revenue: 550, profit: 160 },
        { month: 'Mar', revenue: 600, profit: 195 },
      ]
    },
    Q2: {
      kpi: {
        revenue: { value: "CHF 1.4M", trend: "+8.1%", isPositive: true },
        margin: { value: "33.1%", trend: "+2.5%", isPositive: true },
        costs: { value: "CHF 0.9M", trend: "-0.5%", isPositive: true }, 
        activeProjects: { value: "25", trend: "+3", isPositive: true }
      },
      budget: [
        { month: 'Apr', budget: 400, actual: 395, variance: 5 },
        { month: 'May', budget: 450, actual: 480, variance: -30 },
        { month: 'Jun', budget: 480, actual: 470, variance: 10 },
      ],
      profit: [
        { month: 'Apr', revenue: 580, profit: 185 },
        { month: 'May', revenue: 650, profit: 170 }, 
        { month: 'Jun', revenue: 700, profit: 220 },
      ]
    },
    Q3: {
      kpi: {
        revenue: { value: "CHF 1.7M", trend: "+10.4%", isPositive: true },
        margin: { value: "34.0%", trend: "+3.0%", isPositive: true },
        costs: { value: "CHF 1.1M", trend: "-1.0%", isPositive: true }, 
        activeProjects: { value: "28", trend: "+5", isPositive: true }
      },
      budget: [
        { month: 'Jul', budget: 500, actual: 490, variance: 10 },
        { month: 'Aug', budget: 520, actual: 510, variance: 10 },
        { month: 'Sep', budget: 550, actual: 560, variance: -10 },
      ],
      profit: [
        { month: 'Jul', revenue: 750, profit: 240 },
        { month: 'Aug', revenue: 780, profit: 250 },
        { month: 'Sep', revenue: 820, profit: 270 },
      ]
    },
    YTD: {
      kpi: {
        revenue: { value: "CHF 4.2M", trend: "+12.5%", isPositive: true },
        margin: { value: "32.4%", trend: "+2.1%", isPositive: true },
        costs: { value: "CHF 2.8M", trend: "-1.5%", isPositive: true }, 
        activeProjects: { value: "24", trend: "Stable", isPositive: true }
      },
      budget: [
        { month: 'Jan', budget: 350, actual: 340, variance: 10 },
        { month: 'Feb', budget: 380, actual: 390, variance: -10 },
        { month: 'Mar', budget: 410, actual: 405, variance: 5 },
        { month: 'Apr', budget: 400, actual: 395, variance: 5 },
        { month: 'May', budget: 450, actual: 480, variance: -30 },
        { month: 'Jun', budget: 480, actual: 470, variance: 10 },
      ],
      profit: [
        { month: 'Jan', revenue: 500, profit: 150 },
        { month: 'Feb', revenue: 550, profit: 160 },
        { month: 'Mar', revenue: 600, profit: 195 },
        { month: 'Apr', revenue: 580, profit: 185 },
        { month: 'May', revenue: 650, profit: 170 }, 
        { month: 'Jun', revenue: 700, profit: 220 },
      ]
    }
  };

  useEffect(() => {
    setCurrentData(dataSets[timeRange]);
  }, [timeRange]);

  const allocationData = [
    { name: 'Digital Trans.', value: 45, color: '#3A7BFF' },
    { name: 'Regulatory', value: 30, color: '#BFA76A' },
    { name: 'Innovation', value: 15, color: '#10B981' },
    { name: 'Maintenance', value: 10, color: '#6B7280' },
  ];

  if (!currentData) return null;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans">
      <Navbar />
      
      <main className="pt-32 pb-20 container mx-auto px-6">
         {/* Navigation & Actions */}
         <div className="mb-8">
            <a href="https://powalyze.ch/pmo-demo" className="text-gray-400 hover:text-white flex items-center gap-2 text-sm mb-4 transition-colors">
              <ArrowLeft size={14}/> Retour PMO Demo
            </a>
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
               <div>
                  <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2 leading-tight">
                     Le Pilotage Stratégique Réinventé,<br/>
                     <span className="text-[#BFA76A]">L'Ingénierie du Pilotage d'Entreprise Automatisés</span>
                  </h1>
                  <p className="text-gray-400 max-w-2xl text-sm mt-4">
                     Vue d'ensemble stratégique : Performance financière, risques et avancement du portefeuille. Dernière MAJ: {lastUpdate}
                  </p>
               </div>
               
               <div className="flex flex-wrap gap-3">
                  <div className="flex bg-[#111] rounded-lg p-1 border border-white/10">
                    {['Q1', 'Q2', 'Q3', 'YTD'].map((range) => (
                      <button
                        key={range}
                        onClick={() => setTimeRange(range)}
                        className={`px-3 py-1 text-xs font-medium rounded transition-all ${
                          timeRange === range 
                            ? 'bg-[#BFA76A] text-black shadow-lg' 
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className={`border-white/10 text-white hover:bg-white/5 ${isFilterOpen ? 'bg-white/10 text-[#BFA76A] border-[#BFA76A]/50' : ''}`}
                  >
                    <Filter size={16} className="mr-2" /> Filtres
                  </Button>

                  <PDFExportButton targetId="executive-dashboard-content" label="Rapport PDF" className="bg-[#BFA76A] text-black hover:bg-white border-none" />
               </div>
            </div>

            {/* Expandable Filter Panel */}
            {isFilterOpen && (
              <div className="mt-4 p-4 bg-[#111] border border-white/10 rounded-xl grid grid-cols-1 md:grid-cols-4 gap-4 animate-in slide-in-from-top-2">
                <div className="space-y-1">
                  <label className="text-xs text-gray-500">Portefeuille</label>
                  <select className="w-full bg-black border border-white/20 rounded p-2 text-sm text-gray-300 focus:border-[#BFA76A] outline-none">
                    <option>Tous les Portefeuilles</option>
                    <option>IT Transformation</option>
                    <option>Marketing</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-500">Région</label>
                  <select className="w-full bg-black border border-white/20 rounded p-2 text-sm text-gray-300 focus:border-[#BFA76A] outline-none">
                    <option>Toutes les Régions</option>
                    <option>EMEA</option>
                    <option>Americas</option>
                    <option>APAC</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-500">Statut</label>
                  <select className="w-full bg-black border border-white/20 rounded p-2 text-sm text-gray-300 focus:border-[#BFA76A] outline-none">
                    <option>Statut: Tous</option>
                    <option>Actif</option>
                    <option>Clôturé</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <Button variant="ghost" className="w-full text-xs text-gray-400 hover:text-white border border-white/10" onClick={() => setIsFilterOpen(false)}>
                    Fermer le panneau
                  </Button>
                </div>
              </div>
            )}
         </div>

         {/* DASHBOARD CONTENT ID for PDF Export */}
         <div id="executive-dashboard-content" className="space-y-8 bg-[#0A0A0A] p-4 -m-4 rounded-xl">
           
           {/* 1. Executive Summary Text */}
           <div className="bg-[#111] border border-white/10 rounded-xl p-6 border-l-4 border-l-[#BFA76A]">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Activity size={18} className="text-[#BFA76A]" /> Executive Summary
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Le portefeuille affiche une performance solide au {timeRange} avec une augmentation de <strong>{currentData.kpi.revenue.trend}</strong> des revenus. 
                {timeRange === 'Q2' && " Une variance budgétaire négative en Mai nécessite une attention particulière sur le projet 'Alpha'."}
                {timeRange === 'Q3' && " Excellente reprise post-estivale avec une marge opérationnelle record."}
                La trésorerie reste saine, et les investissements stratégiques en transformation digitale (45%) sont alignés avec la vision 2025.
              </p>
           </div>

           {/* 2. KPI Cards */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-[#111] border-white/10 p-6">
                 <div className="flex justify-between items-start mb-2">
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Revenu Total</p>
                    <div className="flex items-center text-green-500 text-xs bg-green-500/10 px-2 py-1 rounded">
                       <TrendingUp size={12} className="mr-1"/> {currentData.kpi.revenue.trend}
                    </div>
                 </div>
                 <h3 className="text-3xl font-bold text-white">{currentData.kpi.revenue.value}</h3>
              </Card>

              <Card className="bg-[#111] border-white/10 p-6">
                 <div className="flex justify-between items-start mb-2">
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Marge Opérationnelle</p>
                    <div className="flex items-center text-green-500 text-xs bg-green-500/10 px-2 py-1 rounded">
                       <TrendingUp size={12} className="mr-1"/> {currentData.kpi.margin.trend}
                    </div>
                 </div>
                 <h3 className="text-3xl font-bold text-white">{currentData.kpi.margin.value}</h3>
              </Card>

              <Card className="bg-[#111] border-white/10 p-6">
                 <div className="flex justify-between items-start mb-2">
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Dépenses (Opex)</p>
                    <div className="flex items-center text-green-500 text-xs bg-green-500/10 px-2 py-1 rounded">
                       <TrendingDown size={12} className="mr-1"/> {currentData.kpi.costs.trend}
                    </div>
                 </div>
                 <h3 className="text-3xl font-bold text-white">{currentData.kpi.costs.value}</h3>
              </Card>

              <Card className="bg-[#111] border-white/10 p-6">
                 <div className="flex justify-between items-start mb-2">
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Projets Actifs</p>
                    <div className="flex items-center text-gray-400 text-xs bg-gray-500/10 px-2 py-1 rounded">
                       <Activity size={12} className="mr-1"/> {currentData.kpi.activeProjects.trend}
                    </div>
                 </div>
                 <h3 className="text-3xl font-bold text-white">{currentData.kpi.activeProjects.value}</h3>
              </Card>
           </div>

           {/* 3. Charts Row 1 */}
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Budget Variance */}
              <div className="lg:col-span-2 bg-[#111] border border-white/10 rounded-xl p-6 h-[400px]">
                 <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                   <Target size={18} className="text-[#BFA76A]" /> Performance Budgétaire (kCHF) - {timeRange}
                 </h3>
                 <ResponsiveContainer width="100%" height="85%">
                    <ComposedChart data={currentData.budget}>
                       <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                       <XAxis dataKey="month" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                       <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                       <Tooltip contentStyle={{ backgroundColor: '#1A1A1A', borderColor: '#333', color: '#fff' }} />
                       <Legend verticalAlign="top" height={36}/>
                       <Bar dataKey="budget" name="Budget" fill="#333" barSize={20} radius={[4,4,0,0]} />
                       <Bar dataKey="actual" name="Réel" fill="#BFA76A" barSize={20} radius={[4,4,0,0]} />
                       <Line type="monotone" dataKey="variance" name="Variance" stroke="#EF4444" strokeWidth={2} dot={{r:4}} />
                    </ComposedChart>
                 </ResponsiveContainer>
              </div>

              {/* Strategic Allocation */}
              <div className="bg-[#111] border border-white/10 rounded-xl p-6 h-[400px]">
                 <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                   <Briefcase size={18} className="text-blue-500" /> Allocation Stratégique
                 </h3>
                 <ResponsiveContainer width="100%" height="85%">
                    <PieChart>
                       <Pie
                          data={allocationData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                       >
                          {allocationData.map((entry, index) => (
                             <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                       </Pie>
                       <Tooltip contentStyle={{ backgroundColor: '#1A1A1A', borderColor: '#333', color: '#fff' }} />
                       <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                 </ResponsiveContainer>
              </div>
           </div>

           {/* 4. Profitability Trend */}
           <div className="bg-[#111] border border-white/10 rounded-xl p-6 h-[350px]">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <DollarSign size={18} className="text-green-500" /> Évolution du Profit & Revenus - {timeRange}
              </h3>
              <ResponsiveContainer width="100%" height="85%">
                 <AreaChart data={currentData.profit}>
                    <defs>
                       <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#BFA76A" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#BFA76A" stopOpacity={0}/>
                       </linearGradient>
                       <linearGradient id="colorProf" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10B981" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                       </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                    <XAxis dataKey="month" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#1A1A1A', borderColor: '#333', color: '#fff' }} />
                    <Legend />
                    <Area type="monotone" dataKey="revenue" name="Revenus" stroke="#BFA76A" fillOpacity={1} fill="url(#colorRev)" />
                    <Area type="monotone" dataKey="profit" name="Profit Net" stroke="#10B981" fillOpacity={1} fill="url(#colorProf)" />
                 </AreaChart>
              </ResponsiveContainer>
           </div>

           {/* 5. Alerts & Actions Table */}
           <div className="bg-[#111] border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <AlertTriangle size={18} className="text-red-500" /> Points d'Attention & Actions
              </h3>
              <div className="overflow-x-auto">
                 <table className="w-full text-left text-sm text-gray-400">
                    <thead className="bg-black/50 text-gray-200 border-b border-white/10">
                       <tr>
                          <th className="p-3">Priorité</th>
                          <th className="p-3">Sujet</th>
                          <th className="p-3">Impact</th>
                          <th className="p-3">Responsable</th>
                          <th className="p-3">Action Requise</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                       <tr>
                          <td className="p-3"><span className="inline-block px-2 py-1 rounded bg-red-500/10 text-red-500 text-xs font-bold">CRITIQUE</span></td>
                          <td className="p-3 font-medium text-white">Variance Budget Mai</td>
                          <td className="p-3">-30k CHF</td>
                          <td className="p-3">Marc Weber</td>
                          <td className="p-3">Revue de projet immédiate</td>
                       </tr>
                       <tr>
                          <td className="p-3"><span className="inline-block px-2 py-1 rounded bg-yellow-500/10 text-yellow-500 text-xs font-bold">ÉLEVÉE</span></td>
                          <td className="p-3 font-medium text-white">Retard Recrutement</td>
                          <td className="p-3">Risque délai Q3</td>
                          <td className="p-3">Sophie Dubois</td>
                          <td className="p-3">Accélération sourcing</td>
                       </tr>
                       <tr>
                          <td className="p-3"><span className="inline-block px-2 py-1 rounded bg-blue-500/10 text-blue-500 text-xs font-bold">MOYENNE</span></td>
                          <td className="p-3 font-medium text-white">Validation Roadmap 2026</td>
                          <td className="p-3">Stratégique</td>
                          <td className="p-3">Comex & Thomas L.</td>
                          <td className="p-3">Préparer présentation</td>
                       </tr>
                    </tbody>
                 </table>
              </div>
           </div>

         </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default ExecutiveDashboardPage;
