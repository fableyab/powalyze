import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Target, Zap, Users, TrendingUp, Calendar, FileText, Settings, Activity, AlertTriangle, CheckCircle, X, Filter, Search, GripVertical } from 'lucide-react';
import { useCockpitData } from "../../hooks/useCockpitData";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const kpis = [
  { label: "% On Track", value: "72%", accent: "bg-emerald-400" },
  { label: "Budget utilisé", value: "61%", accent: "bg-amber-400" },
  { label: "Alignement stratégique", value: "88%", accent: "bg-sky-400" }
];

const committees = [
  {
    name: "Comité Portefeuille Stratégique",
    date: "Jeu 24 Oct",
    time: "09:00 – 10:30",
    decisions: 7,
    status: "Préparé",
    progress: 76
  },
  {
    name: "Comité Risques & Conformité",
    date: "Lun 28 Oct",
    time: "14:00 – 15:30",
    decisions: 5,
    status: "En préparation",
    progress: 48
  },
  {
    name: "Board Q4 Transformation",
    date: "Mar 05 Nov",
    time: "16:00 – 18:00",
    decisions: 9,
    status: "À cadrer",
    progress: 22
  }
];

const projectsColumns = [
  {
    id: "strategic",
    title: "Stratégique",
    color: "from-emerald-400/40 to-emerald-500/10",
    items: [
      {
        name: "Programme Digital Core",
        owner: "PMO Central",
        budget: "1.2 M€",
        risk: "low"
      },
      {
        name: "Modernisation Data Platform",
        owner: "Direction Data",
        budget: "850 k€",
        risk: "medium"
      }
    ]
  },
  {
    id: "inprogress",
    title: "En cours",
    color: "from-sky-400/40 to-sky-500/10",
    items: [
      {
        name: "Refonte Portail Clients",
        owner: "IT Delivery",
        budget: "540 k€",
        risk: "low"
      },
      {
        name: "Automatisation Reporting KPIs",
        owner: "PMO",
        budget: "210 k€",
        risk: "low"
      },
      {
        name: "Migration Cloud Applicative",
        owner: "Infra & Cloud",
        budget: "930 k€",
        risk: "medium"
      }
    ]
  },
  {
    id: "atrisk",
    title: "À risque",
    color: "from-amber-400/40 to-amber-500/10",
    items: [
      {
        name: "Programme ERP Groupe",
        owner: "Finance & IT",
        budget: "2.4 M€",
        risk: "high"
      },
      {
        name: "Convergence Outils Legacy",
        owner: "Architecture",
        budget: "390 k€",
        risk: "high"
      }
    ]
  },
  {
    id: "onhold",
    title: "En pause",
    color: "from-slate-400/30 to-slate-700/10",
    items: [
      {
        name: "Pilote IA PMO",
        owner: "Innovation",
        budget: "120 k€",
        risk: "medium"
      }
    ]
  }
];

const decisionsFeed = [
  {
    title: "Valider budget additionnel – ERP Groupe",
    owner: "CFO & CIO",
    due: "Aujourd'hui",
    status: "À arbitrer"
  },
  {
    title: "Confirmer scope phase 2 – Digital Core",
    owner: "Comité Portefeuille",
    due: "Demain",
    status: "En préparation"
  },
  {
    title: "Clôturer risque majeur – Migration Cloud",
    owner: "Risk Officer",
    due: "Dans 3 jours",
    status: "En cours"
  },
  {
    title: "Prioriser backlog – Portail Clients",
    owner: "Product Owner",
    due: "Cette semaine",
    status: "À planifier"
  }
];

function riskDot(risk) {
  if (risk === "low") return "bg-emerald-400";
  if (risk === "medium") return "bg-amber-400";
  return "bg-rose-500";
}

