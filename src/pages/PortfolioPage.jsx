import React from 'react';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { portfolioData } from '@/lib/portfolioData';

const PortfolioPage = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <SEO title="Portfolio - Nos Réalisations | Powalyze" description="Découvrez comment Powalyze transforme les organisations grâce au PMO, à la Data et à la Gouvernance." />
      <Navbar />

      <main className="pt-40 pb-20 px-6 container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="text-[#BFA76A] text-sm font-bold uppercase tracking-[0.2em] mb-4 block">
              Portfolio
            </span>
            <h1 className="text-5xl font-display text-white mb-4">Nos Réalisations</h1>
            <p className="text-gray-400 max-w-xl">
              Des cas concrets de transformation, d'optimisation et de succès mesurables.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.values(portfolioData).map((project, index) => (
            <Link to={`/portfolio/case-study-${project.id}`} key={project.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-[#111] border border-white/10 rounded-xl overflow-hidden hover:border-[#BFA76A]/50 transition-all duration-500 h-full flex flex-col"
              >
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all z-10" />
                  <img src={project.heroImage} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 z-20 bg-black/70 backdrop-blur-md px-3 py-1 rounded text-xs text-[#BFA76A] uppercase font-bold tracking-wider">
                    {project.industry}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#BFA76A] transition-colors">{project.title}</h3>
                  <p className="text-sm text-gray-500 mb-4 font-mono">{project.client}</p>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                    {project.challenge}
                  </p>
                  <div className="mt-auto flex items-center text-[#BFA76A] text-sm font-bold uppercase tracking-wider group-hover:gap-2 transition-all">
                    Voir l'étude <ArrowRight size={16} className="ml-2" />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </main>

      <FooterSection />
    </div>
  );
};

export default PortfolioPage;