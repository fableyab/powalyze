import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  CalendarCheck,
  FileCheck,
  AlertTriangle,
  BarChart3,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
} from 'lucide-react';

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const Item = ({ href, icon: Icon, label }) => {
    const isActive = location.pathname === href || location.pathname.startsWith(href + '/');
    
    return (
      <Link
        to={href}
        className={`flex items-center gap-3 px-4 py-2 text-sm transition rounded-lg ${
          isActive
            ? 'bg-[#D4AF37]/20 text-[#D4AF37] border-l-2 border-[#D4AF37]'
            : 'text-white/80 hover:bg-white/10 hover:text-white'
        }`}
      >
        <Icon size={18} />
        {!collapsed && <span>{label}</span>}
      </Link>
    );
  };

  const SectionTitle = ({ children }) => {
    if (collapsed) return null;
    return (
      <div className="text-white/40 text-xs px-4 mt-4 mb-1 font-light tracking-wider uppercase">
        {children}
      </div>
    );
  };

  return (
    <aside
      className={`h-screen bg-[#0A1A2F] border-r border-white/10 flex flex-col transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-white/10">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#f5e3a3]" />
            <span className="text-xs tracking-[0.25em] uppercase text-white font-light">
              Powalyze
            </span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-white/60 hover:text-white transition-colors duration-300"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1 custom-scrollbar">
        <Item href="/app/cockpit" icon={LayoutDashboard} label="Cockpit" />

        <SectionTitle>Portefeuilles</SectionTitle>
        <Item href="/app/portfolios" icon={FolderKanban} label="Portefeuilles" />
        <Item href="/app/programs" icon={FolderKanban} label="Programmes" />
        <Item href="/app/projects" icon={FolderKanban} label="Projets" />

        <SectionTitle>Comités</SectionTitle>
        <Item href="/app/committees" icon={CalendarCheck} label="Tous les comités" />
        <Item href="/app/committees/preparation" icon={CalendarCheck} label="Préparation" />
        <Item href="/app/committees/history" icon={CalendarCheck} label="Historique" />

        <SectionTitle>Décisions</SectionTitle>
        <Item href="/app/decisions" icon={FileCheck} label="Décisions" />
        <Item href="/app/actions" icon={FileCheck} label="Actions" />
        <Item href="/app/impacts" icon={FileCheck} label="Impacts" />

        <SectionTitle>Risques & IA</SectionTitle>
        <Item href="/app/risks" icon={AlertTriangle} label="Risques" />
        <Item href="/app/signals" icon={AlertTriangle} label="Signaux IA" />
        <Item href="/app/recommendations" icon={AlertTriangle} label="Recommandations" />

        <SectionTitle>Reporting</SectionTitle>
        <Item href="/app/reporting" icon={BarChart3} label="Dashboards Power BI" />
        <Item href="/app/kpi" icon={BarChart3} label="KPI" />
        <Item href="/app/exports" icon={BarChart3} label="Exports" />

        <SectionTitle>Documents</SectionTitle>
        <Item href="/app/documents" icon={FileText} label="Documents" />
        <Item href="/app/referentials" icon={FileText} label="Référentiels" />

        <SectionTitle>Administration</SectionTitle>
        <Item href="/app/users" icon={Users} label="Utilisateurs" />
        <Item href="/app/roles" icon={Settings} label="Rôles & permissions" />
        <Item href="/app/settings" icon={Settings} label="Paramètres organisation" />
        <Item href="/app/audit" icon={Settings} label="Journalisation" />
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 px-2 py-3 space-y-1">
        <Link
          to="/app/profile"
          className="flex items-center gap-3 px-4 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white transition rounded-lg"
        >
          <User size={18} />
          {!collapsed && <span>Mon compte</span>}
        </Link>
        <button
          onClick={() => {
            // TODO: Implement logout logic
            window.location.href = '/login';
          }}
          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-white/60 hover:bg-red-500/20 hover:text-red-400 transition rounded-lg"
        >
          <LogOut size={18} />
          {!collapsed && <span>Déconnexion</span>}
        </button>
      </div>
    </aside>
  );
};
