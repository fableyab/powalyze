import React, { useState } from 'react';
import CockpitLayout from "../../components/layout/CockpitLayout";
import { FileText, Upload, Search, Filter, Download, Trash2, Eye, Calendar, User, FolderOpen, File, FileSpreadsheet, FileImage, AlertCircle } from 'lucide-react';

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Environnement vide - pas de documents de test
  const mockDocuments = [];

  const categories = [
    { id: 'all', name: 'All Documents', icon: FolderOpen },
    { id: 'reports', name: 'Reports', icon: FileText },
    { id: 'financial', name: 'Financial', icon: FileSpreadsheet },
    { id: 'governance', name: 'Governance', icon: AlertCircle },
    { id: 'strategy', name: 'Strategy', icon: File }
  ];

  const filteredDocs = mockDocuments.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <CockpitLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extralight text-white tracking-tight mb-2">Document Library</h1>
          <p className="text-xs text-white/40 tracking-[0.1em] uppercase">Swiss Precision Document Management</p>
        </div>
        <button className="px-6 py-2.5 bg-[#D4AF37] text-black rounded-[2px] text-xs font-light hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] transition-all duration-500 tracking-[0.2em] uppercase flex items-center gap-2">
          <Upload className="w-3 h-3" />
          Upload Document
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documents..."
            className="w-full bg-black/40 backdrop-blur-xl border border-white/5 rounded-[2px] pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-[#D4AF37]/30 focus:outline-none transition-all duration-500"
          />
        </div>
        <button className="px-4 py-2.5 bg-black/40 backdrop-blur-xl border border-white/5 rounded-[2px] text-white/60 hover:text-white hover:border-[#D4AF37]/30 transition-all duration-500 flex items-center gap-2">
          <Filter className="w-4 h-4" />
          <span className="text-xs font-light tracking-[0.1em] uppercase">Filter</span>
        </button>
      </div>

      {/* Categories */}
      <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
        {categories.map(cat => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-[2px] text-xs font-light tracking-[0.1em] uppercase whitespace-nowrap transition-all duration-500 ${
                selectedCategory === cat.id
                  ? 'bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30'
                  : 'bg-black/40 backdrop-blur-xl text-white/50 border border-white/5 hover:text-white hover:border-white/10'
              }`}
            >
              <Icon className="w-3 h-3" />
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Documents Grid */}
      {filteredDocs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocs.map((doc) => {
            const Icon = doc.icon;
            return (
              <div
                key={doc.id}
                className="group relative bg-black/40 backdrop-blur-xl border border-white/5 rounded-[2px] p-6 hover:border-[#D4AF37]/30 transition-all duration-700 cursor-pointer"
              >
                <div className="absolute inset-0 bg-[#D4AF37]/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="relative space-y-4">
                  {/* Icon & Actions */}
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 border border-white/10 rounded-[2px] flex items-center justify-center group-hover:border-[#D4AF37]/30 transition-all duration-500">
                      <Icon className="w-6 h-6 text-white/40 group-hover:text-[#D4AF37] transition-colors duration-500" />
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <button 
                        onClick={() => window.open(`/api/documents/${doc.id}/preview`, '_blank')}
                        className="p-1.5 bg-white/5 rounded-[2px] hover:bg-[#D4AF37]/10 transition-colors"
                        title="View document"
                      >
                        <Eye className="w-3 h-3 text-white/40 hover:text-[#D4AF37]" />
                      </button>
                      <button 
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = `/api/documents/${doc.id}/download`;
                          link.download = doc.name;
                          link.click();
                        }}
                        className="p-1.5 bg-white/5 rounded-[2px] hover:bg-[#D4AF37]/10 transition-colors"
                        title="Download document"
                      >
                        <Download className="w-3 h-3 text-white/40 hover:text-[#D4AF37]" />
                      </button>
                      <button 
                        onClick={() => {
                          if(window.confirm(`Delete ${doc.name}?`)) {
                            console.log('Delete doc:', doc.id);
                          }
                        }}
                        className="p-1.5 bg-white/5 rounded-[2px] hover:bg-red-500/10 transition-colors"
                        title="Delete document"
                      >
                        <Trash2 className="w-3 h-3 text-white/40 hover:text-red-400" />
                      </button>
                    </div>
                  </div>

                  {/* Document Info */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-light text-white line-clamp-2 group-hover:text-[#D4AF37] transition-colors duration-500">
                      {doc.name}
                    </h3>
                    <div className="flex items-center gap-4 text-[10px] text-white/30 uppercase tracking-[0.15em]">
                      <span>{doc.size}</span>
                      <span>•</span>
                      <span>{doc.type}</span>
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="pt-3 border-t border-white/5 space-y-2">
                    <div className="flex items-center gap-2 text-[10px] text-white/30">
                      <User className="w-3 h-3" />
                      <span className="tracking-[0.1em]">{doc.uploadedBy}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-white/30">
                      <Calendar className="w-3 h-3" />
                      <span className="tracking-[0.1em]">{doc.uploadedAt}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="border border-white/5 bg-black/20 backdrop-blur-xl rounded-[2px] p-12 text-center">
          <FileText className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <p className="text-sm text-white/40 font-light">No documents found</p>
        </div>
      )}
    </CockpitLayout>
  );
}
