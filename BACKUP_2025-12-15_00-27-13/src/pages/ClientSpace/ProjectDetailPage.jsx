import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import BackButton from '@/components/Navigation/BackButton';
import { projectService } from '@/services/project/projectService';
import { Loader2, Calendar, DollarSign, User, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const ProjectDetailPage = () => {
  const { id } = useParams();
  const [project, setProject] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await projectService.getProject(id);
        setProject(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center"><Loader2 className="animate-spin text-[#BFA76A]" /></div>;
  if (!project) return <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center">Project Not Found</div>;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col">
       <Navbar />
       <main className="flex-grow pt-32 pb-20 container mx-auto px-6">
          <BackButton to="/client/space" className="mb-6" />
          
          <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
             <div>
                <h1 className="text-4xl font-display font-bold mb-2">{project.name}</h1>
                <div className="flex gap-2">
                   <Badge variant="outline" className="border-white/20 text-gray-300">{project.status}</Badge>
                   <Badge variant="outline" className="border-white/20 text-gray-300">{project.type}</Badge>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             {/* Left Column: Details */}
             <div className="lg:col-span-2 space-y-8">
                <div className="bg-[#111] border border-white/10 rounded-xl p-6">
                   <h3 className="text-xl font-bold mb-4">Overview</h3>
                   <p className="text-gray-400 leading-relaxed">{project.description || "No description provided."}</p>
                </div>

                <div className="bg-[#111] border border-white/10 rounded-xl p-6">
                   <h3 className="text-xl font-bold mb-4">Risks</h3>
                   <p className="text-gray-400">{project.risks || "No risks identified."}</p>
                </div>
             </div>

             {/* Right Column: Meta */}
             <div className="space-y-6">
                <div className="bg-[#111] border border-white/10 rounded-xl p-6 space-y-4">
                   <h3 className="text-xl font-bold mb-4">Key Metrics</h3>
                   
                   <div className="flex items-center gap-3">
                      <DollarSign className="text-[#BFA76A]" />
                      <div>
                         <div className="text-xs text-gray-500">Budget</div>
                         <div className="font-bold">CHF {Number(project.budget).toLocaleString()}</div>
                      </div>
                   </div>

                   <div className="flex items-center gap-3">
                      <Calendar className="text-[#3A7BFF]" />
                      <div>
                         <div className="text-xs text-gray-500">Timeline</div>
                         <div className="font-bold">{project.startDate} - {project.endDate || 'TBD'}</div>
                      </div>
                   </div>

                   <div className="flex items-center gap-3">
                      <User className="text-purple-500" />
                      <div>
                         <div className="text-xs text-gray-500">Manager</div>
                         <div className="font-bold">{project.manager || 'Unassigned'}</div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </main>
       <FooterSection />
    </div>
  );
};

export default ProjectDetailPage;