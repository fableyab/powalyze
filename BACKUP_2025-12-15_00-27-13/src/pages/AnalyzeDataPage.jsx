import React, { useState } from 'react';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import { Button } from '@/components/ui/button';
import { Upload, BarChart, FileSpreadsheet, Check } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import * as XLSX from 'xlsx';
import { dashboardGeneratorService } from '@/services/powerbi/dashboardGeneratorService';

const AnalyzeDataPage = () => {
  const [data, setData] = useState(null);
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const wb = XLSX.read(evt.target.result, { type: 'binary' });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(ws);
        setData({ projects: json, raw: json }); // Mock structure adaptation
        toast({ title: "File Loaded", description: `${json.length} records found.` });
      } catch (err) {
        toast({ variant: "destructive", title: "Error", description: "Failed to parse file" });
      }
    };
    reader.readAsBinaryString(file);
  };

  const handleGenerateDashboard = async () => {
    setProcessing(true);
    try {
      await dashboardGeneratorService.generateDashboard(data);
      toast({ title: "Dashboard Generated", description: "Your data has been visualized." });
    } catch (err) {
      toast({ variant: "destructive", title: "Error", description: err.message });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Navbar />
      <main className="pt-32 pb-20 container mx-auto px-6">
        <h1 className="text-4xl font-display font-bold mb-8">Analyze Your Data</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
           <div className="border-2 border-dashed border-white/10 rounded-xl p-12 text-center">
              <Upload className="mx-auto mb-4 text-[#BFA76A]" size={48} />
              <h3 className="text-xl font-bold mb-2">Upload Excel / CSV</h3>
              <p className="text-gray-400 mb-6">Drag & drop or browse to upload your project data.</p>
              <input type="file" onChange={handleFileUpload} accept=".xlsx,.csv" className="hidden" id="analyze-upload" />
              <Button onClick={() => document.getElementById('analyze-upload').click()} variant="outline">Browse Files</Button>
           </div>

           {data && (
              <div className="bg-[#111] p-8 rounded-xl border border-white/10">
                 <div className="flex items-center gap-4 mb-6">
                    <div className="bg-green-500/20 p-3 rounded-full text-green-500"><Check size={24} /></div>
                    <div>
                       <h3 className="font-bold">Data Ready</h3>
                       <p className="text-gray-400">{data.raw.length} records loaded</p>
                    </div>
                 </div>
                 <Button 
                   onClick={handleGenerateDashboard} 
                   disabled={processing}
                   className="w-full bg-[#BFA76A] text-black hover:bg-white font-bold"
                 >
                    {processing ? "Generating..." : "Generate Power BI Dashboard"}
                 </Button>
              </div>
           )}
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default AnalyzeDataPage;