import React, { useRef, useState } from 'react';
import { Upload, FileSpreadsheet, X, CheckCircle, AlertCircle, FileText } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { formatBytes } from '@/lib/fileService';
import { motion, AnimatePresence } from 'framer-motion';

const FileUploadZone = ({ onFileSelect, isUploading, progress }) => {
  const { t } = useLanguage();
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files[0]);
    }
  };

  const handleFiles = (file) => {
    setSelectedFile(file);
    onFileSelect(file);
  };

  const onButtonClick = () => {
    inputRef.current.click();
  };

  const clearFile = () => {
    setSelectedFile(null);
    if (inputRef.current) {
        inputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!selectedFile ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`relative w-full h-64 rounded-xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center cursor-pointer group
              ${dragActive 
                ? 'border-[#BFA76A] bg-[#BFA76A]/10' 
                : 'border-[#333] hover:border-[#BFA76A]/50 bg-[#111]'
              }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={onButtonClick}
          >
            <input
              ref={inputRef}
              type="file"
              className="hidden"
              multiple={false}
              onChange={handleChange}
              accept=".xlsx,.xls,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/csv"
            />
            
            <div className={`p-4 rounded-full bg-[#1C1C1C] mb-4 transition-transform duration-300 group-hover:scale-110 ${dragActive ? 'scale-110' : ''}`}>
              <Upload className={`w-8 h-8 ${dragActive ? 'text-[#BFA76A]' : 'text-gray-400'}`} />
            </div>
            
            <p className="text-lg font-medium text-white mb-2">
              {dragActive ? t('upload.dropZoneActive') : t('upload.dropZone')}
            </p>
            <p className="text-sm text-gray-500">
              {t('upload.browse')}
            </p>
            <p className="text-xs text-[#666] mt-4 border border-[#333] px-3 py-1 rounded-full">
              {t('upload.limits')}
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-[#111] border border-[#333] rounded-xl p-6"
          >
            <div className="flex items-center gap-4 mb-4">
               <div className="h-12 w-12 rounded-lg bg-[#BFA76A]/10 flex items-center justify-center text-[#BFA76A]">
                  {selectedFile.name.endsWith('.csv') ? <FileText size={24} /> : <FileSpreadsheet size={24} />}
               </div>
               <div className="flex-1 min-w-0">
                 <h4 className="text-white font-medium truncate">{selectedFile.name}</h4>
                 <p className="text-sm text-gray-500">{formatBytes(selectedFile.size)}</p>
               </div>
               {!isUploading && (
                 <button 
                   onClick={(e) => { e.stopPropagation(); clearFile(); }}
                   className="p-2 hover:bg-red-500/10 hover:text-red-500 text-gray-400 rounded-full transition-colors"
                 >
                   <X size={20} />
                 </button>
               )}
            </div>

            {isUploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>{t('upload.uploading')}</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-2 bg-[#222] rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-[#BFA76A]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FileUploadZone;