// Phase 3: Draggable Project Card Component
function DraggableProjectCard({ item, columnId, onClick }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: `${columnId}-${item.name}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      className="group relative cursor-pointer rounded-xl border border-white/10 bg-black/40 p-2 backdrop-blur-sm"
      whileHover={{ y: -2, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      onClick={() => onClick(item)}
    >
      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute left-1 top-1/2 -translate-y-1/2 cursor-grab opacity-0 transition-opacity group-hover:opacity-100 active:cursor-grabbing"
      >
        <GripVertical className="h-4 w-4 text-white/40" />
      </div>
      
      <div className="pl-5">
        <div className="mb-1 text-[11px] font-medium text-white line-clamp-2">
          {item.name}
        </div>
        <div className="mb-1 flex items-center gap-1.5 text-[9px] text-white/60">
          <span>{item.owner}</span>
          <span>•</span>
          <span>{item.budget}</span>
        </div>
        <div className="flex items-center gap-1">
          <div className={`h-1.5 w-1.5 rounded-full ${riskDot(item.risk)}`} />
          <span className="text-[9px] uppercase text-white/50">
            {item.risk}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// Phase 3: Project Detail Modal Component
function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative w-full max-w-2xl rounded-3xl border border-white/20 bg-gradient-to-br from-[#050A12] to-[#0A0A20] p-8 shadow-2xl"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full border border-white/10 bg-white/5 p-2 transition-all hover:bg-white/10"
          >
            <X className="h-5 w-5 text-white" />
          </button>

          {/* Project header */}
          <div className="mb-6">
            <div className="mb-2 flex items-center gap-2">
              <div className={`h-3 w-3 rounded-full ${riskDot(project.risk)}`} />
              <span className="text-sm uppercase tracking-wider text-white/50">
                Project Details
              </span>
            </div>
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF]">
              {project.name}
            </h2>
          </div>

          {/* Project info grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <div className="mb-1 text-xs uppercase tracking-wider text-white/50">Owner</div>
              <div className="text-lg font-semibold text-white">{project.owner}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <div className="mb-1 text-xs uppercase tracking-wider text-white/50">Budget</div>
              <div className="text-lg font-semibold text-white">{project.budget}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <div className="mb-1 text-xs uppercase tracking-wider text-white/50">Risk Level</div>
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${riskDot(project.risk)}`} />
                <span className="text-lg font-semibold capitalize text-white">{project.risk}</span>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <div className="mb-1 text-xs uppercase tracking-wider text-white/50">Status</div>
              <div className="text-lg font-semibold text-white">Active</div>
            </div>
          </div>

          {/* Mock progress */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-white/70">Overall Progress</span>
              <span className="text-sm font-bold text-white">67%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#D4AF37] to-emerald-400"
                initial={{ width: 0 }}
                animate={{ width: '67%' }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>

          {/* Mock timeline */}
          <div className="mt-6">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/70">
              Recent Activity
            </h3>
            <div className="space-y-2">
              {[
                { action: 'Budget approved', date: '2 days ago', user: 'CFO' },
                { action: 'Phase 2 started', date: '5 days ago', user: 'PMO Lead' },
                { action: 'Kickoff meeting', date: '1 week ago', user: 'Project Manager' },
              ].map((activity, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-lg border border-white/5 bg-white/5 p-3 text-sm"
                >
                  <div>
                    <div className="font-medium text-white">{activity.action}</div>
                    <div className="text-xs text-white/50">{activity.user}</div>
                  </div>
                  <div className="text-xs text-white/50">{activity.date}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function DashboardRevolutionary() {
  const canvasRef = useRef(null);
  const [particles, setParticles] = useState([]);
  
  // Data intégration avec Supabase
  const { signal, health, milestones, decisions, capacity, focus, tensions, projects, loading } = useCockpitData();
  
  // Phase 3 States
  const [selectedProject, setSelectedProject] = useState(null); // Modal state
  const [searchTerm, setSearchTerm] = useState(''); // Search filter
  const [statusFilter, setStatusFilter] = useState('all'); // Status filter
  const [riskFilter, setRiskFilter] = useState('all'); // Risk filter
  
  // Map projects to Kanban columns based on status and risk
  const mapProjectsToColumns = (projectsData) => {
    if (!projectsData || projectsData.length === 0) return projectsColumns;
    
    const strategic = [];
    const inprogress = [];
    const atrisk = [];
    const onhold = [];
    
    projectsData.forEach(project => {
      const item = {
        name: project.name,
        owner: project.owner || "N/A",
        budget: project.budget ? `${(project.budget / 1000).toFixed(0)} k€` : "N/A",
        risk: project.risk_level || "medium"
      };
      
      // Map based on status and risk
      if (project.status === "on_hold" || project.status === "paused") {
        onhold.push(item);
      } else if (project.risk_level === "high" || project.risk_level === "critical") {
        atrisk.push(item);
      } else if (project.strategic_priority === "high" || project.strategic_priority === "critical") {
        strategic.push(item);
      } else {
        inprogress.push(item);
      }
    });
    
    return [
      { id: "strategic", title: "Stratégique", color: "from-emerald-400/40 to-emerald-500/10", items: strategic.length > 0 ? strategic : projectsColumns[0].items },
      { id: "inprogress", title: "En cours", color: "from-sky-400/40 to-sky-500/10", items: inprogress.length > 0 ? inprogress : projectsColumns[1].items },
      { id: "atrisk", title: "À risque", color: "from-amber-400/40 to-amber-500/10", items: atrisk.length > 0 ? atrisk : projectsColumns[2].items },
      { id: "onhold", title: "En pause", color: "from-slate-400/30 to-slate-700/10", items: onhold.length > 0 ? onhold : projectsColumns[3].items }
    ];
  };
  
  const portfolioColumns = mapProjectsToColumns(projects);
  
  // Phase 3: Drag & Drop handlers
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const [kanbanColumns, setKanbanColumns] = useState(portfolioColumns);
  
  // Update kanban when projects change
  useEffect(() => {
    setKanbanColumns(mapProjectsToColumns(projects));
  }, [projects]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (!over) return;
    
    const activeId = active.id;
    const overId = over.id;
    
    // Extract column and item info
    const [activeCol, activeItem] = activeId.split('-').slice(0, 2);
    const [overCol, overItem] = overId.split('-').slice(0, 2);
    
    if (activeCol === overCol) {
      // Reordering within same column
      const columnIndex = kanbanColumns.findIndex(col => col.id === activeCol);
      const column = kanbanColumns[columnIndex];
      const oldIndex = column.items.findIndex(item => item.name === activeItem);
      const newIndex = column.items.findIndex(item => item.name === overItem);
      
      if (oldIndex !== newIndex) {
        const newItems = arrayMove(column.items, oldIndex, newIndex);
        const newColumns = [...kanbanColumns];
        newColumns[columnIndex] = { ...column, items: newItems };
        setKanbanColumns(newColumns);
      }
    } else {
      // Moving between columns
      const sourceColIndex = kanbanColumns.findIndex(col => col.id === activeCol);
      const targetColIndex = kanbanColumns.findIndex(col => col.id === overCol);
      
      const sourceCol = kanbanColumns[sourceColIndex];
      const targetCol = kanbanColumns[targetColIndex];
      
      const itemIndex = sourceCol.items.findIndex(item => item.name === activeItem);
      const item = sourceCol.items[itemIndex];
      
      const newSourceItems = sourceCol.items.filter((_, idx) => idx !== itemIndex);
      const newTargetItems = [...targetCol.items, item];
      
      const newColumns = [...kanbanColumns];
      newColumns[sourceColIndex] = { ...sourceCol, items: newSourceItems };
      newColumns[targetColIndex] = { ...targetCol, items: newTargetItems };
      setKanbanColumns(newColumns);
      
      // TODO: Update Supabase with new status
      console.log(`Moved ${item.name} from ${activeCol} to ${overCol}`);
    }
  };

  // Phase 3: Filter logic
  const filteredColumns = kanbanColumns.map(col => ({
    ...col,
    items: col.items.filter(item => {
      // Search filter
      if (searchTerm && !item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      // Risk filter
      if (riskFilter !== 'all' && item.risk !== riskFilter) {
        return false;
      }
      // Status filter (column-based)
      if (statusFilter !== 'all' && col.id !== statusFilter) {
        return false;
      }
      return true;
    })
  }));
  
  // Particle field background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Create particles
    const particleCount = 60;
    const particlesArray = [];
    
    for (let i = 0; i < particleCount; i++) {
      particlesArray.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 1,
        color: Math.random() > 0.5 ? 'rgba(212, 175, 55, 0.6)' : 'rgba(74, 158, 255, 0.5)'
      });
    }
    
    setParticles(particlesArray);
    
    // Animation loop
    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesArray.forEach((particle, i) => {
        // Move particle
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Draw connections
        particlesArray.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(212, 175, 55, ${0.15 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => cancelAnimationFrame(animationId);
  }, []);

  const navItems = [
    { label: "Vue", icon: Activity },
    { label: "Portfolio", icon: Target },
    { label: "Comités", icon: Calendar },
    { label: "KPIs", icon: TrendingUp },
    { label: "Risques", icon: AlertTriangle },
    { label: "Stratégie", icon: FileText },
    { label: "Settings", icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-[#050A12] text-white">
      {/* Particle Field Background */}
      <canvas 
        ref={canvasRef}
        className="fixed inset-0 -z-20 pointer-events-none"
        style={{ opacity: 0.4 }}
      />
      
      {/* Fond dynamique avec volumetric lighting */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#050A12] via-[#050A20] to-black" />
        
        {/* Volumetric light beams */}
        <div className="absolute left-[-20%] top-[-30%] h-[600px] w-[600px] rounded-full bg-[#D4AF37]/20 blur-[120px] animate-pulse" 
             style={{ animationDuration: '8s' }} />
        <div className="absolute right-[-15%] top-[10%] h-[500px] w-[500px] rounded-full bg-[#4A9EFF]/15 blur-[100px] animate-pulse" 
             style={{ animationDuration: '10s', animationDelay: '2s' }} />
        <div className="absolute left-[30%] bottom-[-20%] h-[700px] w-[700px] rounded-full bg-[#1E3A8A]/25 blur-[130px] animate-pulse" 
             style={{ animationDuration: '12s', animationDelay: '4s' }} />
        
        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(212,175,55,0.12),_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,_rgba(74,158,255,0.1),_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,_rgba(30,58,138,0.15),_transparent_60%)]" />
      </div>

      <div className="flex h-screen">
        {/* Navigation verticale gauche */}
        <aside className="flex w-20 flex-col items-center border-r border-white/10 bg-black/30 pb-6 pt-4 backdrop-blur-xl">
          <div className="mb-10 mt-2 flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#D4AF37] to-[#FDE68A] text-xs font-bold text-black shadow-[0_0_35px_rgba(212,175,55,0.8)]">
            PZ
          </div>
          <nav className="flex flex-1 flex-col items-center gap-4 text-[10px] uppercase tracking-[0.12em] text-white/50">
            {navItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.label}
                  className={`flex h-12 w-12 flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[9px] ${
                    i === 0 ? "text-[#D4AF37] border-[#D4AF37]/60 shadow-[0_0_25px_rgba(212,175,55,0.5)]" : ""
                  }`}
                  whileHover={{ y: -3, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  <Icon className="mb-1 h-4 w-4" />
                  <span className="text-[8px]">{item.label}</span>
                </motion.button>
              );
            })}
          </nav>
        </aside>

        {/* Contenu principal */}
        <div className="flex flex-1 flex-col">
          {/* Header top */}
          <header className="flex items-center justify-between border-b border-white/10 bg-black/25 px-8 py-4 backdrop-blur-xl">
            <div>
              <div className="text-xs font-semibold tracking-[0.25em] text-[#D4AF37] uppercase">
                Powalyze
              </div>
              <div className="mt-1 text-sm text-white/70">
                Le système d'exploitation de votre gouvernance, PMO et Data.
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Modes */}
              <div className="flex items-center gap-1 rounded-full border border-white/15 bg-white/5 p-1 text-[11px]">
                {["Board", "PMO", "Data"].map((mode, i) => (
                  <button
                    key={mode}
                    className={`rounded-full px-3 py-1 ${
                      i === 1
                        ? "bg-[#D4AF37] text-black shadow-[0_0_25px_rgba(212,175,55,0.7)]"
                        : "text-white/70"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
              {/* Profil */}
              <div className="flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/70">
                <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-500" />
                <div className="pr-2">
                  <div className="text-[11px] font-medium">Fabrice – PMO & Data</div>
                  <div className="text-[10px] text-white/50">Espace Gouvernance Exécutive</div>
                </div>
              </div>
            </div>
          </header>

          {/* Phase 3: Filtres dynamiques */}
          <div className="flex items-center gap-4 border-b border-white/5 bg-black/20 px-8 py-3 backdrop-blur-xl">
            {/* Search */}
            <div className="flex flex-1 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
              <Search className="h-4 w-4 text-white/40" />
              <input
                type="text"
                placeholder="Rechercher un projet..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-transparent text-sm text-white placeholder-white/40 outline-none"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="text-white/40 hover:text-white">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Risk Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-white/40" />
              <select
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value)}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none backdrop-blur-sm"
              >
                <option value="all">All Risks</option>
                <option value="low">Low Risk</option>
                <option value="medium">Medium Risk</option>
                <option value="high">High Risk</option>
              </select>
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none backdrop-blur-sm"
            >
              <option value="all">All Status</option>
              <option value="strategic">Stratégique</option>
              <option value="inprogress">En cours</option>
              <option value="atrisk">À risque</option>
              <option value="onhold">En pause</option>
            </select>

            {/* Clear filters */}
            {(searchTerm || riskFilter !== 'all' || statusFilter !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setRiskFilter('all');
                  setStatusFilter('all');
                }}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white hover:bg-white/10"
              >
                Clear
              </button>
            )}
          </div>

          {/* Corps */}
          <main className="flex flex-1 gap-4 overflow-hidden px-6 py-4">
            {/* Colonne centrale (gauche + milieu) */}
            <div className="flex flex-[3] flex-col gap-4">
              {/* Ligne supérieure : Vue d'ensemble + Comités */}
              <div className="flex gap-4">
                {/* Vue d'ensemble gouvernance */}
                <motion.section
                  className="flex flex-1 flex-col rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-2xl"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <h2 className="text-sm font-semibold text-white">Vue d'ensemble de la gouvernance</h2>
                      <p className="text-[11px] text-white/60">
                        Santé du portefeuille, capacité d'exécution, risques majeurs.
                      </p>
                    </div>
                    <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-[10px] text-emerald-300">
                      Portefeuille global · Semaine en cours
                    </span>
                  </div>

                  {/* KPIs */}
                  <div className="mb-4 flex gap-2">
                    {loading ? (
                      <div className="flex-1 text-center text-white/40 py-4">Loading...</div>
                    ) : (
                      <>
                        <div className="flex flex-1 items-center gap-2 rounded-2xl border border-white/10 bg-black/30 px-3 py-2">
                          <div className="h-6 w-1.5 rounded-full bg-emerald-400" />
                          <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-[0.12em] text-white/50">
                              % On Track
                            </span>
                            <span className="text-sm font-semibold text-white tabular-nums">
                              {health.avg_progress ? Math.round(health.avg_progress) : 72}%
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-1 items-center gap-2 rounded-2xl border border-white/10 bg-black/30 px-3 py-2">
                          <div className="h-6 w-1.5 rounded-full bg-amber-400" />
                          <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-[0.12em] text-white/50">
                              Budget utilisé
                            </span>
                            <span className="text-sm font-semibold text-white tabular-nums">
                              {health.risk_score ? Math.round(health.risk_score) : 61}%
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-1 items-center gap-2 rounded-2xl border border-white/10 bg-black/30 px-3 py-2">
                          <div className="h-6 w-1.5 rounded-full bg-sky-400" />
                          <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-[0.12em] text-white/50">
                              Alignement stratégique
                            </span>
                            <span className="text-sm font-semibold text-white tabular-nums">
                              {health.commitments ? Math.round(health.commitments) : 88}%
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Graphique simplifié */}
                  <div className="relative flex-1 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-black/40 px-3 py-3">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.28),_transparent_60%)] opacity-40" />
                    {/* Axes */}
                    <div className="relative flex h-full flex-col justify-between text-[9px] text-white/30">
                      {[100, 75, 50, 25, 0].map((val) => (
                        <div key={val} className="flex items-center gap-1">
                          <span className="w-7 text-right">{val}</span>
                          <div className="h-px flex-1 bg-gradient-to-r from-white/20 via-white/5 to-transparent" />
                        </div>
                      ))}
                    </div>
                    {/* Courbes stylisées */}
                    <svg className="pointer-events-none absolute inset-0" viewBox="0 0 400 200" preserveAspectRatio="none">
                      <polyline
                        fill="none"
                        stroke="rgba(56,189,248,0.7)"
                        strokeWidth="2"
                        points="40,150 100,120 160,130 220,110 280,105 340,80 400,90"
                      />
                      <polyline
                        fill="none"
                        stroke="rgba(212,175,55,0.9)"
                        strokeWidth="2.2"
                        points="40,160 100,135 160,125 220,95 280,85 340,70 400,60"
                      />
                      <polyline
                        fill="none"
                        stroke="rgba(248,250,252,0.6)"
                        strokeWidth="1.6"
                        strokeDasharray="4 3"
                        points="40,170 100,150 160,140 220,130 280,115 340,100 400,95"
                      />
                    </svg>
                    {/* Légende */}
                    <div className="absolute bottom-2 left-3 flex gap-4 text-[10px] text-white/70">
                      <div className="flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-sky-400" /> Capacité
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" /> Santé portefeuille
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-100" /> Engagements
                      </div>
                    </div>
                  </div>
                </motion.section>

                {/* Comités à venir */}
                <motion.section
                  className="flex w-80 flex-col rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-2xl"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <h2 className="text-sm font-semibold text-white">Comités à venir</h2>
                      <p className="text-[11px] text-white/60">
                        Agenda, décisions et préparation.
                      </p>
                    </div>
                    <span className="rounded-full bg-white/10 px-2 py-1 text-[10px] text-white/70">
                      Semaine + 2
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-3">
                    {loading ? (
                      <div className="text-center text-white/40 py-4">Loading...</div>
                    ) : (milestones && milestones.length > 0 ? milestones.slice(0, 3) : committees).map((c, idx) => (
                      <motion.div
                        key={c.name || c.id}
                        className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-3"
                        whileHover={{ y: -2, scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ transitionDelay: `${idx * 0.1}s` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-[#D4AF37]/10 opacity-0 transition-opacity hover:opacity-100" />
                        <div className="relative flex flex-col gap-1">
                          <div className="flex items-center justify-between gap-2">
                            <div className="text-[11px] font-medium text-white">
                              {c.name || c.title}
                            </div>
                            <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[9px] text-emerald-300">
                              {c.status}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] text-white/60">
                            <span>{c.date || (c.due_date ? new Date(c.due_date).toLocaleDateString() : "TBD")}</span>
                            <span>{c.time || "09:00 – 10:30"}</span>
                            <span>{c.decisions || "N/A"} décisions</span>
                          </div>
                          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                            <motion.div
                              className="h-full rounded-full bg-gradient-to-r from-[#D4AF37] to-emerald-400"
                              initial={{ width: 0 }}
                              animate={{ width: `${c.progress || 50}%` }}
                              transition={{ duration: 1, delay: idx * 0.1 }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>
              </div>

              {/* PHASE 2: REVOLUTIONARY VISUALS */}
              
              {/* 3D Glass Sphere - Portfolio Health */}
              <motion.section
                className="relative mx-auto my-6 flex h-96 w-full max-w-5xl items-center justify-center overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-white/5 to-white/10 p-8 backdrop-blur-3xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {/* 3D Sphere avec CSS 3D transforms */}
                <div 
                  className="relative h-72 w-72"
                  style={{ 
                    perspective: '1000px',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  {/* Sphere layers */}
                  {[0, 1, 2, 3, 4].map((layer) => (
                    <motion.div
                      key={layer}
                      className="absolute inset-0 rounded-full border-2 border-[#D4AF37]/30 bg-gradient-to-br from-[#D4AF37]/10 to-[#4A9EFF]/10 backdrop-blur-xl"
                      style={{
                        transform: `rotateY(${layer * 36}deg) translateZ(${layer * 20}px)`,
                        transformStyle: 'preserve-3d'
                      }}
                      animate={{
                        rotateY: [layer * 36, layer * 36 + 360],
                      }}
                      transition={{
                        duration: 20 + layer * 5,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  ))}
                  
                  {/* Center content - Portfolio Health */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                    <motion.div
                      className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#D4AF37] to-[#4A9EFF]"
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      {loading ? "..." : (health?.avg_progress ? Math.round(health.avg_progress) : 94)}%
                    </motion.div>
                    <div className="mt-2 text-sm uppercase tracking-[0.2em] text-white/70">
                      Portfolio Health
                    </div>
                    <div className="mt-4 flex gap-3">
                      <div className="flex flex-col items-center rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 backdrop-blur-sm">
                        <div className="text-xs text-white/60">On Track</div>
                        <div className="text-lg font-semibold text-emerald-400">72%</div>
                      </div>
                      <div className="flex flex-col items-center rounded-xl border border-amber-400/30 bg-amber-400/10 px-3 py-2 backdrop-blur-sm">
                        <div className="text-xs text-white/60">At Risk</div>
                        <div className="text-lg font-semibold text-amber-400">18%</div>
                      </div>
                      <div className="flex flex-col items-center rounded-xl border border-rose-400/30 bg-rose-400/10 px-3 py-2 backdrop-blur-sm">
                        <div className="text-xs text-white/60">Blocked</div>
                        <div className="text-lg font-semibold text-rose-400">10%</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 -z-10 animate-pulse rounded-full bg-gradient-to-br from-[#D4AF37]/30 to-[#4A9EFF]/30 blur-3xl" 
                       style={{ animationDuration: '4s' }} />
                </div>
              </motion.section>

              {/* Portfolio Map avec Golden Threads SVG */}
              <motion.section
                className="relative mx-auto my-6 h-[500px] w-full max-w-5xl overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-black/40 to-black/60 p-8 backdrop-blur-3xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-white">Portfolio Map</h2>
                    <p className="text-xs text-white/60">Strategic initiatives network</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex items-center gap-1.5 text-xs">
                      <div className="h-2 w-2 rounded-full bg-emerald-400" />
                      <span className="text-white/70">Strategic</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs">
                      <div className="h-2 w-2 rounded-full bg-sky-400" />
                      <span className="text-white/70">Active</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs">
                      <div className="h-2 w-2 rounded-full bg-amber-400" />
                      <span className="text-white/70">At Risk</span>
                    </div>
                  </div>
                </div>
                
                {/* SVG Map with golden threads */}
                <svg className="h-full w-full" viewBox="0 0 800 400">
                  <defs>
                    {/* Golden gradient for connections */}
                    <linearGradient id="goldenThread" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#4A9EFF" stopOpacity="0.6" />
                    </linearGradient>
                    
                    {/* Glow filter */}
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  
                  {/* Golden thread connections */}
                  <motion.path
                    d="M 100 200 Q 200 150 300 180"
                    stroke="url(#goldenThread)"
                    strokeWidth="2"
                    fill="none"
                    filter="url(#glow)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                  <motion.path
                    d="M 300 180 Q 400 160 500 200"
                    stroke="url(#goldenThread)"
                    strokeWidth="2"
                    fill="none"
                    filter="url(#glow)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.7 }}
                  />
                  <motion.path
                    d="M 300 180 Q 350 280 500 300"
                    stroke="url(#goldenThread)"
                    strokeWidth="2"
                    fill="none"
                    filter="url(#glow)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.9 }}
                  />
                  <motion.path
                    d="M 500 200 Q 600 180 700 220"
                    stroke="url(#goldenThread)"
                    strokeWidth="2"
                    fill="none"
                    filter="url(#glow)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 1.1 }}
                  />
                  <motion.path
                    d="M 500 300 Q 600 280 700 300"
                    stroke="url(#goldenThread)"
                    strokeWidth="2"
                    fill="none"
                    filter="url(#glow)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 1.3 }}
                  />
                  
                  {/* Project nodes */}
                  {[
                    { x: 100, y: 200, label: "Digital Core", color: "#10B981", size: 24 },
                    { x: 300, y: 180, label: "Data Platform", color: "#10B981", size: 22 },
                    { x: 500, y: 200, label: "Cloud Migration", color: "#38BFF8", size: 20 },
                    { x: 700, y: 220, label: "ERP Groupe", color: "#F59E0B", size: 26 },
                    { x: 500, y: 300, label: "Portal Clients", color: "#38BFF8", size: 18 },
                    { x: 700, y: 300, label: "AI PMO", color: "#94A3B8", size: 16 },
                  ].map((node, idx) => (
                    <motion.g
                      key={idx}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 + idx * 0.1 }}
                      whileHover={{ scale: 1.2 }}
                    >
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={node.size}
                        fill={node.color}
                        fillOpacity="0.3"
                        stroke={node.color}
                        strokeWidth="2"
                        filter="url(#glow)"
                        className="cursor-pointer"
                      />
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={node.size / 2}
                        fill={node.color}
                        fillOpacity="0.8"
                        className="cursor-pointer"
                      />
                      <text
                        x={node.x}
                        y={node.y - node.size - 8}
                        textAnchor="middle"
                        fill="white"
                        fontSize="11"
                        fontWeight="600"
                        className="pointer-events-none"
                      >
                        {node.label}
                      </text>
                    </motion.g>
                  ))}
                </svg>
              </motion.section>

              {/* Holographic Timeline Multi-Layered */}
              <motion.section
                className="relative mx-auto my-6 h-96 w-full max-w-5xl overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-purple-950/30 to-pink-950/30 p-8 backdrop-blur-3xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    Holographic Timeline
                  </h2>
                  <p className="text-xs text-white/60">Multi-dimensional governance view</p>
                </div>
                
                {/* 3 Parallel timelines with z-layers */}
                <div className="relative h-64">
                  {/* Layer 1 - Committees (top) */}
                  <motion.div
                    className="absolute inset-x-0 top-0 h-20 rounded-2xl border border-purple-400/30 bg-gradient-to-r from-purple-500/10 to-purple-600/5 p-3 backdrop-blur-sm"
                    style={{ zIndex: 3 }}
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    <div className="mb-1 text-xs font-semibold text-purple-300">Committees</div>
                    <div className="flex gap-2">
                      {[
                        { label: "Portfolio", date: "Oct 24", status: "ready" },
                        { label: "Risk", date: "Oct 28", status: "prep" },
                        { label: "Board", date: "Nov 05", status: "pending" },
                      ].map((event, idx) => (
                        <motion.div
                          key={idx}
                          className="flex-1 rounded-lg border border-purple-400/20 bg-purple-500/20 p-1.5 text-center"
                          whileHover={{ y: -2, boxShadow: "0 0 20px rgba(168, 85, 247, 0.4)" }}
                        >
                          <div className="text-[10px] font-medium text-purple-200">{event.label}</div>
                          <div className="text-[9px] text-purple-300/70">{event.date}</div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                  
                  {/* Layer 2 - Decisions (middle) */}
                  <motion.div
                    className="absolute inset-x-0 top-24 h-20 rounded-2xl border border-pink-400/30 bg-gradient-to-r from-pink-500/10 to-pink-600/5 p-3 backdrop-blur-sm"
                    style={{ zIndex: 2 }}
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  >
                    <div className="mb-1 text-xs font-semibold text-pink-300">Key Decisions</div>
                    <div className="flex gap-2">
                      {[
                        { label: "Budget ERP", due: "Today" },
                        { label: "Scope Digital", due: "Tomorrow" },
                        { label: "Risk Cloud", due: "+3 days" },
                        { label: "Portal Priority", due: "Week" },
                      ].map((decision, idx) => (
                        <motion.div
                          key={idx}
                          className="flex-1 rounded-lg border border-pink-400/20 bg-pink-500/20 p-1.5 text-center"
                          whileHover={{ y: -2, boxShadow: "0 0 20px rgba(236, 72, 153, 0.4)" }}
                        >
                          <div className="text-[10px] font-medium text-pink-200">{decision.label}</div>
                          <div className="text-[9px] text-pink-300/70">{decision.due}</div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                  
                  {/* Layer 3 - Risks (bottom) */}
                  <motion.div
                    className="absolute inset-x-0 top-48 h-20 rounded-2xl border border-amber-400/30 bg-gradient-to-r from-amber-500/10 to-amber-600/5 p-3 backdrop-blur-sm"
                    style={{ zIndex: 1 }}
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                  >
                    <div className="mb-1 text-xs font-semibold text-amber-300">Critical Risks</div>
                    <div className="flex gap-2">
                      {[
                        { label: "Budget Overrun", level: "high" },
                        { label: "Resource Gap", level: "medium" },
                        { label: "Tech Debt", level: "medium" },
                      ].map((risk, idx) => (
                        <motion.div
                          key={idx}
                          className="flex-1 rounded-lg border border-amber-400/20 bg-amber-500/20 p-1.5 text-center"
                          whileHover={{ y: -2, boxShadow: "0 0 20px rgba(251, 191, 36, 0.4)" }}
                        >
                          <div className="text-[10px] font-medium text-amber-200">{risk.label}</div>
                          <div className="text-[9px] text-amber-300/70 uppercase">{risk.level}</div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                  
                  {/* Holographic glow effect */}
                  <div className="absolute inset-0 -z-10 animate-pulse rounded-3xl bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-amber-500/20 blur-2xl"
                       style={{ animationDuration: '6s' }} />
                </div>
              </motion.section>

              {/* Portefeuille (board) avec Drag & Drop */}
              <motion.section
                className="flex flex-1 gap-3 rounded-3xl border border-white/10 bg-white/5 p-3 backdrop-blur-2xl overflow-hidden"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
              >
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  {filteredColumns.map((col) => (
                    <div key={col.id} className="flex min-w-[0] flex-1 flex-col">
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <div
                            className={`h-1.5 w-6 rounded-full bg-gradient-to-r ${col.color}`}
                          />
                          <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">
                            {col.title}
                          </h3>
                        </div>
                        <span className="text-[10px] text-white/40">
                          {col.items.length} projets
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col gap-2 overflow-y-auto">
                        <SortableContext
                          items={col.items.map(item => `${col.id}-${item.name}`)}
                          strategy={verticalListSortingStrategy}
                        >
                          {col.items.map((p) => (
                            <DraggableProjectCard
                              key={`${col.id}-${p.name}`}
                              item={p}
                              columnId={col.id}
                              onClick={setSelectedProject}
                            />
                          ))}
                        </SortableContext>
                      </div>
                    </div>
                  ))}
                </DndContext>
              </motion.section>
            </div>

            {/* Colonne droite : Fil des décisions */}
            <motion.aside
              className="flex w-80 flex-col rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-2xl"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-semibold text-white">Fil des décisions</h2>
                  <p className="text-[11px] text-white/60">
                    Derniers arbitrages, engagements et suivis.
                  </p>
                </div>
                <span className="rounded-full bg-[#D4AF37]/20 px-2 py-0.5 text-[10px] text-[#FDE68A]">
                  Live
                </span>
              </div>
              <div className="flex-1 space-y-2 overflow-y-auto pr-1 text-[11px]">
                <AnimatePresence mode="popLayout">
                  {(decisions && decisions.length > 0 ? decisions.slice(0, 4) : decisionsFeed).map((d, idx) => (
                    <motion.div
                      key={d.title || d.id}
                      className="rounded-2xl border border-white/10 bg-black/40 p-3 backdrop-blur-sm"
                      initial={{ opacity: 0, x: 20, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -20, scale: 0.95 }}
                      transition={{ 
                        duration: 0.4, 
                        delay: 0.35 + idx * 0.08,
                        type: "spring",
                        stiffness: 200,
                        damping: 20
                      }}
                      whileHover={{ 
                        scale: 1.02, 
                        y: -2,
                        boxShadow: "0 0 30px rgba(212, 175, 55, 0.3)",
                        transition: { duration: 0.2 }
                      }}
                    >
                      <div className="mb-1 text-[11px] font-medium text-white">
                        {d.title}
                      </div>
                      <div className="mb-1 flex items-center justify-between text-[10px] text-white/55">
                        <span>{d.owner}</span>
                        <span>{d.due || (d.due_date ? new Date(d.due_date).toLocaleDateString() : "TBD")}</span>
                      </div>
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="rounded-full bg-white/5 px-2 py-0.5 text-white/60">
                          Décision
                        </span>
                        <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] text-amber-200">
                          {d.status || d.impact_level || "En cours"}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.aside>
          </main>
        </div>
      </div>

      {/* Phase 3: Project Detail Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
