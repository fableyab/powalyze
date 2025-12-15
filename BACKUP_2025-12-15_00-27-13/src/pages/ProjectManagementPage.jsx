import React, { useState, useEffect } from 'react';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Plus, Search, Filter, RefreshCw, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import ProjectModal from '@/components/Modals/ProjectModal';
import ProjectsTable from '@/components/Tables/ProjectsTable';
import { projectService } from '@/services/project/projectService';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import { useDemoMode } from '@/context/DemoModeContext';
import LoadingSpinner from '@/components/LoadingStates/LoadingSpinner';

const ProjectManagementPage = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const { isDemoMode } = useDemoMode();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filtering & Search
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  // Load Data
  const loadProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const clientId = isDemoMode ? 'demo' : (user?.id || 'default');
      const data = await projectService.getProjects(clientId);
      setProjects(data || []);
    } catch (err) {
      setError("Failed to load projects. Please try again.");
      toast({ variant: "destructive", title: "Error", description: "Could not fetch project list." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, [user, isDemoMode]);

  // Handlers
  const handleCreate = async (data) => {
    // Service handles ID creation or DB insertion
    await projectService.createProject({
      ...data,
      client_id: isDemoMode ? 'demo' : (user?.id || 'default'),
      created_at: new Date().toISOString()
    });
    // Optimistic update or reload
    await loadProjects();
  };

  const handleUpdate = async (data) => {
    if (!editingProject) return;
    await projectService.updateProject(editingProject.id, data);
    await loadProjects();
  };

  const handleDelete = async (id) => {
     // In a real app, use a confirmation dialog component here
     if(window.confirm("Are you sure you want to delete this project? This action cannot be undone.")) {
        try {
           await projectService.deleteProject(id);
           setProjects(prev => prev.filter(p => p.id !== id));
           toast({ title: "Project Deleted", description: "The project has been removed." });
        } catch(e) {
           toast({ variant: "destructive", title: "Error", description: "Delete failed." });
        }
     }
  };

  const filteredProjects = projects.filter(p => 
     p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     p.client.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col">
       <SEO title="Project Management" description="Manage your portfolio efficiently." />
       <Navbar />
       
       <main className="flex-grow pt-32 pb-20 container mx-auto px-6">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
             <div>
                <h1 className="text-3xl font-display font-bold text-white mb-2">Projects</h1>
                <p className="text-gray-400">
                   {isDemoMode ? "Demo Mode: Viewing sample portfolio data." : "Manage and track your active initiatives."}
                </p>
             </div>
             <div className="flex gap-3">
                <Button variant="outline" onClick={loadProjects} disabled={loading} className="border-white/10 text-white hover:bg-white/5">
                   <RefreshCw size={16} className={`mr-2 ${loading ? 'animate-spin' : ''}`} /> Sync
                </Button>
                <Button onClick={() => { setEditingProject(null); setIsModalOpen(true); }} className="bg-[#BFA76A] text-black hover:bg-white font-bold">
                   <Plus size={18} className="mr-2" /> New Project
                </Button>
             </div>
          </div>

          {/* Filters Bar */}
          <div className="bg-[#111] border border-white/10 rounded-xl p-4 mb-6 flex flex-col md:flex-row gap-4">
             <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <Input 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   placeholder="Search projects, clients..." 
                   className="pl-10 bg-black border-white/10 text-white focus:border-[#BFA76A]"
                />
             </div>
             <div className="flex gap-2">
               <Button variant="outline" className="border-white/10 text-gray-400 hover:text-white">
                  <Filter size={18} className="mr-2" /> Filter
               </Button>
             </div>
          </div>

          {/* Content Area */}
          {loading ? (
             <div className="py-20">
                <LoadingSpinner text="Loading your portfolio..." />
             </div>
          ) : error ? (
             <div className="bg-red-900/10 border border-red-500/20 rounded-xl p-8 text-center">
                <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-4" />
                <h3 className="text-white font-bold mb-2">Something went wrong</h3>
                <p className="text-gray-400 mb-6">{error}</p>
                <Button onClick={loadProjects} variant="outline" className="border-white/20 text-white">Try Again</Button>
             </div>
          ) : (
             <ProjectsTable 
                projects={filteredProjects} 
                onEdit={(p) => { setEditingProject(p); setIsModalOpen(true); }}
                onDelete={handleDelete}
                onView={(p) => console.log("View", p)}
             />
          )}

          {/* Modal */}
          <ProjectModal 
             isOpen={isModalOpen}
             onClose={() => setIsModalOpen(false)}
             initialData={editingProject}
             onSubmit={editingProject ? handleUpdate : handleCreate}
          />
       </main>
       <FooterSection />
    </div>
  );
};

export default ProjectManagementPage;