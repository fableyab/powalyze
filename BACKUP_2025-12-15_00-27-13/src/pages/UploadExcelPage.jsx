import React, { useState, useRef } from 'react';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import SEO from '@/components/SEO';
import { Upload, FileSpreadsheet, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { importService } from '@/services/import/importService';
import { useToast } from '@/components/ui/use-toast';
import LoadingSpinner from '@/components/LoadingStates/LoadingSpinner';

const UploadExcelPage = () => {
  const { toast } = useToast();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [result, setResult] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = async (file) => {
    setLoading(true);
    setResult(null);
    try {
      const res = await importService.parseFile(file);
      setResult(res);
      
      if (res.isValid) {
        toast({ title: "Analysis Complete", description: `Successfully analyzed ${res.totalRows} rows.` });
      } else {
        toast({ variant: "destructive", title: "Validation Warning", description: "Some columns seem to be missing." });
      }
    } catch (err) {
      toast({ variant: "destructive", title: "Import Error", description: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <SEO title="Data Import" description="Upload your Excel or CSV files for instant analysis." />
      <Navbar />

      <main className="pt-32 pb-20 container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold font-display mb-2">Import Data</h1>
          <p className="text-gray-400 mb-8">Upload your project or financial data to generate instant insights.</p>

          <div 
            className={`border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center text-center transition-all cursor-pointer min-h-[300px]
              ${dragActive ? 'border-[#BFA76A] bg-[#BFA76A]/5 scale-[1.02]' : 'border-white/10 bg-[#111] hover:border-white/20'}`}
            onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
            onClick={() => !result && fileInputRef.current?.click()}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept=".csv,.xlsx,.xls" 
              onChange={(e) => e.target.files[0] && handleFile(e.target.files[0])}
              disabled={loading}
            />
            
            {loading ? (
              <LoadingSpinner size={48} text="Parsing file..." />
            ) : !result ? (
              <>
                <div className="w-16 h-16 bg-[#1C1C1C] rounded-full flex items-center justify-center mb-6 text-gray-400">
                  <Upload size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Drag & Drop or Click to Upload</h3>
                <p className="text-sm text-gray-500 mb-6 max-w-xs">
                  Supports CSV or Excel (.xlsx).
                </p>
                <Button variant="outline" className="border-white/10 text-white hover:bg-white/5">
                  Select File
                </Button>
              </>
            ) : (
              <div className="w-full">
                <div className="flex items-center justify-center gap-2 mb-6">
                  {result.isValid ? (
                    <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center"><CheckCircle size={24}/></div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-yellow-500/20 text-yellow-500 flex items-center justify-center"><AlertCircle size={24}/></div>
                  )}
                </div>
                
                <h3 className="text-xl font-bold mb-4">{result.isValid ? "File Ready" : "Review Required"}</h3>
                
                <div className="bg-black/40 rounded-lg p-4 mb-6 text-left space-y-2 text-sm">
                  <div className="flex justify-between">
                     <span className="text-gray-400">Rows Detected:</span>
                     <span className="font-mono">{result.totalRows}</span>
                  </div>
                  <div className="flex justify-between">
                     <span className="text-gray-400">Columns Found:</span>
                     <span className="font-mono">{result.headers.length}</span>
                  </div>
                  {result.missingColumns.length > 0 && (
                     <div className="pt-2 border-t border-white/10 mt-2">
                        <span className="text-red-400 block mb-1">Missing Columns:</span>
                        <div className="flex flex-wrap gap-1">
                           {result.missingColumns.map(c => (
                              <span key={c} className="px-2 py-0.5 bg-red-900/30 text-red-300 rounded text-xs">{c}</span>
                           ))}
                        </div>
                     </div>
                  )}
                </div>

                <div className="flex gap-3 justify-center">
                   <Button variant="ghost" onClick={() => setResult(null)} className="text-gray-400">Cancel</Button>
                   <Button className="bg-[#BFA76A] text-black font-bold hover:bg-white">
                      Process Data <ArrowRight size={16} className="ml-2" />
                   </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default UploadExcelPage;