import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, ChevronDown, Sparkles, ExternalLink, Calendar } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Link } from 'react-router-dom';

// --- KNOWLEDGE BASE & LOGIC ---

const KNOWLEDGE_BASE = {
  fr: {
    default: "Je ne suis pas certain de comprendre votre demande spécifique. Pour une réponse précise adaptée à votre contexte, je vous invite à contacter nos experts ou à reformuler votre question.",
    greetings: [
      "Bonjour ! Je suis l'assistant virtuel Powalyze. Je suis ici pour vous guider vers l'excellence opérationnelle. En quoi puis-je vous aider aujourd'hui ?",
      "Bienvenue chez Powalyze. Comment puis-je vous assister dans votre transformation PMO aujourd'hui ?"
    ],
    topics: {
      powalyze: {
        keywords: ["powalyze", "c'est quoi", "qu'est-ce", "entreprise", "société", "platform"],
        response: "Powalyze est une plateforme de **PMO Stratégique & Business Intelligence** de nouvelle génération. Nous transformons la complexité des grands programmes IT en clarté opérationnelle.\n\nNotre approche unique combine :\n• Une expertise PMO senior (Gouvernance, Risques, Processus)\n• La puissance de la Data (BI, Analytics)\n• L'automatisation intelligente et l'IA\n\nNous aidons les dirigeants à sécuriser leurs investissements stratégiques.",
        cta: { text: "Découvrir notre approche", link: "/a-propos" }
      },
      portfolio: {
        keywords: ["portefeuille", "projet", "portfolio", "gestion", "piloter", "suivi", "multiprojets"],
        response: "Le pilotage de portefeuille (PPM) chez Powalyze repose sur une vision **Data-Driven**. Nous ne nous contentons pas de suivre des statuts ; nous analysons la santé réelle de vos investissements.\n\nNos solutions permettent :\n• Une consolidation automatisée des KPIs multi-projets\n• Une détection prédictive des dérives budgétaires et calendaires\n• Un alignement constant avec la stratégie d'entreprise\n• Des tableaux de bord exécutifs pour une prise de décision instantanée.",
        cta: { text: "Voir les Dashboards", link: "/dashboard" }
      },
      governance: {
        keywords: ["gouvernance", "governance", "règle", "norme", "conformité", "compliance", "standard"],
        response: "Une gouvernance PMO robuste est le socle de la réussite. Powalyze déploie des cadres de gouvernance sur-mesure (basés sur PMI/Prince2 mais agilisés) pour structurer sans rigidifier.\n\nNous intervenons sur :\n• La standardisation des processus (Stage-Gate, Agile, Hybride)\n• La gestion des risques et des opportunités\n• L'assurance qualité projet\n• La définition des instances décisionnelles (Comités de pilotage, Revues).",
        cta: { text: "Expertise Gouvernance", link: "/governance-risk" }
      },
      automation: {
        keywords: ["automatisation", "automation", "ia", "ai", "intelligence", "artificielle", "générative", "bot"],
        response: "L'Automation & l'IA sont au cœur de l'efficacité Powalyze. Nous libérons vos chefs de projets des tâches administratives à faible valeur ajoutée.\n\nExemples concrets :\n• **Reporting Automatisé** : Génération de Flash Reports sans intervention humaine.\n• **IA Prédictive** : Détection des signaux faibles de risques dans les comptes-rendus.\n• **Flux de travail** : Automatisation des validations et notifications via Power Automate et Logic Apps.",
        cta: { text: "Solutions Automation & AI", link: "/automation-ai" }
      },
      services: {
        keywords: ["service", "offre", "proposez", "prestation", "consulting", "accompagnement"],
        response: "Powalyze propose une gamme complète de services pour élever votre maturité projet :\n\n1. **PMO as a Service** : Externalisation partielle ou totale de votre fonction PMO.\n2. **Audit & Diagnostic** : Évaluation flash de votre santé portefeuille.\n3. **Implémentation BI** : Création de votre tour de contrôle (Power BI, Tableau).\n4. **Transformation Digitale** : Modernisation de vos outils (Jira, DevOps, Microsoft 365).",
        cta: { text: "Nos Expertises", link: "/strategic-pmo" }
      },
      usecases: {
        keywords: ["cas", "usage", "exemple", "bénéfice", "avantage", "client", "référence"],
        response: "Nos clients (Grands Comptes, Banques, Industrie) font appel à nous pour des enjeux critiques :\n\n• **Redressement de programmes** en difficulté.\n• **Fusion/Acquisition** : Harmonisation des portefeuilles IT post-fusion.\n• **Optimisation budgétaire** : Identification des 'projets zombies' et réallocation des ressources.\n• **Mise en conformité** réglementaire via une gouvernance stricte.",
        cta: { text: "Nos Réalisations", link: "/realizations/portfolio" }
      },
      pricing: {
        keywords: ["prix", "tarif", "coût", "combien", "pricing", "devis", "démo", "demo", "gratuit"],
        response: "Chaque organisation est unique. Nous proposons des modèles flexibles :\n\n• **Au forfait** pour des missions d'audit ou d'implémentation.\n• **En régie** pour du renfort PMO expert.\n• **Abonnement** pour le 'PMO as a Service'.\n\nLe mieux est de commencer par un échange gratuit de 30 minutes pour qualifier votre besoin.",
        cta: { text: "Réserver une démo", link: "/rendez-vous-gratuit", isPrimary: true }
      },
      start: {
        keywords: ["démarrer", "commencer", "start", "contact", "rendez-vous", "discuter"],
        response: "Pour démarrer, nous recommandons notre **Audit Flash**. C'est un échange sans engagement qui nous permet de comprendre vos douleurs actuelles et de vous proposer une feuille de route.\n\nVous pouvez réserver un créneau directement dans mon agenda.",
        cta: { text: "Prendre RDV", link: "/rendez-vous-gratuit", isPrimary: true }
      }
    }
  },
  en: {
    default: "I'm not sure I fully understood your specific request. For a precise answer tailored to your context, I invite you to contact our experts or rephrase your question.",
    greetings: [
      "Hello! I am the Powalyze virtual assistant. I am here to guide you towards operational excellence. How can I assist you today?",
      "Welcome to Powalyze. How can I help you with your PMO transformation today?"
    ],
    topics: {
      powalyze: {
        keywords: ["powalyze", "what is", "company", "platform", "about"],
        response: "Powalyze is a next-generation **Strategic PMO & Business Intelligence** platform. We transform the complexity of large IT programs into operational clarity.\n\nOur unique approach combines:\n• Senior PMO expertise (Governance, Risks, Processes)\n• The power of Data (BI, Analytics)\n• Intelligent Automation and AI\n\nWe help leaders secure their strategic investments.",
        cta: { text: "Discover our approach", link: "/a-propos" }
      },
      portfolio: {
        keywords: ["portfolio", "project", "management", "ppm", "track", "steering", "multi-project"],
        response: "Portfolio Management (PPM) at Powalyze is driven by a **Data-First** vision. We don't just track statuses; we analyze the actual health of your investments.\n\nOur solutions enable:\n• Automated consolidation of multi-project KPIs\n• Predictive detection of budget and schedule drifts\n• Constant alignment with corporate strategy\n• Executive dashboards for instant decision-making.",
        cta: { text: "View Dashboards", link: "/dashboard" }
      },
      governance: {
        keywords: ["governance", "rule", "standard", "compliance", "framework", "methodology"],
        response: "Robust PMO governance is the foundation of success. Powalyze deploys tailored governance frameworks (based on PMI/Prince2 but agile) to structure without rigidifying.\n\nWe intervene on:\n• Process standardization (Stage-Gate, Agile, Hybrid)\n• Risk and opportunity management\n• Project quality assurance\n• Definition of decision-making bodies (Steering Committees, Reviews).",
        cta: { text: "Governance Expertise", link: "/governance-risk" }
      },
      automation: {
        keywords: ["automation", "ai", "intelligence", "artificial", "generative", "bot", "tool"],
        response: "Automation & AI are at the heart of Powalyze efficiency. We free your project managers from low-value administrative tasks.\n\nConcrete examples:\n• **Automated Reporting**: Generation of Flash Reports without human intervention.\n• **Predictive AI**: Detection of weak risk signals in meeting minutes.\n• **Workflows**: Automation of validations and notifications via Power Automate and Logic Apps.",
        cta: { text: "Automation & AI Solutions", link: "/automation-ai" }
      },
      services: {
        keywords: ["service", "offer", "propose", "consulting", "support", "help"],
        response: "Powalyze offers a comprehensive range of services to elevate your project maturity:\n\n1. **PMO as a Service**: Partial or total outsourcing of your PMO function.\n2. **Audit & Diagnosis**: Flash assessment of your portfolio health.\n3. **BI Implementation**: Creation of your control tower (Power BI, Tableau).\n4. **Digital Transformation**: Modernization of your tools (Jira, DevOps, Microsoft 365).",
        cta: { text: "Our Expertise", link: "/strategic-pmo" }
      },
      usecases: {
        keywords: ["use case", "example", "benefit", "advantage", "client", "reference", "case study"],
        response: "Our clients (Major Accounts, Banks, Industry) call on us for critical challenges:\n\n• **Turnaround of distressed programs**.\n• **Mergers/Acquisitions**: Harmonization of post-merger IT portfolios.\n• **Budget Optimization**: Identification of 'zombie projects' and resource reallocation.\n• **Regulatory Compliance** via strict governance.",
        cta: { text: "Our Realizations", link: "/realizations/portfolio" }
      },
      pricing: {
        keywords: ["price", "cost", "pricing", "quote", "demo", "free", "rate"],
        response: "Every organization is unique. We offer flexible models:\n\n• **Fixed Price** for audit or implementation missions.\n• **Time & Materials** for expert PMO reinforcement.\n• **Subscription** for 'PMO as a Service'.\n\nThe best way is to start with a free 30-minute exchange to qualify your needs.",
        cta: { text: "Book a Demo", link: "/rendez-vous-gratuit", isPrimary: true }
      },
      start: {
        keywords: ["start", "begin", "contact", "meeting", "discuss", "roadmap"],
        response: "To get started, we recommend our **Flash Audit**. It's a non-binding exchange that allows us to understand your current pain points and propose a roadmap.\n\nYou can book a slot directly in my agenda.",
        cta: { text: "Schedule Call", link: "/rendez-vous-gratuit", isPrimary: true }
      }
    }
  }
};

