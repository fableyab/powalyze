
import React from 'react';
import { ShieldCheck, Lock, Server, FileCheck } from 'lucide-react';

const TrustSection = () => {
  return (
    <section className="py-16 px-4 bg-[#111] border-y border-[#222]">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center text-center">
          <TrustBadge icon={ShieldCheck} title="ISO 27001" subtitle="Certified" />
          <TrustBadge icon={Lock} title="SOC 2 Type II" subtitle="Compliant" />
          <TrustBadge icon={FileCheck} title="FINMA" subtitle="Banking Standards" />
          <TrustBadge icon={Server} title="Swiss Hosting" subtitle="Zurich / Geneva" />
        </div>
      </div>
    </section>
  );
};

const TrustBadge = ({ icon: Icon, title, subtitle }) => (
  <div className="flex flex-col items-center gap-2 group cursor-default">
    <div className="p-3 bg-black border border-[#333] rounded-full text-slate-400 group-hover:text-[#4A9EFF] group-hover:border-[#4A9EFF] transition-all">
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <div className="text-white font-bold">{title}</div>
      <div className="text-xs text-slate-500 uppercase tracking-wider">{subtitle}</div>
    </div>
  </div>
);

export default TrustSection;
