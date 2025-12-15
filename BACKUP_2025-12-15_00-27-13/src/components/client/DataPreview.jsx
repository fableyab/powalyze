import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';

const DataPreview = ({ data }) => {
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  
  if (!data || !data.data || data.data.length === 0) {
    return <div className="p-8 text-center text-gray-500">{t('client.dashboard.noData')}</div>;
  }

  const rows = data.data;
  const columns = data.columns;
  const rowsPerPage = 10;

  // Filter
  const filteredRows = rows.filter(row => 
    Object.values(row).some(val => 
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Pagination
  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
  const currentRows = filteredRows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="bg-[#111] border border-[#222] rounded-xl overflow-hidden">
       {/* Toolbar */}
       <div className="p-4 border-b border-[#222] flex flex-col sm:flex-row justify-between items-center gap-4">
          <h3 className="text-white font-medium">{t('client.dashboard.tabs.data')} ({filteredRows.length})</h3>
          <div className="relative w-full sm:w-64">
             <Search className="absolute left-3 top-2.5 text-gray-500" size={16} />
             <input 
               type="text" 
               placeholder={t('common.search')}
               value={searchTerm}
               onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
               className="w-full bg-[#0A0A0A] border border-[#333] rounded-full pl-10 pr-4 py-2 text-sm text-white focus:border-[#BFA76A] outline-none"
             />
          </div>
       </div>

       {/* Table */}
       <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
             <thead className="bg-[#1C1C1C] text-gray-400">
                <tr>
                   {columns.map((col, idx) => (
                      <th key={idx} className="p-3 font-medium border-b border-[#333]">{col}</th>
                   ))}
                </tr>
             </thead>
             <tbody className="divide-y divide-[#222]">
                {currentRows.map((row, rIdx) => (
                   <tr key={rIdx} className="hover:bg-white/5 transition-colors">
                      {columns.map((col, cIdx) => (
                         <td key={cIdx} className="p-3 text-gray-300">
                            {row[col] !== undefined ? String(row[col]) : ''}
                         </td>
                      ))}
                   </tr>
                ))}
             </tbody>
          </table>
       </div>

       {/* Pagination */}
       <div className="p-4 border-t border-[#222] flex justify-between items-center">
          <span className="text-xs text-gray-500">
             Page {currentPage} of {totalPages}
          </span>
          <div className="flex gap-2">
             <button 
               onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
               disabled={currentPage === 1}
               className="p-1 rounded bg-[#222] text-gray-400 hover:text-white disabled:opacity-50"
             >
                <ChevronLeft size={18} />
             </button>
             <button 
               onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
               disabled={currentPage === totalPages}
               className="p-1 rounded bg-[#222] text-gray-400 hover:text-white disabled:opacity-50"
             >
                <ChevronRight size={18} />
             </button>
          </div>
       </div>
    </div>
  );
};

export default DataPreview;