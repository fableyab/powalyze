import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/landing/Navbar';
import SEO from '@/components/SEO';
import FooterSection from '@/components/landing/FooterSection';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Loader2, Download, Briefcase, TrendingUp, PieChart, LayoutDashboard, ArrowLeft } from 'lucide-react';
import { sampleDataService } from '@/services/powerbi/sampleDataService';
import { completeDataGenerator } from '@/data/completeDataGenerator';
import { Link } from 'react-router-dom';

// Tabs
import ProjectTrackingDetailTab from '@/components/DemoTabs/ProjectTrackingDetailTab';
import FinancialOverviewTab from '@/components/DemoTabs/FinancialOverviewTab';
import SalesPerformanceTab from '@/components/DemoTabs/SalesPerformanceTab';
import DemoPMOReportTab from '@/components/DemoTabs/DemoPMOReportTab';

const PMOExecutiveDashboardDemoPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('tracking');

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      const tracking = sampleDataService.generateProjectTrackingData();
      const financial = sampleDataService.generateFinancialData();
      const sales = sampleDataService.generateSalesData();
      const pmo = sampleDataService.generatePMOData();
      
      setData({ tracking, financial, sales, pmo });
      setLoading(false);
    }, 1500);
  }, []);

  const handleDownloadData = () => {
    completeDataGenerator.generateCompleteExcelData();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col">
        <Navbar />
        <SEO 
          title="PMO 360 Demo | Powalyze"
          description="Explorez un tableau de bord exécutif PMO complet: suivi des projets, analyse financière et performance commerciale avec des données d'exemple."
        />
        <div className="flex-grow flex items-center justify-center">
          <Loader2 className="w-12 h-12 text-[#BFA76A] animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Navbar />
      <SEO 
        title="PMO 360 Demo | Powalyze"
        description="Comprehensive portfolio management demo: track projects, analyze financials, and monitor sales performance in real-time."
        keywords="PMO, Executive Dashboard, Portfolio Management, Financial Analytics, Sales Performance, Powalyze"
      />
      
      <main className="pt-28 pb-20 container mx-auto px-6">
        <div className="mb-4">
           <Link to="/powerbi-advanced" className="text-gray-400 hover:text-white flex items-center gap-2 text-sm"><ArrowLeft size={14}/> Back to Solutions</Link>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-4xl font-display font-bold text-white mb-2">
              PMO <span className="text-[#BFA76A]">Executive Dashboard</span>
            </h1>
            <p className="text-gray-400 max-w-2xl">
              Comprehensive portfolio management solution. Track projects, analyze financials, and monitor risks in real-time.
            </p>
          </motion.div>
          
          <div className="flex gap-3">
            <Button variant="outline" className="border-white/10 text-white hover:bg-white/5" onClick={handleDownloadData}>
              <Download size={16} className="mr-2" /> Download Sample Data
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <Tabs defaultValue="tracking" className="w-full" onValueChange={setActiveTab}>
          <div className="mb-8 overflow-x-auto pb-2">
            <TabsList className="bg-[#111] border border-white/10 p-1 w-full justify-start md:w-auto h-auto rounded-xl">
              <TabsTrigger value="tracking" className="data-[state=active]:bg-[#BFA76A] data-[state=active]:text-black px-6 py-2 rounded-lg gap-2">
                <Briefcase size={16} /> Project Tracking
              </TabsTrigger>
              <TabsTrigger value="financial" className="data-[state=active]:bg-[#BFA76A] data-[state=active]:text-black px-6 py-2 rounded-lg gap-2">
                <TrendingUp size={16} /> Financial Overview
              </TabsTrigger>
              <TabsTrigger value="sales" className="data-[state=active]:bg-[#BFA76A] data-[state=active]:text-black px-6 py-2 rounded-lg gap-2">
                <PieChart size={16} /> Sales Performance
              </TabsTrigger>
              <TabsTrigger value="report" className="data-[state=active]:bg-[#BFA76A] data-[state=active]:text-black px-6 py-2 rounded-lg gap-2">
                <LayoutDashboard size={16} /> PMO Report
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="tracking">
            <ProjectTrackingDetailTab data={data.tracking} />
          </TabsContent>
          
          <TabsContent value="financial">
            <FinancialOverviewTab data={data.financial} />
          </TabsContent>
          
          <TabsContent value="sales">
            <SalesPerformanceTab data={data.sales} />
          </TabsContent>
          
          <TabsContent value="report">
            <DemoPMOReportTab data={data.pmo} />
          </TabsContent>
        </Tabs>

      </main>
      <FooterSection />
    </div>
  );
};

export default PMOExecutiveDashboardDemoPage;