const QUICK_QUESTIONS = {
  fr: [
    { id: 'q1', text: "Qu'est-ce que Powalyze ?", topic: 'powalyze' },
    { id: 'q2', text: "Comment piloter mon portefeuille ?", topic: 'portfolio' },
    { id: 'q3', text: "Qu'est-ce que la gouvernance PMO ?", topic: 'governance' },
    { id: 'q4', text: "Comment automatiser mes processus ?", topic: 'automation' },
    { id: 'q5', text: "Quels sont les services ?", topic: 'services' },
    { id: 'q6', text: "Cas d'usage et bénéfices", topic: 'usecases' },
    { id: 'q7', text: "Tarification et démo", topic: 'pricing' }
  ],
  en: [
    { id: 'q1', text: "What is Powalyze?", topic: 'powalyze' },
    { id: 'q2', text: "How to manage my portfolio?", topic: 'portfolio' },
    { id: 'q3', text: "What is PMO Governance?", topic: 'governance' },
    { id: 'q4', text: "How to automate processes?", topic: 'automation' },
    { id: 'q5', text: "What are the services?", topic: 'services' },
    { id: 'q6', text: "Use cases and benefits", topic: 'usecases' },
    { id: 'q7', text: "Pricing and demo", topic: 'pricing' }
  ]
};

