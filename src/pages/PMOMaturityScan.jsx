import React, { useMemo, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { CheckCircle, Loader2, Send } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { emailService } from '@/services/emailService';

const questions = (t) => [
  t('maturity.q1'), t('maturity.q2'), t('maturity.q3'), t('maturity.q4'), t('maturity.q5'),
  t('maturity.q6'), t('maturity.q7'), t('maturity.q8'), t('maturity.q9'), t('maturity.q10')
];

const PMOMaturityScan = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const qs = questions(t);
  const [scores, setScores] = useState(Array(qs.length).fill(3));
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailData, setEmailData] = useState({ name: '', email: '', company: '' });
  const [emailErrors, setEmailErrors] = useState({});

  const summary = useMemo(() => {
    const total = scores.reduce((a, b) => a + b, 0);
    const avg = total / scores.length;
    let level = 'initial';
    if (avg >= 4.2) level = 'optimized'; else if (avg >= 3.4) level = 'structured'; else if (avg >= 2.6) level = 'defined';
    return { total, avg: Math.round(avg * 10) / 10, level };
  }, [scores]);

  const data = [
    { k: t('maturity.dim.governance'), v: (scores[0] + scores[1]) / 2 },
    { k: t('maturity.dim.delivery'), v: (scores[2] + scores[3]) / 2 },
    { k: t('maturity.dim.risk'), v: (scores[4] + scores[5]) / 2 },
    { k: t('maturity.dim.data'), v: (scores[6] + scores[7]) / 2 },
    { k: t('maturity.dim.change'), v: (scores[8] + scores[9]) / 2 },
  ];

  const set = (i, v) => setScores(s => s.map((x, idx) => idx === i ? v : x));

  const recs = {
    initial: [t('maturity.recs.initial1'), t('maturity.recs.initial2'), t('maturity.recs.initial3')],
    defined: [t('maturity.recs.defined1'), t('maturity.recs.defined2'), t('maturity.recs.defined3')],
    structured: [t('maturity.recs.structured1'), t('maturity.recs.structured2'), t('maturity.recs.structured3')],
    optimized: [t('maturity.recs.optimized1'), t('maturity.recs.optimized2'), t('maturity.recs.optimized3')],
  };

  const validateEmail = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailData.name.trim()) errors.name = "Nom requis";
    if (!emailData.email.trim()) {
      errors.email = "Email requis";
    } else if (!emailRegex.test(emailData.email)) {
      errors.email = "Email invalide";
    }
    if (!emailData.company.trim()) errors.company = "Société requise";
    setEmailErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail()) {
      toast({ variant: "destructive", title: "Erreur", description: "Veuillez remplir tous les champs." });
      return;
    }

    setEmailLoading(true);
    try {
      // Calculate dimension scores
      const governance = ((scores[0] + scores[1]) / 2).toFixed(1);
      const delivery = ((scores[2] + scores[3]) / 2).toFixed(1);
      const risk = ((scores[4] + scores[5]) / 2).toFixed(1);
      const dataScore = ((scores[6] + scores[7]) / 2).toFixed(1);
      const change = ((scores[8] + scores[9]) / 2).toFixed(1);

      // Prepare email data
      const scanResults = {
        name: emailData.name,
        email: emailData.email,
        company: emailData.company,
        score: summary.avg,
        level: summary.level,
        governance,
        delivery,
        risk,
        dataScore,
        change
      };

      // Send to user
      const userResult = await emailService.sendPMOMaturityScanResults(scanResults, language);
      
      // Send admin notification
      const adminResult = await emailService.sendPMOMaturityScanAdminNotification(scanResults, language);

      if (userResult.success) {
        setEmailSubmitted(true);
        toast({ 
          title: language === 'fr' ? "Email envoyé!" : "Email sent!",
          description: language === 'fr' ? "Vous allez recevoir vos résultats détaillés." : "You will receive your detailed results.",
        });
        setTimeout(() => {
          setShowEmailForm(false);
          setEmailSubmitted(false);
          setEmailData({ name: '', email: '', company: '' });
        }, 3000);
      } else {
        throw new Error("Email send failed");
      }
    } catch (err) {
      console.error("Email error:", err);
      toast({ 
        variant: "destructive", 
        title: language === 'fr' ? "Erreur" : "Error", 
        description: language === 'fr' ? "Impossible d'envoyer l'email. Veuillez réessayer." : "Failed to send email. Please try again." 
      });
    } finally {
      setEmailLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="container mx-auto px-6 pt-20 pb-16 max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#BFA76A]/40 bg-black/50 backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-[#BFA76A] animate-pulse" />
            <span className="text-[#BFA76A] text-xs font-bold tracking-[0.2em] uppercase">{t('maturity.badge')}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold leading-tight">{t('maturity.title')}</h1>
          <p className="text-gray-400 text-lg mt-4 max-w-3xl">{t('maturity.subtitle')}</p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-5">
            {qs.map((q, i) => (
              <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-md">
                <div className="text-sm text-gray-300 mb-2">{q}</div>
                <div className="flex items-center gap-3">
                  {[1,2,3,4,5].map(v => (
                    <button key={v} onClick={() => set(i, v)} className={`px-3 py-1 text-sm rounded-sm border ${scores[i]===v? 'bg-[#BFA76A] text-black border-[#BFA76A]' : 'bg-white/5 text-white border-white/10 hover:bg-white/10'}`}>{v}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div>
            <div className="p-4 bg-white/5 border border-white/10 rounded-md">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-400">{t('maturity.average')}</div>
                <div className="text-2xl font-semibold text-white">{summary.avg}/5</div>
              </div>
              <div className="text-sm text-gray-400 mt-1">{t('maturity.level')} <span className="text-white font-semibold">{t(`maturity.levels.${summary.level}`)}</span></div>
              <div className="h-48 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data} margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                    <XAxis dataKey="k" tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis hide domain={[0,5]} />
                    <Tooltip contentStyle={{ background:'#111', border:'1px solid rgba(255,255,255,0.08)', borderRadius: 6 }} labelStyle={{ color:'#aaa' }} itemStyle={{ color:'#fff' }} />
                    <Bar dataKey="v" fill="#BFA76A" radius={[3,3,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="mt-5 p-4 bg-white/5 border border-white/10 rounded-md">
              <div className="text-sm text-gray-400 mb-2">{t('maturity.recommendations')}</div>
              <ul className="grid gap-1 text-sm text-gray-200 list-disc pl-5">
                {recs[summary.level].map((r, idx) => (<li key={idx}>{r}</li>))}
              </ul>
              <div className="mt-4 flex flex-col gap-3">
                <button 
                  onClick={() => setShowEmailForm(!showEmailForm)}
                  className="px-5 py-2 bg-[#BFA76A] text-black font-semibold rounded-sm hover:bg-white transition"
                >
                  {showEmailForm ? 'Annuler' : 'Recevoir mes résultats par email'}
                </button>
                <a href="/offers" className="px-5 py-2 border border-white/20 text-white rounded-sm hover:bg-white/10 transition text-center">{t('maturity.ctaOffer')}</a>
              </div>
            </div>

            {/* Email Form Section */}
            {showEmailForm && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-4 bg-white/5 border border-white/10 rounded-md"
              >
                {emailSubmitted ? (
                  <div className="flex flex-col items-center justify-center text-center p-4">
                    <CheckCircle className="w-8 h-8 text-green-500 mb-3" />
                    <h3 className="text-white font-semibold mb-1">Email envoyé !</h3>
                    <p className="text-gray-400 text-sm">Vérifiez votre boîte de réception.</p>
                  </div>
                ) : (
                  <form onSubmit={handleEmailSubmit} className="space-y-3">
                    <div>
                      <Label className="text-gray-300 text-xs">Nom complet</Label>
                      <Input 
                        value={emailData.name}
                        onChange={(e) => setEmailData({...emailData, name: e.target.value})}
                        className={`bg-black/50 border-white/10 text-white focus:border-[#BFA76A] h-9 text-sm ${emailErrors.name ? 'border-red-500' : ''}`}
                        placeholder="Jean Dupont"
                      />
                      {emailErrors.name && <p className="text-red-400 text-xs mt-1">{emailErrors.name}</p>}
                    </div>
                    <div>
                      <Label className="text-gray-300 text-xs">Email</Label>
                      <Input 
                        type="email"
                        value={emailData.email}
                        onChange={(e) => setEmailData({...emailData, email: e.target.value})}
                        className={`bg-black/50 border-white/10 text-white focus:border-[#BFA76A] h-9 text-sm ${emailErrors.email ? 'border-red-500' : ''}`}
                        placeholder="jean@entreprise.com"
                      />
                      {emailErrors.email && <p className="text-red-400 text-xs mt-1">{emailErrors.email}</p>}
                    </div>
                    <div>
                      <Label className="text-gray-300 text-xs">Société</Label>
                      <Input 
                        value={emailData.company}
                        onChange={(e) => setEmailData({...emailData, company: e.target.value})}
                        className={`bg-black/50 border-white/10 text-white focus:border-[#BFA76A] h-9 text-sm ${emailErrors.company ? 'border-red-500' : ''}`}
                        placeholder="Votre Entreprise"
                      />
                      {emailErrors.company && <p className="text-red-400 text-xs mt-1">{emailErrors.company}</p>}
                    </div>
                    <Button 
                      type="submit" 
                      disabled={emailLoading}
                      className="w-full bg-[#BFA76A] text-black hover:bg-white font-semibold h-9 text-sm"
                    >
                      {emailLoading ? <Loader2 className="animate-spin w-4 h-4" /> : <span className="flex items-center gap-2 justify-center"><Send size={14} /> Envoyer les résultats</span>}
                    </Button>
                  </form>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PMOMaturityScan;
