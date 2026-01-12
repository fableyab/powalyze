
import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { 
  LayoutDashboard, 
  Briefcase, 
  PieChart, 
  BarChart2, 
  FileText, 
  Bell, 
  Users, 
  Layers, 
  MessageSquare, 
  Settings, 
  ShieldAlert,
  FolderOpen,
  Activity,
  LogOut,
  Home,
  TrendingUp
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import StorageUsage from '@/components/StorageUsage';

const Sidebar = () => {
  const location = useLocation();
  const { t } = useLanguage();
  const { user, signOut } = useAuth();

  // 🚫 SÉCURITÉ : Ne JAMAIS afficher la sidebar sur mobile/tablet
  if (location.pathname.startsWith('/mobile') || location.pathname.startsWith('/tablet')) {
    return null;
  }
  const userRole = user?.user_metadata?.role || 'Viewer';

  const navItems = [
    { icon: LayoutDashboard, label: 'Tableau de bord', path: '/app/cockpit' },
    { icon: Briefcase, label: 'Projets', path: '/app/projects' },
    { icon: FolderOpen, label: 'Portfolio', path: '/app/portfolio' },
    { icon: TrendingUp, label: 'Intelligence prédictive', path: '/app/predictive-intelligence' },
    { icon: BarChart2, label: 'Rapports', path: '/app/reports' },
    { icon: BarChart2, label: 'Power BI', path: '/app/powerbi-hub' },
    { icon: Activity, label: 'Alertes', path: '/app/alerts' },
    { icon: Users, label: 'Équipe', path: '/app/team' },
    { icon: Layers, label: 'Intégrations', path: '/app/integrations' },
    { icon: FileText, label: 'Documents', path: '/app/documents' },
    { icon: MessageSquare, label: 'Messages', path: '/app/messages' },
    { icon: Bell, label: 'Notifications', path: '/app/notifications' },
    { icon: Settings, label: 'Paramètres', path: '/app/settings' },
  ];

  if (userRole === 'Admin') {
    navItems.push({ icon: ShieldAlert, label: t('nav.admin'), path: '/app/admin', className: 'text-[#FFD700]' });
  }

  return (
    <aside className="w-64 bg-black border-r border-slate-800 flex flex-col h-full">
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-[#4A9EFF] rounded-lg flex items-center justify-center group-hover:bg-[#0052cc] transition-colors">
            <span className="text-white font-bold text-xl">P</span>
          </div>
          <span className="text-white font-bold text-lg tracking-tight group-hover:text-slate-300 transition-colors">POWALYZE</span>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.exact}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
              isActive 
                ? "bg-[#4A9EFF] text-white shadow-lg shadow-blue-900/20" 
                : "text-slate-400 hover:text-white hover:bg-slate-900",
              item.className
            )}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800 space-y-4 bg-black">
        <StorageUsage />
        
        <Link to="/">
          <Button variant="ghost" className="w-full justify-start text-slate-400 hover:text-white hover:bg-slate-900 gap-3">
             <Home className="w-4 h-4" />
             Retour à l'accueil
          </Button>
        </Link>
        
        <Button 
          variant="ghost" 
          onClick={signOut}
          className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-950/20 gap-3"
        >
          <LogOut className="w-4 h-4" />
          Déconnexion
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
