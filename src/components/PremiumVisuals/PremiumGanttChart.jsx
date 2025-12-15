import React from 'react';
import { motion } from 'framer-motion';

const PremiumGanttChart = ({ tasks }) => {
  const safeTasks = Array.isArray(tasks) ? tasks : [];
  const computedMax = safeTasks.length
    ? Math.max(...safeTasks.map(t => (t?.start || 0) + (t?.duration || 0)))
    : 0;
  const totalDuration = Math.max(1, computedMax || 100);

  return (
    <div className="w-full bg-[#111] border border-white/10 rounded-xl p-6 space-y-4">
      <div className="flex justify-between items-center mb-4">
         <h3 className="text-white font-bold text-sm uppercase tracking-wider">Project Schedule</h3>
         <div className="flex gap-3 text-[10px]">
            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500"></div> Completed</span>
            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#BFA76A]"></div> In Progress</span>
            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Planned</span>
         </div>
      </div>
      
      <div className="space-y-3">
        {safeTasks.length === 0 && (
          <div className="text-xs text-gray-500 px-1">No timeline data available.</div>
        )}
        {safeTasks.map((task, index) => (
          <div key={index} className="relative">
            <div className="flex justify-between text-xs text-gray-400 mb-1 px-1">
              <span className="font-medium text-white">{task.name}</span>
              <span>{task.duration}d</span>
            </div>
            <div className="h-3 w-full bg-[#222] rounded-full overflow-hidden relative">
               <motion.div
                 initial={{ width: 0, x: `${((task.start || 0) / totalDuration) * 100}%` }}
                 animate={{ width: `${((task.duration || 0) / totalDuration) * 100}%`, x: `${((task.start || 0) / totalDuration) * 100}%` }}
                 transition={{ duration: 1, delay: index * 0.1 }}
                 className={`absolute top-0 left-0 h-full rounded-full ${
                    task.status === 'Completed' ? 'bg-green-500' :
                    task.status === 'In Progress' ? 'bg-[#BFA76A]' :
                    task.status === 'Critical' ? 'bg-red-500' : 'bg-blue-500'
                 }`}
               />
            </div>
          </div>
        ))}
      </div>
      
      {/* Time Axis */}
      <div className="flex justify-between text-[10px] text-gray-600 font-mono mt-2 pt-2 border-t border-white/5">
         <span>Start</span>
         <span>Q1</span>
         <span>Q2</span>
         <span>Q3</span>
         <span>Q4</span>
         <span>End</span>
      </div>
    </div>
  );
};

export default PremiumGanttChart;