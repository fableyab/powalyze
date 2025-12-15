import { 
  Users, TrendingUp, AlertTriangle, CheckCircle, Clock, 
  DollarSign, Activity, Target, PieChart, BarChart2 
} from 'lucide-react';

export const demoData = {
  kpis: [
    { id: 1, label: "Revenue", value: "CHF 12.5M", change: "+12%", trend: "up", icon: DollarSign, color: "text-green-500" },
    { id: 2, label: "Net Margin", value: "18.5%", change: "+2.3%", trend: "up", icon: TrendingUp, color: "text-green-500" },
    { id: 3, label: "Active Projects", value: "47", change: "-3", trend: "down", icon: Activity, color: "text-blue-500" },
    { id: 4, label: "Client Satisfaction", value: "9.2/10", change: "+0.4", trend: "up", icon: Users, color: "text-[#BFA76A]" },
    { id: 5, label: "Success Rate", value: "94%", change: "+5%", trend: "up", icon: CheckCircle, color: "text-green-500" },
    { id: 6, label: "Avg. Delay", value: "8.2 days", change: "-15%", trend: "down", icon: Clock, color: "text-green-500" } // Down is good for delay
  ],
  
  projects: [
    { id: 101, name: "Digital Transformation Alpha", manager: "J. Doe", status: "On Track", progress: 75, budget: 1200000, spent: 850000, risk: "Low", sector: "Finance" },
    { id: 102, name: "Cloud Migration Beta", manager: "A. Smith", status: "At Risk", progress: 45, budget: 800000, spent: 500000, risk: "High", sector: "IT" },
    { id: 103, name: "ERP Upgrade Gamma", manager: "M. Brown", status: "Delayed", progress: 90, budget: 2500000, spent: 2600000, risk: "Critical", sector: "Industry" },
    { id: 104, name: "CRM Implementation", manager: "S. Wilson", status: "On Track", progress: 30, budget: 450000, spent: 120000, risk: "Low", sector: "Services" },
    { id: 105, name: "Data Warehouse Build", manager: "K. Taylor", status: "On Track", progress: 60, budget: 600000, spent: 350000, risk: "Medium", sector: "IT" },
  ],

  salesByRegion: [
    { name: "Geneva", value: 4500000 },
    { name: "Zurich", value: 3800000 },
    { name: "Lausanne", value: 2100000 },
    { name: "Basel", value: 1200000 },
    { name: "Bern", value: 900000 },
  ],

  customerSegments: [
    { name: "Premium", value: 35, color: "#BFA76A" },
    { name: "Enterprise", value: 45, color: "#3A7BFF" },
    { name: "Standard", value: 20, color: "#666666" },
  ],

  forecastData: [
    { month: 'Jan', actual: 4000, forecast: 4100 },
    { month: 'Feb', actual: 3000, forecast: 3200 },
    { month: 'Mar', actual: 2000, forecast: 2400 },
    { month: 'Apr', actual: 2780, forecast: 2900 },
    { month: 'May', actual: 1890, forecast: 2100 },
    { month: 'Jun', actual: 2390, forecast: 2500 },
    { month: 'Jul', actual: 3490, forecast: 3600 },
  ],

  riskMatrix: [
    { x: 1, y: 1, z: 2, label: "L1" }, // Low Prob, Low Impact
    { x: 1, y: 2, z: 5, label: "L2" },
    { x: 2, y: 2, z: 10, label: "M1" },
    { x: 3, y: 2, z: 15, label: "H1" }, // High Prob, Med Impact
    { x: 3, y: 3, z: 25, label: "C1" }, // High Prob, High Impact
  ],

  testimonials: [
    { 
      id: 1, 
      quote: "Powalyze a transformé notre visibilité sur les projets critiques. Nous avons réduit nos retards de 35% en 6 mois.", 
      name: "Thomas R.", 
      role: "CTO", 
      company: "Swiss Tech Solutions", 
      rating: 5 
    },
    { 
      id: 2, 
      quote: "Les dashboards exécutifs nous permettent enfin de piloter la stratégie avec des données réelles, pas des intuitions.", 
      name: "Sarah L.", 
      role: "VP Finance", 
      company: "Global Banking Group", 
      rating: 5 
    },
    { 
      id: 3, 
      quote: "L'intégration Power BI est transparente. C'est l'outil de reporting le plus puissant que nous ayons utilisé.", 
      name: "Marc D.", 
      role: "Project Director", 
      company: "PharmaCorp", 
      rating: 5 
    }
  ],
  
  impactMetrics: [
    { label: "Reporting Time", before: "40h/mo", after: "4h/mo", improvement: "90%" },
    { label: "Data Accuracy", before: "78%", after: "99.9%", improvement: "28%" },
    { label: "Decision Speed", before: "Days", after: "Real-time", improvement: "Instant" }
  ]
};