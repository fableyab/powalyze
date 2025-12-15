
import React, { useState } from 'react';
import { useClient } from '@/context/ClientContext';
import { Link } from 'react-router-dom';
import { Search, Calendar, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import StatusBadge from '@/components/ClientPortal/StatusBadge';
import ProgressBar from '@/components/ClientPortal/ProgressBar';
import ProjectModal from '@/components/Modals/ProjectModal';
import { useToast } from '@/components/ui/use-toast';

const ProjectsPage = () => {
  const { projects, addProject } = useClient();
  const { toast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(filter.toLowerCase());
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Mes Projets</h1>
          <p className="text-gray-400">Gérez et suivez l'avancement de vos initiatives.</p>
        </div>
        <Button onClick={() => setModalOpen(true)} className="bg-[#BFA76A] text-black hover:bg-white font-bold flex items-center gap-2">
          <Plus size={16} /> Nouveau Projet
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 bg-[#111] p-4 rounded-xl border border-white/10">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <Input 
            placeholder="Rechercher un projet..." 
            className="pl-10 bg-[#0A0A0A] border-white/10 text-white focus:border-[#BFA76A]"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {['All', 'Active', 'Completed', 'On Hold', 'At Risk'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${
                statusFilter === status 
                  ? 'bg-[#BFA76A] text-black' 
                  : 'bg-[#1A1A1A] text-gray-400 hover:text-white'
              }`}
            >
              {status === 'All' ? 'Tous' : status}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map(project => (
          <Link key={project.id} to={`/espace-client/projets/${project.id}`}>
            <Card className="bg-[#111] border-white/10 p-6 hover:border-[#BFA76A] transition-all duration-300 h-full flex flex-col group">
              <div className="flex justify-between items-start mb-4">
                <StatusBadge status={project.status} />
                <span className="text-xs text-gray-500 font-mono">{project.type}</span>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#BFA76A] transition-colors">{project.name}</h3>
              <p className="text-sm text-gray-400 mb-6 line-clamp-2 flex-grow">{project.description}</p>
              
              <div className="space-y-4 mt-auto">
                <div className="flex items-center text-xs text-gray-500 gap-2">
                  <Calendar size={14} />
                  <span>Deadline: {new Date(project.deadline).toLocaleDateString()}</span>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-gray-300">
                    <span>Avancement</span>
                    <span className="font-bold">{project.progress}%</span>
                  </div>
                  <ProgressBar progress={project.progress} />
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                   <div className="flex -space-x-2">
                      {project.team.slice(0, 3).map((member, i) => (
                         <div key={i} className="w-8 h-8 rounded-full bg-[#222] border-2 border-[#111] flex items-center justify-center text-[10px] font-bold text-gray-300" title={member.name}>
                            {member.avatar}
                         </div>
                      ))}
                      {project.team.length > 3 && (
                         <div className="w-8 h-8 rounded-full bg-[#333] border-2 border-[#111] flex items-center justify-center text-[10px] font-bold text-gray-300">
                            +{project.team.length - 3}
                         </div>
                      )}
                   </div>
                   <span className="text-xs text-gray-500">{project.documentsCount} docs</span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <ProjectModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)}
        onSubmit={async (data) => {
          const created = await addProject(data);
          toast({ title: 'Projet créé', description: `${created.name} est ajouté à votre portefeuille.` });
        }}
      />
    </div>
  );
};

export default ProjectsPage;
