
import React, { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import SEO from '@/components/SEO';
import { useLanguage } from '@/context/LanguageContext';
import { useBlog } from '@/context/BlogContext';
import ArticleMetadata from '@/components/ArticleMetadata';
import TableOfContents from '@/components/Blog/TableOfContents';
import RelatedArticles from '@/components/Blog/RelatedArticles';
import CommentSection from '@/components/Blog/CommentSection';
import { ArrowLeft, User, Linkedin, Twitter, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BlogArticlePage = () => {
  const { slug } = useParams();
  const { language, t } = useLanguage();
  const { getArticle, currentArticle, loading } = useBlog();

  useEffect(() => {
    window.scrollTo(0, 0);
    getArticle(slug);
  }, [slug, getArticle]);

  if (loading) return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
      <Loader2 className="animate-spin text-[#BFA76A]" size={40} />
    </div>
  );

  if (!currentArticle) return <Navigate to="/blog" replace />;

  const content = currentArticle.translations[language] || currentArticle.translations.fr;

  const breadcrumbs = [
    { label: 'Blog', path: '/blog' },
    { label: content.title, path: null }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans">
      <SEO 
        title={content.title}
        description={content.excerpt}
        image={currentArticle.image}
        breadcrumbs={breadcrumbs}
        type="article"
      />
      <Navbar />

      <main className="pt-32 pb-20">
        {/* Article Header */}
        <div className="container mx-auto px-6 max-w-5xl mb-12">
          <Link to="/blog" className="inline-flex items-center text-gray-400 hover:text-[#BFA76A] mb-8 transition-colors text-sm font-bold uppercase tracking-wider">
            <ArrowLeft size={16} className="mr-2" /> Retour au blog
          </Link>
          
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight">
            {content.title}
          </h1>

          <ArticleMetadata article={currentArticle} language={language} />
        </div>

        {/* Featured Image */}
        <div className="w-full h-[400px] md:h-[600px] relative mb-16 overflow-hidden">
          <img src={currentArticle.image} alt={content.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-80" />
        </div>

        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Content */}
            <div className="lg:col-span-8">
              <div 
                className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-[#BFA76A] prose-blockquote:border-l-[#BFA76A] prose-blockquote:bg-[#111] prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-img:rounded-xl"
                dangerouslySetInnerHTML={{ __html: content.content }} 
              />

              {/* Author Bio */}
              <div className="mt-16 bg-[#111] border border-white/10 rounded-xl p-8 flex items-center gap-6">
                <div className="w-16 h-16 bg-[#222] rounded-full flex items-center justify-center text-2xl text-[#BFA76A]">
                  <User />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">{currentArticle.author}</h4>
                  <p className="text-gray-400 text-sm">Expert PMO & Data chez Powalyze.</p>
                </div>
                <div className="ml-auto flex gap-2">
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-[#0077b5]"><Linkedin size={20} /></Button>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-[#1DA1F2]"><Twitter size={20} /></Button>
                </div>
              </div>

              <CommentSection slug={slug} />
              <RelatedArticles currentSlug={slug} category={currentArticle.category} />
            </div>

            {/* Sidebar (TOC) */}
            <div className="lg:col-span-4 space-y-8">
              <TableOfContents />
            </div>

          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
};

export default BlogArticlePage;
