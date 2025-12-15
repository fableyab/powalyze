import React, { useState } from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Logo from '@/components/ui/Logo';
import { 
  LayoutDashboard, PieChart, Briefcase, FileText, Settings, 
  LogOut, Menu, X, Shield, BarChart3, Upload
} from 'lucide-react';
import NotificationCenter from '@/components/dashboard/NotificationCenter';
import { Button } from '@/components/ui/button';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
    { icon: Upload, label: 'Upload Data', path: '/upload-excel' }, // Using public route wrapper for consistency or can be internal
    { icon: Briefcase, label: 'Portfolios', path: '/dashboard/portfolios' },
    { icon: BarChart3, label: 'KPIs', path: '/dashboard/kpis' },
    { icon: PieChart, label: 'Analysis', path: '/dashboard/analysis' },
    { icon: FileText, label: 'Reporting', path: '/dashboard/reporting' },
    { icon: Shield, label: 'Governance', path: '/dashboard/governance' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans flex">
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#111] border-r border-[#222] transform transition-transform duration-300 ease-in-out flex flex-col
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 border-b border-[#222] flex justify-between items-center">
          <Link to="/"><Logo className="h-6" /></Link>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
             <X size={20} className="text-gray-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
                ${isActive 
                  ? 'bg-[#BFA76A]/10 text-[#BFA76A]' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'}
              `}
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="p-4 border-t border-[#222]">
          <div className="bg-[#1C1C1C] rounded-lg p-4 mb-4">
             <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#BFA76A] flex items-center justify-center text-black font-bold">
                   {user?.name?.charAt(0) || 'U'}
                </div>
                <div className="overflow-hidden">
                   <p className="text-sm font-bold truncate">{user?.name || 'User'}</p>
                   <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                </div>
             </div>
             <Button variant="outline" size="sm" className="w-full text-xs h-7 border-[#333] hover:bg-[#222]">
                Manage Account
             </Button>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-900/10 w-full transition-colors"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-[#222] bg-[#0A0A0A] flex items-center justify-between px-6 sticky top-0 z-30">
           <button className="lg:hidden text-gray-400" onClick={() => setSidebarOpen(true)}>
              <Menu />
           </button>
           
           <div className="flex-1"></div> {/* Spacer */}

           <div className="flex items-center gap-4">
              <NotificationCenter />
              <div className="h-8 w-[1px] bg-[#222]"></div>
              <Link to="/profile">
                 <Settings size={20} className="text-gray-400 hover:text-white transition-colors" />
              </Link>
           </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
           <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;