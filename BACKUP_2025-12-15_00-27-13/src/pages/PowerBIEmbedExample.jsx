import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PowerBIEmbedContainer from '@/components/PowerBIEmbed/PowerBIEmbedContainer';
import { Button } from '@/components/ui/button';

const PowerBIEmbedExample = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-6 flex items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="text-gray-400 hover:text-white hover:bg-white/10 gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Power BI Embedded Analytics</h1>
            <p className="text-gray-400">Interactive report integration example</p>
          </div>
        </div>
        
        <div className="bg-[#111] rounded-xl border border-white/10 overflow-hidden shadow-2xl h-[800px]">
          <PowerBIEmbedContainer 
            reportId="example-report-id" 
            groupId="example-group-id"
          />
        </div>
      </div>
    </div>
  );
};

export default PowerBIEmbedExample;