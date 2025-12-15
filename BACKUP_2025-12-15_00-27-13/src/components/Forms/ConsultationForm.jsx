import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Send, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';

const ConsultationForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    phone: '',
    company: '',
    position: 'CEO', // Default value
    contactMethod: 'email',
    preferredDate: '',
    preferredTime: ''
  });

  const [formErrors, setFormErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!formData.prenom.trim()) newErrors.prenom = "Prénom requis";
    if (!formData.nom.trim()) newErrors.nom = "Nom requis";
    if (!formData.email.trim()) {
      newErrors.email = "Email requis";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Format d'email invalide";
    }
    if (!formData.phone.trim()) newErrors.phone = "Téléphone requis";
    if (!formData.company.trim()) newErrors.company = "Société requise";

    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    if (formErrors[key]) setFormErrors(prev => ({ ...prev, [key]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast({ variant: "destructive", title: "Erreur de validation", description: "Veuillez remplir tous les champs obligatoires." });
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Send data to Formspree endpoint
      const response = await fetch("https://formspree.io/f/xeoyznlq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          subject: `Nouvelle demande de consultation - ${formData.company}`
        })
      });

      if (response.ok) {
        setSubmitted(true);
        toast({ 
          title: "Demande envoyée !", 
          description: "Nous avons bien reçu votre demande de consultation.",
          variant: "success"
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de l'envoi");
      }
      
    } catch (err) {
      console.error("Submission error:", err);
      setError("Impossible d'envoyer la demande. Veuillez réessayer.");
      toast({ variant: "destructive", title: "Erreur d'envoi", description: "Veuillez réessayer plus tard." });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center text-center p-8 h-full min-h-[400px] bg-[#1A1A1A]/50 rounded-xl border border-green-500/20"
      >
        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-500">
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Demande Reçue</h3>
        <p className="text-gray-400 mb-6 max-w-sm text-sm">
          Merci {formData.prenom} ! Votre demande pour une <strong>consultation gratuite d'1h</strong> a été enregistrée.
        </p>
        <Button 
          variant="outline" 
          onClick={() => { 
            setSubmitted(false); 
            setFormData({
              prenom: '', nom: '', email: '', phone: '', company: '', 
              position: 'CEO', contactMethod: 'email', preferredDate: '', preferredTime: ''
            }); 
          }}
          className="border-white/10 text-white hover:bg-white/5 text-xs"
        >
          Nouvelle demande
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 animate-in fade-in duration-500 relative">
       {/* 1H Free Offer Badge */}
       <div className="absolute -top-12 right-0 bg-[#BFA76A] text-black text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg shadow-[#BFA76A]/20 animate-bounce">
         <Sparkles size={12} /> 1H Gratuite Incluse
       </div>

       {error && (
         <div className="bg-red-900/20 border border-red-500/20 text-red-200 p-3 rounded-lg flex items-center gap-3 text-xs">
           <AlertCircle size={16} className="shrink-0" /> {error}
         </div>
       )}

       <div className="grid grid-cols-2 gap-4">
         <div className="space-y-2">
            <Label className="text-gray-300 text-xs">Prénom <span className="text-[#BFA76A]">*</span></Label>
            <Input 
               name="prenom"
               value={formData.prenom} 
               onChange={e => handleChange('prenom', e.target.value)} 
               className={`bg-black/50 border-white/10 text-white focus:border-[#BFA76A] h-10 ${formErrors.prenom ? 'border-red-500' : ''}`}
               placeholder="Jean"
            />
         </div>
         <div className="space-y-2">
            <Label className="text-gray-300 text-xs">Nom <span className="text-[#BFA76A]">*</span></Label>
            <Input 
               name="nom"
               value={formData.nom} 
               onChange={e => handleChange('nom', e.target.value)} 
               className={`bg-black/50 border-white/10 text-white focus:border-[#BFA76A] h-10 ${formErrors.nom ? 'border-red-500' : ''}`}
               placeholder="Dupont"
            />
         </div>
       </div>

       <div className="space-y-2">
          <Label className="text-gray-300 text-xs">Email <span className="text-[#BFA76A]">*</span></Label>
          <Input 
             name="email"
             type="email" 
             value={formData.email} 
             onChange={e => handleChange('email', e.target.value)} 
             className={`bg-black/50 border-white/10 text-white focus:border-[#BFA76A] h-10 ${formErrors.email ? 'border-red-500' : ''}`}
             placeholder="pro@entreprise.com"
          />
       </div>

       <div className="space-y-2">
          <Label className="text-gray-300 text-xs">Téléphone <span className="text-[#BFA76A]">*</span></Label>
          <Input 
             name="phone"
             type="tel"
             value={formData.phone} 
             onChange={e => handleChange('phone', e.target.value)} 
             className={`bg-black/50 border-white/10 text-white focus:border-[#BFA76A] h-10 ${formErrors.phone ? 'border-red-500' : ''}`}
             placeholder="+33 6 12 34 56 78"
          />
       </div>

       <div className="space-y-2">
          <Label className="text-gray-300 text-xs">Société <span className="text-[#BFA76A]">*</span></Label>
          <Input 
             name="company"
             value={formData.company} 
             onChange={e => handleChange('company', e.target.value)} 
             className={`bg-black/50 border-white/10 text-white focus:border-[#BFA76A] h-10 ${formErrors.company ? 'border-red-500' : ''}`}
             placeholder="Votre Entreprise"
          />
       </div>

       <div className="space-y-2">
          <Label className="text-gray-300 text-xs">Poste</Label>
          <Select value={formData.position} onValueChange={v => handleChange('position', v)}>
             <SelectTrigger className="bg-black/50 border-white/10 text-white focus:border-[#BFA76A] h-10">
               <SelectValue placeholder="Sélectionnez votre poste" />
             </SelectTrigger>
             <SelectContent className="bg-[#1A1A1A] text-white border-white/10">
                <SelectItem value="CEO">CEO / DG</SelectItem>
                <SelectItem value="CFO">CFO / Directeur Financier</SelectItem>
                <SelectItem value="CTO">CTO / DSI</SelectItem>
                <SelectItem value="PMO_Director">Directeur PMO</SelectItem>
                <SelectItem value="Project_Manager">Chef de Projet</SelectItem>
                <SelectItem value="Business_Analyst">Business Analyst</SelectItem>
                <SelectItem value="Consultant">Consultant</SelectItem>
                <SelectItem value="Autre">Autre</SelectItem>
             </SelectContent>
          </Select>
          <input type="hidden" name="position" value={formData.position} />
       </div>

       <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-gray-300 text-xs">Date souhaitée</Label>
            <Input 
               name="preferredDate"
               type="date" 
               value={formData.preferredDate} 
               onChange={e => handleChange('preferredDate', e.target.value)} 
               className="bg-black/50 border-white/10 text-white focus:border-[#BFA76A] h-10 [color-scheme:dark]" 
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-300 text-xs">Heure souhaitée</Label>
            <Input 
               name="preferredTime"
               type="time" 
               value={formData.preferredTime} 
               onChange={e => handleChange('preferredTime', e.target.value)} 
               className="bg-black/50 border-white/10 text-white focus:border-[#BFA76A] h-10 [color-scheme:dark]" 
            />
          </div>
       </div>

       <div className="space-y-2">
          <Label className="text-gray-300 text-xs">Préférence de contact</Label>
          <Select value={formData.contactMethod} onValueChange={v => handleChange('contactMethod', v)}>
             <SelectTrigger className="bg-black/50 border-white/10 text-white focus:border-[#BFA76A] h-10"><SelectValue /></SelectTrigger>
             <SelectContent className="bg-[#1A1A1A] text-white border-white/10">
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="phone">Téléphone</SelectItem>
                <SelectItem value="video">Visio (Teams)</SelectItem>
             </SelectContent>
          </Select>
          <input type="hidden" name="contactMethod" value={formData.contactMethod} />
       </div>

       <Button type="submit" disabled={loading} className="w-full bg-[#BFA76A] text-black hover:bg-white font-bold h-12 text-base mt-6 transition-all hover:scale-[1.01] shadow-lg shadow-[#BFA76A]/10">
          {loading ? <Loader2 className="animate-spin" /> : <span className="flex items-center gap-2">Réserver ma consultation <Send size={16} /></span>}
       </Button>
       
       <p className="text-[10px] text-center text-gray-500 mt-2">
          En cliquant, vous acceptez d'être contacté par Powalyze.
       </p>
    </form>
  );
};

export default ConsultationForm;