// --- HELPER FUNCTIONS ---

const detectLanguage = (text, currentLang) => {
  const lowerText = text.toLowerCase();
  
  // Strong indicators for English
  const enIndicators = ['what', 'how', 'is', 'are', 'the', 'why', 'who', 'when', 'where', 'help', 'can', 'project', 'management', 'pricing', 'demo'];
  // Strong indicators for French
  const frIndicators = ['quoi', 'comment', 'est', 'sont', 'le', 'la', 'les', 'pourquoi', 'qui', 'quand', 'ou', 'aide', 'projet', 'gestion', 'prix', 'démo'];

  let enScore = 0;
  let frScore = 0;

  enIndicators.forEach(word => { if (lowerText.includes(word)) enScore++; });
  frIndicators.forEach(word => { if (lowerText.includes(word)) frScore++; });

  if (enScore > frScore) return 'en';
  if (frScore > enScore) return 'fr';
  
  // Default to current site language if ambiguous
  return currentLang === 'fr' || currentLang === 'en' ? currentLang : 'fr'; // fallback to FR if DE/IT/NO
};

const findTopic = (text, lang) => {
  const lowerText = text.toLowerCase();
  const topics = KNOWLEDGE_BASE[lang]?.topics || KNOWLEDGE_BASE['en'].topics;

  for (const [key, data] of Object.entries(topics)) {
    if (data.keywords.some(k => lowerText.includes(k))) {
      return data;
    }
  }
  return null;
};

