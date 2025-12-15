import React from 'react';
import { PageHeader, Card } from '@/components/ui/DashboardComponents';
import { motion } from 'framer-motion';

const Portfolios = () => {
  return (
    <div>
      <PageHeader 
        title="Portefeuilles" 
        subtitle="Stratégie & Priorisation"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Heatmap */}
        <Card className="h-96">
          <h3 className="text-lg font-light text-white mb-6">Heatmap des Risques</h3>
          <div className="grid grid-cols-5 grid-rows-5 gap-1 h-[300px]">
            {Array.from({ length: 25 }).map((_, i) => {
              // Randomish heatmap colors
              const colors = ['bg-[#1C1C1C]', 'bg-green-900', 'bg-yellow-900', 'bg-red-900'];
              const colorClass = colors[Math.floor(Math.random() * colors.length)];
              return (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.02 }}
                  className={`${colorClass} rounded-sm hover:brightness-150 transition-all cursor-help`} 
                  title={`Zone ${i+1}`}
                />
              );
            })}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500 uppercase">
            <span>Faible Impact</span>
            <span>Fort Impact</span>
          </div>
        </Card>

        {/* Prioritization Matrix (Bubble Chart Simulation) */}
        <Card className="h-96 relative">
          <h3 className="text-lg font-light text-white mb-2">Matrice de Valeur</h3>
          <div className="absolute bottom-8 left-8 right-8 top-16 border-l border-b border-gray-700">
             {/* Bubbles */}
             {[
               { x: 20, y: 30, s: 10, label: "P1" },
               { x: 50, y: 60, s: 16, label: "P2" },
               { x: 80, y: 80, s: 24, label: "P3" },
               { x: 70, y: 20, s: 12, label: "P4" },
               { x: 30, y: 70, s: 8, label: "P5" },
             ].map((bubble, i) => (
               <div 
                 key={i}
                 className="absolute rounded-full bg-[#BFA76A]/20 border border-[#BFA76A] flex items-center justify-center text-[10px] text-[#BFA76A] font-bold hover:bg-[#BFA76A] hover:text-black transition-colors cursor-pointer"
                 style={{ 
                   left: `${bubble.x}%`, 
                   bottom: `${bubble.y}%`, 
                   width: `${bubble.s * 3}px`, 
                   height: `${bubble.s * 3}px` 
                 }}
               >
                 {bubble.label}
               </div>
             ))}
             <span className="absolute -bottom-6 right-0 text-xs text-gray-500">Complexité</span>
             <span className="absolute -left-6 top-0 -rotate-90 text-xs text-gray-500 origin-bottom-right">Valeur Business</span>
          </div>
        </Card>
      </div>

      {/* Gantt Roadmap */}
      <Card>
        <h3 className="text-lg font-light text-white mb-6">Roadmap Stratégique Q1-Q2</h3>
        <div className="space-y-6">
          {[
            { name: "Migration Infra", start: 0, width: 40, color: "bg-[#3A7BFF]" },
            { name: "Data Lake V2", start: 20, width: 30, color: "bg-[#BFA76A]" },
            { name: "App Mobile", start: 45, width: 25, color: "bg-gray-600" },
            { name: "Sécurité ISO", start: 10, width: 60, color: "bg-[#1C1C1C] border border-gray-700" }
          ].map((item, i) => (
            <div key={i} className="relative h-8 bg-[#0A0A0A] rounded-sm overflow-hidden flex items-center">
              <div className="absolute left-4 z-10 text-xs font-medium text-white drop-shadow-md">{item.name}</div>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${item.width}%` }}
                transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                className={`h-full ${item.color} opacity-80 hover:opacity-100 transition-opacity absolute`}
                style={{ left: `${item.start}%` }}
              />
            </div>
          ))}
        </div>
        {/* Time axis simulation */}
        <div className="flex justify-between mt-4 text-xs text-gray-600 font-mono border-t border-[#1C1C1C] pt-2">
            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
        </div>
      </Card>
    </div>
  );
};

export default Portfolios;