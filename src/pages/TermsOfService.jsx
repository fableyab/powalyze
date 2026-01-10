
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const TermsOfService = () => {
  return (
    <div className="bg-[#0F0F0F] min-h-screen text-slate-300">
      <SEO title="Terms of Service | Powalyze" />
      <Header />
      <main className="pt-32 pb-20 container mx-auto max-w-4xl px-4">
        <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
        <div className="space-y-6">
          <section>
             <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
             <p>By subscribing to our services, you accept these terms in full.</p>
          </section>
          <section>
             <h2 className="text-2xl font-bold text-white mb-4">2. Subscription & Payment</h2>
             <p>Fees are billed in advance. Refunds are not provided for partial months.</p>
          </section>
          <section>
             <h2 className="text-2xl font-bold text-white mb-4">3. Termination</h2>
             <p>You may terminate your account at any time. Data retention policies apply.</p>
          </section>
          <section>
             <h2 className="text-2xl font-bold text-white mb-4">4. SLA & Support</h2>
             <p>We guarantee 99.9% uptime for Enterprise plans.</p>
          </section>
          <p className="text-sm text-slate-500 mt-8">Last updated: January 2026</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
