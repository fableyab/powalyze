
import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, FolderKanban, FileText, 
  User, Settings, LogOut, Menu, X, Bell 
} from 'lucide-react';
import { ClientProvider } from '@/context/ClientContext';
import { useAuth } from '@/context/AuthContext';
import Logo from '@/components/ui/Logo';
import { Button } from '@/components/ui/button';
import DarkModeToggle from '@/components/DarkModeToggle';

const SidebarItem = ({ icon: Icon, label, path, active, onClick }) => (
  <Link 
    to={path} 
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 mb-1 ${
      active 
        ? 'bg-primary/10 text-primary font-bold border border-primary/20' 
        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
    }`}
  >
    <Icon size={20} />
    <span>{label}</span>
  </Link>
);

const ClientPortalLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/espace-client' },
    { icon: FolderKanban, label: 'Projets', path: '/espace-client/projets' },
    { icon: FileText, label: 'Documents', path: '/espace-client/documents' },
    { icon: User, label: 'Profil', path: '/espace-client/profil' },
    { icon: Settings, label: 'Paramètres', path: '/espace-client/parametres' },
  ];

  return (
    <ClientProvider>
      <div className="relative min-h-screen bg-[#0A0A0A] text-foreground font-sans flex overflow-hidden">
        {/* Atmosphere background to match premium login visuals */}
        <div className="pointer-events-none absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#0A0A0A]/85 to-[#0A0A0A]/70" />
        <div className="pointer-events-none absolute -top-[20%] -left-[10%] w-[45%] h-[45%] bg-[#BFA76A]/15 rounded-full blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-[15%] right-[5%] w-[35%] h-[35%] bg-[#BFA76A]/10 rounded-full blur-[120px]" />
        
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/80 z-40 lg:hidden backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`
          fixed top-0 left-0 bottom-0 z-50 w-72 bg-[#0F0F0F]/90 backdrop-blur border-r border-white/10 p-6 flex flex-col transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="mb-10 pl-2 flex justify-between items-center">
            <Logo className="h-8" />
            <button className="lg:hidden text-foreground" onClick={() => setSidebarOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1">
            {menuItems.map((item) => (
              <SidebarItem 
                key={item.path}
                {...item}
                active={location.pathname === item.path}
                onClick={() => setSidebarOpen(false)}
              />
            ))}
          </nav>

          <div className="pt-6 border-t border-border">
            <div className="flex items-center gap-3 px-4 py-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#BFA76A] text-black font-bold flex items-center justify-center">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div className="overflow-hidden">
                <p className="font-bold text-sm truncate">{user?.name || 'Utilisateur'}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email || 'user@example.com'}</p>
              </div>
            </div>
            <button 
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors text-sm"
            >
              <LogOut size={18} /> Déconnexion
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 lg:ml-72 flex flex-col min-h-screen relative z-10">
          {/* Topbar */}
          <header className="h-16 border-b border-white/10 bg-[#0D0D0D]/85 backdrop-blur sticky top-0 z-30 px-6 flex items-center justify-between">
            <button 
              className="lg:hidden text-foreground p-2"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>

            <div className="flex-1"></div>

            <div className="flex items-center gap-4">
              <DarkModeToggle />
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <Bell size={20} />
              </Button>
              <Button onClick={() => window.open('https://powalyze.ch', '_blank')} variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground hidden sm:flex">
                Site Principal
              </Button>
            </div>
          </header>

          <main className="flex-1 p-4 md:p-6 lg:p-10">
            <Outlet />
          </main>
        </div>

      </div>
    </ClientProvider>
  );
};

export default ClientPortalLayout;
