import React, { useState } from 'react';
import { PageHeader, Card } from '@/components/ui/DashboardComponents';
import { Filter } from 'lucide-react';

const SlicerButton = ({ label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`px-4 py-2 text-xs uppercase tracking-wider rounded-sm transition-colors ${
      active 
      ? 'bg-[#BFA76A] text-black font-bold' 
      : 'bg-[#1C1C1C] text-gray-500 hover:bg-[#252525]'
    }`}
  >
    {label}
  </button>
);

const DetailedAnalysis = () => {
  const [period, setPeriod] = useState('YTD');
  
  return (
    <div>
      <PageHeader 
        title="Analyse Détaillée" 
        subtitle="Exploration Multidimensionnelle"
      />

      {/* Slicers Bar */}
      <div className="flex flex-wrap gap-4 mb-8 p-4 bg-[#1C1C1C] rounded-sm items-center">
        <div className="flex items-center gap-2 text-gray-500 mr-4">
          <Filter size={16} />
          <span className="text-xs uppercase">Filtres</span>
        </div>
        <div className="h-6 w-px bg-gray-700 mx-2"></div>
        <SlicerButton label="Mois" active={period === 'Month'} onClick={() => setPeriod('Month')} />
        <SlicerButton label="Quarter" active={period === 'QTD'} onClick={() => setPeriod('QTD')} />
        <SlicerButton label="Année (YTD)" active={period === 'YTD'} onClick={() => setPeriod('YTD')} />
        <div className="h-6 w-px bg-gray-700 mx-2"></div>
        <select className="bg-[#0A0A0A] text-gray-400 text-xs p-2 rounded-sm border-none focus:ring-1 focus:ring-[#BFA76A]">
          <option>Tous les Départements</option>
          <option>IT</option>
          <option>Marketing</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Matrix Table */}
        <Card className="lg:col-span-2 overflow-hidden flex flex-col">
          <h3 className="text-lg font-light text-white mb-4">Matrice de Performance</h3>
          <div className="overflow-auto flex-1">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#0A0A0A] text-gray-500 sticky top-0">
                <tr>
                  <th className="p-3 font-normal">Projet</th>
                  <th className="p-3 font-normal">Responsable</th>
                  <th className="p-3 font-normal text-right">Budget</th>
                  <th className="p-3 font-normal text-right">Var %</th>
                  <th className="p-3 font-normal text-center">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#222]">
                {[1,2,3,4,5,6,7,8].map((row) => (
                  <tr key={row} className="hover:bg-[#252525] transition-colors">
                    <td className="p-3 text-white font-medium">Transformation Cloud {row}</td>
                    <td className="p-3 text-gray-400">Sarah Connor</td>
                    <td className="p-3 text-right text-gray-300">450k€</td>
                    <td className={`p-3 text-right ${row % 2 === 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {row % 2 === 0 ? '+' : '-'}{row * 2.5}%
                    </td>
                    <td className="p-3 text-center">
                      <span className={`inline-block w-2 h-2 rounded-full ${row % 3 === 0 ? 'bg-red-500' : 'bg-green-500'}`}></span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Side Analysis */}
        <div className="flex flex-col gap-6">
          <Card className="flex-1">
            <h3 className="text-lg font-light text-white mb-4">Secondary KPI</h3>
            <div className="flex items-baseline gap-2 mb-2">
               <span className="text-5xl font-thin text-[#3A7BFF]">84.2</span>
               <span className="text-sm text-gray-500">Score</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              L'indice de performance composite montre une amélioration stable sur les 3 derniers sprints.
            </p>
            <div className="mt-6 h-32 flex items-end gap-1">
               {[40, 50, 45, 60, 55, 70, 84].map((h, i) => (
                 <div key={i} className="flex-1 bg-[#3A7BFF] opacity-50 hover:opacity-100 transition-opacity" style={{ height: `${h}%`}}></div>
               ))}
            </div>
          </Card>
          
          <Card className="flex-1 flex flex-col justify-center items-center text-center">
             <h3 className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-2">Efficacité</h3>
             <div className="relative w-32 h-32 flex items-center justify-center border-4 border-[#1C1C1C] rounded-full">
                <div className="absolute inset-0 border-4 border-[#BFA76A] rounded-full border-r-transparent rotate-45"></div>
                <span className="text-2xl font-bold text-white">+15%</span>
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetailedAnalysis;