
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import BlogCard from '@/components/BlogCard';
import { blogArticles } from '@/data/blogArticles';

const RelatedArticles = ({ currentArticleId, category }) => {
  const { t } = useLanguage();
  
  const related = blogArticles
    .filter(a => a.id !== currentArticleId && a.category === category)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="py-12 border-t border-white/10 mt-12">
      <h3 className="text-2xl font-bold text-white mb-8">{t('blog.related', 'Articles Similaires')}</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {related.map(article => (
          <BlogCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
};

export default RelatedArticles;
