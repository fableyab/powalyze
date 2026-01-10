
import React, { useState, useEffect, useRef } from 'react';
import { BarChart3, Lock, RefreshCw, ShieldCheck, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { getPowerBIAccessToken } from '@/api/powerbi';
import * as pbi from 'powerbi-client';

const PowerBIEmbed = ({ reportId }) => {
  const { toast } = useToast();
  const [status, setStatus] = useState('idle'); // idle, loading, active, error
  const [embedConfig, setEmbedConfig] = useState(null);
  const reportContainerRef = useRef(null);
  const reportRef = useRef(null);

  const loadReport = async () => {
    setStatus('loading');
    
    try {
        const config = await getPowerBIAccessToken(reportId);
        setEmbedConfig(config);
        setStatus('active');
        
        toast({
            title: "Secure Connection Established",
            description: `Report loaded securely for ${config.user}. RLS Active.`,
            className: "bg-emerald-900 border-emerald-800 text-emerald-100"
        });
    } catch (error) {
        console.error("Embed Error:", error);
        setStatus('error');
        toast({
            variant: "destructive",
            title: "Connection Failed",
            description: error.message || "Could not generate secure embed token."
        });
    }
  };

  // Embed Power BI report when config is available
  useEffect(() => {
    if (status === 'active' && embedConfig && reportContainerRef.current) {
      const powerbi = new pbi.service.Service(
        pbi.factories.hpmFactory,
        pbi.factories.wpmpFactory,
        pbi.factories.routerFactory
      );

      const embedConfiguration = {
        type: 'report',
        tokenType: pbi.models.TokenType.Embed,
        accessToken: embedConfig.accessToken,
        embedUrl: embedConfig.embedUrl,
        id: embedConfig.reportId,
        permissions: pbi.models.Permissions.Read,
        settings: {
          layoutType: pbi.models.LayoutType.Custom,
          customLayout: {
            displayOption: pbi.models.DisplayOption.FitToPage
          },
          panes: {
            filters: { visible: false, expanded: false },
            pageNavigation: { visible: true, position: pbi.models.PageNavigationPosition.Bottom }
          },
          background: pbi.models.BackgroundType.Transparent
        }
      };

      // Embed the report
      const report = powerbi.embed(reportContainerRef.current, embedConfiguration);
      reportRef.current = report;

      // Handle loaded event
      report.on('loaded', () => {
        console.log('Report loaded successfully');
        // Resize report to fit container
        if (report && typeof report.resize === 'function') {
          report.resize();
        }
      });

      // Handle rendered event
      report.on('rendered', () => {
        console.log('Report rendered successfully');
      });

      // Handle errors
      report.on('error', (event) => {
        console.error('Power BI Error:', event.detail);
        toast({
          variant: "destructive",
          title: "Report Error",
          description: "An error occurred while loading the report."
        });
      });

      // Handle window resize
      const handleResize = () => {
        if (reportRef.current && typeof reportRef.current.resize === 'function') {
          reportRef.current.resize();
        }
      };

      window.addEventListener('resize', handleResize);

      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
        if (reportRef.current) {
          powerbi.reset(reportContainerRef.current);
        }
      };
    }
  }, [status, embedConfig, toast]);

  if (status === 'active' && embedConfig) {
      return (
          <div className="w-full h-screen bg-slate-900 border border-slate-800 rounded-xl relative overflow-hidden flex flex-col shadow-2xl animate-fade-in report-wrapper">
               {/* Secure Header */}
               <div className="h-10 bg-[#1A2A4A] border-b border-slate-700 flex items-center px-4 justify-between select-none">
                    <span className="text-xs text-blue-200 flex items-center gap-2">
                        <ShieldCheck className="w-3 h-3 text-emerald-400" /> 
                        Secure Tunnel • RLS Active
                    </span>
                    <span className="text-xs text-emerald-400 font-mono animate-pulse">● LIVE DATA</span>
               </div>
               
               {/* Power BI Report Container */}
               <div 
                 ref={reportContainerRef} 
                 className="flex-1 w-full powerbi-report-container"
                 style={{ minHeight: '600px' }}
               />
          </div>
      );
  }
                    {/* Mock Power BI Visuals */}
                    <div className="col-span-12 md:col-span-3 bg-[#141414] p-4 rounded border border-slate-800">
                        <div className="text-slate-500 text-xs uppercase font-bold mb-1">Total Budget</div>
                        <div className="text-2xl font-bold text-white">CHF 1.2M</div>
                        <div className="text-emerald-500 text-xs mt-1">▲ 4% vs Forecast</div>
                    </div>
                     <div className="col-span-12 md:col-span-3 bg-[#141414] p-4 rounded border border-slate-800">
                        <div className="text-slate-500 text-xs uppercase font-bold mb-1">Active Projects</div>
                        <div className="text-2xl font-bold text-white">12</div>
                        <div className="text-blue-500 text-xs mt-1">3 Critical Path</div>
                    </div>
                     <div className="col-span-12 md:col-span-3 bg-[#141414] p-4 rounded border border-slate-800">
                        <div className="text-slate-500 text-xs uppercase font-bold mb-1">Risks</div>
                        <div className="text-2xl font-bold text-amber-500">Medium</div>
                        <div className="text-slate-400 text-xs mt-1">2 Mitigated</div>
                    </div>
                     <div className="col-span-12 md:col-span-3 bg-[#141414] p-4 rounded border border-slate-800">
                        <div className="text-slate-500 text-xs uppercase font-bold mb-1">Team Load</div>
                        <div className="text-2xl font-bold text-white">94%</div>
                        <div className="w-full bg-slate-800 h-1 mt-2 rounded-full"><div className="w-[94%] h-full bg-blue-500"></div></div>
                    </div>
                    
                    <div className="col-span-12 md:col-span-8 bg-[#141414] p-6 rounded border border-slate-800 h-80 flex flex-col">
                         <h4 className="text-white font-bold mb-4">Financial Burn Rate</h4>
                         <div className="flex-1 flex items-end gap-2 px-4">
                             {[30, 45, 55, 60, 40, 75, 80, 85, 90, 65, 50, 60].map((h, i) => (
                                 <div key={i} className="flex-1 bg-[#D4A574] opacity-80 hover:opacity-100 transition-opacity rounded-t" style={{height: `${h}%`}}></div>
                             ))}
                         </div>
                    </div>
                    
                    <div className="col-span-12 md:col-span-4 bg-[#141414] p-6 rounded border border-slate-800 h-80 flex items-center justify-center relative">
                         <h4 className="absolute top-4 left-4 text-white font-bold">Allocation</h4>
                         <div className="w-48 h-48 rounded-full border-[20px] border-[#1A2A4A] border-t-[#D4A574] relative">
                             <div className="absolute inset-0 flex items-center justify-center flex-col">
                                 <span className="text-2xl font-bold text-white">75%</span>
                                 <span className="text-xs text-slate-500">Strategic</span>
                             </div>
                         </div>
                    </div>
               </div>
          </div>
      );
  }

  return (
    <div className="w-full h-[400px] bg-[#0F0F0F] border border-slate-800 rounded-xl flex flex-col items-center justify-center gap-6 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A2A4A]/20 to-transparent pointer-events-none" />
        
        <div className="p-4 bg-[#141414] rounded-full border border-slate-700 shadow-xl z-10">
            <BarChart3 className="w-8 h-8 text-[#D4A574]" />
        </div>
        
        <div className="text-center z-10 max-w-md px-4">
            <h3 className="text-white font-bold text-xl mb-2">Restricted Access Data</h3>
            <p className="text-slate-400 text-sm">
                This dashboard is protected by Row-Level Security. Data shown is strictly scoped to your tenant.
            </p>
        </div>

        <Button 
            onClick={loadReport} 
            disabled={status === 'loading'} 
            className="z-10 bg-[#D4A574] hover:bg-[#B58554] text-black font-bold px-8 py-6 rounded-lg shadow-[0_0_20px_rgba(212,165,116,0.3)] transition-all hover:scale-105"
        >
            {status === 'loading' ? (
                <><RefreshCw className="w-5 h-5 animate-spin mr-2" /> Authenticating...</>
            ) : (
                <><Lock className="w-5 h-5 mr-2" /> Load Secure Dashboard</>
            )}
        </Button>
    </div>
  );
};

export default PowerBIEmbed;
