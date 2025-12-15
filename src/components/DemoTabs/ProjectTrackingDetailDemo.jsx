import React, { useEffect, useState } from 'react';
import ProjectTrackingVisuals from '@/components/DemoVisuals/ProjectTrackingVisuals';
import { sampleDataService } from '@/services/powerbi/sampleDataService';
import { Loader2 } from 'lucide-react';

const ProjectTrackingDetailDemo = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulate data fetch
    const projectData = sampleDataService.generateCompleteProjectData();
    setData(projectData);
  }, []);

  if (!data) return <div className="p-12 flex justify-center"><Loader2 className="animate-spin text-[#BFA76A]" /></div>;

  return (
    <div className="animate-in fade-in duration-500">
       <ProjectTrackingVisuals data={data} />
    </div>
  );
};

export default ProjectTrackingDetailDemo;