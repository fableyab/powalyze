import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// --- HEATMAP COMPONENT ---
export const RiskHeatmap = ({ data, onHover }) => {
  // data is array of { id, prob: 'Low'|'Medium'|'High', impact: 'Low'|'Medium'|'High' }
  const levels = ['High', 'Medium', 'Low'];
  
  const getCellColor = (pIndex, iIndex) => {
    // High Prob (0) + High Impact (0) = Critical (Red)
    if (pIndex === 0 && iIndex === 0) return 'bg-red-900/80 border-red-500';
    if (pIndex === 0 && iIndex === 1) return 'bg-red-800/60 border-red-400';
    if (pIndex === 1 && iIndex === 0) return 'bg-red-800/60 border-red-400';
    if (pIndex === 2 && iIndex === 2) return 'bg-green-900/40 border-green-500';
    return 'bg-yellow-900/40 border-yellow-500';
  };

  return (
    <div className="relative w-full h-64 flex flex-col">
      <div className="flex-1 flex">
         {/* Y Axis Labels */}
         <div className="flex flex-col justify-around pr-2 text-xs text-gray-500 font-bold w-12 text-right">
            <span>High</span>
            <span>Med</span>
            <span>Low</span>
         </div>
         
         <div className="flex-1 grid grid-cols-3 grid-rows-3 gap-1">
            {levels.map((impact, iIndex) => (
               levels.map((prob, pIndex) => {
                  const itemsInCell = data.filter(d => d.impact === impact && d.prob === prob);
                  return (
                    <div 
                      key={`${impact}-${prob}`} 
                      className={`relative rounded border border-opacity-30 flex items-center justify-center flex-wrap content-center gap-1 p-1 ${getCellColor(pIndex, iIndex)}`}
                    >
                      {itemsInCell.map((item, k) => (
                        <motion.div 
                           key={k}
                           whileHover={{ scale: 1.2 }}
                           className="w-5 h-5 rounded-full bg-white text-black text-[9px] font-bold flex items-center justify-center cursor-pointer shadow-lg"
                           title={item.name}
                        >
                           {item.id}
                        </motion.div>
                      ))}
                    </div>
                  );
               })
            ))}
         </div>
      </div>
      {/* X Axis Labels */}
      <div className="flex justify-around pl-12 pt-2 text-xs text-gray-500 font-bold">
         <span>High</span>
         <span>Medium</span>
         <span>Low</span>
      </div>
      <div className="text-center text-[10px] text-gray-600 uppercase tracking-widest mt-1">Probability</div>
      <div className="absolute -left-6 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] text-gray-600 uppercase tracking-widest">Impact</div>
    </div>
  );
};


// --- LIVE LINE CHART ---
export const LiveLineChart = ({ dataPoints, color = "#BFA76A" }) => {
  // dataPoints: number[]
  const max = Math.max(...dataPoints, 100) * 1.1;
  const points = dataPoints.map((val, i) => {
    const x = (i / (dataPoints.length - 1)) * 100;
    const y = 100 - (val / max) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="w-full h-full relative overflow-hidden">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
        <defs>
          <linearGradient id={`grad-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.2" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d={`M0,100 ${points.replace(/,/g, ' ')} 100,100 Z`}
          fill={`url(#grad-${color})`}
        />
        <motion.polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={false}
          animate={{ points }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </svg>
    </div>
  );
};

// --- GANTT CHART ---
export const GanttChart = ({ tasks }) => {
  // tasks: { name, start: 0-100, duration: 0-100, status }
  const months = ['Q1', 'Q2', 'Q3', 'Q4'];
  
  return (
    <div className="w-full">
      <div className="flex border-b border-white/10 pb-2 mb-2">
         <div className="w-1/4 text-xs text-gray-500 font-bold uppercase">Project</div>
         <div className="w-3/4 flex justify-between px-2">
            {months.map(m => <span key={m} className="text-xs text-gray-500 font-bold">{m}</span>)}
         </div>
      </div>
      <div className="space-y-3">
         {tasks.map((task, i) => (
           <div key={i} className="flex items-center group">
              <div className="w-1/4 text-xs font-medium text-gray-300 truncate pr-2">{task.name}</div>
              <div className="w-3/4 h-6 bg-[#111] rounded relative overflow-hidden">
                 <motion.div 
                   initial={{ width: 0 }}
                   whileInView={{ width: `${task.duration}%` }}
                   transition={{ duration: 1, delay: i * 0.1 }}
                   className={`absolute h-full rounded ${
                     task.status === 'Completed' ? 'bg-green-500' :
                     task.status === 'In Progress' ? 'bg-[#BFA76A]' :
                     'bg-blue-500'
                   } opacity-80 group-hover:opacity-100 transition-opacity`}
                   style={{ left: `${task.start}%` }}
                 />
              </div>
           </div>
         ))}
      </div>
    </div>
  );
};