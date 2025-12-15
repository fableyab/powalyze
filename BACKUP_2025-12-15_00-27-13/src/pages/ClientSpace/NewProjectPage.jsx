import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import ProjectForm from '@/components/Forms/ProjectForm';
import BackButton from '@/components/Navigation/BackButton';
import { useProjects } from '@/context/ProjectContext';

const NewProjectPage = () => {
  const navigate = useNavigate();
  const { addProject } = useProjects();

  const handleSubmit = async (data) => {
    try {
       await addProject(data);
       navigate('/client/space');
    } catch (e) {
       // Error handled in context/form
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col">
       <Navbar />
       <main className="flex-grow pt-32 pb-20 container mx-auto px-6 max-w-3xl">
          <div className="mb-8">
             <BackButton to="/client/space" />
             <h1 className="text-3xl font-display font-bold mt-4">Create New Project</h1>
          </div>
          
          <div className="bg-[#111] border border-white/10 rounded-xl p-8 shadow-xl">
             <ProjectForm onSubmit={handleSubmit} onCancel={() => navigate('/client/space')} />
          </div>
       </main>
       <FooterSection />
    </div>
  );
};

export default NewProjectPage;