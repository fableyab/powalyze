
import React from 'react';
import { useClient } from '@/context/ClientContext';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { 
  FolderOpen, CheckCircle, Clock, AlertTriangle, 
  ArrowRight, FileText, Plus 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import StatusBadge from '@/components/ClientPortal/StatusBadge';
import ProgressBar from '@/components/ClientPortal/ProgressBar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const StatCard = ({ title, value, icon: Icon, color, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-[#111] p-6 rounded-xl border border-white/10 flex items-start justify-between"
  >
    <div>
      <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-white">{value}</h3>
    </div>
    <div className={`p-3 rounded-lg bg-opacity-10 ${color.replace('text-', 'bg-')} ${color}`}>
      <Icon size={24} />
    </div>
  </motion.div>
);

const DashboardPage = () => {
  const { user } = useAuth();
  const { projects, documents, loading } = useClient();

  if (loading) return <div className="text-[#BFA76A] animate-pulse">Chargement du tableau de bord...</div>;

  const activeProjects = projects.filter(p => p.status === 'Active').length;
  const completedProjects = projects.filter(p => p.status === 'Completed').length;
  const atRiskProjects = projects.filter(p => p.status === 'At Risk').length;
  
  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">
            Bonjour, <span className="text-[#BFA76A]">{user?.name?.split(' ')[0] || 'Client'}</span>
          </h1>
          <p className="text-gray-400 mt-1">Voici un aperçu de vos activités et projets en cours.</p>
        </div>
        <Link to="/espace-client/projets">
          <Button className="bg-[#BFA76A] text-black hover:bg-white font-bold">
            <Plus size={18} className="mr-2" /> Nouveau Projet
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Projets Actifs" value={activeProjects} icon={FolderOpen} color="text-blue-500" delay={0.1} />
        <StatCard title="Projets Terminés" value={completedProjects} icon={CheckCircle} color="text-green-500" delay={0.2} />
        <StatCard title="Documents" value={documents.length} icon={FileText} color="text-purple-500" delay={0.3} />
        <StatCard title="Attention Requise" value={atRiskProjects} icon={AlertTriangle} color="text-red-500" delay={0.4} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Projects */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Projets Récents</h2>
            <Link to="/espace-client/projets" className="text-sm text-[#BFA76A] hover:underline">Tout voir</Link>
          </div>
          
          <div className="space-y-4">
            {projects.slice(0, 3).map((project, i) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i }}
              >
                <Link to={`/espace-client/projets/${project.id}`}>
                  <Card className="bg-[#111] border-white/10 p-5 hover:border-[#BFA76A]/50 transition-all cursor-pointer group">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-lg text-white group-hover:text-[#BFA76A] transition-colors">{project.name}</h3>
                        <p className="text-sm text-gray-500">Deadline: {new Date(project.deadline).toLocaleDateString()}</p>
                      </div>
                      <StatusBadge status={project.status} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>Progression</span>
                        <span>{project.progress}%</span>
                      </div>
                      <ProgressBar progress={project.progress} />
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Documents */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Documents Récents</h2>
            <Link to="/espace-client/documents" className="text-sm text-[#BFA76A] hover:underline">Tout voir</Link>
          </div>

          <div className="bg-[#111] rounded-xl border border-white/10 p-6 space-y-6">
            {documents.slice(0, 5).map((doc, i) => (
              <div key={doc.id} className="flex items-center gap-4 group">
                <div className="p-2 bg-[#1A1A1A] rounded text-gray-400 group-hover:text-white group-hover:bg-[#222] transition-colors">
                  <FileText size={20} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-white truncate group-hover:text-[#BFA76A] transition-colors">{doc.name}</p>
                  <p className="text-xs text-gray-500">{new Date(doc.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
            <Link to="/espace-client/documents">
              <Button variant="outline" className="w-full border-white/10 text-gray-400 hover:text-white mt-4">
                Voir la bibliothèque
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
