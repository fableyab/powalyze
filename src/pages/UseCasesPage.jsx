import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import { Button } from '@/components/ui/button';
import { Check, PieChart, TrendingUp, Users, ArrowRight, BarChart4, DollarSign, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const sections = [
  {
    id: 'finance',
    title: 'Finance & Controlling',
    icon: DollarSign,
    desc: 'Automate financial reporting, consolidate multi-entity budgets, and forecast cash flow with precision.',
    kpis: ['Cash Flow Velocity', 'EBITDA Margin', 'OPEX vs Budget'],
    image: <img alt="Financial dashboard on tablet" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1578098576845-51e4ff4305d5" />,
    benefits: ['Reduce closing time by 40%', 'Real-time P&L visibility', 'Automated currency conversion']
  },
  {
    id: 'sales',
    title: 'Sales & Revenue',
    icon: TrendingUp,
    desc: 'Track pipeline health, analyze rep performance, and identify cross-sell opportunities instantly.',
    kpis: ['Customer Acquisition Cost', 'Monthly Recurring Revenue', 'Churn Rate'],
    image: <img alt="Sales team meeting" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1690191793753-49f801f5cca5" />,
    benefits: ['Improve forecast accuracy', ' optimize territory planning', 'Increase deal velocity']
  },
  {
    id: 'ops',
    title: 'Operations & Supply Chain',
    icon: Activity,
    desc: 'Monitor inventory levels, optimize logistics routes, and predict maintenance needs before failure.',
    kpis: ['Order Fulfillment Rate', 'Inventory Turnover', 'Supplier Lead Time'],
    image: <img alt="Logistics center visualization" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1688413399498-e35ed74b554f" />,
    benefits: ['Reduce inventory costs', 'Minimize downtime', 'Streamline procurement']
  }
];

const UseCasesPage = () => {
  const [activeTab, setActiveTab] = useState('finance');

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col font-sans">
      <SEO title="Use Cases - Powalyze" description="Discover how Powalyze transforms data for Finance, Sales, and Operations." />
      <Navbar />

      <main className="flex-grow pt-32 pb-20">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
             <span className="text-[#BFA76A] font-bold uppercase tracking-[0.2em] mb-4 block text-xs">Real-World Impact</span>
             <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
                Tailored for Your <span className="text-[#BFA76A]">Department</span>
             </h1>
             <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">
                See how our premium data solutions adapt to the specific challenges of your industry function.
             </p>
          </motion.div>
        </div>

        {/* Interactive Tabs */}
        <div className="max-w-7xl mx-auto px-6 mb-12">
           <div className="flex flex-wrap justify-center gap-4 mb-12">
              {sections.map((section) => (
                 <button
                   key={section.id}
                   onClick={() => setActiveTab(section.id)}
                   className={`flex items-center gap-2 px-8 py-4 rounded-full border transition-all duration-300 ${
                      activeTab === section.id 
                      ? 'bg-[#BFA76A] text-black border-[#BFA76A] font-bold shadow-[0_0_20px_rgba(191,167,106,0.3)]' 
                      : 'bg-[#111] text-gray-400 border-[#333] hover:border-[#BFA76A] hover:text-white'
                   }`}
                 >
                    <section.icon size={18} />
                    <span className="uppercase tracking-wider text-sm">{section.title}</span>
                 </button>
              ))}
           </div>

           <div className="bg-[#111] border border-[#222] rounded-3xl overflow-hidden relative min-h-[600px]">
              <AnimatePresence mode="wait">
                 {sections.map((section) => (
                    activeTab === section.id && (
                       <motion.div 
                         key={section.id}
                         initial={{ opacity: 0, scale: 0.98 }}
                         animate={{ opacity: 1, scale: 1 }}
                         exit={{ opacity: 0, scale: 0.98 }}
                         transition={{ duration: 0.4 }}
                         className="grid grid-cols-1 lg:grid-cols-2 h-full absolute inset-0"
                       >
                          {/* Content */}
                          <div className="p-8 md:p-16 flex flex-col justify-center relative z-10">
                             <div className="inline-flex items-center gap-2 text-[#BFA76A] mb-6">
                                <section.icon size={24} />
                                <span className="text-lg font-bold">{section.title}</span>
                             </div>
                             <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6 leading-tight">
                                {section.desc}
                             </h2>
                             
                             <div className="space-y-6 mb-10">
                                <h3 className="text-gray-500 uppercase tracking-widest text-xs font-bold">Key Benefits</h3>
                                {section.benefits.map((benefit, i) => (
                                   <div key={i} className="flex items-center gap-3">
                                      <div className="w-6 h-6 rounded-full bg-[#BFA76A]/20 flex items-center justify-center text-[#BFA76A]">
                                         <Check size={14} />
                                      </div>
                                      <span className="text-gray-300">{benefit}</span>
                                   </div>
                                ))}
                             </div>

                             <div className="grid grid-cols-3 gap-4 mb-10">
                                {section.kpis.map((kpi, i) => (
                                   <div key={i} className="bg-[#0A0A0A] p-4 rounded border border-[#333]">
                                      <div className="text-[#BFA76A] mb-2"><BarChart4 size={16} /></div>
                                      <div className="text-xs text-gray-400 font-medium leading-tight">{kpi}</div>
                                   </div>
                                ))}
                             </div>

                             <Link to="/contact">
                                <Button className="w-fit bg-white text-black hover:bg-[#BFA76A] hover:text-black font-bold px-8">
                                   Request {section.title.split(' ')[0]} Demo <ArrowRight size={16} className="ml-2" />
                                </Button>
                             </Link>
                          </div>

                          {/* Image */}
                          <div className="relative h-full hidden lg:block">
                             <div className="absolute inset-0 bg-gradient-to-r from-[#111] to-transparent z-10"></div>
                             {section.image}
                          </div>
                       </motion.div>
                    )
                 ))}
              </AnimatePresence>
           </div>
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default UseCasesPage;