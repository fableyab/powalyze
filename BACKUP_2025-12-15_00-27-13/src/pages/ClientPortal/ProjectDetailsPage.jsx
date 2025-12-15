
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useClient } from '@/context/ClientContext';
import { ArrowLeft, Calendar, DollarSign, User, FileText, Download } from 'lucide-react';
import StatusBadge from '@/components/ClientPortal/StatusBadge';
import ProgressBar from '@/components/ClientPortal/ProgressBar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const { getProject, getProjectDocuments } = useClient();
  
  const project = getProject(id);
  const documents = getProjectDocuments(id);

  if (!project) return <div className="text-white">Projet introuvable</div>;

  return (
    <div className="space-y-8">
      <Link to="/espace-client/projets" className="text-gray-400 hover:text-white flex items-center gap-2 text-sm mb-4">
        <ArrowLeft size={16} /> Retour aux projets
      </Link>

      {/* Header */}
      <div className="bg-[#111] border border-white/10 rounded-xl p-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-display font-bold text-white">{project.name}</h1>
              <StatusBadge status={project.status} />
            </div>
            <p className="text-gray-400 max-w-2xl">{project.description}</p>
          </div>
          <div className="text-right">
             <div className="text-3xl font-bold text-[#BFA76A]">{project.progress}%</div>
             <div className="text-sm text-gray-500 uppercase tracking-wider">Complété</div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-white/10">
           <div>
              <p className="text-xs text-gray-500 uppercase mb-1">Chef de Projet</p>
              <div className="flex items-center gap-2 text-white font-medium">
                 <User size={16} className="text-[#BFA76A]" /> {project.manager}
              </div>
           </div>
           <div>
              <p className="text-xs text-gray-500 uppercase mb-1">Deadline</p>
              <div className="flex items-center gap-2 text-white font-medium">
                 <Calendar size={16} className="text-blue-500" /> {new Date(project.deadline).toLocaleDateString()}
              </div>
           </div>
           <div>
              <p className="text-xs text-gray-500 uppercase mb-1">Budget Consommé</p>
              <div className="flex items-center gap-2 text-white font-medium">
                 <DollarSign size={16} className="text-green-500" /> {project.spent.toLocaleString()} / {project.budget.toLocaleString()}
              </div>
           </div>
           <div>
              <p className="text-xs text-gray-500 uppercase mb-1">Type</p>
              <div className="text-white font-medium bg-[#222] px-2 py-0.5 rounded inline-block text-sm">
                 {project.type}
              </div>
           </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-[#111] border border-white/10 p-1 mb-6">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="documents">Documents ({documents.length})</TabsTrigger>
          <TabsTrigger value="team">Équipe</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#111] border border-white/10 rounded-xl p-6">
                 <h3 className="text-lg font-bold text-white mb-4">Objectifs & Périmètre</h3>
                 <p className="text-gray-400 leading-relaxed">
                    Ce projet vise à transformer les processus actuels pour améliorer l'efficacité opérationnelle de 25%.
                    Le périmètre inclut l'audit, la conception de la solution cible et l'implémentation technique.
                 </p>
              </div>
              <div className="bg-[#111] border border-white/10 rounded-xl p-6">
                 <h3 className="text-lg font-bold text-white mb-4">Activité Récente</h3>
                 <ul className="space-y-4">
                    <li className="flex gap-3 text-sm">
                       <div className="w-2 h-2 rounded-full bg-[#BFA76A] mt-1.5"></div>
                       <div>
                          <p className="text-white">Mise à jour du statut par Fabrice Fays</p>
                          <p className="text-gray-500 text-xs">Il y a 2 jours</p>
                       </div>
                    </li>
                    <li className="flex gap-3 text-sm">
                       <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5"></div>
                       <div>
                          <p className="text-white">Nouveau document ajouté: Rapport Q3</p>
                          <p className="text-gray-500 text-xs">Il y a 5 jours</p>
                       </div>
                    </li>
                 </ul>
              </div>
           </div>
        </TabsContent>

        <TabsContent value="documents">
           <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
              <table className="w-full text-left">
                 <thead className="bg-[#1A1A1A] text-xs uppercase text-gray-500">
                    <tr>
                       <th className="p-4">Nom</th>
                       <th className="p-4">Type</th>
                       <th className="p-4">Date</th>
                       <th className="p-4 text-right">Action</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5">
                    {documents.map(doc => (
                       <tr key={doc.id} className="hover:bg-white/5 transition-colors">
                          <td className="p-4 font-medium text-white flex items-center gap-3">
                             <FileText size={18} className="text-[#BFA76A]" /> {doc.name}
                          </td>
                          <td className="p-4 text-gray-400 text-sm">{doc.category}</td>
                          <td className="p-4 text-gray-400 text-sm">{new Date(doc.date).toLocaleDateString()}</td>
                          <td className="p-4 text-right">
                             <Button variant="ghost" size="sm" className="hover:text-[#BFA76A]"><Download size={16}/></Button>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </TabsContent>

        <TabsContent value="team">
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {project.team.map(member => (
                 <div key={member.id} className="bg-[#111] border border-white/10 rounded-xl p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#222] border border-white/10 flex items-center justify-center text-[#BFA76A] font-bold text-lg">
                       {member.avatar}
                    </div>
                    <div>
                       <h4 className="font-bold text-white">{member.name}</h4>
                       <p className="text-xs text-gray-500 uppercase">{member.role}</p>
                    </div>
                 </div>
              ))}
           </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectDetailsPage;
