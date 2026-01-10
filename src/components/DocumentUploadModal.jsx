
import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Upload, X, CheckCircle, File, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const DocumentUploadModal = ({ isOpen, onClose, onUploadComplete }) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { user } = useAuth();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
        if (selected.size > 100 * 1024 * 1024) {
            toast({ variant: "destructive", title: "File too large", description: "Max 100MB allowed." });
            return;
        }
        setFile(selected);
    }
  };

  const handleDragOver = (e) => {
      e.preventDefault();
      e.stopPropagation();
  };

  const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const selected = e.dataTransfer.files[0];
      if (selected) {
        if (selected.size > 100 * 1024 * 1024) {
            toast({ variant: "destructive", title: "File too large", description: "Max 100MB allowed." });
            return;
        }
        setFile(selected);
    }
  };

  const handleUpload = async () => {
    if (!file || !user) return;
    setUploading(true);
    setProgress(5);

    try {
        // Sanitize filename to avoid issues with special characters
        const fileExt = file.name.split('.').pop();
        const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const fileName = `${Date.now()}_${sanitizedName}`;
        // IMPORTANT: The path must match the RLS policy structure: user_id/filename
        const filePath = `${user.id}/${fileName}`;

        // 1. Upload to Storage
        const { error: uploadError } = await supabase.storage
            .from('documents')
            .upload(filePath, file, {
                upsert: false,
            });

        if (uploadError) throw uploadError;
        
        setProgress(60);

        // 2. Insert into DB
        const { data, error: dbError } = await supabase.from('documents').insert({
            name: file.name,
            file_path: filePath,
            file_size: file.size,
            file_type: file.type || 'application/octet-stream',
            user_id: user.id,
            tenant_id: user.user_metadata?.tenant_id // Optional: if tenant exists
        }).select().single();

        if (dbError) {
            // If DB insert fails, try to clean up the uploaded file
            await supabase.storage.from('documents').remove([filePath]);
            throw dbError;
        }

        setProgress(100);
        toast({ title: t('common.success'), description: "File uploaded successfully." });
        if (onUploadComplete) onUploadComplete(data);
        
        // Reset and close
        setTimeout(() => {
            setFile(null);
            setProgress(0);
            onClose();
        }, 500);

    } catch (error) {
        console.error('Upload failed:', error);
        toast({ variant: "destructive", title: t('common.error'), description: error.message || "Upload failed" });
        setUploading(false);
        setProgress(0);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1A1A1A] border-slate-800 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('documents.uploadTitle')}</DialogTitle>
        </DialogHeader>
        
        {!file ? (
            <div className="py-8">
                <label 
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className="border-2 border-dashed border-slate-700 rounded-xl h-48 flex flex-col items-center justify-center cursor-pointer hover:border-[#4A9EFF] hover:bg-slate-900/50 transition-all bg-black/20"
                >
                    <Upload className="w-10 h-10 text-slate-500 mb-4" />
                    <span className="text-slate-400 text-sm font-medium">{t('documents.dropzone')}</span>
                    <span className="text-slate-600 text-xs mt-2">Max 100MB</span>
                    <input 
                        ref={fileInputRef}
                        type="file" 
                        className="hidden" 
                        onChange={handleFileChange} 
                    />
                </label>
            </div>
        ) : (
            <div className="py-6 space-y-4">
                <div className="flex items-center gap-3 bg-black p-4 rounded-lg border border-slate-800">
                    <div className="p-2 bg-slate-800 rounded">
                        <File className="w-6 h-6 text-[#4A9EFF]" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="font-medium truncate text-sm">{file.name}</p>
                        <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    {!uploading && (
                        <Button variant="ghost" size="icon" onClick={() => setFile(null)} className="hover:text-red-500">
                            <X className="w-4 h-4" />
                        </Button>
                    )}
                </div>
                
                {uploading && (
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs text-slate-400">
                            <span>Uploading...</span>
                            <span>{progress}%</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-[#4A9EFF] transition-all duration-300" style={{ width: `${progress}%` }} />
                        </div>
                    </div>
                )}
            </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={uploading} className="border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white">
            {t('common.cancel')}
          </Button>
          <Button onClick={handleUpload} disabled={!file || uploading} className="bg-[#4A9EFF] hover:bg-[#0052cc] text-white">
             {uploading ? 'Processing...' : t('common.upload')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentUploadModal;
