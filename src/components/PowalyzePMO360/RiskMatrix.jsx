import React from 'react';
import { motion } from 'framer-motion';

const RiskMatrix = ({ risks }) => {
  const levels = ['High', 'Medium', 'Low'];
  
  const getCellColor = (pIndex, iIndex) => {
    // 0=High, 1=Med, 2=Low
    // High Prob (0) + High/Med Impact (0,1) = Critical
    if (pIndex === 0 && iIndex <= 1) return 'bg-red-900/40 border-red-500/30'; 
    if (pIndex === 1 && iIndex === 0) return 'bg-red-900/40 border-red-500/30';
    // Low/Low = Green
    if (pIndex === 2 && iIndex === 2) return 'bg-green-900/20 border-green-500/30';
    return 'bg-yellow-900/20 border-yellow-500/30';
  };

  return (
    <div className="relative w-full h-[400px] flex flex-col bg-[#111] p-6 rounded-xl border border-white/10">
      <h3 className="text-lg font-bold text-white mb-4">Risk Heatmap</h3>
      
      <div className="flex-1 flex relative">
         {/* Y Axis Labels (Probability) */}
         <div className="flex flex-col justify-around pr-4 text-xs text-gray-500 font-bold w-16 text-right h-full">
            <span>High</span>
            <span>Medium</span>
            <span>Low</span>
         </div>
         
         <div className="flex-1 grid grid-cols-3 grid-rows-3 gap-1 h-full">
            {levels.map((prob, pIndex) => (
               levels.map((impact, iIndex) => {
                  const cellRisks = risks.filter(r => r.probability === prob && r.impact === impact);
                  return (
                    <div 
                      key={`${prob}-${impact}`} 
                      className={`relative rounded border flex items-center justify-center flex-wrap content-center gap-1 p-2 ${getCellColor(pIndex, iIndex)} transition-colors hover:bg-opacity-50`}
                    >
                      {cellRisks.map((item, k) => (
                        <motion.div 
                           key={k}
                           whileHover={{ scale: 1.2, zIndex: 10 }}
                           className="w-8 h-8 rounded-full bg-white text-black text-[10px] font-bold flex items-center justify-center cursor-pointer shadow-lg border-2 border-transparent hover:border-[#BFA76A]"
                           title={`${item.title} (${item.projectId})`}
                        >
                           {item.id.split('-')[2] || k+1}
                        </motion.div>
                      ))}
                      {cellRisks.length === 0 && <span className="text-white/10 text-xs">-</span>}
                    </div>
                  );
               })
            ))}
         </div>
      </div>
      
      {/* X Axis Labels (Impact) */}
      <div className="flex justify-around pl-16 pt-4 text-xs text-gray-500 font-bold w-full">
         <span>High</span>
         <span>Medium</span>
         <span>Low</span>
      </div>
      
      {/* Axis Titles */}
      <div className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] text-gray-400 uppercase tracking-widest origin-center">Probability</div>
      <div className="text-center text-[10px] text-gray-400 uppercase tracking-widest mt-2">Impact</div>
    </div>
  );
};

export default RiskMatrix;