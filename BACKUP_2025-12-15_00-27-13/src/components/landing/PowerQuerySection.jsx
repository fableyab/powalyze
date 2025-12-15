import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileCode, Database, TrendingUp, Shield, Settings, Activity, 
  Terminal, ArrowRight, Download, Check, Copy, LayoutDashboard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';

const PowerQuerySection = () => {
  const { t } = useLanguage();
  const { toast } = useToast();

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast({
      title: t('common.copied'),
      duration: 2000,
    });
  };

  const scripts = [
    {
      id: "finance",
      icon: TrendingUp,
      title: t('home.powerquery.finance'),
      desc: t('home.powerquery.financeDesc'),
      color: "text-blue-500",
      code: `let
    Source = Sql.Database("server", "finance_db"),
    Data = Source{[Schema="dbo",Item="GL_Entries"]}[Data],
    #"Filtered Rows" = Table.SelectRows(Data, each [Date] > #date(2023,1,1)),
    #"Grouped Rows" = Table.Group(#"Filtered Rows", {"Account"}, {{"Total", each List.Sum([Amount]), type number}})
in
    #"Grouped Rows"`
    },
    {
      id: "universal",
      icon: Terminal,
      title: t('home.powerquery.universal'),
      desc: t('home.powerquery.universalDesc'),
      color: "text-[#BFA76A]",
      isPopular: true,
      code: `let
    Source = Excel.Workbook(File.Contents("C:\\Data\\Master.xlsx"), null, true),
    Sheet1_Sheet = Source{[Item="Sheet1",Kind="Sheet"]}[Data],
    #"Promoted Headers" = Table.PromoteHeaders(Sheet1_Sheet, [PromoteAllScalars=true]),
    #"Changed Type" = Table.TransformColumnTypes(#"Promoted Headers",{{"Date", type date}, {"Value", type number}})
in
    #"Changed Type"`
    },
    {
      id: "it",
      icon: Settings,
      title: t('home.powerquery.it'),
      desc: t('home.powerquery.itDesc'),
      color: "text-purple-500",
      code: `let
    Source = OData.Feed("https://analytics.dev.azure.com/{org}/{project}/_odata/v3.0-preview"),
    WorkItems = Source{[Name="WorkItems"]}[Data],
    #"Selected Columns" = Table.SelectColumns(WorkItems,{"WorkItemId", "Title", "State", "Priority"})
in
    #"Selected Columns"`
    }
  ];

  return (
    <section className="py-24 bg-[#0A0A0A] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F0F] to-[#0A0A0A] z-0"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-[#3A7BFF] font-bold uppercase tracking-[0.2em] text-xs mb-4 block">
            Developer Resources
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            {t('home.powerquery.title')}
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
            {t('home.powerquery.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {scripts.map((script) => (
            <motion.div 
              key={script.id}
              whileHover={{ y: -5 }}
              className={`bg-[#111] border ${script.isPopular ? 'border-[#BFA76A]' : 'border-white/10'} rounded-xl p-6 relative group overflow-hidden`}
            >
              {script.isPopular && (
                <div className="absolute top-0 right-0 bg-[#BFA76A] text-black text-[10px] font-bold px-3 py-1 uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-lg bg-white/5 ${script.color} group-hover:bg-white/10 transition-colors`}>
                  <script.icon size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">{script.title}</h3>
                  <p className="text-xs text-gray-400">{script.desc}</p>
                </div>
              </div>

              <div className="bg-[#050505] rounded-lg p-4 font-mono text-xs text-gray-400 mb-6 overflow-x-auto relative group-hover:border group-hover:border-white/10 transition-all">
                <pre>{script.code}</pre>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-6 w-6 p-0 hover:bg-white/20"
                    onClick={() => copyToClipboard(script.code)}
                  >
                    <Copy size={12} className="text-white" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10"
                  onClick={() => copyToClipboard(script.code)}
                >
                  <Copy size={14} className="mr-2" /> {t('common.copyCode')}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- NEW SECTION: DEMO REPORT LINK --- */}
        <div className="mt-20">
          <div className="relative bg-gradient-to-r from-[#111] to-[#161616] rounded-2xl p-10 border border-white/10 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#BFA76A]/10 blur-[100px] rounded-full pointer-events-none"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#BFA76A]/10 text-[#BFA76A] text-xs font-bold uppercase tracking-wider mb-4 border border-[#BFA76A]/20">
                  <Activity size={12} /> Live Showcase
                </div>
                <h3 className="text-3xl font-display font-bold text-white mb-4">
                  See the Scripts in Action
                </h3>
                <p className="text-gray-400 mb-8 text-lg">
                  Explore our fully interactive Executive Demo Report. See how we combine Power Query data transformation with advanced visualization techniques to deliver actionable insights.
                </p>
                <Link to="/demo-report">
                  <Button className="bg-[#BFA76A] text-black hover:bg-white font-bold h-12 px-8 text-base">
                    {t('common.viewDemoReport', "View Interactive Report")} <ArrowRight size={18} className="ml-2" />
                  </Button>
                </Link>
              </div>
              
              <div className="relative">
                <div className="aspect-video bg-[#000] rounded-xl border border-white/20 shadow-2xl overflow-hidden group hover:border-[#BFA76A]/50 transition-colors">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#3A7BFF]/20 to-transparent opacity-50"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <LayoutDashboard size={48} className="text-white mx-auto mb-4 opacity-80 group-hover:scale-110 transition-transform duration-500" />
                      <div className="text-white font-bold text-lg">Executive Dashboard</div>
                      <div className="text-[#BFA76A] text-sm">Live Preview</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PowerQuerySection;