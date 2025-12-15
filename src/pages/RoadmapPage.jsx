import React, { useState } from 'react';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import SEO from '@/components/SEO';
import RoadmapTimeline from '@/components/Roadmap/RoadmapTimeline';
import TierCard from '@/components/Roadmap/TierCard';
import FeatureList from '@/components/Roadmap/FeatureList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const RoadmapPage = () => {
  const [activeTier, setActiveTier] = useState("tier1");

  const tierData = {
    tier1: {
      title: "Tier 1: Integrated Demo",
      subtitle: "Secure Iframe",
      status: "completed",
      description: "Immediate implementation of Power BI reports using secure iframe embedding for quick proof-of-concept and client demonstrations.",
      features: [
        "Secure Iframe Embedding",
        "Static Token Authentication",
        "Basic Interactive Reports",
        "Mobile Responsive Layout"
      ],
      detailedFeatures: [
        { type: 'frontend', title: "DemoReportIframe Component", desc: "React component for secure report rendering.", tags: ["React", "Iframe"] },
        { type: 'data', title: "Demo Dataset", desc: "Static dataset for demonstration purposes.", tags: ["Power BI", "PBIX"] },
        { type: 'security', title: "Workspace Security", desc: "Access control via Power BI Workspace roles.", tags: ["RLS None"] }
      ]
    },
    tier2: {
      title: "Tier 2: Prototype MVP",
      subtitle: "App-Owns-Data",
      status: "active",
      description: "Transition to 'App-Owns-Data' model using a dedicated backend service to generate embed tokens, removing the need for user Pro licenses.",
      features: [
        "Service Principal Auth",
        "Embed Token Generation",
        "Backend API (Node.js)",
        "No User License Required"
      ],
      detailedFeatures: [
        { type: 'backend', title: "Node.js Token Service", desc: "Express API to communicate with Power BI Rest API.", tags: ["Node.js", "REST"] },
        { type: 'security', title: "Service Principal", desc: "Azure AD App Registration for server-to-server auth.", tags: ["Azure AD"] },
        { type: 'frontend', title: "PowerBI Client React", desc: "Native SDK integration for full interactivity.", tags: ["SDK"] }
      ]
    },
    tier3: {
      title: "Tier 3: Multi-Tenant",
      subtitle: "Logical RLS",
      status: "pending",
      description: "Implementation of Row-Level Security (RLS) to support multiple clients on a single infrastructure, ensuring data isolation.",
      features: [
        "Row-Level Security (RLS)",
        "Dynamic Token Generation",
        "Multi-Tenant Database",
        "Client Management"
      ],
      detailedFeatures: [
        { type: 'data', title: "RLS Policies", desc: "DAX rules to filter data by ClientID.", tags: ["DAX", "Security"] },
        { type: 'backend', title: "Identity Mapping", desc: "Mapping app users to RLS roles dynamically.", tags: ["Logic"] },
        { type: 'data', title: "Unified Schema", desc: "Single dataset serving multiple tenants.", tags: ["SQL", "Modeling"] }
      ]
    },
    tier4: {
      title: "Tier 4: Industrial SaaS",
      subtitle: "Production Scale",
      status: "pending",
      description: "Full production rollout with Azure AD B2C identity management and dedicated Power BI Embedded capacities for scaling.",
      features: [
        "Azure AD B2C Identity",
        "Dedicated Capacity (F-SKU)",
        "Automated Onboarding",
        "Performance Monitoring"
      ],
      detailedFeatures: [
        { type: 'security', title: "Azure AD B2C", desc: "Consumer identity management and sign-up flows.", tags: ["Identity"] },
        { type: 'backend', title: "Capacity Management", desc: "Auto-scaling and cost optimization logic.", tags: ["Azure"] },
        { type: 'frontend', title: "White Label Portal", desc: "Fully branded experience at portal.powalyze.ch.", tags: ["Production"] }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col">
      <SEO title="Technical Roadmap" description="4-Tier Strategy for Power BI Embedded Integration." />
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20 container mx-auto px-6">
         <div className="text-center mb-16 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
               Roadmap <span className="text-[#BFA76A]">Technique</span>
            </h1>
            <p className="text-xl text-gray-400">
               A strategic 4-tier approach to transforming Powalyze from a demonstration to a scalable, multi-tenant SaaS platform.
            </p>
         </div>

         {/* Visual Timeline */}
         <div className="mb-20">
            <RoadmapTimeline />
         </div>

         {/* Detailed Tier View */}
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Sidebar Navigation */}
            <div className="lg:col-span-4">
               <h3 className="text-2xl font-bold text-white mb-6">Implementation Stages</h3>
               <div className="space-y-4">
                  {Object.entries(tierData).map(([key, data]) => (
                     <div 
                        key={key} 
                        onClick={() => setActiveTier(key)}
                        className={`cursor-pointer transition-all duration-300 ${activeTier === key ? 'transform translate-x-2' : ''}`}
                     >
                        <TierCard tier={data} onClick={() => setActiveTier(key)} />
                     </div>
                  ))}
               </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-8">
               <div className="bg-[#111] border border-white/10 rounded-2xl p-8 h-full">
                  <div className="flex items-center gap-4 mb-6">
                     <div className="w-12 h-12 rounded-xl bg-[#BFA76A]/20 flex items-center justify-center text-[#BFA76A] font-bold text-xl">
                        {activeTier.replace('tier', 'T')}
                     </div>
                     <div>
                        <h2 className="text-3xl font-bold text-white">{tierData[activeTier].title}</h2>
                        <p className="text-[#BFA76A]">{tierData[activeTier].subtitle}</p>
                     </div>
                  </div>

                  <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                     {tierData[activeTier].description}
                  </p>

                  <Tabs defaultValue="features" className="w-full">
                     <TabsList className="bg-[#1A1A1A] border border-white/10 mb-6">
                        <TabsTrigger value="features">Key Features</TabsTrigger>
                        <TabsTrigger value="technical">Technical Specs</TabsTrigger>
                        <TabsTrigger value="docs">Documentation</TabsTrigger>
                     </TabsList>
                     
                     <TabsContent value="features" className="mt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           {tierData[activeTier].features.map((f, i) => (
                              <div key={i} className="flex items-center gap-3 p-4 bg-[#1A1A1A] rounded-lg border border-white/5">
                                 <div className="w-2 h-2 rounded-full bg-[#BFA76A]" />
                                 <span className="text-gray-200">{f}</span>
                              </div>
                           ))}
                        </div>
                     </TabsContent>

                     <TabsContent value="technical" className="mt-0">
                        <FeatureList features={tierData[activeTier].detailedFeatures} />
                     </TabsContent>

                     <TabsContent value="docs" className="mt-0">
                        <div className="p-6 bg-[#1A1A1A] rounded-lg border border-white/5 text-center">
                           <p className="text-gray-400 mb-4">Detailed implementation guides are available in the project documentation.</p>
                           <div className="inline-block px-4 py-2 bg-black rounded font-mono text-sm text-[#BFA76A] border border-white/10">
                              src/docs/{activeTier.toUpperCase()}_IMPLEMENTATION.md
                           </div>
                        </div>
                     </TabsContent>
                  </Tabs>
               </div>
            </div>
         </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default RoadmapPage;