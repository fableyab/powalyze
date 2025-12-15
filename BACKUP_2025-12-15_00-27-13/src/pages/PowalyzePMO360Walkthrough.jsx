import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, BarChart2, Shield, Zap } from 'lucide-react';
import Navbar from '@/components/landing/Navbar';
import { useNavigate } from 'react-router-dom';

const steps = [
  {
    id: 1,
    title: "Welcome to PMO 360",
    desc: "Experience the future of Project Portfolio Management. Powalyze combines Data, Governance, and Strategy.",
    icon: Zap,
    color: "text-[#BFA76A]"
  },
  {
    id: 2,
    title: "Data-Driven Insights",
    desc: "We connect to your Excel, SharePoint, or JIRA data to generate live dashboards using Power BI.",
    icon: BarChart2,
    color: "text-[#3A7BFF]"
  },
  {
    id: 3,
    title: "Governance & Control",
    desc: "Track compliance automatically. Identify risks before they become issues with our AI-enhanced matrices.",
    icon: Shield,
    color: "text-green-500"
  },
  {
    id: 4,
    title: "Ready to Explore?",
    desc: "Let's dive into the interactive dashboard. You'll see real-time data visualization in action.",
    icon: CheckCircle,
    color: "text-white"
  }
];

const PowalyzePMO360Walkthrough = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      navigate('/pmo-360-demo');
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
           {/* Left: Content */}
           <div>
              <AnimatePresence mode="wait">
                 <motion.div
                   key={currentStep}
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: 20 }}
                   transition={{ duration: 0.4 }}
                 >
                    <div className={`w-16 h-16 rounded-2xl bg-[#111] border border-white/10 flex items-center justify-center mb-6 ${steps[currentStep].color}`}>
                       {React.createElement(steps[currentStep].icon, { size: 32 })}
                    </div>
                    <h2 className="text-4xl font-display font-bold mb-4">{steps[currentStep].title}</h2>
                    <p className="text-xl text-gray-400 leading-relaxed mb-8">{steps[currentStep].desc}</p>
                 </motion.div>
              </AnimatePresence>
              
              <div className="flex items-center gap-4">
                 <div className="flex gap-2">
                    {steps.map((_, i) => (
                       <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === currentStep ? 'w-8 bg-[#BFA76A]' : 'w-2 bg-[#333]'}`} />
                    ))}
                 </div>
                 <div className="flex-1"></div>
                 <Button onClick={handleNext} className="bg-[#BFA76A] text-black hover:bg-white font-bold px-8">
                    {currentStep === steps.length - 1 ? 'Launch Demo' : 'Next'} <ArrowRight size={16} className="ml-2" />
                 </Button>
              </div>
           </div>

           {/* Right: Visual */}
           <div className="relative h-[400px] bg-[#111] rounded-2xl border border-white/10 overflow-hidden flex items-center justify-center p-8">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#BFA76A]/10 to-transparent"></div>
              
              <AnimatePresence mode="wait">
                 <motion.img 
                    key={currentStep}
                    src={`https://placehold.co/600x400/1a1a1a/FFF?text=Step+${currentStep + 1}+Visual`}
                    alt="Walkthrough Visual"
                    className="rounded-lg shadow-2xl relative z-10"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1.1, opacity: 0 }}
                 />
              </AnimatePresence>
           </div>
        </div>
      </main>
    </div>
  );
};

export default PowalyzePMO360Walkthrough;