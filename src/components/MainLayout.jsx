import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, FolderKanban, CheckSquare, Calendar, 
  Users, BarChart3, Settings, Bell, Search, Plus,
  ChevronLeft, ChevronRight, Zap, Home, Inbox,
  Clock, Star, Archive, HelpCircle, Menu
} from 'lucide-react';

const MainLayout = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();

  const mainNavItems = [
    { path: '/', icon: Home, label: 'Accueil', badge: null },
    { path: '/pmo-workspace', icon: LayoutDashboard, label: 'Workspace', badge: null },
    { path: '/pmo-projects', icon: FolderKanban, label: 'Projets', badge: 12 },
    { path: '/pmo-tasks', icon: CheckSquare, label: 'Tâches', badge: 24 },
    { path: '/pmo-calendar', icon: Calendar, label: 'Calendrier', badge: 5 },
    { path: '/pmo-team', icon: Users, label: 'Équipe', badge: null },
    { path: '/pmo-reports', icon: BarChart3, label: 'Rapports', badge: null },
  ];

  const secondaryNavItems = [
    { path: '/inbox', icon: Inbox, label: 'Inbox', badge: 3 },
    { path: '/starred', icon: Star, label: 'Favoris', badge: null },
    { path: '/recent', icon: Clock, label: 'Récents', badge: null },
    { path: '/archive', icon: Archive, label: 'Archives', badge: null },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className={`bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'w-20' : 'w-64'}`}>
        {/* Logo */}
        <div className="h-16 border-b border-gray-200 flex items-center justify-between px-4">
          {!sidebarCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900">Powalyze</span>
            </div>
          )}
          <button 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>

        {/* Navigation principale */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          <div className="mb-4">
            {mainNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-all group ${
                  isActive(item.path)
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className={`w-5 h-5 ${isActive(item.path) ? 'text-blue-700' : 'text-gray-500'}`} />
                  {!sidebarCollapsed && <span className="font-medium">{item.label}</span>}
                </div>
                {!sidebarCollapsed && item.badge && (
                  <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          {!sidebarCollapsed && (
            <>
              <div className="pt-4 pb-2 px-3">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Raccourcis</h3>
              </div>
              {secondaryNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-all ${
                    isActive(item.path)
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-4 h-4" />
                    <span className="text-sm">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-red-100 text-red-700">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </>
          )}
        </nav>

        {/* Bottom section */}
        <div className="border-t border-gray-200 p-3 space-y-1">
          <Link
            to="/pmo-settings"
            className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all ${
              isActive('/pmo-settings')
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Settings className="w-5 h-5" />
            {!sidebarCollapsed && <span className="font-medium">Paramètres</span>}
          </Link>
          <button className="flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all text-gray-700 hover:bg-gray-100 w-full">
            <HelpCircle className="w-5 h-5" />
            {!sidebarCollapsed && <span className="font-medium">Aide</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div className="flex items-center space-x-4 flex-1">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden">
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex-1 max-w-2xl relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher des projets, tâches, personnes..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center space-x-2 transition-colors">
              <Plus className="w-4 h-4" />
              <span>Nouveau</span>
            </button>
            
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
              >
                <Bell className="w-5 h-5 text-gray-700" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="p-4 hover:bg-gray-50 border-b border-gray-100 cursor-pointer">
                        <p className="text-sm font-medium text-gray-900">Nouvelle tâche assignée</p>
                        <p className="text-xs text-gray-500 mt-1">Il y a 5 minutes</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center border-t border-gray-200">
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                      Voir tout
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold cursor-pointer hover:shadow-lg transition-shadow">
              FC
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
