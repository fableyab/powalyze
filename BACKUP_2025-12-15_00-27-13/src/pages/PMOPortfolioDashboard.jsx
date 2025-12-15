import React, { useState } from 'react';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  ArrowLeft, Filter, Calendar, 
  Zap, CheckCircle, AlertCircle, Clock 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell, Legend, LineChart, Line
} from 'recharts';
import { Link } from 'react-router-dom';
import PDFExportButton from '@/components/ui/PDFExportButton';

const PMOPortfolioDashboard = () => {
  const [timeRange, setTimeRange] = useState('current');
  const [activeFilter, setActiveFilter] = useState('All');

  const projectData = [
    { month: 'M1', onTime: 8, atRisk: 2, delayed: 1, completed: 5 },
    { month: 'M2', onTime: 10, atRisk: 1, delayed: 0, completed: 8 },
    { month: 'M3', onTime: 9, atRisk: 2, delayed: 1, completed: 7 },
    { month: 'M4', onTime: 12, atRisk: 1, delayed: 0, completed: 9 },
    { month: 'M5', onTime: 11, atRisk: 2, delayed: 1, completed: 10 },
    { month: 'M6', onTime: 13, atRisk: 1, delayed: 0, completed: 11 },
  ];

  const velocityData = [
    { sprint: 'S1', planned: 45, completed: 42, efficiency: 93 },
    { sprint: 'S2', planned: 50, completed: 49, efficiency: 98 },
    { sprint: 'S3', planned: 48, completed: 45, efficiency: 94 },
    { sprint: 'S4', planned: 52, completed: 51, efficiency: 98 },
    { sprint: 'S5', planned: 50, completed: 48, efficiency: 96 },
    { sprint: 'S6', planned: 55, completed: 54, efficiency: 98 },
  ];

  const resourceData = [
    { role: 'Developers', allocated: 15, utilization: 92 },
    { role: 'QA Engineers', allocated: 8, utilization: 88 },
    { role: 'Project Managers', allocated: 3, utilization: 95 },
    { role: 'Data Analysts', allocated: 4, utilization: 85 },
  ];

  const projectStatus = [
    { name: 'On Track', value: 12, color: '#10B981' },
    { name: 'At Risk', value: 3, color: '#F59E0B' },
    { name: 'Delayed', value: 1, color: '#EF4444' },
    { name: 'Completed', value: 9, color: '#3A7BFF' },
  ];

  const budgetAllocation = [
    { phase: 'Planning', value: 5, color: '#8B5CF6' },
    { phase: 'Development', value: 45, color: '#3A7BFF' },
    { phase: 'Testing', value: 25, color: '#10B981' },
    { phase: 'Deployment', value: 15, color: '#BFA76A' },
    { phase: 'Support', value: 10, color: '#F59E0B' },
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
              PMO Portfolio <span className="text-[#BFA76A]">Dashboard</span>
            </h1>
            <p className="text-gray-400 max-w-2xl">
              Vue d'ensemble du portefeuille, santé des projets et allocation des ressources.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Button 
              variant="outline" 
              onClick={() => setTimeRange(prev => prev === 'current' ? 'next' : 'current')}
              className={`border-white/10 hover:bg-white/5 ${timeRange === 'current' ? 'text-[#BFA76A] border-[#BFA76A]/50' : 'text-white'}`}
            >
              <Calendar size={16} className="mr-2" /> {timeRange === 'current' ? 'Cycle Current' : 'Prochain Cycle'}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setActiveFilter(prev => prev === 'All' ? 'Status: On Track' : 'All')}
              className="border-white/10 text-white hover:bg-white/5"
            >
              <Filter size={16} className="mr-2" /> {activeFilter}
            </Button>
            
            <PDFExportButton targetId="portfolio-content" label="Exporter PDF" className="bg-[#BFA76A] text-black hover:bg-white border-none" />
          </div>
        </div>

        {/* Content ID for Export */}
        <div id="portfolio-content" className="bg-[#0A0A0A] p-4 -m-4 rounded-xl">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-[#111] border-white/10 p-6 hover:border-[#BFA76A]/30 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500"><Zap size={20} /></div>
                <span className="text-xs text-gray-500">Portfolio</span>
              </div>
              <div>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Projets Actifs</p>
                <h3 className="text-3xl font-bold text-white">25</h3>
              </div>
            </Card>
            
            <Card className="bg-[#111] border-white/10 p-6 hover:border-[#BFA76A]/30 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-green-500/10 rounded-lg text-green-500"><CheckCircle size={20} /></div>
                <span className="text-xs text-green-500">+12.5%</span>
              </div>
              <div>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">On Track</p>
                <h3 className="text-3xl font-bold text-white">92%</h3>
              </div>
            </Card>

            <Card className="bg-[#111] border-white/10 p-6 hover:border-[#BFA76A]/30 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500"><AlertCircle size={20} /></div>
                <span className="text-xs text-orange-500">3 projets</span>
              </div>
              <div>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">At Risk</p>
                <h3 className="text-3xl font-bold text-white">12%</h3>
              </div>
            </Card>

            <Card className="bg-[#111] border-white/10 p-6 hover:border-[#BFA76A]/30 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500"><Clock size={20} /></div>
                <span className="text-xs text-gray-500">Vitesse moy</span>
              </div>
              <div>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Vélocité Portfolio</p>
                <h3 className="text-3xl font-bold text-white">96%</h3>
              </div>
            </Card>
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Project Status */}
            <div className="bg-[#111] p-6 rounded-xl border border-white/10 h-[400px]">
              <h3 className="text-lg font-bold text-white mb-6">État des Projets</h3>
              <ResponsiveContainer width="100%" height="85%">
                <BarChart data={projectData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                  <XAxis dataKey="month" stroke="#666" fontSize={12} />
                  <YAxis stroke="#666" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: '#1A1A1A', borderColor: '#333', borderRadius: '8px', color: '#fff' }} />
                  <Legend />
                  <Bar dataKey="onTime" name="On Track" fill="#10B981" />
                  <Bar dataKey="atRisk" name="At Risk" fill="#F59E0B" />
                  <Bar dataKey="delayed" name="Delayed" fill="#EF4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Velocity Trend */}
            <div className="bg-[#111] p-6 rounded-xl border border-white/10 h-[400px]">
               <h3 className="text-lg font-bold text-white mb-6">Vélocité par Sprint</h3>
               <ResponsiveContainer width="100%" height="85%">
                 <LineChart data={velocityData}>
                   <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                   <XAxis dataKey="sprint" stroke="#666" fontSize={12} />
                   <YAxis stroke="#666" fontSize={12} />
                   <Tooltip contentStyle={{ backgroundColor: '#1A1A1A', borderColor: '#333', borderRadius: '8px', color: '#fff' }} />
                   <Legend />
                   <Line type="monotone" dataKey="planned" stroke="#3A7BFF" strokeWidth={2} name="Planifié" />
                   <Line type="monotone" dataKey="completed" stroke="#10B981" strokeWidth={2} name="Complété" />
                 </LineChart>
               </ResponsiveContainer>
            </div>
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
             {/* Project Status Distribution */}
             <div className="bg-[#111] p-6 rounded-xl border border-white/10 h-[400px]">
                <h3 className="text-lg font-bold text-white mb-6">Distribution Statut</h3>
                <ResponsiveContainer width="100%" height="85%">
                  <PieChart>
                    <Pie
                      data={projectStatus}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {projectStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
             </div>

             {/* Resource Utilization */}
             <div className="bg-[#111] p-6 rounded-xl border border-white/10 lg:col-span-2">
                <h3 className="text-lg font-bold text-white mb-6">Utilisation des Ressources</h3>
                <div className="space-y-4">
                  {resourceData.map((resource, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-gray-300">{resource.role}</span>
                          <span className="text-sm text-[#BFA76A]">{resource.allocated} FTE</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div 
                            className="bg-[#BFA76A] h-2 rounded-full transition-all"
                            style={{width: `${resource.utilization}%`}}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Utilisation: {resource.utilization}%</p>
                      </div>
                    </div>
                  ))}
                </div>
             </div>
          </div>

          {/* Budget Allocation */}
          <div className="bg-[#111] p-6 rounded-xl border border-white/10 mb-6">
            <h3 className="text-lg font-bold text-white mb-6">Allocation Budgétaire par Phase</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={budgetAllocation}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#BFA76A" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#BFA76A" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="phase" stroke="#666" fontSize={12} />
                <YAxis stroke="#666" fontSize={12} />
                <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                <Tooltip contentStyle={{ backgroundColor: '#1A1A1A', borderColor: '#333', borderRadius: '8px', color: '#fff' }} />
                <Area type="monotone" dataKey="value" stroke="#BFA76A" fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Projects Table */}
          <div className="bg-[#111] p-6 rounded-xl border border-white/10">
            <h3 className="text-lg font-bold text-white mb-6">Détail des 5 Principaux Projets</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">Projet</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">Status</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">Budget</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">Dépensé</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">Complétion</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Digital Transformation', status: 'On Track', budget: 500, spent: 340, completion: 68 },
                    { name: 'Cloud Migration', status: 'On Track', budget: 300, spent: 225, completion: 75 },
                    { name: 'AI Integration', status: 'At Risk', budget: 400, spent: 280, completion: 70 },
                    { name: 'Security Upgrade', status: 'On Track', budget: 200, spent: 150, completion: 75 },
                    { name: 'Data Analytics', status: 'On Track', budget: 250, spent: 150, completion: 60 },
                  ].map((project, idx) => (
                    <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4 text-gray-300">{project.name}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${project.status === 'On Track' ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'}`}>
                          {project.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-white">CHF {project.budget}k</td>
                      <td className="py-3 px-4 text-white">CHF {project.spent}k</td>
                      <td className="py-3 px-4">
                        <div className="w-20 bg-white/10 rounded-full h-2">
                          <div 
                            className="bg-[#BFA76A] h-2 rounded-full transition-all"
                            style={{width: `${project.completion}%`}}
                          />
                        </div>
                      </td>
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

export default PMOPortfolioDashboard;
