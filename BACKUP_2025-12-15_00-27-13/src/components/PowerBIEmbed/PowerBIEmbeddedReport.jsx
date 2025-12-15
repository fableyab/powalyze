import React, { useEffect, useState } from 'react';
import { Loader2, AlertTriangle, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SettingsPanel from './SettingsPanel';
import ExportButton from './ExportButton';
import { cn } from '@/lib/utils';

const PowerBIEmbeddedReport = ({ 
  embedConfig, 
  cssClassName = "h-[600px]", 
  onLoad, 
  onError,
  enableControls = true
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [settings, setSettings] = useState({
    showNavPane: true,
    showFilterPane: false,
    darkMode: true
  });

  useEffect(() => {
    if (!embedConfig) return;

    setLoading(true);
    setError(null);

    // Simulate Load
    const timer = setTimeout(() => {
      setLoading(false);
      if (!embedConfig.token && !embedConfig.embedUrl) {
        setError("Invalid Configuration: Missing Token or URL");
        if (onError) onError("Invalid Configuration");
      } else {
        if (onLoad) onLoad();
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [embedConfig]);

  const handleSettingsChange = (key, val) => {
    setSettings(prev => ({ ...prev, [key]: val }));
  };

  if (error) {
    return (
      <div className={cn("w-full bg-[#0A0A0A] border border-red-900/30 flex flex-col items-center justify-center rounded-xl", cssClassName)}>
        <AlertTriangle className="text-red-500 mb-2" size={32} />
        <p className="text-red-400 font-bold">{error}</p>
        <Button variant="outline" className="mt-4 border-red-500/30 text-red-400" onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  // Mock data for export button
  const mockExportData = [
    { Project: "Project A", Budget: 100000, Status: "Active" },
    { Project: "Project B", Budget: 250000, Status: "On Hold" }
  ];

  return (
    <div className={cn("relative w-full bg-[#111] border border-white/10 rounded-xl overflow-hidden flex flex-col", cssClassName)}>
      {/* Controls Header */}
      {enableControls && (
        <div className="h-12 bg-[#1A1A1A] border-b border-white/10 flex justify-between items-center px-4 shrink-0">
           <div className="text-xs text-gray-400 font-mono">
              {embedConfig?.reportId ? `ID: ${embedConfig.reportId.slice(0,8)}...` : 'Report Viewer'}
           </div>
           <div className="flex items-center gap-2">
              <ExportButton data={mockExportData} filename="pbi_export" />
              <SettingsPanel settings={settings} onSettingsChange={handleSettingsChange} />
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                 <Maximize2 className="h-4 w-4" />
              </Button>
           </div>
        </div>
      )}

      {/* Content */}
      <div className="relative flex-grow bg-[#000]">
        {loading && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm">
            <Loader2 className="w-10 h-10 text-[#BFA76A] animate-spin mb-4" />
            <p className="text-gray-400 text-sm animate-pulse">Establishing secure connection to Power BI...</p>
          </div>
        )}

        {!loading && !error && (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#050505]">
             <div className="text-center opacity-50">
                <div className="w-16 h-16 mx-auto mb-4 bg-yellow-500/20 rounded flex items-center justify-center">
                   <svg className="w-10 h-10 text-yellow-500" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M4 22H20C21.1 22 22 21.1 22 20V4C22 2.9 21.1 2 20 2H4C2.9 2 2 2.9 2 4V20C2 21.1 2.9 22 4 22ZM13 10V18H11V10H13ZM17 14V18H15V14H17ZM9 6V18H7V6H9Z"/>
                   </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Interactive Report Loaded</h3>
                <p className="text-sm text-gray-500">
                   Nav Pane: {settings.showNavPane ? 'ON' : 'OFF'} | Filters: {settings.showFilterPane ? 'ON' : 'OFF'}
                </p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PowerBIEmbeddedReport;