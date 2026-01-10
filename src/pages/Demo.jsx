
import React, { useState } from 'react';
import SEO from '@/components/SEO';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PowerBIEmbed from '@/components/PowerBIEmbed';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { ShieldCheck, Zap, Lock, Globe } from 'lucide-react';

const Demo = () => {
  const [users, setUsers] = useState(10);
  
  const calculatePrice = (u) => {
      if (u <= 5) return "2,500";
      if (u <= 20) return "5,000";
      return "Custom";
  };

  return (
    <div className="bg-[#0F0F0F] min-h-screen">
      <SEO title="Platform Demo | Powalyze" />
      <Header />
      
      <main className="pt-32 pb-20 container mx-auto px-4">
        {/* Hero */}
        <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-[Cinzel]">Interactive Platform Demo</h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">
                Experience the power of our embedded analytics engine. This demo simulates a secure, multi-tenant environment.
            </p>
            <Button className="bg-[#D4A574] hover:bg-[#B58554] text-black font-bold h-12 px-8">Book Personalized Demo</Button>
        </div>

        {/* Live Dashboard */}
        <div className="max-w-6xl mx-auto mb-24">
            <PowerBIEmbed reportId="demo-report-001" />
        </div>

        {/* Security Features */}
        <div className="grid md:grid-cols-4 gap-8 mb-24 max-w-6xl mx-auto">
             <Feature icon={Lock} title="End-to-End Encryption" desc="AES-256 encryption for data at rest and in transit." />
             <Feature icon={ShieldCheck} title="SOC 2 Type II" desc="Audited security controls and processes." />
             <Feature icon={Globe} title="Swiss Residency" desc="Data never leaves Switzerland (Zurich/Geneva)." />
             <Feature icon={Zap} title="99.9% Uptime" desc="Enterprise-grade SLA with redundancy." />
        </div>

        {/* Interactive Pricing Calculator */}
        <div className="max-w-4xl mx-auto bg-[#141414] rounded-2xl border border-slate-800 p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-8">Estimate Your Investment</h2>
            
            <div className="mb-12 max-w-lg mx-auto">
                <div className="flex justify-between text-slate-400 mb-6 text-sm font-medium">
                    <span>5 Users</span>
                    <span>100+ Users</span>
                </div>
                
                <Slider
                    defaultValue={[users]}
                    max={100}
                    min={5}
                    step={1}
                    onValueChange={(vals) => setUsers(vals[0])}
                    className="w-full py-4"
                />
                
                <div className="mt-6 text-[#D4A574] font-bold text-xl">{users} Users</div>
            </div>

            <div className="bg-[#0F0F0F] p-8 rounded-xl border border-slate-800 inline-block min-w-[300px]">
                <div className="text-slate-500 text-sm uppercase font-bold mb-2">Estimated Monthly Cost</div>
                <div className="text-4xl font-bold text-white">
                    {calculatePrice(users) === "Custom" ? "Contact Us" : `CHF ${calculatePrice(users)}`}
                </div>
                <div className="text-slate-500 text-xs mt-2">Billed Annually</div>
            </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const Feature = ({ icon: Icon, title, desc }) => (
    <div className="text-center p-6 bg-[#141414] rounded-xl border border-slate-800">
        <Icon className="w-8 h-8 text-[#D4A574] mx-auto mb-4" />
        <h3 className="text-white font-bold mb-2">{title}</h3>
        <p className="text-slate-400 text-sm">{desc}</p>
    </div>
);

export default Demo;
