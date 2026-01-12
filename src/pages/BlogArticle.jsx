import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Tag, Share2 } from 'lucide-react';
import { getArticleBySlug } from '@/data/articles';
import Header from '@/components/Header';
import ReactMarkdown from 'react-markdown';

export default function BlogArticle() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const article = getArticleBySlug(slug);

  useEffect(() => {
    // Update page title and meta for SEO
    if (article) {
      document.title = article.seo.title;
      
      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', article.seo.description);
      }
      
      // Update meta keywords
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', article.seo.keywords);
      }

      // Track page view with Google Analytics
      if (window.gtag) {
        window.gtag('event', 'page_view', {
          page_title: article.title,
          page_location: window.location.href,
          page_path: window.location.pathname,
          article_category: article.category,
          article_tags: article.tags.join(',')
        });
      }
    }
  }, [article]);

  if (!article) {
    return (
      <div className="min-h-screen bg-[#020713] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-extralight text-white mb-4">Article introuvable</h1>
          <Link to="/blog" className="text-[#D4AF37] hover:underline">
            ← Retour au blog
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Lien copié dans le presse-papier');
    }
  };

  return (
    <div className="min-h-screen bg-[#020713]">
      <Header />
      
      {/* Hero */}
      <article className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-white/60 hover:text-[#D4AF37] transition-colors mb-8 text-sm font-light"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au blog
          </Link>

          {/* Category badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#D4AF37]/10 backdrop-blur-xl border border-[#D4AF37]/20 rounded-[2px] text-[9px] font-light text-[#D4AF37] uppercase tracking-[0.25em] mb-6">
            <span className="w-1 h-1 bg-[#D4AF37] rounded-full"></span>
            {article.category}
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-extralight mb-4 text-white tracking-tight">
            {article.title}
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-white/60 font-light mb-8">
            {article.subtitle}
          </p>

          {/* Meta */}
          <div className="flex items-center justify-between pb-8 mb-8 border-b border-white/5">
            <div className="flex items-center gap-6 text-sm text-white/40 font-light">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(article.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{article.readTime} de lecture</span>
              </div>
            </div>
            
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-[2px] text-white/60 hover:text-white transition-all text-sm font-light"
            >
              <Share2 className="w-4 h-4" />
              Partager
            </button>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ children }) => <h1 className="text-3xl font-extralight text-white mb-6 mt-12">{children}</h1>,
                h2: ({ children }) => <h2 className="text-2xl font-light text-white mb-4 mt-10">{children}</h2>,
                h3: ({ children }) => <h3 className="text-xl font-light text-white mb-3 mt-8">{children}</h3>,
                p: ({ children }) => <p className="text-white/70 leading-relaxed mb-6 font-light">{children}</p>,
                ul: ({ children }) => <ul className="list-disc list-inside text-white/70 mb-6 space-y-2">{children}</ul>,
                li: ({ children }) => <li className="font-light">{children}</li>,
                strong: ({ children }) => <strong className="text-[#D4AF37] font-medium">{children}</strong>,
                code: ({ children }) => (
                  <code className="bg-white/5 text-[#D4AF37] px-2 py-1 rounded text-sm font-mono">
                    {children}
                  </code>
                ),
                pre: ({ children }) => (
                  <pre className="bg-black/40 border border-white/10 rounded-[2px] p-4 overflow-x-auto mb-6">
                    {children}
                  </pre>
                ),
                a: ({ href, children }) => (
                  <a href={href} className="text-[#D4AF37] hover:underline">
                    {children}
                  </a>
                ),
              }}
            >
              {article.content}
            </ReactMarkdown>
          </div>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-white/5">
            <div className="flex items-center gap-3 flex-wrap">
              <Tag className="w-4 h-4 text-white/40" />
              {article.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white/5 border border-white/10 rounded-[2px] text-xs text-white/60 font-light"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 p-8 bg-gradient-to-br from-[#D4AF37]/10 to-[#4A9EFF]/10 border border-[#D4AF37]/20 rounded-[2px]">
            <h3 className="text-2xl font-light text-white mb-4">
              Besoin d'un expert pour votre projet ?
            </h3>
            <p className="text-white/60 mb-6 font-light">
              Consultant PMO indépendant • Expert Power BI • Spécialiste IA appliquée à la gouvernance
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] text-white rounded-[2px] text-sm font-medium hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] transition-all duration-500 tracking-[0.1em] uppercase"
            >
              Réserver une consultation
            </Link>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="bg-black text-white py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs text-white/40 font-light tracking-[0.1em]">
            © 2026 Powalyze. Une précision suisse, une exécution française, un impact immédiat.
          </p>
        </div>
      </footer>
    </div>
  );
}
