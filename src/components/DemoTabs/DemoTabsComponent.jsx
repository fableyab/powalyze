import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectTrackingDetailTab from './ProjectTrackingDetailTab';
import FinancialOverviewTab from './FinancialOverviewTab';
import SalesPerformanceTab from './SalesPerformanceTab';
import DemoPMOReportTab from './DemoPMOReportTab';

const DemoTabsComponent = () => {
  return (
    <div className="w-full min-h-screen bg-[#0A0A0A] p-6">
      <Tabs defaultValue="project-tracking" className="w-full space-y-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">Demo Dashboard Suite</h2>
          <TabsList className="bg-[#1A1A1A] border border-white/10">
            <TabsTrigger value="project-tracking" className="data-[state=active]:bg-[#BFA76A] data-[state=active]:text-black">
              Project Tracking Detail
            </TabsTrigger>
            <TabsTrigger value="financial-overview" className="data-[state=active]:bg-[#BFA76A] data-[state=active]:text-black">
              Financial Overview
            </TabsTrigger>
            <TabsTrigger value="sales-performance" className="data-[state=active]:bg-[#BFA76A] data-[state=active]:text-black">
              Sales Performance
            </TabsTrigger>
            <TabsTrigger value="demo-pmo" className="data-[state=active]:bg-[#BFA76A] data-[state=active]:text-black">
              Demo PMO Report
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="project-tracking" className="mt-0 focus-visible:outline-none">
          <div className="bg-[#111] border border-white/10 rounded-xl p-6 min-h-[600px]">
            <ProjectTrackingDetailTab />
          </div>
        </TabsContent>

        <TabsContent value="financial-overview" className="mt-0 focus-visible:outline-none">
          <div className="bg-[#111] border border-white/10 rounded-xl p-6 min-h-[600px]">
            <FinancialOverviewTab />
          </div>
        </TabsContent>

        <TabsContent value="sales-performance" className="mt-0 focus-visible:outline-none">
          <div className="bg-[#111] border border-white/10 rounded-xl p-6 min-h-[600px]">
            <SalesPerformanceTab />
          </div>
        </TabsContent>

        <TabsContent value="demo-pmo" className="mt-0 focus-visible:outline-none">
          <div className="bg-[#111] border border-white/10 rounded-xl p-6 min-h-[600px]">
            <DemoPMOReportTab />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DemoTabsComponent;