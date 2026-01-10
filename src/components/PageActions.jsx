
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Share2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const PageActions = () => {
  const { toast } = useToast();

  const handleExport = () => {
    toast({ title: "Exporting...", description: "Your report is being prepared." });
  };

  const handleShare = () => {
    toast({ title: "Share", description: "Share link copied to clipboard." });
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" onClick={handleExport} className="h-9 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white">
        <Download className="w-4 h-4 mr-2" /> Export
      </Button>
      <Button variant="outline" size="sm" onClick={handleShare} className="h-9 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white">
        <Share2 className="w-4 h-4 mr-2" /> Share
      </Button>
    </div>
  );
};

export default PageActions;
