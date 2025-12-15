import React, { useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { Loader2, Maximize2, Filter, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock Data for Visuals
const SALES_DATA = [
  { region: 'NA', sales: 4000, profit: 2400 },
  { region: 'EU', sales: 3000, profit: 1398 },
  { region: 'APAC', sales: 2000, profit: 9800 },
  { region: 'LATAM', sales: 2780, profit: 3908 },
];

const CATEGORY_DATA = [
  { name: 'Technology', value: 400 },
  { name: 'Services', value: 300 },
  { name: 'Retail', value: 300 },
  { name: 'Finance', value: 200 },
];

const COLORS = ['#BFA76A', '#3A7BFF', '#10B981', '#F59E0B'];

const DemoPowerBIEmbed = ({ reportType = 'sales', height = "600px" }) => {
  const [loading, setLoading] = useState(false);
  
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="w-full bg-[#1C1C1C] border border-white/10 rounded-xl overflow-hidden flex flex-col" style={{ height }}>
      {/* Fake Power BI Header */}
      <div className="bg-[#252525] border-b border-white/10 px-4 py-2 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-4">
          <span className="text-[#F2C811] font-bold text-lg">Power BI</span>
          <div className="h-4 w-[1px] bg-white/20"></div>
          <span className="text-sm text-gray-300">
             {reportType === 'sales' ? 'Global Sales Overview' : 'Project Portfolio Status'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white h-8" onClick={handleRefresh}>
             <span className="text-xs">Refresh</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white h-8">
             <Filter size={14} className="mr-1"/> <span className="text-xs">Filters</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white h-8">
             <Download size={14} className="mr-1"/> <span className="text-xs">Export</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white h-8">
             <Maximize2 size={14} />
          </Button>
        </div>
      </div>

      {/* Content Area */}
      <div className="relative flex-grow bg-[#F3F4F6] p-4 overflow-y-auto">
        {loading && (
          <div className="absolute inset-0 z-10 bg-white/80 flex flex-col items-center justify-center">
            <Loader2 className="w-10 h-10 text-[#F2C811] animate-spin" />
            <p className="text-gray-500 text-sm mt-2 font-semibold">Loading data...</p>
          </div>
        )}

        {/* Fake Report Layout */}
        <div className="grid grid-cols-12 gap-4 h-full">
           {/* KPI Cards */}
           <div className="col-span-12 grid grid-cols-4 gap-4 mb-2">
              <div className="bg-white p-4 shadow-sm border border-gray-200">
                 <div className="text-xs text-gray-500 uppercase">Total Revenue</div>
                 <div className="text-2xl font-bold text-gray-800">$12.4M</div>
              </div>
              <div className="bg-white p-4 shadow-sm border border-gray-200">
                 <div className="text-xs text-gray-500 uppercase">YTD Growth</div>
                 <div className="text-2xl font-bold text-green-600">+18.2%</div>
              </div>
              <div className="bg-white p-4 shadow-sm border border-gray-200">
                 <div className="text-xs text-gray-500 uppercase">Active Clients</div>
                 <div className="text-2xl font-bold text-gray-800">1,240</div>
              </div>
              <div className="bg-white p-4 shadow-sm border border-gray-200">
                 <div className="text-xs text-gray-500 uppercase">Avg. Deal Size</div>
                 <div className="text-2xl font-bold text-gray-800">$42.5k</div>
              </div>
           </div>

           {/* Main Charts */}
           <div className="col-span-8 bg-white p-4 shadow-sm border border-gray-200 flex flex-col">
              <h4 className="text-gray-700 font-bold mb-4 text-sm">Revenue by Region</h4>
              <div className="flex-grow min-h-[300px]">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={SALES_DATA}>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} />
                       <XAxis dataKey="region" />
                       <YAxis />
                       <Tooltip />
                       <Bar dataKey="sales" fill="#0078D4" />
                       <Bar dataKey="profit" fill="#118DFF" />
                    </BarChart>
                 </ResponsiveContainer>
              </div>
           </div>

           <div className="col-span-4 bg-white p-4 shadow-sm border border-gray-200 flex flex-col">
              <h4 className="text-gray-700 font-bold mb-4 text-sm">Sales by Category</h4>
              <div className="flex-grow min-h-[300px]">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                       <Pie
                          data={CATEGORY_DATA}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                       >
                          {CATEGORY_DATA.map((entry, index) => (
                             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                       </Pie>
                       <Tooltip />
                    </PieChart>
                 </ResponsiveContainer>
              </div>
           </div>

           {/* Data Table */}
           <div className="col-span-12 bg-white p-4 shadow-sm border border-gray-200 overflow-x-auto">
              <h4 className="text-gray-700 font-bold mb-2 text-sm">Detailed Transactions</h4>
              <table className="w-full text-left text-xs text-gray-600">
                 <thead className="bg-gray-100 font-bold">
                    <tr>
                       <th className="p-2">Date</th>
                       <th className="p-2">Region</th>
                       <th className="p-2">Category</th>
                       <th className="p-2 text-right">Amount</th>
                       <th className="p-2 text-right">Profit</th>
                    </tr>
                 </thead>
                 <tbody>
                    {[1,2,3,4,5].map(i => (
                       <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-2">2024-01-0{i}</td>
                          <td className="p-2">{['NA','EU','APAC'][i%3]}</td>
                          <td className="p-2">{['Tech','Service'][i%2]}</td>
                          <td className="p-2 text-right">${(1000*i).toLocaleString()}</td>
                          <td className="p-2 text-right text-green-600">${(200*i).toLocaleString()}</td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      </div>
      
      {/* Fake Footer */}
      <div className="bg-[#252525] border-t border-white/10 px-4 py-1 flex justify-between items-center text-[10px] text-gray-400">
         <span>Page 1 of 3</span>
         <span>Data updated: Just now</span>
      </div>
    </div>
  );
};

export default DemoPowerBIEmbed;