// --- COMPONENT ---

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const { language } = useLanguage(); // "fr", "en", "de", etc.

  // Initialize with greeting
  useEffect(() => {
    if (messages.length === 0) {
      // Use "fr" or "en" greeting based on current site language. 
      // Fallback to "en" if other languages are selected for now, or add specific ones later.
      const chatLang = (language === 'fr') ? 'fr' : 'en';
      const greeting = KNOWLEDGE_BASE[chatLang].greetings[0];
      
      setMessages([
        { id: 'init', type: 'bot', text: greeting, lang: chatLang }
      ]);
    }
  }, [language, messages.length]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = async (text, predefinedTopic = null) => {
    if (!text.trim()) return;

    // 1. Add User Message
    const userMsg = { id: Date.now(), type: 'user', text: text };
    setMessages(prev => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    // 2. Determine Logic
    setTimeout(() => {
      // Detect language of the input, fallback to current site language
      // Note: If user is on DE site but types English, we reply English.
      // If user is on FR site but types English, we reply English.
      const detectedLang = detectLanguage(text, language);
      const kbLang = (detectedLang === 'fr') ? 'fr' : 'en'; // Force to FR or EN for chatbot logic

      let responseData = null;

      if (predefinedTopic) {
        // If user clicked a quick button
        responseData = KNOWLEDGE_BASE[kbLang].topics[predefinedTopic];
      } else {
        // Analyze text
        responseData = findTopic(text, kbLang);
      }

      // 3. Construct Bot Response
      let botText = "";
      let cta = null;

      if (responseData) {
        botText = responseData.response;
        cta = responseData.cta;
      } else {
        botText = KNOWLEDGE_BASE[kbLang].default;
        // If unknown, maybe suggest a demo
        if (kbLang === 'fr') cta = { text: "Contacter un expert", link: "/rendez-vous-gratuit" };
        else cta = { text: "Contact an Expert", link: "/rendez-vous-gratuit" };
      }

      const botMsg = { 
        id: Date.now() + 1, 
        type: 'bot', 
        text: botText, 
        cta: cta 
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200); // Slight natural delay
  };

  const currentQuickQuestions = (language === 'fr') ? QUICK_QUESTIONS.fr : QUICK_QUESTIONS.en;

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-[64px] h-[64px] bg-[#BFA76A] rounded-full shadow-[0_4px_20px_rgba(191,167,106,0.5)] flex items-center justify-center cursor-pointer group hover:bg-[#a8925b] transition-colors"
          >
            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
            <Bot size={32} className="text-black fill-black/10" strokeWidth={1.5} />
            
            {/* Notification Badge if unread (optional logic could go here) */}
            <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-[#0A0A0A]"></span>
            
            {/* Pulse effect */}
            <span className="absolute w-full h-full rounded-full border-2 border-[#BFA76A] animate-ping opacity-20 pointer-events-none"></span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-[100px] right-6 z-50 w-[400px] h-[600px] max-w-[calc(100vw-48px)] bg-[#0A0A0A] rounded-2xl shadow-2xl border border-[#BFA76A]/20 flex flex-col overflow-hidden backdrop-blur-sm"
          >
            {/* Header */}
            <div className="bg-[#111] p-4 flex justify-between items-center border-b border-[#BFA76A]/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#BFA76A] to-[#E6D5A8] flex items-center justify-center shadow-lg">
                  <Sparkles size={20} className="text-black" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-base tracking-wide">Powalyze AI</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-[11px] text-gray-400 font-medium">Assistant PMO • Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg"
              >
                <ChevronDown size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar bg-black/40">
              {messages.map((msg) => (
                <motion.div 
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className={`flex items-end gap-2 max-w-[85%] ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    {/* Avatar */}
                    <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center ${msg.type === 'user' ? 'bg-[#333]' : 'bg-[#BFA76A]'}`}>
                      {msg.type === 'user' ? <User size={12} className="text-white" /> : <Bot size={14} className="text-black" />}
                    </div>

                    {/* Bubble */}
                    <div 
                      className={`p-3.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line shadow-md ${
                        msg.type === 'user' 
                          ? 'bg-[#222] text-white rounded-tr-sm border border-white/5' 
                          : 'bg-[#151515] text-gray-100 rounded-tl-sm border border-[#BFA76A]/10'
                      }`}
                    >
                      {/* Message Text */}
                      <span dangerouslySetInnerHTML={{ 
                        __html: msg.text
                          .replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#BFA76A] font-semibold">$1</strong>') // Bold gold
                          .replace(/•/g, '<span class="text-[#BFA76A] mr-1">•</span>') // Gold bullets
                      }} />
                      
                      {/* CTA Button in Bot Message */}
                      {msg.type === 'bot' && msg.cta && (
                        <div className="mt-4 pt-3 border-t border-white/5">
                          <Link 
                            to={msg.cta.link}
                            className={`flex items-center justify-center gap-2 w-full py-2 px-4 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                              msg.cta.isPrimary 
                                ? 'bg-[#BFA76A] text-black hover:bg-[#d4be83]' 
                                : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                            }`}
                          >
                            {msg.cta.isPrimary ? <Calendar size={14} /> : <ExternalLink size={14} />}
                            {msg.cta.text}
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Timestamp/Status (Optional) */}
                  <span className={`text-[10px] text-gray-600 mt-1 px-10 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
                    {msg.type === 'user' ? 'Vous' : 'Assistant Powalyze'}
                  </span>
                </motion.div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start items-end gap-2">
                   <div className="w-6 h-6 rounded-full bg-[#BFA76A] flex-shrink-0 flex items-center justify-center">
                     <Bot size={14} className="text-black" />
                   </div>
                   <div className="bg-[#151515] px-4 py-3 rounded-2xl rounded-tl-sm border border-[#BFA76A]/10 flex gap-1.5 items-center h-[42px]">
                      <span className="w-1.5 h-1.5 bg-[#BFA76A] rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-[#BFA76A] rounded-full animate-bounce delay-100"></span>
                      <span className="w-1.5 h-1.5 bg-[#BFA76A] rounded-full animate-bounce delay-200"></span>
                   </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions (Horizontal Scroll) */}
            <div className="bg-[#111] border-t border-white/5 p-3">
              <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-2 px-1">
                {language === 'fr' ? 'Suggestions rapides' : 'Quick Suggestions'}
              </p>
              <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar mask-gradient-right">
                {currentQuickQuestions.map((q) => (
                  <button
                    key={q.id}
                    onClick={() => handleSendMessage(q.text, q.topic)}
                    className="whitespace-nowrap px-3 py-1.5 bg-[#1C1C1C] border border-white/10 rounded-lg text-[11px] text-gray-300 hover:text-[#BFA76A] hover:border-[#BFA76A]/50 transition-all flex-shrink-0 active:scale-95"
                  >
                    {q.text}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-[#111] border-t border-[#BFA76A]/10">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputText); }}
                className="flex gap-2 relative"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={language === 'fr' ? "Posez votre question..." : "Ask your question..."}
                  className="flex-1 bg-[#0A0A0A] text-white text-sm rounded-xl px-4 py-3 border border-white/10 focus:border-[#BFA76A] focus:ring-1 focus:ring-[#BFA76A]/50 focus:outline-none transition-all placeholder:text-gray-600"
                />
                <button 
                  type="submit"
                  disabled={!inputText.trim()}
                  className="bg-[#BFA76A] text-black p-3 rounded-xl hover:bg-[#d4be83] transition-colors disabled:opacity-50 disabled:cursor-not-allowed absolute right-1 top-1 bottom-1 aspect-square flex items-center justify-center shadow-sm"
                >
                  <Send size={18} strokeWidth={2} />
                </button>
              </form>
              <div className="text-center mt-2">
                <span className="text-[9px] text-gray-600 flex items-center justify-center gap-1">
                  Powered by Powalyze Intelligence <Sparkles size={8} />
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;