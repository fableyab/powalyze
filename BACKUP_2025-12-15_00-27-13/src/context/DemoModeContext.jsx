import React, { createContext, useContext, useState, useEffect } from 'react';
import { demoProjects, demoKPIs, demoRisks, demoPowerBIReports, demoAnalytics } from '@/lib/demoDataComplete';
import { useToast } from '@/components/ui/use-toast';

const DemoModeContext = createContext();

export const DemoModeProvider = ({ children }) => {
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [demoData, setDemoData] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check if demo mode was active in session
    const stored = sessionStorage.getItem('powalyze_demo_mode');
    if (stored === 'true') {
      enableDemoMode(false); // Don't show toast on restore
    }
  }, []);

  const enableDemoMode = (showToast = true) => {
    setIsDemoMode(true);
    setDemoData({
      projects: demoProjects,
      kpis: demoKPIs,
      risks: demoRisks,
      reports: demoPowerBIReports,
      analytics: demoAnalytics
    });
    sessionStorage.setItem('powalyze_demo_mode', 'true');
    
    if (showToast) {
      toast({
        title: "Demo Mode Activated",
        description: "You are now viewing sample data. No changes will be saved.",
        duration: 3000,
        className: "bg-[#BFA76A] text-black border-none"
      });
    }
  };

  const disableDemoMode = () => {
    setIsDemoMode(false);
    setDemoData(null);
    sessionStorage.removeItem('powalyze_demo_mode');
    toast({
      title: "Demo Mode Deactivated",
      description: "Returned to live environment.",
    });
  };

  const toggleDemoMode = () => {
    if (isDemoMode) disableDemoMode();
    else enableDemoMode();
  };

  return (
    <DemoModeContext.Provider value={{
      isDemoMode,
      demoData,
      enableDemoMode,
      disableDemoMode,
      toggleDemoMode
    }}>
      {children}
    </DemoModeContext.Provider>
  );
};

export const useDemoMode = () => useContext(DemoModeContext);