import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const InteractiveExamples = ({ type = 'pmo' }) => {
  const [timeRange, setTimeRange] = useState('6m');

  // Données PMO
  const portfolioData = [
    { name: 'Jan', onTrack: 45, atRisk: 20, delayed: 10 },
    { name: 'Fév', onTrack: 52, atRisk: 18, delayed: 8 },
    { name: 'Mar', onTrack: 58, atRisk: 15, delayed: 6 },
    { name: 'Avr', onTrack: 65, atRisk: 12, delayed: 4 },
    { name: 'Mai', onTrack: 70, atRisk: 10, delayed: 3 },
    { name: 'Juin', onTrack: 75, atRisk: 8, delayed: 2 }
  ];

  const budgetData = [
    { name: 'Q1', budgeted: 450, spent: 420, remaining: 30 },
    { name: 'Q2', budgeted: 520, spent: 485, remaining: 35 },
    { name: 'Q3', budgeted: 580, spent: 550, remaining: 30 },
    { name: 'Q4', budgeted: 620, spent: 590, remaining: 30 }
  ];

  const resourceData = [
    { name: 'PMO Manager', value: 25, fill: '#BFA76A' },
    { name: 'Business Analyst', value: 30, fill: '#3B82F6' },
    { name: 'Technical Lead', value: 20, fill: '#10B981' },
    { name: 'Project Manager', value: 25, fill: '#F59E0B' }
  ];

  // Données Power BI
  const salesData = [
    { month: 'Jan', revenue: 65000, target: 70000 },
    { month: 'Fév', revenue: 78000, target: 75000 },
    { month: 'Mar', revenue: 82000, target: 80000 },
    { month: 'Avr', revenue: 75000, target: 78000 },
    { month: 'Mai', revenue: 88000, target: 85000 },
    { month: 'Juin', revenue: 95000, target: 90000 }
  ];

  const performanceData = [
    { kpi: 'Conversion Rate', value: 4.2, target: 4.0, status: 'good' },
    { kpi: 'Customer Satisfaction', value: 8.7, target: 8.5, status: 'good' },
    { kpi: 'Time to Market', value: 12, target: 15, status: 'excellent' },
    { kpi: 'Cost per Lead', value: 45, target: 50, status: 'good' }
  ];

  return (
    <div className="py-20 bg-[#0A0A0A]">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            {type === 'pmo' ? 'Exemples Interactifs PMO' : 'Exemples Interactifs Power BI'}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {type === 'pmo'
              ? 'Visualisez en temps réel le pilotage de votre portefeuille de projets avec nos dashboards PMO.'
              : 'Explorez la puissance de nos solutions de business intelligence avec des exemples concrets.'}
          </p>
        </motion.div>

        <Tabs defaultValue={type === 'pmo' ? 'portfolio' : 'revenue'} className="w-full">
          <TabsList className="grid w-full mb-8 bg-[#111] border border-white/10">
            {type === 'pmo' ? (
              <>
                <TabsTrigger value="portfolio" className="data-[state=active]:bg-[#BFA76A] data-[state=active]:text-black">
                  Portefeuille Projets
                </TabsTrigger>
                <TabsTrigger value="budget" className="data-[state=active]:bg-[#BFA76A] data-[state=active]:text-black">
                  Budget & Coûts
                </TabsTrigger>
                <TabsTrigger value="resources" className="data-[state=active]:bg-[#BFA76A] data-[state=active]:text-black">
                  Ressources
                </TabsTrigger>
              </>
            ) : (
              <>
                <TabsTrigger value="revenue" className="data-[state=active]:bg-[#BFA76A] data-[state=active]:text-black">
                  Chiffre d'Affaires
                </TabsTrigger>
                <TabsTrigger value="kpi" className="data-[state=active]:bg-[#BFA76A] data-[state=active]:text-black">
                  KPIs
                </TabsTrigger>
              </>
            )}
          </TabsList>

          {type === 'pmo' ? (
            <>
              <TabsContent value="portfolio" className="space-y-6">
                <div className="bg-[#111] border border-white/10 rounded-xl p-8">
                  <h3 className="text-xl font-bold text-white mb-6">État du Portefeuille (6 derniers mois)</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={portfolioData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="name" stroke="#999" />
                      <YAxis stroke="#999" />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #333' }}
                        labelStyle={{ color: '#fff' }}
                      />
                      <Legend />
                      <Bar dataKey="onTrack" stackId="a" fill="#10B981" />
                      <Bar dataKey="atRisk" stackId="a" fill="#F59E0B" />
                      <Bar dataKey="delayed" stackId="a" fill="#EF4444" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>

              <TabsContent value="budget" className="space-y-6">
                <div className="bg-[#111] border border-white/10 rounded-xl p-8">
                  <h3 className="text-xl font-bold text-white mb-6">Suivi du Budget par Trimestre</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={budgetData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="name" stroke="#999" />
                      <YAxis stroke="#999" />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #333' }}
                        labelStyle={{ color: '#fff' }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="budgeted" stroke="#BFA76A" strokeWidth={2} />
                      <Line type="monotone" dataKey="spent" stroke="#3B82F6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>

              <TabsContent value="resources" className="space-y-6">
                <div className="bg-[#111] border border-white/10 rounded-xl p-8">
                  <h3 className="text-xl font-bold text-white mb-6">Allocation des Ressources</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={resourceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {resourceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #333' }}
                        labelStyle={{ color: '#fff' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </>
          ) : (
            <>
              <TabsContent value="revenue" className="space-y-6">
                <div className="bg-[#111] border border-white/10 rounded-xl p-8">
                  <h3 className="text-xl font-bold text-white mb-6">Chiffre d'Affaires vs Objectif</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="month" stroke="#999" />
                      <YAxis stroke="#999" />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #333' }}
                        labelStyle={{ color: '#fff' }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="revenue" stroke="#BFA76A" strokeWidth={3} />
                      <Line type="monotone" dataKey="target" stroke="#999" strokeDasharray="5 5" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>

              <TabsContent value="kpi" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {performanceData.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="bg-[#111] border border-white/10 rounded-xl p-6"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-white font-bold">{item.kpi}</h4>
                        <span className={`px-3 py-1 rounded text-xs font-bold ${
                          item.status === 'excellent' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {item.status === 'excellent' ? '↑ Excellent' : '✓ On Target'}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Actuel</span>
                          <span className="text-white font-bold">{item.value}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Objectif</span>
                          <span className="text-gray-400">{item.target}</span>
                        </div>
                        <div className="w-full bg-[#1A1A1A] rounded-full h-2 mt-3">
                          <div
                            className="bg-[#BFA76A] h-2 rounded-full transition-all"
                            style={{ width: `${Math.min((item.value / item.target) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default InteractiveExamples;
