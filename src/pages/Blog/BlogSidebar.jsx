
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail } from 'lucide-react';
import { blogArticles } from '@/data/blogArticles';

const BlogSidebar = ({ onCategorySelect, activeCategory }) => {
  const { t } = useLanguage();
  
  // Extract unique categories and tags
  const categories = [...new Set(blogArticles.map(a => a.category))];
  const tags = [...new Set(blogArticles.flatMap(a => a.tags))].slice(0, 10);

  return (
    <div className="space-y-8 sticky top-32">
      {/* Newsletter */}
      <div className="bg-[#111] border border-white/10 rounded-xl p-6">
        <h3 className="text-white font-bold mb-2 flex items-center gap-2">
          <Mail size={18} className="text-[#BFA76A]" /> Newsletter
        </h3>
        <p className="text-gray-400 text-sm mb-4">
          Recevez nos dernières analyses PMO et Data directement par email.
        </p>
        <div className="space-y-2">
          <Input placeholder="Votre email" className="bg-black/50 border-white/10" />
          <Button className="w-full bg-[#BFA76A] text-black font-bold hover:bg-white">
            S'abonner
          </Button>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-[#111] border border-white/10 rounded-xl p-6">
        <h3 className="text-white font-bold mb-4 border-b border-white/10 pb-2">Catégories</h3>
        <div className="space-y-2">
          <button 
            onClick={() => onCategorySelect('All')}
            className={`block w-full text-left text-sm py-1 transition-colors ${activeCategory === 'All' ? 'text-[#BFA76A] font-bold' : 'text-gray-400 hover:text-white'}`}
          >
            Tout voir
          </button>
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => onCategorySelect(cat)}
              className={`block w-full text-left text-sm py-1 transition-colors ${activeCategory === cat ? 'text-[#BFA76A] font-bold' : 'text-gray-400 hover:text-white'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Popular Tags */}
      <div className="bg-[#111] border border-white/10 rounded-xl p-6">
        <h3 className="text-white font-bold mb-4 border-b border-white/10 pb-2">Tags Populaires</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <span key={tag} className="text-xs bg-[#1C1C1C] border border-white/5 text-gray-400 px-2 py-1 rounded cursor-pointer hover:border-[#BFA76A] hover:text-[#BFA76A] transition-colors">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogSidebar;
