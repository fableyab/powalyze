
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import CaseStudiesComponent from '@/components/CaseStudies'; // Reusing the component created earlier
import { useLanguage } from '@/contexts/LanguageContext';

const CaseStudiesPage = () => {
    const { language } = useLanguage();
    
    return (
        <div className="bg-[#0F0F0F] min-h-screen">
            <SEO title="Case Studies | Powalyze" />
            <Header />
            <main className="pt-20">
                <div className="py-20 px-4 text-center">
                    <h1 className="text-5xl font-bold text-white mb-6 font-[Cinzel]">Success Stories</h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Real results delivered for Switzerland's leading institutions.
                    </p>
                </div>
                <CaseStudiesComponent language={language} />
            </main>
            <Footer />
        </div>
    );
};

export default CaseStudiesPage;
