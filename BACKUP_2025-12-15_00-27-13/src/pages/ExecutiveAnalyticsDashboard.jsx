import React, { useState } from 'react';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  ArrowLeft, Filter, Calendar, 
  Users, Eye, MousePointer, Target 
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend, AreaChart, Area
} from 'recharts';
import { Link } from 'react-router-dom';
import PDFExportButton from '@/components/ui/PDFExportButton';

const ExecutiveAnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [activeFilter, setActiveFilter] = useState('All');

  const visitorData = [
    { date: 'Day 1', visitors: 2400, pageviews: 4200, bounceRate: 24 },
    { date: 'Day 2', visitors: 3100, pageviews: 4900, bounceRate: 22 },
    { date: 'Day 3', visitors: 2800, pageviews: 4500, bounceRate: 25 },
    { date: 'Day 4', visitors: 3900, pageviews: 5600, bounceRate: 20 },
    { date: 'Day 5', visitors: 4200, pageviews: 6200, bounceRate: 18 },
    { date: 'Day 6', visitors: 4800, pageviews: 7100, bounceRate: 16 },
  ];

  const conversionData = [
    { funnel: 'Visitors', value: 10000 },
    { funnel: 'Product Views', value: 8200 },
    { funnel: 'Add to Cart', value: 4900 },
    { funnel: 'Checkout', value: 3100 },
    { funnel: 'Purchase', value: 1890 },
  ];

  const trafficSources = [
    { name: 'Organic Search', value: 4200, color: '#10B981' },
    { name: 'Direct', value: 2800, color: '#3A7BFF' },
    { name: 'Referral', value: 1900, color: '#BFA76A' },
    { name: 'Social Media', value: 1200, color: '#8B5CF6' },
    { name: 'Email', value: 900, color: '#F59E0B' },
  ];

  const deviceAnalytics = [
    { device: 'Desktop', sessions: 4200, conversionRate: 3.5 },
    { device: 'Mobile', sessions: 5100, conversionRate: 2.8 },
    { device: 'Tablet', sessions: 1200, conversionRate: 2.2 },
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
              Analytics <span className="text-[#BFA76A]">Exécutif</span>
            </h1>
            <p className="text-gray-400 max-w-2xl">
              Vue d'ensemble détaillée du trafic, des conversions et de la performance digital.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Button 
              variant="outline" 
              onClick={() => setTimeRange(prev => prev === '7d' ? '30d' : '7d')}
              className={`border-white/10 hover:bg-white/5 ${timeRange === '30d' ? 'text-[#BFA76A] border-[#BFA76A]/50' : 'text-white'}`}
            >
              <Calendar size={16} className="mr-2" /> {timeRange === '7d' ? '7 Jours' : '30 Jours'}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setActiveFilter(prev => prev === 'All' ? 'Device: Mobile' : 'All')}
              className="border-white/10 text-white hover:bg-white/5"
            >
              <Filter size={16} className="mr-2" /> {activeFilter}
            </Button>
            
            <PDFExportButton targetId="analytics-content" label="Exporter PDF" className="bg-[#BFA76A] text-black hover:bg-white border-none" />
          </div>
        </div>

        {/* Content ID for Export */}
        <div id="analytics-content" className="bg-[#0A0A0A] p-4 -m-4 rounded-xl">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-[#111] border-white/10 p-6 hover:border-[#BFA76A]/30 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500"><Users size={20} /></div>
                <span className="text-xs text-green-500 flex items-center gap-1">+15.2% vs mois</span>
              </div>
              <div>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Visiteurs Totaux</p>
                <h3 className="text-3xl font-bold text-white">24.5k</h3>
              </div>
            </Card>
            
            <Card className="bg-[#111] border-white/10 p-6 hover:border-[#BFA76A]/30 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-green-500/10 rounded-lg text-green-500"><Eye size={20} /></div>
                <span className="text-xs text-green-500 flex items-center gap-1">+8.5% vs mois</span>
              </div>
              <div>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Pages Vues</p>
                <h3 className="text-3xl font-bold text-white">67.8k</h3>
              </div>
            </Card>

            <Card className="bg-[#111] border-white/10 p-6 hover:border-[#BFA76A]/30 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500"><MousePointer size={20} /></div>
                <span className="text-xs text-green-500 flex items-center gap-1">+5.3% vs mois</span>
              </div>
              <div>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Taux de Conversion</p>
                <h3 className="text-3xl font-bold text-white">3.2%</h3>
              </div>
            </Card>

            <Card className="bg-[#111] border-white/10 p-6 hover:border-[#BFA76A]/30 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500"><Target size={20} /></div>
                <span className="text-xs text-red-500 flex items-center gap-1">-2.1% vs mois</span>
              </div>
              <div>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Bounce Rate</p>
                <h3 className="text-3xl font-bold text-white">42.8%</h3>
              </div>
            </Card>
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Visitor Trend */}
            <div className="bg-[#111] p-6 rounded-xl border border-white/10 h-[400px]">
              <h3 className="text-lg font-bold text-white mb-6">Trend Visiteurs & Pages Vues</h3>
              <ResponsiveContainer width="100%" height="85%">
                <AreaChart data={visitorData}>
                  <defs>
                    <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3A7BFF" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3A7BFF" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" stroke="#666" fontSize={12} />
                  <YAxis stroke="#666" fontSize={12} />
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#1A1A1A', borderColor: '#333', borderRadius: '8px', color: '#fff' }} />
                  <Area type="monotone" dataKey="visitors" stroke="#3A7BFF" fill="url(#colorVisitors)" name="Visiteurs" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Conversion Funnel */}
            <div className="bg-[#111] p-6 rounded-xl border border-white/10 h-[400px]">
               <h3 className="text-lg font-bold text-white mb-6">Entonnoir de Conversion</h3>
               <ResponsiveContainer width="100%" height="85%">
                 <BarChart data={conversionData} layout="vertical">
                   <XAxis type="number" stroke="#666" fontSize={12} />
                   <YAxis dataKey="funnel" type="category" stroke="#666" fontSize={12} />
                   <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                   <Tooltip contentStyle={{ backgroundColor: '#1A1A1A', borderColor: '#333', borderRadius: '8px', color: '#fff' }} />
                   <Bar dataKey="value" fill="#BFA76A" radius={[0, 4, 4, 0]} />
                 </BarChart>
               </ResponsiveContainer>
            </div>
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
             {/* Traffic Sources */}
             <div className="bg-[#111] p-6 rounded-xl border border-white/10 h-[400px]">
                <h3 className="text-lg font-bold text-white mb-6">Sources de Trafic</h3>
                <ResponsiveContainer width="100%" height="85%">
                  <PieChart>
                    <Pie
                      data={trafficSources}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {trafficSources.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
             </div>

             {/* Device Performance */}
             <div className="bg-[#111] p-6 rounded-xl border border-white/10 lg:col-span-2">
                <h3 className="text-lg font-bold text-white mb-6">Performance par Appareil</h3>
                <div className="space-y-4">
                  {deviceAnalytics.map((device, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-gray-300">{device.device}</span>
                          <span className="text-sm text-[#BFA76A]">{device.sessions} sessions</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div 
                            className="bg-[#BFA76A] h-2 rounded-full transition-all"
                            style={{width: `${(device.sessions / 5100) * 100}%`}}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Taux conversion: {device.conversionRate}%</p>
                      </div>
                    </div>
                  ))}
                </div>
             </div>
          </div>

          {/* Bottom Table */}
          <div className="bg-[#111] p-6 rounded-xl border border-white/10">
            <h3 className="text-lg font-bold text-white mb-6">Détails par Jour</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">Date</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">Visiteurs</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">Pages Vues</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">Bounce Rate</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">Durée Moy</th>
                  </tr>
                </thead>
                <tbody>
                  {visitorData.map((row, idx) => (
                    <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4 text-gray-300">{row.date}</td>
                      <td className="py-3 px-4 text-white font-semibold">{row.visitors.toLocaleString()}</td>
                      <td className="py-3 px-4 text-white">{row.pageviews.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${row.bounceRate < 22 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                          {row.bounceRate}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-400">3:45</td>
                    </tr>
                  ))}
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

export default ExecutiveAnalyticsDashboard;
