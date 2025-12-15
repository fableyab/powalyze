import React from 'react';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import { useDemoMode } from '@/context/DemoModeContext';
import { Card, KPICard } from '@/components/ui/DashboardComponents';
import { SimpleLineChart, SimpleBarChart } from '@/components/ui/ChartComponents';
import { Users, Eye, MousePointer, AlertCircle } from 'lucide-react';

const DemoDashboardPage = () => {
  const { isDemoMode, demoData, toggleDemoMode } = useDemoMode();

  // If not in demo mode, show a teaser
  if (!isDemoMode || !demoData) {
     return (
        <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col">
           <Navbar />
           <div className="flex-grow flex flex-col items-center justify-center p-6 text-center">
              <div className="max-w-md">
                 <h1 className="text-3xl font-bold mb-4">Analytics Dashboard</h1>
                 <p className="text-gray-400 mb-8">Activate Demo Mode to view sample analytics data including user sessions, conversion metrics, and performance stats.</p>
                 <button 
                   onClick={toggleDemoMode}
                   className="px-6 py-3 bg-[#BFA76A] text-black font-bold rounded-lg hover:bg-white transition-colors"
                 >
                    Activate Demo Data
                 </button>
              </div>
           </div>
        </div>
     );
  }

  const { analytics } = demoData;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col">
       <Navbar />
       
       <main className="flex-grow pt-32 pb-20 container mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
             <h1 className="text-3xl font-bold">Analytics Overview</h1>
             <div className="text-xs text-[#BFA76A] bg-[#BFA76A]/10 px-3 py-1 rounded-full border border-[#BFA76A]/20">
                Sample Data Active
             </div>
          </div>

          {/* KPI Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
             <KPICard 
               title="Active Users" 
               value="1,240" 
               change="+12%" 
               trend="up" 
               icon={Users} 
             />
             <KPICard 
               title="Page Views" 
               value="45.2k" 
               change="+5%" 
               trend="up" 
               icon={Eye} 
               color="blue"
             />
             <KPICard 
               title="Avg. Session" 
               value="4m 12s" 
               change="-2%" 
               trend="down" 
               icon={MousePointer} 
             />
             <KPICard 
               title="Error Rate" 
               value="0.4%" 
               change="-0.1%" 
               trend="up" 
               icon={AlertCircle} 
               trendColor="text-green-500"
             />
          </div>

          {/* Charts Area */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
             <Card>
                <h3 className="text-white font-bold mb-6">User Sessions (7 Days)</h3>
                <SimpleLineChart 
                   data={analytics.sessions.map(s => s.value)} 
                   height={200}
                   color="#BFA76A"
                />
                <div className="flex justify-between mt-4 text-xs text-gray-500">
                   {analytics.sessions.map(s => <span key={s.date}>{s.date}</span>)}
                </div>
             </Card>

             <Card>
                <h3 className="text-white font-bold mb-6">Conversion Funnel</h3>
                <div className="space-y-4">
                   {Object.entries(analytics.conversions).map(([key, val]) => (
                      <div key={key}>
                         <div className="flex justify-between text-sm mb-1">
                            <span className="capitalize text-gray-300">{key} Plan</span>
                            <span className="font-bold text-white">{val}%</span>
                         </div>
                         <div className="h-2 bg-[#222] rounded-full overflow-hidden">
                            <div className="h-full bg-[#3A7BFF]" style={{ width: `${val * 4}%` }}></div>
                         </div>
                      </div>
                   ))}
                </div>
             </Card>
          </div>

          {/* Top Pages Table */}
          <Card>
             <h3 className="text-white font-bold mb-4">Top Pages</h3>
             <table className="w-full text-left text-sm">
                <thead className="bg-[#1C1C1C] text-gray-500">
                   <tr>
                      <th className="p-3 rounded-l">Page Path</th>
                      <th className="p-3 text-right rounded-r">Unique Views</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-[#222]">
                   {analytics.topPages.map((page, i) => (
                      <tr key={i}>
                         <td className="p-3 text-gray-300">{page.path}</td>
                         <td className="p-3 text-right font-mono text-[#BFA76A]">{page.views.toLocaleString()}</td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </Card>
       </main>
       
       <FooterSection />
    </div>
  );
};

export default DemoDashboardPage;