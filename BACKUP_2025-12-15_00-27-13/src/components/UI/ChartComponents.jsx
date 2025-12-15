import React from 'react';
import { motion } from 'framer-motion';

export const SimpleLineChart = ({ data, color = "#3A7BFF", height = 60 }) => {
  // data is array of numbers 0-100
  const max = Math.max(...data);
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - (val / max) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className={`w-full h-[${height}px] overflow-hidden`}>
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
        <motion.polyline
          fill="none"
          stroke={color}
          strokeWidth="2"
          points={points}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        <motion.polyline
          fill={color}
          fillOpacity="0.1"
          stroke="none"
          points={`0,100 ${points} 100,100`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        />
      </svg>
    </div>
  );
};

export const SimpleBarChart = ({ data, labels }) => {
  return (
    <div className="flex items-end justify-between h-32 gap-2 w-full">
      {data.map((val, i) => (
        <div key={i} className="flex flex-col items-center flex-1 gap-2 group">
           <motion.div 
             initial={{ height: 0 }}
             animate={{ height: `${val}%` }}
             transition={{ duration: 1, delay: i * 0.1 }}
             className="w-full bg-[#1C1C1C] hover:bg-[#BFA76A] transition-colors duration-300 rounded-t-sm relative"
           >
             <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
               {val}%
             </span>
           </motion.div>
           {labels && <span className="text-[10px] text-gray-500 truncate max-w-full uppercase">{labels[i]}</span>}
        </div>
      ))}
    </div>
  );
};

export const DonutChart = ({ percent, color = "#BFA76A", size = 100, label }) => {
  const circumference = 2 * Math.PI * 40; 
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 100 100" className="-rotate-90">
        <circle cx="50" cy="50" r="40" stroke="#1C1C1C" strokeWidth="8" fill="none" />
        <motion.circle
          cx="50" cy="50" r="40"
          stroke={color}
          strokeWidth="8"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-bold text-white">{percent}%</span>
        {label && <span className="text-[8px] text-gray-500 uppercase tracking-wider">{label}</span>}
      </div>
    </div>
  );
};