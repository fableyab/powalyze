import React, { useState } from 'react';
import { PageHeader, Card } from '@/components/ui/DashboardComponents';
import { Database, Filter, FunctionSquare, Table2, PlayCircle, BarChart2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DataAnalystDemo = () => {
  const [activeTab, setActiveTab] = useState('transform');
  const [queryRunning, setQueryRunning] = useState(false);
  const [queryResult, setQueryResult] = useState(null);

  const runQuery = () => {
    setQueryRunning(true);
    setQueryResult(null);
    setTimeout(() => {
      setQueryRunning(false);
      setQueryResult([
        { id: 1, region: "Europe", sales: 154000, profit: 42000 },
        { id: 2, region: "NA", sales: 210000, profit: 56000 },
        { id: 3, region: "APAC", sales: 98000, profit: 21000 },
      ]);
    }, 1500);
  };

  return (
    <div>
      <PageHeader 
        title="Data Analyst Workspace" 
        subtitle="Power BI Data Transformation & DAX Sandbox"
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
         <button 
           onClick={() => setActiveTab('transform')}
           className={`p-4 rounded border text-left flex items-center gap-3 transition-colors ${activeTab === 'transform' ? 'bg-[#BFA76A]/20 border-[#BFA76A] text-white' : 'bg-[#1C1C1C] border-[#333] text-gray-400 hover:text-white'}`}
         >
            <Filter size={20} /> Data Transformation
         </button>
         <button 
           onClick={() => setActiveTab('dax')}
           className={`p-4 rounded border text-left flex items-center gap-3 transition-colors ${activeTab === 'dax' ? 'bg-[#BFA76A]/20 border-[#BFA76A] text-white' : 'bg-[#1C1C1C] border-[#333] text-gray-400 hover:text-white'}`}
         >
            <FunctionSquare size={20} /> DAX Measures
         </button>
         <button 
           onClick={() => setActiveTab('model')}
           className={`p-4 rounded border text-left flex items-center gap-3 transition-colors ${activeTab === 'model' ? 'bg-[#BFA76A]/20 border-[#BFA76A] text-white' : 'bg-[#1C1C1C] border-[#333] text-gray-400 hover:text-white'}`}
         >
            <Database size={20} /> Data Model
         </button>
         <button 
           onClick={() => setActiveTab('viz')}
           className={`p-4 rounded border text-left flex items-center gap-3 transition-colors ${activeTab === 'viz' ? 'bg-[#BFA76A]/20 border-[#BFA76A] text-white' : 'bg-[#1C1C1C] border-[#333] text-gray-400 hover:text-white'}`}
         >
            <BarChart2 size={20} /> Visualization
         </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* EDITOR AREA */}
         <Card className="lg:col-span-2 min-h-[500px] flex flex-col">
            <h3 className="text-white font-bold mb-4 flex justify-between items-center">
               <span>
                  {activeTab === 'transform' && "Power Query Editor (M)"}
                  {activeTab === 'dax' && "DAX Formula Editor"}
                  {activeTab === 'model' && "Relationship View"}
                  {activeTab === 'viz' && "Report Canvas"}
               </span>
               <button 
                  onClick={runQuery}
                  disabled={queryRunning}
                  className="flex items-center gap-2 px-3 py-1 bg-green-600 hover:bg-green-500 text-white rounded text-sm disabled:opacity-50"
               >
                  <PlayCircle size={16} /> Run
               </button>
            </h3>

            <div className="flex-grow bg-[#0F0F0F] border border-[#333] rounded p-4 font-mono text-sm text-gray-300 relative overflow-hidden">
               {activeTab === 'transform' && (
                  <div className="space-y-2">
                     <div className="text-blue-400">let</div>
                     <div className="pl-4">
                        <span className="text-yellow-300">Source</span> = <span className="text-green-400">Excel.Workbook</span>(File.Contents(<span className="text-orange-300">"C:\Data\Sales.xlsx"</span>), null, true),
                     </div>
                     <div className="pl-4">
                        <span className="text-yellow-300">CleanedData</span> = <span className="text-green-400">Table.SelectRows</span>(Source, each ([Amount] &gt; 0)),
                     </div>
                     <div className="pl-4">
                        <span className="text-yellow-300">Typed</span> = <span className="text-green-400">Table.TransformColumnTypes</span>(CleanedData, {'{{"Date", type date}, {"Amount", type number}}'})
                     </div>
                     <div className="text-blue-400">in</div>
                     <div className="pl-4">
                        <span className="text-yellow-300">Typed</span>
                     </div>
                  </div>
               )}
               {activeTab === 'dax' && (
                  <div className="space-y-2">
                     <div><span className="text-purple-400">Total Sales YTD</span> = </div>
                     <div className="pl-4">
                        <span className="text-blue-400">CALCULATE</span>(
                     </div>
                     <div className="pl-8">
                        <span className="text-blue-400">SUM</span>('Sales'[Amount]),
                     </div>
                     <div className="pl-8">
                        <span className="text-blue-400">DATESYTD</span>('Date'[Date])
                     </div>
                     <div className="pl-4">)</div>
                  </div>
               )}
               
               <AnimatePresence>
                  {queryRunning && (
                     <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/80 flex items-center justify-center z-10"
                     >
                        <div className="flex flex-col items-center">
                           <div className="w-8 h-8 border-2 border-[#BFA76A] border-t-transparent rounded-full animate-spin mb-2"></div>
                           <span className="text-[#BFA76A] text-xs">Processing Data...</span>
                        </div>
                     </motion.div>
                  )}
               </AnimatePresence>
            </div>
            
            {/* Console / Output */}
            <div className="mt-4 h-40 bg-[#161616] border border-[#333] rounded p-2 overflow-auto">
               <div className="text-xs text-gray-500 uppercase font-bold mb-2">Output Console</div>
               {queryResult ? (
                  <table className="w-full text-left text-xs text-gray-300">
                     <thead className="text-gray-500 border-b border-[#333]">
                        <tr>
                           <th className="pb-1">ID</th>
                           <th className="pb-1">Region</th>
                           <th className="pb-1">Sales</th>
                           <th className="pb-1">Profit</th>
                        </tr>
                     </thead>
                     <tbody>
                        {queryResult.map(r => (
                           <tr key={r.id}>
                              <td className="py-1">{r.id}</td>
                              <td className="py-1">{r.region}</td>
                              <td className="py-1">€{r.sales.toLocaleString()}</td>
                              <td className="py-1 text-green-500">€{r.profit.toLocaleString()}</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               ) : (
                  <div className="text-gray-600 text-xs italic">Waiting for query execution...</div>
               )}
            </div>
         </Card>

         {/* SIDEBAR TOOLS */}
         <div className="space-y-6">
            <Card>
               <h4 className="text-white font-bold mb-3 text-sm">Available Tables</h4>
               <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-center gap-2 hover:text-white cursor-pointer"><Table2 size={14}/> Sales_Fact</li>
                  <li className="flex items-center gap-2 hover:text-white cursor-pointer"><Table2 size={14}/> Customers_Dim</li>
                  <li className="flex items-center gap-2 hover:text-white cursor-pointer"><Table2 size={14}/> Products_Dim</li>
                  <li className="flex items-center gap-2 hover:text-white cursor-pointer"><Table2 size={14}/> Calendar_Dim</li>
               </ul>
            </Card>
            <Card>
               <h4 className="text-white font-bold mb-3 text-sm">Quick Measures</h4>
               <div className="space-y-2">
                  <button className="w-full text-left px-3 py-2 bg-[#222] hover:bg-[#333] rounded text-xs text-gray-300 transition-colors">
                     % Grand Total
                  </button>
                  <button className="w-full text-left px-3 py-2 bg-[#222] hover:bg-[#333] rounded text-xs text-gray-300 transition-colors">
                     Year-over-Year Change
                  </button>
                  <button className="w-full text-left px-3 py-2 bg-[#222] hover:bg-[#333] rounded text-xs text-gray-300 transition-colors">
                     Running Total
                  </button>
               </div>
            </Card>
         </div>
      </div>
    </div>
  );
};

export default DataAnalystDemo;