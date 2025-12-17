import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import { Workflow, Check, ArrowRight, Zap, GitBranch, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const JiraDevOpsPage = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Helmet>
        <title>Jira & Azure DevOps | Powalyze</title>
        <meta name="description" content="Intégration Jira, Confluence et Azure DevOps pour un pilotage Agile unifié." />
      </Helmet>
      <Navbar />

      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
              Jira & <span className="text-[#0052CC]">Azure DevOps</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Centralisez la gestion de projets Agile avec des connecteurs natifs Jira Software, Jira Service Management, Confluence et Azure DevOps. Synchronisation bidirectionnelle temps réel.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              { icon: Workflow, title: 'Jira Software', desc: 'Sprints, epics, stories synchronisés avec vos dashboards PMO' },
              { icon: GitBranch, title: 'Azure DevOps', desc: 'Boards, Repos, Pipelines CI/CD intégrés au pilotage projet' },
              { icon: Users, title: 'Confluence', desc: 'Documentation projet automatiquement indexée et recherchable' }
            ].map((feature, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-8">
                <feature.icon size={32} className="text-[#0052CC] mb-4" />
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/pmo-360-demo">
              <Button className="h-14 px-10 bg-[#0052CC] text-white hover:bg-[#0747A6] font-bold text-lg">
                Voir la démo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default JiraDevOpsPage;
