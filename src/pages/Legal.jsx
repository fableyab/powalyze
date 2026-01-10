
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const Legal = () => {
    return (
        <div className="bg-[#0F0F0F] min-h-screen text-slate-300">
            <SEO title="Legal | Powalyze" />
            <Header />
            <main className="pt-32 pb-20 container mx-auto max-w-4xl px-4">
                <h1 className="text-4xl font-bold text-white mb-8">Legal & Compliance</h1>
                
                <section className="mb-12 space-y-4">
                    <h2 className="text-2xl font-bold text-[#D4A574]">1. Data Privacy (GDPR & nFADP)</h2>
                    <p>Powalyze is fully compliant with the Swiss New Federal Act on Data Protection (nFADP) and the General Data Protection Regulation (GDPR).</p>
                    <p>All data is hosted in Tier-4 Data Centers located in Zürich and Geneva (Exoscale / Azure Switzerland).</p>
                </section>

                <section className="mb-12 space-y-4">
                    <h2 className="text-2xl font-bold text-[#D4A574]">2. Terms of Service</h2>
                    <p>By accessing the Powalyze OS platform, you agree to strict confidentiality regarding the strategic data hosted.</p>
                </section>

                <section className="mb-12 space-y-4">
                    <h2 className="text-2xl font-bold text-[#D4A574]">3. Data Retention</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Audit Logs: Retained for 10 years (Financial Regulation).</li>
                        <li>Project Artifacts: Retained for 5 years after project closure.</li>
                        <li>Personal Data: Deleted upon request (Right to be Forgotten).</li>
                    </ul>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Legal;
