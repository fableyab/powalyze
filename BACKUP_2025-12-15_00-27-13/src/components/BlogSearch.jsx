
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/context/LanguageContext';

const BlogSearch = ({ onSearch, searchTerm }) => {
  const { t } = useLanguage();

  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
      <Input
        type="text"
        placeholder={t('blog.searchPlaceholder', 'Rechercher un article...')}
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        className="pl-10 bg-[#111] border-white/10 text-white focus:border-[#BFA76A] h-12 w-full"
      />
    </div>
  );
};

export default BlogSearch;
