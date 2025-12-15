import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const BlogPostReader = () => {
  const { slug } = useParams();

  // Mock content - normally fetched via slug
  const title = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans">
      <Navbar />
      
      <main className="pt-32 pb-20 container mx-auto px-6 max-w-3xl">
         <Link to="/blog">
            <Button variant="ghost" className="mb-8 text-gray-400 hover:text-white pl-0">
               <ArrowLeft size={16} className="mr-2"/> Retour au Blog
            </Button>
         </Link>

         <article className="prose prose-invert lg:prose-xl max-w-none">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">{title}</h1>
            <div className="flex gap-4 text-sm text-gray-500 mb-10 border-b border-white/10 pb-6">
               <span>Par L'Équipe Powalyze</span>
               <span>•</span>
               <span>12 Oct 2025</span>
            </div>
            
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
               Ceci est un article de démonstration. Dans une version finale, le contenu serait chargé dynamiquement depuis un CMS ou un fichier markdown basé sur le slug : <span className="text-[#BFA76A] font-mono">{slug}</span>.
            </p>
            
            <h2 className="text-2xl font-bold text-white mt-12 mb-4">Pourquoi c'est important ?</h2>
            <p className="text-gray-400 mb-6">
               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>

            <div className="bg-[#111] border border-[#BFA76A]/20 p-8 rounded-xl my-10">
               <h3 className="text-xl font-bold text-[#BFA76A] mb-4">Besoin d'aide sur ce sujet ?</h3>
               <p className="text-gray-300 mb-6">Nos consultants sont experts dans ce domaine. Contactez-nous pour une étude personnalisée.</p>
               <Link to="/contact">
                  <Button className="bg-[#BFA76A] text-black hover:bg-white font-bold">Contactez-nous</Button>
               </Link>
            </div>
         </article>
      </main>

      <FooterSection />
    </div>
  );
};

export default BlogPostReader;