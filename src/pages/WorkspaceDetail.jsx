
import React from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Target, 
  Briefcase, 
  FileText, 
  AlertTriangle, 
  MessageSquare, 
  Plus, 
  Share2, 
  MoreVertical,
  BrainCircuit
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const WorkspaceDetail = () => {
  const { id } = useParams();
  const { language } = useLanguage();
  const { isDarkMode } = useTheme();
  
  // Mock data for demo
  const workspace = {
    name: "Strategic Transformation 2026",
    description: "Core banking migration & digital channels revamp program.",
    objectives: [
      { id: 1, title: "Reduce IT Operational Costs by 15%", progress: 65, status: "on_track" },
      { id: 2, title: "Launch New Mobile Banking App", progress: 40, status: "at_risk" },
      { id: 3, title: "Migrate 80% of Workloads to Azure", progress: 20, status: "delayed" },
    ]
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Workspaces</span>
        </div>
        <div className="flex justify-between items-start">
          <div>
            <h1 className={cn("text-3xl font-bold mb-2", isDarkMode ? "text-white" : "text-slate-900")}>{workspace.name}</h1>
            <p className={cn("text-lg", isDarkMode ? "text-slate-400" : "text-slate-500")}>{workspace.description}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className={cn("gap-2", isDarkMode ? "border-slate-700 text-slate-300" : "")}>
              <Share2 className="w-4 h-4" /> Share
            </Button>
            <Button className="bg-amber-600 hover:bg-amber-700 text-white gap-2">
              <Plus className="w-4 h-4" /> Add Item
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs / Modules */}
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className={cn("w-full justify-start h-12 p-1 bg-slate-900/50 border-b border-slate-800 rounded-none", isDarkMode ? "" : "bg-slate-100")}>
          <TabsTrigger value="dashboard" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">Dashboard</TabsTrigger>
          <TabsTrigger value="objectives">Objectives</TabsTrigger>
          <TabsTrigger value="projects">Linked Projects</TabsTrigger>
          <TabsTrigger value="risks">Risks</TabsTrigger>
          <TabsTrigger value="docs">Documents</TabsTrigger>
          <TabsTrigger value="ai">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="mt-6 space-y-6">
          
          {/* AI Summary Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border border-indigo-500/30 flex items-start gap-4">
            <div className="p-2 bg-indigo-500/20 rounded-lg">
              <BrainCircuit className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <h3 className="text-indigo-300 font-semibold mb-1">AI Executive Summary</h3>
              <p className="text-sm text-indigo-100/80 leading-relaxed">
                Overall progress is steady at 42%. The "Mobile App" objective is at risk due to backend API delays. 
                Recommended action: Reallocate 2 resources from "Core Migration" to unblock the API team for Sprint 4.
                Budget consumption is nominal (-2% vs forecast).
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Objectives Column */}
            <div className={cn("lg:col-span-2 rounded-xl border p-6", isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200")}>
              <h3 className={cn("text-lg font-semibold mb-6 flex items-center gap-2", isDarkMode ? "text-white" : "text-slate-900")}>
                <Target className="w-5 h-5 text-amber-500" /> Strategic Objectives
              </h3>
              <div className="space-y-4">
                {workspace.objectives.map((obj) => (
                  <div key={obj.id} className="group p-4 rounded-lg border border-slate-800 bg-slate-950/30 hover:bg-slate-800/50 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className={cn("font-medium", isDarkMode ? "text-slate-200" : "text-slate-800")}>{obj.title}</h4>
                      <Badge variant="outline" className={cn(
                        obj.status === 'on_track' ? "text-emerald-500 border-emerald-500/20" : 
                        obj.status === 'at_risk' ? "text-amber-500 border-amber-500/20" : "text-red-500 border-red-500/20"
                      )}>
                        {obj.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 bg-slate-800 rounded-full h-2">
                        <div className={cn("h-full rounded-full", obj.status === 'on_track' ? "bg-emerald-500" : "bg-amber-500")} style={{ width: `${obj.progress}%` }} />
                      </div>
                      <span className="text-sm font-mono text-slate-500 w-10 text-right">{obj.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats / Info */}
            <div className="space-y-6">
               <div className={cn("rounded-xl border p-6", isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200")}>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">Key Metrics</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Total Budget</span>
                      <span className="text-xl font-bold text-white">CHF 12.5M</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Consumed</span>
                      <span className="text-xl font-bold text-white">CHF 4.2M</span>
                    </div>
                    <div className="h-px bg-slate-800 my-2" />
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Team Size</span>
                      <span className="text-white">24 members</span>
                    </div>
                  </div>
               </div>

               <div className={cn("rounded-xl border p-6", isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200")}>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                     {[1,2,3].map(i => (
                       <div key={i} className="flex gap-3 text-sm">
                          <div className="w-2 h-2 mt-1.5 rounded-full bg-slate-600 shrink-0" />
                          <p className="text-slate-400">
                            <span className="text-white font-medium">Alice D.</span> updated risk register for Project Alpha. <span className="text-slate-600 text-xs block">2h ago</span>
                          </p>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="objectives" className="text-slate-500 p-8 text-center">Module loaded: Strategic Objectives Manager</TabsContent>
        <TabsContent value="projects" className="text-slate-500 p-8 text-center">Module loaded: Project Intelligence View</TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkspaceDetail;
