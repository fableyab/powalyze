import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { FileSpreadsheet, FileText, Download, Trash2, MoreVertical, File } from 'lucide-react';
import { formatBytes } from '@/lib/fileService';
import { motion, AnimatePresence } from 'framer-motion';

const FileList = ({ files, onDelete }) => {
  const { t } = useLanguage();

  const getIcon = (type) => {
    if (type.includes('csv')) return <FileText className="text-green-500" size={20} />;
    if (type.includes('sheet') || type.includes('excel')) return <FileSpreadsheet className="text-green-600" size={20} />;
    return <File className="text-gray-400" size={20} />;
  };

  if (!files || files.length === 0) {
    return (
      <div className="text-center py-12 bg-[#111] rounded-xl border border-[#222]">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#1C1C1C] mb-4">
          <File className="text-gray-600" size={24} />
        </div>
        <p className="text-gray-500">{t('upload.emptyHistory')}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-[#222] text-xs uppercase text-gray-500">
            <th className="py-4 px-4 font-medium">{t('upload.columns.name')}</th>
            <th className="py-4 px-4 font-medium hidden md:table-cell">{t('upload.columns.date')}</th>
            <th className="py-4 px-4 font-medium hidden sm:table-cell">{t('upload.columns.size')}</th>
            <th className="py-4 px-4 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#222]">
          <AnimatePresence>
            {files.map((file) => (
              <motion.tr 
                key={file.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="group hover:bg-[#161616] transition-colors"
              >
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="shrink-0 p-2 rounded bg-[#222]">
                      {getIcon(file.type || file.name)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-white font-medium text-sm truncate max-w-[200px] md:max-w-xs">{file.name}</p>
                      <p className="text-xs text-gray-600 md:hidden mt-0.5">
                        {new Date(file.uploadDate).toLocaleDateString()} • {formatBytes(file.size)}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-400 text-sm hidden md:table-cell">
                  {new Date(file.uploadDate).toLocaleDateString()} <span className="text-xs text-gray-600">{new Date(file.uploadDate).toLocaleTimeString()}</span>
                </td>
                <td className="py-4 px-4 text-gray-400 text-sm hidden sm:table-cell">
                  {formatBytes(file.size)}
                </td>
                <td className="py-4 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => alert("Simulated download: " + file.url)}
                      className="p-2 text-gray-400 hover:text-white hover:bg-[#222] rounded-lg transition-colors"
                      title={t('upload.actions.download')}
                    >
                      <Download size={18} />
                    </button>
                    <button 
                      onClick={() => onDelete(file.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                      title={t('upload.actions.delete')}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
};

export default FileList;