import React from 'react';
import SEO from '@/components/SEO';
import HeaderVitrine from '@/components/vitrine/HeaderVitrine';
import HeroHighTech from '@/components/vitrine/HeroHighTech';
import FeaturesHighTech from '@/components/vitrine/FeaturesHighTech';
import DemoHighTech from '@/components/vitrine/DemoHighTech';
import ResultsHighTech from '@/components/vitrine/ResultsHighTech';
import FooterOS from '@/components/vitrine/FooterOS';

const LandingPage = () => {
  return (
    <div className="bg-black text-white overflow-hidden">
      <SEO 
        title="Powalyze - The Governance Operating System"
        description="Un cockpit de gouvernance moderne qui unifie vos portefeuilles, vos données, vos reportings et l'IA prédictive."
      />

      <HeaderVitrine />
      <HeroHighTech />
      <section id="features">
        <FeaturesHighTech />
      </section>
      <section id="results">
        <ResultsHighTech />
      </section>
      <FooterOS />
    </div>
  );
};

export default LandingPage;
