import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import SEO from '@/components/SEO';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import { blogArticles } from '@/lib/blogData';
import { ArrowLeft, Clock, Share2, User, Calendar, Linkedin, Twitter, Facebook, MessageSquare, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

const BlogPost = () => {
  const { slug } = useParams();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Find article
  const article = blogArticles.find(a => a.slug === slug);

  // Comment state
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loadingComments, setLoadingComments] = useState(true);

  useEffect(() => {
    if (!article) {
       // navigate('/blog'); 
    }
    window.scrollTo(0, 0);

    if (article && isSupabaseConfigured()) {
      fetchComments();
    } else {
      setLoadingComments(false);
      // Mock comments if no backend
      setComments([
        { id: 1, author_name: "Pierre Dubois", content: "Excellent article, très pertinent pour le marché suisse !", created_at: new Date().toISOString() }
      ]);
    }
  }, [slug, article, navigate]);

  const fetchComments = async () => {
    const { data } = await supabase
      .from('blog_comments')
      .select('*')
      .eq('post_slug', slug)
      .order('created_at', { ascending: false });
    if (data) setComments(data);
    setLoadingComments(false);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    if (isSupabaseConfigured()) {
       if (!user) return alert("Veuillez vous connecter pour commenter.");
       
       const { error } = await supabase.from('blog_comments').insert([{
         post_slug: slug,
         user_id: user.id,
         author_name: user.name || "Utilisateur",
         content: newComment
       }]);

       if (!error) {
         setNewComment("");
         fetchComments();
       }
    } else {
       // Local Mock
       setComments(prev => [{
         id: Date.now(), 
         author_name: user?.name || "Invité", 
         content: newComment, 
         created_at: new Date().toISOString() 
       }, ...prev]);
       setNewComment("");
    }
  };

  if (!article) return <div className="min-h-screen bg-[#0A0A0A]" />;

  const localized = article.translations[language] || article.translations['fr'];

  // Breadcrumbs for SEO
  const breadcrumbs = [
    { name: 'Blog', path: '/blog' },
    { name: localized.title, path: `/blog/${slug}` }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <SEO 
        title={localized.title} 
        description={localized.description}
        image={article.image}
        type="article"
        breadcrumbs={breadcrumbs}
      />
      <Navbar />

      <article className="pt-32 pb-20">
        {/* Header */}
        <div className="max-w-4xl mx-auto px-6 mb-12">
           <Link to="/blog" className="inline-flex items-center gap-2 text-[#666] hover:text-[#BFA76A] transition-colors text-sm uppercase tracking-wider font-medium mb-8">
             <ArrowLeft size={16} /> {t('blog.backToBlog')}
           </Link>
           
           <div className="flex flex-wrap gap-4 mb-6">
              <span className="bg-[#BFA76A]/10 text-[#BFA76A] border border-[#BFA76A]/20 px-3 py-1 text-xs font-bold uppercase rounded-sm">
                {article.category}
              </span>
              {article.tags?.map(tag => (
                <span key={tag} className="bg-[#222] text-[#888] px-3 py-1 text-xs font-medium rounded-sm">
                  #{tag}
                </span>
              ))}
           </div>

           <h1 className="text-3xl md:text-5xl font-light leading-tight mb-6 text-white">
             {localized.title}
           </h1>

           <div className="flex items-center gap-6 text-sm text-[#888] border-b border-[#222] pb-8">
              <div className="flex items-center gap-2">
                 <User size={16} />
                 <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                 <Calendar size={16} />
                 <span>{new Date(article.date).toLocaleDateString(language === 'en' ? 'en-US' : 'fr-FR')}</span>
              </div>
              <div className="flex items-center gap-2">
                 <Clock size={16} />
                 <span>{article.readingTime} {t('blog.readTime')}</span>
              </div>
           </div>
        </div>

        {/* Featured Image */}
        <div className="max-w-6xl mx-auto px-6 mb-16">
          <div className="aspect-[21/9] overflow-hidden rounded-sm relative group">
            <img 
              src={article.image} 
              alt={localized.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent opacity-60" />
          </div>
        </div>

        {/* Content Body */}
        <div className="max-w-3xl mx-auto px-6">
           <div 
             className="prose prose-invert prose-lg prose-headings:font-light prose-headings:text-white prose-p:text-[#C8C8C8] prose-p:leading-relaxed prose-a:text-[#BFA76A] prose-strong:text-white max-w-none"
             dangerouslySetInnerHTML={{ __html: localized.content }} 
           />
           
           {/* Author Bio */}
           <div className="mt-16 p-8 bg-[#111] border border-[#222] rounded-lg flex gap-6 items-center">
              <div className="w-16 h-16 bg-[#333] rounded-full flex items-center justify-center text-2xl text-[#BFA76A]">
                 {article.author.charAt(0)}
              </div>
              <div>
                 <h4 className="text-white font-bold mb-2">À propos de l'auteur</h4>
                 <p className="text-gray-400 text-sm">{article.author} est un expert chez Powalyze, spécialisé dans la transformation des organisations complexes.</p>
              </div>
           </div>

           {/* Comments Section */}
           <div className="mt-16 pt-8 border-t border-[#222]">
              <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                 <MessageSquare className="text-[#BFA76A]" /> Commentaires ({comments.length})
              </h3>

              {user ? (
                 <form onSubmit={handleCommentSubmit} className="mb-10">
                    <textarea 
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Votre avis nous intéresse..."
                      className="w-full bg-[#111] border border-[#333] rounded p-4 text-white focus:border-[#BFA76A] focus:outline-none mb-4 min-h-[100px]"
                    />
                    <Button type="submit" className="bg-[#BFA76A] text-black font-bold">Publier <Send size={16} className="ml-2" /></Button>
                 </form>
              ) : (
                 <div className="bg-[#111] p-6 text-center rounded mb-10">
                    <p className="text-gray-400 mb-4">Connectez-vous pour participer à la discussion.</p>
                    <Link to="/login"><Button variant="outline">Se connecter</Button></Link>
                 </div>
              )}

              <div className="space-y-6">
                 {comments.map(comment => (
                    <div key={comment.id} className="bg-[#0F0F0F] p-4 rounded border-l-2 border-[#BFA76A]">
                       <div className="flex justify-between items-start mb-2">
                          <span className="font-bold text-white text-sm">{comment.author_name}</span>
                          <span className="text-xs text-gray-600">{new Date(comment.created_at).toLocaleDateString()}</span>
                       </div>
                       <p className="text-gray-300 text-sm">{comment.content}</p>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </article>

      <FooterSection />
    </div>
  );
};

export default BlogPost;