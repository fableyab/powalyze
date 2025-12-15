import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import * as XLSX from 'xlsx';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { 
  Upload, FileSpreadsheet, Lock, Unlock, ChevronRight, 
  BarChart3, TrendingUp, Users, Filter, AlertCircle, CheckCircle2,
  Download, Database
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import { useToast } from '@/components/ui/use-toast';
import { Card } from '@/components/ui/DashboardComponents'; // Assuming this exists from previous steps

// Sample Data for "Use example dataset"
const SAMPLE_DATA = [
  { Date: '2024-01-01', Category: 'Consulting', Region: 'Europe', Amount: 15000 },
  { Date: '2024-01-05', Category: 'Licenses', Region: 'North America', Amount: 8500 },
  { Date: '2024-01-10', Category: 'Consulting', Region: 'Europe', Amount: 12000 },
  { Date: '2024-01-15', Category: 'Maintenance', Region: 'Asia', Amount: 5000 },
  { Date: '2024-02-01', Category: 'Consulting', Region: 'North America', Amount: 18000 },
  { Date: '2024-02-05', Category: 'Licenses', Region: 'Europe', Amount: 9000 },
  { Date: '2024-02-12', Category: 'Maintenance', Region: 'Europe', Amount: 4500 },
  { Date: '2024-02-20', Category: 'Consulting', Region: 'Asia', Amount: 11000 },
  { Date: '2024-03-01', Category: 'Licenses', Region: 'North America', Amount: 14000 },
  { Date: '2024-03-10', Category: 'Consulting', Region: 'Europe', Amount: 16500 },
  { Date: '2024-03-15', Category: 'Maintenance', Region: 'North America', Amount: 6000 },
  { Date: '2024-03-25', Category: 'Licenses', Region: 'Asia', Amount: 7500 },
];

const DemoPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef(null);
  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ category: 'All', region: 'All' });
  const [dragActive, setDragActive] = useState(false);

  // --- Handlers ---

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const processFile = (file) => {
    setLoading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const wb = XLSX.read(e.target.result, { type: 'binary' });
        const wsName = wb.SheetNames[0];
        const ws = wb.Sheets[wsName];
        const jsonData = XLSX.utils.sheet_to_json(ws);
        
        // Simple validation
        if (jsonData.length === 0) throw new Error("File is empty");
        
        // Normalize keys slightly for demo resilience
        const normalizedData = jsonData.map(row => {
            const newRow = {};
            Object.keys(row).forEach(key => {
                newRow[key.trim()] = row[key];
            });
            return newRow;
        });

        setData(normalizedData);
        toast({ title: "Success", description: "Data loaded successfully into demo environment." });
      } catch (err) {
        toast({ variant: "destructive", title: "Error", description: "Could not parse file. Ensure it's a valid CSV/Excel." });
      } finally {
        setLoading(false);
      }
    };
    reader.readAsBinaryString(file);
  };

  const loadSample = () => {
    setLoading(true);
    setTimeout(() => {
      setData(SAMPLE_DATA);
      setLoading(false);
      toast({ title: "Sample Loaded", description: "Explore the dashboard with sample data." });
    }, 800);
  };

  // --- Calculations ---

  const processedData = useMemo(() => {
    if (!data) return null;

    let filtered = data.filter(row => {
      const catMatch = filters.category === 'All' || row.Category === filters.category;
      const regMatch = filters.region === 'All' || row.Region === filters.region;
      return catMatch && regMatch;
    });

    // Metrics
    const totalAmount = filtered.reduce((acc, curr) => acc + (Number(curr.Amount) || 0), 0);
    const avgAmount = filtered.length ? totalAmount / filtered.length : 0;
    const rowCount = filtered.length;

    // Charts Data
    const byCategory = {};
    const byRegion = {};
    const timeline = {}; // key: date string

    filtered.forEach(row => {
       const amt = Number(row.Amount) || 0;
       
       // Cat
       if(row.Category) byCategory[row.Category] = (byCategory[row.Category] || 0) + amt;
       
       // Region
       if(row.Region) byRegion[row.Region] = (byRegion[row.Region] || 0) + amt;

       // Timeline (Aggregate by Date)
       if(row.Date) timeline[row.Date] = (timeline[row.Date] || 0) + amt;
    });

    return {
      metrics: { totalAmount, avgAmount, rowCount },
      charts: {
        category: Object.entries(byCategory).map(([k, v]) => ({ name: k, value: v })),
        region: Object.entries(byRegion).map(([k, v]) => ({ name: k, value: v })),
        timeline: Object.entries(timeline)
          .sort((a,b) => new Date(a[0]) - new Date(b[0]))
          .map(([k, v]) => ({ date: k, value: v }))
      },
      uniqueCategories: [...new Set(data.map(d => d.Category).filter(Boolean))],
      uniqueRegions: [...new Set(data.map(d => d.Region).filter(Boolean))]
    };
  }, [data, filters]);

  // --- Components ---

  const TeaserSection = () => (
    <div className="relative w-full max-w-6xl mx-auto mb-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-30 blur-[2px] pointer-events-none select-none">
         {/* Fake Dashboard Background */}
         <div className="bg-[#111] p-6 rounded-xl border border-white/10 h-64"></div>
         <div className="bg-[#111] p-6 rounded-xl border border-white/10 h-64"></div>
         <div className="bg-[#111] p-6 rounded-xl border border-white/10 h-64"></div>
         <div className="col-span-3 bg-[#111] p-6 rounded-xl border border-white/10 h-96"></div>
      </div>
      
      <div className="absolute inset-0 flex items-center justify-center">
         <motion.div 
           initial={{ scale: 0.9, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           className="bg-black/90 backdrop-blur-xl border border-[#BFA76A]/30 p-10 rounded-2xl text-center max-w-lg shadow-2xl"
         >
            <div className="w-16 h-16 bg-[#BFA76A]/10 rounded-full flex items-center justify-center mx-auto mb-6">
               <Lock className="text-[#BFA76A]" size={32} />
            </div>
            <h2 className="text-2xl font-display font-bold text-white mb-4">
               Démo Réservée aux Membres
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
               Connectez-vous pour accéder à notre environnement de démonstration interactif. 
               Testez vos propres fichiers Excel ou utilisez nos jeux de données.
            </p>
            <div className="flex flex-col gap-4">
               <Link to="/signup">
                  <Button className="w-full bg-[#BFA76A] text-black hover:bg-white font-bold uppercase tracking-widest">
                     Créer un compte gratuit
                  </Button>
               </Link>
               <Link to="/login" className="text-sm text-gray-500 hover:text-white transition-colors">
                  Déjà membre ? Se connecter
               </Link>
            </div>
         </motion.div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow pt-32 px-6">
        {/* Hero */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
           <motion.div
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#BFA76A]/30 bg-[#BFA76A]/10 text-[#BFA76A] text-xs font-bold uppercase tracking-wider mb-6"
           >
              <BarChart3 size={14} /> Executive Suite Demo
           </motion.div>
           <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
              Power BI Executive Demo <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BFA76A] to-[#F2E2B8]">
                 Testez la puissance de vos données
              </span>
           </h1>
           <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">
              Une version simplifiée de notre suite analytique pour explorer les capacités de visualisation et d'interaction.
           </p>
        </div>

        {/* Content Area */}
        {!user ? <TeaserSection /> : (
          <div className="max-w-7xl mx-auto mb-20">
             
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="bg-[#1C1C1C] border-l-4 border-[#BFA76A] p-4 mb-8 flex items-center justify-between"
             >
                <div className="flex items-center gap-3">
                   <Unlock className="text-[#BFA76A]" size={20} />
                   <span className="text-white font-medium">Demo Unlocked</span>
                </div>
                <span className="text-xs text-gray-500 uppercase tracking-wider hidden sm:inline">Welcome, {user.name}</span>
             </motion.div>

             {/* Upload Section */}
             {!data && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
                >
                   {/* Drag Drop */}
                   <div 
                     className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-center transition-all cursor-pointer h-80
                        ${dragActive ? 'border-[#BFA76A] bg-[#BFA76A]/5 scale-[1.02]' : 'border-white/10 bg-[#111] hover:border-white/20'}`}
                     onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
                     onClick={() => fileInputRef.current?.click()}
                   >
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept=".csv,.xlsx,.xls" 
                        onChange={(e) => e.target.files[0] && processFile(e.target.files[0])}
                      />
                      {loading ? (
                         <div className="animate-spin w-12 h-12 border-4 border-[#BFA76A] border-t-transparent rounded-full mb-4"/>
                      ) : (
                         <div className="w-16 h-16 bg-[#1C1C1C] rounded-full flex items-center justify-center mb-6 text-gray-400">
                            <Upload size={32} />
                         </div>
                      )}
                      <h3 className="text-xl font-bold text-white mb-2">Upload your file</h3>
                      <p className="text-sm text-gray-500 mb-6 max-w-xs">
                         Supports CSV or Excel. Expected columns: <br/>
                         <span className="text-gray-300 font-mono">Date, Category, Region, Amount</span>
                      </p>
                      <Button variant="outline" className="border-white/10 text-white hover:bg-white/5">
                         Browse Files
                      </Button>
                   </div>

                   {/* Sample Option */}
                   <div className="bg-gradient-to-br from-[#111] to-[#0A0A0A] border border-white/10 rounded-xl p-10 flex flex-col justify-center h-80">
                      <div className="w-12 h-12 bg-[#BFA76A]/10 rounded-lg flex items-center justify-center mb-6">
                         <Database className="text-[#BFA76A]" size={24} />
                      </div>
                      <h3 className="text-2xl font-display font-bold text-white mb-4">No data handy?</h3>
                      <p className="text-gray-400 mb-8">
                         Load our example dataset to see the dashboard in action immediately. Perfect for a quick tour.
                      </p>
                      <Button onClick={loadSample} className="w-fit bg-[#BFA76A] text-black font-bold hover:bg-white transition-colors">
                         Use Example Dataset <ChevronRight size={16} className="ml-2" />
                      </Button>
                   </div>
                </motion.div>
             )}

             {/* Dashboard Interface */}
             {data && processedData && (
                <motion.div 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   className="space-y-6"
                >
                   {/* Toolbar */}
                   <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#111] p-4 rounded-lg border border-white/10">
                      <div className="flex items-center gap-4">
                         <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Filter size={16} /> Filters:
                         </div>
                         <select 
                           className="bg-[#0A0A0A] border border-white/10 rounded px-3 py-1 text-sm text-white focus:border-[#BFA76A] outline-none"
                           value={filters.category}
                           onChange={(e) => setFilters(prev => ({...prev, category: e.target.value}))}
                         >
                            <option value="All">All Categories</option>
                            {processedData.uniqueCategories.map(c => <option key={c} value={c}>{c}</option>)}
                         </select>
                         <select 
                           className="bg-[#0A0A0A] border border-white/10 rounded px-3 py-1 text-sm text-white focus:border-[#BFA76A] outline-none"
                           value={filters.region}
                           onChange={(e) => setFilters(prev => ({...prev, region: e.target.value}))}
                         >
                            <option value="All">All Regions</option>
                            {processedData.uniqueRegions.map(r => <option key={r} value={r}>{r}</option>)}
                         </select>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setData(null)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-900/10"
                      >
                         Reset Demo
                      </Button>
                   </div>

                   {/* KPI Grid */}
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Card className="border-t-2 border-[#BFA76A]">
                         <h4 className="text-gray-500 text-xs uppercase tracking-wider mb-2">Total Revenue</h4>
                         <div className="text-3xl font-bold text-white">
                            €{processedData.metrics.totalAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                         </div>
                      </Card>
                      <Card className="border-t-2 border-blue-500">
                         <h4 className="text-gray-500 text-xs uppercase tracking-wider mb-2">Avg. Transaction</h4>
                         <div className="text-3xl font-bold text-white">
                            €{processedData.metrics.avgAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                         </div>
                      </Card>
                      <Card className="border-t-2 border-purple-500">
                         <h4 className="text-gray-500 text-xs uppercase tracking-wider mb-2">Transactions</h4>
                         <div className="text-3xl font-bold text-white">
                            {processedData.metrics.rowCount}
                         </div>
                      </Card>
                   </div>

                   {/* Charts */}
                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Card className="h-80">
                         <h4 className="text-white font-bold mb-6 flex items-center gap-2">
                            <BarChart3 size={16} className="text-[#BFA76A]"/> Revenue by Category
                         </h4>
                         <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={processedData.charts.category} margin={{ top: 0, right: 0, left: -20, bottom: 20 }}>
                               <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                               <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                               <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                               <RechartsTooltip 
                                  contentStyle={{ backgroundColor: '#111', borderColor: '#333', color: '#fff' }}
                                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                               />
                               <Bar dataKey="value" fill="#BFA76A" radius={[4, 4, 0, 0]} />
                            </BarChart>
                         </ResponsiveContainer>
                      </Card>

                      <Card className="h-80">
                         <h4 className="text-white font-bold mb-6 flex items-center gap-2">
                            <TrendingUp size={16} className="text-blue-500"/> Revenue Timeline
                         </h4>
                         <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={processedData.charts.timeline} margin={{ top: 0, right: 0, left: -20, bottom: 20 }}>
                               <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                               <XAxis dataKey="date" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                               <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                               <RechartsTooltip 
                                  contentStyle={{ backgroundColor: '#111', borderColor: '#333', color: '#fff' }}
                               />
                               <Area type="monotone" dataKey="value" stroke="#3A7BFF" fill="#3A7BFF" fillOpacity={0.1} strokeWidth={2} />
                            </AreaChart>
                         </ResponsiveContainer>
                      </Card>
                   </div>
                   
                   <div className="flex items-center justify-center gap-2 text-xs text-orange-400 bg-orange-900/10 p-2 rounded border border-orange-500/20">
                      <AlertCircle size={14} />
                      Limited demo version. Advanced features (AI forecasting, Data Model editing, Export) are disabled.
                   </div>
                </motion.div>
             )}
          </div>
        )}

        {/* Upgrade Section - Always visible at bottom */}
        <div className="bg-[#111] border-y border-white/10 py-20 -mx-6 px-6 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#BFA76A]/5 to-transparent pointer-events-none" />
           
           <div className="max-w-4xl mx-auto text-center relative z-10">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
                 Passez à Powalyze <span className="text-[#BFA76A]">Executive Suite</span>
              </h2>
              <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
                 Libérez tout le potentiel de vos données avec notre solution complète. 
                 Tableaux de bord illimités, connecteurs systèmes (SAP, Salesforce), et support dédié.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-2xl mx-auto mb-12">
                 {[
                   "Tableaux de bord complets & personnalisés",
                   "Modèles de données avancés (Star Schema)",
                   "Connecteurs API & Base de données",
                   "Rapports C-Level automatisés",
                   "Support continu & Maintenance",
                   "Formation des équipes"
                 ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-gray-300">
                       <CheckCircle2 className="text-[#BFA76A] shrink-0" size={20} />
                       <span>{item}</span>
                    </div>
                 ))}
              </div>

              <Link to="/contact">
                 <Button className="h-14 px-10 text-lg bg-[#BFA76A] text-black hover:bg-white hover:text-black font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(191,167,106,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300">
                    Découvrir l'offre PRO
                 </Button>
              </Link>
           </div>
        </div>

      </main>
      <FooterSection />
    </div>
  );
};

export default DemoPage;