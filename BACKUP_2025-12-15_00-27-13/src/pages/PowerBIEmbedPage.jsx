import React from 'react';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import PowerBIEmbedContainer from '@/components/PowerBIEmbed/PowerBIEmbedContainer';
import BackButton from '@/components/Navigation/BackButton';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

const PowerBIEmbedPage = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Navbar />
      <main className="pt-32 pb-20 container mx-auto px-6">
         <div className="flex flex-col gap-4 mb-8">
            <Breadcrumbs items={[{ label: 'Dashboard', path: '/dashboard' }, { label: 'Report', path: null }]} />
            <BackButton to="/dashboard" />
         </div>
         
         <PowerBIEmbedContainer 
            reportKey="executive_pmo" 
            title="Executive PMO Report" 
            height="800px" 
            showFilters={true} 
         />
      </main>
      <FooterSection />
    </div>
  );
};

export default PowerBIEmbedPage;