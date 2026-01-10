
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const PrivacyPolicy = () => {
  return (
    <div className="bg-[#0F0F0F] min-h-screen text-slate-300">
      <SEO title="Privacy Policy | Powalyze" />
      <Header />
      <main className="pt-32 pb-20 container mx-auto max-w-4xl px-4">
        <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
        <div className="space-y-6">
          <section>
             <h2 className="text-2xl font-bold text-white mb-4">1. Data Collection</h2>
             <p>We collect data necessary to provide our services, including account info and usage data.</p>
          </section>
          <section>
             <h2 className="text-2xl font-bold text-white mb-4">2. Data Usage</h2>
             <p>Your data is used to improve our services, provide support, and communicate with you.</p>
          </section>
          <section>
             <h2 className="text-2xl font-bold text-white mb-4">3. Data Protection (GDPR & nFADP)</h2>
             <p>We implement strict security measures compliant with GDPR and Swiss nFADP.</p>
          </section>
          <section>
             <h2 className="text-2xl font-bold text-white mb-4">4. Your Rights</h2>
             <p>You have the right to access, rectify, or delete your personal data.</p>
          </section>
           <section>
             <h2 className="text-2xl font-bold text-white mb-4">5. Cookies</h2>
             <p>We use essential cookies to ensure the platform functions correctly.</p>
          </section>
          <p className="text-sm text-slate-500 mt-8">Last updated: January 2026</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
