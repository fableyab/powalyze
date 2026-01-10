import React, { useState } from 'react';
import SEO from '@/components/SEO';
import SidebarOS from '@/components/os/SidebarOS';
import CockpitHighTech from '@/components/cockpit/CockpitHighTech';
import PortfolioManagerHighTech from '@/components/portfolio/PortfolioManagerHighTech';
import CommitteeCenterHighTech from '@/components/committee/CommitteeCenterHighTech';
import DecisionHubHighTech from '@/components/decision/DecisionHubHighTech';
import RiskIntelligenceHighTech from '@/components/risk/RiskIntelligenceHighTech';

export default function AppModulesPage() {
  const [tab, setTab] = useState("cockpit");

  return (
    <>
      <SEO
        title="Powalyze OS - Executive Dashboard"
        description="Dashboard OS complet : Cockpit, Portefeuilles, Comités, Décisions, Risques"
      />

      <div className="relative flex min-h-screen text-white overflow-hidden">
        {/* HOLOGRAPHIC BACKGROUND */}
        <div className="absolute inset-0 holo-grid" />
        <div className="absolute inset-0 holo-noise pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/80" />

        {/* SIDEBAR */}
        <SidebarOS tab={tab} setTab={setTab} />

        {/* MAIN CONTENT */}
        <main className="relative z-10 flex-1 overflow-y-auto">
          {tab === "cockpit" && <CockpitHighTech />}
          {tab === "portfolio" && <PortfolioManagerHighTech />}
          {tab === "committees" && <CommitteeCenterHighTech />}
          {tab === "decisions" && <DecisionHubHighTech />}
          {tab === "risks" && <RiskIntelligenceHighTech />}
        </main>
      </div>
    </>
  );
}
