
import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import BlogCard from './BlogCard';
import { blogService } from '@/services/blog/blogService';

const RelatedArticles = ({ currentSlug, category }) => {
  const { t } = useLanguage();
  const [related, setRelated] = useState([]);

  useEffect(() => {
    const fetchRelated = async () => {
      const data = await blogService.getRelatedArticles(currentSlug, category);
      setRelated(data);
    };
    fetchRelated();
  }, [currentSlug, category]);

  if (related.length === 0) return null;

  return (
    <section className="py-12 border-t border-white/10 mt-16">
      <h3 className="text-2xl font-bold text-white mb-8 border-l-4 border-[#BFA76A] pl-4">
        {t('blog.related', 'Articles Similaires')}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {related.map(article => (
          <BlogCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
};

export default RelatedArticles;
