import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { ArrowLeft, CheckCircle2, Target, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { portfolioData } from '@/lib/portfolioData';

const CaseStudyDetail = () => {
  const { id } = useParams();
  
  // Extract number from id slug like "case-study-1" -> 1
  const studyId = id ? parseInt(id.replace('case-study-', '')) : 1;
  const study = portfolioData[studyId];

  if (!study) {
    return <Navigate to="/portfolio" replace />;
  }

  const breadcrumbItems = [
    { label: 'Portfolio', path: '/portfolio' },
    { label: study.title, path: null }
  ];

  return (
    <div className="bg-[#050505] min-h-screen text-white">
      <Navbar />
      
      <main className="pt-32 pb-20 px-6 container mx-auto">
        <Breadcrumbs items={breadcrumbItems} />
        
        <Link to="/portfolio" className="inline-flex items-center text-[#BFA76A] mb-8 hover:underline text-sm">
           <ArrowLeft size={16} className="mr-2" /> Retour au portfolio
        </Link>

        {/* Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
             <div className="flex items-center gap-4 mb-6">
                <span className="bg-[#BFA76A]/10 text-[#BFA76A] px-3 py-1 text-xs font-bold uppercase tracking-wider rounded">{study.industry}</span>
                <span className="text-gray-500 text-sm flex items-center gap-1"><Clock size={14}/> {study.timeline}</span>
             </div>
             <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">{study.title}</h1>
             <p className="text-xl text-gray-400 font-light leading-relaxed border-l-2 border-[#BFA76A] pl-6">
                Client: {study.client}
             </p>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="rounded-xl overflow-hidden border border-white/10">
             <img src={study.heroImage} alt={study.title} className="w-full h-full object-cover" />
          </motion.div>
        </div>

        {/* Challenge & Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
           <div className="bg-[#111] p-8 rounded-xl border border-white/5">
              <div className="flex items-center gap-3 mb-4">
                 <div className="p-2 bg-red-500/10 rounded-lg text-red-500"><Target size={24} /></div>
                 <h2 className="text-2xl font-bold">Le Défi</h2>
              </div>
              <p className="text-gray-400 leading-relaxed">{study.challenge}</p>
           </div>
           
           <div className="bg-[#111] p-8 rounded-xl border border-white/5">
              <div className="flex items-center gap-3 mb-4">
                 <div className="p-2 bg-green-500/10 rounded-lg text-green-500"><CheckCircle2 size={24} /></div>
                 <h2 className="text-2xl font-bold">La Solution</h2>
              </div>
              <p className="text-gray-400 leading-relaxed">{study.solution}</p>
           </div>
        </div>

        {/* Results */}
        <div className="mb-24">
           <h2 className="text-3xl font-display text-center mb-12">Impact Mesurable</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {study.results.map((res, i) => (
                 <div key={i} className="text-center p-8 border border-white/10 rounded-xl bg-[#0A0A0A] hover:border-[#BFA76A]/50 transition-colors">
                    <div className="text-4xl md:text-5xl font-bold text-[#BFA76A] mb-2">{res.value}</div>
                    <div className="text-sm text-gray-400 uppercase tracking-widest">{res.label}</div>
                 </div>
              ))}
           </div>
        </div>

        {/* Team & Testimonial */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 border-t border-white/10 pt-20">
           <div className="lg:col-span-1">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Users size={20} className="text-[#BFA76A]"/> Équipe Projet</h3>
              <ul className="space-y-3">
                 {study.team.map((member, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-400">
                       <span className="w-1.5 h-1.5 bg-[#BFA76A] rounded-full"></span> {member}
                    </li>
                 ))}
              </ul>
           </div>
           
           <div className="lg:col-span-2 bg-[#1C1C1C] p-10 rounded-xl relative">
              <span className="text-6xl text-[#BFA76A]/20 absolute top-4 left-4 font-serif">"</span>
              <p className="text-xl text-white italic leading-relaxed mb-6 relative z-10">{study.testimonial}</p>
              <div className="font-bold text-[#BFA76A]">{study.author}</div>
           </div>
        </div>

        {/* CTA */}
        <div className="mt-24 text-center">
           <h2 className="text-3xl font-display mb-6">Prêt à obtenir les mêmes résultats ?</h2>
           <Link to="/contact">
              <Button className="bg-[#BFA76A] text-black hover:bg-[#D4AF37] px-8 py-6 text-lg">Discuter de votre projet</Button>
           </Link>
        </div>

      </main>

      <FooterSection />
    </div>
  );
};

export default CaseStudyDetail;