import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Circle, Clock } from 'lucide-react';

const RoadmapTimeline = () => {
  const steps = [
    {
      id: 1,
      title: "Tier 1: Demo Intégrée",
      subtitle: "Integrated Demo",
      status: "completed",
      date: "Current",
      desc: "Secure Iframe / POC"
    },
    {
      id: 2,
      title: "Tier 2: Prototype",
      subtitle: "App-Owns-Data",
      status: "active",
      date: "Month 1-2",
      desc: "Service Principal & Backend"
    },
    {
      id: 3,
      title: "Tier 3: Multi-Tenant",
      subtitle: "Logical Scalability",
      status: "pending",
      date: "Month 2-3",
      desc: "Row-Level Security (RLS)"
    },
    {
      id: 4,
      title: "Tier 4: SaaS Industrial",
      subtitle: "Production",
      status: "pending",
      date: "Month 3-6",
      desc: "Azure AD B2C & Capacity"
    }
  ];

  return (
    <div className="w-full py-10">
      <div className="relative">
        {/* Horizontal Line (Desktop) */}
        <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -translate-y-1/2 z-0" />
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              className={`
                bg-[#111] border rounded-xl p-6 flex flex-col items-center text-center transition-all duration-300
                ${step.status === 'active' 
                  ? 'border-[#BFA76A] shadow-[0_0_15px_rgba(191,167,106,0.15)] scale-105 bg-[#1A1A1A]' 
                  : 'border-white/10 hover:border-white/20'
                }
              `}
            >
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center mb-4
                ${step.status === 'completed' ? 'bg-green-500/10 text-green-500' : 
                  step.status === 'active' ? 'bg-[#BFA76A]/10 text-[#BFA76A]' : 'bg-gray-800 text-gray-400'}
              `}>
                {step.status === 'completed' ? <CheckCircle size={20} /> : 
                 step.status === 'active' ? <Clock size={20} className="animate-pulse" /> : <Circle size={20} />}
              </div>

              <h3 className={`font-bold text-lg mb-1 ${step.status === 'active' ? 'text-white' : 'text-gray-300'}`}>
                {step.title}
              </h3>
              <div className="text-xs uppercase tracking-wider font-semibold text-[#BFA76A] mb-2">{step.subtitle}</div>
              
              <div className="mt-auto pt-4 border-t border-white/5 w-full">
                <div className="text-xs text-gray-500 mb-1">{step.date}</div>
                <div className="text-sm text-gray-400">{step.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoadmapTimeline;