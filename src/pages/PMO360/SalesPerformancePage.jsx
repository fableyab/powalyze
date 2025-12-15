import React from 'react';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import SalesPerformanceTab from '@/components/DemoTabs/SalesPerformanceTab';
import { sampleDataService } from '@/services/powerbi/sampleDataService';
import { Button } from '@/components/ui/button';
import { Download, FileSpreadsheet, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const SalesPerformancePage = () => {
  const data = sampleDataService.generateSalesData();

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Navbar />
      <main className="pt-32 pb-20 container mx-auto px-6">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <Link to="/pmo-360-demo" className="text-gray-400 hover:text-white text-sm flex items-center gap-2 mb-2"><ArrowLeft size={14}/> Retour à PMO 360</Link>
            <h1 className="text-4xl font-display font-bold">Sales Performance</h1>
            <p className="text-gray-400 max-w-2xl mt-2">
              Analyse du pipeline commercial et impact sur le portefeuille projet.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-white/10 hover:bg-white/5"><FileSpreadsheet size={16} className="mr-2"/> Excel</Button>
            <Button className="bg-[#BFA76A] text-black hover:bg-white"><Download size={16} className="mr-2"/> Export PDF</Button>
          </div>
        </div>

        <div className="bg-[#111] border border-white/10 rounded-xl p-6">
          <SalesPerformanceTab data={data} />
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default SalesPerformancePage;