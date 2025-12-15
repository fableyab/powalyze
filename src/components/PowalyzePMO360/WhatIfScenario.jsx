import React, { useState } from 'react';
import { Sliders, RefreshCw, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WhatIfScenario = () => {
  const [budgetCut, setBudgetCut] = useState(0);
  const [delay, setDelay] = useState(0);
  const [capacity, setCapacity] = useState(100);

  const impactCost = (12.5 * (1 - budgetCut/100)).toFixed(1);
  const impactRisk = Math.min(100, 24 + (budgetCut * 1.5) + (delay * 2) + (100 - capacity)).toFixed(0);

  return (
    <div className="bg-[#111] border border-white/10 rounded-xl p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
         <div className="flex items-center gap-2">
            <Sliders className="text-[#3A7BFF]" size={20} />
            <div>
               <h3 className="text-lg font-bold text-white">Simulation Parameters</h3>
               <p className="text-xs text-gray-500">Adjust to see portfolio impact</p>
            </div>
         </div>
         <Button variant="ghost" size="sm" onClick={() => { setBudgetCut(0); setDelay(0); setCapacity(100); }} className="h-8 w-8 p-0 text-gray-500 hover:text-white">
            <RefreshCw size={14} />
         </Button>
      </div>

      <div className="space-y-8 flex-1">
         <div>
            <div className="flex justify-between text-sm mb-3 text-gray-300">
               <span>Budget Reduction</span>
               <span className="text-[#BFA76A] font-mono font-bold">{budgetCut}%</span>
            </div>
            <input 
               type="range" min="0" max="50" value={budgetCut} 
               onChange={(e) => setBudgetCut(parseInt(e.target.value))}
               className="w-full h-2 bg-[#222] rounded-lg appearance-none cursor-pointer accent-[#BFA76A]"
            />
            <div className="flex justify-between text-[10px] text-gray-600 mt-1">
               <span>0%</span>
               <span>50%</span>
            </div>
         </div>

         <div>
            <div className="flex justify-between text-sm mb-3 text-gray-300">
               <span>Schedule Slip</span>
               <span className="text-[#3A7BFF] font-mono font-bold">{delay} mos</span>
            </div>
            <input 
               type="range" min="0" max="12" value={delay} 
               onChange={(e) => setDelay(parseInt(e.target.value))}
               className="w-full h-2 bg-[#222] rounded-lg appearance-none cursor-pointer accent-[#3A7BFF]"
            />
            <div className="flex justify-between text-[10px] text-gray-600 mt-1">
               <span>0</span>
               <span>12 mos</span>
            </div>
         </div>
         
         <div>
            <div className="flex justify-between text-sm mb-3 text-gray-300">
               <span>Resource Capacity</span>
               <span className="text-green-500 font-mono font-bold">{capacity}%</span>
            </div>
            <input 
               type="range" min="50" max="100" value={capacity} 
               onChange={(e) => setCapacity(parseInt(e.target.value))}
               className="w-full h-2 bg-[#222] rounded-lg appearance-none cursor-pointer accent-green-500"
            />
            <div className="flex justify-between text-[10px] text-gray-600 mt-1">
               <span>50%</span>
               <span>100%</span>
            </div>
         </div>
      </div>

      <div className="mt-8 pt-6 border-t border-white/10">
         <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-white/5 rounded-lg text-center border border-white/5">
               <div className="text-[10px] text-gray-500 uppercase mb-1 tracking-wider">Proj. Budget</div>
               <div className="text-2xl font-display font-bold text-white">€{impactCost}M</div>
               <div className="text-xs text-red-400 mt-1">-{budgetCut}% vs Plan</div>
            </div>
            <div className="p-4 bg-white/5 rounded-lg text-center border border-white/5">
               <div className="text-[10px] text-gray-500 uppercase mb-1 tracking-wider">Risk Index</div>
               <div className={`text-2xl font-display font-bold ${impactRisk > 50 ? 'text-red-500' : 'text-green-500'}`}>{impactRisk}</div>
               <div className="text-xs text-gray-400 mt-1">Base: 24</div>
            </div>
         </div>
         <Button className="w-full bg-[#BFA76A] text-black hover:bg-white font-bold">
            <Save size={16} className="mr-2" /> Save Scenario
         </Button>
      </div>
    </div>
  );
};

export default WhatIfScenario;