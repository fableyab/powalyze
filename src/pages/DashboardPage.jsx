import React, { useState, useEffect } from 'react';
import Navbar from '@/components/landing/Navbar';
import { useAuth } from '@/context/AuthContext';
import { projectService, reportService } from '@/services/supabase/dataService';
import { 
  LayoutDashboard, FileBarChart, Settings, Plus, ArrowUpRight, 
  Briefcase, Clock, AlertTriangle, CheckCircle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const { user, clientData, loading: authLoading } = useAuth();
  const [projects, setProjects] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          // Use client ID if available, otherwise mock ID
          const clientId = clientData?.id || 'c1';
          const [projData, repData] = await Promise.all([
            projectService.getProjects(clientId),
            reportService.getReports(clientId)
          ]);
          setProjects(projData);
          setReports(repData);
        } catch (error) {
          console.error("Dashboard data error", error);
          toast({ variant: "destructive", title: "Error", description: "Failed to load dashboard data." });
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [user, clientData]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-[#BFA76A] animate-pulse">Loading Dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Navbar />
      
      <main className="container mx-auto px-6 pt-32 pb-12">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <h1 className="text-3xl font-display font-bold text-white mb-2">
              Welcome back, <span className="text-[#BFA76A]">{user?.name}</span>
            </h1>
            <p className="text-gray-400">Here's what's happening with your projects today.</p>
          </div>
          <div className="flex gap-3">
             <Button variant="outline" className="border-white/10 text-white hover:bg-white/5">
                <Settings size={16} className="mr-2" /> Settings
             </Button>
             <Button className="bg-[#BFA76A] text-black hover:bg-white font-bold">
                <Plus size={16} className="mr-2" /> New Project
             </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-[#111] p-6 rounded-xl border border-white/10">
             <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg"><Briefcase size={20} /></div>
                <span className="text-xs text-green-500 flex items-center gap-1">+2 <ArrowUpRight size={12} /></span>
             </div>
             <div className="text-3xl font-bold text-white mb-1">{projects.length}</div>
             <div className="text-xs text-gray-500 uppercase tracking-wider">Active Projects</div>
          </div>
          
          <div className="bg-[#111] p-6 rounded-xl border border-white/10">
             <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-yellow-500/10 text-yellow-500 rounded-lg"><Clock size={20} /></div>
                <span className="text-xs text-gray-500">On Time</span>
             </div>
             <div className="text-3xl font-bold text-white mb-1">94%</div>
             <div className="text-xs text-gray-500 uppercase tracking-wider">Schedule Adherence</div>
          </div>

          <div className="bg-[#111] p-6 rounded-xl border border-white/10">
             <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-purple-500/10 text-purple-500 rounded-lg"><FileBarChart size={20} /></div>
                <span className="text-xs text-green-500 flex items-center gap-1">New</span>
             </div>
             <div className="text-3xl font-bold text-white mb-1">{reports.length}</div>
             <div className="text-xs text-gray-500 uppercase tracking-wider">Available Reports</div>
          </div>
          
          <div className="bg-[#111] p-6 rounded-xl border border-white/10">
             <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-red-500/10 text-red-500 rounded-lg"><AlertTriangle size={20} /></div>
                <span className="text-xs text-red-500">Action Req.</span>
             </div>
             <div className="text-3xl font-bold text-white mb-1">1</div>
             <div className="text-xs text-gray-500 uppercase tracking-wider">Critical Risks</div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           
           {/* Projects List */}
           <div className="lg:col-span-2 bg-[#111] rounded-xl border border-white/10 overflow-hidden">
              <div className="p-6 border-b border-white/10 flex justify-between items-center">
                 <h3 className="font-bold text-white">Recent Projects</h3>
                 <Button variant="ghost" size="sm" className="text-xs text-[#BFA76A]">View All</Button>
              </div>
              <div className="p-6">
                 {projects.length > 0 ? (
                    <div className="space-y-4">
                       {projects.map(project => (
                          <div key={project.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer group">
                             <div className="flex items-center gap-4">
                                <div className={`w-2 h-2 rounded-full ${
                                   project.status === 'active' ? 'bg-green-500' : 
                                   project.status === 'risk' ? 'bg-red-500' : 'bg-gray-500'
                                }`} />
                                <div>
                                   <div className="font-medium text-white group-hover:text-[#BFA76A] transition-colors">{project.name}</div>
                                   <div className="text-xs text-gray-500">Budget: CHF {project.budget.toLocaleString()} • Risk: {project.risk_level}</div>
                                </div>
                             </div>
                             <div className="text-right">
                                <div className="text-sm font-bold text-white">{project.progress}%</div>
                                <div className="w-24 h-1 bg-gray-700 rounded mt-1">
                                   <div className="h-full bg-[#BFA76A] rounded" style={{width: `${project.progress}%`}}></div>
                                </div>
                             </div>
                          </div>
                       ))}
                    </div>
                 ) : (
                    <div className="text-center py-10 text-gray-500">No projects found.</div>
                 )}
              </div>
           </div>

           {/* Reports Sidebar */}
           <div className="bg-[#111] rounded-xl border border-white/10 overflow-hidden">
              <div className="p-6 border-b border-white/10">
                 <h3 className="font-bold text-white">Your Reports</h3>
              </div>
              <div className="p-4 space-y-2">
                 {reports.map(report => (
                    <Link key={report.id} to="/demo-report">
                       <div className="p-4 rounded-lg hover:bg-white/5 transition-colors group cursor-pointer border border-transparent hover:border-white/10">
                          <div className="flex items-start gap-3">
                             <div className="p-2 bg-[#0A0A0A] rounded border border-white/10 group-hover:border-[#BFA76A]/50 transition-colors">
                                <FileBarChart size={18} className="text-[#BFA76A]" />
                             </div>
                             <div>
                                <div className="font-medium text-white text-sm group-hover:text-[#BFA76A] transition-colors">{report.title}</div>
                                <div className="text-xs text-gray-500 uppercase mt-1">{report.type}</div>
                             </div>
                          </div>
                       </div>
                    </Link>
                 ))}
                 <div className="pt-4 mt-4 border-t border-white/10">
                    <Link to="/powerbi-embed">
                       <div className="p-4 rounded-lg bg-gradient-to-r from-blue-900/20 to-transparent border border-blue-500/20 hover:border-blue-500/50 transition-colors">
                          <h4 className="text-sm font-bold text-blue-400 mb-1">New: Embedded Analytics</h4>
                          <p className="text-xs text-gray-400">Try our new secure Power BI embedding feature.</p>
                       </div>
                    </Link>
                 </div>
              </div>
           </div>

        </div>
      </main>
    </div>
  );
};

export default DashboardPage;