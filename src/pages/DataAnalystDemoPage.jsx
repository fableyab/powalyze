import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import DataAnalystDemo from '@/pages/dashboard/DataAnalystDemo'; // Reuse the component
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';

const DataAnalystDemoPage = () => {
  return (
    <>
      <SEO 
        title="Data Analyst Workspace Demo" 
        description="Experience our powerful DAX editor, data transformation tools, and modeling capabilities." 
      />
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col">
        <Navbar />
        
        <main className="flex-grow pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto">
             <div className="text-center mb-12">
                <span className="text-[#BFA76A] font-bold uppercase tracking-[0.2em] mb-4 block text-xs">
                   For Data Professionals
                </span>
                <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                   Analyst Workspace
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto">
                   Test our proprietary data transformation engine and DAX formula builder.
                </p>
             </div>

             {/* The Workspace Component */}
             <div className="mb-12 border border-white/10 rounded-xl overflow-hidden bg-[#111] p-6">
                <DataAnalystDemo />
             </div>

             {/* CTA */}
             <div className="max-w-4xl mx-auto text-center bg-[#1C1C1C] p-10 rounded-2xl border border-[#333]">
                <Lock size={48} className="text-[#BFA76A] mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-white mb-4">Need to save your models?</h2>
                <p className="text-gray-400 mb-8">
                   The public demo resets on refresh. Create a free account to save your DAX formulas, 
                   upload datasets up to 1GB, and share reports with your team.
                </p>
                <div className="flex justify-center gap-4">
                   <Link to="/signup">
                      <Button className="bg-[#BFA76A] text-black hover:bg-white font-bold px-8">
                         Create Free Account
                      </Button>
                   </Link>
                   <Link to="/pricing">
                      <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                         View Enterprise Features
                      </Button>
                   </Link>
                </div>
             </div>

          </div>
        </main>
        
        <FooterSection />
      </div>
    </>
  );
};

export default DataAnalystDemoPage;