
import React from 'react';
import { Calendar, Clock, Tag, Folder } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const ArticleMetadata = ({ article, language }) => {
  return (
    <div className="flex flex-wrap gap-4 md:gap-8 items-center text-sm text-gray-400 py-6 border-y border-white/10 mb-8">
      <div className="flex items-center gap-2">
        <Folder size={16} className="text-[#BFA76A]" />
        <span className="text-white font-medium">{article.category}</span>
      </div>
      
      <div className="flex items-center gap-2">
        <Calendar size={16} />
        <span>{article.date}</span>
      </div>
      
      <div className="flex items-center gap-2">
        <Clock size={16} />
        <span>{article.readingTime} min read</span>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <Tag size={16} />
        <div className="flex gap-2">
          {article.tags.map(tag => (
            <Badge key={tag} variant="outline" className="text-xs border-white/10 text-gray-400">
              #{tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleMetadata;
