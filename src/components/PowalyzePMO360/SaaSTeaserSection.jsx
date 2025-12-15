import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Database, Code, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SaaSTeaserSection = () => {
  return (
    <div className="bg-[#111] border border-white/10 rounded-xl p-8 lg:p-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#3A7BFF]/10 to-transparent pointer-events-none" />
      
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
         <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#BFA76A]/10 border border-[#BFA76A]/20 text-[#BFA76A] text-xs font-bold uppercase tracking-wider mb-6">
               Powalyze Technology
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
               Enterprise-Grade Embedding
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
               This demo isn't just a UI mockup. It represents our <strong>App-Owns-Data</strong> architecture. 
               We securely embed Power BI analytics directly into your custom portal, handling authentication, 
               row-level security, and multi-tenancy automatically.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
               {[
                 { icon: Lock, title: "Row-Level Security", desc: "Data isolation per client" },
                 { icon: Database, title: "Direct Query", desc: "Live connection to SQL/SAP" },
                 { icon: Code, title: "React Integration", desc: "Seamless bi-directional comms" },
                 { icon: Shield, title: "Azure AD", desc: "Enterprise identity management" }
               ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                     <div className="mt-1 p-2 bg-[#1A1A1A] rounded text-[#BFA76A] h-fit border border-white/5">
                        <item.icon size={18} />
                     </div>
                     <div>
                        <h4 className="font-bold text-white text-sm">{item.title}</h4>
                        <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                     </div>
                  </div>
               ))}
            </div>
            
            <Button className="bg-[#BFA76A] text-black hover:bg-white font-bold px-8">
               Schedule Architecture Review
            </Button>
         </div>
         
         <div className="relative">
            {/* Visual Representation of Architecture */}
            <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-6 relative">
               <div className="absolute -inset-1 bg-gradient-to-r from-[#BFA76A] to-[#3A7BFF] opacity-20 blur rounded-xl"></div>
               <div className="relative bg-[#0A0A0A] rounded-lg p-6 space-y-4">
                  <div className="flex justify-between items-center text-xs text-gray-500 uppercase font-bold tracking-widest mb-4">
                     <span>Frontend (React)</span>
                     <span>Backend (Node.js)</span>
                     <span>Power BI Service</span>
                  </div>
                  
                  <div className="flex justify-between items-center gap-2">
                     <div className="w-24 h-12 bg-[#1A1A1A] border border-white/10 rounded flex items-center justify-center text-white text-xs font-bold">User Action</div>
                     <div className="h-0.5 flex-1 bg-gradient-to-r from-gray-700 to-gray-700 dashed"></div>
                     <div className="w-24 h-12 bg-[#1A1A1A] border border-[#BFA76A]/50 rounded flex items-center justify-center text-[#BFA76A] text-xs font-bold">Gen Token</div>
                     <div className="h-0.5 flex-1 bg-gradient-to-r from-gray-700 to-gray-700 dashed"></div>
                     <div className="w-24 h-12 bg-[#1A1A1A] border border-[#3A7BFF]/50 rounded flex items-center justify-center text-[#3A7BFF] text-xs font-bold">Embed Report</div>
                  </div>
                  
                  <div className="bg-[#111] mt-6 p-4 rounded border border-white/5 font-mono text-[10px] text-gray-400">
                     <span className="text-purple-400">const</span> config = &#123;<br/>
                     &nbsp;&nbsp;type: <span className="text-green-400">'report'</span>,<br/>
                     &nbsp;&nbsp;tokenType: <span className="text-blue-400">models.TokenType.Embed</span>,<br/>
                     &nbsp;&nbsp;accessToken: <span className="text-orange-400">token</span>,<br/>
                     &nbsp;&nbsp;embedUrl: <span className="text-orange-400">embedUrl</span><br/>
                     &#125;;
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default SaaSTeaserSection;