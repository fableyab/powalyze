import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/components/landing/Navbar';
import { Button } from '@/components/ui/button';
import { Upload, File, X, CheckCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ClientUploadPage = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);

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
      addFile(e.dataTransfer.files[0]);
    }
  };

  const addFile = (file) => {
    setFiles([...files, { name: file.name, size: (file.size / 1024 / 1024).toFixed(2) + ' MB', status: 'ready' }]);
    toast({ title: t('common.success'), description: `File ${file.name} added.` });
  };

  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const handleUpload = () => {
    setFiles(files.map(f => ({ ...f, status: 'uploaded' })));
    toast({ title: t('common.success'), description: "All files uploaded successfully." });
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 px-6 container mx-auto max-w-4xl">
        <h1 className="text-3xl font-display text-white mb-2">{t('client.upload.title')}</h1>
        <p className="text-gray-400 mb-8">Secure Data Area</p>

        <div 
          className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${dragActive ? 'border-[#BFA76A] bg-[#BFA76A]/5' : 'border-white/10 hover:border-white/30'}`}
          onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
        >
          <Upload className="mx-auto h-12 w-12 text-gray-500 mb-4" />
          <p className="text-lg text-white mb-2">{t('client.upload.drag')}</p>
          <p className="text-sm text-gray-500 mb-6">XLSX, CSV (Max 50MB)</p>
          <Button variant="outline" className="border-white/20 text-white" onClick={() => document.getElementById('file-input').click()}>
            Browse Files
          </Button>
          <input type="file" id="file-input" className="hidden" onChange={(e) => e.target.files[0] && addFile(e.target.files[0])} />
        </div>

        {files.length > 0 && (
          <div className="mt-8 space-y-4">
            <h3 className="text-white font-bold">{t('client.upload.history')}</h3>
            {files.map((file, i) => (
              <div key={i} className="bg-[#111] p-4 rounded-lg flex items-center justify-between border border-white/5">
                <div className="flex items-center gap-4">
                  <File className="text-[#BFA76A]" />
                  <div>
                    <p className="text-white text-sm font-medium">{file.name}</p>
                    <p className="text-gray-500 text-xs">{file.size}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {file.status === 'uploaded' && <CheckCircle className="text-green-500 w-5 h-5" />}
                  <button onClick={() => removeFile(i)} className="text-gray-500 hover:text-white"><X size={18} /></button>
                </div>
              </div>
            ))}
            <div className="flex justify-end pt-4">
              <Button onClick={handleUpload} className="bg-[#BFA76A] text-black hover:bg-[#d4bb7e]">{t('common.upload')}</Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ClientUploadPage;