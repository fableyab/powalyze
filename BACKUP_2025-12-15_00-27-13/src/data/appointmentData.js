
import { 
  Shield, Target, BarChart, Bot, Layers, PieChart 
} from 'lucide-react';

export const appointmentServices = [
  {
    id: "srv_gov",
    title: { fr: "Audit Gouvernance IT", en: "IT Governance Audit", de: "IT-Governance Audit" },
    description: { fr: "Évaluation de maturité et recommandations stratégiques.", en: "Maturity assessment and strategic recommendations.", de: "Reifegradbewertung und strategische Empfehlungen." },
    duration: 60,
    price: 350,
    icon: Shield
  },
  {
    id: "srv_pmo",
    title: { fr: "Consultation PMO", en: "PMO Consultation", de: "PMO Beratung" },
    description: { fr: "Diagnostic de votre bureau de projets et roadmap.", en: "Diagnosis of your project office and roadmap.", de: "Diagnose Ihres Projektbüros und Roadmap." },
    duration: 45,
    price: 280,
    icon: Target
  },
  {
    id: "srv_bi",
    title: { fr: "Expertise Power BI", en: "Power BI Expertise", de: "Power BI Expertise" },
    description: { fr: "Revue d'architecture data et design de dashboards.", en: "Data architecture review and dashboard design.", de: "Überprüfung der Datenarchitektur und Dashboard-Design." },
    duration: 60,
    price: 300,
    icon: BarChart
  },
  {
    id: "srv_auto",
    title: { fr: "Automation Workshop", en: "Automation Workshop", de: "Automatisierungsworkshop" },
    description: { fr: "Identification des processus à automatiser (RPA/IA).", en: "Identification of processes to automate (RPA/AI).", de: "Identifizierung von zu automatisierenden Prozessen (RPA/KI)." },
    duration: 90,
    price: 450,
    icon: Bot
  },
  {
    id: "srv_port",
    title: { fr: "Revue de Portefeuille", en: "Portfolio Review", de: "Portfolio-Überprüfung" },
    description: { fr: "Session de priorisation et arbitrage de projets.", en: "Prioritization session and project arbitration.", de: "Priorisierungssitzung und Projektarbitrage." },
    duration: 120,
    price: 600,
    icon: Layers
  },
  {
    id: "srv_exec",
    title: { fr: "Coaching Exécutif", en: "Executive Coaching", de: "Führungskräfte-Coaching" },
    description: { fr: "Accompagnement pour DSI et Directeurs de Projets.", en: "Support for CIOs and Project Directors.", de: "Unterstützung für CIOs und Projektdirektoren." },
    duration: 60,
    price: 400,
    icon: PieChart
  }
];

export const consultants = [
  {
    id: "c_fabrice",
    name: "Fabrice Fays",
    role: "CEO & Senior PMO Expert",
    avatar: "FF",
    expertise: ["PMO", "Strategy", "Governance"],
    availability: "High" 
  },
  {
    id: "c_sarah",
    name: "Sarah Meyer",
    role: "Head of Data & BI",
    avatar: "SM",
    expertise: ["Power BI", "Data Architecture", "Analytics"],
    availability: "Medium"
  },
  {
    id: "c_marc",
    name: "Marc Weber",
    role: "Automation Lead",
    avatar: "MW",
    expertise: ["Power Automate", "AI", "Process Optimization"],
    availability: "Low"
  }
];

export const timeSlots = [
  "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"
];
