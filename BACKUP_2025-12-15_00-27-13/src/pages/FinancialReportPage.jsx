import React, { useState } from 'react';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  ArrowLeft, Filter, Calendar, 
  DollarSign, TrendingUp, TrendingDown, Activity 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell, Legend, LineChart, Line 
} from 'recharts';
import { Link } from 'react-router-dom';
import PDFExportButton from '@/components/ui/PDFExportButton';

const FinancialReportPage = () => {
  const [timeRange, setTimeRange] = useState('YTD');
  const [activeFilter, setActiveFilter] = useState('All');

  // Real Sample Data
  const revenueData = [
    { month: 'Jan', revenue: 120000, expense: 80000, profit: 40000 },
    { month: 'Feb', revenue: 135000, expense: 85000, profit: 50000 },
    { month: 'Mar', revenue: 160000, expense: 95000, profit: 65000 },
    { month: 'Apr', revenue: 145000, expense: 90000, profit: 55000 },
    { month: 'May', revenue: 190000, expense: 110000, profit: 80000 },
    { month: 'Jun', revenue: 210000, expense: 120000, profit: 90000 },
  ];

  const expenseBreakdown = [
    { name: 'Salaries', value: 450000, color: '#3A7BFF' },
    { name: 'Marketing', value: 120000, color: '#BFA76A' },
    { name: 'Operations', value: 200000, color: '#10B981' },
    { name: 'IT & Software', value: 85000, color: '#8B5CF6' },
    { name: 'Office', value: 50000, color: '#F59E0B' },
  ];

  const cashFlowData = [
    { month: 'Jan', cashIn: 110000, cashOut: 82000 },
    { month: 'Feb', cashIn: 140000, cashOut: 88000 },
    { month: 'Mar', cashIn: 155000, cashOut: 100000 },
    { month: 'Apr', cashIn: 142000, cashOut: 92000 },
    { month: 'May', cashIn: 185000, cashOut: 105000 },
    { month: 'Jun', cashIn: 215000, cashOut: 118000 },
  ];

  const toggleTimeRange = () => {
    setTimeRange(prev => prev === 'YTD' ? 'QTD' : 'YTD');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans">
      <Navbar />
      
      <main className="pt-32 pb-20 container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
          <div>
            <Link to="/pmo-demo" className="text-gray-400 hover:text-white flex items-center gap-2 text-sm mb-4 transition-colors">
              <ArrowLeft size={14}/> Retour PMO Demo
            </Link>
            <h1 className="text-4xl font-display font-bold text-white mb-2">
              Rapport Financier <span className="text-[#BFA76A]">Exécutif</span>
            </h1>
            <p className="text-gray-400 max-w-2xl">
              Analyse détaillée de la performance financière, des flux de trésorerie et de la rentabilité.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Button 
              variant="outline" 
              onClick={toggleTimeRange}
              className={`border-white/10 hover:bg-white/5 ${timeRange === 'YTD' ? 'text-[#BFA76A] border-[#BFA76A]/50' : 'text-white'}`}
            >
              <Calendar size={16} className="mr-2" /> {timeRange}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setActiveFilter(prev => prev === 'All' ? 'Region: EU' : 'All')}
              className="border-white/10 text-white hover:bg-white/5"
            >
              <Filter size={16} className="mr-2" /> {activeFilter === 'All' ? 'Filtres' : activeFilter}
            </Button>
            
            <PDFExportButton targetId="financial-report-content" label="Exporter PDF" className="bg-[#BFA76A] text-black hover:bg-white border-none" />
          </div>
        </div>

        {/* Content ID for Export */}
        <div id="financial-report-content" className="bg-[#0A0A0A] p-4 -m-4 rounded-xl">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-[#111] border-white/10 p-6 hover:border-[#BFA76A]/30 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-green-500/10 rounded-lg text-green-500"><DollarSign size={20} /></div>
                <span className="text-xs text-green-500 flex items-center gap-1">+12.5% <TrendingUp size={12}/></span>
              </div>
              <div>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Revenu Total (YTD)</p>
                <h3 className="text-3xl font-bold text-white">CHF 960k</h3>
              </div>
            </Card>
            
            <Card className="bg-[#111] border-white/10 p-6 hover:border-[#BFA76A]/30 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500"><Activity size={20} /></div>
                <span className="text-xs text-green-500 flex items-center gap-1">+8.2% <TrendingUp size={12}/></span>
              </div>
              <div>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Marge Nette</p>
                <h3 className="text-3xl font-bold text-white">39.5%</h3>
              </div>
            </Card>

            <Card className="bg-[#111] border-white/10 p-6 hover:border-[#BFA76A]/30 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-red-500/10 rounded-lg text-red-500"><TrendingDown size={20} /></div>
                <span className="text-xs text-red-500 flex items-center gap-1">+2.1% <TrendingUp size={12}/></span>
              </div>
              <div>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Dépenses Op.</p>
                <h3 className="text-3xl font-bold text-white">CHF 580k</h3>
              </div>
            </Card>

            <Card className="bg-[#111] border-white/10 p-6 hover:border-[#BFA76A]/30 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-[#BFA76A]/10 rounded-lg text-[#BFA76A]"><DollarSign size={20} /></div>
                <span className="text-xs text-gray-500">Stable</span>
              </div>
              <div>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Cash Flow</p>
                <h3 className="text-3xl font-bold text-white">CHF 380k</h3>
              </div>
            </Card>
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Revenue vs Expense */}
            <div className="bg-[#111] p-6 rounded-xl border border-white/10 h-[400px]">
              <h3 className="text-lg font-bold text-white mb-6">Revenus vs Dépenses</h3>
              <ResponsiveContainer width="100%" height="85%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                  <XAxis dataKey="month" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val/1000}k`} />
                  <Tooltip 
                    cursor={{fill: 'rgba(255,255,255,0.05)'}}
                    contentStyle={{ backgroundColor: '#1A1A1A', borderColor: '#333', borderRadius: '8px', color: '#fff' }}
                  />
                  <Legend />
                  <Bar dataKey="revenue" name="Revenus" fill="#BFA76A" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expense" name="Dépenses" fill="#333" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Profit Trend */}
            <div className="bg-[#111] p-6 rounded-xl border border-white/10 h-[400px]">
               <h3 className="text-lg font-bold text-white mb-6">Évolution du Profit Net</h3>
               <ResponsiveContainer width="100%" height="85%">
                 <AreaChart data={revenueData}>
                   <defs>
                     <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                       <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                     </linearGradient>
                   </defs>
                   <XAxis dataKey="month" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                   <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                   <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                   <Tooltip contentStyle={{ backgroundColor: '#1A1A1A', borderColor: '#333', borderRadius: '8px', color: '#fff' }} />
                   <Area type="monotone" dataKey="profit" stroke="#10B981" fillOpacity={1} fill="url(#colorProfit)" />
                 </AreaChart>
               </ResponsiveContainer>
            </div>
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
             {/* Expense Breakdown */}
             <div className="bg-[#111] p-6 rounded-xl border border-white/10 h-[400px]">
                <h3 className="text-lg font-bold text-white mb-6">Répartition des Dépenses</h3>
                <ResponsiveContainer width="100%" height="85%">
                  <PieChart>
                    <Pie
                      data={expenseBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {expenseBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#1A1A1A', borderColor: '#333', borderRadius: '8px', color: '#fff' }} />
                    <Legend verticalAlign="bottom" height={36}/>
                  </PieChart>
                </ResponsiveContainer>
             </div>

             {/* Cash Flow */}
             <div className="lg:col-span-2 bg-[#111] p-6 rounded-xl border border-white/10 h-[400px]">
                <h3 className="text-lg font-bold text-white mb-6">Flux de Trésorerie (Cash Flow)</h3>
                <ResponsiveContainer width="100%" height="85%">
                   <LineChart data={cashFlowData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                      <XAxis dataKey="month" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={{ backgroundColor: '#1A1A1A', borderColor: '#333', borderRadius: '8px', color: '#fff' }} />
                      <Legend />
                      <Line type="monotone" dataKey="cashIn" name="Entrées" stroke="#10B981" strokeWidth={3} dot={{r:4}} />
                      <Line type="monotone" dataKey="cashOut" name="Sorties" stroke="#EF4444" strokeWidth={3} dot={{r:4}} />
                   </LineChart>
                </ResponsiveContainer>
             </div>
          </div>
        </div>

      </main>
      <FooterSection />
    </div>
  );
};

export default FinancialReportPage;