
import React from 'react';
import { Download, ExternalLink, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DocumentTypeIcon from '@/components/DocumentTypeIcon';
import { formatBytes } from '@/lib/fileService';

const DocumentCard = ({ doc }) => {
  return (
    <div className="bg-[#111] border border-white/10 rounded-xl p-5 hover:border-[#BFA76A]/50 transition-all group flex flex-col h-full">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-[#1A1A1A] rounded-lg group-hover:bg-[#BFA76A] group-hover:text-black transition-colors">
          <DocumentTypeIcon type={doc.type || doc.name} className="w-6 h-6" />
        </div>
        <div className="text-xs text-gray-500 font-mono bg-[#1A1A1A] px-2 py-1 rounded">
          {doc.type}
        </div>
      </div>

      <h3 className="text-white font-bold text-sm mb-2 line-clamp-2 min-h-[40px]" title={doc.name}>
        {doc.name}
      </h3>

      <div className="space-y-2 mb-6 flex-grow">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <User size={12} /> {doc.owner}
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Calendar size={12} /> {new Date(doc.date).toLocaleDateString()}
        </div>
        <div className="text-xs text-gray-500">
          {formatBytes(doc.size || 0)}
        </div>
      </div>

      <div className="flex gap-2 mt-auto">
        <Button size="sm" variant="outline" className="flex-1 border-white/10 hover:bg-white/10 text-xs">
          <Download size={14} className="mr-2" /> DL
        </Button>
        <Button size="sm" className="bg-[#BFA76A] text-black hover:bg-white text-xs px-3">
          <ExternalLink size={14} />
        </Button>
      </div>
    </div>
  );
};

export default DocumentCard;
