import React, { useState } from 'react';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  ArrowLeft, Filter, Calendar, 
  TrendingUp, Target, Users, BarChart3 
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend, AreaChart, Area
} from 'recharts';
import { Link } from 'react-router-dom';
import PDFExportButton from '@/components/ui/PDFExportButton';

const SalesPerformanceDashboard = () => {
  const [timeRange, setTimeRange] = useState('Q2');
  const [activeFilter, setActiveFilter] = useState('All');

  const salesData = [
    { month: 'January', target: 250000, achieved: 245000, contracts: 12 },
    { month: 'February', target: 280000, achieved: 310000, contracts: 15 },
    { month: 'March', target: 290000, achieved: 285000, contracts: 14 },
    { month: 'April', target: 310000, achieved: 330000, contracts: 16 },
    { month: 'May', target: 320000, achieved: 350000, contracts: 18 },
    { month: 'June', target: 340000, achieved: 380000, contracts: 19 },
  ];

  const regionPerformance = [
    { name: 'Suisse Alémanique', value: 450000, color: '#3A7BFF' },
    { name: 'Suisse Romande', value: 320000, color: '#BFA76A' },
    { name: 'Ticino', value: 180000, color: '#10B981' },
    { name: 'International', value: 220000, color: '#8B5CF6' },
  ];

  const customerAcquisition = [
    { month: 'Jan', new: 8, retained: 35, churn: 2 },
    { month: 'Feb', new: 12, retained: 43, churn: 1 },
    { month: 'Mar', new: 10, retained: 52, churn: 2 },
    { month: 'Apr', new: 15, retained: 63, churn: 1 },
    { month: 'May', new: 18, retained: 78, churn: 1 },
    { month: 'Jun', new: 19, retained: 95, churn: 2 },
  ];

  const dealPipeline = [
    { stage: 'Lead', value: 85 },
    { stage: 'Qualified', value: 45 },
    { stage: 'Proposal', value: 28 },
    { stage: 'Negotiation', value: 12 },
    { stage: 'Won', value: 32 },
  ];

  const teamPerformance = [
    { name: 'Sales Team A', target: 600000, achieved: 680000, quota: 113 },
    { name: 'Sales Team B', target: 500000, achieved: 520000, quota: 104 },
    { name: 'Sales Team C', target: 550000, achieved: 600000, quota: 109 },
    { name: 'Enterprise Sales', target: 700000, achieved: 750000, quota: 107 },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans">
      <Navbar />
      
      <main className="pt-32 pb-20 container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
          <div>
            <Link to="/pmo-demo" className="text-gray-400 hover:text-white flex items-center gap-2 text-sm mb-4 transition-colors">
              <ArrowLeft size={14}/> Retour Dashboards
            </Link>
            <h1 className="text-4xl font-display font-bold text-white mb-2">
              Sales Performance <span className="text-[#BFA76A]">Dashboard</span>
            </h1>
            <p className="text-gray-400 max-w-2xl">
              Performance commerciale, pipeline deals et acquisition client en temps réel.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Button 
              variant="outline" 
              onClick={() => setTimeRange(prev => prev === 'Q2' ? 'YTD' : 'Q2')}
              className={`border-white/10 hover:bg-white/5 ${timeRange === 'Q2' ? 'text-[#BFA76A] border-[#BFA76A]/50' : 'text-white'}`}
            >
              <Calendar size={16} className="mr-2" /> {timeRange}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setActiveFilter(prev => prev === 'All' ? 'Region: Suisse Rom' : 'All')}
              className="border-white/10 text-white hover:bg-white/5"
            >
              <Filter size={16} className="mr-2" /> {activeFilter}
            </Button>
            
            <PDFExportButton targetId="sales-content" label="Exporter PDF" className="bg-[#BFA76A] text-black hover:bg-white border-none" />
          </div>
        </div>

        {/* Content ID for Export */}
        <div id="sales-content" className="bg-[#0A0A0A] p-4 -m-4 rounded-xl">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-[#111] border-white/10 p-6 hover:border-[#BFA76A]/30 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-green-500/10 rounded-lg text-green-500"><TrendingUp size={20} /></div>
                <span className="text-xs text-green-500">+11.6% vs target</span>
              </div>
              <div>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Revenu Total YTD</p>
                <h3 className="text-3xl font-bold text-white">CHF 1.9M</h3>
              </div>
            </Card>
            
            <Card className="bg-[#111] border-white/10 p-6 hover:border-[#BFA76A]/30 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500"><Target size={20} /></div>
                <span className="text-xs text-green-500">+5.2% croissance</span>
              </div>
              <div>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Quota Réalisé</p>
                <h3 className="text-3xl font-bold text-white">108%</h3>
              </div>
            </Card>

            <Card className="bg-[#111] border-white/10 p-6 hover:border-[#BFA76A]/30 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500"><Users size={20} /></div>
                <span className="text-xs text-green-500">+19 this month</span>
              </div>
              <div>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Clients Actifs</p>
                <h3 className="text-3xl font-bold text-white">247</h3>
              </div>
            </Card>

            <Card className="bg-[#111] border-white/10 p-6 hover:border-[#BFA76A]/30 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500"><BarChart3 size={20} /></div>
                <span className="text-xs text-gray-500">Deal pipeline</span>
              </div>
              <div>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Pipeline Potentiel</p>
                <h3 className="text-3xl font-bold text-white">CHF 4.2M</h3>
              </div>
            </Card>
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Sales Performance */}
            <div className="bg-[#111] p-6 rounded-xl border border-white/10 h-[400px]">
              <h3 className="text-lg font-bold text-white mb-6">Performance vs Target</h3>
              <ResponsiveContainer width="100%" height="85%">
                <AreaChart data={salesData}>
                  <defs>
                    <linearGradient id="colorAchieved" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" stroke="#666" fontSize={12} />
                  <YAxis stroke="#666" fontSize={12} tickFormatter={(val) => `${val/1000}k`} />
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#1A1A1A', borderColor: '#333', borderRadius: '8px', color: '#fff' }} formatter={(val) => `CHF ${val.toLocaleString()}`} />
                  <Legend />
                  <Line type="monotone" dataKey="target" stroke="#BFA76A" strokeWidth={2} name="Target" />
                  <Area type="monotone" dataKey="achieved" stroke="#10B981" fill="url(#colorAchieved)" name="Réalisé" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Customer Growth */}
            <div className="bg-[#111] p-6 rounded-xl border border-white/10 h-[400px]">
               <h3 className="text-lg font-bold text-white mb-6">Acquisition et Rétention Client</h3>
               <ResponsiveContainer width="100%" height="85%">
                 <BarChart data={customerAcquisition}>
                   <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                   <XAxis dataKey="month" stroke="#666" fontSize={12} />
                   <YAxis stroke="#666" fontSize={12} />
                   <Tooltip contentStyle={{ backgroundColor: '#1A1A1A', borderColor: '#333', borderRadius: '8px', color: '#fff' }} />
                   <Legend />
                   <Bar dataKey="new" name="Nouveaux" fill="#3A7BFF" />
                   <Bar dataKey="retained" name="Retenus" fill="#10B981" />
                   <Bar dataKey="churn" name="Churn" fill="#EF4444" />
                 </BarChart>
               </ResponsiveContainer>
            </div>
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
             {/* Regional Performance */}
             <div className="bg-[#111] p-6 rounded-xl border border-white/10 h-[400px]">
                <h3 className="text-lg font-bold text-white mb-6">Performance Régionale</h3>
                <ResponsiveContainer width="100%" height="85%">
                  <PieChart>
                    <Pie
                      data={regionPerformance}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {regionPerformance.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
             </div>

             {/* Deal Pipeline */}
             <div className="bg-[#111] p-6 rounded-xl border border-white/10">
                <h3 className="text-lg font-bold text-white mb-6">Pipeline par Stade</h3>
                <div className="space-y-4">
                  {dealPipeline.map((deal, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">{deal.stage}</span>
                      <div className="flex-1 mx-4">
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div 
                            className="bg-[#BFA76A] h-2 rounded-full transition-all"
                            style={{width: `${(deal.value / 85) * 100}%`}}
                          />
                        </div>
                      </div>
                      <span className="text-sm text-[#BFA76A] font-semibold w-8 text-right">{deal.value}</span>
                    </div>
                  ))}
                </div>
             </div>

             {/* Team Quota Achievement */}
             <div className="bg-[#111] p-6 rounded-xl border border-white/10">
                <h3 className="text-lg font-bold text-white mb-6">Quota par Équipe</h3>
                <div className="space-y-3">
                  {teamPerformance.map((team, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                      <div className="flex-1">
                        <p className="text-sm text-gray-300 font-semibold">{team.name}</p>
                        <p className="text-xs text-gray-500">Target: CHF {(team.target/1000).toFixed(0)}k</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-[#BFA76A] font-bold">{team.quota}%</p>
                      </div>
                    </div>
                  ))}
                </div>
             </div>
          </div>

          {/* Sales Summary Table */}
          <div className="bg-[#111] p-6 rounded-xl border border-white/10">
            <h3 className="text-lg font-bold text-white mb-6">Résumé Mensuel Détaillé</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">Mois</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">Target</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">Réalisé</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">% Quota</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">Contrats</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {salesData.map((row, idx) => {
                    const quota = Math.round((row.achieved / row.target) * 100);
                    return (
                      <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-3 px-4 text-gray-300 font-semibold">{row.month}</td>
                        <td className="py-3 px-4 text-white">CHF {(row.target/1000).toFixed(0)}k</td>
                        <td className="py-3 px-4 text-white">CHF {(row.achieved/1000).toFixed(0)}k</td>
                        <td className="py-3 px-4 text-[#BFA76A] font-semibold">{quota}%</td>
                        <td className="py-3 px-4 text-white">{row.contracts}</td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${quota >= 100 ? 'bg-green-500/20 text-green-400' : quota >= 90 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                            {quota >= 100 ? 'On Track' : quota >= 90 ? 'Warning' : 'At Risk'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
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

export default SalesPerformanceDashboard;
