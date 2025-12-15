import React, { useEffect, useState } from 'react';
import PMOReportVisuals from '@/components/DemoVisuals/PMOReportVisuals';
import { sampleDataService } from '@/services/powerbi/sampleDataService';
import { Loader2 } from 'lucide-react';

const DemoPMOReportDemo = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const projectData = sampleDataService.generateCompleteProjectData();
    setData(projectData);
  }, []);

  if (!data) return <div className="p-12 flex justify-center"><Loader2 className="animate-spin text-[#BFA76A]" /></div>;

  return (
    <div className="animate-in fade-in duration-500">
       <PMOReportVisuals data={data} />
    </div>
  );
};

export default DemoPMOReportDemo;