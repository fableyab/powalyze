
import React, { useState } from 'react';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import SEO from '@/components/SEO';
import { useLanguage } from '@/context/LanguageContext';
import { useBlog } from '@/context/BlogContext';
import { motion } from 'framer-motion';
import BlogCard from '@/components/Blog/BlogCard';
import BlogSidebar from '@/components/Blog/BlogSidebar';
import { Loader2 } from 'lucide-react';

const BlogPage = () => {
  const { t } = useLanguage();
  const { articles, loading, filterByCategory, search } = useBlog();
  const [activeCategory, setActiveCategory] = useState('All');

  const handleCategorySelect = (category) => {
    setActiveCategory(category);
    filterByCategory(category);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans">
      <SEO 
        title="Blog Powalyze | Insights PMO & Data"
        description="Articles d'experts sur le PMO stratégique, la Business Intelligence et la Gouvernance IT."
      />
      <Navbar />

      <main className="pt-32 pb-20 container mx-auto px-6">
        {/* Hero */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-[#BFA76A] font-bold uppercase tracking-[0.2em] mb-4 block text-xs">Knowledge Hub</span>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 text-white">
            Insights & Expertise
          </h1>
          <p className="text-xl text-gray-400">
            Découvrez nos analyses sur la transformation, le pilotage et la data.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="animate-spin text-[#BFA76A]" size={40} />
              </div>
            ) : articles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {articles.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <BlogCard article={article} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-[#111] rounded-xl border border-white/10">
                <p className="text-gray-400">Aucun article trouvé.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <BlogSidebar 
              activeCategory={activeCategory} 
              onCategorySelect={handleCategorySelect}
              onSearch={(q) => search(q)}
            />
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
};

export default BlogPage;
