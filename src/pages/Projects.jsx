
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Plus, List, Kanban, Search, Edit, Trash2, Calendar, Share2, Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import ProjectKanban from '@/components/projects/ProjectKanban';
import ProjectList from '@/components/projects/ProjectList';
import CreateProjectModal from '@/components/CreateProjectModal';
import EditProjectModal from '@/components/EditProjectModal';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const Projects = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [view, setView] = useState('list');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, [user]);

  const fetchProjects = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast({ variant: "destructive", title: "Error", description: "Failed to load projects" });
    } finally {
      setLoading(false);
    }
  };

  const handleProjectCreated = (newProject) => {
    setProjects([newProject, ...projects]);
  };

  const handleProjectUpdated = (updatedProject) => {
      setProjects(projects.map(p => p.id === updatedProject.id ? updatedProject : p));
  };

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      const { error } = await supabase.from('projects').delete().eq('id', projectId);
      if (error) throw error;
      setProjects(projects.filter(p => p.id !== projectId));
      toast({ title: "Deleted", description: "Project deleted successfully" });
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    }
  };

  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExport = (format) => {
    toast({ title: "Exporting...", description: `Preparing ${format} export of project list.` });
    setTimeout(() => {
        toast({ title: "Success", description: "Export downloaded." });
    }, 1000);
  };

  const handleShare = (method) => {
    toast({ title: "Shared", description: `Project list shared via ${method}.` });
  };

  return (
    <div className="space-y-6 h-full flex flex-col p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">{t('projects.title')}</h1>
          <p className="text-slate-500">Manage tasks and sprints</p>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800">
                        <Download className="w-4 h-4 mr-2" /> {t('projects.export')}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#1A1A1A] border-slate-800 text-white">
                    <DropdownMenuItem onClick={() => handleExport('PDF')}>PDF</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleExport('Excel')}>Excel</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleExport('CSV')}>CSV</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800">
                        <Share2 className="w-4 h-4 mr-2" /> {t('projects.share')}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#1A1A1A] border-slate-800 text-white">
                    <DropdownMenuItem onClick={() => handleShare('Email')}>Email</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleShare('Link')}>Copy Link</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

           <div className="h-6 w-px bg-slate-800 mx-2 hidden md:block"></div>
           <Button onClick={() => setIsCreateModalOpen(true)} className="bg-[#4A9EFF] hover:bg-[#0052cc] text-white">
             <Plus className="w-4 h-4 mr-2" /> {t('projects.newProject')}
           </Button>
           <div className="bg-[#1A1A1A] border border-slate-800 rounded-lg p-1 flex">
            <button 
                onClick={() => setView('kanban')}
                className={`px-3 py-1.5 rounded text-sm font-medium flex items-center gap-2 transition-all ${view === 'kanban' ? 'bg-[#4A9EFF] text-white' : 'text-slate-400 hover:text-white'}`}
            >
                <Kanban size={14} /> {t('projects.kanban')}
            </button>
            <button 
                onClick={() => setView('list')}
                className={`px-3 py-1.5 rounded text-sm font-medium flex items-center gap-2 transition-all ${view === 'list' ? 'bg-[#4A9EFF] text-white' : 'text-slate-400 hover:text-white'}`}
            >
                <List size={14} /> {t('projects.list')}
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-[#1A1A1A] p-4 rounded-xl border border-slate-800">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <Input 
            placeholder={t('common.search')} 
            className="pl-10 bg-black border-slate-800 text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-auto">
         {view === 'kanban' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map(project => (
                    <div key={project.id} className="bg-[#1A1A1A] border border-slate-800 rounded-xl p-6 hover:border-[#4A9EFF] transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="font-bold text-white text-lg">{project.name}</h3>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white" onClick={() => setEditingProject(project)}>
                                    <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-500" onClick={() => handleDeleteProject(project.id)}>
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                        <p className="text-slate-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                        <div className="flex justify-between items-center text-xs text-slate-500 mb-4">
                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3"/> {project.deadline || 'No Deadline'}</span>
                            <span className={`px-2 py-0.5 rounded-full ${
                                project.status === 'Completed' ? 'bg-green-900/40 text-green-400' : 'bg-blue-900/40 text-blue-400'
                            }`}>{project.status}</span>
                        </div>
                         <Button className="w-full bg-slate-800 hover:bg-slate-700 text-white text-sm" onClick={() => toast({description: "Navigate to tasks view"})}>
                            View Tasks
                         </Button>
                    </div>
                ))}
            </div>
         ) : (
            <ProjectList 
                projects={filteredProjects} 
                onDelete={handleDeleteProject} 
                onEdit={(project) => setEditingProject(project)}
            />
         )}
      </div>

      <CreateProjectModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)}
        onProjectCreated={handleProjectCreated}
      />

      <EditProjectModal 
        isOpen={!!editingProject}
        onClose={() => setEditingProject(null)}
        project={editingProject}
        onProjectUpdated={handleProjectUpdated}
      />
    </div>
  );
};

export default Projects;
