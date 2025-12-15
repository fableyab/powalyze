
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/context/LanguageContext';

const BlogCard = ({ article }) => {
  const { language, t } = useLanguage();
  const content = article.translations[language] || article.translations.fr;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group flex flex-col h-full bg-[#111] border border-white/10 rounded-xl overflow-hidden hover:border-[#BFA76A]/50 transition-all duration-300 shadow-lg"
    >
      <Link to={`/blog/${article.slug}`} className="block relative h-48 overflow-hidden">
        <img 
          src={article.image} 
          alt={content.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <Badge className="bg-[#BFA76A] text-black hover:bg-white font-bold">
            {article.category}
          </Badge>
        </div>
      </Link>

      <div className="flex flex-col flex-grow p-6">
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
          <span className="flex items-center gap-1"><Calendar size={12} /> {article.date}</span>
          <span className="flex items-center gap-1"><Clock size={12} /> {article.readingTime} min</span>
        </div>

        <Link to={`/blog/${article.slug}`}>
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#BFA76A] transition-colors line-clamp-2">
            {content.title}
          </h3>
        </Link>

        <p className="text-gray-400 text-sm mb-6 line-clamp-3 flex-grow">
          {content.excerpt}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <User size={14} className="text-[#BFA76A]" />
            {article.author}
          </div>
          <Link 
            to={`/blog/${article.slug}`} 
            className="text-xs font-bold text-[#BFA76A] flex items-center gap-1 group-hover:gap-2 transition-all uppercase tracking-wider"
          >
            {t('common.readMore')} <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;
