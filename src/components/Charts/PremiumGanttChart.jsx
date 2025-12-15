import React from 'react';
import { motion } from 'framer-motion';

const PremiumGanttChart = ({ tasks }) => {
  const safeTasks = Array.isArray(tasks) ? tasks : [];
  const computedMax = safeTasks.length
    ? Math.max(...safeTasks.map(t => (t?.start || 0) + (t?.duration || 0)))
    : 0;
  const totalDuration = Math.max(1, computedMax || 100);

  return (
    <div className="w-full space-y-4">
      {safeTasks.length === 0 && (
        <div className="text-xs text-gray-500">No timeline data available.</div>
      )}
      {safeTasks.map((task, index) => (
        <div key={index} className="relative">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span className="font-medium text-white">{task.name}</span>
            <span>{task.duration} days</span>
          </div>
          <div className="h-2 w-full bg-[#222] rounded-full overflow-hidden relative">
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
      
      {/* Time Axis */}
      <div className="flex justify-between text-[10px] text-gray-600 font-mono mt-2 pt-2 border-t border-white/5">
         <span>Start</span>
         <span>Midpoint</span>
         <span>Completion</span>
      </div>
    </div>
  );
};

export default PremiumGanttChart;