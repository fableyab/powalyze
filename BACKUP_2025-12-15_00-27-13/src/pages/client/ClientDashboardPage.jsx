import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/components/landing/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const data = [
  { name: 'Week 1', val: 4000 },
  { name: 'Week 2', val: 3000 },
  { name: 'Week 3', val: 2000 },
  { name: 'Week 4', val: 2780 },
  { name: 'Week 5', val: 1890 },
];

const ClientDashboardPage = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 px-6 container mx-auto">
        <h1 className="text-3xl font-display text-white mb-8">{t('client.dashboard.title')}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="bg-[#111] border-white/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">KPI Metric {i}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">98.2%</div>
                <p className="text-xs text-[#BFA76A] mt-1">+2.1% from last month</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-[#111] border-white/10 col-span-4">
          <CardHeader>
            <CardTitle className="text-white">Performance Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#BFA76A" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#BFA76A" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#555" />
                <YAxis stroke="#555" />
                <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }} />
                <Area type="monotone" dataKey="val" stroke="#BFA76A" fillOpacity={1} fill="url(#colorVal)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ClientDashboardPage;